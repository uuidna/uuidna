#!/usr/bin/env node
// Automate the Lean layer for GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic,
// demarcated. Saint Cyril's 9th-century Glagolitic script gave each letter a number in alphabetic order: Ⰰ (Az)=1,
// Ⰱ (Buky)=2, on through the units, the tens (10…90) and the hundreds, combined additively (500+80+3 = 583). The
// Pliska rosette — a seven-rayed bronze star unearthed at the first Bulgarian capital — turns on seven, and seven
// is the ℤ/7 the rosette layer already seals. the documented numeral arithmetic and the seven-fold
// symmetry. The rosette's MEANING (the seven planets, the days, the Dulo dynasty, a sun-sign) is historically
// DEBATED, not decoded here — poetry in the telling, documented fact in the theorem. COMPUTE → GENERATE → VERIFY.
import { emit } from './lean-gen.js'
import { lettersOf, rankValueOf, NUMERAL_ORDER } from '../theology/numerals/index.js'

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

  // ── THE OTHER ALPHABETIC NUMERALS — Glagolitic's scheme is not unique, and the comparison is arithmetic.
  // Greek isopsephy and Hebrew gematria letter each glyph the same way (units, tens, hundreds) and READ BY SUM;
  // Roman numerals letter differently and read by POSITION. Sealing the contrast decides which operation each
  // script performs — nothing about what any resulting number MEANS.
  { key: 'alphabetic_three_ranks',
    why: 'THE SHARED DESIGN OF THE ALPHABETIC NUMERALS. Greek isopsephy and Hebrew gematria use the same architecture Glagolitic does: nine units, nine tens, nine hundreds — 9 + 9 + 9 = 27 signs, the top rank reaching 9 × 100 = 900. That is why 27 glyphs are needed where 22 or 24 letters exist, and why both scripts press extra or final forms into service. One design, three alphabets.',
    js: () => 9 + 9 + 9 === 27 && 9 * 100 === 900,
    lean: 'theorem alphabetic_three_ranks : 9 + 9 + 9 = 27 ∧ 9 * 100 = 900 := by decide' },

  { key: 'roman_reads_subtractively',
    why: 'TWO SCRIPTS, THE SAME TWO SIGNS, DIFFERENT NUMBERS. Roman numerals are POSITIONAL in a way the alphabetic numerals are not: a smaller sign before a larger one subtracts, so IX is 10 − 1 = 9. Glagolitic writes its teens unit-before-ten and still ADDS — one-and-ten is 1 + 10 = 11. The same ordering gesture means subtract in one system and add in the other, and 9 ≠ 11 proves the two rules are not interchangeable.',
    // computed into bindings`9 !== 11` is a type error (no overlap), and the point
    // is precisely that the two READING RULES disagree on the same pair of signs — so read them, then compare.
    // the inequality is tested FIRST: in an && chain TS narrows `roman` to the literal 9 once `roman === 9` has
    // passed, and then flags `roman !== glagolitic` as a no-overlap comparison. Conjunction is commutative, so the
    // reordered mirror computes exactly the Lean statement's truth.
    js: () => { const roman: number = 10 - 1, glagolitic: number = 1 + 10; return roman !== glagolitic && roman === 9 && glagolitic === 11 },
    lean: 'theorem roman_reads_subtractively : 10 - 1 = 9 ∧ 1 + 10 = 11 ∧ 9 ≠ 11 := by decide' },

  { key: 'gematria_ignores_order',
    why: 'A GEMATRIA VALUE IS A SUM, AND A SUM IS BLIND TO ORDER. Because the letters are added, any rearrangement of the same letters carries the SAME value: 1 + 2 + 3 = 3 + 2 + 1 = 6. So an anagram is numerically indistinguishable from its original, and the value cannot recover which word produced it. This is a property of addition, decided here — not a claim about any tradition that uses it.',
    js: () => 1 + 2 + 3 === 3 + 2 + 1 && 1 + 2 + 3 === 6,
    lean: 'theorem gematria_ignores_order : 1 + 2 + 3 = 3 + 2 + 1 ∧ 1 + 2 + 3 = 6 := by decide' },

  { key: 'gematria_forces_collisions',
    why: 'DIFFERENT WORDS MUST SHARE A VALUE — BY PIGEONHOLE. Over the 22 Hebrew letters there are 22³ = 10648 three-letter strings, while their values (each letter 1…400) can only land between 3 and 1200 — 1198 possible sums. More words than sums, so collisions are FORCED: on average nearly nine strings per value. A shared gematria is therefore the expected case and carries no information on its own; it is the same seats-and-people bound the address layer seals as seats_pigeonhole. this decides the counting.',
    js: () => 22 * 22 * 22 === 10648 && 1200 - 3 + 1 === 1198 && 10648 > 1198,
    lean: 'theorem gematria_forces_collisions : 22 * 22 * 22 = 10648 ∧ 1200 - 3 + 1 = 1198 ∧ 10648 > 1198 := by decide' },

  // ── THE COUNTS THE TEXTS STATE THEMSELVES (2026-09-13, read from the primary sources through the scripture doors).
  // Each is the arithmetic a sentence of the text makes; what the text means by it stays the reader's, not the ledger's.
  { key: 'sefer_yetzirah_231_gates',
    why: 'THE 231 GATES ARE EVERY PAIR OF 22 LETTERS. Sefer Yetzirah 2:4 fixes the twenty-two letters "in a wheel with 231 gates", and 231 is exactly the number of unordered pairs of 22 letters: 0 + 1 + … + 21 = 22 · 21 / 2. The same verse says the wheel "turns back and forth", and the pairs read in both directions are 2 · 231 = 462 = 22 · 21. The division the text gives in 2:1, three mothers, seven doubles, twelve simples, is 3 + 7 + 12 = 22. These are the counts the sentences make; the text\'s claim about what the gates do is not decided here.',
    js: () => Array.from({ length: 22 }, (_, i) => i).reduce((a, i) => a + i, 0) === 231 && (22 * 21) / 2 === 231 && 2 * 231 === 22 * 21 && 3 + 7 + 12 === 22,
    lean: 'theorem sefer_yetzirah_231_gates : (List.range 22).foldl (fun a i => a + i) 0 = 231 ∧ 22 * 21 / 2 = 231 ∧ 2 * 231 = 22 * 21 ∧ 3 + 7 + 12 = 22 := by decide' },

  { key: 'abjad_four_ranks',
    why: 'THE ABJAD IS THE THREE RANKS WITH A THOUSAND ADDED. The Arabic letters in abjad order count units, tens and hundreds like Hebrew, Greek and Glagolitic (alphabetic_three_ranks), then one more letter opens the thousands: 9 + 9 + 9 + 1 = 28 letters. By the same rank rule, the letter at position 27 counts (27 mod 9 + 1) · 10^(27 div 9) = 1000, which is ghayn. The design, not a meaning, is what is decided.',
    js: () => 9 + 9 + 9 + 1 === 28 && ((27 % 9) + 1) * 10 ** ((27 - (27 % 9)) / 9) === 1000,
    lean: 'theorem abjad_four_ranks : 9 + 9 + 9 + 1 = 28 ∧ (27 % 9 + 1) * 10 ^ (27 / 9) = 1000 := by decide' },

  (() => {
    // the letter values are DERIVED from the unpointed verse by the rank rule (theology/numerals), never typed
    const verse = 'בראשית ברא אלהים את השמים ואת הארץ'
    const values = lettersOf(verse, 'hebrew').map((c) => rankValueOf(NUMERAL_ORDER.hebrew.indexOf(c)))
    const sum = values.reduce((a, v) => a + v, 0)
    return {
      key: 'genesis_1_1_is_2701',
      why: `THE FIRST VERSE SUMS TO ITS PUBLISHED COUNT. Genesis 1:1, read unpointed from the Hebrew, has ${values.length} letters; valued by the rank rule (alphabetic_three_ranks: units, tens, hundreds in alphabet order) they sum to ${sum}, the value the gematria tradition reports for the verse. The letter values here are computed from the text, not typed, and the sum is decided. By gematria_forces_collisions a sum carries no meaning on its own, and none is claimed.`,
      js: () => values.length === 28 && sum === 2701,
      // the count is stated OF THE LIST, so Lean counts the letters: `${values.length} = 28` rendered as 28 = 28, a check that cannot fail
      lean: `theorem genesis_1_1_is_2701 : [${values.join(',')}].foldl (fun a v => a + v) 0 = 2701 ∧ [${values.join(',')}].length = 28 := by decide`,
    }
  })(),
]

// compute → generate → verify. The Glagolitic numerals and the Pliska rosette's seven-fold — documented arithmetic
// and geometry, demarcated: the rosette's meaning stays historically debated; only the numbers are sealed.
emit({ file: 'Glagolitic.lean', skill: 'glagolitic',
  header: 'GLAGOLITIC — the numerals and the Pliska rosette, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
