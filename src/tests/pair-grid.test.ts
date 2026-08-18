// pair-grid — 42 IS THE SAME LAW AS 432, NOT A SECOND COINCIDENCE, and that is what these tests pin. Both grids are
// the full product with the IDENTITY REMOVED: the wing grid drops the 72 seats where a wing is read along the ray it
// is already written in (504 → 432), and the pair grid drops the 7 self-pairs (49 → 42). If either exclusion were a
// special case rather than the rule, one of these files would go red while the other stayed green.
//
// TRANSPOSITION IS THE INVOLUTION, AND IT HAS NO FIXED POINT — precisely because the self-pairs are gone. That is
// why 6 × 7 and 7 × 6 are the same 42 read from two sides rather than two different claims, and why the 42
// directions fall into exactly 21 orbits of size two. A fixed point would mean some direction was its own reverse,
// which would make the two readings disagree.
//
// 42 IS DELIBERATELY NOT FOLDED INTO 432. It does not divide it and its digital root is 6, not 9; the tests assert
// the NON-relationship so a later hand cannot quietly claim the two grids are one.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PAIR_SEATS, pairs, pairSeat, pairName, transpose, pairsRoot, pairsGaps, pairsReport, DIMENSIONS, GRID_SEATS } from '../index.js'

const digitalRoot = (n: number): number => (n === 0 ? 0 : 1 + ((n - 1) % 9))

test('42 is the full product with the identity removed — the same rule that makes 432', () => {
  const n = DIMENSIONS.length
  assert.equal(n * n - n, PAIR_SEATS, '49 − 7 = 42')
  assert.equal(n * (n - 1), PAIR_SEATS, 'and 7 × 6 = 42 is the same statement')
  assert.equal(pairs().length, PAIR_SEATS)
})

test('6 × 7 and 7 × 6 are the same 42, read from two sides', () => {
  const n = DIMENSIONS.length
  assert.equal(n * (n - 1), (n - 1) * n)
  const r = pairsReport()
  assert.equal(r.directions, PAIR_SEATS)
  assert.equal(r.readings.length, 2, 'both readings are reported, neither privileged')
})

test('no dimension is ever paired with itself', () => {
  for (const p of pairs()) assert.notEqual(p.from, p.to)
  for (const d of DIMENSIONS) assert.equal(pairSeat(d, d), null, `${d} → ${d} is never a seat`)
})

test('transposition is an involution with NO fixed point', () => {
  for (const p of pairs()) {
    const back = transpose(p)
    assert.ok(back, `${p.name} has a reverse`)
    assert.notEqual(back!.name, p.name, 'no direction is its own reverse')
    assert.equal(transpose(back!)!.name, p.name, 'transposing twice returns the original')
  }
})

test('the 42 directions fall into exactly 21 orbits of size two', () => {
  const seen = new Set<string>()
  let orbits = 0
  for (const p of pairs()) {
    const key = [p.from, p.to].sort().join('|')
    if (!seen.has(key)) { seen.add(key); orbits++ }
  }
  assert.equal(orbits, PAIR_SEATS / 2)
  assert.equal(orbits, 21)
  assert.equal(pairsReport().orbits, 21)
})

test('the grid is regular — every dimension a source and a target exactly six times', () => {
  const n = DIMENSIONS.length
  for (const d of DIMENSIONS) {
    assert.equal(pairs().filter((p) => p.from === d).length, n - 1, `${d} as source`)
    assert.equal(pairs().filter((p) => p.to === d).length, n - 1, `${d} as target`)
  }
})

test('every direction is uniquely named and uniquely addressed', () => {
  const ps = pairs()
  assert.equal(new Set(ps.map((p) => p.name)).size, ps.length)
  assert.equal(new Set(ps.map((p) => p.address)).size, ps.length)
  for (const p of ps) {
    assert.equal(p.name, pairName(p.from, p.to))
    assert.match(p.address, /^[0-9a-f-]{36}$/)
  }
})

test('a direction and its reverse are DIFFERENT addresses — order is real', () => {
  const there = pairSeat('bg', 'zh')!, back = pairSeat('zh', 'bg')!
  assert.notEqual(there.address, back.address, 'the pair is ordered, not a set')
})

test('42 is NOT a reshape of 432 — the two grids stay separate', () => {
  assert.notEqual(GRID_SEATS % PAIR_SEATS, 0, '42 does not divide 432')
  assert.equal(digitalRoot(PAIR_SEATS), 6, 'and 42 is not harmonic by the ledger marker')
  assert.equal(digitalRoot(GRID_SEATS), 9, 'while 432 is')
})

test('the finder is silent on a healthy pair grid', () => {
  assert.deepEqual(pairsGaps(), [])
  assert.equal(pairsReport().gaps.length, 0)
  assert.match(pairsRoot(), /^[0-9a-f-]{36}$/)
  assert.equal(pairsRoot(), pairsRoot(), 'deterministic')
})
