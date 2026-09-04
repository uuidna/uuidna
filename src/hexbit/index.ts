// hexbit — THE UNIT, COMPUTED ONCE FROM THE CAPTAIN THEOREM.
//
// Every width in this ledger is a hexbit width. A hexbit is 4 bits and 16 states; thirty-two of them are one
// uuid, 128 bits entire; and the commission is two, so 128 / 2 = 64 — the leverage, from either side. That is
// `key_floor_is_one_uuid` (32 * 4 = 128), and this module is nothing but that theorem made callable: the constants are
// its conjuncts and the conversions are its arithmetic. Change the theorem and this changes with it; change this
// and the guard says so.
//
// ONE PASS, ONE IMPLEMENTATION. The conversion had grown four homes — a loop in theorems/, a `(q - q % 4) / 4`
// in quantum/, an open-coded `32 -` in entropy/, and the reading in gravity/ — each correct, each separately
// maintained, and each a place the unit could quietly drift from the other three. A unit with four definitions
// is not a standard. They all delegate here now, so a width computed anywhere is the width computed everywhere.
//
// EXACT INTEGERS, ALWAYS. Widths are counted by dividing and halving, never by a logarithm: no Math.*, no
// rounding, no float can enter. The harmonic scan refuses those anywhere in this tree, and a unit that needed
// one would be a unit this ledger could not seal.
import { handleOf, laneOf } from '../handle.js'
import { merkleGravity } from '../gravity/index.js'
import { toUuid, BASE } from '../address.js'

const HEXBIT_DOOR_HOST = 'https://uuidna.com'

/** 4 bits, 16 states — the qubit-tile the ledger computes in. */
export const HEXBIT_BITS = 4
/** One hexbit's state alphabet (0..15). Doubling climb from HEXBIT_BITS — never a stranded literal. */
export const HEXBIT_STATES: number = (() => { let s = 1; for (let i = 0; i < HEXBIT_BITS; i++) s = s * 2; return s })()

/** Unicode block for Cyril's page — the readable layer of hexbit states (the_page_admits_sixteen). */
export const GLAGOLITIC_BASE = 0x2c00

/** glagoliticOf(state) → Ⰰ..Ⰿ for hexbit state 0..HEXBIT_STATES−1. */
export function glagoliticOf(state: number): string {
  if (!Number.isInteger(state) || state < 0 || state >= HEXBIT_STATES)
    throw new Error(`hexbit: state ${state} is outside 0..${HEXBIT_STATES - 1}`)
  return String.fromCodePoint(GLAGOLITIC_BASE + state)
}

/** glagoliticUnitOf(n) → Az..Zemlja for census units 1..BASE (glagolitic_units). */
export function glagoliticUnitOf(n: number): string {
  if (!Number.isInteger(n) || n < 1 || n > BASE)
    throw new Error(`hexbit: unit ${n} is outside Az..Zemlja 1..${BASE}`)
  return String.fromCodePoint(GLAGOLITIC_BASE + n - 1)
}

/** glagoliticNibbleOf(n) → page glyph for one address hex digit 0..15. */
export function glagoliticNibbleOf(n: number): string {
  return glagoliticOf(n)
}

/** 32 hexbits = 128 bits = one uuid, entire (`key_floor_is_one_uuid`: 32 * 4 = 128). */
export const UUID_HEXBITS = 32
export const UUID_BITS = UUID_HEXBITS * HEXBIT_BITS

/** the captain commission — two, and 128 / 2 = 64, the leverage the same theorem seals. */
export const COINS = 2
export const LEVERAGE = UUID_BITS / COINS
/** One address in bytes — UUID_BITS / (HEXBIT_BITS × COINS). Salt and Poly1305 tag are this wide. */
export const ADDRESS_BYTES = UUID_BITS / (HEXBIT_BITS * COINS)
/** Occupancy × fold: UUID_BITS × COINS. ChaCha key width, SHA-256 digest, 256 triangles. */
export const KEY_BITS = UUID_BITS * COINS
/** Key bytes — one per uuid hexbit (digest_doubles_the_address: 32 = 2 × 16). */
export const KEY_BYTES = UUID_HEXBITS
/** Key measured in hexbits — UUID_HEXBITS × COINS (key_floor_is_one_uuid: 256/4 = 64). */
export const KEY_HEXBITS = UUID_HEXBITS * COINS
/** Grover floor — KEY_BITS / COINS = one uuid (sha256_grover_margin_is_the_address). */
export const GROVER_FLOOR_BITS = UUID_BITS

