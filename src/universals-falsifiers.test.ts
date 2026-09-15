// The kernel proves these statements for every n. Each test here mirrors one statement in plain JavaScript over small
// deterministic samples (it must hold on every one), then perturbs its mathematics (a constant, a term, a weight, a
// bound, a sign) and asserts the perturbed statement fails on at least one of the same samples. The mirrors follow
// the wing definitions: psum, sq, step, stepZ (lean/Fluid.lean), amps (lean/Quantum.lean), andF, orF, and8, or8,
// versionStamp, variantStamp, allBytes, bitAt, fixedPositions (lean/UuidLaws.lean).
import { test } from 'node:test'
import assert from 'node:assert/strict'

type Fn = (i: number) => number
type IntFn = (i: number) => number

const range = (lo: number, hi: number): number[] => {
  const out: number[] = []
  for (let i = lo; i <= hi; i++) out.push(i)
  return out
}
const tuples = (len: number, vals: readonly number[]): number[][] => {
  const out: number[][] = []
  const rec = (acc: number[]): void => {
    if (acc.length === len) { out.push(acc.slice()); return }
    for (const v of vals) { acc.push(v); rec(acc); acc.pop() }
  }
  rec([])
  return out
}
const implies = (h: boolean, c: boolean): boolean => !h || c
const div = (a: number, d: number): number => (a - (a % d)) / d
const natSub = (a: number, b: number): number => (a > b ? a - b : 0)
const natAbs = (x: number): number => (x < 0 ? -x : x)

// psum f n = f 0 + … + f (n - 1)
const psum = (f: Fn, n: number): number => {
  let s = 0
  for (let i = 0; i < n; i++) s += f(i)
  return s
}
const sq = (x: number): number => x * x
const step = (f: Fn) => (i: number): number => f(i) + f(i + 1) + f(i + 1) + f(i + 2)
const stepZ = (u: IntFn) => (i: number): number => u(i) + u(i + 1) + u(i + 1) + u(i + 2)
// a field read from a list, zero past its end (the statements quantify over every f : Nat → Nat)
const listFn = (xs: readonly number[]): Fn => (i) => (i < xs.length ? xs[i] : 0)
// a ring: the list repeated, so f (i + len) = f i for every i
const ringFn = (xs: readonly number[]): Fn => (i) => xs[i % xs.length]
// f (i + p) = f i for every i, decided over one period of a ring of length len
const hasPeriod = (f: Fn, len: number, p: number): boolean => range(0, len - 1).every((i) => f(i + p) === f(i))

const firstFailure = <S>(samples: readonly S[], p: (s: S) => boolean): S | undefined => samples.find((s) => !p(s))
const holdsAndMutantFails = <S>(samples: readonly S[], statement: (s: S) => boolean, mutant: (s: S) => boolean): void => {
  assert.ok(samples.length > 0)
  assert.equal(firstFailure(samples, statement), undefined)
  assert.notEqual(firstFailure(samples, mutant), undefined)
}

const NAT = range(0, 5)
const SIGNED = range(-3, 3)
const SIZES = range(1, 5)
const pairs = tuples(2, NAT)
const triples = tuples(3, NAT)
// every ring of length 1..4 over the given values, summed over n = 1..5 cells (the sum length need not equal the ring)
const periodic = (vals: readonly number[]): { f: Fn; len: number; n: number }[] =>
  range(1, 4).flatMap((len) => tuples(len, vals).flatMap((xs) => SIZES.map((n) => ({ f: ringFn(xs), len, n }))))
const natRings = periodic(NAT)
const intRings = periodic(SIGNED)
const lists = range(1, 4).flatMap((len) => tuples(len, range(0, 3))).flatMap((xs) => range(0, 4).map((n) => ({ f: listFn(xs), n })))

// ── Fluid: telescoping, cancellation, the curl ───────────────────────────────────────────────────────────────────

