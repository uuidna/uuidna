// FALSIFIERS for the Nim.lean wing.
//
// Every test below does two things, and the second is the point:
//   (a) it RECOMPUTES the theorem's property in JavaScript, independently of the Lean kernel that proved it, and
//       asserts the property HOLDS;
//   (b) it MUTATES that property — a flipped bit in the fold, a wrong place-weight, a non-commutative stand-in
//       operator, a heap moved by one, a sealed value shifted by one bit — and asserts the mutated form FAILS.
//
// Half (b) is what separates a falsifier from a restatement. A test that stays green proves nothing.
import { test } from 'node:test'
import assert from 'node:assert/strict'

// The determinism scan admits no host intrinsic anywhere in this tree, so the three shapes this file needs are
// written out. For the non-negative integers walked below, x - (x % 1) is exactly floor(x), and the comparisons
// ARE the definitions of the other two rather than approximations of them.
const trunc = (x: number): number => x - (x % 1)
const ceilOf = (x: number): number => (x % 1 === 0 ? x : x - (x % 1) + 1)
const maxOf = (...xs: number[]): number => xs.reduce((a, b) => (a > b ? a : b))
const minOf = (...xs: number[]): number => xs.reduce((a, b) => (a < b ? a : b))
const absOf = (x: number): number => (x < 0 ? -x : x)

// ── THE SEALED DEFINITION, REBUILT ────────────────────────────────────────────────────────────────────────────
// lxorAux/lxor mirror the wing's own structural recursion over an 8-bit fuel, transcribed into JavaScript rather
// than borrowed from it: a per-bit parity test, a 0/1 digit, and a place weight of two. Nothing here calls the
// host's native `^` — that operator appears only as the SECOND independent implementation the table test folds
// against, so agreement between the two is evidence and not a tautology.
const lxorAux = (w: number, a: number, b: number): number =>
  w === 0 ? 0 : (a % 2 === b % 2 ? 0 : 1) + 2 * lxorAux(w - 1, trunc(a / 2), trunc(b / 2))
const lxor = (a: number, b: number): number => lxorAux(8, a, b)

// ── THE MUTANTS ───────────────────────────────────────────────────────────────────────────────────────────────
// Each is the sealed definition with exactly one thing wrong, and each must make some sealed claim FAIL.
// POLARITY: the parity test emits its digit on the wrong branch — equal bits now set, differing bits now clear.
const flipAux = (w: number, a: number, b: number): number =>
  w === 0 ? 0 : (a % 2 === b % 2 ? 1 : 0) + 2 * flipAux(w - 1, trunc(a / 2), trunc(b / 2))
const lxorFlipped = (a: number, b: number): number => flipAux(8, a, b)
// PLACE: the recursion keeps the digits but drops the doubling, so every bit lands in the ones column.
const flatAux = (w: number, a: number, b: number): number =>
  w === 0 ? 0 : (a % 2 === b % 2 ? 0 : 1) + flatAux(w - 1, trunc(a / 2), trunc(b / 2))
const lxorFlat = (a: number, b: number): number => flatAux(8, a, b)
// SHIFT-ADD: a stand-in binary operation on heaps that is neither commutative nor associative.
const shiftAdd = (a: number, b: number): number => (a * 2 + b) % 16
// SUM: addition modulo eight — zero-summing pairs exist that are not equal pairs.
const addMod8 = (a: number, b: number): number => (a + b) % 8

const range = (n: number): number[] => [...Array(n).keys()]
const rangeFrom = (s: number, n: number): number[] => range(n).map((i) => s + i)
const foldWith = (op: (a: number, b: number) => number, heaps: readonly number[]): number =>
  heaps.reduce((acc, h) => op(acc, h), 0)
const fold = (heaps: readonly number[]): number => foldWith(lxor, heaps)

test('nim_sum_is_xor — heaps 3,5,7 fold to 1 by the rebuilt lxor; the polarity mutant and the flat-place mutant must not', () => {
  assert.equal(lxor(lxor(3, 5), 7), 1)
  assert.equal(fold([3, 5, 7]), 1)
  assert.notEqual(fold([3, 5, 7]), 0)                           // the sealed value, one bit off, must fail
  assert.notEqual(fold([3, 5, 6]), 1)                           // one stone off the last heap and the fold moves
  assert.notEqual(lxorFlipped(3, 5), lxor(3, 5))                // polarity mutant disagrees on the first pairing
  assert.notEqual(lxorFlat(lxorFlat(3, 5), 7), 1)               // dropping the place weight cannot reach the sealed 1
})

