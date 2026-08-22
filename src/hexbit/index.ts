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

/** 4 bits, 16 states — the qubit-tile the ledger computes in. */
export const HEXBIT_BITS = 4

/** 32 hexbits = 128 bits = one uuid, entire (`key_floor_is_one_uuid`: 32 * 4 = 128). */
export const UUID_HEXBITS = 32
export const UUID_BITS = UUID_HEXBITS * HEXBIT_BITS

/** the captain commission — two, and 128 / 2 = 64, the leverage the same theorem seals. */
export const COINS = 2
export const LEVERAGE = UUID_BITS / COINS

/** how many hexbits a space of `states` fills: the largest h with 16^h ≤ states. By division, never a log. */
export const hexbitsOf = (states: number): number => {
  // ONE MULTIPLY PER STEP. The first version divided — `(n - n % 16) / 16` — which is three operations a step,
  // so the 4x fewer steps a hexbit takes were spent paying for them: measured 9ms against the bit loop's 5ms
  // over 300k calls, slower in wall-clock while being four times fewer iterations. Climbing by powers of 16
  // instead costs one multiply, the same as the bit loop's step, and the 4x advantage survives to the clock.
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

/** HALF THE UUID — 16 hexbits, 64 bits. The coin width: a content-address folded to its top half, which is what
 *  a coin is and why it is called a 64-bit coin. Computed here so the two places that mint one stop agreeing by
 *  literal. */
export const COIN_HEXBITS = UUID_HEXBITS / 2

/** THE SAFE-INTEGER WIDTH IN WHOLE HEXBITS — 13, because 13 x 4 = 52 bits and a double carries 53 exactly. Any
 *  rotation that must land in a Number, rather than a BigInt, reads exactly this many tiles: one more would be
 *  56 bits and would round silently, which is the failure a ledger cannot notice. */
export const SAFE_HEXBITS = 13

/** EACH HANDLE HAS A VALUE, and it is not a metaphor: eight hexbits read as one integer.
 *
 *  A handle spans 16^8 = 2^32 states, so its value is exactly its position in that space — 0 through
 *  4,294,967,295, no rounding, the same reading for anyone. `seedOf` in src/handle.ts already computes it; this
 *  names what it means and places it, because a value with no scale is a number and not a value.
 *
 *  WHERE IT SITS decides what it can do. The value modulo 9 is the ring position, and that alone determines
 *  whether the doubling orbit carries the handle around the six units or traps it on the 3-6-9 axis: a value
 *  divisible by three is nilpotent and cannot leave, however far it doubles. So a handle's own bytes decide its
 *  path through the ledger, and nothing chooses it afterwards. */
export interface HandleValue { handle: string; value: number; span: number; residue: number; nilpotent: boolean; hexbits: number }

export const HANDLE_HEXBITS = 8
export const HANDLE_SPAN = 16 ** HANDLE_HEXBITS      // 2^32 — every value a handle can take

export const valueOf = (handle: string): HandleValue => {
  const value = parseInt(handle, 16)
  const residue = value % 9
  return { handle, value, span: HANDLE_SPAN, residue, nilpotent: residue % 3 === 0, hexbits: HANDLE_HEXBITS }
}
