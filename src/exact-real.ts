// exact-real — THE TRANSCENDENTAL FUNCTIONS, DERIVED FROM INTEGERS RATHER THAN BORROWED FROM THE HOST.
//
// IEEE 754 addition, subtraction, multiplication, division and square root are correctly rounded by specification, so
// every host returns the same bits for them. The host's sin, cos, log and pow are not: ECMAScript calls them
// implementation-approximated, and two engines may differ in the last place. A value a family seals must not depend
// on which engine computed it, so these are computed here from integers alone — π by Machin's formula, ln 2 by its
// binary series, sin and cos by their Taylor series after reduction, log₂ of a rational by repeated squaring — in
// BigInt fixed point with guard bits, and handed back through one correctly rounded step: Number(bigint) is the
// nearest double to the integer (ECMAScript's own definition), and dividing by a power of two is exact.
//
// AN INTEGER ANSWER IS DECIDED, NOT ROUNDED FROM A DOUBLE. Where a family floors or rounds a transcendental quantity,
// the answer is computed at a precision whose error bound is checked against the nearest rounding boundary, and the
// precision is raised until the bound clears it; the comparisons that need no transcendental at all (a decibel, a cent)
// are decided as exact integer inequalities between powers.
import { ipow } from './exact.js'

const one = (bits: bigint): bigint => 1n << bits
const bitLength = (n: bigint): bigint => (n <= 0n ? 0n : BigInt(n.toString(2).length))

/** toRational(x) → [n, d] with x = n / d exactly, d a power of two: a finite double is a dyadic rational */
export function toRational(x: number): [bigint, bigint] {
  if (!Number.isFinite(x)) throw new Error(`toRational: ${x} is not finite`)
  if (x === 0) return [0n, 1n]
  const view = new DataView(new ArrayBuffer(8))
  view.setFloat64(0, x)
  const hi = view.getUint32(0), lo = view.getUint32(4)
  const sign = hi >>> 31 ? -1n : 1n
  const exp = (hi >>> 20) & 0x7ff
  const frac = (BigInt(hi & 0xfffff) << 32n) | BigInt(lo)
  const mant = exp === 0 ? frac : frac | (1n << 52n)
  const e = BigInt(exp === 0 ? -1074 : exp - 1075)
  return e >= 0n ? [sign * (mant << e), 1n] : [sign * mant, 1n << -e]
}

/** toNumber(v, bits) → the double nearest v / 2^bits: one rounding in Number(v), then exact divisions by powers of two,
 *  taken in steps of 2^1000 so no divisor overflows */
export const toNumber = (v: bigint, bits: bigint): number => {
  let x = Number(v)
  for (let b = Number(bits); b > 0; b -= 1000) x /= ipow(2, b > 1000 ? 1000 : b)
  return x
}

/** atanInv(m, bits) → atan(1/m) · 2^bits, the alternating series Σ (−1)^k / ((2k+1) m^(2k+1)), truncated below 2^−bits */
const atanInv = (m: bigint, bits: bigint): bigint => {
  let sum = 0n
  let term = one(bits) / m
  const m2 = m * m
  for (let k = 0n; term !== 0n; k++) {
    sum += (k % 2n === 0n ? 1n : -1n) * (term / (2n * k + 1n))
    term /= m2
  }
  return sum
}

/** piFixed(bits) → π · 2^bits by Machin's formula π = 16·atan(1/5) − 4·atan(1/239), with 16 guard bits dropped */
export const piFixed = (bits: bigint): bigint => {
  const g = bits + 16n
  return (16n * atanInv(5n, g) - 4n * atanInv(239n, g)) >> 16n
}

/** ln2Fixed(bits) → ln 2 · 2^bits by the series ln 2 = Σ_{k≥1} 1 / (k · 2^k), with 16 guard bits dropped */
export const ln2Fixed = (bits: bigint): bigint => {
  const g = bits + 16n
  let sum = 0n
  for (let k = 1n; ; k++) { const t = one(g) / (k << k); if (t === 0n) break; sum += t }
  return sum >> 16n
}

