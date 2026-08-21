#!/usr/bin/env node
// Automate the Lean layer for ALIGNMENT — which of this project's moduli tile a qubit and which waste it. PURE
// ARITHMETIC: every value is a power of two, a base, or a remainder; nothing is measured from the world.
//
// WHY. A uuid is written in hexadecimal and a qubit is one bit of exponent, so the two are the same substance: 16 =
// 2^4, and one hex character is EXACTLY four qubits with no remainder. That is why a uuid is a clean 128 and a handle
// a clean 32. The harmonic layer is not made of that substance — nine and ten are not powers of two, so a residue
// cannot be packed into qubits without loss. This wing decides the waste rather than leaving it implicit.
//
// WHERE IT BITES. The walk enters through seedOf, which reads eight hex characters as an integer and then reduces
// MOD TEN. A base-sixteen object, narrowed by a base-ten modulus: four qubits are spent naming ten states, so six of
// the sixteen go unused. Base sixteen's own digit invariant is mod 15 (Notation.lean: b ≡ 1 mod b−1), which wastes
// one. this decides the counting, never that one choice is better — the ledger deliberately walks ten
// DIGITS rather than nine residues, and that decision is recorded in sequence-run.ts with its own reason.
import { emit } from './lean-gen.js'

const MODULI = [9, 10, 15, 16]
const CELL = 16                              // one hex character, four qubits
const WASTE = MODULI.map((m) => CELL - m)
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'hexbit_is_four_qubits',
    why: 'A HEX CHARACTER IS EXACTLY FOUR QUBITS: 16 = 2^4, so the two measures tile with no remainder. This is why a uuid of 32 hex characters is a clean 128 bits and a handle of 8 is a clean 32.',
    js: () => 2 ** 4 === 16 && 32 * 4 === 128 && 8 * 4 === 32,
    lean: 'theorem hexbit_is_four_qubits : ((2:Nat)^4 = 16) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32) := by decide' },

  { key: 'moduli_waste_states',
    why: 'WHAT EACH MODULUS COSTS IN ONE FOUR-QUBIT CELL: sixteen wastes nothing, fifteen wastes one, ten wastes six, nine wastes seven. The walk enters through a mod-ten reduction, so six of every sixteen states go unused at the door.',
    js: () => JSON.stringify(MODULI.map((m) => CELL - m)) === JSON.stringify(WASTE),
    lean: `theorem moduli_waste_states : ${L(MODULI)}.map (fun m => 16 - m) = ${L(WASTE)} := by decide` },

  { key: 'sixteen_alone_tiles',
    why: 'ONLY SIXTEEN TILES THE CELL, and the others are named as failing: 16 leaves nothing over while 15, 10 and 9 each leave a remainder. A modulus tiles a qubit cell exactly when it IS the cell, and none of the harmonic moduli is.',
    js: () => { const w0: number = CELL - 16, rest = MODULI.filter((m) => m !== 16).map((m) => CELL - m); return w0 === 0 && rest.every((w) => w > 0) },
    lean: 'theorem sixteen_alone_tiles : (16 - 16 = 0) ∧ ([9,10,15].all (fun m => 16 - m > 0)) := by decide' },

  { key: 'ten_costs_more_than_fifteen',
    why: 'THE DOOR IS THE EXPENSIVE CHOICE: reducing mod ten wastes six of sixteen where the base\'s own invariant, fifteen, wastes one — six times the loss, on the same four qubits. SCOPE: this decides the counting only. The ledger walks ten DIGITS deliberately, because folding mod nine collapsed nine onto zero and made a tenth of the domain unreachable; that reason is recorded where the choice is made.',
    js: () => { const ten: number = CELL - 10, fifteen: number = CELL - 15; return ten !== fifteen && ten === 6 && fifteen === 1 && ten > fifteen },
    lean: 'theorem ten_costs_more_than_fifteen : (16 - 10 = 6) ∧ (16 - 15 = 1) ∧ (16 - 10 > 16 - 15) := by decide' },

  { key: 'powers_of_two_are_the_substance',
    why: 'THE ADDRESSING LAYER IS BUILT OF POWERS OF TWO — 16, 32, 128, 65536 are 2^4, 2^5, 2^7, 2^16 — while nine and ten are not powers of two at all, which the line proves by exhibiting the nearest ones on either side: 8 < 9 < 16 and 8 < 10 < 16.',
    js: () => 2 ** 4 === 16 && 2 ** 5 === 32 && 2 ** 7 === 128 && 2 ** 16 === 65536 && 8 < 9 && 9 < 16,
    lean: 'theorem powers_of_two_are_the_substance : ((2:Nat)^4 = 16 ∧ (2:Nat)^5 = 32 ∧ (2:Nat)^7 = 128 ∧ (2:Nat)^16 = 65536) ∧ ((2:Nat)^3 < 9 ∧ 9 < 2^4) ∧ ((2:Nat)^3 < 10 ∧ 10 < 2^4) := by decide' },

  { key: 'handle_discards_before_walking',
    why: 'AND THE DISCARD, COUNTED: a handle carries 32 qubits of span, the seed it becomes carries at most four, so 28 are dropped before the walk takes its first step. The line proves the subtraction and that the two are not equal — the walk sees an eighth of what the handle names.',
    js: () => { const h: number = 32, s: number = 4; return h !== s && h - s === 28 },
    lean: 'theorem handle_discards_before_walking : (32 - 4 = 28) ∧ (32 ≠ 4) ∧ (4 * 8 = 32) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Alignment.lean', skill: 'alignment', defs: '',
  header: 'ALIGNMENT — which moduli tile a qubit and which waste it.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
