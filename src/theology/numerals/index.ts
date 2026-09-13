// theology/numerals — THE ARITHMETIC ALONE, with no ledger behind it, so a research door can value a verse it fetched
// without loading the 70-thousand-theorem ledger on every sweep. Hebrew gematria, Greek isopsephy and the Arabic abjad
// share the design the ledger seals as alphabetic_three_ranks: in numeral order the letters count units, tens, hundreds
// (the abjad adds a thousand), so a letter's value is DERIVED from its position and the only inputs are the alphabets.

export type Script = 'hebrew' | 'greek' | 'arabic'

/** The alphabets in NUMERAL order. Greek keeps its three archaic numeral signs in place (ϛ 6, ϟ 90, ϡ 900). */
export const NUMERAL_ORDER: Record<Script, string> = {
  hebrew: 'אבגדהוזחטיכלמנסעפצקרשת',
  greek: 'αβγδεϛζηθικλμνξοπϟρστυφχψωϡ',
  arabic: 'ابجدهوزحطيكلمنسعفصقرشتثخذضظغ',
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
