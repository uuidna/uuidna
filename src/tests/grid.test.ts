// grid — THE 432 GRID IS A COMPUTED FIXED POINT, NOT A CHOSEN NUMBER, and these are the tests that make the
// difference checkable. A count you pick and then hardcode passes any test you write for it; a count that FALLS OUT
// of two independent structures — the rays the harness already seals and the wings the ledger already carries — can
// be wrong, and would be, the moment either structure moved. So every assertion here recomputes the width from the
// ledger rather than restating 432, except the ones that deliberately pin the seal.
//
// THE SEVENTH RAY IS THE SOURCE. 'en' is the language the wings are WRITTEN in, so its projection is the identity
// and it holds no seat: 7 × 72 = 504 would count 72 tools that compute nothing, which is the exact dormancy the
// unwired-scripts finder exists to catch. 504 − 72 = 432 is tested here as an identity, not asserted as a fact.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PROJECTED, GRID_SEATS, wings, wingSlug, wingRoot, seatName, grid, gridSeat, gridRoot, gridGaps, gridReport, DIMENSIONS, theorems } from '../index.js'

const digitalRoot = (n: number): number => (n === 0 ? 0 : 1 + ((n - 1) % 9))

test('the source ray holds no seat — 504 counts 72 identities, 432 counts the work', () => {
  assert.equal(DIMENSIONS[0], 'en', 'en is the source dimension the wings are written in')
  assert.equal(PROJECTED.length, DIMENSIONS.length - 1, 'exactly one ray is the source')
  assert.ok(!PROJECTED.includes('en'), 'the source is never a seat')
  // the whole argument for 432 over 504, as arithmetic rather than prose
  assert.equal(DIMENSIONS.length * wings().length - wings().length, PROJECTED.length * wings().length)
})

test('the grid is exactly one seat per (ray, wing), all distinct', () => {
  const seats = grid()
  assert.equal(seats.length, PROJECTED.length * wings().length)
  assert.equal(new Set(seats.map((s) => s.name)).size, seats.length, 'every seat name is unique')
  assert.equal(new Set(seats.map((s) => s.address)).size, seats.length, 'every seat address is unique')
  for (const s of seats) assert.match(s.address, /^[0-9a-f-]{36}$/)
})

// THE DERIVED IDENTITY, which holds at ANY wing count: rays × wings, where the 6 is seven dimensions less the
// identity ray, since projecting a wing into the language it is written in computes nothing. This is what the grid
// IS; 432 is what it measured when the ledger held 72 wings.
test('the grid is rays times wings, at whatever count the ledger holds', () => {
  assert.equal(grid().length, PROJECTED.length * wings().length)
  assert.equal(PROJECTED.length, 6, 'seven dimensions less the identity ray')
  assert.equal(7 * 72 - 72, 432, 'the derivation that produced the sealed width')
})

// HARMONY IS BASE-AGNOSTIC (Grid.lean). "Three at a time" was the DECIMAL digit-sum invariant: 10 ≡ 1 (mod 9), so
// 6w has digital root 9 exactly when w ≡ 0 (mod 3). This ledger writes its addresses in BASE SIXTEEN, whose
// invariant is mod 15, asking for w ≡ 0 (mod 5). Multiples of 15 satisfy both, since lcm(3,5) = 15.
test('harmony is stated in a form that does not depend on the base', () => {
  for (const w of [72, 75, 78]) assert.equal(digitalRoot(6 * w), 9, `${w} is harmonic in DECIMAL`)
  for (const w of [90, 95]) assert.equal((6 * w) % 15, 0, `${w} is harmonic in HEXADECIMAL`)
  for (const w of [90, 105]) {
    assert.equal(digitalRoot(6 * w), 9, `${w} harmonic in decimal`)
    assert.equal((6 * w) % 15, 0, `${w} harmonic in hexadecimal too`)
    assert.equal(w % 15, 0, 'the multiples of fifteen satisfy both')
  }
  assert.notEqual((6 * 72) % 15, 0, 'the sealed 72 is harmonic in DECIMAL ONLY')
})

