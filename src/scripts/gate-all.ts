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
import { execFile } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { availableParallelism } from 'node:os'
import { join } from 'node:path'
import { ROOT } from './api.js'

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

/** short label for a step, for the summary table. */
export const label = (cmd: string): string =>
  cmd.replace('node dist/scripts/', '').replace(/\.js\b/, '').replace(/ --.*$/, '').replace(/^npm run /, 'npm:').slice(0, 46)

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
  const jArg = process.argv.indexOf('-j')
  const limit = jArg > 0 ? Number(process.argv[jArg + 1]) || 1 : (availableParallelism() - 2 < 2 ? 2 : availableParallelism() - 2)

  if (process.argv.includes('--dry')) {
    for (const s of steps) console.log(`  ${({ generator: 'GEN   ', check: 'CHECK ', 'serial-check': 'SERIAL' })[s.kind]} ${label(s.cmd)}`)
    console.log(`\n${steps.length} steps — ${count('generator')} generators (ordered), ${count('check')} checks (concurrent, -j ${limit}), ${count('serial-check')} tree-touching (alone)`)
    process.exit(0)
  }

  console.log(`gate-all — ${count('generator')} generators in order, then ${count('check')} checks CONCURRENTLY (-j ${limit}), then ${count('serial-check')} alone …\n`)
  const started = Date.now()
  const { verdicts, aborted } = await runPlan(steps, (cmd) => new Promise((resolve) => {
    const t0 = Date.now()
    execFile('sh', ['-c', cmd], { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 }, (err, stdout, stderr) => {
      const exit = err ? ((err as { code?: number }).code ?? 1) : 0
      console.log(`  ${exit === 0 ? '✓' : '✗'} ${label(cmd).padEnd(46)} ${String(Date.now() - t0).padStart(7)}ms`)
      resolve({ exit, out: stdout + stderr })
    })
  }), limit)

  const failed = verdicts.filter((v) => v.exit !== 0)
  console.log(`\n${'═'.repeat(78)}`)
  if (aborted) {
    console.error(verdicts[verdicts.length - 1].out)
    console.error(`✗ gate-all — GENERATOR FAILED: ${label(aborted)}`)
    console.error('  Every later step reads what it produces, so the remaining verdicts would be meaningless.')
    process.exit(1)
  }
  if (!failed.length) {
    console.log(`✓ gate-all — all ${count('check') + count('serial-check')} checks green in ONE pass (${Date.now() - started}ms wall-clock).`)
    process.exit(0)
  }
  for (const f of failed) {
    console.error(`\n${'─'.repeat(78)}\n✗ ${label(f.cmd)} (exit ${f.exit})\n${'─'.repeat(78)}`)
    console.error(f.out.trimEnd().split('\n').slice(-40).join('\n'))
  }
  console.error(`\n✗ gate-all — ${failed.length} of ${count('check') + count('serial-check')} checks FAILED, all computed in one pass (${Date.now() - started}ms):\n`)
  for (const f of failed) console.error(`  · ${label(f.cmd)}  (exit ${f.exit})`)
  console.error('\n  These are simultaneous— the && chain would have shown you ONE of them per run.')
  process.exit(1)
}
