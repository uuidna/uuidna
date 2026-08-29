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
// channels). Strength = ChaCha20-Poly1305 + the passphrase's own entropy. Integrity.
//
// QUANTUM POSTURE (honest): the scheme is SYMMETRIC-ONLY — no RSA/ECC — so Shor's algorithm has no asymmetric
// target here. The one quantum threat, Grover, is a quadratic speedup that reduces the 256-bit ChaCha key to
// ~128-bit and SHA-256 preimages to ~128-bit — still strong. This code has no quantum device and no key exchange;
// a classical simulator secures nothing.
import { toUuid, merkleFold } from './address.js'
import { pbkdf2Sha256, sha256 } from './sha256.js'
import { aeadEncrypt, aeadDecrypt } from './chacha.js'
import {
  UUID_HEXBITS, COINS, HEXBIT_BITS, HEXBIT_STATES, HANDLE_HEXBITS,
  ADDRESS_BYTES, KEY_BITS, KEY_BYTES, KEY_HEXBITS, GROVER_FLOOR_BITS,
} from './hexbit/index.js'
import { twoBoardsOf, flipCoin, nextCoinOf } from './hexagram.js'
import { coins } from './captain/billing/index.js'
import { RAYS } from './aura.js'
import { CAPACITY } from './imprint.js'
import { balanceStream, jobHandles, mapAcross, type StreamBalance } from './quantum/apps/balancer.js'

export { KEY_BITS, KEY_BYTES, ADDRESS_BYTES, KEY_HEXBITS, GROVER_FLOOR_BITS }

const enc = new TextEncoder(), dec = new TextDecoder()
export const ITER = 600_000 // PBKDF2-SHA-256 iterations (OWASP 2023)
// Hard ceiling on the work factor. `iter` travels in the envelope and is attacker-controlled on decrypt; pure-TS
// PBKDF2 has no upper bound, so a hostile `iter` (e.g. 1e12) would spin forever (CPU DoS). 10M is ~16× the default
// and still finite — a legitimate envelope never exceeds it. Recompute-cost is bounded.
export const MAX_ITER = 10_000_000
export const NONCE_BYTES = ADDRESS_BYTES - HEXBIT_BITS
export const SALT_BYTES = ADDRESS_BYTES
/** Poly1305 tag — one address, the Grover floor (sha256_grover_margin_is_the_address). */
export const TAG_BYTES = ADDRESS_BYTES

// truncate toward zero with exact integer arithmetic — no Math.* host intrinsic (the two-coins guard). n - n%1.
const intOf = (n: number): number => n - (n % 1)

const b64 = (u: Uint8Array): string => { let s = ''; for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i]); return btoa(s) }
const ub64 = (s: string): Uint8Array => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u }
const cat = (...a: Uint8Array[]): Uint8Array => { const t = new Uint8Array(a.reduce((s, x) => s + x.length, 0)); let o = 0; for (const x of a) { t.set(x, o); o += x.length } return t }

const foldEnvelope = (alg: string, salt: string, nonce: string, ct: string, tag: string): string =>
  merkleFold([alg, salt, nonce, ct, tag].map(toUuid))

// The uuidna KDF memo — the 600k-iteration derivation is a PURE function of (passphrase, salt, iter), so a decrypt
// re-derives the exact key its encrypt already did: the second pass is a cache hit. ITER is
// unchanged; we only stop paying it twice. Process-lifetime, in-memory. The cache key is a SHA-256 digest of the
// derivation string — NOT FNV: keying a secret's memo on a non-cryptographic hash would return the WRONG key on a
// collision, so the map key must be collision-resistant (the value is the derived key.
const kdfCache = new Map<string, Uint8Array>()

// ── THE SAME DERIVATION, ON THE FASTEST LAWFUL INSTRUMENT ────────────────────────────────────────────────────
// PBKDF2-HMAC-SHA256 is a STANDARD, not a choice: for one (pass, salt, iter, dkLen) there is exactly one correct
// output, so a host that implements it in C and ./sha256's pure TS are the same function with different costs —
// measured here at 1794 ms against 71 ms for the 600k derivation, 25x, bit-identical, and both agreeing with the
// published PBKDF2-HMAC-SHA256 vectors (crypto-kdf-parity.test.ts holds all of that, vectors included, so the
// claim is checked rather than asserted). The work factor is UNTOUCHED — ITER is still 600,000 and every
// iteration is still performed. Only the machine doing them changed.
//
// THE PURE PATH REMAINS THE DEFINITION. It is what runs where no host KDF exists, it is what the KAT pins, and
// it is what makes this package dependency-free — so it is a fallback, never a deletion. The builtin resolves
// LAZILY through process.getBuiltinModule (boundary.ts's law: no static `node:` import may enter this module, or
// the edge bundle stops building), and anything unexpected — no getBuiltinModule, no node:crypto, no pbkdf2Sync
// — falls through to the pure implementation rather than throwing.
type Pbkdf2Sync = (p: Uint8Array, s: Uint8Array, i: number, len: number, digest: string) => Uint8Array
let hostKdf: Pbkdf2Sync | null | undefined   // undefined = not yet looked for; null = looked, absent
const hostPbkdf2 = (): Pbkdf2Sync | null => {
  if (hostKdf !== undefined) return hostKdf
  try {
    const g = (process as unknown as { getBuiltinModule?: (id: string) => unknown }).getBuiltinModule
    const mod = typeof g === 'function' ? g.call(process, 'node:crypto') as { pbkdf2Sync?: Pbkdf2Sync } : undefined
    hostKdf = typeof mod?.pbkdf2Sync === 'function' ? mod.pbkdf2Sync : null
  } catch { hostKdf = null }
  return hostKdf
}