test('discrete_divergence_telescopes: shifted sum plus the first value is the sum plus the last; reading the last value one cell too far breaks it', () => {
  holdsAndMutantFails(lists,
    ({ f, n }) => psum((i) => f(i + 1), n) + f(0) === psum(f, n) + f(n),
    ({ f, n }) => psum((i) => f(i + 1), n) + f(0) === psum(f, n) + f(n + 1))
})

test('add_right_cancel_by_induction: a + k = b + k gives a = b; the same cancellation for a factor k fails at k = 0', () => {
  const s = tuples(3, NAT)
  holdsAndMutantFails(s,
    ([a, b, k]) => implies(a + k === b + k, a === b),
    ([a, b, k]) => implies(a * k === b * k, a === b))
})

test('add_left_cancel_by_induction: k + a = k + b gives a = b; truncated subtraction k - a = k - b does not cancel', () => {
  const s = tuples(3, NAT)
  holdsAndMutantFails(s,
    ([k, a, b]) => implies(k + a === k + b, a === b),
    ([k, a, b]) => implies(natSub(k, a) === natSub(k, b), a === b))
})

test('ring_divergence_is_zero: with f n = f 0 the shifted sum equals the sum; without that boundary condition the ring leaks', () => {
  holdsAndMutantFails(lists,
    ({ f, n }) => implies(f(n) === f(0), psum((i) => f(i + 1), n) === psum(f, n)),
    ({ f, n }) => psum((i) => f(i + 1), n) === psum(f, n))
})

test('discrete_curl_of_gradient_vanishes: both paths around a cell rise by the same amount; pairing the legs the wrong way fails', () => {
  const s = tuples(5, NAT).map(([p, dx, dy, dy2, dx2]) => ({ p, dx, dy, dy2, dx2, q: p + dx, s: p + dx + dy2, r: p + dy }))
  const hyp = (c: (typeof s)[number]): boolean => c.q === c.p + c.dx && c.s === c.q + c.dy2 && c.r === c.p + c.dy && c.s === c.r + c.dx2
  assert.ok(s.some(hyp))
  holdsAndMutantFails(s,
    (c) => implies(hyp(c), c.dx + c.dy2 === c.dy + c.dx2),
    (c) => implies(hyp(c), c.dx + c.dx2 === c.dy + c.dy2))
})

// ── Fluid: the algebra of the energy bound ───────────────────────────────────────────────────────────────────────

test('diffusion_step_never_exceeds_the_maximum: a + 2b + c stays within four copies of the maximum; three copies is too tight', () => {
  const s = tuples(4, NAT)
  holdsAndMutantFails(s,
    ([a, b, c, m]) => implies(a <= m && b <= m && c <= m, a + b + b + c <= m + m + m + m),
    ([a, b, c, m]) => implies(a <= m && b <= m && c <= m, a + b + b + c <= m + m + m))
})

test('right_distrib_by_comm: (x + y) z = x z + y z; dropping the factor z from the second product fails', () => {
  holdsAndMutantFails(triples,
    ([x, y, z]) => (x + y) * z === x * z + y * z,
    ([x, y, z]) => (x + y) * z === x * z + y)
})

test('square_of_sum_expands: (x + y)^2 = x^2 + y^2 + 2xy; the cross term counted once fails', () => {
  holdsAndMutantFails(pairs,
    ([x, y]) => (x + y) * (x + y) === (x * x + y * y) + (x * y + x * y),
    ([x, y]) => (x + y) * (x + y) === (x * x + y * y) + x * y)
})

test('two_products_le_sum_of_squares: 2xy is at most x^2 + y^2; 3xy is not', () => {
  holdsAndMutantFails(pairs,
    ([x, y]) => x * y + x * y <= x * x + y * y,
    ([x, y]) => x * y + x * y + x * y <= x * x + y * y)
})

test('square_of_sum_le_twice_sum_of_squares: (x + y)^2 is at most twice x^2 + y^2; once is not enough', () => {
  holdsAndMutantFails(pairs,
    ([x, y]) => (x + y) * (x + y) <= (x * x + y * y) + (x * x + y * y),
    ([x, y]) => (x + y) * (x + y) <= x * x + y * y)
})

