#!/usr/bin/env node
// wave-run — THE WHOLE WAVE AS ONE COMMAND (the captain's order, 2026-08-24: "automate runs"). The session
// record that demanded it: the chain queue-wave → lean → axioms → guard → reconcile was hand-typed five
// times in one day, the reconcile hand-retried on its two known transient classes, and lock-waits were
// hand-written while-loops — the exact repeating manual leak the fold-the-finder law exists to absorb.
//
//   npm run x -- wave-run          → convey pending, lift cargo if any, guard, reconcile to origin
//
// THE LAWS IT KEEPS:
//   · UNCENSORED (queue lead 120): every sub-step's output is captured and PRINTED IN FULL, pass or fail —
//     a runner that eats a charge sheet forces the next hand to re-run the guard to read the accusation.
//   · ONE WRITER (the hold law): a reconcile held by a live pid is WAITED OUT by probing that pid, never
//     raced and never killed — and a dead holder's lock is the reconcile's own business, not ours.
//   · NAMED RETRIES ONLY: reconcile re-runs ONLY on its two known transient classes — the derived-drift
//     re-seal (the first pass regenerates, the second seals: the hook's own prescription "run again") and
//     the held-tree wait. An unknown failure fails LOUDLY on the spot; a retry that pattern-matches a new
//     failure to an old cause is how a real denial gets erased.
//   · CARGO-AWARE: lean + axioms run only when the conveyor ACCEPTED something — an empty wave still
//     guards and reconciles (the derived layer may owe a sync), but never re-proves for nothing.
import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT, streamStep } from './api.js'

const QUEUE = join(ROOT, 'lean', 'wave-queue.json')
const acceptedCount = (): number => {
  try { return (JSON.parse(readFileSync(QUEUE, 'utf8')) as { accepted: unknown[] }).accepted.length } catch { return 0 }
}

/** run one step, print EVERYTHING it said (pass or fail), return {ok, out}. */
// the step runner is ONE declaration (api.ts's streamStep): it streams the work live AND captures the text this
// runner needs to sort a reconcile failure into its named transient classes. A private copy here would be the
// same crack twice — and it was: this file's own capture-then-print made a twenty-two-minute lock-wait read as
// a stall while everything was fine.
/** THE ORPHAN LAW: a runner launched from a shell that later dies keeps working forever, unwatched. Two such
 *  strays were live in this machine's process table while four sessions fought for ten cores, and a peer's
 *  test suite went 40s → 782s from the contention alone. NOT MINE, as it happened — the process ages ruled my
 *  own launches out, which is the same evidence discipline the tree uses for a contested file: read the table,
 *  do not confess from conscientiousness any more than accuse from suspicion. The hazard is real regardless,
 *  so the runner now decides its own life the way this tree decides every other staleness — BY LIVENESS, never
 *  by a clock: when ppid reads 1 the launcher is gone, so stop before starting the next step. Stopping early
 *  is a FAILURE, not a success: it exits non-zero so an arc receipt can never fold an abandoned run as done. */
function orphaned(): boolean { return process.ppid === 1 }

const step = async (name: string, cmd: string): Promise<{ ok: boolean; out: string }> => {
  if (orphaned()) {
    console.error('wave-run — ORPHANED: the shell that launched this run is gone, so nobody is reading. Stopping before the next step rather than working unwatched (the load a stray runner adds is paid by every session on this machine).')
    process.exit(1)
  }
  return streamStep(`wave-run · ${name}`, cmd)
}

/** the held-tree class: wait for the NAMED pid to exit (probe, never kill), bounded by COUNTING probes —
 *  never by reading a clock (the determinism scan admits no wall-clock; 180 probes × 5 s = the 15-minute
 *  window as pure arithmetic). */
function waitForPid(pid: number, probes: number): boolean {
  for (let i = 0; i < probes; i++) {
    try { process.kill(pid, 0) } catch { return true }   // gone — the tree is free
    execSync('sleep 5')
  }
  try { process.kill(pid, 0); return false } catch { return true }
}

const before = acceptedCount()
const wave = await step('convey', 'node dist/scripts/queue-wave.js')
if (!wave.ok) process.exit(1)

if (acceptedCount() > before) {
  for (const [name, cmd] of [['lift (lean)', 'npm run lean'], ['witness (axioms)', 'npm run axioms']] as const) {
    if (!(await step(name, cmd)).ok) { console.error(`wave-run — ${name} failed; the wave stops at its exact link`); process.exit(1) }
  }
} else {
  console.log('wave-run · no new cargo — lift and witness skipped (an empty wave never re-proves for nothing)')
}

if (!(await step('guard', 'npm run guard')).ok) { console.error('wave-run — guard red; fix the named charge, never ride past it'); process.exit(1) }

// reconcile, with ONLY the two named transient classes retried (bounded: 3 attempts, then loud failure)
for (let attempt = 1; attempt <= 3; attempt++) {
  const r = await step(`reconcile (attempt ${attempt})`, 'npm run reconcile')
  if (r.ok) { console.log('\nwave-run — COMPLETE: conveyed, sealed, reconciled to origin.'); process.exit(0) }
  const held = r.out.match(/HELD by pid (\d+)/)
  if (held) {
    console.log(`wave-run · the tree is held by pid ${held[1]} — waiting it out (never racing, never killing)`)
    if (!waitForPid(Number(held[1]), 180)) { console.error('wave-run — the holder outlasted 180 probes; a human decides (lead 113: message it, never kill it)'); process.exit(1) }
    continue
  }
  if (/NON-QUANTUM DRIFT|push REJECTED/.test(r.out) && attempt < 3) {
    console.log('wave-run · the derived-drift class — the first pass regenerated, the second seals (the hook\'s own prescription)')
    continue
  }
  console.error('wave-run — reconcile failed OUTSIDE the named transient classes; failing loudly with the full output above (an unnamed failure retried is a denial erased)')
  process.exit(1)
}