const deriveKey = (pass: Uint8Array, salt: Uint8Array, iter: number): Uint8Array => {
  const memoKey = b64(sha256(enc.encode('uuidna-kdf-v1|' + iter + '|' + b64(salt) + '|' + b64(pass)))) // collision-resistant memo key
  let key = kdfCache.get(memoKey)
  if (!key) {
    const host = hostPbkdf2()
    // new Uint8Array(...) normalises the host's Buffer to the exact type the rest of this module handles
    key = host ? new Uint8Array(host(pass, salt, iter, KEY_BYTES, 'sha256')) : pbkdf2Sha256(pass, salt, iter, KEY_BYTES)
    kdfCache.set(memoKey, key)
  }
  return key
}

/** THE PURE DERIVATION, REACHABLE — so the parity test can compare the two paths, and so a caller that must have
 *  the dependency-free one can ask for it by name. Not used by encrypt/decrypt: they take the fast lawful path. */
export const deriveKeyPure = (pass: Uint8Array, salt: Uint8Array, iter: number, dkLen = KEY_BYTES): Uint8Array =>
  pbkdf2Sha256(pass, salt, iter, dkLen)

/** which instrument this runtime derives on — 'host' (C, via node:crypto) or 'pure' (./sha256). Observable so a
 *  deployment can SAY which path it took instead of assuming. */
export const kdfInstrument = (): 'host' | 'pure' => (hostPbkdf2() ? 'host' : 'pure')

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

/** Same envelopes as a serial map, assigned across the CPU/GPU fleet. Independent messages only — onion wraps
 *  and sealChain stay serial (each layer/referer depends on the prior). GPU lane is specified, not dispatched. */
export function sealSequenceAcross(
  messages: readonly string[],
  passphrase: string,
  cpuWorkers: number = HANDLE_HEXBITS,
  start = 0,
): { envelopes: Sealed[]; balance: StreamBalance } {
  const handles = jobHandles('seq', messages, start)
  const balance = balanceStream(handles, cpuWorkers)
  const envelopes = mapAcross(handles, balance.workers, (i) => encrypt(messages[i]!, passphrase, start + i))
  return { envelopes, balance }
}

/** Seal a sequence of messages under one passphrase, each ADVANCING the step (start, start+1, …) — the sequence
 *  is the stripe, one seal per step. Repeated messages never seal alike, so the equality leak stays closed across
 *  the whole stream. Decrypt each envelope with `decrypt` (the salt travels in the envelope; no step needed back). */
export function sealSequence(messages: readonly string[], passphrase: string, start = 0): Sealed[] {
  return sealSequenceAcross(messages, passphrase, HANDLE_HEXBITS, start).envelopes
}

/** Verify the envelope's 7d-fold content-address (integrity/routing) without the key — public, reproducible. */
export function verifyEnvelope(sealed: Sealed): boolean {
  return foldEnvelope(sealed.alg, sealed.salt, sealed.nonce, sealed.ct, sealed.tag) === sealed.address
}

const sameBytes = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.length !== b.length) return false
  let d = 0
  for (let i = 0; i < a.length; i++) d |= a[i]! ^ b[i]!
  return d === 0
}

const insistEnvelope = (sealed: Sealed): void => {
  if (!verifyEnvelope(sealed)) throw new Error('crypt: envelope does not recompute')
}

const openAead = (sealed: Sealed, key: Uint8Array): string =>
  dec.decode(aeadDecrypt(key, ub64(sealed.nonce), ub64(sealed.ct), ub64(sealed.tag)))

const refuseIter = (iter: number): void => {
  if (!Number.isInteger(iter) || iter < 1 || iter > MAX_ITER)
    throw new Error(`crypt: refusing iter=${iter} — must be an integer in 1..${MAX_ITER} (DoS guard)`)
}

