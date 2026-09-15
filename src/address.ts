// uuidna — the content-addressed core. Below hexbit in the stack — mint and fold only (no unit widths).
// toUuid provides INTEGRITY. Exact integer arithmetic (no Math.*).
// FNV-1a is NON-cryptographic by design — public and reproducible. For adversarial integrity use
// cryptoAddress (SHA-256), which is collision- and preimage-resistant.
// Licensed CC BY-NC-ND 4.0 · Attribution: Tsvetan Rouschev (ceccec@psg.bg).
import { sha256 } from './sha256.js'

/** uuid hex digits per coin — 32 hexbits / 2 coins = 16 (matches hexbit COIN_HEXBITS; not imported — address stays below hexbit). */
const COIN_HEX_CHARS = 32 / 2

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
//  THE DECADE STILL HOLDS. With two products and one pass (below) the capacity report's fresh sweep measured 2,111 ns
//  per verify on 2026-09-15 (gen-quantum-capacity over the whole ledger) — decade 10^3 as before, 2.1× above the 1,000 edge
//  and 4.7× below the 10,000 one, against the few-percent spread between launches recorded above.
//
//  TWO PRODUCTS, NOT THREE. Only `a` needs splitting: (a & 0xffff)·b and (a >>> 16)·b are each under 2^48, exact in
//  a double; the high product is masked to its low 16 bits before being shifted up, so the result keeps exactly the
//  low 32 bits the three-product form kept (verified identical over 200,018 pairs including the sign bit, and over
//  every string the ledger addresses).
function mul32(a: number, b: number): number {
  a >>>= 0
  b >>>= 0
  return (((a & 0xffff) * b) + ((((a >>> 16) * b) & 0xffff) * 65536)) >>> 0
}

function hexByte(value: number): string {
  return value.toString(16).padStart(2, '0')
}

/** the four seeds; each is one lane of the address */
const SEEDS = [0, 0x9e3779b9, 0x243f6a88, 0xb7e15162] as const
const FNV_OFFSET = 0x811c9dc5
const FNV_PRIME = 0x01000193

/** the MurmurHash3 finaliser, fmix32 (Austin Appleby; constants 0x85ebca6b and 0xc2b2ae35) — each lane ends here */
function fmix32(h: number): number {
  h = mul32(h ^ (h >>> 16), 0x85ebca6b)
  h = mul32(h ^ (h >>> 13), 0xc2b2ae35)
  return (h ^ (h >>> 16)) >>> 0
}

/** bytesFromSeed(seed) → the 16 address bytes. Each lane is an FNV-1a step (Fowler, Noll and Vo) with an extra
 *  `h ^= h >>> 13` per character, from its own seed, finished by fmix32. ONE PASS, FOUR LANES: the lanes do the same
 *  work per character from different starting states, so each character is read once and advances all four. */
function bytesFromSeed(seed: string): number[] {
  let a = (FNV_OFFSET ^ SEEDS[0]) >>> 0
  let b = (FNV_OFFSET ^ SEEDS[1]) >>> 0
  let c = (FNV_OFFSET ^ SEEDS[2]) >>> 0
  let d = (FNV_OFFSET ^ SEEDS[3]) >>> 0
  for (let i = 0; i < seed.length; i++) {
    const x = seed.charCodeAt(i)
    a = mul32(a ^ x, FNV_PRIME); a = (a ^ (a >>> 13)) >>> 0
    b = mul32(b ^ x, FNV_PRIME); b = (b ^ (b >>> 13)) >>> 0
    c = mul32(c ^ x, FNV_PRIME); c = (c ^ (c >>> 13)) >>> 0
    d = mul32(d ^ x, FNV_PRIME); d = (d ^ (d >>> 13)) >>> 0
  }
  const out: number[] = []
  for (const w of [fmix32(a), fmix32(b), fmix32(c), fmix32(d)])
    out.push((w >>> 24) & BYTE_MASK, (w >>> 16) & BYTE_MASK, (w >>> 8) & BYTE_MASK, w & BYTE_MASK)
  return out
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
  if (keep) _uuidCache.set(seed, uuid)
  return uuid
}

// WHETHER THIS PROCESS KEEPS ADDRESSES. A host keeps every seed it addressed, which makes the second ask free. The edge
// isolate cannot: a sweep over the whole ledger pins every statement in the cache, past the isolate's memory (measured
// 157.5 MB against 128 MB on the first tool call after the ledger was read). The edge's own ledger module switches this
// off when it loads — the surface declares it, no size is typed and no runtime is sniffed.
let keep = true
/** keepAddresses(on) → whether toUuid keeps what it addressed; off clears what was kept */
export const keepAddresses = (on: boolean): void => { keep = on; if (!on) _uuidCache.clear() }

/** toUuidOnce(seed) → exactly toUuid(seed), without keeping the seed. For a one-shot seed of any size — a deposit body's
 *  canonical JSON, a ledger piece — where the cache would pin every byte of it for the life of the process. */
export function toUuidOnce(seed: string): string {
  return _uuidCache.get(seed) ?? formatUuid(bytesFromSeed(seed))
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
 *  So a surface that must survive a quantum adversary needs more than a uuid, and no choice of hash rescues it:
 *  truncating SHA-256 to 122 usable bits throws away the margin before the mint is even asked. This returns all
 *  256 bits as hex — 2^128 quantum preimage after halving, which IS a post-quantum margin — and it is not a uuid
 *  precisely so that substituting it into a field expecting one shows up loudly.
 *
 *  WHERE IT IS AND IS NOT NEEDED. spin's drift detection and every routing address face no adversary and are
 *  correct as they are; a 122-bit content-address is an excellent name. Contract ids, rights imprints and bill
 *  receipts are the surfaces where an adversary is the threat model, and they are the reason this door exists. */
export function quantumAddress(seed: string): string {
  return [...sha256(enc.encode('uuidna:' + seed))].map(hexByte).join('')
}

/** Strict, canonical mint: coerce to string, normalize (NFC), trim — so the SAME logical value always
 *  mints the SAME address. Closes minting flaws (toUuid(3) vs toUuid('3'), stray whitespace, unicode form). */
/** canonicalJson(v) → JSON with every object's keys sorted, so equal content always has equal bytes and so one content
 *  address. THE ONE CANONICAL FORM: a deposit's storage key, the hardware binding and the commit verifier all hash
 *  through it, so the door that writes and the verifier that reads can never disagree about an address. */
export const canonicalJson = (v: unknown): string =>
  Array.isArray(v) ? `[${v.map(canonicalJson).join(',')}]`
    : v && typeof v === 'object' ? `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${canonicalJson((v as Record<string, unknown>)[k])}`).join(',')}}`
      : JSON.stringify(v) ?? 'null'

export function strictUuidna(value: unknown): string {
  return toUuid('uuidna:' + String(value).normalize('NFC').trim())
}

/** Fold two addresses into one (order-sensitive). */
export function merge(a: string, b: string): string {
  return toUuid(`${a}:${b}`)
}

/** A 64-bit coin (16 hex digits) minted from any content — the top 64 bits of its content-address. */
export function coin64(text: string): string {
  return toUuid(text).replace(/-/g, '').slice(0, COIN_HEX_CHARS)   // half the uuid — two coins on one address
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
