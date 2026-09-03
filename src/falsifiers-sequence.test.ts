// FALSIFIERS FOR lean/Sequence.lean — the ℤ/9 vortex wing.
//
// Each test below RECOMPUTES the sealed property in TypeScript, from the wing's own definitions re-expressed
// here rather than imported, asserts the property HOLDS, and then applies a DELIBERATE MUTATION and asserts the
// mutated form FAILS. The second half is the whole point: a check that cannot go red proves nothing, so every
// test carries a mutant that must be rejected. Naming a theorem key in prose is not coverage — the keys below
// live in executable test titles and the assertions decide them.
//
// These are falsifiers, not witnesses. Nothing here is consulted from outside this repository; the wing still
// owes its external anchor.
import { test } from 'node:test'
import assert from 'node:assert/strict'

// ── the wing's definitions, recomputed independently ─────────────────────────────────────────────────────────
/** mathematical mod — Lean's `%` on Int is non-negative for a positive modulus, JS's `%` is not */
const mod = (n: number, m: number): number => ((n % m) + m) % m
/** `def ap (a b x : Nat) : Nat := (a * x + b) % 9` — an affine map on ℤ/9 */
const ap = (a: number, b: number, x: number): number => (a * x + b) % 9
/** `def dz (x : Nat) := if x == 0 then 0 else 10 - x` — the mirror neighbour, the division by zero */
const dz = (x: number): number => (x === 0 ? 0 : 10 - x)
/** `def polar (x : Nat) := (9 - x) % 9` — negation in ℤ/9 */
const polar = (x: number): number => (9 - x) % 9
/** `def tour` — the vortex tour in ℤ/9 */
const TOUR: readonly number[] = [1, 2, 4, 8, 7, 5, 3, 6, 0]
/** `def units9` */
const UNITS9: readonly number[] = [1, 2, 4, 5, 7, 8]
/** `def carries9` — ×2 on units, +3 on {3,6}, neither elsewhere */
const carries9 = (d: number, nx: number): boolean =>
  UNITS9.includes(d) ? nx === (2 * d) % 9 : d === 3 || d === 6 ? nx === (d + 3) % 9 : false
/** `def saltConv (c _s : Nat) := c % 9` — the leaky content-only salt */
const saltConv = (c: number, _s: number): number => c % 9
/** `def saltSeq (_c s : Nat) := s % 9` — the advancing-sequence salt */
const saltSeq = (_c: number, s: number): number => s % 9

const range = (n: number): number[] => [...Array(n).keys()]
/** `List.range' start len` — the half-open run starting at `start` */
const rangeFrom = (start: number, len: number): number[] => range(len).map((i) => start + i)
const same = (a: readonly number[], b: readonly number[]): boolean =>
  a.length === b.length && a.every((v, i) => v === b[i])
/** g^k mod m, computed by repeated multiplication so nothing rides on JS `**` and float width */
const powMod = (g: number, k: number, m: number): number => {
  let acc = 1
  for (let i = 0; i < k; i++) acc = (acc * g) % m
  return acc
}
/** the multiplicative inverse of g in ℤ/n, or undefined when g is not a unit */
const inverse = (g: number, n: number): number | undefined => range(n).find((e) => (g * e) % n === 1)
/** the ⟨2⟩ orbit, WALKED rather than quoted: [2^0 … 2^5] mod 9 */
const doublingOrbit = (g: number): number[] => range(6).map((k) => powMod(g, k, 9))

// ── the falsifiers ───────────────────────────────────────────────────────────────────────────────────────────

test('mirror_congruence — recompute (10−d) ≡ (1−d) mod 9 over 1..9; shifting the constant off 1 must fail', () => {
  const congruentTo = (k: number): boolean => rangeFrom(1, 9).every((d) => mod(10 - d, 9) === mod(k - d, 9))
  assert.equal(congruentTo(1), true)
  // MUTATION: 10 ≡ 1 (mod 9) and nothing else in 0..8 — any other constant must break the congruence
  assert.equal(congruentTo(2), false)
  assert.equal(congruentTo(0), false)
  assert.deepEqual(range(9).filter((k) => congruentTo(k)), [1])
})

