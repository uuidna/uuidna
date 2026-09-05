// sha256 — SHA-256 (FIPS 180-4), HMAC-SHA256 (RFC 2104), PBKDF2-HMAC-SHA256 (RFC 8018) in PURE TypeScript.
// No native WebCrypto, no deps — transparent, auditable, deterministic arithmetic, verified against the
// standards' official test vectors (KATs) in test/kat.test.mjs. Honest caveat: pure JS is NOT constant-time
// (timing side-channels). A standard implemented transparently — not a novel primitive. Integrity.

const K = new Uint32Array([
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
])

const rotr = (x: number, n: number): number => ((x >>> n) | (x << (32 - n))) >>> 0
const cat = (...a: Uint8Array[]): Uint8Array => { const t = new Uint8Array(a.reduce((s, x) => s + x.length, 0)); let o = 0; for (const x of a) { t.set(x, o); o += x.length } return t }

/** the SHA-256 initial value (FIPS 180-4): the first 32 bits of the fractional parts of the square roots of
 *  the first eight primes. Named so SHA-224, which differs from SHA-256 in NOTHING BUT this vector and the
 *  truncation, can reuse the compression rather than copying it — a second copy of a hash is a second thing to
 *  keep correct, and the KATs would only ever exercise one of them. */
export const IV256 = Object.freeze([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19] as const)

/** SHA-256 (FIPS 180-4) of a byte array → 32-byte digest. `iv` exists for SHA-224 and defaults to SHA-256's
 *  own vector, so every existing caller and every existing KAT walks the identical path it always did. */
export function sha256(msg: Uint8Array, iv: readonly number[] = IV256): Uint8Array {
  const H = new Uint32Array(iv)
  const l = msg.length, bitLen = l * 8
  const k = ((56 - ((l + 1) % 64)) + 64) % 64
  const total = l + 1 + k + 8
  const m = new Uint8Array(total)
  m.set(msg); m[l] = 0x80
  const hi = (bitLen - (bitLen % 0x100000000)) / 0x100000000, lo = bitLen >>> 0 // exact high/low 32 bits by integer division (no Math.*)
  m[total - 8] = (hi >>> 24) & 0xff; m[total - 7] = (hi >>> 16) & 0xff; m[total - 6] = (hi >>> 8) & 0xff; m[total - 5] = hi & 0xff
  m[total - 4] = (lo >>> 24) & 0xff; m[total - 3] = (lo >>> 16) & 0xff; m[total - 2] = (lo >>> 8) & 0xff; m[total - 1] = lo & 0xff
  const w = new Uint32Array(64)
  for (let off = 0; off < total; off += 64) {
    for (let i = 0; i < 16; i++) w[i] = ((m[off + i * 4] << 24) | (m[off + i * 4 + 1] << 16) | (m[off + i * 4 + 2] << 8) | m[off + i * 4 + 3]) >>> 0
    for (let i = 16; i < 64; i++) {
      const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3)
      const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10)
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0
    }
    let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7]
    for (let i = 0; i < 64; i++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
      const ch = (e & f) ^ (~e & g)
      const t1 = (h + S1 + ch + K[i] + w[i]) >>> 0
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const t2 = (S0 + maj) >>> 0
      h = g; g = f; f = e; e = (d + t1) >>> 0; d = c; c = b; b = a; a = (t1 + t2) >>> 0
    }
    H[0] = (H[0] + a) >>> 0; H[1] = (H[1] + b) >>> 0; H[2] = (H[2] + c) >>> 0; H[3] = (H[3] + d) >>> 0
    H[4] = (H[4] + e) >>> 0; H[5] = (H[5] + f) >>> 0; H[6] = (H[6] + g) >>> 0; H[7] = (H[7] + h) >>> 0
  }
  const out = new Uint8Array(32)
  for (let i = 0; i < 8; i++) { out[i * 4] = (H[i] >>> 24) & 0xff; out[i * 4 + 1] = (H[i] >>> 16) & 0xff; out[i * 4 + 2] = (H[i] >>> 8) & 0xff; out[i * 4 + 3] = H[i] & 0xff }
  return out
}

/** HMAC-SHA256 (RFC 2104). */
export function hmacSha256(key: Uint8Array, msg: Uint8Array): Uint8Array {
  const B = 64
  const k0 = key.length > B ? sha256(key) : key
  const kp = new Uint8Array(B); kp.set(k0)
  const ipad = new Uint8Array(B), opad = new Uint8Array(B)
  for (let i = 0; i < B; i++) { ipad[i] = kp[i] ^ 0x36; opad[i] = kp[i] ^ 0x5c }
  return sha256(cat(opad, sha256(cat(ipad, msg))))
}

/** PBKDF2-HMAC-SHA256 (RFC 8018) → derived key of dkLen bytes. */
export function pbkdf2Sha256(pass: Uint8Array, salt: Uint8Array, iterations: number, dkLen: number): Uint8Array {
  const hLen = 32, blocks = ((dkLen + hLen - 1) / hLen) | 0 // ⌈dkLen/hLen⌉ by integer division (no Math.*)
  const out = new Uint8Array(blocks * hLen)
  for (let b = 1; b <= blocks; b++) {
    const bi = new Uint8Array([(b >>> 24) & 0xff, (b >>> 16) & 0xff, (b >>> 8) & 0xff, b & 0xff])
    let u = hmacSha256(pass, cat(salt, bi))
    const t = u.slice()
    for (let i = 1; i < iterations; i++) { u = hmacSha256(pass, u); for (let j = 0; j < hLen; j++) t[j] ^= u[j] }
    out.set(t, (b - 1) * hLen)
  }
  return out.slice(0, dkLen)
}