test('diffusion_stencil_square_le_weighted_energy: (a + 2b + c)^2 is at most four weighted energies; three is too tight', () => {
  const e = (a: number, b: number, c: number): number => a * a + b * b + b * b + c * c
  holdsAndMutantFails(triples,
    ([a, b, c]) => (a + b + b + c) * (a + b + b + c) <= e(a, b, c) + e(a, b, c) + e(a, b, c) + e(a, b, c),
    ([a, b, c]) => (a + b + b + c) * (a + b + b + c) <= e(a, b, c) + e(a, b, c) + e(a, b, c))
})

test('four_mul_is_four_copies: 4S is four copies of S; three copies fails', () => {
  holdsAndMutantFails(NAT, (S) => 4 * S === S + S + S + S, (S) => 4 * S === S + S + S)
})

test('sixteen_mul_is_four_fours: 16S is four groups of four copies; 15S fails', () => {
  const four = (S: number): number => S + S + S + S
  holdsAndMutantFails(NAT,
    (S) => 16 * S === four(S) + four(S) + four(S) + four(S),
    (S) => 15 * S === four(S) + four(S) + four(S) + four(S))
})

// ── Fluid: sums over the ring ────────────────────────────────────────────────────────────────────────────────────

test('psum_add4: the sum of four fields is the four sums; dropping the fourth field fails', () => {
  const fams: Fn[] = range(0, 2).flatMap((a) => range(1, 2).map((b) => (i: number) => (a + b * i) % 4))
  const s = tuples(4, range(0, fams.length - 1)).flatMap((q) => range(0, 4).map((n) => ({ q: q.map((j) => fams[j]), n })))
  holdsAndMutantFails(s,
    ({ q: [a, b, c, d], n }) => psum((i) => a(i) + b(i) + c(i) + d(i), n) === psum(a, n) + psum(b, n) + psum(c, n) + psum(d, n),
    ({ q: [a, b, c, d], n }) => psum((i) => a(i) + b(i) + c(i) + d(i), n) === psum(a, n) + psum(b, n) + psum(c, n))
})

test('psum_le_of_pointwise: a pointwise bound bounds the sums; a pointwise bound with slack one does not', () => {
  const fields = tuples(3, range(0, 3)).map(listFn)
  const s = fields.flatMap((f) => fields.flatMap((g) => range(0, 4).map((n) => ({ f, g, n }))))
  const within = (f: Fn, g: Fn, slack: number): boolean => range(0, 3).every((i) => f(i) <= g(i) + slack)
  holdsAndMutantFails(s,
    ({ f, g, n }) => implies(within(f, g, 0), psum(f, n) <= psum(g, n)),
    ({ f, g, n }) => implies(within(f, g, 1), psum(f, n) <= psum(g, n)))
})

test('ring_shift_preserves_sum: on a ring of period n the shifted sum is the sum; a period one longer than the sum fails', () => {
  assert.ok(natRings.some(({ f, len, n }) => hasPeriod(f, len, n)))
  holdsAndMutantFails(natRings,
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum((i) => f(i + 1), n) === psum(f, n)),
    ({ f, len, n }) => implies(hasPeriod(f, len, n + 1), psum((i) => f(i + 1), n) === psum(f, n)))
})

test('ring_double_shift_preserves_sum: a shift of two keeps the sum on the ring; a stride of two does not', () => {
  holdsAndMutantFails(natRings,
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum((i) => f(i + 2), n) === psum(f, n)),
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum((i) => f(i + i), n) === psum(f, n)))
})

test('ring_shift_preserves_energy: the shifted field has the same energy; the product with the neighbour is a different sum', () => {
  holdsAndMutantFails(natRings,
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum((i) => sq(f(i + 1)), n) === psum((i) => sq(f(i)), n)),
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum((i) => f(i) * f(i + 1), n) === psum((i) => sq(f(i)), n)))
})

