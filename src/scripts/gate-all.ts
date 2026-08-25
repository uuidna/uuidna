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
import { ROOT, pool } from './api.js'
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
  // THE FOURTH COSTUME, AND I SEWED IT MYSELF (2026-08-25). The audit's link 2 was
  // `UUIDNA_PROVE_ALL=1 npm run lean` — matched as a generator by the two rules above, once the env prefix is
  // stripped. I replaced it with `node dist/scripts/prove-all.js` to make the release gate runnable on a host
  // whose npm hands scripts to cmd.exe, and the runner's NAME matches nothing here. So the tree's HEAVIEST WRITER
  // — every Lean wing, the generated ledger, the axiom witness, the proof cache, the heartbeats, the rosetta
  // mirror — was reclassified read-only and fanned out beside the checks that read what it writes. spin and
  // `git diff --exit-code` among them, which is exactly how it announced itself: drift in a tree where the only
  // thing that had changed was who was writing during the read.
  //
  // The first three costumes were a missing hyphen (generate.js), a manifest indirection (npm run axioms) and an
  // env prefix (UUIDNA_PROVE_ALL=1). This is the fourth: a step that KEPT its behaviour and changed its spelling.
  // Every cure so far has been to teach the matcher one more surface form, and each time the next form arrived —
  // so it is worth saying plainly that this pattern is a patch on a classifier that reads names, and the durable
  // fix is for a runner to DECLARE what it writes rather than be recognised by how it is spelled.
  /\bprove-all\.js/,
  // THE MANIFEST RUNNER IS A GENERATOR, AND THE NAME ALMOST HID IT. generate.js runs the sixteen gen-* emitters
  // and writes the derived layer; every one of its children matches the pattern above and it does not, for want of
  // a hyphen. Classified as a CHECK it went into the fan-out — writing the derived layer beside thirteen other
  // steps — and one of the emitters it runs MEASURES ITSELF: gen-quantum-capacity times a sweep over the whole
  // ledger and seals the DECADE of the per-verify figure. Measured under contention that reading is a decade
  // slower, so the seal moved, and `spin` reported drift in a tree where nothing had actually changed. A step that
  // measures time cannot share the machine, for the same reason the test runners cannot — the number it returns
  // would be about the load rather than about the tree.
  /\bgenerate\.js/,
  /\blean-axioms\.js/,
  // THE HEAVIEST WRITER IN THE TREE, AND THE FOURTH RENAME TO SLIP THIS LIST (2026-08-25). prove-all.js spawns
  // the whole lean chain — lean-all, lean-gen, lean-ledger, lean-installs — so it rewrites every wing and the
  // generated ledger. Classified a CHECK it ran in the fan-out, which put it AFTER every generator, and the
  // chain's own order says the opposite: prove-all is step 2 and `npm run axioms` is step 13. So the axiom
  // witness was written against the ledger as it stood BEFORE the re-prove regenerated it.
  //
  // Measured in an integration gate rather than reasoned about: the run left lean/axioms.json reading
  // {"audited":1696,"total":1696,"axiomFree":1696} — internally consistent, complete-looking — while the
  // regenerated ledger held 2092. Short by 396, and nothing in the artifact could say so. `total` names the
  // denominator the AUDIT used, not the one that EXISTS, so an audit of a tree that changed underneath it still
  // reads whole. That is the same instrument being narrower than its question, one layer further out than the
  // version this file already documents.
  //
  // AND THE PATTERN LIST IS THE WRONG MECHANISM, which is worth stating rather than fixing four times: it has now
  // missed generate.js (for want of a hyphen), `npm run axioms` (the chain named a script, the pattern named the
  // file behind it), `UUIDNA_PROVE_ALL=1 npm run lean` (an anchored regex against an env-prefixed command), and
  // now prove-all.js (a rename to a wrapper that matches nothing). kindOf's manifest resolution catches the npm
  // form; it cannot see through a node script that SPAWNS, because there is no manifest to resolve. The durable
  // cure is a step DECLARING that it writes — prove-all.ts already declares `@non-harmonic: spawns the lean
  // chain`, so the vocabulary exists — and reading a declaration is not a change to make unilaterally at the end
  // of a long session. Recorded here as the finding; the pattern below is the stopgap.
  /\bprove-all\.js/,
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

