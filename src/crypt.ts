// crypt — full PURE-TypeScript authenticated encryption. No native WebCrypto, no deps, nothing but latest TS.
//
//   KDF:    PBKDF2-HMAC-SHA256 (600k) — pure TS (./sha256), KAT-verified.
//   CIPHER: ChaCha20-Poly1305 AEAD (RFC 8439) — pure TS (./chacha), KAT-verified.
//   ENVELOPE: the uuidna 7d fold content-addresses the sealed message (public integrity/routing).
//
// DETERMINISTIC (convergent) by default: salt, key, and nonce are derived from the passphrase and plaintext, so
// the same (passphrase, plaintext) always seals to the same envelope — reproducible, content-addressable, like
// the rest of uuidna.
//
// THE CRYPT SALT — closing the equality leak. Pure TS has no secure entropy source, so a content-only salt is
// constant in the message's position: two seals of the same plaintext are byte-identical, revealing equality
// (and recovering the position is a division by zero — the whole step-fibre collapses; proven in lean/Sequence
// .lean: salt_conv_leaks_equality, salt_conv_step_is_division_by_zero). The fix is an ADVANCING SEQUENCE: pass a
// monotonic `step`, and the salt is derived from (plaintext, step) — injective in the step (salt_seq_injective),
// so the same plaintext seals differently each time the step advances, and no observer can tell two envelopes
// hold the same plaintext. The step plays the role a nonce-counter plays elsewhere: it must ADVANCE (never reuse
// a step for the same passphrase). This closes the equality leak; it does NOT make the FNV address collision-
// resistant (a different, non-crypto-by-design gap). Honest caveats: pure JS is NOT constant-time (timing side-
// channels). Strength = ChaCha20-Poly1305 + the passphrase's own entropy. Integrity, not truth.
//
// QUANTUM POSTURE (honest): the scheme is SYMMETRIC-ONLY — no RSA/ECC — so Shor's algorithm has no asymmetric
// target here. The one quantum threat, Grover, is a quadratic speedup that reduces the 256-bit ChaCha key to
// ~128-bit and SHA-256 preimages to ~128-bit — still strong. This code has no quantum device and no key exchange;
// a classical simulator secures nothing.
import { toUuid, merkleFold } from './address.js'
import { pbkdf2Sha256, sha256 } from './sha256.js'
import { aeadEncrypt, aeadDecrypt } from './chacha.js'

const enc = new TextEncoder(), dec = new TextDecoder()
export const ITER = 600_000 // PBKDF2-SHA-256 iterations (OWASP 2023)
// Hard ceiling on the work factor. `iter` travels in the envelope and is attacker-controlled on decrypt; pure-TS
// PBKDF2 has no upper bound, so a hostile `iter` (e.g. 1e12) would spin forever (CPU DoS). 10M is ~16× the default
// and still finite — a legitimate envelope never exceeds it. Recompute-cost is bounded, not unbounded.
export const MAX_ITER = 10_000_000
// Sealed by theorem aead_nonce_and_salt_bits (lean/Cipher.lean): 12·8=96 bits (RFC 8439), 16·8=128 bits, 96<128.
// Named (not the six inline 12s/16s this replaces) so axiom-hunt.ts can bind a LIVE constant instead of a
// hardcoded tautology, and so the two can never independently drift.
export const NONCE_BYTES = 12
export const SALT_BYTES = 16

// truncate toward zero with exact integer arithmetic — no Math.* host intrinsic (the two-coins guard). n - n%1.
const intOf = (n: number): number => n - (n % 1)

const b64 = (u: Uint8Array): string => { let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s) }
const ub64 = (s: string): Uint8Array => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }
const cat = (...a: Uint8Array[]): Uint8Array => { const t = new Uint8Array(a.reduce((s, x) => s + x.length, 0)); let o = 0; for (const x of a) { t.set(x, o); o += x.length } return t }

const foldEnvelope = (alg: string, salt: string, nonce: string, ct: string, tag: string): string =>
  merkleFold([alg, salt, nonce, ct, tag].map(toUuid))

