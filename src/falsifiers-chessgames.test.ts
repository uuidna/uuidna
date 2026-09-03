// Falsifiers for the Chessgames.lean wing.
//
// Every test below does two things and is worthless without both: it RECOMPUTES the theorem's
// property from scratch in JavaScript and asserts it holds, and then it MUTATES that property and
// asserts the mutated form fails. The second half is what separates a falsifier from a restatement.
// The recomputation has to be an independent route to the same number, not a lookup of the number
// being checked. ONE IMPORT IS ALLOWED, AND ONLY FOR THE CLAIM: a falsifier must know what the ledger
// actually SEALS, or it falsifies a statement of its own invention. So the sealed statement is read for
// its PARAMETERS — which base, which exponent, which bound — and every number is then recomputed here by
// arithmetic that imports nothing. Reading the claim is not looking up the answer; writing the answer as a
// literal, which is what this file used to do, is how it came to assert a 39-digit expansion that
// positions_exceed_uuid_space never states.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theoremByKey } from './index.js'

type Offset = readonly [number, number]

/** Exponentiation by repeated multiplication — deliberately NOT the ** operator, so the value is
 *  reached by a different path than the one the sealed statement takes. */
const pow = (base: number, n: number): bigint => {
  let r = 1n
  const b = BigInt(base)
  for (let i = 0; i < n; i++) r *= b
  return r
}

/** Recover the exponent of two by halving until one is left — the exponent is measured off the
 *  value, never assumed from the way the value was written. */
const log2Exact = (n: bigint): number => {
  let k = 0
  let v = n
  while (v > 1n) {
    assert.equal(v % 2n, 0n, 'log2Exact was handed a value that is not a power of two')
    v /= 2n
    k++
  }
  return k
}

const decimalDigits = (n: bigint): number => n.toString().length

/** THE MUTATION HALF. A deliberate corruption of the property must FAIL. If the mutated claim still
 *  holds, assert.throws finds no exception and this helper is the thing that fails — which is the
 *  point: a check that is rigged to pass proves nothing. */
const mutationMustFail = (mutated: boolean, what: string): void => {
  assert.throws(
    () => assert.ok(mutated, what),
    { name: 'AssertionError' },
    `MUTATION SURVIVED — "${what}" was supposed to be false and held anyway`,
  )
}