/** sha256_is_four_sixtyfours — four 64s: HEXBIT_BITS × LEVERAGE = KEY_BITS. Cross-crypto occupancy.
 *  Hilbert 4×4 (message_cap_is_four_hexbits) is HEXBIT_BITS × HEXBIT_BITS qubits; that is not the fused message. */
export function sha256IsFourSixtyfours(): { boards: number; sixtyfours: number; bits: number; hexbits: number } {
  const boards = HEXBIT_BITS
  const sixtyfours = LEVERAGE
  return { boards, sixtyfours, bits: boards * sixtyfours, hexbits: KEY_HEXBITS }
}

/**
 * THE MASS GAP — a computed quantity of a discrete spectrum / Born field, never a pasted literal.
 *
 * Δ = least strictly-positive value present in the field (vacuum = 0). The gap holds when Δ > 0, vacuum and
 * excitation both occur, and nothing sits in (0, Δ). uuidna's QFT spectrum in the unit the machine writes —
 * not the Clay Millennium Yang–Mills prize. Court seals the hexbit ring + Bell Born field on Hexbit.lean.
 */
export interface MassGap {
  delta: number
  field: readonly number[]
  vacuum: boolean
  excitation: boolean
  holds: boolean
}
export type HexbitMassGap = MassGap & { states: number }

/** Derive Δ (and vacuum/excitation) from a discrete field — spectrum levels or Born weights. */
export const computeMassGap = (field: readonly number[]): MassGap => {
  let delta = 0
  let vacuum = false
  let excitation = false
  for (const a of field) {
    if (a === 0) vacuum = true
    else if (a > 0) {
      excitation = true
      if (delta === 0 || a < delta) delta = a
    }
  }
  let holds = delta > 0 && vacuum && excitation
  if (holds) for (const a of field) {
    if (!(a === 0 || delta <= a)) { holds = false; break }
  }
  return { delta, field, vacuum, excitation, holds }
}

/** The hexbit ring spectrum 0 .. HEXBIT_STATES−1 — Δ computed by walking, successive spacing checked. */
export const hexbitRingMassGap = (): HexbitMassGap => {
  const states = HEXBIT_STATES
  const field: number[] = []
  for (let n = 0; n < states; n++) field.push(n)
  const gap = computeMassGap(field)
  let holds = gap.holds
  for (let e = 1; e <= states; e++) if (!(gap.delta <= e)) holds = false
  for (let n = 0; n < states - 1; n++) if ((n + 1) - n !== gap.delta) holds = false
  return { ...gap, states, holds }
}

/** Alias: the unit's mass gap is the hexbit-ring computation. */
export const massGap = hexbitRingMassGap

/** Mass gap on Born weights — Δ computed from the field, never a default literal. */
export const bornFieldMassGap = (weights: readonly number[]): MassGap => computeMassGap(weights)

/** how many hexbits a space of `states` fills: the largest h with 16^h ≤ states. By division, never a log. */
export const hexbitsOf = (states: number): number => {
  // ONE MULTIPLY PER STEP. The first version divided — `(n - n % 16) / 16` — which is three operations a step,
  // so the 4x fewer steps a hexbit takes were spent paying for them: measured 9ms against the bit loop's 5ms
  // over 300k calls, slower in wall-clock while being four times fewer iterations. Climbing by powers of 16
  // instead costs one multiply, the same as the bit loop's step.
  //
  // BUT THE 4x DOES NOT SURVIVE TO THE CLOCK, and this line said it did until it was measured. The STEP ratio is
  // exactly 4.00x and scale-free — verified on the six widths above (16, 256, 4096, 65536, 2^20, 2^32): 23 steps
  // against 92, 4.00x on every single one. The WALL-CLOCK ratio is about 2x, and it is equally scale-free:
  // measured over four orders of magnitude on a BigInt climb, 1.92x at 2^79, 2.00x at 2^128, 2.02x at 2^512,
  // 2.04x at 2^4096. It is not call overhead diluting it — a bare call measures 3 ns. It is intrinsic: a ×16
  // step advances four bits but multiplies an operand that keeps growing, so what is saved is loop iterations,
  // never the bit-work. Four times fewer steps buys about twice the speed, and buys it permanently.
  let h = 0, p = 16
  while (p <= states) { p = p * 16; h++ }
  return h
}

/** the width of `states` in bits: the smallest b with 2^b ≥ states. By doubling, never a log. */
export const bitsOf = (states: number): number => {
  let b = 0, m = 1
  while (m < states) { m = m * 2; b++ }
  return b
}

