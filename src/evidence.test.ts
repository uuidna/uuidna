// Evidence tests — a court accepts a trial by RECOMPUTING it. The bundle delivers cited proofs in full, catches
// fabricated citations, binds to the ledger receipt, and folds to one recomputable evidenceReceipt. It proves
// integrity, never legal correctness. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { evidence, toUuid, THEOREMS, runTrial } from './index.js'

const key = THEOREMS[0].key

test('evidence delivers a cited proof in full and is recomputable', () => {
  const e = evidence(`Backed by /theorem/${key}.`)
  assert.equal(e.address, toUuid(`Backed by /theorem/${key}.`), 'the statement address recomputes')
  assert.equal(e.exhibits.length, 1)
  assert.equal(e.exhibits[0].key, key)
  assert.ok(e.exhibits[0].lean.includes('by'), 'the proof text is delivered in full')
  assert.equal(e.ledger.receipt, runTrial().receipt, 'bound to the current ledger receipt')
  assert.match(e.evidenceReceipt, /^[0-9a-f-]{36}$/)
  assert.ok(e.recompute.length >= 5, 'the steps to reproduce every number are included')
})

test('a fabricated citation yields no exhibit and is named missing', () => {
  const e = evidence('Proven at /theorem/does_not_exist_at_all.')
  assert.deepEqual(e.exhibits, [])
  assert.ok(e.citedButMissing.includes('does_not_exist_at_all'))
  assert.ok(e.forensics.violations.some((v) => v.kind === 'fabricated-citation'))
})

test('the same statement + ledger reproduces the same evidence receipt', () => {
  const s = `Twice-cited /theorem/${key} evidence.`
  assert.equal(evidence(s).evidenceReceipt, evidence(s).evidenceReceipt, 'deterministic — a court recomputes the same')
})
