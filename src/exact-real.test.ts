// exact-real — each derived function held against an algorithm it does not share: π by the BBP series against Machin,
// ln 2 by 2·atanh(1/3) against its binary series, sin and cos by identities over their integer outputs and against an
// integer square root, the square root by an exact rational bracket, the integer logarithms by brute force.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toRational, toNumber, piFixed, ln2Fixed, sinCosFixed, log2Fixed, log2Real, sqrtReal, floorMulLn2, roundTrigDegrees, roundOverTwoPiSqrt, floorScaledLog, roundScaledLog } from './exact-real.js'

const B = 256n
const near = (a: bigint, b: bigint, units: bigint, what: string): void => { const d = a > b ? a - b : b - a; assert.ok(d <= units, `${what}: off by ${d} units of 2^−${B}`) }

test('π by Machin agrees with π by the Bailey–Borwein–Plouffe series', () => {
  let bbp = 0n
  for (let k = 0n; k < 80n; k++) {
    const s = (4n << (B + 8n)) / (8n * k + 1n) - (2n << (B + 8n)) / (8n * k + 4n) - (1n << (B + 8n)) / (8n * k + 5n) - (1n << (B + 8n)) / (8n * k + 6n)
    bbp += s >> (4n * k)
  }
  near(piFixed(B), bbp >> 8n, 4n, 'π')
})

test('ln 2 by its binary series agrees with 2·atanh(1/3)', () => {
  let s = 0n
  for (let k = 0n; k < 200n; k++) s += (1n << (B + 8n)) / ((2n * k + 1n) * 3n ** (2n * k + 1n))
  near(ln2Fixed(B), (2n * s) >> 8n, 4n, 'ln 2')
  for (const k of [1, 2, 3, 10, 1000, 123456789, 9007199254740991]) {
    const K = BigInt(k)
    assert.equal(floorMulLn2(k), Number((K * ((2n * s) >> 8n)) >> B), `⌊${k}·ln 2⌋`)
  }
  assert.equal(floorMulLn2(0), 0)
})

test('sin and cos of whole degrees: the pinned values, their identities, and √½ by an integer root', () => {
  const sin = (d: number): number => roundTrigDegrees('sin', d, 1000)
  const cos = (d: number): number => roundTrigDegrees('cos', d, 1000)
  assert.deepEqual([sin(0), sin(30), sin(90), sin(180), sin(270), cos(0), cos(60), cos(90), cos(180)], [0, 500, 1000, 0, -1000, 1000, 500, 0, -1000])
  for (let d = 0; d <= 360; d++) {
    assert.equal(sin(180 - d), sin(d), `sin(180−${d}) = sin ${d}`)
    assert.equal(cos(d), sin(90 - d), `cos ${d} = sin(90−${d})`)
    assert.equal(sin(-d), -sin(d) + 0, `sin(−${d}) = −sin ${d}`)
  }
  // round(1000 · √½) = round(√500000): 707² = 499849 ≤ 500000 < 708² and 707.5² = 500556.25 > 500000
  assert.equal(sin(45), 707)
  const [s, c] = sinCosFixed(piFixed(B) / 6n, B)
  near(s, 1n << (B - 1n), 8n, 'sin π/6 = ½')
  near((s * s + c * c) >> B, 1n << B, 8n, 'sin² + cos² = 1')
})

test('log₂ of a rational, by squaring: exact at powers of two, and 2^(log₂ 3) returns 3', () => {
  assert.equal(log2Real(8), 3); assert.equal(log2Real(0.25), -2); assert.equal(log2Real(1), 0)
  const l3 = log2Fixed(3n, 1n, B)
  // 2^l3 = 3 ⇔ 3 = 2^1 · 2^(l3 − 1); check by raising the fractional part through repeated squaring in reverse:
  // here as a bracket — 2^(l3/2^B) lies within one unit of 3 when 3^(2^m) ≈ 2^(l3·2^m/2^B) for a small m
  const m = 16n
  const lhs = 3n ** (1n << m)
  const exp = (l3 << m) >> B                       // ⌊log₂(3^(2^m))⌋
  assert.ok(1n << exp <= lhs && lhs < 1n << (exp + 2n), '2^⌊2^16·log₂ 3⌋ brackets 3^(2^16)')
  assert.equal(log2Real(0), -Infinity); assert.ok(Number.isNaN(log2Real(-1)))
})

