#!/usr/bin/env node
// develop — THE AUTONOMOUS DEVELOPMENT PASS. Walk the gate; when it objects with a cure this pass has been TAUGHT,
// apply the cure and walk again. Bounded rounds. Exit non-zero only when an objection has no taught cure, printing it
// as the exact GAP+FIX for a human — and never inventing a cure it was not given.
//
// THE CURE TABLE IS FOLDED MANUAL WORK. Every entry below was earned the hard way on 2026-08-17: one deposit took SIX
// hand-walked strokes, and each stroke ended with a gate printing a command that a human then typed. That is a loop a
// machine should close, so it does — with one honest exception kept out: the changelog entry naming a release needs a
// human voice, and a pass that generated release prose would be writing the one thing it cannot mean.
//
// THE TWO-HANDLE LAW HOLDS: the computing handle drains what is deterministic (regenerate, sync, re-seal, reconcile);
// the paying handle keeps judgement (what a release says, what a new wing claims, which objection is really a design
// question). Usage:
//   node dist/scripts/develop.js          → heal the tree until the gate is clean, then stop (default; nothing pushed)
//   node dist/scripts/develop.js --seal   → then hand to `one-receipt seal`, and ASSERT the result is actually synced
import { teeStep, ROOT } from './api.js'
import { execSync } from 'node:child_process'

/** An objection this pass can cure: its signature in the gate's own output, and the deterministic command that fixes it. */
type Cure = { name: string; when: RegExp; cmd: string; because: string }

const CURES: Cure[] = [
  { name: 'axiom witness stale', when: /AXIOM WITNESS STALE|kernel-only-witness-shipped/,
    cmd: 'npm run axioms',
    because: 'a new theorem has no kernel-only witness yet; the audit regenerates them in one probe per file' },
  { name: 'heartbeats missing', when: /heartbeats cover the ledger|MISSING \d+: [a-z_]/,
    cmd: 'node dist/scripts/lean-heartbeats.js --sync',
    because: 'the delta mode measures only the new keys — NOT --all, which spawns a kernel per theorem and burned ninety minutes once' },
  { name: 'support-audit drift', when: /support-audit\.json/,
    cmd: 'node dist/scripts/support.js',
    because: 'a new module changed the reachability count; the audit is derived, so regenerate rather than edit' },
  { name: 'MCP surface drift', when: /docs\/mcp\.md/,
    cmd: 'node dist/scripts/gen-mcp.js',
    because: 'the tool docs are computed from the catalog keys' },
  { name: 'package surface drift', when: /packages? (?:receipt|surface)|gen:packages/,
    cmd: 'node dist/scripts/gen-packages.js',
    because: 'the six package surfaces are generated from src/index.ts; the guard hard-rejects drift' },
  { name: 'derived layer drift (spin)', when: /NON-QUANTUM DRIFT|Spin hard-rejects drift/,
    cmd: 'npm run reconcile',
    because: 'the derived files moved since the last seal; reconcile re-derives from the ledger and re-seals' },
]

/** Objections that are deliberately NOT cured here — each needs a human, and saying so is the honest answer. */
const NO_CURE: { when: RegExp; why: string }[] = [
  { when: /CHANGELOG\.md does not mention version/,
    why: 'a release note is a human voice: write the entry naming what actually moved, then run this again' },
  { when: /overclaim|fabricated|does not compute/,
    why: 'the honesty gate refused a claim — fix the claim at its source; a pass that silences this would be the fraud it exists to catch' },
]

/** The walk: the cheapest gates first, each able to name its own objection. */
const WALK: { label: string; cmd: string }[] = [
  { label: 'build', cmd: 'npm run build' },
  { label: 'guard', cmd: 'npm run guard' },
  { label: 'account', cmd: 'node dist/scripts/account.js' },
  { label: 'spin --verify', cmd: 'node dist/scripts/spin.js --verify' },
]

const MAX_ROUNDS = 6
const applied: string[] = []

for (let round = 1; round <= MAX_ROUNDS; round++) {
  let objection: { label: string; out: string } | null = null
  for (const step of WALK) {
    const r = teeStep(`develop · round ${round} · ${step.label}`, step.cmd)
    if (!r.ok) { objection = { label: step.label, out: r.out }; break }
  }
  if (!objection) {
    console.log(`\n✓ develop — the gate is clean${applied.length ? ` after ${applied.length} cure(s): ${applied.join(', ')}` : ' (nothing to heal)'}`)
    if (process.argv.includes('--seal')) {
      const sealed = teeStep('develop · seal', 'node dist/scripts/one-receipt.js seal')
      // RECONCILED MEANS SYNCED, or this fails loudly: the seal has exited 0 while unsynced before, which is how a
      // "successful" unattended run left three commits sitting on the local branch.
      const ahead = execSync('git rev-list origin/main..HEAD --count', { cwd: ROOT, encoding: 'utf8' }).trim()
      if (!sealed.ok || ahead !== '0') {
        console.error(`✗ develop — the seal did not sync (${ahead} commit(s) still local). Read the teed steps above.`)
        process.exit(1)
      }
      console.log('✓ develop — sealed and synced')
    }
    process.exit(0)
  }

  const blocked = NO_CURE.find((n) => n.when.test(objection.out))
  if (blocked) {
    console.error(`\n✗ develop — the "${objection.label}" gate objected, and this is NOT a machine's to cure:`)
    console.error(`    GAP ${objection.label}: ${objection.out.trimEnd().split('\n').slice(-6).join('\n         ')}`)
    console.error(`    FIX ${blocked.why}`)
    process.exit(1)
  }
  const cure = CURES.find((c) => c.when.test(objection.out))
  if (!cure) {
    console.error(`\n✗ develop — the "${objection.label}" gate objected with no taught cure. Read it, fix it, and TEACH it:`)
    console.error(`    GAP ${objection.out.trimEnd().split('\n').slice(-8).join('\n         ')}`)
    console.error('    FIX add the objection\'s signature + its deterministic command to CURES in src/scripts/develop.ts')
    process.exit(1)
  }
  console.log(`\n→ develop — cure for "${cure.name}": ${cure.cmd}\n  (${cure.because})`)
  const fix = teeStep(`develop · cure · ${cure.name}`, cure.cmd)
  applied.push(cure.name)
  if (!fix.ok) {
    console.error(`✗ develop — the cure for "${cure.name}" itself failed; that is a real break, not drift.`)
    process.exit(1)
  }
}

console.error(`✗ develop — ${MAX_ROUNDS} rounds spent, still objecting after cures: ${applied.join(', ')}. Every step is teed above; read the gate.`)
process.exit(1)
