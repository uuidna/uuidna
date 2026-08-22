// detail-audit — the auditor of every single detail is itself on trial here, and by its own discipline: an
// instrument is only believed because it is shown able to fail. Each verdict route (decided-true, decided-false,
// relevant citation, laundered citation, fabricated citation, bare prose) gets a detail that must land on it —
// a detail landing anywhere else is the finding.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { auditDetails, auditDetail, splitDetails } from '../detail-audit.js'

test('the controls are pre-registered, run first, and all rejected — the instrument can fail', () => {
  const a = auditDetails('anything at all.')
  assert.equal(a.outcome, 'audited')
  assert.equal(a.controls.length, 3, 'three controls: arithmetic, laundered citation, fabricated citation')
  for (const c of a.controls) assert.equal(c.rejected, true, `control accepted — the instrument cannot discriminate: ${c.control} → ${c.got}`)
})

test('every route gets a detail and every detail lands on its route', () => {
  assert.equal(auditDetail('2 + 2 = 4').verdict, 'VERIFIED_BY_DECIDE', 'true arithmetic decides true')
  assert.equal(auditDetail('2 + 2 = 5').verdict, 'REFUTED', 'false arithmetic is the one thing this can refute')
  const relevant = auditDetail('the reflection has fixed points 0 and 5, proven by theorem dz_fixed_points')
  assert.equal(relevant.verdict, 'VERIFIED', 'a relevant sealed citation verifies')
  assert.deepEqual(relevant.cites, ['dz_fixed_points'])
  const laundered = auditDetail('the moon is made of cheese, proven by theorem two_coins')
  assert.equal(laundered.verdict, 'UNVERIFIED', 'a real citation about a disjoint topic verifies nothing')
  const fabricated = auditDetail('this holds, proven by theorem no_such_theorem_exists_here')
  assert.equal(fabricated.verdict, 'DRAINED', 'a fabricated citation drains')
  assert.deepEqual(fabricated.fabricated, ['no_such_theorem_exists_here'])
  assert.equal(auditDetail('water is wet').verdict, 'UNVERIFIED', 'bare prose is not-yet, never false')
})

test('a document is audited detail by detail, counted without a silent cap, folded to one receipt', () => {
  const text = '2 + 2 = 4. 2 + 2 = 5.\nThe reflection has fixed points 0 and 5, proven by theorem dz_fixed_points.\nWater is wet.'
  const a = auditDetails(text, { title: 'the four routes' })
  assert.equal(a.details, 4)
  assert.equal(a.dropped, 0)
  assert.deepEqual(a.counts, { verified: 2, refuted: 1, unverified: 1, drained: 0 })
  const b = auditDetails(text, { title: 'the four routes' })
  assert.equal(a.receipt, b.receipt, 'the same text and ledger always fold to the same receipt')
  assert.equal(a.address, b.address)
})

test('the split is deterministic, bullet-stripping, and never eats a leading number', () => {
  assert.deepEqual(splitDetails('- 2 + 2 = 4\n• second point'), ['2 + 2 = 4', 'second point'])
  assert.deepEqual(splitDetails('One. Two! Three?'), ['One.', 'Two!', 'Three?'])
  assert.deepEqual(splitDetails(''), [])
})

test('a verdict moved is a receipt moved — altering one detail is visible in the fold', () => {
  const a = auditDetails('2 + 2 = 4.')
  const b = auditDetails('2 + 2 = 5.')
  assert.notEqual(a.receipt, b.receipt)
})
