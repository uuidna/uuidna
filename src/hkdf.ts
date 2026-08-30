// hkdf — HKDF-SHA256 (RFC 5869) in pure TypeScript. Builds on ./sha256 HMAC; no native crypto.
import { hmacSha256, sha256 } from './sha256.js'

const cat = (...a: Uint8Array[]): Uint8Array => {
  const t = new Uint8Array(a.reduce((s, x) => s + x.length, 0))
  let o = 0
  for (const x of a) { t.set(x, o); o += x.length }
  return t
}

/** hkdfExtract(salt, ikm) → PRK. Salt may be empty (RFC 5869 uses HashLen zeros). */
export function hkdfExtract(salt: Uint8Array, ikm: Uint8Array): Uint8Array {
  return hmacSha256(salt.length ? salt : new Uint8Array(32), ikm)
}

/** hkdfExpand(prk, info, len) → OKM of len bytes (max 255 × HashLen). */
export function hkdfExpand(prk: Uint8Array, info: Uint8Array, len: number): Uint8Array {
  const hashLen = 32
  const n = ((len + hashLen - 1) / hashLen) | 0
  if (n > 255) throw new Error(`hkdf: len ${len} exceeds 255 blocks`)
  const out = new Uint8Array(n * hashLen)
  let prev: Uint8Array = new Uint8Array(0)
  for (let i = 1; i <= n; i++) {
    prev = hmacSha256(prk, cat(prev, info, new Uint8Array([i])))
    out.set(prev, (i - 1) * hashLen)
  }
  return out.slice(0, len)
}

/** hkdfSha256(ikm, salt, info, len) → RFC 5869 HKDF one-shot (extract then expand). */
export function hkdfSha256(ikm: Uint8Array, salt: Uint8Array, info: string | Uint8Array, len: number): Uint8Array {
  const inf = typeof info === 'string' ? new TextEncoder().encode(info) : info
  return hkdfExpand(hkdfExtract(salt, ikm), inf, len)
}
