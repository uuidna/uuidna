import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { SignalFormulas as S } from './index.js'
import '../../mcp/families.js'

/** THE SIGNALLING FORMULAS, EXACT. The BB84 key generation is random, but the registered formulas are the arithmetic
 *  around it: a keyspace of 2^bits, the sifted half (raw/2, Bob guesses the basis right half the time), the key that
 *  survives disclosure (3·raw/8), the route length as a Hamming distance on the hypercube, and the detection chance
 *  that k disclosed checks catch an intercept — 0 at no checks and rising toward one. Deterministic; crossing qsec to
 *  the domain each names. */
test('signal: keyspace, sifting, routing and detection — the exact arithmetic around BB84', async (t) => {
  assert.equal(S.keyspace(10).value, 1024, '2^bits: every key bit doubles the search')
  assert.equal(S.keyspace(0).value, 1)
  assert.equal(S.keyBits(8).value, 3, '3·raw/8 survives disclosure')
  assert.equal(S.keyBits(80).value, 30)
  assert.equal(S.siftedBits(100).value, 50, 'raw/2: Bob guesses the basis right half the time')
  assert.equal(S.hops(4, 5, 3).value, 2, 'popcount(5 xor 3) = popcount(6) = 2: two coordinates differ')
  assert.equal(S.hops(8, 0, 255).value, 8, 'opposite corners of the 8-cube: 8 hops')
  assert.equal(S.detection(0).value, 0, 'no checks catch nothing')
  assert.ok(S.detection(7).value > S.detection(3).value && S.detection(7).value < 1, 'more disclosed checks catch more, approaching one')
  assert.equal(S.keyspace(10).dst, 'enterprise')
  assert.equal(S.hops(4, 5, 3).dst, 'route')
  await verifyHex('signal', 6, [['keyspace', [10], 1024], ['keyBits', [8], 3], ['siftedBits', [100], 50], ['hops', [4, 5, 3], 2]])
  t.diagnostic('6 formulas; keyspace 2^bits (OEIS A000079), sifted raw/2, key 3·raw/8, hops = Hamming distance, detection 0 → 1 with checks')
})