// encryptSession — contribute the two coins once (one 600k KDF on a STABLE session salt), then seal every message
// free (O(1) ChaCha20 under a per-step nonce). The salt is derived from the session (room address / referrer door).
// `deriveKey` is a cache hit from the 2nd message on. The NONCE freshens per `step`. The `step` MUST advance.
// Opens only through decryptSession — decrypt refuses v:3 so the traveling salt is not a substitute for the referrer.
const rotate = (root: Uint8Array, step: number): Uint8Array =>
  sha256(cat(enc.encode('uuidna-session-rotate-v3|' + intOf(step) + '|'), root)).slice(0, KEY_BYTES)
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

// decryptSession — open a v:3 envelope from the RECEIVER's OWN session (referrer / room), not from the traveling salt.
// The public salt is a commitment: it must equal sha256(session). Key material is derived from the referrer.
export function decryptSession(sealed: Sealed, passphrase: string, session: string): string {
  refuseIter(sealed.iter)
  insistEnvelope(sealed)
  const salt = sha256(enc.encode('uuidna-session-salt-v3|' + session)).slice(0, SALT_BYTES)
  if (!sameBytes(salt, ub64(sealed.salt))) throw new Error('crypt: referrer does not match envelope')
  const root = deriveKey(enc.encode(passphrase), salt, sealed.iter)
  return openAead(sealed, rotate(root, sealed.seq ?? 0))
}

/** Decrypt a v:1 / v:2 envelope. v:3 opens only through decryptSession (the referrer). Tamper fails the fold first. */
export function decrypt(sealed: Sealed, passphrase: string): string {
  if (sealed.v === 3) throw new Error('crypt: v3 opens through the referrer (decryptSession)')
  refuseIter(sealed.iter)
  insistEnvelope(sealed)
  const root = deriveKey(enc.encode(passphrase), ub64(sealed.salt), sealed.iter)
  return openAead(sealed, root)
}

const bitsToBytes = (bits: readonly number[]): Uint8Array => {
  const octet = HEXBIT_BITS * COINS
  const out = new Uint8Array(bits.length / octet)
  for (let i = 0; i < out.length; i++) {
    let v = 0
    for (let b = 0; b < octet; b++) v = (v << 1) | (bits[i * octet + b]! & 1)
    out[i] = v
  }
  return out
}

/** Pack the two Fu Xi boards as yang‖yin — UUID_BITS occupancy doubled by the coin flip to KEY_BITS. Not entropy. */
export function occupancyTapeOf(address: string): Uint8Array {
  const faces = twoBoardsOf(address)
  return bitsToBytes([...nextCoinOf(faces), ...nextCoinOf(flipCoin(faces))])
}

export interface CryptCover {
  occupancy: { bits: number; hexbits: number; bytes: number; tape: Uint8Array }
  entropy: { bits: number; hexbits: number; bytes: number }
  floor: { bits: number; hexbits: number; bytes: number }
  nonce: { bytes: number; bits: number }
  salt: { bytes: number; bits: number }
  tag: { bytes: number; bits: number }
  digest: { bits: number; hexbits: number; boards: number; registers: number; blockBits: number }
  aspects: number
  directions: number
  foldStates: number
  coins: number
  fused: boolean
  capacity: number
  onion: number
}

/** cryptOf(address) → every crypt width the sealed theorems compute, from this address's two boards. */
export function cryptOf(address: string): CryptCover {
  const tape = occupancyTapeOf(address)
  let foldStates = 1
  for (let i = 0; i < RAYS; i++) foldStates = foldStates * 2
  return {
    occupancy: { bits: KEY_BITS, hexbits: KEY_HEXBITS, bytes: KEY_BYTES, tape },
    entropy: { bits: KEY_BITS, hexbits: KEY_HEXBITS, bytes: KEY_BYTES },
    floor: { bits: GROVER_FLOOR_BITS, hexbits: UUID_HEXBITS, bytes: ADDRESS_BYTES },
    nonce: { bytes: NONCE_BYTES, bits: NONCE_BYTES * 8 },
    salt: { bytes: SALT_BYTES, bits: SALT_BYTES * 8 },
    tag: { bytes: TAG_BYTES, bits: TAG_BYTES * 8 },
    digest: { bits: KEY_BITS, hexbits: KEY_HEXBITS, boards: HEXBIT_BITS, registers: HANDLE_HEXBITS, blockBits: KEY_BITS * COINS },
    aspects: RAYS,
    directions: RAYS * (RAYS - 1),
    foldStates,
    coins: COINS,
    fused: coins() === COINS,
    capacity: CAPACITY,
    onion: HEXBIT_STATES,
  }
}
