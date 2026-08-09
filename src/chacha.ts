// chacha — ChaCha20-Poly1305 AEAD (RFC 8439) in PURE latest TypeScript. No native WebCrypto, no deps: the
// cipher is transparent, auditable, deterministic arithmetic — and verified against the RFC's official test
// vectors (KATs) in the test suite. Honest caveats: pure JS is NOT constant-time (timing side-channels), and
// this AEAD is deterministic given (key, nonce) — semantic security needs a unique nonce per (key, message).
// A standard algorithm implemented transparently — not a novel cipher. Integrity, not truth. 0/7.

const rotl = (x: number, n: number): number => ((x << n) | (x >>> (32 - n))) >>> 0
const u32le = (b: Uint8Array, i: number): number => (b[i] | (b[i + 1] << 8) | (b[i + 2] << 16) | (b[i + 3] << 24)) >>> 0
const CONST = [0x61707865, 0x3320646e, 0x79622d32, 0x6b206574] // "expand 32-byte k"

function quarter(w: Uint32Array, a: number, b: number, c: number, d: number): void {
  w[a] = (w[a] + w[b]) >>> 0; w[d] = rotl(w[d] ^ w[a], 16)
  w[c] = (w[c] + w[d]) >>> 0; w[b] = rotl(w[b] ^ w[c], 12)
  w[a] = (w[a] + w[b]) >>> 0; w[d] = rotl(w[d] ^ w[a], 8)
  w[c] = (w[c] + w[d]) >>> 0; w[b] = rotl(w[b] ^ w[c], 7)
}

export function chachaBlock(key: Uint8Array, counter: number, nonce: Uint8Array): Uint8Array {
  const s = new Uint32Array(16)
  s[0] = CONST[0]; s[1] = CONST[1]; s[2] = CONST[2]; s[3] = CONST[3]
  for (let i = 0; i < 8; i++) s[4 + i] = u32le(key, i * 4)
  s[12] = counter >>> 0
  s[13] = u32le(nonce, 0); s[14] = u32le(nonce, 4); s[15] = u32le(nonce, 8)
  const w = s.slice()
  for (let i = 0; i < 10; i++) { // 20 rounds = 10 double-rounds
    quarter(w, 0, 4, 8, 12); quarter(w, 1, 5, 9, 13); quarter(w, 2, 6, 10, 14); quarter(w, 3, 7, 11, 15)
    quarter(w, 0, 5, 10, 15); quarter(w, 1, 6, 11, 12); quarter(w, 2, 7, 8, 13); quarter(w, 3, 4, 9, 14)
  }
  const out = new Uint8Array(64)
  for (let i = 0; i < 16; i++) {
    const v = (w[i] + s[i]) >>> 0
    out[i * 4] = v & 0xff; out[i * 4 + 1] = (v >>> 8) & 0xff; out[i * 4 + 2] = (v >>> 16) & 0xff; out[i * 4 + 3] = (v >>> 24) & 0xff
  }
  return out
}

export function chacha20(key: Uint8Array, counter: number, nonce: Uint8Array, data: Uint8Array): Uint8Array {
  const out = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i += 64) {
    const ks = chachaBlock(key, counter + (i / 64 | 0), nonce)
    for (let j = 0; j < 64 && i + j < data.length; j++) out[i + j] = data[i + j] ^ ks[j]
  }
  return out
}

// Poly1305 (RFC 8439 §2.5) — BigInt for exact 130-bit modular arithmetic (minimum code, provably correct).
export function poly1305(msg: Uint8Array, otk: Uint8Array): Uint8Array {
  let r = 0n; for (let i = 15; i >= 0; i--) r = (r << 8n) | BigInt(otk[i])
  r &= 0x0ffffffc0ffffffc0ffffffc0fffffffn
  let s = 0n; for (let i = 15; i >= 0; i--) s = (s << 8n) | BigInt(otk[16 + i])
  const p = (1n << 130n) - 5n
  let acc = 0n
  for (let i = 0; i < msg.length; i += 16) {
    const n = Math.min(16, msg.length - i)
    let blk = 0n; for (let j = n - 1; j >= 0; j--) blk = (blk << 8n) | BigInt(msg[i + j])
    blk |= 1n << BigInt(8 * n)
    acc = ((acc + blk) * r) % p
  }
  acc = (acc + s) & ((1n << 128n) - 1n)
  const tag = new Uint8Array(16)
  for (let i = 0; i < 16; i++) { tag[i] = Number(acc & 0xffn); acc >>= 8n }
  return tag
}

const pad16 = (n: number): Uint8Array => new Uint8Array((16 - (n % 16)) % 16)
const le64 = (n: number): Uint8Array => { const b = new Uint8Array(8); let x = BigInt(n); for (let i = 0; i < 8; i++) { b[i] = Number(x & 0xffn); x >>= 8n } return b }
const cat = (...a: Uint8Array[]): Uint8Array => { const t = new Uint8Array(a.reduce((s, x) => s + x.length, 0)); let o = 0; for (const x of a) { t.set(x, o); o += x.length } return t }

/** ChaCha20-Poly1305 AEAD encrypt (RFC 8439 §2.8). Returns ciphertext and a 16-byte authentication tag. */
export function aeadEncrypt(key: Uint8Array, nonce: Uint8Array, plaintext: Uint8Array, aad: Uint8Array = new Uint8Array()): { ct: Uint8Array; tag: Uint8Array } {
  const otk = chachaBlock(key, 0, nonce).slice(0, 32) // Poly1305 one-time key = ChaCha20 block 0
  const ct = chacha20(key, 1, nonce, plaintext)
  const mac = cat(aad, pad16(aad.length), ct, pad16(ct.length), le64(aad.length), le64(ct.length))
  return { ct, tag: poly1305(mac, otk) }
}

/** ChaCha20-Poly1305 AEAD decrypt (RFC 8439 §2.8). Throws if the tag does not authenticate. */
export function aeadDecrypt(key: Uint8Array, nonce: Uint8Array, ct: Uint8Array, tag: Uint8Array, aad: Uint8Array = new Uint8Array()): Uint8Array {
  const otk = chachaBlock(key, 0, nonce).slice(0, 32)
  const mac = cat(aad, pad16(aad.length), ct, pad16(ct.length), le64(aad.length), le64(ct.length))
  const t = poly1305(mac, otk)
  let diff = 0; for (let i = 0; i < 16; i++) diff |= t[i] ^ tag[i] // reject a forged/tampered tag
  if (diff !== 0) throw new Error('authentication failed')
  return chacha20(key, 1, nonce, ct)
}