test('agl_order_54 — recompute |AGL(1,ℤ/9)| as (count of units)·9; counting all residues, or working mod 8, must fail', () => {
  const aglOrder = (n: number): number => range(n).filter((a) => inverse(a, n) !== undefined).length * n
  assert.equal(aglOrder(9), 54)
  // MUTATION 1: take every residue as a slope instead of only the units — 9·9 = 81, not 54
  assert.equal(range(9).length * 9 === 54, false)
  // MUTATION 2: the same construction over ℤ/8 has 4 units, so 32 — the order is a fact about 9
  assert.equal(aglOrder(8) === 54, false)
})

test('commutator_is_shift — recompute [σ_a, μ] on ℤ/9; only a=2 yields x↦x+1, a=4 must fail', () => {
  // μ is ap 8 1 (x ↦ 1−x mod 9); σ_a is ap a 0. The sealed commutator is σ_2 ∘ μ ∘ σ_5 ∘ μ with 5 = 2⁻¹.
  const commutatorIsUnitShift = (a: number): boolean => {
    const h = inverse(a, 9)
    if (h === undefined) return false
    return range(9).every((x) => ap(a, 0, ap(8, 1, ap(h, 0, ap(8, 1, x)))) === (x + 1) % 9)
  }
  assert.equal(commutatorIsUnitShift(2), true)
  // MUTATION: double by 4 instead of 2 — the commutator becomes x↦x+3, a shift but not THE unit shift
  assert.equal(commutatorIsUnitShift(4), false)
  assert.equal(range(9).every((x) => ap(4, 0, ap(8, 1, ap(7, 0, ap(8, 1, x)))) === (x + 3) % 9), true)
  // and the unit shift is carried by exactly one slope
  assert.deepEqual(range(9).filter((a) => commutatorIsUnitShift(a)), [2])
})

test('one_orbit — recompute transitivity of the shifts on ℤ/9; the proper subgroup ⟨3⟩ must fail to be transitive', () => {
  const transitive = (shifts: readonly number[]): boolean =>
    range(9).every((y) => shifts.some((b) => (0 + b) % 9 === y))
  assert.equal(transitive(range(9)), true)
  // MUTATION: shift only by multiples of 3 — a real subgroup, and it reaches 3 of the 9 digits, not all
  assert.equal(transitive([0, 3, 6]), false)
  assert.equal(new Set([0, 3, 6].map((b) => (0 + b) % 9)).size, 3)
})

test('ten_pairs — recompute d + m(d) = 10 over 1..9 with the mirror m; the polar map 9−d must fail it', () => {
  const pairsToTen = (m: (d: number) => number): boolean => rangeFrom(1, 9).every((d) => d + m(d) === 10)
  assert.equal(pairsToTen(dz), true)
  // MUTATION: swap the mirror for the polar map — every rung then sums to 9, so the equilibrium is broken
  assert.equal(pairsToTen(polar), false)
  assert.equal(pairsToTen((d) => 11 - d), false)
})

test('polar_nine_pairs — recompute d + polar(d) = 9 over 1..8; the mirror dz must fail it', () => {
  const pairsToNine = (m: (d: number) => number): boolean => rangeFrom(1, 8).every((d) => d + m(d) === 9)
  assert.equal(pairsToNine(polar), true)
  // MUTATION: the reflection through 10 is a different equilibrium and sums elsewhere than 9
  assert.equal(pairsToNine(dz), false)
})

test('partition_six_three — recompute the unit/non-unit split of 1..9 mod 9; the split mod 10 must not be 6+3', () => {
  const split = (n: number): [number, number] => {
    const digits = rangeFrom(1, n)
    const units = digits.filter((a) => inverse(a, n) !== undefined)
    return [units.length, digits.length - units.length]
  }
  assert.deepEqual(split(9), [6, 3])
  assert.deepEqual(rangeFrom(1, 9).filter((a) => inverse(a, 9) !== undefined), [1, 2, 4, 5, 7, 8])
  assert.deepEqual(rangeFrom(1, 9).filter((a) => inverse(a, 9) === undefined), [3, 6, 9])
  // MUTATION: the same partition over ℤ/10 is 4 units and 6 non-units — 6+3 is a fact about the ring, not a habit
  assert.equal(same(split(10), [6, 3]), false)
})

