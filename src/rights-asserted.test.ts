import { test } from 'node:test'
import assert from 'node:assert/strict'
import { legalFacts } from './legal.js'

test('every asserted right is one that arises automatically — nothing here was applied for', () => {
  // The distinction the block turns on: asserting a right you hold is not the same act as claiming a status you
  // do not. Both entries arise on creation with no registration, so recording them costs nothing and asserting
  // them is the only thing that was ever missing.
  const f = legalFacts()
  assert.ok(f.rightsAsserted.length > 0)
  for (const r of f.rightsAsserted) {
    assert.equal(r.automatic, true, `${r.right} must arise automatically or it does not belong here`)
    assert.ok(r.instrument.length > 0, 'a right without a named instrument is a wish')
    assert.ok(r.basis.length > 40, 'and it must say WHY it applies here, not merely that it exists')
  }
})

test('no patent, no trademark registration, no compliance status is claimed', () => {
  // What is absent is as much the point. The licence is ND and the ledger is published as prior art precisely
  // so nobody — including this project — can enclose it.
  const f = legalFacts()
  const text = JSON.stringify(f.rightsAsserted).toLowerCase()
  assert.ok(!/\bpatent\b/.test(text), 'no patent is claimed')
  assert.ok(!/registered trademark|trademark registration/.test(text), 'no registration is claimed that was never filed')
  assert.equal(f.complianceStance.makesComplianceClaim, false)
  assert.equal(f.complianceStance.overclaimRefused, true, 'the gate still refuses a blanket compliance claim')
})

test('vesting and price are stated as different questions', () => {
  // An earlier phrasing said the rights arise with "no registration, no fee, no filing" and stopped there,
  // which reads as a claim that nothing is owed. Vesting is free; USE is priced — non-commercial needs no
  // licence, commercial is billed the two conserved coins on the measured advantage, and every publication
  // carries a contribution path. Recording only the first half would be the overclaim.
  const c = legalFacts().consideration
  assert.match(c.nonCommercial, /free/i)
  assert.match(c.commercial, /billed|coins/i)
  assert.match(c.contribution, /^https:\/\//, 'the contribution path is a real URL, not a description of one')
  assert.match(c.note, /vest/i)
})

test('the fact base still leads with what it is not', () => {
  assert.match(legalFacts().disclaimer, /NOT A LEGAL AUDIT|not.*legal advice/i)
})