test('diffusion_step_conserves_momentum: the step sums to four times the field; a centre weight of three sums to five', () => {
  const heavy = (f: Fn) => (i: number): number => f(i) + f(i + 1) + f(i + 1) + f(i + 1) + f(i + 2)
  holdsAndMutantFails(natRings,
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum(step(f), n) === 4 * psum(f, n)),
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum(heavy(f), n) === 4 * psum(f, n)))
})

test('ring_energy_bound_of_pointwise: any h under the stencil has at most 16 times the energy; 15 times fails', () => {
  const s = natRings.filter(({ len, n }) => len <= 3 && n <= 4).flatMap(({ f, len, n }) =>
    [step(f), (i: number) => natSub(step(f)(i), i % 2), (i: number) => div(step(f)(i), 2), () => 0].map((h) => ({ f, h, len, n })))
  const under = (f: Fn, h: Fn, len: number): boolean => range(0, len + len - 1).every((i) => h(i) <= f(i) + f(i + 1) + f(i + 1) + f(i + 2))
  holdsAndMutantFails(s,
    ({ f, h, len, n }) => implies(hasPeriod(f, len, n) && under(f, h, len), psum((i) => sq(h(i)), n) <= 16 * psum((i) => sq(f(i)), n)),
    ({ f, h, len, n }) => implies(hasPeriod(f, len, n) && under(f, h, len), psum((i) => sq(h(i)), n) <= 15 * psum((i) => sq(f(i)), n)))
})

test('diffusion_step_never_increases_energy: the step energy is at most 16 times the field energy; a constant field refutes 15', () => {
  holdsAndMutantFails(natRings,
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum((i) => sq(step(f)(i)), n) <= 16 * psum((i) => sq(f(i)), n)),
    ({ f, len, n }) => implies(hasPeriod(f, len, n), psum((i) => sq(step(f)(i)), n) <= 15 * psum((i) => sq(f(i)), n)))
})

// ── Fluid: the signed field ──────────────────────────────────────────────────────────────────────────────────────

test('natAbs_subNatNat_le: |m - k| is at most m + k; dropping k from the bound fails', () => {
  holdsAndMutantFails(pairs, ([m, k]) => natAbs(m - k) <= m + k, ([m, k]) => natAbs(m - k) <= m)
})

test('natAbs_triangle: |a + b| is at most |a| + |b|; the reversed inequality fails for opposite signs', () => {
  holdsAndMutantFails(tuples(2, SIGNED),
    ([a, b]) => natAbs(a + b) <= natAbs(a) + natAbs(b),
    ([a, b]) => natAbs(a) + natAbs(b) <= natAbs(a + b))
})

test('sq_natAbs_is_the_square: |x| times |x| is x times x; keeping the sign on one factor fails for negative x', () => {
  holdsAndMutantFails(SIGNED, (x) => sq(natAbs(x)) === x * x, (x) => sq(natAbs(x)) === x * natAbs(x))
})

test('signed_diffusion_step_never_increases_energy: the signed step at weight one quarter stays within 16 times the energy; weight one grows it', () => {
  // weight one: u(i+1) + (u i - 2 u(i+1) + u(i+2)), compared against the energy itself
  const unstable = (u: IntFn) => (i: number): number => u(i) - u(i + 1) + u(i + 2)
  holdsAndMutantFails(intRings,
    ({ f: u, len, n }) => implies(hasPeriod(u, len, n), psum((i) => sq(natAbs(stepZ(u)(i))), n) <= 16 * psum((i) => sq(natAbs(u(i))), n)),
    ({ f: u, len, n }) => implies(hasPeriod(u, len, n), psum((i) => sq(natAbs(unstable(u)(i))), n) <= psum((i) => sq(natAbs(u(i))), n)))
})

// ── Quantum: induction over the register ─────────────────────────────────────────────────────────────────────────

