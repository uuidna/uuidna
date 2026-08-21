// hexbit — THE UNIT, COMPUTED ONCE FROM THE CAPTAIN THEOREM.
//
// Every width in this ledger is a hexbit width. A hexbit is 4 bits and 16 states; thirty-two of them are one
// uuid, 128 bits entire; and the commission is two, so 128 / 2 = 64 — the leverage, from either side. That is
// `captain_coins_unlock_the_uuid`, and this module is nothing but that theorem made callable: the constants are
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

/** 32 hexbits = 128 bits = one uuid, entire (`captain_coins_unlock_the_uuid`: 32 * 4 = 128). */
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