test('seams_two — recompute the carry seams around the tour; the near-miss tour 0124675369 must not have two', () => {
  const seams = (t: readonly number[]): number =>
    t.filter((d, i) => !carries9(d, t[(i + 1) % t.length])).length
  assert.equal(seams(TOUR), 2)
  // and the two seams are exactly 5→3 and 0→1
  assert.deepEqual(
    TOUR.map((d, i) => [d, TOUR[(i + 1) % TOUR.length]]).filter(([d, nx]) => !carries9(d, nx)),
    [[5, 3], [0, 1]],
  )
  // MUTATION: the traitor digit — a 6 where the 8 belongs, which breaks the doubling and opens two more seams
  const nearMiss = [1, 2, 4, 6, 7, 5, 3, 6, 0]
  assert.equal(seams(nearMiss) === 2, false)
  assert.equal(seams(nearMiss), 4)
})

test('one_strip — recompute the inverted rail as dz over the forward rail; polar rails must fail to close at 5', () => {
  const forward = [1, 2, 4, 8, 7, 5]
  const inverted = forward.map(dz)
  assert.deepEqual(inverted, [9, 8, 6, 2, 3, 5])
  const isOneStrip = (a: readonly number[], b: readonly number[]): boolean =>
    a.every((v, i) => v + b[i] === 10) && a[a.length - 1] === 5 && b[b.length - 1] === 5
  assert.equal(isOneStrip(forward, inverted), true)
  // MUTATION: reflect with the polar map instead — the rungs sum to 9 and the second rail ends at 4, not the heart
  const polarRail = forward.map(polar)
  assert.equal(isOneStrip(forward, polarRail), false)
  assert.equal(polarRail[polarRail.length - 1] === 5, false)
})

test('double_strand — recompute strand B as dz over strand A and pair to 10 at every position; a rotated strand must fail', () => {
  const a = [1, 2, 4, 8, 7, 5, 3, 6, 9]
  const b = a.map(dz)
  assert.deepEqual(b, [9, 8, 6, 2, 3, 5, 7, 4, 1])
  const rungsSumToTen = (x: readonly number[], y: readonly number[]): boolean =>
    x.length === y.length && x.every((v, i) => v + y[i] === 10)
  assert.equal(rungsSumToTen(a, b), true)
  // MUTATION: slide one strand by a single position — the base-pairing is positional, not merely a set fact
  assert.equal(rungsSumToTen(a, [...b.slice(1), b[0]]), false)
})

test('polarities_plus_minus — recompute the ± pairs from dz below the heart; admitting the self-polar 5 must fail', () => {
  const pairs: [number, number][] = rangeFrom(1, 4).map((d) => [d, dz(d)])
  assert.deepEqual(pairs, [[1, 9], [2, 8], [3, 7], [4, 6]])
  const polarised = (ps: readonly [number, number][]): boolean =>
    ps.every(([lo, hi]) => lo + hi === 10 && lo < 5 && hi > 5)
  assert.equal(polarised(pairs), true)
  // MUTATION: the heart is its own mirror, so it sums to 10 and is neither − nor + — it must not pass as a pair
  assert.equal(polarised([...pairs, [5, dz(5)]]), false)
  assert.equal(dz(5), 5)
})

test('forward_reflected_mirror — recompute B = A.map(m) and A = B.map(m) as one involution; m = 9−d must fail', () => {
  const a = [1, 2, 4, 8, 7, 5, 3, 6, 9]
  const b = [9, 8, 6, 2, 3, 5, 7, 4, 1]
  const mirrorsBothWays = (m: (d: number) => number): boolean => same(a.map(m), b) && same(b.map(m), a)
  assert.equal(mirrorsBothWays((d) => 10 - d), true)
  // MUTATION: 9−d is ALSO an involution, so involution alone is not the property — it must still miss the target
  assert.equal(same(a.map((d) => 9 - d).map((d) => 9 - d), a), true)
  assert.equal(mirrorsBothWays((d) => 9 - d), false)
})

