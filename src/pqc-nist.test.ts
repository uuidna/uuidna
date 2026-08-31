// pqc-nist — ML-KEM, ML-DSA, SLH-DSA, hybrid KEM presets (vendored noble pure-TS).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  kem768Keygen, kem768Encapsulate, kem768Decapsulate,
  dsa65Keygen, dsa65Sign, dsa65Verify,
  slhDsa128sKeygen, slhDsa128sSign, slhDsa128sVerify,
  hybridKem768P256, hybridKem1024P384, ed25519Signer,
} from './pqc/index.js'

test('ML-KEM-768 keygen + encaps + decaps round-trip', () => {
  const { publicKey, secretKey } = kem768Keygen()
  const { cipherText, sharedSecret } = kem768Encapsulate(publicKey)
  const opened = kem768Decapsulate(cipherText, secretKey)
  assert.deepEqual([...opened], [...sharedSecret])
})

test('ML-KEM-768 deterministic keygen from 64-byte seed', () => {
  const seed = Uint8Array.from({ length: 64 }, (_, i) => i + 1)
  const a = kem768Keygen(seed)
  const b = kem768Keygen(seed)
  assert.deepEqual([...a.publicKey], [...b.publicKey])
  assert.deepEqual([...a.secretKey], [...b.secretKey])
})

test('ML-KEM-768 decapsulate tolerates ciphertext tamper (implicit rejection)', () => {
  const { publicKey, secretKey } = kem768Keygen()
  const { cipherText, sharedSecret } = kem768Encapsulate(publicKey)
  const bad = Uint8Array.from(cipherText)
  bad[0] ^= 1
  const rejected = kem768Decapsulate(bad, secretKey)
  assert.notDeepEqual([...rejected], [...sharedSecret])
})

test('ML-DSA-65 sign + verify round-trip', () => {
  const { publicKey, secretKey } = dsa65Keygen()
  const msg = new TextEncoder().encode('uuidna-pqc-desk')
  const sig = dsa65Sign(msg, secretKey)
  assert.equal(dsa65Verify(sig, msg, publicKey), true)
})

test('ML-DSA-65 verify rejects tampered message', () => {
  const { publicKey, secretKey } = dsa65Keygen()
  const msg = new TextEncoder().encode('original')
  const sig = dsa65Sign(msg, secretKey)
  const bad = new TextEncoder().encode('tampered')
  assert.equal(dsa65Verify(sig, bad, publicKey), false)
})

test('SLH-DSA-SHA2-128s sign + verify round-trip', () => {
  const { publicKey, secretKey } = slhDsa128sKeygen()
  const msg = new TextEncoder().encode('slh-dsa-desk')
  const sig = slhDsa128sSign(msg, secretKey)
  assert.equal(slhDsa128sVerify(sig, msg, publicKey), true)
})

test('hybridKem768P256 encaps/decaps round-trip', () => {
  const kem = hybridKem768P256
  const { publicKey, secretKey } = kem.keygen()
  const { cipherText, sharedSecret } = kem.encapsulate(publicKey)
  const opened = kem.decapsulate(cipherText, secretKey)
  assert.deepEqual([...opened], [...sharedSecret])
})

test('hybridKem1024P384 encaps/decaps round-trip', () => {
  const kem = hybridKem1024P384
  const { publicKey, secretKey } = kem.keygen()
  const { cipherText, sharedSecret } = kem.encapsulate(publicKey)
  const opened = kem.decapsulate(cipherText, secretKey)
  assert.deepEqual([...opened], [...sharedSecret])
})

test('ed25519Signer sign + verify round-trip', () => {
  const { publicKey, secretKey } = ed25519Signer.keygen()
  const msg = new TextEncoder().encode('ed25519-hybrid')
  const sig = ed25519Signer.sign(msg, secretKey)
  assert.equal(ed25519Signer.verify(sig, msg, publicKey), true)
})
