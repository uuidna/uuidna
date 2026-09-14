// leads-conserved — the 2026-09-14 deletion of 21 leads, involuted into a check. Each rule has a control that must fire:
// a check that passes a deleted lead, or refuses a lawful move, would be the same failure dressed as a pass.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { leadsMissingFrom, untriedLeads, candidatesMissingFrom, sealMismatch } from './scripts/leads-conserved.js'

test('a kernel-refused candidate that vanishes from the queue is named', () => {
  const gaps = candidatesMissingFrom({ refused: [{ key: 'k1' }, { key: 'k2' }] }, { refused: [{ key: 'k1' }], accepted: [] })
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /k2/)
})

test('CONTROL: a refused candidate later accepted by the kernel is conserved', () => {
  assert.deepEqual(candidatesMissingFrom({ refused: [{ key: 'k1' }] }, { refused: [], accepted: [{ key: 'k1' }] }), [])
})

test('a trial record whose seal differs from the recomputation is refused — edited by hand, or stale', () => {
  assert.equal(sealMismatch({ seal: 'aaaa' }, { seal: 'bbbb' }).length, 1)
  assert.equal(sealMismatch(null, { seal: 'bbbb' }).length, 1, 'an absent record is a gap, never clean')
})

test('CONTROL: the record the court recomputes exactly passes', () => {
  assert.deepEqual(sealMismatch({ seal: 'bbbb' }, { seal: 'bbbb' }), [])
})

const head = { trial: [{ lead: 'a' }, { lead: 'b' }], refuted: [{ lead: 'c' }] }

test('a lead deleted from the record is named — the act that happened, refused', () => {
  const gaps = leadsMissingFrom(head, { trial: [{ lead: 'a' }], refuted: [{ lead: 'c' }] })
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /"b"/)
})

test('CONTROL: a lead that MOVES to refuted is conserved — settling is lawful, vanishing is not', () => {
  assert.deepEqual(leadsMissingFrom(head, { trial: [{ lead: 'a' }], refuted: [{ lead: 'c' }, { lead: 'b' }] }), [])
})

test('a lead whose text was rewritten counts as gone — same text or it is not the same lead', () => {
  assert.equal(leadsMissingFrom(head, { trial: [{ lead: 'a' }, { lead: 'b, reworded' }], refuted: [{ lead: 'c' }] }).length, 1)
})

test('a missing record loses every lead — never read as clean', () => {
  assert.equal(leadsMissingFrom(head, null).length, 3)
})

test('a lead on the docket with no trial is named', () => {
  const gaps = untriedLeads({ trials: [{ lead: 'a' }] }, ['a', 'b'])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.what, /"b"/)
})

test('CONTROL: every docket lead tried → no gap', () => {
  assert.deepEqual(untriedLeads({ trials: [{ lead: 'a' }, { lead: 'b' }] }, ['a', 'b']), [])
})

test('an absent trial record is a gap, never clean', () => {
  assert.equal(untriedLeads(null, ['a']).length, 1)
})

// THE RENAME CONSERVES (the captain, 2026-09-14: "not held. sent to trial immediately"): a HEAD that still spells the list
// `held` and a tree that spells it `trial` hold the same leads, and the finder counts them as the same leads.
test('a lead moved from HEAD\'s held list to the trial list is conserved', () => {
  assert.deepEqual(leadsMissingFrom({ held: [{ lead: 'a' }, { lead: 'b' }] }, { trial: [{ lead: 'a' }, { lead: 'b' }] }), [])
  // CONTROL: a lead lost in the move is named, whatever the list is called
  assert.equal(leadsMissingFrom({ held: [{ lead: 'a' }, { lead: 'b' }] }, { trial: [{ lead: 'a' }] }).length, 1)
})
