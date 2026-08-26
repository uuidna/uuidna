#!/usr/bin/env node
// green — THE ONE GATE THAT DECIDES WHETHER A PUSH MAY HAPPEN, run cheapest-first so a failure costs seconds
// instead of the full chain. It reports; it pushes only when asked AND only when every arm is green.
//
// WHY CHEAPEST FIRST. The chain used to be run in roughly the opposite order — seal the wings, then build, then
// discover the build had failed four minutes earlier. Measured today: a type error, a broken shipped contract, a
// stale generated count and a Math.* sneak were all catchable in under two minutes, and all four were found late.
// tsc settles types in ~2s, guard settles the ledger in ~20s, the tests settle the invariants finders do not hold
// in ~90s, and the kernel — the most expensive judge in the repository — is consulted last.
//
// EXIT CODES, NEVER CLOCKS. Every arm is judged by its process exit status. A fast run is not a passing run: a
// theorem over 65536 cases once printed 0.59s and looked like the best number on the page, and it was a crash.
// Nothing here reads a duration, and nothing here reads through a pipe (a pipeline exits with the LAST command's
// status, which is how a failed build was waved through earlier today).
//
// WHAT GREEN MEANS, AND WHAT IT DOES NOT. Green means: the types compile with no emit on error, the ledger is
// unforged, every test passes, we are not behind origin, and the index holds nothing this run did not put there.
// It does NOT mean the theorems are true — no gate here judges content. Integrity.
import { execSync, spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT, HERE, lastLines } from './api.js'
import { shellOrExit } from '../os/host/index.js'

/** What an arm returns. THREE states, never two — the whole point of this file's night.
 *
 *  A boolean arm can only say "not zero", and tonight five separate instruments in this tree reported a limit of
 *  their own construction as a verdict about the world: a lock certifying exclusivity it never held, a preflight
 *  calling an installed toolchain absent, a classifier letting the ledger's writer race its own verifiers, a
 *  receipt printing green for work never re-run, and a gate whose subject was the working tree rather than the
 *  commit. Each was a two-state instrument asked a three-state question.
 *
 *  So: PASS, FAIL with the evidence that convicted it, or UNMEASURED with the reason nothing could be learned.
 *  UNMEASURED is never silently PASS — it stops the run exactly as a failure does, because a gate that cannot see
 *  is not a gate that approves. It is reported differently because the CURE is different: a failure is fixed in
 *  the tree, an unmeasured arm is fixed in the instrument. */
type Verdict = { ok: true } | { ok: false; why: string; unmeasured?: boolean }

interface Arm { name: string; why: string; run: () => Verdict }

const pass: Verdict = { ok: true }
const fail = (why: string): Verdict => ({ ok: false, why })

/** Run a step through the HOST's shell and return what actually happened.
 *
 *  THE FOURTH COSTUME OF ONE MISTAKE. This was `spawnSync('sh', …, { stdio: 'ignore' }).status === 0` — hardcoded
 *  `sh`, which is a program on a POSIX host and nothing at all on Windows (the same assumption as `sleep`, `ps -o`
 *  and `pgrep -P` before it), and output DISCARDED, so the arm could report a denial without ever reporting the
 *  charge. Worse than either: a spawn that never ran returns status null, and `null === 0` is false, so "I could
 *  not run this" and "this ran and failed" were the same answer. The tests arm failed here while the identical
 *  command passed 923/923 by hand, and the instrument was built so that nobody could see why. */
const sh = (cmd: string): Verdict => {
  const shell = shellOrExit('green')
  const r = spawnSync(shell.file, shell.argv(cmd), {
    cwd: ROOT, env: shell.env(process.env), encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
  })
  const said = ((r.stdout ?? '') + (r.stderr ?? '')).trimEnd()
  // never RAN: no exit status to read. The distinction the old form could not make.
  if (r.error || r.status === null) {
    return { ok: false, unmeasured: true, why: `${cmd}\n  could not be run: ${r.error?.message ?? `killed by ${r.signal}`}` }
  }
  if (r.status === 0) return pass
  return fail(`${cmd} exited ${r.status}\n${lastLines(said, 15)}`)
}
/** git's own answer, or '' when it refuses. Kept boolean-shaped on purpose: these arms read git plumbing that
 *  cannot fail without git itself being absent, which the shell resolution above would already have named. */
const out = (cmd: string): string => { try { return execSync(cmd, { cwd: ROOT }).toString().trim() } catch { return '' } }

const full = process.argv.includes('--full')      // include the kernel (~700s); omitted, the delta cache stands
const push = process.argv.includes('--push')      // push if — and only if — every arm is green