/** An instrument the chain needs, and what goes dark without it.
 *
 *  WHY THIS LIST IS DECLARED AND NOT DERIVED. The programs a step spawns DIRECTLY can be read off the chain, but the
 *  ones that matter most cannot: `lean` is never named in package.json — lean-axioms spawns it, three layers down —
 *  and it was precisely that invisible instrument whose absence produced the most confusing failures. A list derived
 *  only from what is visible would have been silent about the one that mattered. So each is declared WITH the arms
 *  it voids, and `covers` is what the report uses to separate "the tree is wrong" from "this host cannot tell". */
export interface Instrument {
  file: string
  why: string
  covers: readonly RegExp[]
  remedy: string
  /** where this tool commonly lives when it IS installed but is not on PATH — probed only after `command -v`
   *  fails, so the preflight can tell "you do not have it" apart from "you have it and cannot see it". */
  alsoLookIn?: readonly string[]
}

/** WHAT A GATE OWES ITS READER WHEN AN INSTRUMENT IS MISSING.
 *
 *  Run on a machine without the toolchain, this gate reported six failures and every one of them was a lie of the
 *  same shape: `npm run lean` "failed" because no kernel existed to succeed, and `spin` and `git diff` then failed
 *  downstream on a derived layer the absent kernel never regenerated. Nothing said "absent" anywhere; the operator
 *  is handed six findings and has to discover by hand that they are one missing program wearing six costumes. The
 *  tree already holds the principle — an absent instrument VOIDS, it does not verdict (lean-axioms says exactly
 *  that when its own spawn fails) — and the gate that front-runs everything did not keep it.
 *
 *  So the instruments are probed FIRST, through the same resolved shell the steps will use (probing a different PATH
 *  than the steps see would be its own lie), and what is missing is named once, up front, with the remedy. */
export const INSTRUMENTS: readonly Instrument[] = [
  { file: 'node', why: 'every step is a node process', remedy: 'install Node (the engines field declares the floor)', covers: [/./] },
  { file: 'npm', why: 'the chain dispatches npm scripts', remedy: 'install Node, which ships npm', covers: [/^npm run /] },
  { file: 'git', why: 'the derived-layer arm asks git what moved', remedy: 'install git', covers: [/^git /] },
  { file: 'lean', why: 're-proves every wing and witnesses the axioms — spawned by lean-all and lean-axioms, so it appears nowhere in the chain',
    remedy: 'install the toolchain the repo pins: elan, then `elan toolchain install $(cat lean-toolchain)`',
    // elan's default home. Probed only when PATH lookup fails, so an INSTALLED-but-unseen kernel is reported as
    // that rather than as an absent one — the distinction this preflight got wrong on its first outing.
    alsoLookIn: ['~/.elan/bin/lean', '~/.elan/bin/lean.exe'],
    covers: [/npm run lean$/, /lean-axioms\.js/, /^npm run axioms$/] },
]

export type Kind = 'generator' | 'check' | 'serial-check'
export interface Step { cmd: string; kind: Kind }
export interface Verdict { cmd: string; kind: Kind; exit: number; out: string }

const matches = (pats: readonly RegExp[], cmd: string): boolean => pats.some((re) => re.test(cmd))

/** expand(cmd, scripts) → what the step actually RUNS, following `npm run <name>` through the manifest.
 *
 *  A STEP IS WHAT IT RUNS, NOT WHAT IT IS CALLED, and classifying the surface string is how the same mistake got
 *  in twice. GENERATOR_PATTERNS carries `/\blean-axioms\.js/` — and the chain says `npm run axioms`, which
 *  contains no such text, so that pattern could never once have fired. `npm run axioms` is
 *  `npm run build && node dist/scripts/lean-axioms.js`: it BUILDS, and it was landing in the concurrent wave to
 *  write dist while twenty-seven other checks read it. Caught 2026-08-25 in a clean worktree — the arm failed
 *  inside the fan-out and passed standing alone, which is the signature of a race and not of a defect.
 *
 *  The note above `/\bgenerate\.js/` records this identical failure one level down ("for want of a hyphen") and
 *  cures it by adding a pattern. That works while the chain names a FILE; it cannot work when the chain names an
 *  npm script, because no pattern over the surface text can see through the manifest. So the resolution moves
 *  here, and the existing patterns start matching what they were always written to match.
 *
 *  AND AN ENVIRONMENT PREFIX IS NOT PART OF THE COMMAND. `/^npm run lean$/` is anchored, and the chain says
 *  `UUIDNA_PROVE_ALL=1 npm run lean` — so the anchor missed, and the HEAVIEST WRITER in the tree (every Lean wing,
 *  the generated ledger, the changelog, the heartbeats, the axiom witness, the rosetta mirror, the feed) was
 *  classified read-only and fanned out beside the twenty-seven checks that read what it writes — including spin,
 *  which verifies the derived seal, and `git diff --exit-code`, which asserts that layer did not move. Every red
 *  those two arms reported tonight was taken while the generator was rewriting the layer beneath them, so their
 *  verdicts were about a race and not about the tree. Found 2026-08-25 by uuidna-a6, confirmed by calling kindOf
 *  rather than reading it.
 *
 *  This is the THIRD costume of one mistake, and the first two are recorded four lines apart in this same file —
 *  a hyphen for generate.js, a manifest for npm run axioms, now a variable assignment. Each was cured by teaching
 *  the matcher one more surface form. The cure here is to stop matching the surface: strip what is not the
 *  command before anything looks at it.
 */
