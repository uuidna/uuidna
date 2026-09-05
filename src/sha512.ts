// sha512 — SHA-512 and SHA-384 (FIPS 180-4) in pure TypeScript, with the round constants DERIVED rather than
// transcribed.
//
// WHY DERIVED. SHA-512 has eighty 64-bit round constants and eight 64-bit initial values. Copying 88 hex
// literals by hand is 88 chances to introduce a digit nobody would ever find by reading — the value would be
// wrong only for inputs that reach that round, and the test that caught it would look like a mysterious hash
// mismatch. FIPS 180-4 does not present them as magic numbers: each K is the first 64 bits of the fractional
// part of the cube root of one of the first eighty primes, and each H the same over the square root. Both are
// computed here, in exact integer arithmetic, so the constants are a CONSEQUENCE of the specification's own
// sentence instead of a transcription of its table. A test still checks the first of each against the
// published value, because a derivation can be wrong too — it is just wrong in a way one check exposes.
//
// Pure JS is NOT constant-time; this is a transparent implementation of a standard, not a novel primitive, and
// it is verified against the standard's own test vectors. Integrity.

const MASK64 = (1n << 64n) - 1n

/** primesUpTo(n) → the first n primes, by trial division. Small n, plain code, no sieve to get wrong. */
function firstPrimes(n: number): number[] {
  const out: number[] = []
  for (let c = 2; out.length < n; c++) {
    let prime = true
    for (const p of out) {
      if (p * p > c) break
      if (c % p === 0) { prime = false; break }
    }
    if (prime) out.push(c)
  }
  return out
}

/** integer nth root by Newton's method on BigInt — exact, and it terminates because the sequence is decreasing
 *  once it is above the root. Used for the exact fractional bits below. */
function iroot(x: bigint, n: bigint): bigint {
  if (x < 2n) return x
  let guess = 1n << (BigInt(x.toString(2).length) / n + 1n)
  for (;;) {
    const next = ((n - 1n) * guess + x / guess ** (n - 1n)) / n
    if (next >= guess) return guess
    guess = next
  }
}

/** fracBits64(p, root) → the first 64 bits of the fractional part of p^(1/root).
 *  p^(1/root) · 2^64 = (p · 2^(64·root))^(1/root), so one exact integer root gives the bits with no rounding. */
const fracBits64 = (p: number, root: bigint): bigint => iroot(BigInt(p) << (64n * root), root) & MASK64

/** the eighty SHA-512 round constants: cube roots of the first eighty primes */
export const K512: readonly bigint[] = firstPrimes(80).map((p) => fracBits64(p, 3n))

/** the SHA-512 initial value: square roots of the first eight primes */
export const IV512: readonly bigint[] = firstPrimes(8).map((p) => fracBits64(p, 2n))

/** the SHA-384 initial value: square roots of the NINTH through SIXTEENTH primes */
export const IV384: readonly bigint[] = firstPrimes(16).slice(8).map((p) => fracBits64(p, 2n))

const rotr = (x: bigint, n: bigint): bigint => ((x >> n) | (x << (64n - n))) & MASK64
const shr = (x: bigint, n: bigint): bigint => x >> n

function digest(msg: Uint8Array, iv: readonly bigint[], outBytes: number): Uint8Array {
  const H = [...iv]
  // padding: 0x80, zeros, then the length as a 128-bit big-endian count of BITS
  const l = msg.length
  const k = ((112 - ((l + 1) % 128)) + 128) % 128
  const total = l + 1 + k + 16
  const m = new Uint8Array(total)
  m.set(msg)
  m[l] = 0x80
  let bits = BigInt(l) * 8n
  for (let i = 0; i < 16; i++) { m[total - 1 - i] = Number(bits & 0xffn); bits >>= 8n }

  const W = new Array<bigint>(80)
  for (let at = 0; at < total; at += 128) {
    for (let t = 0; t < 16; t++) {
      let w = 0n
      for (let b = 0; b < 8; b++) w = (w << 8n) | BigInt(m[at + t * 8 + b]!)
      W[t] = w
    }
    for (let t = 16; t < 80; t++) {
      const s0 = rotr(W[t - 15]!, 1n) ^ rotr(W[t - 15]!, 8n) ^ shr(W[t - 15]!, 7n)
      const s1 = rotr(W[t - 2]!, 19n) ^ rotr(W[t - 2]!, 61n) ^ shr(W[t - 2]!, 6n)
      W[t] = (W[t - 16]! + s0 + W[t - 7]! + s1) & MASK64
    }
    let [a, b, c, d, e, f, g, h] = H as [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint]
    for (let t = 0; t < 80; t++) {
      const S1 = rotr(e, 14n) ^ rotr(e, 18n) ^ rotr(e, 41n)
      const ch = (e & f) ^ (~e & MASK64 & g)
      const t1 = (h + S1 + ch + K512[t]! + W[t]!) & MASK64
      const S0 = rotr(a, 28n) ^ rotr(a, 34n) ^ rotr(a, 39n)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const t2 = (S0 + maj) & MASK64
      h = g; g = f; f = e; e = (d + t1) & MASK64
      d = c; c = b; b = a; a = (t1 + t2) & MASK64
    }
    const next = [a, b, c, d, e, f, g, h]
    for (let i = 0; i < 8; i++) H[i] = (H[i]! + next[i]!) & MASK64
  }

  const out = new Uint8Array(64)
  for (let i = 0; i < 8; i++) {
    let w = H[i]!
    for (let b = 7; b >= 0; b--) { out[i * 8 + b] = Number(w & 0xffn); w >>= 8n }
  }
  return out.subarray(0, outBytes)
}

/** SHA-512 (FIPS 180-4) of a byte array → 64-byte digest. */
export const sha512 = (msg: Uint8Array): Uint8Array => digest(msg, IV512, 64)

/** SHA-384 (FIPS 180-4): the same compression, a different initial value, truncated to 48 bytes. */
export const sha384 = (msg: Uint8Array): Uint8Array => digest(msg, IV384, 48)

/** hex(d) → the lowercase hex a `*sum` tool prints */
export const hex = (d: Uint8Array): string => [...d].map((b) => b.toString(16).padStart(2, '0')).join('')

// ── SHA-224. It is SHA-256 with a different initial value and a 28-byte truncation, and FIPS 180-4 states that
// vector as "the SECOND thirty-two bits of the fractional parts of the square roots of the ninth through
// sixteenth prime numbers" — the same sentence SHA-384's vector comes from, reading the other half of the same
// 64 bits. Derived here for the same reason as everything above, and it reuses sha256's compression rather
// than carrying a second copy of it.
import { sha256 } from './sha256.js'

/** the SHA-224 initial value: the second 32 bits of the square-root fractions of primes nine through sixteen */
export const IV224: readonly number[] = firstPrimes(16).slice(8).map((p) => Number(fracBits64(p, 2n) & 0xffffffffn))

/** SHA-224 (FIPS 180-4) → 28-byte digest. */
export const sha224 = (msg: Uint8Array): Uint8Array => sha256(msg, IV224).subarray(0, 28)
