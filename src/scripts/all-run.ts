#!/usr/bin/env node
// @non-harmonic: runs the arc's phases as subprocesses — a NAMED boundary, like wave-run.ts and generate.ts.
//
// all-run — THE SINGULARITY OF THE ARC (the captain's word, 2026-08-24: "singularity"). The house already
// refused this exact crack twice: generate.ts folded sixteen emitters out of a shell `&&` chain into ONE
// manifest with ONE fused receipt, and run.ts folded ~49 hand-typed package.json lines into one dispatcher —
// because an order that lives in JSON lives where no finder is looking. Then `"all": "npm run wave && npm run
// ship"` put a two-link chain right back into that JSON. This is that chain folded: ONE manifest, ONE arc,
// ONE receipt.
//
//   npm run all        → deposit to origin to edge, one command, one receipt
//   npm run all --dry  → the arc's plan, classified, without running it
//
// WHY A RECEIPT OVER THE ARC AND NOT JUST PER PHASE. Each phase already proves itself — the wave reconciles to
// origin, the deploy verifies the live edge against the local ledger and mints its self-licensing trial. What
// no phase can prove is that THIS ARC ran as one act: the fold binds every phase's name and verdict
// order-invariantly (merkleGravity), so an arc that skipped a phase, or ran them apart, folds to a different
// receipt. One stroke, one address — the same law the ledger keeps for theorems, kept for the act that ships
// them. HONEST SCOPE: the arc receipt proves WHICH phases ran and how they ended (integrity, theorem
// provenance_integrity_not_content_truth) — never that the world outside is as the phases described it.
import { spawnSync } from 'node:child_process'
import { toUuid, merkleGravity } from '../index.js'
import { ROOT } from './api.js'

interface Phase { name: string; cmd: string; note: string }

/** THE MANIFEST — the arc's order, stated once, in source, where the finders look. */
export const PHASES: readonly Phase[] = [
  { name: 'wave', cmd: 'node dist/scripts/wave-run.js', note: 'convey the queue, lift what the kernel seals, guard, reconcile to origin' },
  { name: 'ship', cmd: 'node dist/scripts/deploy-run.js', note: 'contribute first, build, ship the worker, verify the live edge, prove the deploy' },
]

/** the leaf a phase folds to — its name and how it ended, nothing else (an arc is WHICH phases, and their verdicts) */
export const phaseLeaf = (name: string, ok: boolean): string => toUuid(`phase|${name}|${ok ? 'ok' : 'fail'}`)
/** the arc's receipt: order-invariant over the phase leaves, so two observers fold the same act to one address */
export const arcReceipt = (leaves: readonly string[]): string => merkleGravity([...leaves])

if (process.argv.includes('--dry')) {
  console.log('all — the arc, classified (nothing run):')
  for (const p of PHASES) console.log(`  ${p.name.padEnd(6)} ${p.cmd.padEnd(38)} ${p.note}`)
  console.log(`  arc receipt if every phase passes: ${arcReceipt(PHASES.map((p) => phaseLeaf(p.name, true)))}`)
  process.exit(0)
}

// THE ARC RUNS ONLY WHEN IT IS THE COMMAND, NEVER WHEN IT IS AN IMPORT (2026-08-24).
//
// This file had no main guard, so every `import { PHASES } from './all-run.js'` EXECUTED the arc — and PHASES
// ends in `ship`, which is `deploy-run.js`: contribute the coins, build the worker, push it to the live edge.
// all-run.test.ts imports PHASES to assert the manifest states the order in SOURCE, which is exactly the right
// test to write; merely writing it armed a production deploy on every run of the tree-wide suite. It never
// fired only because the reconcile phase blocked on another session's writer lock and the arc died there
// first — the lock, built for a different hazard, is the only reason a unit test did not ship the worker.
//
// A MODULE THAT DOES SOMETHING OUTWARD WHEN NAMED IS NOT A MODULE. Every other runner in this tree already
// guards this way (one-writer.ts, gen-handle-chunks.ts and the rest test process.argv[1] against their own
// filename); this one was the exception, and the exception is the one whose last phase is irreversible. The
// guard costs a line and removes the entire class: importing gives you the manifest, running gives you the arc.
const isMain = process.argv[1]?.endsWith('all-run.js') ?? false
if (isMain) {
  runArc()
}

function runArc(): void {
console.log('all — THE ARC: deposit to origin to edge, one manifest, one receipt.\n')
const leaves: string[] = []
for (const p of PHASES) {
  console.log(`\n══ all · ${p.name} — ${p.note}`)
  // the build is the phase's own first step (each runner is invoked through its npm script's build in CI; here
  // the arc builds ONCE up front, so a phase never rebuilds what the phase before it just compiled)
  const r = spawnSync(p.cmd, { shell: true, cwd: ROOT, stdio: 'inherit' })
  const ok = r.status === 0
  leaves.push(phaseLeaf(p.name, ok))
  if (!ok) {
    // FAIL-FAST, AND FOLD ANYWAY: the arc receipt of a failed arc is still an address — a run that stopped at
    // its exact link is a fact worth addressing, not a hole. The exit code carries the failure; the receipt
    // carries WHICH arc it was.
    console.error(`\n✗ all — the arc stopped at ${p.name} (exit ${r.status}); arc receipt ${arcReceipt(leaves)}`)
    process.exit(r.status ?? 1)
  }
}
console.log(`\n✓ all — THE ARC COMPLETE: ${PHASES.map((p) => p.name).join(' → ')}, folded to one receipt ${arcReceipt(leaves)}`)
}