const amps = (n: number): number => (n === 0 ? 1 : 2 * amps(n - 1))
const QUBITS = range(0, 10)

test('mul_assoc_by_induction: a b c associates; truncated subtraction does not', () => {
  holdsAndMutantFails(triples,
    ([a, b, c]) => a * b * c === a * (b * c),
    ([a, b, c]) => natSub(natSub(a, b), c) === natSub(a, natSub(b, c)))
})

test('n_qubit_dimension_all: n qubits carry 2^n amplitudes; linear growth 2n fails', () => {
  holdsAndMutantFails(QUBITS, (n) => amps(n) === 2 ** n, (n) => amps(n) === 2 * n)
})

test('one_more_qubit_doubles: one more qubit doubles the amplitudes; adding two fails', () => {
  holdsAndMutantFails(QUBITS, (n) => amps(n + 1) === 2 * amps(n), (n) => amps(n + 1) === amps(n) + 2)
})

test('shl_pow: a shifted left by k is 2^k times a; adding the power instead of multiplying fails', () => {
  const s = NAT.flatMap((a) => QUBITS.map((k) => [BigInt(a), BigInt(k)] as const))
  holdsAndMutantFails(s, ([a, k]) => (a << k) === 2n ** k * a, ([a, k]) => (a << k) === 2n ** k + a)
})

test('shift_is_the_dimension: 1 shifted left by n is the n-qubit dimension; swapping the operands fails', () => {
  holdsAndMutantFails(QUBITS,
    (n) => (1n << BigInt(n)) === BigInt(amps(n)),
    (n) => (BigInt(n) << 1n) === BigInt(amps(n)))
})

// ── UuidLaws: the stamps over all 256 bytes ──────────────────────────────────────────────────────────────────────

const andF = (f: number, a: number, b: number): number =>
  f === 0 || a === 0 || b === 0 ? 0 : (a % 2 === 1 && b % 2 === 1 ? 1 : 0) + 2 * andF(f - 1, div(a, 2), div(b, 2))
const orF = (f: number, a: number, b: number): number =>
  f === 0 ? 0 : a === 0 ? b : b === 0 ? a : (a % 2 === 1 || b % 2 === 1 ? 1 : 0) + 2 * orF(f - 1, div(a, 2), div(b, 2))
const and8 = (a: number, b: number): number => andF(9, a, b)
const or8 = (a: number, b: number): number => orF(9, a, b)
const versionStamp = (b: number): number => or8(and8(b, 15), 128)
const variantStamp = (b: number): number => or8(and8(b, 63), 128)
const allBytes = (p: (b: number) => boolean): boolean => range(0, 15).every((hi) => range(0, 15).every((lo) => p(16 * hi + lo)))
const bitAt = (x: number, i: number): number => div(x, 2 ** i) % 2
const fixedPositions = (stamp: (b: number) => number): number[] =>
  range(0, 7).filter((i) => allBytes((b) => bitAt(stamp(b), i) === bitAt(stamp(0), i)))
const sameList = (a: readonly number[], b: readonly number[]): boolean => a.length === b.length && a.every((x, i) => x === b[i])
// perturbed stamps: the version mask one bit wider, the variant mask one bit wider
const wideVersion = (b: number): number => or8(and8(b, 31), 128)
const wideVariant = (b: number): number => or8(and8(b, 127), 128)

test('version_stamp: every byte keeps its low nibble under the version stamp; a mask one bit wider leaks bit four', () => {
  assert.equal(allBytes((b) => or8(and8(b, 15), 128) === 128 + b % 16), true)
  assert.equal(allBytes((b) => or8(and8(b, 31), 128) === 128 + b % 16), false)
})

test('variant_stamp: every byte keeps its low six bits under the variant stamp; the constant 0xC0 in place of 0x80 fails', () => {
  assert.equal(allBytes((b) => or8(and8(b, 63), 128) === 128 + b % 64), true)
  assert.equal(allBytes((b) => or8(and8(b, 63), 192) === 128 + b % 64), false)
})