test('the square root is correctly rounded: the exact root lies within half a unit of the answer', () => {
  const xs = [2, 3, 5, 10, 0.5, 1e-300, 5e-324, 1.7976931348623157e308, 12345.678, 0.1]
  for (let i = 1; i <= 2000; i++) xs.push(i, i / 7)
  for (const x of xs) {
    const r = sqrtReal(x)
    const [rn, rd] = toRational(r)
    const [xn, xd] = toRational(x)
    // half an ulp of r: ulp is 2^(exponent − 52), read from the rational's denominator and numerator size
    const [un, ud] = toRational(r === 0 ? 5e-324 : ulpOf(r))
    // (r − u/2)² ≤ x ≤ (r + u/2)², all as exact rationals over a common denominator
    const lo = (2n * rn * ud - un * rd), hi = (2n * rn * ud + un * rd), den = 2n * rd * ud
    assert.ok(lo * lo * xd <= xn * den * den && xn * den * den <= hi * hi * xd, `√${x} → ${r}`)
  }
  assert.equal(sqrtReal(4), 2); assert.equal(sqrtReal(0), 0); assert.ok(Number.isNaN(sqrtReal(-1)))
})

/** the gap between r and the next double up, for r > 0 */
function ulpOf(r: number): number {
  const v = new DataView(new ArrayBuffer(8)); v.setFloat64(0, r)
  v.setBigUint64(0, v.getBigUint64(0) + 1n)
  return v.getFloat64(0) - r
}

test('the integer logarithms are decided as integer inequalities, and the resonance pins hold', () => {
  for (const [base, n, d, s] of [[10, 1000, 1, 10], [10, 999, 1, 10], [10, 1, 1000, 10], [2, 3, 2, 1200], [2, 2, 1, 1200], [2, 6, 1, 13], [10, 7, 3, 3]] as const) {
    const k = floorScaledLog(base, n, d, s)
    const N = BigInt(n) ** BigInt(s), D = BigInt(d) ** BigInt(s), Bb = BigInt(base), K = BigInt(k)
    const fits = (j: bigint): boolean => (j >= 0n ? Bb ** j * D <= N : D <= N * Bb ** -j)
    assert.ok(fits(K) && !fits(K + 1n), `⌊${s}·log_${base}(${n}/${d})⌋ = ${k}`)
  }
  assert.equal(floorScaledLog(10, 1000, 1, 10), 30, 'decibel(1000, 1) = 30')
  assert.equal(roundScaledLog(2, 3, 2, 1200), 702, 'a just fifth is 702 cents')
  assert.equal(roundScaledLog(2, 2, 1, 1200), 1200, 'an octave is 1200 cents')
  assert.equal(78 + roundScaledLog(2, 6, 1, 13), 112, 'a 13-body chart: 6·13 + round(13·log₂ 6)')
  assert.equal(roundOverTwoPiSqrt(1000000, 100 * 1000), 503, '100 µH with 1000 pF resonates near 503 kHz')
  // the round trip through a dyadic rational is exact, subnormals and signs included
  for (const x of [1, -1, 0.1, -2.5e-310, 5e-324, 1.7976931348623157e308, 3.141592653589793]) {
    const [n, d] = toRational(x)
    // d is a power of two, so n / d is n divided by 2^(bit length − 1) — exactly what toNumber does in exact steps
    assert.ok((d & (d - 1n)) === 0n, `toRational(${x}): the denominator is a power of two`)
    assert.ok(Object.is(toNumber(n, BigInt(d.toString(2).length - 1)), x), `toRational(${x}) round-trips`)
  }
})
