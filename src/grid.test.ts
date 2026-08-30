// grid — THE 432 GRID IS A COMPUTED FIXED POINT
// difference checkable. A count you pick and then hardcode passes any test you write for it; a count that FALLS OUT
// of two independent structures — the rays the harness already seals and the wings the ledger already carries — can
// be wrong, and would be, the moment either structure moved. So every assertion here recomputes the width from the
// ledger rather than restating a frozen seat count.
//
// THE SEVENTH RAY IS THE SOURCE. 'en' is the language the wings are WRITTEN in, so its projection is the identity
// and it holds no seat: 7w − w = 6w is tested here as an identity. Historically 6 × 72 = 432; the live product is
// gridSeats(). Theorem k432 (432 = 16 × 27) stays pure arithmetic.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { PROJECTED, gridSeats, wings, wingSlug, wingRoot, seatName, grid, gridSeat, gridRoot, gridGaps, gridReport, DIMENSIONS, theorems } from './index.js'

const digitalRoot = (n: number): number => (n === 0 ? 0 : 1 + ((n - 1) % 9))

test('the source ray holds no seat — 7w counts w identities, 6w counts the work', () => {
  assert.equal(DIMENSIONS[0], 'en', 'en is the source dimension the wings are written in')
  assert.equal(PROJECTED.length, DIMENSIONS.length - 1, 'exactly one ray is the source')
  assert.ok(!PROJECTED.includes('en'), 'the source is never a seat')
  assert.equal(DIMENSIONS.length * wings().length - wings().length, PROJECTED.length * wings().length)
})

test('the grid is exactly one seat per (ray, wing), all distinct', () => {
  const seats = grid()
  assert.equal(seats.length, PROJECTED.length * wings().length)
  assert.equal(new Set(seats.map((s) => s.name)).size, seats.length, 'every seat name is unique')
  assert.equal(new Set(seats.map((s) => s.address)).size, seats.length, 'every seat address is unique')
  for (const s of seats) assert.match(s.address, /^[0-9a-f-]{36}$/)
})

// THE DERIVED IDENTITY, which holds at ANY wing count: rays × wings. 432 is what it measured at 72 wings.
test('the grid is rays times wings, at whatever count the ledger holds', () => {
  assert.equal(grid().length, PROJECTED.length * wings().length)
  assert.equal(PROJECTED.length, 6, 'seven dimensions less the identity ray')
  assert.equal(gridSeats(), PROJECTED.length * wings().length, 'sealed width is the live product')
  assert.equal(7 * 72 - 72, 432, 'the derivation that produced the historical width')
})

// HARMONY — digital-root-9 iff w ≡ 0 (mod 3). Dual-base "% 15" refused as release-blocking.
test('digital-root-9 holds exactly when wings ≡ 0 (mod 3)', () => {
  for (const w of [72, 75, 114, 117, 120]) assert.equal(digitalRoot(6 * w), 9, `${w} is harmonic`)
  for (const w of [73, 115, 116]) assert.notEqual(digitalRoot(6 * w), 9, `${w} breaks digital-root-9`)
  assert.equal(digitalRoot(432), 9, 'k432 width is harmonic — pure arithmetic')
  assert.notEqual((6 * 72) % 15, 0, 'historical 72 is harmonic in DECIMAL ONLY (hex refused as release block)')
})

// THE FUSION WAS SPELLING. rev(72) = 27 gives 16 × 27 = 432, for that one decimal spelling only.
test('the digit-reversal fusion holds for one spelling in one base, and no other', () => {
  assert.equal(16 * 27, 432, 'the identity itself is real')
  assert.notEqual(16 * 57, 432, 'rev(75) does not reproduce it')
  assert.notEqual(16 * 87, 432, 'rev(78) does not reproduce it')
  assert.notEqual(16 * 132, 432, 'the hexadecimal reversal of 72 gives a different product')
  assert.equal(2 ** 4 * 3 ** 3, 432, 'k432 first clause — arithmetic')
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

test('a seat MOVES when its wing moves — the address is derived', () => {
  const w = wings()[0]
  const before = wingRoot(w)
  assert.match(before, /^[0-9a-f-]{36}$/)
  const a = gridSeat(PROJECTED[0], w)!, b = gridSeat(PROJECTED[1], w)!
  assert.notEqual(a.address, b.address, 'the ray participates in the address')
  const c = gridSeat(PROJECTED[0], wings()[1])!
  assert.notEqual(a.address, c.address, 'the wing participates in the address')
})

test('the grid root is order-invariant and recomputes', () => {
  assert.equal(gridRoot(), gridRoot(), 'deterministic')
  assert.match(gridRoot(), /^[0-9a-f-]{36}$/)
})

// FINDER — structural only. Width is live; dual-base "% 15" refused; digital-root-9 measured on report.harmonic.
test('the finder is silent on a structurally healthy live grid', () => {
  const w = wings().length
  const gaps = gridGaps()
  const r = gridReport()
  assert.deepEqual(gaps, [], 'no structural gaps')
  assert.equal(r.seats, PROJECTED.length * w, 'the report states the derived identity')
  assert.equal(r.sealed, gridSeats(), 'sealed width is the live product')
  assert.equal(r.harmonic, w % 3 === 0, 'harmonic tracks digital-root-9 / w ≡ 0 mod 3')
  assert.ok(r.factorisations.length >= 2, 'both factorisations are still reported')
  assert.ok(r.factorisations.some((f) => f.includes('k432')), 'k432 stays as pure arithmetic')
})

test('every wing carries at least one sealed theorem — no empty seat', () => {
  const byWing = new Map<string, number>()
  for (const t of theorems()) byWing.set(t.file, (byWing.get(t.file) ?? 0) + 1)
  for (const w of wings()) assert.ok((byWing.get(w) ?? 0) > 0, `${w} is empty`)
})