test('nim_pposition_is_zero — heaps 1,2,3 fold to 0; moving one heap by a single stone must destroy the zero', () => {
  assert.equal(lxor(lxor(1, 2), 3), 0)
  assert.equal(fold([1, 2, 3]), 0)
  assert.notEqual(fold([1, 2, 4]), 0)                           // 3 -> 4: the P-position is gone
  assert.notEqual(fold([1, 2, 2]), 0)                           // 3 -> 2: likewise
  assert.notEqual(lxorFlat(lxorFlat(1, 2), 3), 0)               // and the flat-place mutant does not vanish here
})

test('nim_equal_heaps_cancel — lxor n n = 0 across 0..15, and lxor n (n+1) is zero for no n at all', () => {
  const cancels = range(16).filter((n) => lxor(n, n) === 0)
  assert.equal(cancels.length, 16)
  const offByOne = range(16).filter((n) => lxor(n, n + 1) === 0)
  assert.equal(offByOne.length, 0)                              // the mirror strategy breaks on unequal heaps
  const mutantCancels = range(16).filter((n) => lxorFlipped(n, n) === 0)
  assert.equal(mutantCancels.length, 0)                         // under the polarity mutant NOTHING cancels
})

test('nim_empty_heap_neutral — lxor n 0 = n across 0..15, while lxor n 1 = n holds for no n', () => {
  assert.ok(range(16).every((n) => lxor(n, 0) === n))
  assert.equal(range(16).filter((n) => lxor(n, 1) === n).length, 0)   // a one-stone heap is never neutral
  assert.equal(range(16).filter((n) => lxorFlipped(n, 0) === n).length, 0)
})

test('nim_sum_commutes — lxor a b = lxor b a on all 64 pairs below 8; the shift-add stand-in must disagree somewhere', () => {
  const pairs = range(8).flatMap((a) => range(8).map((b) => [a, b] as const))
  assert.ok(pairs.every(([a, b]) => lxor(a, b) === lxor(b, a)))
  const mutantDisagreements = pairs.filter(([a, b]) => shiftAdd(a, b) !== shiftAdd(b, a))
  assert.ok(mutantDisagreements.length > 0)                     // the same exhaustion, run on a non-commutative op, FAILS
})

test('nim_sum_associates — lxor regroups freely on all 512 triples below 8; the shift-add stand-in must not', () => {
  const triples = range(8).flatMap((a) => range(8).flatMap((b) => range(8).map((c) => [a, b, c] as const)))
  assert.ok(triples.every(([a, b, c]) => lxor(lxor(a, b), c) === lxor(a, lxor(b, c))))
  const mutantBreaks = triples.filter(([a, b, c]) => shiftAdd(shiftAdd(a, b), c) !== shiftAdd(a, shiftAdd(b, c)))
  assert.ok(mutantBreaks.length > 0)
  // and a many-heap position must fold to one number in EVERY reading order — mutate the order and the mutant moves
  assert.equal(fold([3, 5, 7]), fold([7, 3, 5]))
  assert.notEqual(foldWith(shiftAdd, [3, 5, 7]), foldWith(shiftAdd, [7, 3, 5]))
})

test('nim_lone_heap_wins — lxor 0 n is nonzero for every n in 1..15, and admitting n = 0 must break that claim', () => {
  assert.ok(rangeFrom(1, 15).every((n) => lxor(0, n) !== 0))
  const widened = rangeFrom(0, 16).filter((n) => lxor(0, n) === 0)
  assert.deepEqual(widened, [0])                                // widen the range by one and the theorem is false
  assert.equal(rangeFrom(1, 15).filter((n) => lxor(n, n) !== 0).length, 0)  // lone-heap, not equal-heap
})

test('nim_winning_move_exists — from 1,2,4 exactly one move reaches nim-sum 0, and from the P-position 1,2,3 none does', () => {
  const moves = (heaps: readonly number[]): number[][] =>
    heaps.flatMap((h, i) => range(h).map((next) => heaps.map((x, j) => (j === i ? next : x))))
  assert.equal(lxor(lxor(1, 2), 4), 7)
  assert.equal(lxor(7, 4), 3)                                   // the target height, named by the fold itself
  const winning = moves([1, 2, 4]).filter((p) => fold(p) === 0)
  assert.deepEqual(winning, [[1, 2, 3]])                        // and it IS the height the fold named
  assert.notEqual(lxor(7, 4), 2)                                // the sealed target, one off, must fail
  assert.equal(moves([1, 2, 3]).filter((p) => fold(p) === 0).length, 0)   // mutate the hypothesis to a zero sum: no move survives
})

