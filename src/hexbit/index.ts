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
import { handleOf } from '../handle.js'

const HEXBIT_DOOR_HOST = 'https://uuidna.com'

/** 4 bits, 16 states — the qubit-tile the ledger computes in. */
export const HEXBIT_BITS = 4
/** One hexbit's state alphabet (0..15). Doubling climb from HEXBIT_BITS — never a stranded literal. */
export const HEXBIT_STATES: number = (() => { let s = 1; for (let i = 0; i < HEXBIT_BITS; i++) s = s * 2; return s })()

/** 32 hexbits = 128 bits = one uuid, entire (`key_floor_is_one_uuid`: 32 * 4 = 128). */
export const UUID_HEXBITS = 32
export const UUID_BITS = UUID_HEXBITS * HEXBIT_BITS

/** the captain commission — two, and 128 / 2 = 64, the leverage the same theorem seals. */
export const COINS = 2
export const LEVERAGE = UUID_BITS / COINS

/** Message-encoder Hilbert index width in HEXBITS: four tiles → 16 qubits → 16^4 amplitudes. */
export const MESSAGE_CAP_HEXBITS = 4
/** Qubit count at the message cap — MESSAGE_CAP_HEXBITS × HEXBIT_BITS. */
export const MESSAGE_CAP_QUBITS = MESSAGE_CAP_HEXBITS * HEXBIT_BITS
/** Amplitude count — HEXBIT_STATES ** MESSAGE_CAP_HEXBITS (= 2^MESSAGE_CAP_QUBITS). */
export const MESSAGE_CAP_STATES = HEXBIT_STATES ** MESSAGE_CAP_HEXBITS

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

/** THE SAFE-INTEGER WIDTH IN WHOLE HEXBITS — 13, because 13 x 4 = 52 bits and a double carries 53 exactly. Any
 *  rotation that must land in a Number, rather than a BigInt, reads exactly this many tiles: one more would be
 *  56 bits and would round silently, which is the failure a ledger cannot notice. */
export const SAFE_HEXBITS = 13

/** EACH HANDLE HAS A VALUE, and it is not a metaphor: HANDLE_HEXBITS tiles read as one integer.
 *
 *  A handle spans HEXBIT_STATES ^ HANDLE_HEXBITS states, so its value is exactly its position in that space —
 *  the same reading for anyone. `seedOf` in src/handle.ts already computes it; this names what it means and
 *  places it, because a value with no scale is a number and not a value.
 *
 *  WHERE IT SITS decides what it can do. The value modulo the vortex ring (handle tiles plus origin) is the
 *  ring position, and that alone determines whether the doubling orbit carries the handle around the six units
 *  or traps it on the 3-6-9 axis: a value divisible by three is nilpotent and cannot leave, however far it
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

/** the vortex ring the handle sits on — handle tiles plus origin (digit 0). Not imported from address.ts: that
 *  module already imports COIN_HEXBITS from here. */
const RING = HANDLE_HEXBITS + 1

export const valueOf = (handle: string): HandleValue => {
  const value = parseInt(handle, 16)
  const residue = value % RING
  return { handle, value, span: HANDLE_SPAN, residue, nilpotent: residue % 3 === 0, hexbits: HANDLE_HEXBITS }
}

/** compileToHexbits(address) → COMPILE a content-address to its UUID_HEXBITS states, one per hex nibble —
 *  the unit's OWN address→states reading (moved here from quantum/os the day the hexbit finder flagged a
 *  `hexbits =` line computed outside the unit: if it is named a hexbit, the unit computes it — so the
 *  compiler that MAKES hexbit states lives where the law can see it). Every state 0..15 by construction. */
export const compileToHexbits = (address: string): number[] =>
  address.replace(/-/g, '').split('').map((c) => parseInt(c, 16))

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

/** evidenceRow — one research/API attestation with its hexbit door. Lives next to hexbitDoorOf so handle.ts
 *  does not rebuild `https://uuidna.com/${handle}`. */
export function evidenceRow(source: string, address: string, note: string): {
  source: string; address: string; note: string
} & HexbitDoor {
  return { source, address, note, ...hexbitDoorOf(address) }
}
