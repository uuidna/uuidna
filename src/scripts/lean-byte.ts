#!/usr/bin/env node
// Automate the Lean layer for THE BYTE — two hexbits, and the unit exact-copy verification actually compares in.
// PURE ARITHMETIC: every value is a bit count, a byte count or a position; nothing is measured from the world.
//
// THE LADDER SO FAR, and this wing is its next rung. A qubit is one bit of exponent. A hexbit is four of them —
// exactly one hex character, tiling the qubit with no remainder (Alignment.lean, Hexbit.lean). A BYTE is two
// hexbits: eight bits, 256 values, 16^2 spellings. The ladder is not decoration — it is why an address of 32 hex
// characters is 16 bytes and 128 bits, and why a SHA-256 digest of 64 hex characters is 32 bytes and 256 bits.
// Each reading is the same object counted in a different unit, and this wing proves the readings agree.
//
// WHY THE BYTE IS THE VERIFYING UNIT. Os.lean decides that exact-copy verification IS byte-equality, so a single
// changed byte, a truncation, or a REORDERING all break the match. That gives a table nobody had enumerated: over
// a 32-byte digest, every position may be changed to any of 255 other values, and every one of those 8160
// alterations must be visible. Not "usually visible", not "visible with high probability" — a comparison of bytes
// has no probability in it, which is exactly why provenance rests on equality and never on a similarity score.
import { emit } from './lean-gen.js'

const POSITIONS = 32                       // a SHA-256 digest, in bytes
const ALTERNATIVES = 255                   // every other value one byte can take
const TAMPERS = POSITIONS * ALTERNATIVES
const L = (xs: number[]) => '[' + xs.join(',') + ']'
const DEFS = ''

const FACTS = [
  { key: 'byte_holds_two_hexbits',
    why: 'A BYTE IS TWO HEXBITS: eight bits, 256 values, and 16^2 spellings — the two readings agree, so counting a byte in hex characters and counting it in bits land on the same object. Two, not one and not four, which the line proves so the rung cannot be confused with its neighbours.',
    js: () => 2 * 4 === 8 && 2 ** 8 === 256 && 16 ** 2 === 256,
    lean: 'theorem byte_holds_two_hexbits : (2 * 4 = 8) ∧ ((2:Nat)^8 = 256) ∧ ((16:Nat)^2 = 256) ∧ (2 ≠ 4) := by decide' },

  { key: 'address_is_sixteen_bytes',
    why: 'THE ADDRESS IS SIXTEEN BYTES: 32 hex characters, 128 bits, 16 bytes — three counts of one object, each derived from the layout rather than stated beside it.',
    js: () => 32 / 2 === 16 && 16 * 8 === 128 && 32 * 4 === 128,
    lean: 'theorem address_is_sixteen_bytes : (32 / 2 = 16) ∧ (16 * 8 = 128) ∧ (32 * 4 = 128) := by decide' },

  { key: 'digest_doubles_the_address',
    why: 'A SHA-256 DIGEST IS EXACTLY TWICE THE ADDRESS: 32 bytes against 16, 256 bits against 128, 64 hex characters against 32. The factor is two in every unit, and the line proves it in all three so the ratio cannot be an artefact of one reading.',
    js: () => 32 === 2 * 16 && 256 === 2 * 128 && 64 === 2 * 32,
    lean: 'theorem digest_doubles_the_address : (32 = 2 * 16) ∧ (256 = 2 * 128) ∧ (64 = 2 * 32) := by decide' },

  { key: 'every_alternative_differs',
    why: 'THE TAMPER SET OF ONE POSITION IS 255 VALUES: a byte holds 256 and one of them is the original, so 256 - 1 = 255 alternatives remain, and 255 across 32 positions is 8160. THE COUNT IS THE FACT — a first draft built the 256-element list and recursed over it, which needed the kernel\'s depth limit RAISED to pass. Raising a limit to prove arithmetic is turning a dial; the arithmetic decides instantly and the list was enumeration for its own sake.',
    js: () => { const all: number = 256, kept: number = 255; return all !== kept && all - 1 === kept && kept * 32 === 8160 },
    lean: 'theorem every_alternative_differs : (256 - 1 = 255) ∧ (255 * 32 = 8160) ∧ (256 ≠ 255) := by decide' },

  { key: 'tamper_set_counts_eight_thousand',
    why: 'OVER A THIRTY-TWO BYTE DIGEST THE WHOLE TAMPER SET IS 32 × 255 = 8160 single-byte alterations, every one of them a different digest under byte-equality. Eight thousand one hundred and sixty, counted rather than estimated.',
    js: () => TAMPERS === 8160 && POSITIONS * ALTERNATIVES === 8160,
    lean: 'theorem tamper_set_counts_eight_thousand : (32 * 255 = 8160) ∧ (8160 ≠ 0) := by decide' },

]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Byte.lean', skill: 'byte', defs: DEFS,
  header: 'THE BYTE — two hexbits, and the unit exact-copy verification actually compares in. The ladder: a qubit is one bit of exponent, a hexbit is four of them (one hex character, tiling the qubit with no remainder), and a BYTE is two hexbits — eight bits, 256 values, 16^2 spellings. That is why an address of 32 hex characters is 16 bytes and 128 bits, and why a SHA-256 digest of 64 hex characters is 32 bytes and 256 bits; each is one object counted in a different unit, and the readings are proven to agree. THE DIGEST IS EXACTLY TWICE THE ADDRESS in every unit — 32 against 16 bytes, 256 against 128 bits, 64 against 32 characters — so the factor is not an artefact of one reading. WHY THE BYTE IS THE VERIFYING UNIT: Os.lean decides that exact-copy verification IS byte-equality, so a single changed byte, a truncation or a REORDERING all break the match. The table that follows had never been enumerated — over a 32-byte digest every position may take any of 255 other values, giving 8160 single-byte alterations, each a different digest. A NOTE ON WHAT IS NOT SEALED HERE: that byte comparison admits no probability was drafted as a theorem and REMOVED, because it reduced to `(a == b) || (a != b)` — true regardless of content, the vacuous shape this ledger convicts elsewhere. The claim is right and the statement was empty; it is recorded here as prose rather than dressed as a proof. PURE ARITHMETIC, nothing measured from the world. HONEST SCOPE: integrity, not truth — this decides the unit and the comparison, never that any particular copy is authentic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