/** the command with any leading `VAR=value` assignments removed — what the shell would actually execute */
const bare = (cmd: string): string => cmd.trim().replace(/^(?:[A-Za-z_][A-Za-z0-9_]*=(?:"[^"]*"|'[^']*'|\S*)\s+)+/, '')
const expand = (cmd: string, scripts: Readonly<Record<string, string>>): string => {
  let seen = bare(cmd)
  // bounded, because a manifest can name itself: three hops is deeper than any chain here and cannot spin
  for (let hop = 0; hop < 3; hop++) {
    const m = /^npm run ([\w:@/-]+)$/.exec(bare(seen))
    const body = m ? scripts[m[1]!] : undefined
    if (!body) return seen
    seen = body
  }
  return seen
}

export function kindOf(cmd: string, scripts: Readonly<Record<string, string>> = {}): Kind {
  // THREE forms are asked, and a match on ANY of them promotes: the raw surface, the surface with environment
  // assignments stripped, and the manifest-resolved body. Asking more forms can only ever move a step OUT of the
  // concurrent wave, never quietly demote one into it — which is the direction that costs a false verdict.
  const surface = bare(cmd)
  const body = expand(cmd, scripts)
  const any = (pats: readonly RegExp[]): boolean =>
    matches(pats, cmd) || matches(pats, surface) || matches(pats, body)
  if (any(GENERATOR_PATTERNS)) return 'generator'
  return any(TREE_TOUCHING) ? 'serial-check' : 'check'
}

/** the chain, read from the manifest so this can never disagree with what `npm run audit` actually runs.
 *  `scripts` is that same manifest's script map — passing it is what lets a step be classified by its BODY. */
export const plan = (auditScript: string, scripts: Readonly<Record<string, string>> = {}): Step[] =>
  auditScript.split(' && ').map((c) => c.trim()).map((cmd) => ({ cmd, kind: kindOf(cmd, scripts) }))

/** short label for a step, for the summary table. A `node --test <glob>` step names its SUITE — the generic
 *  strip used to eat everything after the first ` --`, so the 50-second main suite printed as bare "node": a
 *  timing census with a stranger in it (lead 132b's cheapest fold — a report can only shrink what it names). */
export const label = (cmd: string): string =>
  cmd.startsWith('node --test ')
    ? ('test ' + cmd.replace('node --test ', '').replace(/\/\*.*$/, '')).slice(0, 46)
    : cmd.replace('node dist/scripts/', '').replace(/\.js\b/, '').replace(/ --.*$/, '').replace(/^npm run /, 'npm:').slice(0, 46)

// the lane pool now lives in the scripts' singularity — lean-gen fans the kernel spawns with the same one, and a
// second copy is exactly what `dry` refuses. Re-exported so this module's own readers keep their import.
export { pool } from './api.js'

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
  const scripts = (JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')) as { scripts: Record<string, string> }).scripts
  const audit = scripts.audit
  // the WHOLE script map, not just the audit line: a step that says `npm run <name>` is classified by what that
  // name resolves to, so the manifest has to travel with the chain it came from
  const steps = plan(audit, scripts)
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

  // THE PREFLIGHT — every instrument probed before any verdict is issued, through the shell the steps will use.
  //
  // AND "NOT ON PATH" IS NOT "NOT INSTALLED". The first version of this probe reported a missing PATH lookup as
  // "absent on this host" and told the reader to install a toolchain they already had: Lean 4.33.0, the exact
  // pin, sat in ~/.elan/bin through every gate run of the night while the axiom arm read VOID. VOID reads as
  // "not a failure", so nobody looked — which is the very disease this preflight was written to cure, recurring
  // one level up in the cure itself. A found-but-unreachable tool now says so, and says where it is.
  const found = (cmd: string): boolean => {
    try { execFileSync(shell.file, shell.argv(cmd), { cwd: ROOT, env: shell.env(process.env), stdio: 'pipe' }); return true }
    catch { return false }
  }
  const unreachable = new Map<string, string>()   // instrument -> where it actually lives
  const absent = INSTRUMENTS.filter((i) => {
    if (found(`command -v ${i.file}`)) return false
    for (const where of i.alsoLookIn ?? []) {
      if (found(`test -x ${where}`)) { unreachable.set(i.file, where); break }
    }
    return true
  })
  /** is this step one an absent instrument voids? then its verdict is not about the tree */
  const voided = (cmd: string): Instrument | undefined => absent.find((i) => matches(i.covers, cmd))
  if (absent.length) {
    console.log(`gate-all — PREFLIGHT: ${absent.length} instrument(s) NOT REACHABLE from this process. What they cover is VOID, not failed:`)
    for (const i of absent) {
      const at = unreachable.get(i.file)
      console.log(`  · ${i.file} — ${i.why}`)
      console.log(at
        ? `    INSTALLED at ${at} but NOT ON THIS PROCESS'S PATH — add it and re-run; do not install anything`
        : `    FIX ${i.remedy}`)
    }
    console.log('  (the rest of the gate still runs: an unreachable instrument voids its own arms and no others)\n')
  }

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

  // A FAILURE IS A FINDING ONLY IF SOMETHING WAS ACTUALLY MEASURED. Everything an absent instrument covers is
  // reported as VOID with the instrument named — never counted among the findings, and never silently dropped
  // either: an unmeasured arm is a hole in the gate, and a hole stated is worth more than a verdict invented.
  const stopped = verdicts.filter((v) => v.exit !== 0)
  const failed = stopped.filter((v) => !voided(v.cmd))
  const voids = stopped.filter((v) => voided(v.cmd))
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
  /** the voided arms, named with the instrument that was missing — printed on every ending, green or not, because
   *  a gate with unmeasured arms has not proved the tree even when everything it COULD measure passed. */
  const voidNotice = (): void => {
    if (!voids.length) return
    console.error(`\n  ${voids.length} arm(s) VOID — not failures, and not verdicts either; nothing measured them:`)
    for (const v of voids) console.error(`  · ${label(v.cmd)}  — needs ${voided(v.cmd)!.file}, not reachable from this process`)
    console.error(`  FIX ${[...new Set(voids.map((v) => voided(v.cmd)!.remedy))].join('; ')}`)
  }

  if (!failed.length && !voids.length) {
    console.log(`✓ gate-all — all ${count('check') + count('serial-check')} checks green in ONE pass (${wall}ms wall-clock).`)
    report()
    process.exit(0)
  }
  if (!failed.length) {
    // Everything measurable passed and something was not measurable. That is not green: the difference between
    // "the tree is sound" and "the tree is sound as far as this host can see" is the whole of the gate's meaning.
    console.log(`· gate-all — every arm this host CAN measure is green (${wall}ms), but the gate is INCOMPLETE.`)
    report()
    voidNotice()
    process.exit(1)
  }
  for (const f of failed) {
    console.error(`\n${'─'.repeat(78)}\n✗ ${label(f.cmd)} (exit ${f.exit})\n${'─'.repeat(78)}`)
    console.error(f.out.trimEnd().split('\n').slice(-40).join('\n'))
  }
  console.error(`\n✗ gate-all — ${failed.length} of ${count('check') + count('serial-check')} checks FAILED, all computed in one pass (${wall}ms):\n`)
  for (const f of failed) console.error(`  · ${label(f.cmd)}  (exit ${f.exit})`)
  report()
  voidNotice()
  console.error('\n  These are simultaneous— the && chain would have shown you ONE of them per run.')
  process.exit(1)
}
