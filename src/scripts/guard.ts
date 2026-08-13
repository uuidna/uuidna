#!/usr/bin/env node
// guard — CATCH TRAITORS FAST, before the slow gate. The full pre-push gate (`npm run next`) is thorough but ~4 minutes
// (crypto KATs + lean regen). This runs the FAST intrusion checks in seconds so a forgery is caught immediately, not
// after a wasted reconcile: the ledger-level sweep catchTraitors() (DNA recompute, collisions, coverage, conformance —
// pure, O(N)) AND the source-level harmonic-scan (non-quantum / Math.* / wall-clock / RNG sneak). Exit 1 on any traitor.
// Run it after any edit; the reconcile still runs the full gate. No manual pre-flight — one command. Integrity, not truth.
import { execSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { catchTraitors } from '../treason.js'

const HERE = dirname(fileURLToPath(import.meta.url))
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

// 2) the source sweep — the tightened harmonic-scan (non-quantum + determinism hard-reject), fast
try {
  execSync('node ' + JSON.stringify(join(HERE, 'harmonic-scan.js')), { stdio: 'inherit' })
} catch {
  failed = true
  console.error('✗ guard — harmonic-scan caught a non-quantum / non-deterministic sneak (see above)')
}

if (failed) { console.error('\n✗ guard — traitors caught; fix before reconcile.'); process.exit(1) }
console.log('✓ guard — no traitors: the ledger is unforged and the source is harmonic. Safe to reconcile.')