test('grundy_sum_is_xor — zero nim-sum coincides with equal heaps on all 64 pairs; addition mod 8 must break the coincidence', () => {
  const pairs = range(8).flatMap((a) => range(8).map((b) => [a, b] as const))
  assert.ok(pairs.every(([a, b]) => (lxor(a, b) === 0) === (a === b)))
  const mutantPairs = pairs.filter(([a, b]) => (addMod8(a, b) === 0) !== (a === b))
  assert.ok(mutantPairs.length > 0)                             // e.g. 1 and 7 sum to zero without being equal
  const shiftedClaim = pairs.filter(([a, b]) => (lxor(a, b) === 1) === (a === b))
  assert.notEqual(shiftedClaim.length, pairs.length)            // move the sealed 0 to 1 and the exhaustion fails
})

test('nim_four_powers — the distinct powers 1,2,4,8 fold to 15 because no bits collide; repeat a power and they do', () => {
  assert.equal(lxor(lxor(lxor(1, 2), 4), 8), 15)
  assert.equal(fold([1, 2, 4, 8]), 15)
  assert.notEqual(fold([1, 2, 4, 8]), 14)                       // the sealed value, one bit off, must fail
  assert.notEqual(fold([1, 2, 4, 2]), 15)                       // a collided power cannot reach the maximum
  assert.notEqual(fold([1, 2, 4, 4]), 15)
  const allBelow16 = range(16).flatMap((a) => range(16).map((b) => lxor(a, b)))
  assert.equal(maxOf(...allBelow16), 15)                     // 15 really is the ceiling on these heaps
})

test('nim_misere_differs — an ODD count of one-stone heaps folds to 1; make the count even and the sealed value fails', () => {
  assert.equal(lxor(lxor(1, 1), 1), 1)
  assert.equal(fold([1, 1, 1]), 1)
  assert.notEqual(fold([1, 1, 1]), 0)                           // the sealed value mutated must fail
  assert.equal(fold([1, 1]), 0)                                 // even count: the arithmetic is a different position
  assert.equal(fold([1, 1, 1, 1]), 0)
  assert.equal(fold([1, 1, 1, 1, 1]), 1)                        // parity of the count is the whole content
})

test('nim_max_is_a_diamond_nilpotent — 15 lands on residue 6 mod 9 and 6 squares to 0; no other nonzero residue but 3 does', () => {
  assert.equal(15 % 9, 6)
  assert.equal((6 * 6) % 9, 0)
  assert.notEqual(15 % 9, 3)                                    // the other nilpotent is NOT where 15 lands
  assert.notEqual((5 * 5) % 9, 0)                               // a neighbouring residue is not nilpotent
  const nilpotents = rangeFrom(1, 8).filter((r) => (r * r) % 9 === 0)
  assert.deepEqual(nilpotents, [3, 6])                          // the property is rare, so naming 6 says something
  const units = rangeFrom(1, 8).filter((r) => (r * r) % 9 === 1)
  assert.deepEqual(units, [1, 8])                               // and 6 is not one of them
})