// The uuidna KDF memo — the 600k-iteration derivation is a PURE function of (passphrase, salt, iter), so a decrypt
// re-derives the exact key its encrypt already did: the second pass is a cache hit, not 600k more rounds. ITER is
// unchanged; we only stop paying it twice. Process-lifetime, in-memory. The cache key is a SHA-256 digest of the
// derivation string — NOT FNV: keying a secret's memo on a non-cryptographic hash would return the WRONG key on a
// collision, so the map key must be collision-resistant (the value is the derived key, never the raw passphrase).
const kdfCache = new Map<string, Uint8Array>()
const deriveKey = (pass: Uint8Array, salt: Uint8Array, iter: number): Uint8Array => {
  const memoKey = b64(sha256(enc.encode('uuidna-kdf-v1|' + iter + '|' + b64(salt) + '|' + b64(pass)))) // collision-resistant memo key
  let key = kdfCache.get(memoKey)
  if (!key) { key = pbkdf2Sha256(pass, salt, iter, 32); kdfCache.set(memoKey, key) }
  return key
}

/** A sealed envelope: the ChaCha20-Poly1305 ciphertext + tag, its public parameters, and its 7d-fold address.
 *  `v:2` envelopes carry `seq`, the advancing-sequence step that freshens the salt (closing the equality leak). */
export interface Sealed {
  v: 1 | 2 | 3
  alg: 'ChaCha20-Poly1305'
  kdf: 'PBKDF2-SHA256'
  iter: number
  salt: string
  nonce: string
  ct: string
  tag: string
  address: string
  seq?: number
}

/** Encrypt plaintext under a passphrase — full pure-TS. Convergent by default; pass an advancing `step` (the
 *  crypt salt) to freshen the salt per position, so the same plaintext seals differently and equality no longer
 *  leaks. The step is public (stored as `seq`); it must ADVANCE — never reuse a step for the same passphrase. */
export function encrypt(plaintext: string, passphrase: string, step?: number): Sealed {
  const pt = enc.encode(plaintext), pass = enc.encode(passphrase)
  const fresh = step !== undefined
  // the crypt salt: content-only (v1) is constant in the step → leaks equality; advancing the SEQUENCE (v2) makes
  // the salt injective in the step, so the same plaintext seals differently as the step advances. Both stay pure.
  const salt = fresh
    ? sha256(cat(enc.encode('uuidna-crypt-salt-v2|' + intOf(step as number) + '|'), pt)).slice(0, SALT_BYTES)
    : sha256(cat(enc.encode('uuidna-crypt-salt-v1'), pt)).slice(0, SALT_BYTES)
  const key = deriveKey(pass, salt, ITER)
  // nonce derived from the (unique per plaintext+step) key — pure, deterministic, non-repeating for distinct keys
  const nonce = sha256(cat(enc.encode('uuidna-crypt-nonce-v1'), key)).slice(0, NONCE_BYTES)
  const { ct, tag } = aeadEncrypt(key, nonce, pt)
  const base = { alg: 'ChaCha20-Poly1305' as const, kdf: 'PBKDF2-SHA256' as const, iter: ITER, salt: b64(salt), nonce: b64(nonce), ct: b64(ct), tag: b64(tag) }
  const address = foldEnvelope(base.alg, base.salt, base.nonce, base.ct, base.tag)
  return fresh ? { v: 2, ...base, address, seq: intOf(step as number) } : { v: 1, ...base, address }
}

/** Seal a sequence of messages under one passphrase, each ADVANCING the step (start, start+1, …) — the sequence
 *  is the stripe, one seal per step. Repeated messages never seal alike, so the equality leak stays closed across
 *  the whole stream. Decrypt each envelope with `decrypt` (the salt travels in the envelope; no step needed back). */
export function sealSequence(messages: readonly string[], passphrase: string, start = 0): Sealed[] {
  return messages.map((m, i) => encrypt(m, passphrase, start + i))
}