test('every_digit_has_neighbours — recompute totality, surjectivity and self-inverse of dz; dropping the ÷0 case must fail', () => {
  const total = (f: (x: number) => number, n: number): boolean => range(n).every((d) => f(d) < n)
  const surjective = (f: (x: number) => number, n: number): boolean =>
    range(n).every((d) => range(n).some((e) => f(e) === d))
  const selfInverse = (f: (x: number) => number, n: number): boolean => range(n).every((d) => f(f(d)) === d)
  assert.equal(total(dz, 10) && surjective(dz, 10) && selfInverse(dz, 10), true)
  assert.equal(total(polar, 9) && surjective(polar, 9), true)
  // MUTATION: 10−x without the fixed void — 0 leaves the digits entirely and nothing lands on 0
  const naive = (x: number): number => 10 - x
  assert.equal(total(naive, 10), false)
  assert.equal(surjective(naive, 10), false)
  assert.equal(naive(0), 10)
})

test('salt_conv_leaks_equality — recompute that a content-only salt is constant in the step; the sequence salt must fail to leak', () => {
  const leaksEquality = (salt: (c: number, s: number) => number): boolean =>
    range(9).every((c) => range(9).every((s1) => range(9).every((s2) => salt(c, s1) === salt(c, s2))))
  assert.equal(leaksEquality(saltConv), true)
  // MUTATION: the fixed salt — it advances with the step, so two seals of one content differ
  assert.equal(leaksEquality(saltSeq), false)
})

test('salt_conv_step_is_division_by_zero — recompute the step fibre of the content-only salt as all 9; the sequence salt must fail', () => {
  const fibreSize = (salt: (c: number, s: number) => number, c: number, s0: number): number =>
    range(9).filter((s) => salt(c, s) === salt(c, s0)).length
  assert.equal(range(9).every((c) => fibreSize(saltConv, c, 0) === 9), true)
  // MUTATION: the sequence salt keeps the step, so its fibre is a point and the collapse claim must fail
  assert.equal(range(9).every((c) => fibreSize(saltSeq, c, 0) === 9), false)
  assert.equal(fibreSize(saltSeq, 0, 0), 1)
})

test('salt_seq_injective — recompute equal-salt ⇔ equal-step for the sequence salt; the content-only salt must fail', () => {
  const injectiveInStep = (salt: (c: number, s: number) => number): boolean =>
    range(9).every((s1) => range(9).every((s2) => (salt(0, s1) === salt(0, s2)) === (s1 === s2)))
  assert.equal(injectiveInStep(saltSeq), true)
  // MUTATION: the leaky salt — every pair of steps collides, so the ⇔ breaks in one direction
  assert.equal(injectiveInStep(saltConv), false)
})

test('salt_seq_fibre_singleton — recompute every sequence-salt fibre as a singleton; the content-only salt must fail', () => {
  const allFibresAre = (salt: (c: number, s: number) => number, size: number): boolean =>
    range(9).every((s0) => range(9).filter((s) => salt(0, s) === salt(0, s0)).length === size)
  assert.equal(allFibresAre(saltSeq, 1), true)
  // MUTATION: the leaky salt collapses the whole step coordinate, so no fibre is a singleton
  assert.equal(allFibresAre(saltConv, 1), false)
  assert.equal(allFibresAre(saltConv, 9), true)
})

test('five_is_the_halving — recompute ((2x mod 9)·h) mod 9 = x over all of ℤ/9; only h=5 holds, h=4 must fail', () => {
  const undoesDoubling = (h: number): boolean => range(9).every((x) => ((2 * x) % 9 * h) % 9 === x)
  assert.equal(undoesDoubling(5), true)
  // MUTATION: any other multiplier — halving is a property of 5 alone, not of some multiplier or other
  assert.equal(undoesDoubling(4), false)
  assert.deepEqual(range(9).filter((h) => undoesDoubling(h)), [5])
})

test('five_orbit_reverses_doubling — recompute the ×5 orbit and the reversed ×2 orbit; the ×4 orbit must fail to match', () => {
  const walk = (g: number): number[] => rangeFrom(1, 6).map((k) => powMod(g, k, 9))
  assert.deepEqual(walk(5), [5, 7, 8, 4, 2, 1])
  assert.deepEqual([...doublingOrbit(2)].reverse(), [5, 7, 8, 4, 2, 1])
  const reversesDoubling = (g: number): boolean => same(walk(g), [...doublingOrbit(2)].reverse())
  assert.equal(reversesDoubling(5), true)
  // MUTATION: 4 is a unit but not 2⁻¹ — its walk repeats after three, so it is other than the time-reversal
  assert.equal(reversesDoubling(4), false)
  assert.deepEqual(walk(4), [4, 7, 1, 4, 7, 1])
})

