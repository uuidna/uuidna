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
import { ROOT } from './api.js'

interface Arm { name: string; why: string; run: () => boolean }

const sh = (cmd: string): boolean => spawnSync('sh', ['-c', cmd], { cwd: ROOT, stdio: 'ignore' }).status === 0
const out = (cmd: string): string => { try { return execSync(cmd, { cwd: ROOT }).toString().trim() } catch { return '' } }

const full = process.argv.includes('--full')      // include the kernel (~700s); omitted, the delta cache stands
const push = process.argv.includes('--push')      // push if — and only if — every arm is green

const ARMS: Arm[] = [
  { name: 'types', why: 'tsc with noEmitOnError — a type error must not write dist for the next step to run',
    run: () => sh('npm run build') },

  { name: 'ledger', why: 'guard: DNA recomputes, no collision, conformance holds, the lean binds to its key, determinism clean',
    run: () => sh('node dist/scripts/guard.js') },

  { name: 'tests', why: 'the invariants no finder holds — a demoted finder does not demote its test, which is how "guard green" stopped meaning green',
    run: () => sh('node --test dist/tests/*.test.js') },

  { name: 'behind', why: 'origin must hold nothing we lack — a push over a divergence is a merge decided blind',
    run: () => { execSync('git fetch origin --quiet', { cwd: ROOT }); return out('git rev-list --count HEAD..origin/main') === '0' } },

  { name: 'index', why: 'the staged set must be ours — a commit sweeps whatever another session left in the index into our message',
    run: () => {
      const staged = out('git diff --cached --name-only').split('\n').filter(Boolean)
      if (!staged.length) return true
      // derived staged without its source is exactly what precede reports; either both or neither
      const sources = out('git diff --name-only').split('\n').filter((f) => f.startsWith('lean/') && f.endsWith('.lean'))
      return sources.length === 0
    } },

  ...(full ? [{ name: 'kernel', why: 'every wing re-proven sorry-free and every theorem kernel-only (UUIDNA_PROVE_ALL=1)',
    run: () => sh('UUIDNA_PROVE_ALL=1 npm run lean && node dist/scripts/lean-axioms.js') }] : []),
]

const failed: string[] = []
for (const arm of ARMS) {
  const ok = arm.run()
  console.log(`${ok ? '✓' : '✗'} green — ${arm.name.padEnd(7)} ${ok ? 'passes' : 'FAILS'}   ${arm.why}`)
  if (!ok) { failed.push(arm.name); break }      // FAIL FAST: the next arm costs more than this one
}

if (failed.length) {
  console.error(`\n✗ green — ${failed[0]} failed; the arms after it were not run (each costs more than the last).`)
  console.error('  Nothing was pushed. Fix the named arm and run again.')
  process.exit(1)
}

console.log(`\n✓ green — every arm passes${full ? ' (kernel included)' : ' (kernel deferred; run with --full before a release)'}.`)
if (!push) {
  console.log('  READY. Nothing pushed: pass --push to reconcile and publish, or run `npm run green:push`.')
  process.exit(0)
}
console.log('  pushing via reconcile — it regenerates the derived layer, aborts on a ledger that does not reconcile, and signs the commit')
execSync('npm run reconcile', { cwd: ROOT, stdio: 'inherit' })