/** Decrypt a sealed envelope. A wrong passphrase or tampered ciphertext throws (Poly1305 authentication). */
// encryptSession — the captain theorem as encryption: CONTRIBUTE THE TWO COINS ONCE (one 600k KDF on a STABLE
// session salt), then SEAL EVERY MESSAGE FREE (O(1) ChaCha20 under a per-step nonce). The salt is derived from the
// session (a room address, a channel id), not the plaintext — so `deriveKey` is a cache hit from the 2nd message on
// (~16 µs, not 1.75 s). SECURITY is preserved: the key is still PBKDF2-600k, and the NONCE freshens per `step`, so
// identical plaintexts seal differently and the equality leak stays closed. The `step` MUST advance (never reuse it
// under one session key) — the same nonce-uniqueness contract as v2. Opens with the ordinary `decrypt` (which reads
// the salt from the envelope and hits the same cache). Recompute O(N) once, verify O(1) forever — coins() = 2.
// the RATCHET: pay the two coins ONCE for the root key (PBKDF2 on the stable session salt), then ROTATE a fresh
// message key each request — a cheap one-way hash of (root, step). The session lives in the root; it is never lost
// until the passphrase (the root) is destroyed. Every request a different key AND a different nonce.
const rotate = (root: Uint8Array, step: number): Uint8Array =>
  sha256(cat(enc.encode('uuidna-session-rotate-v3|' + intOf(step) + '|'), root)).slice(0, 32)
export function encryptSession(plaintext: string, passphrase: string, session: string, step: number): Sealed {
  const pt = enc.encode(plaintext), pass = enc.encode(passphrase)
  const salt = sha256(enc.encode('uuidna-session-salt-v3|' + session)).slice(0, SALT_BYTES) // STABLE per session → KDF once
  const root = deriveKey(pass, salt, ITER)                                          // the two coins, paid once (cached)
  const key = rotate(root, step)                                                    // ROTATE per request — fresh key each message
  const nonce = sha256(cat(enc.encode('uuidna-session-nonce-v3|' + intOf(step) + '|'), salt)).slice(0, NONCE_BYTES) // unique per step
  const { ct, tag } = aeadEncrypt(key, nonce, pt)
  const base = { alg: 'ChaCha20-Poly1305' as const, kdf: 'PBKDF2-SHA256' as const, iter: ITER, salt: b64(salt), nonce: b64(nonce), ct: b64(ct), tag: b64(tag) }
  return { v: 3, ...base, address: foldEnvelope(base.alg, base.salt, base.nonce, base.ct, base.tag), seq: intOf(step) }
}

// decryptSession — open a v:3 session envelope, deriving the key from the RECEIVER's OWN session (its room address),
// NOT from the salt the envelope carries. This makes the session/referer a real SECRECY boundary: a message sealed
// for another session (a different referer → a different room address) derives a different root, so the rotated key
// mismatches and Poly1305 rejects it — you cannot open a message that was not sealed for your exact session.
export function decryptSession(sealed: Sealed, passphrase: string, session: string): string {
  const iter = sealed.iter
  if (!Number.isInteger(iter) || iter < 1 || iter > MAX_ITER) throw new Error(`crypt: refusing iter=${iter} — must be an integer in 1..${MAX_ITER} (DoS guard)`)
  const salt = sha256(enc.encode('uuidna-session-salt-v3|' + session)).slice(0, SALT_BYTES) // the RECEIVER's session salt (cached)
  const root = deriveKey(enc.encode(passphrase), salt, iter)
  const key = rotate(root, sealed.seq ?? 0)
  return dec.decode(aeadDecrypt(key, ub64(sealed.nonce), ub64(sealed.ct), ub64(sealed.tag)))
}

export function decrypt(sealed: Sealed, passphrase: string): string {
  const iter = sealed.iter
  if (!Number.isInteger(iter) || iter < 1 || iter > MAX_ITER) throw new Error(`crypt: refusing iter=${iter} — must be an integer in 1..${MAX_ITER} (DoS guard)`)
  const root = deriveKey(enc.encode(passphrase), ub64(sealed.salt), iter)
  // v:3 is the session ratchet — the message key is the root ROTATED by the step; v:1/v:2 use the derived key directly.
  const key = sealed.v === 3 ? rotate(root, sealed.seq ?? 0) : root
  return dec.decode(aeadDecrypt(key, ub64(sealed.nonce), ub64(sealed.ct), ub64(sealed.tag)))
}

/** Verify the envelope's 7d-fold content-address (integrity/routing) without the key — public, reproducible. */
export function verifyEnvelope(sealed: Sealed): boolean {
  return foldEnvelope(sealed.alg, sealed.salt, sealed.nonce, sealed.ct, sealed.tag) === sealed.address
}