test('version_high_nibble_is_eight: the version stamp fixes the high nibble at 8; the variant stamp fixes only two bits of it', () => {
  assert.equal(allBytes((b) => div(versionStamp(b), 16) === 8), true)
  assert.equal(allBytes((b) => div(variantStamp(b), 16) === 8), false)
})

test('variant_high_two_are_one_zero: the variant stamp fixes the high two bits at 10; claiming the high three fails', () => {
  assert.equal(allBytes((b) => div(variantStamp(b), 64) === 2), true)
  assert.equal(allBytes((b) => div(variantStamp(b), 32) === 4), false)
})

test('fixed_positions_exact: the version stamp fixes bits 4 to 7 and the variant stamp bits 6 and 7; a wider version mask frees bit 4', () => {
  assert.equal(sameList(fixedPositions(versionStamp), [4, 5, 6, 7]) && sameList(fixedPositions(variantStamp), [6, 7]), true)
  assert.equal(sameList(fixedPositions(wideVersion), [4, 5, 6, 7]) && sameList(fixedPositions(variantStamp), [6, 7]), false)
})

test('free_bits_122: sixteen bytes less the fixed positions leave 122 free bits; a wider variant mask leaves another count', () => {
  const free = (v: (b: number) => number, w: (b: number) => number): number => 16 * 8 - (fixedPositions(v).length + fixedPositions(w).length)
  assert.equal(free(versionStamp, variantStamp) === 122, true)
  assert.equal(free(versionStamp, wideVariant) === 122, false)
})

// ── UuidLaws: bounded search and the pigeonhole ──────────────────────────────────────────────────────────────────

test('bounded_search_finds_or_refutes: a search up to n finds v or refutes it; a witness bound strict at n misses the last cell', () => {
  const s = tuples(4, range(0, 2)).map(listFn).flatMap((f) => range(0, 3).flatMap((v) => range(0, 3).map((n) => ({ f, v, n }))))
  holdsAndMutantFails(s,
    ({ f, v, n }) => range(0, n).some((x) => f(x) === v) || range(0, n).every((x) => f(x) !== v),
    ({ f, v, n }) => range(0, n - 1).some((x) => f(x) === v) || range(0, n).every((x) => f(x) !== v))
})

// x < y ≤ top with f x = f y
const collides = (f: Fn, top: number): boolean => range(1, top).some((y) => range(0, y - 1).some((x) => f(x) === f(y)))

test('pigeonhole_for_every_size: n + 1 values below n collide; below n + 1 the identity escapes', () => {
  const s = range(0, 4).flatMap((n) => tuples(n + 1, range(0, n)).map((xs) => ({ f: listFn(xs), n })))
  assert.ok(s.some(({ f, n }) => range(0, n).every((x) => f(x) < n)))
  holdsAndMutantFails(s,
    ({ f, n }) => implies(range(0, n).every((x) => f(x) < n), collides(f, n)),
    ({ f, n }) => implies(range(0, n).every((x) => f(x) < n + 1), collides(f, n)))
})

test('address_never_determines_payload: 2^k + 1 payloads under a k-bit address collide; a window of 2^k does not', () => {
  // listFn is zero past the list, and zero is below 2^k, so checking the listed cells decides the bound for every x
  const s = range(0, 2).flatMap((k) => tuples(2 ** k + 1, range(0, 2 ** k)).map((xs) => ({ f: listFn(xs), k, len: xs.length })))
  const bounded = (f: Fn, k: number, len: number): boolean => range(0, len - 1).every((x) => f(x) < 2 ** k)
  assert.ok(s.some(({ f, k, len }) => bounded(f, k, len)))
  holdsAndMutantFails(s,
    ({ f, k, len }) => implies(bounded(f, k, len), collides(f, 2 ** k)),
    ({ f, k, len }) => implies(bounded(f, k, len), collides(f, 2 ** k - 1)))
})
