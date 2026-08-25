#!/usr/bin/env node
// Automate the Lean layer for THE COLOUR AS SIX HEXBITS — the spectrum sized in the unit the machine writes it in.
// PURE ARITHMETIC: every value is a channel level, a bit count or a divisor.
//
// THE UNIT IS THE HEXBIT. A colour is written #RRGGBB — six hex characters at four bits each, so 24 bits and
// 16^6 = 2^24 colours, the two readings landing on one number. Each channel is TWO hexbits: one byte, 256 levels,
// and 3 x 8 = 24 closes the account. Alignment.lean decides that a hexbit is exactly four qubits with no remainder,
// which is why a colour tiles cleanly and a residue does not.
//
// AND THE SPECTRUM DOES NOT DIVIDE BY SIXTEEN. 360 / 16 = 22.5 is not an integer, so a hue wheel cut into sixteen
// equal steps cannot land on whole degrees. It divides by NINE (a step of forty degrees, the one the aura already
// walks) and by SIX (sixty degrees, the primary/secondary sextant). So the colour's STORAGE is hexadecimal while its
// GEOMETRY is ninefold and sixfold — the same split Notation.lean decides between a base-sixteen address and a
// base-ten harmonic reading, appearing again one layer up.
//
// THE DEGREES HERE ARE DIVISORS, NOT READINGS — said plainly because a degree LOOKS like a measurement. Three
// hundred and sixty is the whole-turn convention a hue wheel is drawn on, and every figure below is that convention
// divided by an integer: forty is 360/9 and sixty is 360/6, arrived at by division and by nothing else. No
// wavelength, no luminance, no chromaticity and no perceptual quantity is asserted anywhere in this wing, so it
// names no colour standard and no measuring body, because it owes none. What a hue ANGLE looks like to an eye is
// colorimetry's question and stays outside the kernel; what divides three hundred and sixty is the kernel's.
import { emit } from './lean-gen.js'

const DIVISORS = Array.from({ length: 20 }, (_, i) => i + 1).filter((d) => 360 % d === 0)
const L = (xs: number[]) => '[' + xs.join(',') + ']'

const FACTS = [
  { key: 'colour_is_six_hexbits',
    why: 'A COLOUR IS SIX HEX CHARACTERS: #RRGGBB at four bits each is 24 bits, and 16^6 equals 2^24 exactly — the hexadecimal reading and the binary reading are one number, 16777216 colours.',
    js: () => 6 * 4 === 24 && 16 ** 6 === 2 ** 24 && 16 ** 6 === 16777216,
    lean: 'theorem colour_is_six_hexbits : (6 * 4 = 24) ∧ ((16:Nat)^6 = (2:Nat)^24) ∧ ((16:Nat)^6 = 16777216) := by decide' },

  { key: 'channel_is_two_hexbits',
    why: 'EACH CHANNEL IS TWO HEXBITS — one byte, 256 levels — and three channels of eight bits close the twenty-four. The colour is not a number that prints in hex; it is three bytes, and the hex is how a byte is spelled.',
    js: () => 2 * 4 === 8 && 2 ** 8 === 256 && 3 * 8 === 24 && 3 * 2 === 6,
    lean: 'theorem channel_is_two_hexbits : (2 * 4 = 8) ∧ ((2:Nat)^8 = 256) ∧ (3 * 8 = 24) ∧ (3 * 2 = 6) := by decide' },

  { key: 'greys_are_one_in_sixtyfive_thousand',
    why: 'THE GREYS ARE THE DIAGONAL: red, green and blue equal gives 256 colours out of 16777216 — one in 65536, which is 2^16. Two of the three channels carry no information on that diagonal, and the line proves the ratio rather than describing it.',
    js: () => 16 ** 6 / 256 === 65536 && 2 ** 16 === 65536,
    lean: 'theorem greys_are_one_in_sixtyfive_thousand : ((16:Nat)^6 / 256 = 65536) ∧ ((2:Nat)^16 = 65536) ∧ (256 * 65536 = 16777216) := by decide' },

  { key: 'shorthand_covers_one_in_four_thousand',
    why: 'THE THREE-DIGIT SHORTHAND #RGB EXPANDS EACH CHARACTER TWICE, so it reaches 16^3 = 4096 colours — one in 4096 of the full space. A palette written in shorthand is not a small notation for all colours; it is a notation for a sixteen-thousandth of them.',
    js: () => 16 ** 3 === 4096 && 16 ** 6 / 16 ** 3 === 4096,
    lean: 'theorem shorthand_covers_one_in_four_thousand : ((16:Nat)^3 = 4096) ∧ ((16:Nat)^6 / (16:Nat)^3 = 4096) ∧ ((16:Nat)^3 * 4096 = 16777216) := by decide' },

  { key: 'spectrum_refuses_sixteen',
    why: 'THE HUE WHEEL DOES NOT DIVIDE BY SIXTEEN: 16 x 22 = 352 and 16 x 23 = 368 straddle 360, so no whole-degree step cuts the circle into sixteen. It divides by NINE at forty degrees and by SIX at sixty — the storage is hexadecimal while the geometry is not, and the line proves the failure rather than leaving it implied. Every degree named here is the whole-turn convention divided by an integer, not a quantity anyone observed.',
    js: () => 16 * 22 < 360 && 360 < 16 * 23 && 360 % 9 === 0 && 360 % 6 === 0,
    lean: 'theorem spectrum_refuses_sixteen : (16 * 22 < 360) ∧ (360 < 16 * 23) ∧ (360 % 9 = 0) ∧ (360 % 6 = 0) ∧ (360 % 16 ≠ 0) := by decide' },

  { key: 'wheel_divides_by_nine_and_six',
    why: 'THE DIVISORS THE WHEEL ADMITS below twenty are 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20 — nine and six among them, sixteen not. Forty degrees is the ninefold step the aura already walks, sixty the sextant of primaries and secondaries.',
    js: () => JSON.stringify(DIVISORS) === JSON.stringify([1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20]) && 360 / 9 === 40 && 360 / 6 === 60,
    lean: `theorem wheel_divides_by_nine_and_six : (((List.range' 1 20).filter (fun d => 360 % d == 0)) = ${L(DIVISORS)}) ∧ (360 / 9 = 40) ∧ (360 / 6 = 60) := by decide` },
]

for (const f of FACTS) if (!f.js()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'SpectrumHex.lean', skill: 'spectrum-hex', defs: '',
  header: 'THE COLOUR AS SIX HEXBITS — the spectrum sized in the unit the machine writes it in.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
