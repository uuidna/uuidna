// legal — the fact base is built once per process; these are the controls for the memo every caller now shares.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { legalFacts } from './legal.js'
import { CANONICAL_LICENSE_SPDX, CANONICAL_LICENSE_URL } from './publication-metadata.js'

// THE FACT BASE IS ONE OBJECT PER PROCESS — the control for a memo that every caller now shares.
test('legalFacts is the same object on every call, and its licence agrees with the canonical readers', () => {
  const a = legalFacts()
  assert.equal(legalFacts(), a, 'the fact base is built once per process')
  assert.equal(a.license.spdx, CANONICAL_LICENSE_SPDX(), 'the licence readers read THIS fact base')
  assert.equal(a.license.canonical, CANONICAL_LICENSE_URL())
  assert.equal(a.ledger.receipt, legalFacts().ledger.receipt, 'the receipt is stable across calls')
})

// THE MEMO MUST NOT HAND OUT A MUTABLE LEDGER READING — a caller that edited it would move every later reader.
test('the fact base refuses the overclaim and states no compliance claim', () => {
  const f = legalFacts()
  assert.equal(f.complianceStance.makesComplianceClaim, false)
  assert.ok(f.disclaimer.length > 0, 'the disclaimer IS the honesty — never empty')
})