const ARMS: Arm[] = [
  { name: 'behind', why: 'origin must hold nothing we lack — a push over a divergence is a merge decided blind',
    run: () => { execSync('git fetch origin --quiet', { cwd: ROOT })
      const n = out('git rev-list --count HEAD..origin/main')
      return n === '0' ? pass : fail(`origin holds ${n} commit(s) this branch lacks — rebase before pushing`) } },

  { name: 'index', why: 'the staged set must be ours — a commit sweeps whatever another session left in the index into our message',
    run: () => {
      const staged = out('git diff --cached --name-only').split('\n').filter(Boolean)
      if (!staged.length) return pass
      const sources = out('git diff --name-only').split('\n').filter((f) => f.startsWith('lean/') && f.endsWith('.lean'))
      return sources.length === 0 ? pass
        : fail(`${staged.length} derived path(s) staged while ${sources.length} lean source(s) are modified and unstaged — stage both or neither`) } },

  { name: 'types', why: 'tsc with noEmitOnError — a type error must not write dist for the next step to run',
    run: () => sh('npm run build') },

  // Astro-schema half: articles title+description enforced (collection/) — VitePress alone never stops a missing field
  { name: 'articles', why: 'docs/articles collection schema — title+description required on every entry (denominator named)',
    run: () => sh('node dist/scripts/audit-articles-collection.js') },

  { name: 'ledger', why: 'guard: DNA recomputes, no collision, conformance holds, the lean binds to its key, determinism clean',
    run: () => sh('node dist/scripts/guard.js') },

  // VERIFY-DON'T-RECOMPUTE: full gen-quantum-advantage remeasures (minutes). Push verifies the sealed report
  // against usable_gap_is_two_to_eighty + LEVELS in ≪60s (theorem verify_beats_recompute_by_magnitudes).
  { name: 'qa', why: 'full quantum-advantage audit by VERIFY of lean/quantum-advantage.json — metrics-aligned, <60s',
    run: () => sh('node dist/scripts/quantum-advantage-audit.js') },

  { name: 'tests', why: 'the invariants no finder holds — a demoted finder does not demote its test, which is how "guard green" stopped meaning green',
    run: () => sh('node --test dist/tests/*.test.js') },

  ...(full ? [{ name: 'kernel', why: 'every wing re-proven sorry-free and every theorem kernel-only (UUIDNA_PROVE_ALL=1)',
    run: () => sh('UUIDNA_PROVE_ALL=1 npm run lean && node dist/scripts/lean-axioms.js') }] : []),
]

const failed: string[] = []
for (const arm of ARMS) {
  const v = arm.run()
  const mark = v.ok ? '✓' : v.unmeasured ? '·' : '✗'
  const verdict = v.ok ? 'passes' : v.unmeasured ? 'UNMEASURED' : 'FAILS'
  console.log(`${mark} green — ${arm.name.padEnd(7)} ${verdict.padEnd(10)} ${arm.why}`)
  if (!v.ok) {
    // THE CHARGE IS READ ALOUD. A gate that blocks while hiding its finding forces the next hand to re-run it
    // just to learn the accusation — and this arm discarded its output entirely, which is how a green suite and
    // a red gate coexisted for an hour with nobody able to see the difference.
    console.error(v.unmeasured
      ? `\n  the instrument could not measure this — fix the INSTRUMENT, not the tree:\n  ${v.why}`
      : `\n  ${v.why}`)
    failed.push(arm.name); break                 // FAIL FAST: the next arm costs more than this one
  }
}

if (failed.length) {
  console.error(`\n✗ green — ${failed[0]} failed; the arms after it were not run (each costs more than the last).`)
  console.error('  Nothing was pushed. Fix the named arm and run again.')
  process.exit(1)
}

// THE RECEIPT IS NOT WRITTEN HERE. Every arm has passed by this line, so a receipt written now would describe a
// green tree — but reconcile then REGENERATES the derived layer, including lean/, which the receipt covers. It
// would ship a fingerprint of a tree that had already moved. reconcile writes it as its last act before staging.
console.log(`\n✓ green — every arm passes${full ? ' (kernel included)' : ' (kernel deferred; run with --full before a release)'}.`)
if (!push) {
  console.log('  READY. Nothing pushed: pass --push to reconcile and publish, or run `npm run x -- green --push`.')
  process.exit(0)
}
console.log('  pushing via reconcile — it regenerates the derived layer, aborts on a ledger that does not reconcile, and signs the commit')
execSync('npm run reconcile', { cwd: ROOT, stdio: 'inherit' })
