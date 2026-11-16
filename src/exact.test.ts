// exact — every helper held against an oracle that shares none of its code: BigInt integer arithmetic, walked over a
// grid of signs and magnitudes, and the largest safe integers where floating-point division stops being exact.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { quot, ceilQuot, roundQuot, truncQuot, floorOf, ceilOf, roundOf, truncOf, maxOf, minOf, absOf, ilog2, ilog10, isqrt, ipow, clog2, productExceedsPow2 } from './exact.js'

/** the floor quotient over BigInt, which divides toward zero */
const bigFloor = (n: bigint, d: bigint): bigint => { const q = n / d; return (n % d !== 0n && (n < 0n) !== (d < 0n)) ? q - 1n : q }

test('quot, ceilQuot, roundQuot and truncQuot are the integer quotients, at every sign', () => {
  for (let n = -60; n <= 60; n++) for (let d = -13; d <= 13; d++) {
    if (d === 0) continue
    const N = BigInt(n), D = BigInt(d)
    // BigInt has no −0, so the grid compares by value (=== treats ±0 as equal); the signs of zero are pinned below
    const same = (a: number, b: bigint, what: string): void => assert.ok(a === Number(b), `${what}: ${a} vs ${b}`)
    same(quot(n, d), bigFloor(N, D), `⌊${n}/${d}⌋`)
    same(ceilQuot(n, d), -bigFloor(-N, D), `⌈${n}/${d}⌉`)
    same(roundQuot(n, d), bigFloor(2n * N + D, 2n * D), `round(${n}/${d})`)
    same(truncQuot(n, d), N / D, `trunc(${n}/${d})`)
  }
})

test('a zero quotient carries the sign the host gives it, so strict comparisons read the same', () => {
  assert.ok(Object.is(quot(-12, -13), 0), '⌊0.92⌋ is +0')
  assert.ok(Object.is(quot(12, 13), 0), '⌊0.92⌋ is +0')
  assert.ok(Object.is(quot(0, -5), -0), '⌊−0⌋ is −0')
  assert.ok(Object.is(ceilOf(-0.1), -0), '⌈−0.1⌉ is −0')
  assert.ok(Object.is(ceilQuot(-12, 13), -0), '⌈−0.92⌉ is −0')
  assert.ok(Object.is(roundQuot(-4, 10), -0), 'round(−0.4) is −0'); assert.ok(Object.is(roundOf(-0.4), -0))
  assert.ok(Object.is(roundQuot(4, 10), 0), 'round(0.4) is +0')
  assert.ok(Object.is(truncQuot(-4, 10), -0), 'trunc(−0.4) is −0'); assert.ok(Object.is(truncOf(-0.4), -0))
  assert.ok(Object.is(truncQuot(4, 10), 0), 'trunc(0.4) is +0')
})

test('quot stays exact where a floating-point quotient does not', () => {
  // 2^53 − 1 over 3: the double nearest to the true quotient rounds up across an integer, the remainder never does
  const n = Number.MAX_SAFE_INTEGER
  for (const d of [3, 7, 10, 1000, 999999937]) assert.equal(quot(n, d), Number(BigInt(n) / BigInt(d)), `⌊(2^53−1)/${d}⌋`)
  assert.equal(quot(5, 0), Infinity, 'a zero divisor answers as the host did, so the guard decides')
})

test('floorOf, ceilOf, roundOf and truncOf keep a fraction’s floor exactly', () => {
  const cases: [number, number, number, number, number][] = [
    [2.5, 2, 3, 3, 2], [-2.5, -3, -2, -2, -2], [0.1, 0, 1, 0, 0], [-0.1, -1, 0, 0, 0], [7, 7, 7, 7, 7], [-7, -7, -7, -7, -7],
  ]
  // by value: the signs of zero are pinned in their own test
  for (const [x, f, c, r, t] of cases) {
    assert.ok(floorOf(x) === f, `⌊${x}⌋`); assert.ok(ceilOf(x) === c, `⌈${x}⌉`)
    assert.ok(roundOf(x) === r, `round(${x})`); assert.ok(truncOf(x) === t, `trunc(${x})`)
  }
})

test('the extremes, the absolute value and the integer logarithms and roots', () => {
  assert.equal(maxOf(3, -1, 9, 2), 9); assert.equal(minOf(3, -1, 9, 2), -1)
  assert.equal(maxOf(), -Infinity); assert.ok(Number.isNaN(maxOf(1, NaN)))
  assert.equal(absOf(-4), 4); assert.equal(absOf(4), 4)
  for (let n = 1; n <= 5000; n++) {
    const bits = BigInt(n).toString(2).length
    assert.equal(ilog2(n), bits - 1, `⌊log₂ ${n}⌋`)
    assert.equal(clog2(n), (n & (n - 1)) === 0 ? bits - 1 : bits, `⌈log₂ ${n}⌉`)
    assert.equal(ilog10(n), String(n).length - 1, `⌊log₁₀ ${n}⌋`)
    const r = isqrt(n)
    assert.ok(r * r <= n && (r + 1) * (r + 1) > n, `⌊√${n}⌋ = ${r}`)
  }
  assert.equal(isqrt(Number.MAX_SAFE_INTEGER), 94906265, '⌊√(2^53 − 1)⌋')
  for (let b = 0; b <= 9; b++) for (let e = 0; e <= 12; e++) assert.equal(ipow(b, e), Number(BigInt(b) ** BigInt(e)), `${b}^${e}`)
  assert.equal(ipow(2, 52), 4503599627370496)
  // Σ log₂ p > k decided as Π p > 2^k: 3·5·7 = 105 > 64 = 2^6, and not > 128 = 2^7
  assert.equal(productExceedsPow2([3, 5, 7], 6), true); assert.equal(productExceedsPow2([3, 5, 7], 7), false)
  assert.equal(productExceedsPow2([2, 2, 2], 3), false, 'a product equal to the power is not greater')
})