// ── THE 9x9 NIM-ADDITION TABLE ────────────────────────────────────────────────────────────────────────────────
// One row per sealed entry: [key, a, b, the value the wing seals]. The values are transcribed from the wing, not
// computed here — computing them from the function under test would be the vacuity trap wearing a table's clothes.
const TABLE: readonly (readonly [string, number, number, number])[] = [
  ['nimsum_0_0', 0, 0, 0], ['nimsum_0_1', 0, 1, 1], ['nimsum_0_2', 0, 2, 2],
  ['nimsum_0_3', 0, 3, 3], ['nimsum_0_4', 0, 4, 4], ['nimsum_0_5', 0, 5, 5],
  ['nimsum_0_6', 0, 6, 6], ['nimsum_0_7', 0, 7, 7], ['nimsum_0_8', 0, 8, 8],
  ['nimsum_1_0', 1, 0, 1], ['nimsum_1_1', 1, 1, 0], ['nimsum_1_2', 1, 2, 3],
  ['nimsum_1_3', 1, 3, 2], ['nimsum_1_4', 1, 4, 5], ['nimsum_1_5', 1, 5, 4],
  ['nimsum_1_6', 1, 6, 7], ['nimsum_1_7', 1, 7, 6], ['nimsum_1_8', 1, 8, 9],
  ['nimsum_2_0', 2, 0, 2], ['nimsum_2_1', 2, 1, 3], ['nimsum_2_2', 2, 2, 0],
  ['nimsum_2_3', 2, 3, 1], ['nimsum_2_4', 2, 4, 6], ['nimsum_2_5', 2, 5, 7],
  ['nimsum_2_6', 2, 6, 4], ['nimsum_2_7', 2, 7, 5], ['nimsum_2_8', 2, 8, 10],
  ['nimsum_3_0', 3, 0, 3], ['nimsum_3_1', 3, 1, 2], ['nimsum_3_2', 3, 2, 1],
  ['nimsum_3_3', 3, 3, 0], ['nimsum_3_4', 3, 4, 7], ['nimsum_3_5', 3, 5, 6],
  ['nimsum_3_6', 3, 6, 5], ['nimsum_3_7', 3, 7, 4], ['nimsum_3_8', 3, 8, 11],
  ['nimsum_4_0', 4, 0, 4], ['nimsum_4_1', 4, 1, 5], ['nimsum_4_2', 4, 2, 6],
  ['nimsum_4_3', 4, 3, 7], ['nimsum_4_4', 4, 4, 0], ['nimsum_4_5', 4, 5, 1],
  ['nimsum_4_6', 4, 6, 2], ['nimsum_4_7', 4, 7, 3], ['nimsum_4_8', 4, 8, 12],
  ['nimsum_5_0', 5, 0, 5], ['nimsum_5_1', 5, 1, 4], ['nimsum_5_2', 5, 2, 7],
  ['nimsum_5_3', 5, 3, 6], ['nimsum_5_4', 5, 4, 1], ['nimsum_5_5', 5, 5, 0],
  ['nimsum_5_6', 5, 6, 3], ['nimsum_5_7', 5, 7, 2], ['nimsum_5_8', 5, 8, 13],
  ['nimsum_6_0', 6, 0, 6], ['nimsum_6_1', 6, 1, 7], ['nimsum_6_2', 6, 2, 4],
  ['nimsum_6_3', 6, 3, 5], ['nimsum_6_4', 6, 4, 2], ['nimsum_6_5', 6, 5, 3],
  ['nimsum_6_6', 6, 6, 0], ['nimsum_6_7', 6, 7, 1], ['nimsum_6_8', 6, 8, 14],
  ['nimsum_7_0', 7, 0, 7], ['nimsum_7_1', 7, 1, 6], ['nimsum_7_2', 7, 2, 5],
  ['nimsum_7_3', 7, 3, 4], ['nimsum_7_4', 7, 4, 3], ['nimsum_7_5', 7, 5, 2],
  ['nimsum_7_6', 7, 6, 1], ['nimsum_7_7', 7, 7, 0], ['nimsum_7_8', 7, 8, 15],
  ['nimsum_8_0', 8, 0, 8], ['nimsum_8_1', 8, 1, 9], ['nimsum_8_2', 8, 2, 10],
  ['nimsum_8_3', 8, 3, 11], ['nimsum_8_4', 8, 4, 12], ['nimsum_8_5', 8, 5, 13],
  ['nimsum_8_6', 8, 6, 14], ['nimsum_8_7', 8, 7, 15], ['nimsum_8_8', 8, 8, 0],
]

test('the 81 nimsum_a_b entries — each sealed value is refolded twice, and each sealed value with one bit flipped must fail', () => {
  assert.equal(TABLE.length, 81)
  for (const [key, a, b, sealed] of TABLE) {
    assert.equal(lxor(a, b), sealed, key)                       // the rebuilt structural fold
    assert.equal(a ^ b, sealed, key)                            // a SECOND implementation, unrelated to the first
    assert.notEqual(lxor(a, b), sealed ^ 1, key)                // the sealed value, one bit off, must fail
    assert.notEqual(lxorFlipped(a, b), sealed, key)             // the polarity mutant must miss every entry
  }
  // and the table's group shape, recomputed rather than asserted entry by entry:
  const rows = range(9)
  assert.ok(rows.every((a) => lxor(a, 0) === a))                                  // identity
  assert.ok(rows.every((a) => lxor(a, a) === 0))                                  // self-inverse
  assert.ok(rows.every((a) => new Set(rows.map((b) => lxor(a, b))).size === 9))    // every row a permutation
  // MUTATION of that shape: addition mod 8 keeps the identity but loses self-inversion, so the shape is not free.
  assert.ok(!rows.every((a) => addMod8(a, a) === 0))
})
