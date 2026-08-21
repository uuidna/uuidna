#!/usr/bin/env node
// seal-claims-audit — Integrate captain claims into the audit pipeline
// Ensures no unclaimed work escapes detection, no orphaned claims exist,
// and all claims are recomputable (same receipt on every run)

import { theorems, coins, merkleGravity } from '../index.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const T = theorems()

interface ClaimState {
  timestamp: string
  total_theorems: number
  claimed: number
  unclaimed: number
  unclaimed_keys: string[]
  receipt: string
}

console.log('\n╔════════════════════════════════════════════════════════════╗')
console.log('║ SEAL-CLAIMS-AUDIT — Verify Claims Completeness & Drift   ║')
console.log('╚════════════════════════════════════════════════════════════╝\n')

// Load the captain claims ledger
const claimsPath = join(process.cwd(), 'docs/captain-claims.json')
let claimsLedger: any = {}
try {
  claimsLedger = JSON.parse(readFileSync(claimsPath, 'utf-8'))
} catch {
  console.log('⚠ WARNING: Could not load claims ledger. Run: npm run gen:captain-claims\n')
}

// Count claimed theorems from the ledger
const allClaimedCount = claimsLedger.total_claimed || 0

// Find unclaimed theorems — those whose KEY doesn't appear in claims_list (one entry per theorem, keyed by its
// own lineAddress; see gen-captain-claims.ts). Two earlier bugs lived here in turn: first this compared
// t.principle against a Set of CATEGORY NAMES like "Algebra" (never matches — a theorem's principle is never
// literally equal to a category label), then it read a categories_list/keys[] shape gen-captain-claims.ts no
// longer emits at all, now that claims are per-theorem, not per-bucket.
const claimedKeys = new Set<string>(
  (claimsLedger.claims_list || []).map((c: any) => c.key)
)
const unclaimedKeys = T
  .filter(t => !claimedKeys.has(t.key))
  .map(t => t.key)
  .slice(0, 20) // Show first 20 unclaimed

console.log('AUDIT STATE:')
console.log('─────────────────────────────')
console.log(`Total theorems in ledger: ${T.length}`)
console.log(`Claimed by captain:       ${allClaimedCount}`)
console.log(`Unclaimed:                ${T.length - allClaimedCount}`)
console.log(`Claim receipt:            ${claimsLedger.claim_receipt || 'NONE'}`)
console.log()

if (T.length - allClaimedCount > 0) {
  console.log('⚠ UNCLAIMED THEOREMS (sample):')
  for (const key of unclaimedKeys.slice(0, 10)) {
    const t = T.find(x => x.key === key)
    console.log(`  • ${key} (${t?.principle || 'unknown'})`)
  }
  console.log()
}

// Verify claims are recomputable
console.log('RECOMPUTABLE VERIFICATION:')
console.log('─────────────────────────────')

// Matches gen-captain-claims.ts exactly: an order-invariant fold over every claim's OWN lineAddress — no
// re-hashing, the same values the generator folded.
const claimLineAddresses = (claimsLedger.claims_list || []).map((c: any) => c.lineAddress)
const recomputedReceipt = merkleGravity(claimLineAddresses)

console.log(`Original receipt:   ${claimsLedger.claim_receipt}`)
console.log(`Recomputed receipt: ${recomputedReceipt}`)

const receiptsMatch = claimsLedger.claim_receipt === recomputedReceipt
console.log(`Match: ${receiptsMatch ? '✓ YES' : '✗ NO — DRIFT DETECTED'}`)
console.log()

if (!receiptsMatch) {
  console.log('🚨 CRITICAL: Claim receipt has drifted!')
  console.log('   The claims ledger may have been tampered with or regenerated.')
  console.log('   Run: npm run gen:captain-claims && npm run reconcile')
  console.log()
}

// Build audit gate item for pre-push verification
const auditGate = {
  name: 'captain-claims-sealed',
  description: 'Captain claims are complete, recomputable, and integrated',
  checks: [
    {
      name: 'all-theorems-claimed',
      passed: T.length - allClaimedCount === 0,
      detail: `${allClaimedCount}/${T.length} theorems claimed`,
    },
    {
      name: 'receipt-recomputable',
      passed: receiptsMatch,
      detail: `Receipt matches: ${receiptsMatch}`,
    },
    {
      name: 'captain-authority-valid',
      passed: coins() === 2,
      detail: `Captain holds ${coins()} coins (conserved invariant)`,
    },
  ],
  passed: (T.length - allClaimedCount === 0) && receiptsMatch && coins() === 2,
}

console.log('AUDIT GATE STATUS:')
console.log('─────────────────────────────')
for (const check of auditGate.checks) {
  const icon = check.passed ? '✓' : '✗'
  console.log(`  ${icon} ${check.name.padEnd(30)} — ${check.detail}`)
}
console.log()

if (auditGate.passed) {
  console.log('✓ CAPTAIN CLAIMS SEALED — Ready for deploy')
  console.log(`  All ${T.length} theorems claimed, each by its own lineAddress`)
  console.log(`  Receipt is recomputable and matches`)
  console.log(`  Captain authority verified (${coins()} coins conserved)`)
} else {
  console.log('✗ GAPS DETECTED — Automation incomplete')
  console.log('  Action required:')
  if (T.length - allClaimedCount > 0) {
    console.log(`    1. Claim ${T.length - allClaimedCount} unclaimed theorems`)
    console.log('       Run: npm run gen:captain-claims')
  }
  if (!receiptsMatch) {
    console.log('    2. Fix receipt drift')
    console.log('       Run: npm run reconcile')
  }
}

console.log()
console.log('═════════════════════════════════════════════════════════════')
console.log(`${auditGate.passed ? '✓' : '✗'} SEAL VERIFICATION COMPLETE\n`)

// Exit with error if gate failed (to block pre-push)
if (!auditGate.passed) {
  process.exit(1)
}
