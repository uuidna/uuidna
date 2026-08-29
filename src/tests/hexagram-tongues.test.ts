// hexagram-tongues — Fu Xi width 6 closes Glagolitic ℤ/9 and Pliska ℤ/7, and strides differently in each.
// Independent JS recomputes the sealed CRT facts; a mutated width or modulus must fail the same checker.
// No King Wen names as keys. Meaning stays null.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { HEXAGRAM_BITS, HEXAGRAM_STATES } from '../hexagram.js'
import { theoremByKey } from '../theorems/index.js'

const MYTH_KEY = /sephirot|chakra|^iching_/i
const from0 = (n: number): number[] => Array.from({ length: n }, (_, i) => i)
const gcd = (a: number, b: number): number => { let x = a, y = b; while (y) { const t = x % y; x = y; y = t } return x }
const unitsOf = (n: number): number[] => from0(n).filter((a) => a > 0 && gcd(a, n) === 1)

const closesBoth = (width: number, seven: number, nine: number): boolean => {
  let pow = 1
  for (let i = 0; i < width; i++) pow = pow * 2
  return pow === 64
    && pow % nine === 1
    && pow % seven === 1
    && gcd(seven, nine) === 1
    && seven * nine === 63
    && 63 === pow - 1
    && unitsOf(nine).length === 6
    && unitsOf(seven).length === 6
}

const strideOf = (width: number, rays: number, letters: number): boolean =>
  gcd(width, rays) === 1
  && gcd(width, letters) === 3
  && new Set(from0(rays).map((k) => (k * width) % rays)).size === rays
  && new Set(from0(letters).map((k) => (k * width) % letters)).size === 3

test('hexagram_width_closes_rosetta_and_glagolitic — 2^6 returns on both rings; a five-line gate must fail', () => {
  assert.equal(HEXAGRAM_BITS, 6)
  assert.equal(HEXAGRAM_STATES, 64)
  assert.equal(closesBoth(6, 7, 9), true, 'Fu Xi width closes ℤ/7 and ℤ/9')
  assert.equal(closesBoth(5, 7, 9), false, 'five lines do not close either ring at 64')
  assert.equal(closesBoth(6, 8, 9), false, 'eight rays are not the rosette')
  const t = theoremByKey().get('hexagram_width_closes_rosetta_and_glagolitic')
  assert.ok(t, 'the kernel holds the conjunction, not a comment')
  assert.equal(t.file, 'Crt.lean')
  assert.doesNotMatch(t.key, MYTH_KEY)
  assert.doesNotMatch(t.statement, MYTH_KEY)
})

test('hexagram_stride_totals_the_rosetta — gcd(6,7)=1 totals the rays; gcd(6,9)=3 partitions Glagolitic', () => {
  assert.equal(strideOf(6, 7, 9), true, 'hexagram pace generates every ray and three letter-orbits')
  assert.equal(strideOf(6, 8, 9), false, 'eight is not seven — the walk is no longer total')
  assert.equal(strideOf(2, 7, 9), false, 'stride 2 is coprime to 9, so Glagolitic would be total, not three orbits')
  const t = theoremByKey().get('hexagram_stride_totals_the_rosetta')
  assert.ok(t, 'the dimensional split is a sealed theorem')
  assert.equal(t.file, 'Crt.lean')
  assert.doesNotMatch(t.key, MYTH_KEY)
  assert.doesNotMatch(t.statement, MYTH_KEY)
})
