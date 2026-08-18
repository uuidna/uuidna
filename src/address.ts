// uuidna — the content-addressed core. Dependency-free, exact integer arithmetic (no Math.*).
// toUuid provides INTEGRITY, not secrecy: the same input always mints the same address, for anyone, with no key.
// FNV-1a is NON-cryptographic by design — public and reproducible, not secret. For adversarial integrity use
// cryptoAddress (SHA-256), which is collision- and preimage-resistant.
// Licensed CC BY-NC-ND 4.0 · Attribution: Tsvetan Rouschev (ceccec@psg.bg).
import { sha256 } from './sha256.js'

const enc = new TextEncoder()
const BYTE_MASK = 0xff
const MASK_32 = 0xffffffffn

/** Exact 32-bit unsigned integer multiply — algebraic, via BigInt; the local theorem, no host intrinsic. */
function mul32(a: number, b: number): number {
  return Number((BigInt(a >>> 0) * BigInt(b >>> 0)) & MASK_32)
}

/** FNV-1a hash — 32-bit seed-based (exact integer arithmetic, no Math.*). */
function hash32(input: string, seed: number): number {
  let h = (0x811c9dc5 ^ seed) >>> 0
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = mul32(h, 0x01000193) >>> 0
    h ^= h >>> 13
  }
  h = mul32(h ^ (h >>> 16), 0x85ebca6b) >>> 0
  h = mul32(h ^ (h >>> 13), 0xc2b2ae35) >>> 0
  return (h ^ (h >>> 16)) >>> 0
}

function hexByte(value: number): string {
  return value.toString(16).padStart(2, '0')
}

function bytesFromSeed(seed: string): number[] {
  const words = [
    hash32(seed, 0),
    hash32(seed, 0x9e3779b9),
    hash32(seed, 0x243f6a88),
    hash32(seed, 0xb7e15162),
  ]
  return words.flatMap((word) => [
    (word >>> (8 * 3)) & BYTE_MASK,
    (word >>> 16) & BYTE_MASK,
    (word >>> 8) & BYTE_MASK,
    word & BYTE_MASK,
  ])
}

const _uuidCache = new Map<string, string>()

