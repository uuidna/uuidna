import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mintGate, mintGateGaps } from './mint-gate.js'
import { theoremDepositLedger, gradeTheoremRecord } from '../deposit-records.js'
import { propositionAddress } from '../proposition-address.js'

// A GATE WITH NO DEMONSTRATED REFUSAL IS A SUGGESTION — by construction, a check that always returns the empty
// list is indistinguishable from a healthy tree. So these exercise the refusal paths, not only the pass.

test('the gate REFUSES a record whose merge key does not match its statement', () => {
  const rec = theoremDepositLedger().records[0]!
  const tampered = { ...rec, propositionAddress: propositionAddress('something else entirely') }
  const failed = gradeTheoremRecord(tampered, [rec.abstract]).filter((g) => !g.ok).map((g) => g.name)
  assert.ok(failed.includes('merge-key'), 'a mismatched merge key must be caught, or two repos cannot merge')
})

test('the gate REFUSES a record that discards a statement form', () => {
  const rec = theoremDepositLedger().records[0]!
  const lost = { ...rec, statementForms: ['(999 * 999) % 9 = 0'] }
  const failed = gradeTheoremRecord(lost, [rec.abstract]).filter((g) => !g.ok).map((g) => g.name)
  assert.ok(failed.includes('forms-kept'), 'a form that does not normalise to this proposition is a lost occurrence')
})

test('the gate REFUSES a thin abstract and an invented DOI', () => {
  const rec = theoremDepositLedger().records[0]!
  const thin = gradeTheoremRecord({ ...rec, abstract: 'short' }, ['short'])
  assert.equal(thin.find((g) => g.name === 'abstract-substance')?.ok, false)
  const invented = gradeTheoremRecord({ ...rec, doi: '10.5281/zenodo.1' as unknown as null }, [rec.abstract])
  assert.equal(invented.find((g) => g.name === 'doi-not-invented')?.ok, false)
})

test('every gate check names what it measured and why it matters', () => {
  for (const c of mintGate().checks) {
    assert.ok(c.name.length > 0)
    assert.ok(c.measured.length > 0, `${c.name}: a check with no measurement is an opinion`)
    assert.ok(c.why.length > 40, `${c.name}: a failure must explain the consequence`)
  }
})

test('the gate passes here, and would deposit propositions rather than keys', () => {
  const g = mintGate()
  assert.deepEqual(g.failed.map((c) => c.name), [], 'the mint is refused while any check fails')
  assert.equal(g.ready, true)
  assert.equal(g.passed, g.checks.length)
  assert.equal(g.monographs, 117)
  assert.equal(g.propositions, 2536, 'one DOI per PROPOSITION — 2617 keys fold to 2536')
  assert.deepEqual(mintGateGaps(), [])
})

test('the gate receipt is deterministic', () => {
  assert.equal(mintGate().receipt, mintGate().receipt)
})
