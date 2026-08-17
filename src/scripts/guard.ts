#!/usr/bin/env node
// guard — CATCH TRAITORS FAST, before the slow gate. The full pre-push gate (`npm run next`) is thorough but ~4 minutes
// (crypto KATs + lean regen). This runs the FAST intrusion checks in seconds so a forgery is caught immediately, not
// after a wasted reconcile: the ledger-level sweep catchTraitors() (DNA recompute, collisions, coverage, conformance —
// pure, O(N)) AND the source-level harmonic-scan (non-quantum / Math.* / wall-clock / RNG sneak). Exit 1 on any traitor.
// Run it after any edit; the reconcile still runs the full gate. No manual pre-flight — one command. Integrity, not truth.
import { execSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { catchTraitors } from '../treason.js'
import { theorems } from '../index.js'
import { HERE, ROOT } from './api.js'

let failed = false

// 1) the ledger sweep — pure, O(N), milliseconds
const t = catchTraitors()
if (t.clean) {
  console.log(`✓ guard — ledger clean: ${t.scanned} theorems, no traitor caught (${t.checks.join(', ')}); receipt ${t.receipt}`)
} else {
  failed = true
  console.error(`✗ guard — ${t.traitors.length} TRAITOR(S) caught in the ledger:`)
  for (const v of t.traitors) console.error(`    [${v.kind}] ${v.detail}`)
}

// 1b) the AXIOM WITNESS — bring the guard FORWARD of the slow gate: a clever traitor sealing a NON-KERNEL theorem
// (borrowing propext/Classical.choice) or a NEW theorem not yet audited slips the structural checks and only trips
// the 12s Lean re-run. lean/axioms.json is the derived witness {audited, axiomFree, offenders}; verifying it COVERS
// every current theorem and is fully axiom-free catches that class in milliseconds — no Lean re-run.
try {
  const ax = JSON.parse(readFileSync(join(ROOT, 'lean', 'axioms.json'), 'utf8')) as { audited: number; axiomFree: number; offenders?: string[] }
  const N = theorems().length
  const offenders = ax.offenders ?? []
  if (ax.audited < N) { failed = true; console.error(`✗ guard — AXIOM WITNESS STALE: ${ax.audited}/${N} theorems audited (a new theorem lacks a kernel-only witness) — run \`npm run axioms\``) }
  else if (ax.axiomFree < ax.audited || offenders.length) { failed = true; console.error(`✗ guard — NON-KERNEL theorem: ${ax.axiomFree}/${ax.audited} axiom-free${offenders.length ? '; offenders: ' + offenders.join(', ') : ''} — the ledger borrows an axiom`) }
  else console.log(`✓ guard — axiom witness: ${ax.axiomFree}/${ax.audited} theorems kernel-only (no propext, no Classical.choice), covering all ${N}`)
} catch { failed = true; console.error('✗ guard — no lean/axioms.json witness — run `npm run axioms` (the ledger has no kernel-only proof witness)') }

// 2) the source sweep — the tightened harmonic-scan (non-quantum + determinism hard-reject), fast
try {
  execSync('node ' + JSON.stringify(join(HERE, 'harmonic-scan.js')), { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — harmonic-scan caught a non-quantum / non-deterministic sneak (see above)')
}

// 3) the SPLIT sweep — the packages/* surfaces are COMPUTED from src/index.ts (gen-packages); a hand edit to a
// package surface is drift and fails here exactly like a hand edit to the ledger. Milliseconds — a few file reads.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'gen-packages.js')) + ' --verify', { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — a package surface drifts from the computed split (run `npm run gen:packages`)')
}

// 4) PACKAGE AUDIT — quantum-speed gap detection on package configuration, structure, and tree-shakeability.
// Catches missing files, malformed package.json, missing documentation, broken test lanes. Milliseconds.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'audit-packages.js')), { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — audit-packages detected configuration gaps in packages/* (see above)')
}

// 4b) LEGAL-GAPS AUDIT — quantum automation for the legal surface: license drift across every package.json/LICENSE/
// docs, a README or CONTRIBUTING silent on terms, "open-source" overclaims against the CC license, sealed currency
// rates, author-identity drift. Consistency, not counsel. Milliseconds.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'one-receipt.js')) + ' legal', { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — audit-legal-gaps found contradictions in the legal record (see above)')
}

// 4c) PROSE-ANCHORS AUDIT — the last manual act folded: every hand-written page must walk to a sealed theorem or
// cluster, and every repo path a doc teaches must exist. The reading a human did each wave, now milliseconds.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'one-receipt.js')) + ' prose', { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — audit-prose-anchors found unanchored pages or stale path claims (see above)')
}

// 4d) THE HELD LINES — the session-born finders, wired so their gap classes cannot re-enter: coherent (no mixed
// dist from interleaved writers), absence (no encryption-denial without the presence pointer), pipes (no gate's
// exit code flowing into a pipe), actions (one major per action, tree-wide — the drift that hid a deprecated
// runtime), micro (the JSON-LD layer honest — only when a built site exists to audit).
// Each milliseconds; each was once a manual discovery; none will be again.
for (const line of ['coherent', 'absence', 'pipes', 'actions']) {
  try {
    execSync('node ' + JSON.stringify(join(HERE, 'one-receipt.js')) + ' ' + line, { stdio: 'inherit' })
  } catch {
    failed = true
    console.error(`✗ guard — one-receipt ${line} found a regression in its held line (see above)`)
  }
}
if (existsSync(join(HERE, '../../docs/.vitepress/dist'))) {
  try {
    execSync('node ' + JSON.stringify(join(HERE, 'one-receipt.js')) + ' micro', { stdio: 'inherit' })
  } catch {
    failed = true
    console.error('✗ guard — one-receipt micro found dishonest microdata on the built site (see above)')
  }
}

// 5) QUANTUM PREDICTION — predict gaps before they form and auto-fill critical ones.
// Analyzes patterns (new theorems, new packages, new exports, new tests, new features) and seals them preemptively.
// Milliseconds — pure prediction, no external calls.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'predict-and-fill.js')), { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — predict-and-fill quantum prediction failed (see above)')
}

// 6) QUANTUM FOLD — compress entire system state (theorems, packages, exports, tests, predictions, dimensions)
// into one order-invariant merkle fold. Seal proof of current system state. Recomputable by anyone.
try {
  execSync('node ' + JSON.stringify(join(HERE, 'one-receipt.js')) + ' fold', { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — fold-quantum failed to seal system state (see above)')
}

if (failed) { console.error('\n✗ guard — traitors caught; fix before reconcile.'); process.exit(1) }
console.log('✓ guard — no traitors: the ledger is unforged and the source is harmonic. Quantum fold sealed. Safe to reconcile.')