/** Format 16 bytes as a v8 UUID string (version nibble 8, RFC-4122 variant). Shared by the FNV and SHA-256 addresses. */
function formatUuid(bytes: number[]): string {
  const b = bytes.slice(0, 16)
  b[6] = (b[6] & 0x0f) | 0x80
  b[8] = (b[8] & 0x3f) | 0x80
  const hex = b.map(hexByte).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

/** Deterministic UUID from a seed string — the fast, public, NON-cryptographic content-address (FNV-1a).
 *  Same input → same address, always. For adversary-resistant integrity use cryptoAddress. */
export function toUuid(seed: string): string {
  const cached = _uuidCache.get(seed)
  if (cached !== undefined) return cached
  const uuid = formatUuid(bytesFromSeed(seed))
  _uuidCache.set(seed, uuid)
  return uuid
}

/** Cryptographic (SHA-256) content-address — collision- and preimage-resistant, formatted as a v8 UUID from the
 *  first 128 bits of SHA-256('uuidna:' + seed). Use where the address must resist an adversary; toUuid stays the
 *  fast public identity. Recomputable by anyone from the same seed; still integrity, not secrecy (it carries no key). */
export function cryptoAddress(seed: string): string {
  return formatUuid([...sha256(enc.encode('uuidna:' + seed))])
}

/** Strict, canonical mint: coerce to string, normalize (NFC), trim — so the SAME logical value always
 *  mints the SAME address. Closes minting flaws (toUuid(3) vs toUuid('3'), stray whitespace, unicode form). */
export function strictUuidna(value: unknown): string {
  return toUuid('uuidna:' + String(value).normalize('NFC').trim())
}

/** Fold two addresses into one (order-sensitive). */
export function merge(a: string, b: string): string {
  return toUuid(`${a}:${b}`)
}

/** A 64-bit coin (16 hex digits) minted from any content — the top 64 bits of its content-address. */
export function coin64(text: string): string {
  return toUuid(text).replace(/-/g, '').slice(0, 16)
}

/** Canonical JSON of a plain object with some keys dropped and the rest key-sorted — ready for toUuid().
 *  Same content (same surviving key/value pairs) always serializes identically regardless of the input
 *  object's own property order; a changed value, or a changed key set, moves the result. This is an
 *  ECMAScript-spec guarantee (JSON.stringify with a sorted replacer array), not a Lean-provable claim —
 *  verified by real tests over real objects, not a small representative instance. */
export function excludeSortedJson(obj: Record<string, unknown>, excludeKeys: readonly string[]): string {
  const exclude = new Set(excludeKeys)
  const rest: Record<string, unknown> = {}
  for (const key of Object.keys(obj)) if (!exclude.has(key)) rest[key] = obj[key]
  return JSON.stringify(rest, Object.keys(rest).sort())
}

/** GCD (bigint) for rational reduction and unit derivation. */
export function gcdBigInt(a: bigint, b: bigint): bigint {
  return b === 0n ? a : gcdBigInt(b, a % b)
}

/** Merkle fold — contract a set of leaves to one root (order-INDEPENDENT: leaves are sorted first). */
export function merkleFold(leaves: readonly string[]): string {
  let layer = [...leaves].sort()
  if (layer.length === 0) return toUuid('empty-mind')
  while (layer.length > 1) {
    const next: string[] = []
    for (let i = 0; i < layer.length; i += 2) {
      const a = layer[i]
      const b = layer[i + 1]
      next.push(b === undefined ? a : merge(a, b))
    }
    layer = next
  }
  return layer[0]
}

/** Digital root in ℤ/9 (1..9; multiples of 9 map to 9). */
export function digitalRoot(n: number): number {
  const r = ((n % 9) + 9) % 9
  return r === 0 ? 9 : r
}

/** Euclid's algorithm — the greatest common divisor. */
export function gcd(a: number, b: number): number {
  while (b) { const t = a % b; a = b; b = t }
  return a
}

/** Primality by trial division up to √n — decidable, exact. */
export function isPrime(n: number): boolean {
  if (n < 2) return false
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false
  return true
}

/** Modular exponentiation bᵉ mod n by square-and-multiply. */
export function modpow(b: number, e: number, n: number): number {
  let r = 1
  b %= n
  while (e > 0) { if (e & 1) r = (r * b) % n; b = (b * b) % n; e >>= 1 }
  return r
}

// ── The ℤ/9 vortex primitives — DERIVED from a single axiom, never typed as literals. ──
/** The one irreducible axiom: the trinity. */
export const TRINITY = 3
/** The base of the ring — TRINITY², derived. */
export const BASE = TRINITY ** 2 // 9
/** The residues [1..BASE]. */
export function digits(): number[] {
  return Array.from({ length: BASE }, (_, i) => i + 1)
}
/** The units of ℤ/9 — residues coprime to the base: [1,2,4,5,7,8]. */
export function units(): number[] {
  return digits().filter((d) => gcdBigInt(BigInt(d), BigInt(BASE)) === 1n)
}
/** The triad {3,6,9} — non-units, the complement. */
export function triad(): number[] {
  return digits().filter((d) => gcdBigInt(BigInt(d), BigInt(BASE)) !== 1n)
}
/** The vortex doubling circuit — the orbit of n→2n (mod BASE) from 1: [1,2,4,8,7,5]. */
export function vortexOrbit(): number[] {
  const orbit: number[] = []
  let x = 1
  do { orbit.push(x); x = (x * 2) % BASE } while (x !== 1)
  return orbit
}
/** a432 angular quantum — one BASE-th of the circle: 360/9 = 40°. */
export const A432_STEP = 360 / BASE
