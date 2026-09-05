import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sweepThreshold, thresholdGaps, SWEPT_THRESHOLDS, lanesReferenced, LANE_FLOOR, type SweptThreshold } from './scripts/one-receipt.js'
import { UNDERCLAIM_FLOOR } from './underreach.js'

const span = (lo: number, hi: number) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)

// ── the fault the class is named for: a floor standing on findings. This is s_dagger_inverse's shape, replayed:
// four cases decided, no scope stated, and a floor of 8 reporting zero.
test('an EXEMPTION sitting above a step is caught, and the gap names where the finding is', () => {
  const hiding: SweptThreshold = {
    name: 'TEST_FLOOR', where: 'test', kind: 'exemption', live: 8,
    reportsAt: (v) => (v <= 4 ? 1 : 0), span: span(0, 12),
  }
  const gaps = sweepThreshold(hiding)
  assert.equal(gaps.length, 1)
  assert.match(gaps[0].what, /HIDES 1 finding/)
  assert.match(gaps[0].what, /widened to 4/, 'the largest revealing setting is the nearest one, so the fix is minimal')
})

test('an EXEMPTION whose sweep is FLAT is left alone — a bound is not a hiding place', () => {
  assert.deepEqual(sweepThreshold({
    name: 'TEST_FLOOR', where: 'test', kind: 'exemption', live: 8,
    reportsAt: () => 0, span: span(0, 12),
  }), [])
})

// ── the cry-wolf control. A ratchet is MEANT to sit on its step; one rule for both kinds would flag it, the
// finder would get switched off, and then the real fault walks through.
test('a TIGHT ratchet sits on its step and is NOT flagged', () => {
  assert.deepEqual(sweepThreshold({
    name: 'TEST_RATCHET', where: 'test', kind: 'ratchet', live: 21,
    reportsAt: (v) => (21 < v ? 1 : 0), span: span(18, 33),
  }), [])
})

test('a SLACK ratchet is caught — the measurement moved and the floor did not', () => {
  const gaps = sweepThreshold({
    name: 'TEST_RATCHET', where: 'test', kind: 'ratchet', live: 21,
    reportsAt: (v) => (25 < v ? 1 : 0), span: span(18, 33),   // measurement grew to 25, floor still 21
  })
  assert.equal(gaps.length, 1)
  assert.match(gaps[0].what, /SLACK by 4/)
  assert.match(gaps[0].fix, /raise it to 25/)
})

test('ONE profile read under the two kinds gives OPPOSITE prescriptions — the kinds are not interchangeable', () => {
  // identical numbers, identical live setting; only the declared kind differs
  const profile = (v: number) => (v <= 4 ? 1 : 0)
  const asExemption = sweepThreshold({ name: 'T', where: 't', kind: 'exemption', live: 8, reportsAt: profile, span: span(0, 12) })
  const asRatchet = sweepThreshold({ name: 'T', where: 't', kind: 'ratchet', live: 8, reportsAt: profile, span: span(0, 12) })
  assert.equal(asExemption.length, 1)
  assert.equal(asRatchet.length, 1)
  assert.match(asExemption[0].fix, /Lower it to 4/)
  assert.match(asRatchet[0].fix, /raise it to/)
  // the same data tells you to move the number in opposite directions, so declaring the kind is the whole
  // decision — a registry that guesses it would prescribe the exact wrong fix with full confidence.
  assert.notEqual(asExemption[0].what, asRatchet[0].what)
})

// ── the live tree
test('every registered threshold is on a reporting path and currently clean', () => {
  const reg = SWEPT_THRESHOLDS()
  assert.deepEqual(reg.map((t) => t.name).sort(), ['LANE_FLOOR', 'UNDERCLAIM_FLOOR'])
  assert.equal(reg.find((t) => t.name === 'UNDERCLAIM_FLOOR')?.live, UNDERCLAIM_FLOOR)
  assert.equal(reg.find((t) => t.name === 'LANE_FLOOR')?.live, LANE_FLOOR)
  assert.deepEqual(thresholdGaps(), [])
})

test('the lanes ratchet is tight against its own measurement, not merely below it', () => {
  assert.equal(lanesReferenced(), LANE_FLOOR, 'slack here means the ratchet has stopped holding')
})

test('UNDERCLAIM_FLOOR hides nothing at any setting — the sweep is flat, which is why the number is safe', () => {
  const t = SWEPT_THRESHOLDS().find((x) => x.name === 'UNDERCLAIM_FLOOR') as SweptThreshold
  assert.deepEqual([...new Set(t.span.map(t.reportsAt))], [0])
})