const KNIGHT: readonly Offset[] = [[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]
const KING: readonly Offset[] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
/** The mutated leaper: a CAMEL strides (1,3) where the knight strides (1,2). Same eight-fold shape,
 *  wrong reach — so any square where it agrees with the knight agrees by accident, not by law. */
const CAMEL: readonly Offset[] = [[1, 3], [3, 1], [-1, 3], [-3, 1], [1, -3], [3, -1], [-1, -3], [-3, -1]]

/** How many of a leaper's offsets land inside [lo, hi) on both axes from (x, y). Both bounds are
 *  parameters because the board bound is the whole content of the mobility theorems — widening only
 *  the far edge would leave the near edge at zero still bearing the whole cut. */
const mobilityIn = (offsets: readonly Offset[], x: number, y: number, lo: number, hi: number): number =>
  offsets.filter(([dx, dy]) => x + dx >= lo && x + dx < hi && y + dy >= lo && y + dy < hi).length

/** The real board: eight by eight. */
const mobility = (offsets: readonly Offset[], x: number, y: number): number => mobilityIn(offsets, x, y, 0, 8)

/** THE BOUND REMOVED — every edge pushed a thousand squares out in both directions, so no offset can
 *  fall off. This is the mutation the mobility theorems live or die on. */
const edgeless = (offsets: readonly Offset[], x: number, y: number): number => mobilityIn(offsets, x, y, -1000, 1000)

/** Directed moves summed over every square — a global cross-check that a single named square cannot
 *  satisfy on its own. */
const boardTotal = (offsets: readonly Offset[]): number => {
  let t = 0
  for (let x = 0; x < 8; x++) for (let y = 0; y < 8; y++) t += mobility(offsets, x, y)
  return t
}

/** How many squares carry each mobility — the whole distribution, so a named value is pinned by the
 *  company it keeps rather than by itself. */
const histogram = (offsets: readonly Offset[]): Record<number, number> => {
  const h: Record<number, number> = {}
  for (let x = 0; x < 8; x++) for (let y = 0; y < 8; y++) {
    const m = mobility(offsets, x, y)
    h[m] = (h[m] ?? 0) + 1
  }
  return h
}

test('game_tree_exceeds_universe — 10^80 < 10^120 recomputed as strict growth of b^n in n across many bases; reversing it, and running it at base 1 and base 0 where growth stops, must fail', () => {
  const atoms = pow(10, 80)
  const tree = pow(10, 120)
  assert.equal(decimalDigits(atoms), 81)
  assert.equal(decimalDigits(tree), 121)
  assert.ok(atoms < tree)

  // The numeral is an instance of a general law: for base >= 2, m < n implies base^m < base^n.
  for (let b = 2; b <= 13; b++) {
    for (let m = 0; m <= 10; m++) {
      for (let n = m + 1; n <= 11; n++) assert.ok(pow(b, m) < pow(b, n), `${b}^${m} < ${b}^${n}`)
    }
  }

  mutationMustFail(tree < atoms, '10^120 < 10^80')
  mutationMustFail(pow(1, 80) < pow(1, 120), '1^80 < 1^120 — growth in the exponent at base one')
  mutationMustFail(pow(0, 80) < pow(0, 120), '0^80 < 0^120 — growth in the exponent at base zero')
})

test('positions_exceed_uuid_space — the sealed inequality read from the ledger, both powers recomputed here by repeated multiplication and cross-checked by exponentiation, then turned into a pigeonhole count; one decade down, a wider address, and a roomier space each must fail', () => {
  // THE CLAIM, FROM THE LEDGER. positions_exceed_uuid_space seals (2:Nat)^128 < 10^44 — an inequality between
  // two powers, and nothing about a decimal expansion. Reading its parameters means this falsifier follows the
  // theorem if the theorem is ever restated, instead of quietly testing a claim the ledger stopped making.
  const stmt = theoremByKey().get('positions_exceed_uuid_space')?.statement ?? ''
  const m = /\((\d+):Nat\)\^(\d+) < (\d+)\^(\d+)/.exec(stmt)
  assert.ok(m, 'the sealed statement no longer has the shape this falsifier reads: ' + stmt)
  const [, base, exp, boundBase, boundExp] = m as RegExpExecArray

  // THE ARITHMETIC, LOCAL. Repeated multiplication, not **, so the value is reached by a different path than
  // the sealed statement takes.
  let uuidSpace = 1n
  for (let i = 0; i < Number(exp); i++) uuidSpace *= BigInt(base)
  // THE LOOP, CROSS-CHECKED BY A SECOND ROUTE. This line used to assert the 39-digit expansion as a literal —
  // a constant carrying no theorem, since the sealed statement is an inequality and never mentions an
  // expansion. It was also the largest digit-sink in the test corpus: 17 distinct ledger counts fall inside
  // those 39 digits, which is how a file about chess came to be accused of pinning the theorem count. The
  // check it was really making is that the doubling loop is right, and ** makes that point with no numeral at
  // all, from the same ledger-supplied base and exponent.
  assert.equal(uuidSpace, BigInt(base) ** BigInt(exp))

  // THE BOUND, ALSO FROM THE LEDGER — 10 and 44 are the statement own, not this file guess at them.
  const positions = pow(Number(boundBase), Number(boundExp))
  assert.ok(uuidSpace < positions)

  // The consequence the statement exists for: N positions into M addresses forces some address to
  // carry at least ceil(N / M), and that ceiling is at least two.
  const perAddress = (positions + uuidSpace - 1n) / uuidSpace
  assert.ok(perAddress >= 2n, 'the pigeonhole ceiling should force a shared address')

  mutationMustFail(uuidSpace < pow(10, 38), '2^128 < 10^38 — the decade below')
  mutationMustFail(pow(2, 148) < positions, '2^148 < 10^44 — a wider address still fitting under the positions')
  const roomy = pow(10, 50)
  mutationMustFail((positions + roomy - 1n) / roomy >= 2n, 'a 10^50 address space still forces a collision')
})

test('positions_within_naive_bound — 13^64 recomputed twice by different routes (64 multiplications vs six squarings) and pinned to 72 digits; the reverse, the next decade up, and a twelve-state alphabet must fail', () => {
  let naive = 1n
  for (let i = 0; i < 64; i++) naive *= 13n
  let squared = 13n
  for (let i = 0; i < 6; i++) squared *= squared          // 13^(2^6) = 13^64
  assert.equal(squared, naive, 'two independent routes to 13^64 should agree')
  assert.equal(decimalDigits(naive), 72)

  assert.ok(pow(10, 44) < naive)
  assert.ok(pow(10, 71) < naive, 'the bound sits above 10^71')

  mutationMustFail(naive < pow(10, 44), '13^64 < 10^44')
  mutationMustFail(pow(10, 72) < naive, '10^72 < 13^64 — one decade too far')
  mutationMustFail(pow(12, 64) === naive, '12^64 = 13^64 — a twelve-state square')
})

test('one_game_is_a_speck — the decade crossover for 6000 is recomputed as k=4 and the fold cost is walked ply by ply; the decade below, the non-strict form, and an enumerated 100-ply branch must fail', () => {
  const plies = 6000n
  let k = 0
  while (pow(10, k) <= plies) k++
  assert.equal(k, 4, '1000 <= 6000 < 10000, so the crossover is the fourth decade')
  assert.ok(k <= 120)
  assert.ok(plies < pow(10, 120))

  // Addressing ONE game is linear in its plies: the walk touches each ply once and no more.
  let touched = 0
  let acc = 0n
  for (let i = 0; i < 6000; i++) { acc = (acc * 31n + BigInt(i)) % 1000003n; touched++ }
  assert.equal(touched, 6000)
  assert.ok(BigInt(touched) < pow(10, 120))

  mutationMustFail(plies < pow(10, 3), '6000 < 10^3')
  mutationMustFail(pow(10, 120) < pow(10, 120), '10^120 < 10^120 — the strict form against itself')
  mutationMustFail(pow(20, 100) < pow(10, 120), '20^100 < 10^120 — enumerating a 100-ply branch instead of addressing one game')
})

test('board_3d_is_two_nine — 8^3 and 2^9 recomputed by separate loops and the exponent of two recovered by halving; 2^8, 2^10 and an exponent of six must fail', () => {
  let cube = 1n
  for (let i = 0; i < 3; i++) cube *= 8n
  let doubled = 1n
  for (let i = 0; i < 9; i++) doubled *= 2n
  assert.equal(cube, 512n)
  assert.equal(doubled, 512n)
  assert.equal(cube, doubled)
  assert.equal(log2Exact(cube), 9, 'halving 8^3 down to one should take nine steps')

  mutationMustFail(cube === pow(2, 8), '8^3 = 2^8')
  mutationMustFail(cube === pow(2, 10), '8^3 = 2^10')
  mutationMustFail(log2Exact(cube) === 3 * 2, 'the exponent of two in 8^3 is six')
})

test('board_dims_add_three — [8^1,8^2,8^3] recomputed and each exponent of two recovered as exactly 3d for d up to eight; a step of two per dimension, and 8^4 as 2^13, must fail', () => {
  const cells = [1, 2, 3].map((d) => pow(8, d))
  assert.deepEqual(cells, [8n, 64n, 512n])

  const exponents = cells.map(log2Exact)
  assert.deepEqual(exponents, [3, 6, 9])
  for (let d = 0; d <= 8; d++) assert.equal(log2Exact(pow(8, d)), 3 * d, `8^${d} should be 2^${3 * d}`)

  const steps = exponents.slice(1).map((e, i) => e - exponents[i])
  assert.deepEqual(steps, [3, 3], 'each added dimension should add three to the exponent')

  mutationMustFail(steps.every((s) => s === 2), 'each dimension adds two to the exponent')
  mutationMustFail(exponents.every((e, i) => e === 2 * (i + 1) + 1), 'the exponents follow 2d+1')
  mutationMustFail(log2Exact(pow(8, 4)) === 3 * 4 + 1, '8^4 = 2^13')
})

test('hyperchess_eight_dimensions — 8^8 and 2^24 recomputed by separate loops and 2^8 recovered by doubling; 2^23, 2^25 and 255 must fail', () => {
  let side8 = 1n
  for (let i = 0; i < 8; i++) side8 *= 8n
  let two24 = 1n
  for (let i = 0; i < 24; i++) two24 *= 2n
  assert.equal(side8, 16777216n)
  assert.equal(side8, two24)
  assert.equal(log2Exact(side8), 24)

  let octet = 1n
  for (let i = 0; i < 8; i++) octet *= 2n
  assert.equal(octet, 256n)
  assert.equal(log2Exact(octet), 8)

  mutationMustFail(side8 === pow(2, 23), '8^8 = 2^23')
  mutationMustFail(side8 === pow(2, 25), '8^8 = 2^25')
  // BigInt(255) rather than the literal 255n, and the difference is not cosmetic: tsc narrows both sides to
  // literal types and refuses `octet === 255n` as a comparison with no overlap — it can PROVE the mutation false
  // at compile time. But a falsifier's mutation must be false at RUNTIME and merely plausible at compile time,
  // or the type checker rejects the very thing the test exists to disprove. Widening one side keeps the mutation
  // intact and lets it reach the assertion that must fail.
  mutationMustFail(octet === BigInt(255), '2^8 = 255')
})

test('no_maximal_board — the chain 8^d < 8^(d+1) recomputed for twenty dimensions with a strictly larger board past the largest named; the reversed step and the flat side-1 chain must fail', () => {
  assert.ok(pow(8, 1) < pow(8, 2))
  assert.ok(pow(8, 2) < pow(8, 3))
  for (let d = 1; d <= 20; d++) assert.ok(pow(8, d) < pow(8, d + 1), `8^${d} < 8^${d + 1}`)

  // No maximum, only bounds: name the largest board reached above and one still exceeds it.
  const largest = pow(8, 20)
  assert.ok(largest < pow(8, 21))

  mutationMustFail(pow(8, 3) < pow(8, 2), '8^3 < 8^2')
  mutationMustFail(pow(1, 1) < pow(1, 2), '1^1 < 1^2')
  mutationMustFail([1, 2, 3].every((d) => pow(1, d) < pow(1, d + 1)), 'a side-1 board still climbs with dimension')
})

test('knight_near_centre_six — the knight leap set recomputed at the square one step in from the edge, cross-checked against the whole-board total of 336 and its distribution; an edgeless board, a (1,3) leaper and the king must fail', () => {
  assert.equal(mobility(KNIGHT, 2, 1), 6)

  // Six is the board bound at work: remove the edges and the same leaper always has eight.
  assert.equal(edgeless(KNIGHT, 2, 1), 8)

  // The named square has to sit inside the global count, not stand alone.
  assert.equal(boardTotal(KNIGHT), 336)
  assert.deepEqual(histogram(KNIGHT), { 2: 4, 3: 8, 4: 20, 6: 16, 8: 16 })
  assert.equal(4 * 2 + 8 * 3 + 20 * 4 + 16 * 6 + 16 * 8, 336)

  mutationMustFail(edgeless(KNIGHT, 2, 1) === 6, 'the edgeless board still gives six')
  mutationMustFail(mobility(CAMEL, 2, 1) === 6, 'a (1,3) leaper gives six on that square')
  mutationMustFail(mobility(KING, 2, 1) === 6, 'the king gives six on that square')
  mutationMustFail(4 * 2 + 8 * 3 + 20 * 4 + 16 * 5 + 16 * 8 === boardTotal(KNIGHT), 'the sixteen near-centre squares hold five each')
})

test('knight_edge_four — the knight leap set recomputed on the edge file, with the four lost leaps identified as exactly those crossing the edge; an edgeless board, the centre square and the king must fail', () => {
  assert.equal(mobility(KNIGHT, 3, 0), 4)
  assert.equal(edgeless(KNIGHT, 3, 0), 8)

  // The edge halves it, and it halves it for a reason: every lost leap is the one stepping past rank zero.
  const lost = KNIGHT.filter(([dx, dy]) => !(3 + dx >= 0 && 3 + dx < 8 && 0 + dy >= 0 && 0 + dy < 8))
  assert.equal(lost.length, 4)
  assert.ok(lost.every(([, dy]) => dy < 0), 'every lost leap should be the one stepping off the near rank')
  assert.equal(boardTotal(KNIGHT), 336)

  mutationMustFail(edgeless(KNIGHT, 3, 0) === 4, 'the edgeless board still gives four')
  mutationMustFail(mobility(KNIGHT, 3, 3) === 4, 'the central square also gives four')
  mutationMustFail(mobility(KING, 3, 0) === 4, 'the king gives four on the edge')
  mutationMustFail(lost.some(([, dy]) => dy > 0), 'a leap toward the far rank was also lost')
})

test('knight_near_corner_three — the knight leap set recomputed beside the corner and separated from the corner square itself; an edgeless board, the corner, and the king must fail', () => {
  assert.equal(mobility(KNIGHT, 0, 1), 3)
  assert.equal(edgeless(KNIGHT, 0, 1), 8)

  // Three is strictly between the corner's two and the edge's four — the neighbourhood, not just the value.
  assert.equal(mobility(KNIGHT, 0, 0), 2)
  assert.equal(mobility(KNIGHT, 0, 2), 4)
  assert.ok(mobility(KNIGHT, 0, 0) < mobility(KNIGHT, 0, 1))
  assert.ok(mobility(KNIGHT, 0, 1) < mobility(KNIGHT, 0, 2))
  assert.equal(histogram(KNIGHT)[3], 8, 'exactly eight squares should carry three')

  mutationMustFail(edgeless(KNIGHT, 0, 1) === 3, 'the edgeless board still gives three')
  mutationMustFail(mobility(KNIGHT, 0, 0) === 3, 'the corner also gives three')
  mutationMustFail(mobility(KING, 0, 1) === 3, 'the king gives three beside the corner')
  mutationMustFail(histogram(KNIGHT)[3] === 4, 'four squares carry three')
})

test('king_edge_five — the king neighbourhood recomputed on the edge and pinned by the whole-board total of 420, which the decomposition 4x3 + 24x5 + 36x8 must reproduce; an edgeless board, a four-square edge, the corner and the knight must fail', () => {
  assert.equal(mobility(KING, 3, 0), 5)
  assert.equal(edgeless(KING, 3, 0), 8)

  assert.equal(boardTotal(KING), 420)
  assert.deepEqual(histogram(KING), { 3: 4, 5: 24, 8: 36 })
  assert.equal(4 * 3 + 24 * 5 + 36 * 8, boardTotal(KING), 'the decomposition should rebuild the global total')

  mutationMustFail(edgeless(KING, 3, 0) === 5, 'the edgeless board still gives five')
  mutationMustFail(4 * 3 + 24 * 4 + 36 * 8 === boardTotal(KING), 'the edge king touches four and the total survives')
  mutationMustFail(mobility(KING, 0, 0) === 5, 'the corner also gives five')
  mutationMustFail(mobility(KNIGHT, 3, 0) === 5, 'the knight gives five on the edge')
})