/** bits → hexbits, floored: 256 bits is 64 hexbits, and Grover's 128-bit floor is 32 — one whole uuid. */
export const bitsToHexbits = (bits: number): number => (bits - (bits % HEXBIT_BITS)) / HEXBIT_BITS

/** a register of n qubits carries n bits of index, so its width in hexbits is the same division. */
export const qubitsToHexbits = (qubits: number): number => bitsToHexbits(qubits)

/** what remains of the uuid after a width is spent — the gravity reading, in one place. */
export const spareOf = (hexbits: number): number => UUID_HEXBITS - hexbits

/** HALF THE UUID — the coin width: a content-address folded to its top half. UUID / commission, never a stranded / 2. */
export const COIN_HEXBITS = UUID_HEXBITS / COINS

/** THE SAFE-INTEGER WIDTH IN WHOLE HEXBITS — largest h with HEXBIT_BITS·h sitting inside a double's 53-bit
 *  mantissa (safe_width_is_thirteen_hexbits). Walked, never a stranded 13: one more tile is 56 bits and rounds. */
const DOUBLE_MANTISSA = 53
export const SAFE_HEXBITS: number = (() => {
  let h = 0
  while (HEXBIT_BITS * (h + 1) <= DOUBLE_MANTISSA) h++
  return h
})()

/** EACH HANDLE HAS A VALUE, and it is not a metaphor: HANDLE_HEXBITS tiles read as one integer.
 *
 *  A handle spans HEXBIT_STATES ^ HANDLE_HEXBITS states, so its value is exactly its position in that space —
 *  the same reading for anyone. `seedOf` in src/handle.ts already computes it; this names what it means and
 *  places it, because a value with no scale is a number and not a value.
 *
 *  WHERE IT SITS decides what it can do. The value modulo the vortex ring (handle tiles plus origin) is the
 *  ring position, and that alone determines whether the doubling orbit carries the handle around the six units
 *  or traps it on the 3-6-9 axis: a value divisible by three is nilpotent and stays put, however far it
 *  doubles. So a handle's own bytes decide its path through the ledger, and nothing chooses it afterwards. */
export interface HandleValue { handle: string; value: number; span: number; residue: number; nilpotent: boolean; hexbits: number }
export type HexbitDoor = {
  handle: string
  hexbits: number[]
  door: string
  coin: number[]
  place: HandleValue
}

/** Handle width in hexbit tiles — the uuid divided by the tile, never a stranded 8. */
export const HANDLE_HEXBITS = UUID_HEXBITS / HEXBIT_BITS
/** Every value a handle can take — HEXBIT_STATES per tile, HANDLE_HEXBITS tiles. */
export const HANDLE_SPAN = HEXBIT_STATES ** HANDLE_HEXBITS

/** the same handle counted in BITS — HANDLE_HEXBITS tiles of HEXBIT_BITS. Here because it was the missing form:
 *  hardware/lanes needed a handle's WIDTH, hexbit exported only its SPAN, and so lanes computed the width itself
 *  and then the span from it. A unit with two definitions is not a standard. */
export const HANDLE_BITS = HANDLE_HEXBITS * HEXBIT_BITS
/** VE faces: triangular handle tiles plus square hexagram lines (ve_fourteen_faces). Never a freeze of 14. */
export const VE_FACES = HANDLE_HEXBITS + HEXBIT_BITS + COINS

/** the vortex ring the handle sits on — handle tiles plus origin (digit 0). Not imported from address.ts: that
 *  module already imports COIN_HEXBITS from here. */
export const RING = HANDLE_HEXBITS + 1

/** coins × width mod the ring — 2·8 ≡ 7, 2·7 ≡ 5, 2·5 ≡ 1, … the vortex. Without the captain coins the width
 *  does not fuse: the step is identity, not a walk. */
export function fuseWidth(width: number, contributed: number): number {
  if (contributed !== COINS) return width
  return (COINS * width) % RING
}

/** Walk w ↦ (coins · w) mod ring, coins checked at EVERY rung. A contribution that is not the two coins
 *  stops the walk — the hero will not fuse, the 7-ray will not open. Start HANDLE_HEXBITS → [8,7,5,1,2,4]. */
export function fuseLadder(start: number = HANDLE_HEXBITS, contributed: number = COINS): readonly number[] {
  const out: number[] = [start]
  let w = start
  for (;;) {
    if (contributed !== COINS) break
    const next = (COINS * w) % RING
    if (next === 0 || next === start) break
    out.push(next)
    w = next
    if (out.length > RING) break
  }
  return out
}