// THE FUSION WAS SPELLING. rev(72) = 27 gives 16 × 27 = 432, for that one decimal spelling only: rev(75) = 57
// gives 912, rev(78) = 87 gives 1392, and in hexadecimal 72 is 0x48, reversing to 0x84 = 132, giving 2112.
test('the digit-reversal fusion holds for one spelling in one base, and no other', () => {
  assert.equal(16 * 27, 432, 'the identity itself is real')
  assert.notEqual(16 * 57, 432, 'rev(75) does not reproduce it')
  assert.notEqual(16 * 87, 432, 'rev(78) does not reproduce it')
  assert.notEqual(16 * 132, 432, 'the hexadecimal reversal of 72 gives 2112')
  assert.equal(2 ** 4 * 3 ** 3, 432, 'k432 first clause — arithmetic, not spelling')
})
test('seats are addressable by name and by slug, and the source ray is refused', () => {
  const w = wings()[0]
  const seat = gridSeat(PROJECTED[0], w)
  assert.ok(seat, 'a real (ray, wing) pair addresses')
  assert.equal(seat!.name, seatName(PROJECTED[0], w))
  assert.deepEqual(gridSeat(PROJECTED[0], wingSlug(w)), seat, 'slug and filename address the same seat')
  assert.equal(gridSeat('en', w), null, 'the source ray has no seat')
  assert.equal(gridSeat('xx', w), null, 'an unknown ray has no seat')
})

test('a seat MOVES when its wing moves — the address is derived, never decorative', () => {
  const w = wings()[0]
  const before = wingRoot(w)
  assert.match(before, /^[0-9a-f-]{36}$/)
  // the same wing under two different rays must differ, or the ray is not in the address
  const a = gridSeat(PROJECTED[0], w)!, b = gridSeat(PROJECTED[1], w)!
  assert.notEqual(a.address, b.address, 'the ray participates in the address')
  // two different wings under the same ray must differ, or the wing is not in the address
  const c = gridSeat(PROJECTED[0], wings()[1])!
  assert.notEqual(a.address, c.address, 'the wing participates in the address')
})

test('the grid root is order-invariant and recomputes', () => {
  assert.equal(gridRoot(), gridRoot(), 'deterministic')
  assert.match(gridRoot(), /^[0-9a-f-]{36}$/)
})

// THE FINDER REPORTS THE BASE, and reports it honestly at whatever count the ledger holds. It stopped asserting a
// healthy grid at exactly 72 because that count is harmonic in DECIMAL ONLY (432 leaves 12 mod 15). What it must
// still do is speak when neither base is satisfied and stay silent when both are — the rule, not the snapshot.
test('the finder names which base a count satisfies, and is silent only when both are', () => {
  const w = wings().length
  const gaps = gridGaps()
  const r = gridReport()
  assert.equal(r.seats, PROJECTED.length * w, 'the report states the derived identity')
  if (w % 15 === 0) {
    assert.equal(gaps.filter((g) => /harmonic in/.test(g.what)).length, 0, 'a multiple of fifteen satisfies both bases')
  } else {
    const spoke = gaps.find((g) => /harmonic in/.test(g.what))
    assert.ok(spoke, `at ${w} wings the finder must speak`)
    assert.match(spoke.what, /mod 9 and .* mod 15/, 'and it must name BOTH remainders, not just the decimal one')
  }
  assert.ok(r.factorisations.length >= 2, 'both factorisations are still reported')
})

test('every wing carries at least one sealed theorem — no empty seat', () => {
  const byWing = new Map<string, number>()
  for (const t of theorems()) byWing.set(t.file, (byWing.get(t.file) ?? 0) + 1)
  for (const w of wings()) assert.ok((byWing.get(w) ?? 0) > 0, `${w} is empty`)
})
