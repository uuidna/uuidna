// exact — INTEGER DIVISION, ROUNDING, EXTREMES AND INTEGER LOGARITHMS, DONE BY REMAINDER RATHER THAN BY THE HOST.
//
// The families state every value as Nat arithmetic — ⌊a · 100 / b⌋, ⌈n / d⌉, max(0, x − y) — and the families wing seals
// each witness when the method, the test and the formula agree. The methods computed those values through the host's
// floating-point routines, which the determinism scan rejects in every file: a quotient formed in floating point and
// then floored is the floor of a rounded number, exact only until the operands grow, and its correctness rests on the
// host rather than on the arithmetic. These are the same operations as Lean's Int `/` (the floor, for a positive
// divisor) and its `max`, `min`, written with `%`, `-` and an exact division of a multiple, so each answer is the
// integer the formula names for every safe integer, and a reader can check it without trusting a floating-point unit.
//
// A NON-INTEGER ARGUMENT STAYS AS IT WAS. floorOf(x) is quot(x, 1): for a finite double, x % 1 and x − (x % 1) are exact,
// so the floor of a fraction comes out exactly as the host's did. A zero divisor answers n / 0, as the host did, so a
// method's guard keeps deciding what a zero means.

/** quot(n, d) → ⌊n / d⌋: the floor quotient, by remainder. Lean's Int `/` for a positive divisor. */
export const quot = (n: number, d: number): number => {
  if (d === 0) return n / d
  const r = n % d
  const q = (n - r) / d
  const f = r !== 0 && (r < 0) !== (d < 0) ? q - 1 : q
  // a zero quotient carries the sign the host's floor gives it: −0 only for a zero numerator over a negative divisor,
  // so a value compared with Object.is (as strict assertions do) reads the same as before
  return f === 0 ? (n === 0 ? n / d : 0) : f
}

/** ceilQuot(n, d) → ⌈n / d⌉ = −⌊−n / d⌋ */
export const ceilQuot = (n: number, d: number): number => (d === 0 ? n / d : -quot(-n, d))

/** a zero result signed as the quotient it came from: the host's round and trunc of a negative fraction give −0 */
const signedZero = (z: number, n: number, d: number): number => (z !== 0 ? z : (n / d < 0 || Object.is(n / d, -0) ? -0 : 0))

/** roundQuot(n, d) → the nearest integer to n / d, a half rounding up: ⌊(2n + d) / 2d⌋, since n/d + 1/2 = (2n + d)/(2d) */
export const roundQuot = (n: number, d: number): number => (d === 0 ? n / d : signedZero(quot(2 * n + d, 2 * d), n, d))

/** truncQuot(n, d) → n / d with its fraction dropped toward zero */
export const truncQuot = (n: number, d: number): number => (d === 0 ? n / d : signedZero((n - (n % d)) / d, n, d))

/** floorOf(x) → ⌊x⌋ */
export const floorOf = (x: number): number => quot(x, 1)
/** ceilOf(x) → ⌈x⌉ */
export const ceilOf = (x: number): number => ceilQuot(x, 1)
/** roundOf(x) → the nearest integer to x, a half rounding up */
export const roundOf = (x: number): number => roundQuot(x, 1)
/** truncOf(x) → x with its fraction dropped toward zero */
export const truncOf = (x: number): number => truncQuot(x, 1)

/** maxOf(...xs) → the largest; NaN when any is NaN and −∞ for none, as the host answered */
export const maxOf = (...xs: number[]): number => {
  let m = -Infinity
  for (const x of xs) { if (x !== x) return x; if (x > m) m = x }
  return m
}
/** minOf(...xs) → the smallest; NaN when any is NaN and +∞ for none, as the host answered */
export const minOf = (...xs: number[]): number => {
  let m = Infinity
  for (const x of xs) { if (x !== x) return x; if (x < m) m = x }
  return m
}
/** absOf(x) → |x| */
export const absOf = (x: number): number => (x < 0 ? -x : x === 0 ? 0 : x)

/** ilog2(n) → ⌊log₂ n⌋ for an integer n ≥ 1, by halving; −∞ at 0 and NaN below, as the host's floor of its log did */
export const ilog2 = (n: number): number => {
  if (n === 0) return -Infinity
  if (!(n > 0)) return NaN
  let k = 0
  for (let v = floorOf(n); v >= 2; v = quot(v, 2)) k++
  return k
}
/** ilog10(n) → ⌊log₁₀ n⌋ for an integer n ≥ 1, by tenths; −∞ at 0 and NaN below */
export const ilog10 = (n: number): number => {
  if (n === 0) return -Infinity
  if (!(n > 0)) return NaN
  let k = 0
  for (let v = floorOf(n); v >= 10; v = quot(v, 10)) k++
  return k
}
/** ipow(b, e) → bᵉ for an integer exponent e ≥ 0, by repeated squaring on integers — exact while the result is a safe
 *  integer, where the host's power routine is only required to approximate */
export const ipow = (b: number, e: number): number => {
  let r = 1
  let x = b
  for (let k = e; k > 0; k = quot(k, 2)) { if (k % 2 === 1) r *= x; if (k > 1) x *= x }
  return r
}
/** clog2(n) → ⌈log₂ n⌉ for an integer n ≥ 1: the least k with 2ᵏ ≥ n; −∞ at 0 and NaN below, as the host's ceiling of its log */
export const clog2 = (n: number): number => {
  if (n === 0) return -Infinity
  if (!(n > 0)) return NaN
  let k = 0
  for (let p = 1; p < n; p *= 2) k++
  return k
}
/** productExceedsPow2(ps, k) → Σ log₂ p > k, decided as Π p > 2ᵏ over exact integers (BigInt), so no logarithm is rounded */
export const productExceedsPow2 = (ps: readonly number[], k: number): boolean =>
  ps.reduce((a, p) => a * BigInt(p), 1n) > 1n << BigInt(k)

/** isqrt(n) → ⌊√n⌋ for an integer n ≥ 0, by Newton's iteration on integers; NaN below zero */
export const isqrt = (n: number): number => {
  if (n < 0 || n !== n) return NaN
  const m = floorOf(n)
  if (m < 2) return m
  let x = m
  let y = quot(x + 1, 2)
  while (y < x) { x = y; y = quot(x + quot(m, x), 2) }
  return x
}
