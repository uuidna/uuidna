#!/usr/bin/env node
// @non-harmonic: runs the audit chain's own steps as subprocesses — a NAMED boundary, like exercise-dormant.ts.
//
// gate-all — COMPUTE EVERY ARM AT ONCE INSTEAD OF ONE PER RUN.
//
// `npm run audit` is twenty-nine steps joined by `&&`, so it stops at the FIRST failure. That is correct for a
// generator — if gen-lines cannot write, everything after it is meaningless — but it is wrong for a CHECK, because
// checks are independent of one another and all of their verdicts are available simultaneously. The chain reports
// them serially anyway, so a tree with five gaps takes five full multi-minute passes to reveal five things it knew
// on the first one.
//
// That is not hypothetical. Bringing the dormant-backlog work to green took SEVEN passes: a stale axiom witness and
// a Math.* determinism reject, then heartbeats missing four entries, then two thin wrappers injected into
// package.json, then heartbeats again, then spin drift, then the derived diff. Every one was already true on the
// first pass. The sequence did not compute all at once.
//
// INDEPENDENT MEANS CONCURRENT. The first version of this script collected every verdict but
// still walked the checks one after another, so it reported all at once while computing linearly — and was slow for
// exactly that reason. Independence is the licence to run them TOGETHER: the wall-clock of the check phase is the
// slowest single check.
//
// Three classes, derived from the chain rather than copied — a hand-typed second list could only lag the first:
//   GENERATOR     ordered, fail-fast. Later steps read what it writes.
//   CHECK         read-only verdict. Fans out; every one runs whatever the others find.
//   SERIAL CHECK  a verdict that cannot share the machine. Two reasons, both measured:
//                 TREE — exercise-dormant runs 32 scripts and restores what they write, and `git diff` reads the
//                 tree to decide. Run together, the first dirties the tree under the second's feet and the gate
//                 reports drift that does not exist.
//                 CPU — the test runners are the heavy steps. Fanned out beside thirteen siblings they were
//                 STARVED: mcp-coverage took 50s under contention and failed, while passing on its own in under a
//                 second. Concurrency that manufactures a flake is not speed, it is a false verdict.
//                 These run alone, in chain order, after the fan-out.
//
//   node dist/scripts/gate-all.js [--dry] [-j N]   · --dry prints the classified plan without running it
import { execFile, execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { capacity, hostProfile, shellOrExit, renderSpeedup, speedup } from '../os/host/index.js'

/** A step is a GENERATOR when it produces the inputs later steps read.
 *
 *  Kept as SEPARATE patterns rather than one alternation on purpose. Collapsed into a single regex, a gate-name
 *  literal ends up directly before an alternation bar, and the pipes finder — which holds the law that a gate's
 *  exit code is captured raw— reads that bar as the pipe and flags this file. It is
 *  right to look: grepping source cannot tell an alternation from a pipe. One pattern per line, no ambiguity.
 *  (This note is deliberately written WITHOUT the offending characters: the first version of it described the
 *  pattern by quoting it, and so tripped the very finder it was explaining — the seventh use-versus-mention catch
 *  of the day. A comment is not exempt from the law it documents.) */
const GENERATOR_PATTERNS: readonly RegExp[] = [
  /^npm run lean$/,
  /^npm run build$/,
  /\bgen-[a-z-]+\.js/,
  /\blean-axioms\.js/,
  /vitepress build/,
]

/** Checks that read or write the working tree itself, and so must not share it with a concurrent step. */
const TREE_TOUCHING: readonly RegExp[] = [
  /node --test/,
  /npm run test/,
  /\bexercise-dormant\.js/,
  /^git diff/,
]

/** THE GATE HONORS ITS RECEIPTS (queue lead 121a, two-session quorum). The pre-push green gate proves tests
 *  and guard on the exact tree being pushed, and writes gate-receipt.json fingerprinting the very inputs those
 *  checks read (src + lean). deploy.yml already trusts that receipt instead of recomputing; this extends the
 *  SAME checkable trust to the full gate: when --verify passes for the current tree, the steps the receipt
 *  covers are verified by receipt, not re-run — prove once at O(N), verify at O(1)
 *  (verify_beats_recompute_by_magnitudes). One byte moved and --verify fails, so everything runs in full: the
 *  skip is never trust, always verification. Only the receipt's own covered checks qualify — the docs suite
 *  and every generator read outside the fingerprint and always run. */
const RECEIPT_COVERED: readonly RegExp[] = [
  /^node --test dist\/tests\/\*\.test\.js$/,
  /\bdist\/scripts\/guard\.js$/,
]

export type Kind = 'generator' | 'check' | 'serial-check'
export interface Step { cmd: string; kind: Kind }
export interface Verdict { cmd: string; kind: Kind; exit: number; out: string }

const matches = (pats: readonly RegExp[], cmd: string): boolean => pats.some((re) => re.test(cmd))

export function kindOf(cmd: string): Kind {
  if (matches(GENERATOR_PATTERNS, cmd)) return 'generator'
  return matches(TREE_TOUCHING, cmd) ? 'serial-check' : 'check'
}

/** the chain, read from the manifest so this can never disagree with what `npm run audit` actually runs. */
export const plan = (auditScript: string): Step[] =>
  auditScript.split(' && ').map((c) => c.trim()).map((cmd) => ({ cmd, kind: kindOf(cmd) }))

/** short label for a step, for the summary table. A `node --test <glob>` step names its SUITE — the generic
 *  strip used to eat everything after the first ` --`, so the 50-second main suite printed as bare "node": a
 *  timing census with a stranger in it (lead 132b's cheapest fold — a report can only shrink what it names). */
export const label = (cmd: string): string =>
  cmd.startsWith('node --test ')
    ? ('test ' + cmd.replace('node --test ', '').replace(/\/\*.*$/, '')).slice(0, 46)
    : cmd.replace('node dist/scripts/', '').replace(/\.js\b/, '').replace(/ --.*$/, '').replace(/^npm run /, 'npm:').slice(0, 46)

/** run `thunks` with at most `limit` in flight, preserving result order. */
export async function pool<T>(thunks: readonly (() => Promise<T>)[], limit: number): Promise<T[]> {
  const out = new Array<T>(thunks.length)
  let next = 0
  // integer comparison, not Math.* — the determinism scan hard-rejects host Math calls everywhere, no exemption
  const cap = limit < 1 ? 1 : limit
  const span = thunks.length || 1
  const workers = Array.from({ length: cap < span ? cap : span }, async () => {
    for (;;) {
      const i = next++
      if (i >= thunks.length) return
      out[i] = await thunks[i]()
    }
  })
  await Promise.all(workers)
  return out
}

/** Generators in order (abort on failure), then every read-only check CONCURRENTLY, then the tree-touching checks
 *  alone in chain order. Returns every verdict rendered. */
export async function runPlan(
  steps: readonly Step[],
  run: (cmd: string) => Promise<{ exit: number; out: string }>,
  limit: number,
): Promise<{ verdicts: Verdict[]; aborted: string | null }> {
  const verdicts: Verdict[] = []
  for (const s of steps.filter((x) => x.kind === 'generator')) {
    const { exit, out } = await run(s.cmd)
    verdicts.push({ ...s, exit, out })
    // a generator's failure makes every later step meaningless — the one case where stopping is right
    if (exit !== 0) return { verdicts, aborted: s.cmd }
  }
  const parallel = steps.filter((x) => x.kind === 'check')
  const results = await pool(parallel.map((s) => async () => ({ s, r: await run(s.cmd) })), limit)
  for (const { s, r } of results) verdicts.push({ ...s, exit: r.exit, out: r.out })

  for (const s of steps.filter((x) => x.kind === 'serial-check')) {
    const { exit, out } = await run(s.cmd)
    verdicts.push({ ...s, exit, out })
  }
  return { verdicts, aborted: null }
}

if (process.argv[1] && /gate-all\.(js|ts)$/.test(process.argv[1])) {
  const audit = (JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }).scripts.audit
  const steps = plan(audit)
  const count = (k: Kind) => steps.filter((s) => s.kind === k).length
  // THE MACHINE IS READ, NOT ASSUMED (os/host). The lane count came from an inline `availableParallelism() - 2`
  // here and the shell from a bare 'sh' below; both are host facts, and a host fact written at a call site is a
  // host fact nothing names. The driver answers both, so this runner is only its own logic.
  const host = hostProfile()
  const jArg = process.argv.indexOf('-j')
  const limit = jArg > 0 ? Number(process.argv[jArg + 1]) || 1 : capacity().lanes

  if (process.argv.includes('--dry')) {
    for (const s of steps) console.log(`  ${({ generator: 'GEN   ', check: 'CHECK ', 'serial-check': 'SERIAL' })[s.kind]} ${label(s.cmd)}`)
    console.log(`\n${steps.length} steps — ${count('generator')} generators (ordered), ${count('check')} checks (concurrent, -j ${limit}), ${count('serial-check')} tree-touching (alone)`)
    process.exit(0)
  }

  // THE SHELL IS RESOLVED ONCE, BEFORE ANY STEP RUNS — unresolvable refuses here rather than failing 29 times.
  const shell = shellOrExit('gate-all')

  // the receipt is consulted ONCE, against the tree as it stands when the gate begins
  let receiptGood = false
  try { execFileSync('node', ['dist/scripts/gate-receipt.js', '--verify'], { cwd: ROOT, stdio: 'pipe' }); receiptGood = true } catch { receiptGood = false }
  if (receiptGood) console.log('gate-all — gate-receipt --verify PASSES for this tree: receipt-covered checks verify at O(1) (lead 121a)')

  console.log(`gate-all — host ${host.cpu} · ${host.logical} logical, ${host.memoryGiB} GiB, ${host.platform}/${host.arch} · shell ${shell.file} (${shell.source}) · receipt ${host.receipt}`)
  console.log(`gate-all — ${count('generator')} generators in order, then ${count('check')} checks CONCURRENTLY (-j ${limit} of ${host.logical}, ${host.reserved} lanes reserved), then ${count('serial-check')} alone …\n`)
  const started = Date.now()
  // Every step's own duration AND the instants it spanned. The duration alone cannot price the fan-out: with 29
  // checks over 14 lanes the phase is longer than its slowest member (two full waves), so reporting the slowest
  // step AS the phase would state a speedup nobody measured. The span between the first check starting and the
  // last one finishing IS the phase, so it is recorded rather than inferred.
  const spent = new Map<string, number>()
  const span = new Map<string, { from: number; to: number }>()
  const { verdicts, aborted } = await runPlan(steps, (cmd) => new Promise((resolve) => {
    if (receiptGood && matches(RECEIPT_COVERED, cmd)) {
      console.log(`  ✓ ${label(cmd).padEnd(46)}      by receipt`)
      return resolve({ exit: 0, out: 'verified by gate-receipt — the green gate proved this on the identical tree' })
    }
    const t0 = Date.now()
    execFile(shell.file, shell.argv(cmd), { cwd: ROOT, env: shell.env(process.env), maxBuffer: 64 * 1024 * 1024 }, (err, stdout, stderr) => {
      // a spawn failure carries a STRING code (ENOENT), not an exit status — coerced to 1 so a host problem reads
      // as "failed", never as the nonsense "exit ENOENT" the missing-shell run actually printed
      const raw = err ? (err as { code?: number | string }).code : 0
      const exit = typeof raw === 'number' ? raw : (err ? 1 : 0)
      const done = Date.now()
      const ms = done - t0
      spent.set(cmd, ms)
      span.set(cmd, { from: t0, to: done })
      console.log(`  ${exit === 0 ? '✓' : '✗'} ${label(cmd).padEnd(46)} ${String(ms).padStart(7)}ms`)
      resolve({ exit, out: stdout + stderr })
    })
  }), limit)

  const failed = verdicts.filter((v) => v.exit !== 0)
  const wall = Date.now() - started

  /** THE FAN-OUT'S OWN RECEIPT. The gate reported per-step milliseconds and then said nothing about what running
   *  them together was worth — so "concurrent" was an adjective in the header rather than a measured claim. The
   *  concurrent phase's serial sum is what the `&&` chain would have spent on the same steps; the phase's real
   *  elapsed time is what this machine spent instead; the ratio is the gain, and the slowest step is the floor no
   *  lane count can lower (the wall-clock of a fan-out IS its slowest member). Printed with the steps that set
   *  that floor, because a ratio tells you how much you gained and only the critical path tells you where the
   *  next gain is. */
  const concurrent = verdicts.filter((v) => v.kind === 'check' && spent.has(v.cmd))
  const serialSum = concurrent.reduce((a, v) => a + (spent.get(v.cmd) ?? 0), 0)
  const slowest = [...concurrent].sort((a, b) => (spent.get(b.cmd) ?? 0) - (spent.get(a.cmd) ?? 0)).slice(0, 3)
  const report = (): void => {
    if (!concurrent.length) return
    const marks = concurrent.map((v) => span.get(v.cmd)!).filter(Boolean)
    const phase = marks.reduce((a, m) => (m.to > a ? m.to : a), 0) - marks.reduce((a, m) => (m.from < a ? m.from : a), marks[0].from)
    const floor = spent.get(slowest[0].cmd) ?? 0
    console.log(`\n  fan-out — ${concurrent.length} checks over ${limit} lanes: ${serialSum}ms serial → ${phase}ms measured, ${renderSpeedup(speedup(serialSum, phase))}`)
    console.log(`  critical path — the ${floor}ms floor no lane count lowers: ${slowest.map((v) => `${label(v.cmd)} ${spent.get(v.cmd)}ms`).join(' · ')}`)
    console.log(`  host ${host.address} — the machine these figures were measured on, folded so the next reader can tell whether it was the same one`)
  }

  console.log(`\n${'═'.repeat(78)}`)
  if (aborted) {
    console.error(verdicts[verdicts.length - 1].out)
    console.error(`✗ gate-all — GENERATOR FAILED: ${label(aborted)}`)
    console.error('  Every later step reads what it produces, so the remaining verdicts would be meaningless.')
    process.exit(1)
  }
  if (!failed.length) {
    console.log(`✓ gate-all — all ${count('check') + count('serial-check')} checks green in ONE pass (${wall}ms wall-clock).`)
    report()
    process.exit(0)
  }
  for (const f of failed) {
    console.error(`\n${'─'.repeat(78)}\n✗ ${label(f.cmd)} (exit ${f.exit})\n${'─'.repeat(78)}`)
    console.error(f.out.trimEnd().split('\n').slice(-40).join('\n'))
  }
  console.error(`\n✗ gate-all — ${failed.length} of ${count('check') + count('serial-check')} checks FAILED, all computed in one pass (${wall}ms):\n`)
  for (const f of failed) console.error(`  · ${label(f.cmd)}  (exit ${f.exit})`)
  report()
  console.error('\n  These are simultaneous— the && chain would have shown you ONE of them per run.')
  process.exit(1)
}
