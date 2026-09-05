import { test } from 'node:test'
import assert from 'node:assert/strict'
import { vacuityReason } from './vacuity.js'
import { validateCandidate } from './wave-deposit.js'
import { vacuousGaps } from './scripts/one-receipt.js'

// THE RULE HAS TWO CONSUMERS AND MUST BE ONE RULE. It was a closure inside vacuousGaps, so it could only run
// as a guard — after a candidate had been deposited, kernel-probed, accepted and sealed. The conveyor sealed
// `alpine_security_ops_plannable_4 : (4 + 0 = 4) ∧ (0 = 0)` and only the post-seal guard had a word for it.
// These tests hold the extraction faithful AND hold the door to the same rule.

const cand = (lean: string) => ({
  key: 'vacuity_probe_1',
  why: 'a candidate whose prose is long enough to clear the door law',
  lean,
})

test('vacuityReason names the fault the conveyor actually sealed', () => {
  const r = vacuityReason('(4 + 0 = 4) ∧ (0 = 0)')
  assert.ok(r, 'the exact statement the wave sealed must be recognised')
  assert.match(r, /every conjunct is vacuous/)
})

test('vacuityReason descends into a conjunction — the bug that let it through', () => {
  // The earlier rule split on the top-level operator and compared the two HALVES to each other. The halves of
  // `(4 + 0 = 4) ∧ (0 = 0)` are unequal, so it returned null and never looked inside either one.
  assert.ok(vacuityReason('(2604 + 0 = 2604) ∧ (0 = 0)'))
  assert.ok(vacuityReason('(7 * 1 = 7) ∧ (5 = 5) ∧ (0 + 3 = 3)'))
})

test('vacuityReason names each identity for its own reason', () => {
  assert.match(vacuityReason('True')!, /proves nothing at all/)
  assert.match(vacuityReason('(9 = 9)')!, /reflexivity/)
  assert.match(vacuityReason('(7 * 1 = 7)')!, /multiplicative identity/)
  assert.match(vacuityReason('(12 + 0 = 12)')!, /additive identity/)
  assert.match(vacuityReason('(12 - 0 = 12)')!, /subtracting nothing/)
})

// THE CONTROL. A rule that answers "vacuous" to everything would pass every test above and refuse the whole
// conveyor. These say something, and the rule must let them through.
test('a substantive statement is NOT vacuous — the rule can fail', () => {
  for (const s of [
    '(85179 / 36 = 2366) ∧ (2603 * 36 = 93708)',
    '(144 + 100 = 244) ∧ (100 < 119)',
    '(6 + 4 + 10 = 20)',
    '(77885 > 75224) ∧ (32183 < 32424)',
  ]) assert.equal(vacuityReason(s), null, s)
})

test('the deposit door refuses what the guard would have caught after the seal', () => {
  const sealed = new Map<string, unknown>()
  const bad = validateCandidate(cand('theorem vacuity_probe_1 : (4 + 0 = 4) ∧ (0 = 0) := by decide'), sealed)
  assert.ok(bad, 'the door must refuse the statement the conveyor once accepted')
  assert.match(bad, /vacuity law/)
  const ok = validateCandidate(cand('theorem vacuity_probe_1 : (144 + 100 = 244) ∧ (100 < 119) := by decide'), sealed)
  assert.equal(ok, null, 'a substantive candidate must still reach the kernel')
})

test('the door and the guard cite the same rule — one declaration, two consumers', () => {
  // Whatever the guard reports vacuous, the door must refuse; a fold that drifts is two rules wearing one name.
  for (const g of vacuousGaps()) {
    const m = /`([^`]+)`/.exec(g.what)
    if (!m) continue
    assert.ok(vacuityReason(m[1]!), `the door's rule must see what the guard reported: ${m[1]}`)
  }
})
