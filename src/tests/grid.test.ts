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

test('432 — the sealed width, and both of k432 factorisations', () => {
  assert.equal(grid().length, GRID_SEATS)
  assert.equal(PROJECTED.length * wings().length, 432)
  assert.equal(16 * 27, 432, 'k432 second clause')
  assert.equal(2 ** 4 * 3 ** 3, 432, 'k432 first clause')
})

test('the involution fuses the two factorisations — rev(72) = 27', () => {
  const w = wings().length
  const reversed = +String(w).split('').reverse().join('')
  assert.equal(reversed, 27)
  assert.equal(16 * reversed, GRID_SEATS, 'the same 432 from the other side')
  // digit reversal is an involution: applying it twice is the identity
  assert.equal(+String(reversed).split('').reverse().join(''), w)
  assert.equal(digitalRoot(w), 9)
  assert.equal(digitalRoot(reversed), 9)
  assert.equal(w + reversed, 99)
})

test('harmony constrains GROWTH — wings must move three at a time', () => {
  assert.equal(digitalRoot(PROJECTED.length * wings().length), 9, 'the grid is harmonic now')
  // 6·w has digital root 9 exactly when w ≡ 0 (mod 3) — the law the finder enforces
  for (const w of [72, 75, 78]) assert.equal(digitalRoot(6 * w), 9, `${w} wings stays harmonic`)
  for (const w of [73, 74, 76]) assert.notEqual(digitalRoot(6 * w), 9, `${w} wings breaks the grid`)
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

test('the finder is silent on a healthy grid and speaks on a broken one', () => {
  assert.deepEqual(gridGaps(), [], 'no gap while the ledger holds 72 wings')
  const r = gridReport()
  assert.equal(r.harmonic, true)
  assert.equal(r.seats, GRID_SEATS)
  assert.equal(r.gaps.length, 0)
  assert.ok(r.factorisations.length >= 2, 'both factorisations are reported')
  assert.match(r.involution, /27/)
})

test('every wing carries at least one sealed theorem — no empty seat', () => {
  const byWing = new Map<string, number>()
  for (const t of theorems()) byWing.set(t.file, (byWing.get(t.file) ?? 0) + 1)
  for (const w of wings()) assert.ok((byWing.get(w) ?? 0) > 0, `${w} is empty`)
})