/** sinCosFixed(x, bits) → [sin x, cos x] · 2^bits for x given as x · 2^bits, reduced to [−π, π] then summed by Taylor */
export const sinCosFixed = (x: bigint, bits: bigint): [bigint, bigint] => {
  const g = bits + 24n
  const pi = piFixed(g)
  let y = x << 24n
  const twoPi = 2n * pi
  y %= twoPi
  if (y > pi) y -= twoPi
  if (y < -pi) y += twoPi
  const y2 = (y * y) >> g
  let s = 0n, c = 0n
  let ts = y, tc = one(g)
  for (let k = 0n; ts !== 0n || tc !== 0n; k++) {
    s += ts; c += tc
    ts = -((ts * y2) >> g) / ((2n * k + 2n) * (2n * k + 3n))
    tc = -((tc * y2) >> g) / ((2n * k + 1n) * (2n * k + 2n))
  }
  return [s >> 24n, c >> 24n]
}

/** log2Fixed(n, d, bits) → log₂(n / d) · 2^bits for positive integers, the integer part by bit length and each further
 *  bit by squaring the normalised mantissa (the binary-digit algorithm) */
export const log2Fixed = (n: bigint, d: bigint, bits: bigint): bigint => {
  if (n <= 0n || d <= 0n) throw new Error('log2Fixed: non-positive argument')
  let ip = bitLength(n) - bitLength(d)
  // normalise n/d into [1, 2): y = n / (d · 2^ip), held with g fraction bits
  const g = bits + 16n
  let y = ip >= 0n ? (n << g) / (d << ip) : ((n << -ip) << g) / d
  if (y < one(g)) { y <<= 1n; ip -= 1n }
  if (y >= 2n * one(g)) { y >>= 1n; ip += 1n }
  let frac = 0n
  for (let i = 0n; i < bits; i++) {
    y = (y * y) >> g
    frac <<= 1n
    if (y >= 2n * one(g)) { y >>= 1n; frac |= 1n }
  }
  return (ip << bits) + frac
}

/** log2Real(x) → log₂ x for a positive finite double, to the nearest double */
export const log2Real = (x: number): number => {
  if (!(x > 0)) return x === 0 ? -Infinity : NaN
  const [n, d] = toRational(x)
  return toNumber(log2Fixed(n, d, 96n), 96n)
}

/** sqrtReal(x) → √x correctly rounded, as IEEE 754 defines it: the integer root of the exact rational with 64 extra bits,
 *  rounded to nearest — a square root of a dyadic rational is exact or irrational, so it never falls on a tie */
export const sqrtReal = (x: number): number => {
  if (x !== x || x < 0) return NaN
  if (x === 0 || x === Infinity) return x
  const [n, d] = toRational(x)   // d = 2^k
  const k = bitLength(d) - 1n
  // √(n / 2^k) = √(n · 2^(2B − k)) / 2^B, with 2B − k even and B large enough for 64 bits past the double's 53
  let B = 128n + k
  if ((2n * B - k) % 2n !== 0n) B += 1n
  const scaled = n << (2n * B - k)
  let r = 1n << ((bitLength(scaled) + 1n) / 2n)
  for (;;) { const nr = (r + scaled / r) >> 1n; if (nr >= r) break; r = nr }
  while (r * r > scaled) r -= 1n
  return toNumber(r, B)
}

/** decidedFloor(v, bits) → ⌊v / 2^bits⌋, or null when v lies within 2^(bits/2) units of an integer boundary. Every caller's
 *  error bound is far below that margin (at most 2^(bits/2 − 18) units at the precisions they start from), and the
 *  margin itself shrinks as the precision rises, so a value that is not exactly on a boundary is always decided. */
const decidedFloor = (v: bigint, bits: bigint): bigint | null => {
  const margin = one(bits / 2n)
  const frac = ((v % one(bits)) + one(bits)) % one(bits)
  if (frac < margin || one(bits) - frac < margin) return null
  return (v - frac) >> bits
}

/** ln2Real → ln 2 as the nearest double, derived from its series */
export const ln2Real: number = toNumber(ln2Fixed(96n), 96n)

