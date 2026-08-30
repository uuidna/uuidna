// crypto-bounds — THE REFUSALS, ISOLATED AS ITS OWN PROCESS. Proving that exactly MAX_LAYERS still round-trips costs
// one PBKDF2 derivation per layer (16 × ~1.8s ≈ 29s) and that is irreducible: it IS the boundary being proven. What
// is reducible is where it waits — measured at 29s it was the largest single unit in the crypto suite, so it runs
// beside the others rather than behind them. The work factor is never lowered to make a gate fast.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sealStream, openStream, MAX_LAYERS, encrypt, decrypt, ITER, MAX_ITER } from './index.js'

test('the refusals are bounded and fast: the layer count and a hostile work factor are both clamped', () => {
  // layers — 0 and > MAX are refused outright; exactly MAX_LAYERS is admitted and still round-trips
  assert.throws(() => sealStream('x', []))
  assert.throws(() => sealStream('x', new Array(MAX_LAYERS + 1).fill('k')))
  const keys = new Array(MAX_LAYERS).fill(0).map((_, i) => `layer-${i}`)
  assert.equal(openStream(sealStream('deep', keys).uuids, keys), 'deep')
  // iter — attacker-controlled on decrypt, so a hostile work factor is REFUSED
  const s = encrypt('beat to windward', 'gold-string-60')
  assert.equal(s.iter, ITER)
  assert.ok(ITER < MAX_ITER)
  assert.equal(decrypt(s, 'gold-string-60'), 'beat to windward')
  for (const bad of [1e12, MAX_ITER + 1, 0, -1, 1.5, Number.NaN, Infinity])
    assert.throws(() => decrypt({ ...s, iter: bad }, 'gold-string-60'), /refusing iter/, `iter=${bad} must be refused`)
})
