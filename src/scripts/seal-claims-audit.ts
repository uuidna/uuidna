#!/usr/bin/env node
// seal-claims-audit — Integrate captain claims into the audit pipeline
// Ensures no unclaimed work escapes detection, no orphaned claims exist,
// and all claims are recomputable (same receipt on every run)

import { theorems, coins, toUuid, merkleGravity } from '../index.js'
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

// Find unclaimed theorems (those not in any claimed category principle)
const claimedPrinciples = new Set(
  claimsLedger.categories_list?.map((c: any) => c.category) || []
)
const unclaimedKeys = T
  .filter(t => !claimedPrinciples.has(t.principle))
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

const categoryReceipts = claimsLedger.categories_list?.map((c: any) => toUuid(c.address)) || []
const recomputedReceipt = merkleGravity(categoryReceipts)

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
  console.log(`  All ${T.length} theorems claimed in ${claimsLedger.categories} categories`)
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
