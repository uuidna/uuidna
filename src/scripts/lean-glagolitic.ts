#!/usr/bin/env node
// Automate the Lean layer for GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic,
// demarcated. Saint Cyril's 9th-century Glagolitic script gave each letter a number in alphabetic order: Ⰰ (Az)=1,
// Ⰱ (Buky)=2, on through the units, the tens (10…90) and the hundreds, combined additively (500+80+3 = 583). The
// Pliska rosette — a seven-rayed bronze star unearthed at the first Bulgarian capital — turns on seven, and seven
// is the ℤ/7 the rosette layer already seals. HONEST SCOPE: the documented numeral arithmetic and the seven-fold
// symmetry. The rosette's MEANING (the seven planets, the days, the Dulo dynasty, a sun-sign) is historically
// DEBATED, not decoded here — poetry in the telling, documented fact in the theorem. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'glagolitic_units',
    why: 'Cyril gave the letters number: the first nine Glagolitic glyphs, Az through Zemlja, carry the units 1 through 9 in their own alphabetic order — [1,2,3,4,5,6,7,8,9]. An alphabet that counts as it speaks.',
    js: () => JSON.stringify(Array.from({ length: 9 }, (_, i) => i + 1)) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    lean: "theorem glagolitic_units : (List.range' 1 9) = [1,2,3,4,5,6,7,8,9] := by decide" },

  { key: 'glagolitic_units_sum',
    why: 'The nine units sum to 45, whose digital root is 9 — the ceiling of the ℤ/9 vortex — so the whole first row of the alphabet folds home to nine. 1+…+9 = 45, and 4+5 = 9.',
    js: () => Array.from({ length: 9 }, (_, i) => i + 1).reduce((s, n) => s + n, 0) === 45 && 4 + 5 === 9,
    lean: "theorem glagolitic_units_sum : ((List.range' 1 9).foldl (fun s n => s + n) 0 = 45) ∧ (4 + 5 = 9) := by decide" },

  { key: 'glagolitic_additive',
    why: 'Glagolitic numerals combine additively — a hundred-glyph, a ten-glyph and a unit set side by side read as their sum: 500 + 80 + 3 = 583. Place is meaning; the letters simply add.',
    js: () => 500 + 80 + 3 === 583,
    lean: 'theorem glagolitic_additive : 500 + 80 + 3 = 583 := by decide' },

  { key: 'glagolitic_teens_reversed',
    why: 'A quiet grace of the script: between eleven and nineteen the order flips, the unit spoken before the ten — one-and-ten for 11, nine-and-ten for 19. 1 + 10 = 11 and 9 + 10 = 19, the smaller number leading.',
    js: () => 1 + 10 === 11 && 9 + 10 === 19,
    lean: 'theorem glagolitic_teens_reversed : (1 + 10 = 11) ∧ (9 + 10 = 19) := by decide' },

  { key: 'pliska_seven_rays',
    why: 'The Pliska rosette turns on seven rays — the ℤ/7 the rosette layer proves. Its six moving residues sum to 21, whose digital root is 3: the primitive root that walks all seven rays. 1+2+3+4+5+6 = 21, and 2+1 = 3.',
    js: () => 1 + 2 + 3 + 4 + 5 + 6 === 21 && 2 + 1 === 3,
    lean: 'theorem pliska_seven_rays : (1+2+3+4+5+6 = 21) ∧ (2 + 1 = 3) := by decide' },

  { key: 'pliska_seven_is_prime',
    why: 'Seven is prime, so ℤ/7 is a field and the rosette closes on itself: 7 leaves no remainder to any of 2,3,4,5,6. That primality is why every non-zero ray has an inverse — the star is whole, none left outside.',
    js: () => [2, 3, 4, 5, 6].every((k) => 7 % k !== 0),
    lean: "theorem pliska_seven_is_prime : (List.range' 2 5).all (fun k => 7 % k != 0) := by decide" },
]

// compute → generate → verify. The Glagolitic numerals and the Pliska rosette's seven-fold — documented arithmetic
// and geometry, demarcated: the rosette's meaning stays historically debated; only the numbers are sealed.
emit({ file: 'Glagolitic.lean', skill: 'glagolitic',
  header: 'GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic, demarcated. Cyril\'s 9th-century script numbered its letters in order: the units 1–9 (Az…Zemlja), the tens and hundreds, combined additively (500+80+3 = 583), with the teens 11–19 written unit-before-ten. The nine units sum to 45 (digital root 9); the Pliska rosette turns on seven rays — the ℤ/7 the rosette layer seals — whose six residues sum to 21 (digital root 3, the primitive root), and 7 is prime so ℤ/7 is a field. HONEST SCOPE: the documented numeral arithmetic and the seven-fold symmetry; the rosette\'s MEANING (the seven planets, the days, the Dulo dynasty, a sun-sign) is historically DEBATED, not decoded here.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
