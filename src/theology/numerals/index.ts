// theology/numerals — THE ARITHMETIC ALONE, with no ledger behind it, so a research door can value a verse it fetched
// without loading the 70-thousand-theorem ledger on every sweep. Hebrew gematria, Greek isopsephy and the Arabic abjad
// share the design the ledger seals as alphabetic_three_ranks: in numeral order the letters count units, tens, hundreds
// (the abjad adds a thousand), so a letter's value is DERIVED from its position and the only inputs are the alphabets.
//
// NO TRADITION IS LEFT OUT OF ITS OWN SYSTEM. Three scripts were served and a fourth was not, while the ledger's own
// wing is named for it: Saint Cyril's 9th-century Glagolitic, which gave each letter a number IN ALPHABETIC ORDER —
// Az 1, Buky 2, through the units, the tens and the hundreds, combined additively (500 + 80 + 3 = 583). It is the one
// script here whose numeral order IS its alphabet order, which is exactly what the rank rule already assumes, so it
// needed no special case, only a seat. Its 27 numeral letters are three ranks of nine, the shape
// alphabetic_three_ranks seals. Each alphabet is named for the tradition that made it and none is folded into
// another: Hebrew is not Greek transliterated, Glagolitic is not Cyrillic, and the abjad's order is its own.

import { GLAGOLITIC_BASE } from '../../hexbit/index.js'
export type Script = 'hebrew' | 'greek' | 'arabic' | 'glagolitic'

/** The alphabets in NUMERAL order. Greek keeps its three archaic numeral signs in place (ϛ 6, ϟ 90, ϡ 900). */
export const NUMERAL_ORDER: Record<Script, string> = {
  hebrew: 'אבגדהוזחטיכלמנסעפצקרשת',
  greek: 'αβγδεϛζηθικλμνξοπϟρστυφχψωϡ',
  arabic: 'ابجدهوزحطيكلمنسعفصقرشتثخذضظغ',
  // DERIVED from the block the repository already counts hexbits in, never typed: the script numbers its letters in
  // alphabetic order, so the first three ranks of nine codepoints from the base ARE the numeral order.
  glagolitic: Array.from({ length: 3 * 9 }, (_, i) => String.fromCodePoint(GLAGOLITIC_BASE + i)).join(''),
}

/** Final, variant and hamza-seated forms that count as their base letter. */
const FOLD: Readonly<Record<string, string>> = {
  'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ',
  'ς': 'σ', 'ϝ': 'ϛ',
  'ٱ': 'ا', 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ة': 'ه', 'ى': 'ي', 'ؤ': 'و', 'ئ': 'ي',
}

/** The rank rule: position i counts (i mod 9 + 1) in rank ⌊i / 9⌋ — units, tens, hundreds, thousands. */
export const rankValueOf = (i: number): number => ((i % 9) + 1) * 10 ** ((i - (i % 9)) / 9)

/** The letters a text carries in one script, after stripping markup and marks and folding variant forms. */
export const lettersOf = (text: string, script: Script): string[] => {
  const order = NUMERAL_ORDER[script]
  return [...text.replace(/<[^>]*>/g, '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()]
    .map((c) => FOLD[c] ?? c)
    .filter((c) => order.includes(c))
}

/** numeralValueOf(text, script) → the sum of the letters' rank values. */
export const numeralValueOf = (text: string, script: Script): number =>
  lettersOf(text, script).reduce((sum, c) => sum + rankValueOf(NUMERAL_ORDER[script].indexOf(c)), 0)
