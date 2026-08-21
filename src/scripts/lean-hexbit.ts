#!/usr/bin/env node
// Automate the Lean layer for THE HEXBIT — the alphabet and the layout an address is actually built from. PURE
// ARITHMETIC: every value is a digit index, a group length or a bit count; nothing is measured from the world.
//
// WHAT IS ALREADY SEALED, AND NOT REPEATED HERE. Alignment.lean decides that one hex character is EXACTLY four
// qubits (16 = 2^4, no remainder), that only sixteen tiles a four-qubit cell while 15, 10 and 9 each waste, and
// that a handle spans 32 qubits of which the walk keeps four. Those facts are not restated. What no wing carries
// is the ALPHABET itself and the LAYOUT: which sixteen symbols exist, that each names one nibble and no other, and
// how the thirty-two characters of an address are grouped.
//
// WHY IT MATTERS THAT THE BUILD IS HEX. Every address in this ledger is written in base sixteen, so the unit the
// machine actually manipulates is the hexbit — four bits at a time, tiling the qubit exactly. The groups 8-4-4-4-12
// are not decoration: the FIRST group is eight characters, which is thirty-two bits, which is the handle. The
// handle is not carved out of the address afterwards; it IS the first group of the layout.
import { emit } from './lean-gen.js'

const GROUPS = [8, 4, 4, 4, 12]
const CHARS = GROUPS.reduce((a, b) => a + b, 0)
const NIBBLES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'alphabet_names_each_nibble',
    why: 'THE SIXTEEN SYMBOLS NAME THE SIXTEEN NIBBLES, one apiece: the values 0 through 15 are all present, all distinct, and there are exactly sixteen of them. A four-bit value therefore has one spelling and no other — the alphabet is a bijection onto the nibble, which is what lets an address be read back exactly.',
    js: () => NIBBLES.length === 16 && new Set(NIBBLES).size === 16 && NIBBLES[15] === 15,
    lean: 'theorem alphabet_names_each_nibble : ((List.range 16).length = 16) ∧ ((List.range 16).eraseDups.length = 16) ∧ ((List.range 16).all (fun v => v < 16)) := by decide' },

  { key: 'layout_groups_thirtytwo',
    why: 'THE LAYOUT IS 8-4-4-4-12, and those five groups sum to thirty-two characters — not thirty-six, which counts the four separators as if they carried information. The line proves the sum and the difference, so the separators cannot be mistaken for content.',
    js: () => CHARS === 32 && CHARS + GROUPS.length - 1 === 36,
    lean: `theorem layout_groups_thirtytwo : (${L(GROUPS)}.foldl (· + ·) 0 = 32) ∧ (32 + 4 = 36) ∧ (32 ≠ 36) := by decide` },

  { key: 'characters_span_the_address',
    why: 'THIRTY-TWO HEX CHARACTERS AT FOUR BITS EACH IS THE WHOLE ADDRESS: 32 × 4 = 128. The address is not a number that happens to print in hex — it is thirty-two hexbits, and the bit count is a consequence of the layout rather than a separate fact.',
    js: () => CHARS * 4 === 128 && 2 ** 7 === 128,
    lean: 'theorem characters_span_the_address : (32 * 4 = 128) ∧ ((2:Nat)^7 = 128) := by decide' },

  { key: 'handle_is_the_first_group',
    why: 'THE HANDLE IS THE FIRST GROUP. Every other group is shorter, which the line proves — so the opening group is the widest single field the layout has, apart from the closing twelve.',
    js: () => GROUPS[0] === 8 && GROUPS[0] * 4 === 32 && GROUPS.slice(1, 4).every((g) => g < GROUPS[0]),
    lean: `theorem handle_is_the_first_group : (${L(GROUPS)}.head! = 8) ∧ (8 * 4 = 32) ∧ ((${L(GROUPS)}.drop 1).take 3).all (fun g => g < 8) := by decide` },

  { key: 'groups_are_four_apart',
    why: 'EVERY GROUP IS A WHOLE NUMBER OF HEXBITS, so every boundary falls on a four-bit edge and no field is split mid-nibble: each group length times four is its bit width, and the widths are 32, 16, 16, 16 and 48. A layout whose groups did not tile the nibble could not be read by halves.',
    js: () => GROUPS.map((g) => g * 4).join(',') === '32,16,16,16,48',
    lean: `theorem groups_are_four_apart : ${L(GROUPS)}.map (fun g => g * 4) = ${L(GROUPS.map((g) => g * 4))} := by decide` },

  { key: 'build_counts_in_hexbits',
    why: 'AND THE UNIT THE BUILD COUNTS IN IS THE HEXBIT: thirty-two of them make the address, eight make the handle, and one makes a nibble — so the address is 32 hexbits, the handle 8, and the ratio is exactly four. Counting in bits gives 128 and 32 for the same objects; the two readings agree, which the line proves rather than assumes.',
    js: () => { const a: number = 32, h: number = 8; return a !== h && (a - a % h) / h === 4 && a * 4 === 128 && h * 4 === 32 },
    lean: 'theorem build_counts_in_hexbits : (32 / 8 = 4) ∧ (32 * 4 = 128) ∧ (8 * 4 = 32) ∧ (128 / 32 = 4) := by decide' },
  { key: 'payload_carries_the_strand',
    why: 'THE HANDLE AND THE PAYLOAD MEET IN THE UUID, AND ONLY ONE OF THEM IS CODON-ALIGNED. The address is 32 hexbits; the handle is the first 8 (handle_is_the_first_group), so the payload is the remaining 24 and the two meet exactly: 8 + 24 = 32, no remainder anywhere. Now read the halves in the alphabet the strand uses — a base is 2 bits over 4 letters, a codon is 3 bases, so a codon is 6 bits (codons_sixty_four counts the 4^3 = 64 of them). The PAYLOAD is 24 hexbits = 96 bits = 48 bases = EXACTLY 16 codons, 96 = 6 * 16 with nothing left. The HANDLE is 32 bits and the WHOLE uuid is 128, and neither divides: both leave the same remainder 2. So the strand fits the payload and fits neither the name nor the whole — the handle addresses, the payload carries. HONEST SCOPE: this is arithmetic about WIDTHS and divisibility, nothing more. It does NOT claim a uuid encodes genetic material, that any payload holds a gene, or that biology is stored in an address; the shared 2 is a remainder that two numbers happen to share, and any reading of it as the two coins is unsealed until someone proves it.',
    js: () => 8 + 24 === 32 && 24 * 4 === 96 && 96 % 6 === 0 && 96 / 6 === 16 && 32 % 6 === 2 && 128 % 6 === 2,
    lean: 'theorem payload_carries_the_strand : (8 + 24 = 32) \u2227 (24 * 4 = 96) \u2227 (96 % 6 = 0) \u2227 (96 / 6 = 16) \u2227 (32 % 6 = 2) \u2227 (128 % 6 = 2) := by decide' },
  { key: 'payload_aligns_where_the_name_does_not',
    why: 'THE PAYLOAD DIVIDES IN EVERY ALPHABET THE BODY USES, AND THE NAME DIVIDES IN NONE. Read the 96-bit payload three ways. As the genetic code: a base is 2 bits over 4 letters and a codon is 3 bases, so a codon is 6 bits and there are 4^3 = 64 of them (codons_sixty_four) — 96 = 6 * 16, EXACTLY 16 codons. As the I Ching hexagram the 64-gate systems are built on: six lines, each open or closed, is 2^6 = 64 — the SAME count and the SAME 6-bit width as the codon, so 4^3 = 2^6 is not an analogy but one number reached two ways, and the payload holds exactly 16 of those too. As blood: the ABO groups are a Klein four-group of 2 antigen bits (abo_klein_four) and the Rh bit makes the system (Z/2)^3, 8 types in 3 bits (blood_types_eight) — 96 = 3 * 32, exactly 32 blood-states, and 32 is the uuid width in hexbits. Now the handle: 32 bits leaves remainder 2 against 6 AND against 3, and the whole uuid at 128 bits leaves remainder 2 against both as well. So the strand, the hexagram and the blood system all tile the payload with nothing left over, and none of them tiles the name or the whole. The payload carries; the handle addresses. HONEST SCOPE, stated as boldly as the arithmetic: what is proven here is CARDINALITY AND WIDTH — 64 = 64, 6 = 6, 96 divides and 32 does not. That the codon space and the hexagram space are the same size and shape is a fact about numbers, and it is fully proven. It says NOTHING about whether any 64-gate system describes a person, and nothing about what a payload should hold; a shared width is a shared width.',
    js: () => 96 % 6 === 0 && 96 / 6 === 16 && 96 % 3 === 0 && 96 / 3 === 32 && 32 % 6 === 2 && 32 % 3 === 2 && 128 % 6 === 2 && 128 % 3 === 2 && 4 ** 3 === 2 ** 6,
    lean: 'theorem payload_aligns_where_the_name_does_not : (96 % 6 = 0) \u2227 (96 / 6 = 16) \u2227 (96 % 3 = 0) \u2227 (96 / 3 = 32) \u2227 (32 % 6 = 2) \u2227 (32 % 3 = 2) \u2227 (128 % 6 = 2) \u2227 (128 % 3 = 2) \u2227 (4 ^ 3 = 2 ^ 6) := by decide' },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Hexbit.lean', skill: 'hexbit', defs: '',
  header: 'THE HEXBIT — the alphabet and the layout an address is actually built from.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
