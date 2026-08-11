// pq — the honest security posture, on trial. cryptoAddress (SHA-256) is anchored to the KAT-verified sha256
// primitive; the envelope is shown to be symmetric-only (nothing for Shor) with a 256-bit key (Grover → ~128-bit).
// These are what the crypt layer CAN claim — meets the standard, honestly labelled. Not "exceeds" anything.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { encrypt, decrypt, cryptoAddress, toUuid, sha256, pbkdf2Sha256, type Sealed } from '../index.js'

const enc = new TextEncoder()
const toh = (u: Uint8Array): string => [...u].map((b) => b.toString(16).padStart(2, '0')).join('')

test('cryptoAddress is the first 128 bits of SHA-256("uuidna:"+seed), v8-formatted (anchored to the sha256 KAT)', () => {
  const seed = 'abc'
  const a = cryptoAddress(seed)
  assert.match(a, /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) // v8 version + RFC variant
  const h = toh(sha256(enc.encode('uuidna:' + seed))).slice(0, 32) // first 128 bits of the KAT-verified primitive
  const bytes = a.replace(/-/g, '')
  assert.equal(bytes.slice(0, 12), h.slice(0, 12))   // bytes 0–5 are the hash, untouched
  assert.equal(bytes.slice(14, 16), h.slice(14, 16)) // byte 7 is the hash (byte 6 holds the version nibble)
  assert.equal(bytes.slice(18), h.slice(18))         // bytes 9–15 are the hash (byte 8 holds the variant)
})

test('cryptoAddress is deterministic and distinct from the FNV toUuid', () => {
  assert.equal(cryptoAddress('x'), cryptoAddress('x'))
  assert.notEqual(cryptoAddress('a'), cryptoAddress('b'))
  assert.notEqual(cryptoAddress('x'), toUuid('x')) // SHA-256 address ≠ the fast non-crypto FNV address
})

test('the envelope is SYMMETRIC-ONLY — no asymmetric field for Shor to break', () => {
  const s: Sealed = encrypt('m', 'p')
  assert.equal(s.alg, 'ChaCha20-Poly1305')
  assert.equal(s.kdf, 'PBKDF2-SHA256')
  const o = s as unknown as Record<string, unknown>
  for (const k of ['publicKey', 'signature', 'rsa', 'ecdh', 'privateKey']) assert.ok(!(k in o), `no ${k} on the envelope`)
})

test('the derived key is 256-bit — Grover only halves it to ~128-bit', () => {
  assert.equal(pbkdf2Sha256(enc.encode('p'), enc.encode('salt'), 1, 32).length, 32) // 32 bytes = 256 bits
})

test('the SHA-256 KDF-cache rekey did not change behavior — decrypt still round-trips, wrong key still fails', () => {
  assert.equal(decrypt(encrypt('secret message', 'passphrase'), 'passphrase'), 'secret message')
  assert.throws(() => decrypt(encrypt('x', 'right'), 'wrong'))
})
