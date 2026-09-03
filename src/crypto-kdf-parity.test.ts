// crypto-kdf-parity — THE TWO KDF PATHS ARE ONE FUNCTION, and this is where that is checked rather than trusted.
//
// deriveKey runs PBKDF2-HMAC-SHA256 on the host's C implementation when the runtime has one, and on ./sha256's
// pure TS otherwise. That is only sound because PBKDF2 is a STANDARD: one (pass, salt, iter, dkLen) has exactly
// one correct answer, so the two paths are the same function at different speeds. If that ever stopped being
// true, every envelope sealed on one path would refuse to open on the other — a silent, total, unrecoverable
// break. So it is pinned three ways: against PUBLISHED VECTORS neither implementation authored, against each
// other, and end-to-end through a real seal.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { deriveKeyPure, kdfInstrument, encrypt, decrypt } from './index.js'

const enc = (s: string): Uint8Array => new TextEncoder().encode(s)
const hex = (u: Uint8Array): string => [...u].map((b) => b.toString(16).padStart(2, '0')).join('')

// PUBLISHED PBKDF2-HMAC-SHA256 test vectors — ground truth this repository did not write.
const VECTORS: Array<[string, string, number, number, string]> = [
  ['password', 'salt', 1, 32, '120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b'],
  ['password', 'salt', 2, 32, 'ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43'],
  ['password', 'salt', 4096, 32, 'c5e478d59288c841aa530db6845c4c8d962893a001ce4e11a4963873aa98134a'],
]

test('the pure KDF matches the published PBKDF2-HMAC-SHA256 vectors', () => {
  for (const [p, s, c, dk, want] of VECTORS) {
    assert.equal(hex(deriveKeyPure(enc(p), enc(s), c, dk)), want, `vector c=${c} must match the published answer`)
  }
  // the control: a WRONG iteration count must NOT produce the published answer, or this test is rigged to pass
  assert.notEqual(hex(deriveKeyPure(enc('password'), enc('salt'), 3, 32)), VECTORS[0]![4])
})

test('the host KDF and the pure KDF agree bit-for-bit — the same function, two instruments', () => {
  const g = (process as unknown as { getBuiltinModule?: (id: string) => unknown }).getBuiltinModule
  const mod = typeof g === 'function' ? g.call(process, 'node:crypto') as { pbkdf2Sync?: (p: Uint8Array, s: Uint8Array, i: number, l: number, d: string) => Uint8Array } : undefined
  if (typeof mod?.pbkdf2Sync !== 'function') {
    assert.equal(kdfInstrument(), 'pure', 'no host KDF means the pure path must be the one in use')
    return
  }
  assert.equal(kdfInstrument(), 'host', 'a runtime with node:crypto must take the fast lawful path')
  const hostKdf: (p: Uint8Array, s: Uint8Array, i: number, l: number, d: string) => Uint8Array = mod.pbkdf2Sync
  for (const [p, s, c, dk] of VECTORS) {
    assert.equal(hex(new Uint8Array(hostKdf(enc(p), enc(s), c, dk, 'sha256'))), hex(deriveKeyPure(enc(p), enc(s), c, dk)),
      `the two paths diverged at c=${c}`)
  }
  // and across shapes the vectors do not cover: varied passphrases, salts and output widths
  for (const n of [1, 7, 16, 33, 64]) {
    const P = enc(`passphrase-${n}`), S = enc(`salt-${n}`)
    assert.equal(hex(new Uint8Array(hostKdf(P, S, 37, n, 'sha256'))), hex(deriveKeyPure(P, S, 37, n)),
      `dkLen=${n} must agree — including past the 32-byte block`)
  }
  // the control: different inputs must give different keys, so the comparison above is not vacuous
  assert.notEqual(hex(deriveKeyPure(enc('a'), enc('salt'), 37, 32)), hex(deriveKeyPure(enc('b'), enc('salt'), 37, 32)))
})

test('a seal made on this runtime opens on this runtime, at the real work factor', () => {
  const sealed = encrypt('the parity of the two instruments', 'kdf-parity-key')
  assert.equal(decrypt(sealed, 'kdf-parity-key'), 'the parity of the two instruments')
  assert.equal(sealed.kdf, 'PBKDF2-SHA256', 'the envelope still names the standard it used')
  assert.equal(sealed.iter, 600_000, 'THE WORK FACTOR IS UNTOUCHED — speed came from the instrument, never from fewer iterations')
  assert.throws(() => decrypt(sealed, 'wrong-key'), 'and the wrong key still fails')
})

// ── BACKWARD COMPATIBILITY, AT THE REAL WORK FACTOR. Everything above runs at small iteration counts so the
// suite stays quick, which leaves the one case that actually ships unproven: ITER=600,000 against a salt from a
// REAL envelope. Every seal ever written by this package was keyed on the pure path; if the host path disagreed
// there, every one of them would become permanently unopenable — the failure no later test could recover from.
// It costs ~1.8s to derive the pure side once. A compatibility guarantee is worth one derivation.
test('at ITER=600,000 on a real envelope salt, both instruments derive the SAME key — old seals still open', () => {
  const sealed = encrypt('an envelope from the pure era', 'legacy-passphrase')
  const salt = Uint8Array.from(atob(sealed.salt), (ch) => ch.charCodeAt(0))
  assert.equal(sealed.iter, 600_000)

  const pure = deriveKeyPure(enc('legacy-passphrase'), salt, sealed.iter)
  const g = (process as unknown as { getBuiltinModule?: (id: string) => unknown }).getBuiltinModule
  const mod = typeof g === 'function' ? g.call(process, 'node:crypto') as { pbkdf2Sync?: (p: Uint8Array, s: Uint8Array, i: number, l: number, d: string) => Uint8Array } : undefined
  if (typeof mod?.pbkdf2Sync === 'function') {
    const hostKdf: (p: Uint8Array, s: Uint8Array, i: number, l: number, d: string) => Uint8Array = mod.pbkdf2Sync
    assert.equal(hex(new Uint8Array(hostKdf(enc('legacy-passphrase'), salt, sealed.iter, 32, 'sha256'))), hex(pure),
      'THE COMPATIBILITY GUARANTEE: a key derived at the shipped work factor must be identical on both paths')
  }
  // the control: the same salt with a different passphrase must NOT derive that key
  assert.notEqual(hex(deriveKeyPure(enc('wrong-passphrase'), salt, sealed.iter)), hex(pure))
  // and the envelope itself opens, end to end
  assert.equal(decrypt(sealed, 'legacy-passphrase'), 'an envelope from the pure era')
})