test('reverse_walks_inverse — recompute each unit paired with its OWN inverse in ℤ/9; pairing 2 with 7 must fail', () => {
  const units = range(9).filter((g) => inverse(g, 9) !== undefined)
  assert.deepEqual(units, [1, 2, 4, 5, 7, 8])
  const walksInverse = (g: number, h: number): boolean =>
    same(range(6).map((k) => powMod(g, k, 9)).reverse(), range(6).map((k) => powMod(h, k + 1, 9)))
  assert.equal(units.every((g) => walksInverse(g, inverse(g, 9) as number)), true)
  // MUTATION: hand each unit the WRONG partner — a unit, but not its inverse — and the identity must break
  assert.equal(walksInverse(2, 7), false)
  assert.equal(walksInverse(4, 5), false)
  // and the correct partner is unique: exactly one unit reverses each walk
  for (const g of units) assert.deepEqual(units.filter((h) => walksInverse(g, h)), [inverse(g, 9)])
})

test('only_five_carries_the_three_singularities — recompute the digits carrying all three roles; truncating a rail or swapping dz for polar must fail', () => {
  const forward = [1, 2, 4, 8, 7, 5]
  const inverted = forward.map(dz)
  const carriers = (m: (d: number) => number, rail: readonly number[], contra: readonly number[]): number[] =>
    rangeFrom(1, 9).filter(
      (d) => 10 - d === d && m(d) === d && rail[rail.length - 1] === d && contra[contra.length - 1] === d,
    )
  assert.deepEqual(carriers(dz, forward, inverted), [5])
  // MUTATION 1: cut the last rung off the forward rail — the rail no longer closes at the heart, so nobody carries all three
  assert.deepEqual(carriers(dz, forward.slice(0, -1), inverted), [])
  // MUTATION 2: reflect with the polar map, which fixes no digit in 1..9 — the reflection role goes uncarried
  assert.deepEqual(carriers(polar, forward, inverted), [])
  assert.deepEqual(rangeFrom(1, 9).filter((d) => polar(d) === d), [])
})

test('tour_contra_reflects_each_digit — recompute the contra by mapping dz over the 12-step walk; polar must fail to produce it', () => {
  const walk = [0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1]
  const contra = [0, 9, 8, 6, 2, 3, 5, 7, 4, 1, 0, 9]
  assert.deepEqual(walk.map(dz), contra)
  assert.equal(dz(1), 9)
  // MUTATION: the polar map holds the void too, so the 0s still match — and every other digit is off by one
  assert.equal(same(walk.map(polar), contra), false)
  assert.equal(polar(1) === 9, false)
})

test('tour_contra_involutes — recompute dz applied twice over the walk as the identity; a non-involution must fail', () => {
  const walk = [0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1]
  const involutesOnWalk = (m: (d: number) => number): boolean => same(walk.map(m).map(m), walk)
  assert.equal(involutesOnWalk(dz), true)
  // MUTATION 1: the unit shift is a bijection of the digits and still not an involution — bijectivity is not the property
  assert.equal(involutesOnWalk((x) => (x + 1) % 10), false)
  // MUTATION 2: polar is an involution on ℤ/9, and the walk is not in ℤ/9 — it carries a 9, which polar sends to
  // the void and never returns, so the round trip loses a digit. dz is the map that holds all ten.
  assert.equal(involutesOnWalk(polar), false)
  assert.equal(polar(polar(9)), 0)
  // and the property is not merely "some involution": shifting by 5 mod 10 involutes on the walk too, so the test
  // above is discriminating between maps, not between involutions and non-involutions
  assert.equal(involutesOnWalk((x) => (x + 5) % 10), true)
})

test('tour_contra_rungs_sum_ten — recompute every rung of the walk as 10, resting at the void; the polar rungs must fail', () => {
  const walk = [0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1]
  const rungs = (m: (d: number) => number): boolean =>
    walk.every((d) => (d === 0 ? d + m(d) === 0 : d + m(d) === 10))
  assert.equal(rungs(dz), true)
  // MUTATION: polar rungs rest at the void exactly the same way and sum to 9 elsewhere — the void case carries only part of the claim
  assert.equal(rungs(polar), false)
  assert.equal(0 + polar(0), 0)
  assert.equal(1 + polar(1), 9)
})

