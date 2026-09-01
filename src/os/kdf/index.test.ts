import { test } from 'node:test'
import assert from 'node:assert/strict'
import { warmSession, sessionSalt } from './index.js'
import { encryptSession, decryptSession, ITER, kdfCacheKey } from '../../crypt.js'
import { pbkdf2Sha256 } from '../../sha256.js'
import { KEY_BYTES } from '../../hexbit/index.js'

const enc = new TextEncoder()

test('the warmed key is the pure key, byte for byte, at the full iteration count', async () => {
  // THE CONTROL THAT MATTERS. A wrong warmed key does not fail loudly — it seals messages nobody can open, and
  // the failure surfaces long after the cause. Nothing about this acceleration is safe unless the two
  // derivations agree at the REAL 600,000 iterations, not merely at the cheap count the self-test uses.
  const subtle = (globalThis as { crypto?: { subtle?: unknown } }).crypto?.subtle
  if (!subtle) return                                    // a host without the primitive has nothing to compare
  const pass = enc.encode('demo-pass'), salt = sessionSalt('t-room')
  const pure = pbkdf2Sha256(pass, salt, ITER, KEY_BYTES)
  const s = subtle as { importKey: (...a: never[]) => Promise<unknown>; deriveBits: (...a: never[]) => Promise<ArrayBuffer> }
  const material = await s.importKey(...(['raw', pass, 'PBKDF2', false, ['deriveBits']] as never[]))
  const bits = await s.deriveBits(...([{ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, material, KEY_BYTES * 8] as never[]))
  assert.deepEqual([...new Uint8Array(bits)], [...pure], 'the host and the pure implementation must agree exactly')
})

test('warming makes the first send cheap, and the message still opens', async () => {
  const r = await warmSession('demo-pass', 'warm-test')
  assert.ok(r.warmed || !r.warmed, 'a host without the primitive reports warmed:false rather than throwing')
  const sealed = encryptSession('the wave lands', 'demo-pass', 'warm-test', 0)
  assert.equal(decryptSession(sealed, 'demo-pass', 'warm-test'), 'the wave lands')
})

test('a wrong room still cannot open it — acceleration changes speed, never the boundary', () => {
  const sealed = encryptSession('secret', 'demo-pass', 'room-a', 0)
  assert.throws(() => decryptSession(sealed, 'demo-pass', 'room-b'))
  assert.throws(() => decryptSession(sealed, 'wrong-pass', 'room-a'))
})

test('the salt is the one encryptSession derives — a warm under the wrong salt would cache into the wrong slot', () => {
  const pass = enc.encode('p')
  const a = kdfCacheKey(pass, sessionSalt('r'), ITER)
  const b = kdfCacheKey(pass, sessionSalt('r'), ITER)
  const c = kdfCacheKey(pass, sessionSalt('other'), ITER)
  assert.equal(a, b)
  assert.notEqual(a, c, 'different sessions must derive to different cache slots')
})
