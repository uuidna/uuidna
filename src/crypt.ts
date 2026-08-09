// crypt — REAL encryption, layered (the both-layered design). Measured, not asserted.
//
//   CORE (secrecy): AES-256-GCM via WebCrypto — a vetted, nonlinear, authenticated cipher. The 256-bit key is
//     derived with PBKDF2-SHA-256 (600k iterations, OWASP 2023) from the passphrase + a random 16-byte salt;
//     a fresh random 12-byte IV per message. GCM authenticates, so a wrong key or tampered ciphertext throws.
//   ENVELOPE (integrity + routing): uuidna content-addresses the sealed ciphertext with the 7d fold of its
//     parts (+/− · / · \ at once, order-independent) — a public, reproducible name anyone can verify without
//     the key. The address is NOT the cipher; it names it.
//
// Honest scope: secrecy = AES-256 (+ passphrase entropy); integrity/addressing = the FNV content-address
// (non-cryptographic, public). Two distinct layers — the address never carries the secret. 0/7.
import { toUuid, merkleFold } from './address.js'

// the 7d fold of the envelope's parts — order-independent (+/− · / · \ at once), not a flat concat.
const foldEnvelope = (alg: string, salt: string, iv: string, ct: string): string =>
  merkleFold([alg, salt, iv, ct].map(toUuid))

const enc = new TextEncoder(), dec = new TextDecoder()
const wc: Crypto = (globalThis as unknown as { crypto: Crypto }).crypto
const ITER = 600_000 // PBKDF2-SHA-256 iterations (OWASP 2023 guidance)
const bs = (u: Uint8Array): BufferSource => u as unknown as BufferSource

const b64 = (u: Uint8Array): string => {
  let s = ''
  for (let i = 0; i < u.length; i++) s += String.fromCharCode(u[i])
  return btoa(s)
}
const ub64 = (s: string): Uint8Array => {
  const bin = atob(s), u = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i)
  return u
}

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const base = await wc.subtle.importKey('raw', bs(enc.encode(passphrase)), 'PBKDF2', false, ['deriveKey'])
  return wc.subtle.deriveKey(
    { name: 'PBKDF2', salt: bs(salt), iterations: ITER, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'],
  )
}

/** A sealed envelope: the AES-256-GCM ciphertext plus its public parameters and its uuidna 7d-fold address. */
export interface Sealed {
  v: 1
  alg: 'AES-256-GCM'
  kdf: 'PBKDF2-SHA256'
  iter: number
  salt: string
  iv: string
  ct: string
  address: string
}

/** Encrypt plaintext under a passphrase. Secrecy is AES-256-GCM; the returned `address` is the 7d-fold of the
 *  envelope for integrity/routing (public, non-secret — it never reveals the plaintext or the key). */
export async function encrypt(plaintext: string, passphrase: string): Promise<Sealed> {
  const salt = wc.getRandomValues(new Uint8Array(16))
  const iv = wc.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(passphrase, salt)
  const ctBuf = await wc.subtle.encrypt({ name: 'AES-GCM', iv: bs(iv) }, key, bs(enc.encode(plaintext)))
  const s: Omit<Sealed, 'address'> = {
    v: 1, alg: 'AES-256-GCM', kdf: 'PBKDF2-SHA256', iter: ITER,
    salt: b64(salt), iv: b64(iv), ct: b64(new Uint8Array(ctBuf)),
  }
  return { ...s, address: foldEnvelope(s.alg, s.salt, s.iv, s.ct) }
}

/** Decrypt a sealed envelope. A wrong passphrase or tampered ciphertext throws (GCM authentication fails). */
export async function decrypt(sealed: Sealed, passphrase: string): Promise<string> {
  const key = await deriveKey(passphrase, ub64(sealed.salt))
  const pt = await wc.subtle.decrypt({ name: 'AES-GCM', iv: bs(ub64(sealed.iv)) }, key, bs(ub64(sealed.ct)))
  return dec.decode(pt)
}

/** Verify the envelope's 7d-fold content-address (integrity/routing) without the key — public, reproducible. */
export function verifyEnvelope(sealed: Sealed): boolean {
  return foldEnvelope(sealed.alg, sealed.salt, sealed.iv, sealed.ct) === sealed.address
}