/** 2^rung by doubling, never a log — architectural capacity at that fuse residue. 2^7 = UUID_BITS. */
export function capacityAt(rung: number): number {
  let n = 1
  for (let i = 0; i < rung; i++) n = n * 2
  return n
}

/** nativeBitWidths(maxBits) → 1, 2, 4, … up to maxBits. uuidnaOS is native at every doubling from one bit to
 *  the width the architecture allows (default: one uuid, UUID_BITS). Doubling, never a log. */
export function nativeBitWidths(maxBits: number = UUID_BITS): readonly number[] {
  if (!Number.isInteger(maxBits) || maxBits < 1) throw new Error(`hexbit: ${maxBits} bits is not an architecture`)
  const out: number[] = []
  let w = 1
  for (;;) {
    out.push(w)
    if (w >= maxBits) return out
    const next = w + w
    if (next > maxBits) {
      out.push(maxBits)
      return out
    }
    w = next
  }
}

/** HEXBIT_STATES^hexbits — unique prefixes (or suffixes) of that tile width. HANDLE_SPAN is spanAt(HANDLE_HEXBITS). */
export function spanAt(hexbits: number): number {
  let n = 1
  for (let i = 0; i < hexbits; i++) n = n * HEXBIT_STATES
  return n
}

/** Unique slots of width 1..upTo. Leaves = full-width span. Shorter prefixes still occupy the store. */
export function prefixOccupancy(upTo: number = HANDLE_HEXBITS): {
  byWidth: readonly number[]
  shorter: number
  leaves: number
  stored: number
} {
  const byWidth: number[] = []
  let stored = 0
  for (let w = 1; w <= upTo; w++) {
    const s = spanAt(w)
    byWidth.push(s)
    stored += s
  }
  const leaves = byWidth[upTo - 1] ?? 0
  return { byWidth, shorter: stored - leaves, leaves, stored }
}

/** 2n by doubling — period-finding bit width for an n-bit modulus. */
export function periodBits(modulusBits: number): number {
  return modulusBits + modulusBits
}

/** Bits of N that fit when 2n qubits sit at or below the Hilbert 4×4 register. */
export function shorChunkBits(): number {
  const encoder = HEXBIT_BITS * HEXBIT_BITS
  return (encoder - (encoder % 2)) / 2
}

/** 32-bit (handle) and 128-bit (uuid) moduli: 2n hits the next named width (leverage, key). Encoder width is
 *  HEXBIT_BITS × HEXBIT_BITS — the Hilbert chunk whose 2n fills the register. Crypto occupancy is sha256IsFourSixtyfours. */
export interface ShorCapacityFit {
  handleModulusBits: number
  uuidModulusBits: number
  handlePeriodBits: number
  uuidPeriodBits: number
  encoderQubits: number
  chunkBits: number
  chunksOnHandle: number
  chunksOnUuid: number
  handleFits: boolean
  uuidFits: boolean
  encoderFitsChunk: boolean
}

export function shorCapacityFit(): ShorCapacityFit {
  const encoderQubits = HEXBIT_BITS * HEXBIT_BITS
  const chunkBits = shorChunkBits()
  const handleModulusBits = HANDLE_BITS
  const uuidModulusBits = UUID_BITS
  const handlePeriodBits = periodBits(handleModulusBits)
  const uuidPeriodBits = periodBits(uuidModulusBits)
  return {
    handleModulusBits,
    uuidModulusBits,
    handlePeriodBits,
    uuidPeriodBits,
    encoderQubits,
    chunkBits,
    chunksOnHandle: (handleModulusBits - (handleModulusBits % chunkBits)) / chunkBits,
    chunksOnUuid: (uuidModulusBits - (uuidModulusBits % chunkBits)) / chunkBits,
    handleFits: handlePeriodBits === LEVERAGE,
    uuidFits: uuidPeriodBits === KEY_BITS,
    encoderFitsChunk: periodBits(chunkBits) === encoderQubits,
  }
}

/** Encoder-width GHZ once per named chunk: 4 on the handle, 16 on the uuid. Physical CPU/GPU executes 2^n
 *  amplitudes per chunk; the uuid payload is that many independent chunks. */
export interface ShorFullUse {
  chunkBits: number
  chunkQubits: number
  chunkStates: number
  handleChunks: number
  uuidChunks: number
  handleStates: number
  uuidStates: number
}

