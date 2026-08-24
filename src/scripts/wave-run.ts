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
import { execSync, spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { ROOT } from './api.js'

const QUEUE = join(ROOT, 'lean', 'wave-queue.json')
const acceptedCount = (): number => {
  try { return (JSON.parse(readFileSync(QUEUE, 'utf8')) as { accepted: unknown[] }).accepted.length } catch { return 0 }
}

/** run one step, print EVERYTHING it said (pass or fail), return {ok, out}. */
function step(name: string, cmd: string): { ok: boolean; out: string } {
  console.log(`\nwave-run · ${name} — ${cmd}`)
  const r = spawnSync(cmd, { shell: true, cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  const out = (r.stdout ?? '') + (r.stderr ?? '')
  process.stdout.write(out)
  return { ok: r.status === 0, out }
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
const wave = step('convey', 'node dist/scripts/queue-wave.js')
if (!wave.ok) process.exit(1)

if (acceptedCount() > before) {
  for (const [name, cmd] of [['lift (lean)', 'npm run lean'], ['witness (axioms)', 'npm run axioms']] as const) {
    if (!step(name, cmd).ok) { console.error(`wave-run — ${name} failed; the wave stops at its exact link`); process.exit(1) }
  }
} else {
  console.log('wave-run · no new cargo — lift and witness skipped (an empty wave never re-proves for nothing)')
}

if (!step('guard', 'npm run guard').ok) { console.error('wave-run — guard red; fix the named charge, never ride past it'); process.exit(1) }

// reconcile, with ONLY the two named transient classes retried (bounded: 3 attempts, then loud failure)
for (let attempt = 1; attempt <= 3; attempt++) {
  const r = step(`reconcile (attempt ${attempt})`, 'npm run reconcile')
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
