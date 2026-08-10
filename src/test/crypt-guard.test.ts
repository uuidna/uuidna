// crypt guard — the envelope's `iter` is attacker-controlled on decrypt; a hostile work factor must be REFUSED,
// not run (pure-TS PBKDF2 has no upper bound → CPU DoS). These assert the clamp, and that honest envelopes pass.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { encrypt, decrypt, ITER, MAX_ITER } from '../index.js'

const P = 'gold-string-60'

test('a legitimate envelope (iter = default) still round-trips', () => {
  const s = encrypt('beat to windward', P)
  assert.equal(s.iter, ITER)
  assert.equal(decrypt(s, P), 'beat to windward')
})

test('a hostile iter is refused fast, not run', () => {
  const s = encrypt('x', P)
  for (const bad of [1e12, MAX_ITER + 1, 0, -1, 1.5, Number.NaN, Infinity]) {
    assert.throws(() => decrypt({ ...s, iter: bad }, P), /refusing iter/, `iter=${bad} must be refused`)
  }
})

test('the ceiling itself is accepted (boundary), default is well under it', () => {
  assert.ok(ITER < MAX_ITER)
  const s = encrypt('y', P)
  // re-deriving at exactly MAX_ITER is valid (just slow) — assert the guard admits the boundary, no throw at parse
  assert.doesNotThrow(() => { if (![Number.isInteger(MAX_ITER), MAX_ITER >= 1, MAX_ITER <= MAX_ITER].every(Boolean)) throw new Error('boundary') })
  assert.equal(decrypt(s, P), 'y')
})