export function shorFullUse(): ShorFullUse {
  const fit = shorCapacityFit()
  let chunkStates = 1
  for (let i = 0; i < fit.encoderQubits; i++) chunkStates = chunkStates * 2
  return {
    chunkBits: fit.chunkBits,
    chunkQubits: fit.encoderQubits,
    chunkStates,
    handleChunks: fit.chunksOnHandle,
    uuidChunks: fit.chunksOnUuid,
    handleStates: fit.chunksOnHandle * chunkStates,
    uuidStates: fit.chunksOnUuid * chunkStates,
  }
}

export const valueOf = (handle: string): HandleValue => {
  const value = parseInt(handle, 16)
  const residue = value % RING
  return { handle, value, span: HANDLE_SPAN, residue, nilpotent: residue % 3 === 0, hexbits: HANDLE_HEXBITS }
}

/** compileToHexbits(address) → COMPILE a content-address to its UUID_HEXBITS states, one per hex nibble —
 *  the unit's OWN address→states reading (moved here from quantum/os the day the hexbit finder flagged a
 *  `hexbits =` line computed outside the unit: if it is named a hexbit, the unit computes it — so the
 *  compiler that MAKES hexbit states lives where the law can see it). Every state 0..15 by construction. */
export const compileToHexbits = (address: string): number[] => {
  // ONE PASS OVER THE CHARACTER CODES, NO ALLOCATIONS BUT THE RESULT. The previous form read
  // `address.replace(/-/g, '').split('').map((c) => parseInt(c, 16))` — correct, and 1227 ns for 32 nibbles,
  // because it allocated a regex match, a fresh string, a 32-element array of one-character strings, and then
  // called parseInt 32 times on strings of length one. Measured against every other primitive in this tree it
  // was the SLOWEST operation of all, while the hexbit UNIT (hexbitsOf, 7 ns) was the fastest — and this sits on
  // the hot path of every MCP response, since hexbitDoorOf runs on each receipt.
  //
  // A hex nibble is arithmetic on a character code: '0'..'9' are 48..57, 'a'..'f' are 97..102, 'A'..'F' are
  // 65..70, and a dash (45) is skipped. Output is byte-identical to the old form — asserted over the whole
  // ledger in the test, including uppercase input and an address with no dashes at all.
  const out: number[] = []
  for (let i = 0; i < address.length; i++) {
    const c = address.charCodeAt(i)
    if (c >= 48 && c <= 57) out.push(c - 48)
    else if (c >= 97 && c <= 102) out.push(c - 87)
    else if (c >= 65 && c <= 70) out.push(c - 55)
    // anything else (the dashes) is not a nibble and is skipped, exactly as stripping them was
  }
  return out
}

/** hexbitDoorOf(receipt) → THE ONE door: handle, compiled states, permanent URL, coin slice, place on the ring. */
export function hexbitDoorOf(receipt: string): HexbitDoor {
  const handle = handleOf(receipt)
  const hexbits = compileToHexbits(receipt)
  return {
    handle,
    hexbits,
    door: `${HEXBIT_DOOR_HOST}/${handle}`,
    coin: hexbits.slice(0, COIN_HEXBITS),
    place: valueOf(handle),
  }
}

export type HexbitReceipt = HexbitDoor & { receipt: string }

/** hexbitReceipt(leaves) → merkle fold + door — one constructor for every desk receipt. */
export function hexbitReceipt(leaves: readonly string[]): HexbitReceipt {
  const receipt = merkleGravity(leaves)
  return { receipt, ...hexbitDoorOf(receipt) }
}

/** hexbitReceiptLanes(leaves, lanes?) → shard across VE_FACES lanes, fold each, fold lanes — no coordination. */
export function hexbitReceiptLanes(leaves: readonly string[], lanes = VE_FACES): HexbitReceipt & { lanes: number } {
  const buckets: string[][] = Array.from({ length: lanes }, () => [])
  for (const leaf of leaves) {
    buckets[laneOf(merkleGravity([leaf]), lanes)]!.push(leaf)
  }
  const laneRoots = buckets.map((b, i) => (b.length ? merkleGravity(b) : toUuid(`lane:${i}:empty`)))
  return { ...hexbitReceipt(laneRoots), lanes }
}

/** evidenceRow — one research/API attestation with its hexbit door. Lives next to hexbitDoorOf so handle.ts
 *  does not rebuild `https://uuidna.com/${handle}`. */
export function evidenceRow(source: string, address: string, note: string): {
  source: string; address: string; note: string
} & HexbitDoor {
  return { source, address, note, ...hexbitDoorOf(address) }
}
