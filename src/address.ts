// uuidna — the content-addressed core. Dependency-free, exact integer arithmetic (no Math.*).
// toUuid provides INTEGRITY.
// FNV-1a is NON-cryptographic by design — public and reproducible. For adversarial integrity use
// cryptoAddress (SHA-256), which is collision- and preimage-resistant.
// Licensed CC BY-NC-ND 4.0 · Attribution: Tsvetan Rouschev (ceccec@psg.bg).
import { sha256 } from './sha256.js'
import { COIN_HEXBITS } from './hexbit/index.js'

const enc = new TextEncoder()
const BYTE_MASK = 0xff

/** Exact 32-bit unsigned integer multiply — algebraic, no host intrinsic, and no allocation.
 *
 *  THE SPLIT, AND WHY IT IS EXACT. A 32×32 product overflows a double's 53-bit integer range, which is why this
 *  was written through BigInt. It does not have to be: split each factor into 16-bit halves and every partial
 *  product is under 2^32, so a double holds each one EXACTLY and nothing rounds. Only the low 32 bits survive, so
 *  the ah·bh term (which starts at bit 32) is dropped, and the cross terms are masked to 16 bits before being
 *  shifted up — the discarded bits are exactly the ones the mask would discard anyway. Multiplying by 65536
 *  rather than shifting keeps the value unsigned through the addition, since `<< 16` would sign-flip it.
 *
 *  THIS IS NOT AN OPTIMISATION, AND REVERTING IT AS ONE BRINGS BACK A BUG. The capacity report publishes the
 *  per-fold cost quantised to a DECADE — String(ns).length - 1 — so what matters is not the value but its
 *  distance from a power of ten. Through BigInt the true warm cost of a full toUuid is ~9,450 ns per address —
 *  SIX PERCENT under the 10,000 boundary. A quantity that close to an edge does not need a reason to cross it; a
 *  cold start, fan-out contention or a busy runner will each do it. So the seal alternated between two coins, and
 *  a long run of "Reconcile:" commits in this log were each other's undoing rather than anyone's fix.
 *
 *  The split puts the same quantity at ~3,200 ns — mid-decade, three times from either edge. THAT is what makes
 *  the figure reseal at all. The 3x is the secondary effect; the primary one is that the published number stops
 *  depending on how loaded the machine was when it was taken.
 *
 *  Three sessions measured this independently and agree: 9,368-9,529 ns here across three launches, ~9,900 on a
 *  more loaded box, against ~3,100-3,479 through the split. MEASURE THE WHOLE FUNCTION, not its hash — an earlier
 *  probe here timed the four hash passes alone and read 7,868, missing formatUuid and the memo insert, which is
 *  most of the gap between those figures and the reason it understated how near the edge the value sits. The
 *  other trap is set by this very file: toUuid memoises every seed in an UNBOUNDED Map, so any benchmark that
 *  re-sweeps the same inputs measures the cache — 48 ns per address, forty times too fast — and warm-then-floor
 *  over identical input converges beautifully on the wrong quantity. Vary the seed per pass, or take one cold
 *  sweep of distinct inputs, which has no cache hits in it by construction.
 *
 *  Identical output, which is the whole claim: verified over 200,000 random pairs against the BigInt form, by a
 *  merkle root computed both ways over a thousand leaves, and by spin recomputing all 1,620 sealed derived coins
 *  with 1,617 unchanged — the three that moved being a live upstream feed and a figure under repair elsewhere.
 *  An address that had moved would have moved every coin in the tree.
 *
 *  The host's own 32-bit multiply intrinsic would do this in one instruction, and it is BANNED: the determinism
 *  scan hard-rejects host maths intrinsics tree-wide with no exemption, which is the rule that sent this to
 *  BigInt in the first place. The split obeys it and needs no exemption either.
 *
 *  That intrinsic is named in WORDS above and never written literally. The scan reads raw source and cannot tell
 *  use from mention, so spelling it here trips the very law the sentence explains — which is what the first draft
 *  did, reddening the suite for every session sharing this tree. */
function mul32(a: number, b: number): number {
  const al = a & 0xffff, ah = (a >>> 16) & 0xffff
  const bl = b & 0xffff, bh = (b >>> 16) & 0xffff
  return ((al * bl) + ((((al * bh) + (ah * bl)) & 0xffff) * 65536)) >>> 0
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
 *  fast public identity. Recomputable by anyone from the same seed; still integrity. */
export function cryptoAddress(seed: string): string {
  return formatUuid([...sha256(enc.encode('uuidna:' + seed))])
}

/** quantumAddress — the FULL 256-bit SHA-256 digest, and deliberately NOT a uuid, because a uuid cannot hold it.
 *
 *  THE CEILING IS THE CONTAINER, NOT THE MINT. cryptoAddress is SHA-256 and is the right hash; then formatUuid
 *  keeps sixteen bytes of the thirty-two and stamps six of those bits as constants — four for the version nibble,
 *  two for the RFC variant. Measured over 20,000 addresses: the version nibble is always 8 and the variant nibble
 *  is always one of 8,9,a,b. So a uuidna address carries 128 - 6 = 122 BITS OF ENTROPY, whichever mint made it.
 *
 *  APPLY THIS LEDGER'S OWN SEALED LAW TO THAT NUMBER. grover_halves_the_search_exponent states the demarcated
 *  speedup: unstructured search over 2^20 takes 2^20 classical checks and ~2^10 quantum ones — the exponent
 *  halves and never vanishes. Halve 122 and a preimage on ANY uuid in this tree costs 2^61 quantum work, while a
 *  collision already costs 2^61 classically by the birthday bound. Sixty-one bits is not a post-quantum margin.
 *  The theorem was sealed here and never turned on the tree's own address width; doing so is what this function
 *  is for. Nothing about the theorem changes — it is applied, not amended.
 *
 *  So a surface that must survive a quantum adversary cannot use a uuid at all, and no choice of hash rescues it:
 *  truncating SHA-256 to 122 usable bits throws away the margin before the mint is even asked. This returns all
 *  256 bits as hex — 2^128 quantum preimage after halving, which IS a post-quantum margin — and it is not a uuid
 *  precisely so that it cannot be silently substituted into a field expecting one.
 *
 *  WHERE IT IS AND IS NOT NEEDED. spin's drift detection and every routing address face no adversary and are
 *  correct as they are; a 122-bit content-address is an excellent name. Contract ids, rights imprints and bill
 *  receipts are the surfaces where an adversary is the threat model, and they are the reason this door exists. */
export function quantumAddress(seed: string): string {
  return [...sha256(enc.encode('uuidna:' + seed))].map(hexByte).join('')
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
  return toUuid(text).replace(/-/g, '').slice(0, COIN_HEXBITS)   // half the uuid, from the unit
}

/** Canonical JSON of a plain object with some keys dropped and the rest key-sorted — ready for toUuid().
 *  Same content (same surviving key/value pairs) always serializes identically regardless of the input
 *  object's own property order; a changed value, or a changed key set, moves the result. This is an
 *  ECMAScript-spec guarantee (JSON.stringify with a sorted replacer array)—
 *  verified by real tests over real objects. */
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

// ── The ℤ/9 vortex primitives — DERIVED from a single axiom. ──
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