/** floorMulLn2(k) → ⌊k · ln 2⌋ for an integer k ≥ 0, decided at a precision that clears the rounding boundary */
export const floorMulLn2 = (k: number): number => {
  if (k === 0) return 0
  const K = BigInt(k)
  for (let bits = bitLength(K) + 72n; ; bits += 64n) {
    const f = decidedFloor(K * ln2Fixed(bits), bits)
    if (f !== null) return Number(f)
  }
}

/** roundTrigDegrees(fn, degrees, scale) → round(fn(degrees · π / 180) · scale) for an integer degree count — sin or cos
 *  of a whole degree is rational only at 0, 30, 90 … where the scaled value is an integer, never a half */
export const roundTrigDegrees = (fn: 'sin' | 'cos', degrees: number, scale: number): number => {
  if (!Number.isFinite(degrees)) return NaN
  // a fractional degree count is an exact dyadic rational too: x = dₙ · π / (180 · d_d)
  const [dn, dd] = toRational(degrees)
  const S = BigInt(scale)
  for (let bits = 96n; ; bits += 64n) {
    const x = (dn * piFixed(bits)) / (180n * dd)
    const [s, c] = sinCosFixed(x, bits)
    // round(v) = ⌊v + 1/2⌋
    const f = decidedFloor((fn === 'sin' ? s : c) * S + one(bits - 1n), bits)
    if (f !== null) return Number(f)
  }
}

/** roundOverTwoPiSqrt(numer, p) → round(numer / (2π√p)) for positive integers — an LC circuit's resonance */
export const roundOverTwoPiSqrt = (numer: number, p: number): number => {
  // p = pₙ / p_d exactly, and numer / (2π √(pₙ/p_d)) = numer · p_d / (2π √(pₙ · p_d))
  const [pn, pd] = toRational(p)
  const N = BigInt(numer) * pd, P = pn * pd
  for (let bits = 96n; ; bits += 64n) {
    const pi = piFixed(bits)
    let s = 1n << ((bitLength(P << (2n * bits)) + 1n) / 2n)
    const sq = P << (2n * bits)
    for (;;) { const ns = (s + sq / s) >> 1n; if (ns >= s) break; s = ns }
    // y · 2^bits = numer · 2^(3·bits) / (2 · π·2^bits · √p·2^bits)
    const y = (N << (3n * bits)) / (2n * pi * s)
    const f = decidedFloor(y + one(bits - 1n), bits)
    if (f !== null) return Number(f)
  }
}

/** floorScaledLog(base, n, d, s) → ⌊s · log_base(n / d)⌋ for positive integers: the largest k with base^k · d^s ≤ n^s
 *  (and, for k < 0, d^s ≤ n^s · base^−k) — an exact integer inequality, so no logarithm is rounded */
export const floorScaledLog = (base: number, n: number, d: number, s: number): number => {
  // n and d may be any positive doubles: each is an exact dyadic rational, so n/d = (nₙ·d_d)/(n_d·dₙ) exactly
  const [nn, nd] = toRational(n), [dn, dd] = toRational(d)
  const S = BigInt(s)
  const B = BigInt(base), N = (nn * dd) ** S, D = (nd * dn) ** S
  const fits = (k: bigint): boolean => (k >= 0n ? B ** k * D <= N : D <= N * B ** -k)
  // the estimate: the bit-length difference over log₂ base, with log₂ base read from the bit length of base^64; it lands
  // within a few of the answer, and the walk below settles it exactly
  let k = ((bitLength(N) - bitLength(D)) * 64n) / bitLength(B ** 64n)
  while (fits(k + 1n)) k++
  while (!fits(k)) k--
  return Number(k)
}

/** roundScaledLog(base, n, d, s) → s · log_base(n / d) rounded to the nearest, a half up: ⌊(⌊2s · log⌋ + 1) / 2⌋ */
export const roundScaledLog = (base: number, n: number, d: number, s: number): number => {
  const f = floorScaledLog(base, n, d, 2 * s)
  return (f + 1 - (((f + 1) % 2) + 2) % 2) / 2
}
