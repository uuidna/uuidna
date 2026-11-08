import { test } from 'node:test'
import assert from 'node:assert/strict'
import { witnessOf, constructedSemiprimeOf, isProbablePrime } from './witness.js'

test('the witness check holds only for a nontrivial factorization of N', () => {
  assert.equal(witnessOf(3233n, 53n, 61n).holds, true)
  assert.equal(witnessOf(3233n, 53n, 60n).holds, false)
  assert.equal(witnessOf(3233n, 1n, 3233n).holds, false)
  assert.equal(witnessOf(3233n, 3233n, 1n).holds, false)
})

test('the constructed instance is a 1000-bit semiprime with two 500-bit factors that multiply back to N', () => {
  const c = constructedSemiprimeOf()
  const p = BigInt(c.p)
  const q = BigInt(c.q)
  assert.equal(c.bits, 1000)
  assert.equal(p.toString(2).length, 500)
  assert.equal(q.toString(2).length, 500)
  assert.equal(p * q, BigInt(c.n))
  assert.equal(c.holds, true)
})

test('the factors of the constructed instance pass the primality test', () => {
  const c = constructedSemiprimeOf()
  assert.equal(isProbablePrime(BigInt(c.p)), true)
  assert.equal(isProbablePrime(BigInt(c.q)), true)
})

test('the primality test rejects composites and known primes classify correctly', () => {
  assert.equal(isProbablePrime(91n), false)
  assert.equal(isProbablePrime(97n), true)
  assert.equal(isProbablePrime(3233n), false)
})
