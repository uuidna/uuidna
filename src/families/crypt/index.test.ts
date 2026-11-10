import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { verifyHex } from '../verify.js'
import { CryptFormulas } from './index.js'
import '../../mcp/families.js'

/** THE INTERNAL CRYPTO, AS FORMULAS. knownAnswers checks the unit's own SHA-256/512, MD5, x25519 and ed25519 against
 *  the published RFC vectors — all pass, so the crypto the QPU computes is the standard one, taken from nothing
 *  outside. The security bits are the exact cryptanalysis: Grover halves a symmetric key's exponent, Pollard rho
 *  halves a curve's, Shor takes a curve to zero; Poly1305 / nonce / AEAD tag / hash birthday are the RFC bounds. */
test('crypt: the RFC vectors pass and the security bits are the exact cryptanalysis', async (t) => {
  assert.equal(CryptFormulas.knownAnswers().value, 1, 'every RFC vector passes: sha256/512, md5, x25519, ed25519')
  assert.equal(CryptFormulas.knownAnswers().holds, true)
  assert.equal(CryptFormulas.symmetricQuantumBits(256).value, 128, 'AES-256 keeps 128 bits against Grover')
  assert.equal(CryptFormulas.symmetricQuantumBits(128).value, 64)
  assert.equal(CryptFormulas.symmetricQuantumBits(0).holds, false, 'a key has bits')
  assert.equal(CryptFormulas.curveClassicalBits(256).value, 128, 'Pollard rho: the square root of the group order')
  assert.equal(CryptFormulas.curveQuantumBits(256).value, 0, "Shor's period finding recovers the discrete log")
  assert.equal(CryptFormulas.tagForgery(16).value, (8 * 1) / 2 ** 106, 'the RFC 8439 single-attempt Poly1305 forgery bound')
  assert.ok(CryptFormulas.tagForgery(16).value < 1e-30, 'and it is negligible')
  assert.equal(CryptFormulas.nonceCollision(0).value, 0, 'no messages, no collision')
  assert.equal(CryptFormulas.nonceCollision(2 ** 48).value, 2 ** 96 / 2 ** 97, 'the 96-bit birthday bound at 2^48 messages is 1/2')
  assert.equal(CryptFormulas.aeadTagBits().value, 128, 'ChaCha20-Poly1305 tag is 128 bits')
  assert.equal(CryptFormulas.aeadTagBits().holds, true)
  assert.equal(CryptFormulas.hashCollisionBits(256).value, 128, 'SHA-256 birthday is 128 bits')
  assert.equal(CryptFormulas.hashCollisionBits(0).holds, false)
  assert.equal(CryptFormulas.symmetricQuantumBits(256).dst, 'crypt')
  assert.equal(CryptFormulas.curveClassicalBits(256).dst, 'enterprise')
  await verifyHex('crypt', 8, [
    ['knownAnswers', [], 1],
    ['symmetricQuantumBits', [256], 128],
    ['curveClassicalBits', [256], 128],
    ['curveQuantumBits', [256], 0],
    ['aeadTagBits', [], 128],
    ['hashCollisionBits', [256], 128],
  ])
  t.diagnostic('8 formulas; RFC vectors 6/6 pass; AES-256 → 128 (Grover), curve 256 → 128 (rho) → 0 (Shor); AEAD tag 128; hash birthday 128; Poly1305 and nonce bounds exact')
})