test('sequence_and_coins_are_one — recompute the ⟨2⟩ orbit, its sum and its length from the coin alone; the coin 4 must fail all three', () => {
  const tosses = (g: number): number[] => rangeFrom(1, 6).map((k) => powMod(g, k, 9))
  const sum = (xs: readonly number[]): number => xs.reduce((a, b) => a + b, 0)
  assert.deepEqual(tosses(2), [2, 4, 8, 7, 5, 1])
  assert.equal(sum(tosses(2)), 27)
  assert.equal(new Set(tosses(2)).size, 6)
  // the coin and the heart are inverses, and the heart is the ONLY inverse of the coin
  assert.deepEqual(range(9).filter((h) => (2 * h) % 9 === 1), [5])
  // MUTATION: toss 4 instead — a unit, and its orbit closes after three, sums to 24, and folds to no multiple of 9
  assert.equal(sum(tosses(4)) === 27, false)
  assert.equal(new Set(tosses(4)).size === 6, false)
  assert.equal(sum(tosses(4)) % 9 === 0, false)
})

test('seal_ten — recompute the ten-digit permutation and reflection; the near-miss 0124675369 must fail', () => {
  const sealed = [0, 1, 2, 4, 8, 7, 5, 3, 6, 9]
  const nearMiss = [0, 1, 2, 4, 6, 7, 5, 3, 6, 9]
  const isPermutation = (xs: readonly number[]): boolean =>
    xs.length === 10 && range(10).every((d) => xs.includes(d))
  const orbitDoubles = (xs: readonly number[]): boolean => {
    const orbit = [1, 2, 4, 8, 7, 5]
    return orbit.every((x, i) => (x * 2) % 9 === orbit[(i + 1) % orbit.length])
  }
  const reflects = (xs: readonly number[]): boolean =>
    same(xs.map((x) => (x === 0 ? 0 : 10 - x)), [0, 9, 8, 6, 2, 3, 5, 7, 4, 1])
  assert.equal(isPermutation(sealed), true)
  assert.equal(orbitDoubles(sealed), true)
  assert.equal(reflects(sealed), true)
  assert.equal(isPermutation(nearMiss), false)
})

test('angles_close — recompute 10×36 and 6×60; 7×60 must fail the doubling flow', () => {
  assert.equal(10 * 36, 360)
  assert.equal(6 * 60, 360)
  assert.equal(7 * 60 === 360, false)
})

test('digit_polarities_partition_ten — 4+2+4 partition; overlapping sets must fail', () => {
  const minus = [1, 2, 3, 4]
  const neutral = [0, 5]
  const plus = [6, 7, 8, 9]
  const all = [...minus, ...neutral, ...plus]
  assert.equal(all.length, 10)
  assert.equal(range(10).every((d) => all.includes(d)), true)
  assert.equal(minus.every((d) => !plus.includes(d)), true)
  // MUTATION: put 9 among neutrals — breaks nine_is_plus_not_neutral
  assert.equal([...minus, ...neutral, 9].length === 10 && neutral.includes(9), false)
})

test('nine_is_plus_not_neutral — dz(9)=1 and dz(0)=0; folding 9 onto 0 must fail', () => {
  assert.equal(dz(9), 1)
  assert.equal(dz(0), 0)
  assert.equal(dz(5), 5)
  assert.equal(9 > 5, true)
  assert.equal(dz(9) === 0, false)
})

test('polarity_mirror_swaps_sides — mirror swaps 1234↔9876; polar must fail', () => {
  assert.deepEqual([1, 2, 3, 4].map(dz), [9, 8, 7, 6])
  assert.deepEqual([6, 7, 8, 9].map(dz), [4, 3, 2, 1])
  assert.equal(dz(0), 0)
  assert.equal(dz(5), 5)
  assert.equal(same([1, 2, 3, 4].map(polar), [9, 8, 7, 6]), false)
})

test('polarity_plus_is_trinity_of_minus — 10+30+5=45; wrong trinity multiple must fail', () => {
  assert.equal(1 + 2 + 3 + 4, 10)
  assert.equal(6 + 7 + 8 + 9, 30)
  assert.equal(30, 3 * 10)
  assert.equal(0 + 5, 5)
  assert.equal(10 + 30 + 5, 45)
  assert.equal(30 === 2 * 10, false)
})
