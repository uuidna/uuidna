// Cycles tests — the number theory behind the rotations and the pentagram / Fibonacci-digit theorems, recomputed
// against the exact values the sealed lean/*.lean facts prove. Integrity.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { gcdInt, coprime, starPolygon, fibonacciCycle, rotate, crt } from '../index.js'

test('gcd / coprime', () => {
  assert.equal(gcdInt(2, 5), 1)
  assert.equal(gcdInt(9, 6), 3)
  assert.equal(gcdInt(-12, 8), 4) // handles negatives without a host abs
  assert.equal(coprime(3, 7), true) // trinity_rosette_coprime
  assert.equal(coprime(9, 6), false)
})

test('star polygon {5/2} is the pentagram — one stroke over all five (pentagram_single_stroke)', () => {
  const p = starPolygon(5, 2)
  assert.deepEqual(p.stroke, [0, 2, 4, 1, 3])
  assert.equal(p.single, true)
  assert.equal(p.loops, 1)
})

test('star polygon splits when the step shares a factor', () => {
  const hexagram = starPolygon(6, 2) // gcd(2,6)=2 → two triangles
  assert.equal(hexagram.single, false)
  assert.equal(hexagram.loops, 2)
  assert.equal(starPolygon(7, 3).single, true) // gcd(3,7)=1 — the codon frame through the rosette
})

test('single-digit Fibonacci Pisano periods: 9→24, 5→20, 7→16', () => {
  const f9 = fibonacciCycle(9)
  assert.equal(f9.period, 24) // fib_single_digit_cycle_24
  assert.deepEqual(f9.cycle.slice(0, 6), [0, 1, 1, 2, 3, 5])
  assert.equal(fibonacciCycle(5).period, 20) // pentagram
  assert.equal(fibonacciCycle(7).period, 16) // rosette
})

test('rotate reports the strand structure — coprime stride is one closed cover', () => {
  const seven = [0, 1, 2, 3, 4, 5, 6]
  assert.deepEqual(rotate(seven, 1).strands, 1)
  assert.equal(rotate(seven, 3).covers, true) // gcd(3,7)=1 → single strand
  const r = rotate([0, 1, 2, 3, 4, 5], 2) // gcd(2,6)=2 → 2 strands of 3
  assert.equal(r.strands, 2)
  assert.equal(r.strandLength, 3)
  assert.equal(r.covers, false)
})

test('CRT fuses coprime moduli — ℤ/21 ≅ ℤ/3 × ℤ/7', () => {
  const s = crt(0, 3, 1, 7) // x ≡ 0 (mod 3), x ≡ 1 (mod 7)
  assert.equal(s.mod, 21)
  assert.equal(s.x % 3, 0)
  assert.equal(s.x % 7, 1)
  assert.equal(s.x, 15)
  assert.throws(() => crt(1, 3, 2, 6), /coprime/) // gcd(3,6)≠1
})
