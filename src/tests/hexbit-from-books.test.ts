import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parsePointsDegrees, pointsDegreesKey, hexbitTheoremFromPointsDegrees, hexbitCandidatesFromClaims } from '../scripts/hexbit-from-books.js'
import { UUID_HEXBITS } from '../hexbit/index.js'
import type { TextClaim } from '../books.js'

test('parsePointsDegrees: digit degrees-or-points', () => {
  assert.deepEqual(parsePointsDegrees('45 degrees, or four points'), { points: 4, degrees: 45 })
})

test('parsePointsDegrees: spelled points-or-degrees', () => {
  assert.deepEqual(parsePointsDegrees('Four points, or forty-five degrees'), { points: 4, degrees: 45 })
})

test('pointsDegreesKey matches the sealed sailing name', () => {
  assert.equal(pointsDegreesKey(4, 45), 'four_points_is_45')
})

test('hexbit theorem uses UUID_HEXBITS as the rose width', () => {
  assert.equal(UUID_HEXBITS, 32)
  const claim: TextClaim = {
    kind: 'unit-equivalence',
    claim: '45 degrees, or four points',
    sentence: '…',
    numbers: [45],
    units: ['degrees', 'points'],
    address: 'x',
  }
  // four_points_is_45 is already sealed — candidate is null (not a duplicate deposit)
  const c = hexbitTheoremFromPointsDegrees(claim, 45493, 'On Yacht Sailing')
  assert.equal(c, null)
})

test('hexbitCandidatesFromClaims: queues an unsealed rose identity (8 points = 90°)', () => {
  const claims: TextClaim[] = [{
    kind: 'unit-equivalence',
    claim: '90 degrees, or eight points',
    sentence: '…',
    numbers: [90],
    units: ['degrees', 'points'],
    address: 'y',
  }]
  const c = hexbitCandidatesFromClaims(claims, 1, 'Test')
  assert.equal(c.length, 1)
  assert.equal(c[0]!.key, 'eight_points_is_90')
  assert.match(c[0]!.lean, new RegExp(`8 \\* 360 = ${UUID_HEXBITS} \\* 90`))
})
