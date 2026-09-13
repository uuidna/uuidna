#!/usr/bin/env node
// Automate the Lean layer for SCRIPTURE — where the history of algebra meets theology, as decidable arithmetic,
// demarcated. Every REFUTATION the 2026-09-13 research found is involuted here into the statement whose truth IS the
// refutation (the captain: "ensure all refutations are involuted to verified lean statements"), and every count a
// primary text states is sealed as the count it is. What the texts mean stays the reader's: this wing decides numbers,
// and the refutations of statistical claims (the Bible codes) are cited where they are argued, because a corpus test is
// not a finite proposition. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'
import { lettersOf, rankValueOf, NUMERAL_ORDER } from '../theology/numerals/index.js'

/** a word's letter values, DERIVED from its letters by the rank rule — never typed */
const valuesOf = (word: string): number[] => lettersOf(word, 'hebrew').map((c) => rankValueOf(NUMERAL_ORDER.hebrew.indexOf(c)))
const sumOf = (xs: readonly number[]): number => xs.reduce((a, v) => a + v, 0)

const FACTS = [
  (() => {
    // Revelation 13:18's number and its P115 variant, under both readings the literature proposes (Williams 2007)
    const nero = valuesOf('נרון קסר'), neroLatin = valuesOf('נרו קסר')
    const beast = valuesOf('תריון'), beastGen = valuesOf('תריו')
    const L = (xs: readonly number[]): string => `[${xs.join(',')}]`
    const S = (xs: readonly number[]): string => `${L(xs)}.foldl (fun a v => a + v) 0`
    return {
      key: 'beast_number_fits_two_readings',
      why: `THE NUMBER DOES NOT PICK OUT ITS NAME. Revelation 13:18 gives 666 and the oldest papyrus, P115, gives 616. Spelled in Hebrew letters, "Nero Caesar" sums to ${sumOf(nero)} from the Greek Neron and ${sumOf(neroLatin)} from the Latin Nero; the word for "beast" itself, thērion, sums to ${sumOf(beast)} and, in its genitive form, ${sumOf(beastGen)}. Every letter value is derived from the letters by the rank rule (alphabetic_three_ranks), and Lean decides the four sums. So both numbers fit both readings, which is the refutation that 616 confirms Nero alone (Williams 2007, Tyndale Bulletin 58.1); gematria_forces_collisions says the same in general. Which reading the author meant is not decided here.`,
      js: () => sumOf(nero) === 666 && sumOf(neroLatin) === 616 && sumOf(beast) === 666 && sumOf(beastGen) === 616,
      lean: `theorem beast_number_fits_two_readings : ${S(nero)} = 666 ∧ ${S(neroLatin)} = 616 ∧ ${S(beast)} = 666 ∧ ${S(beastGen)} = 616 := by decide`,
    }
  })(),

  { key: 'nicomachus_digit_rule_fails',
    why: 'NICOMACHUS WAS WRONG ABOUT THE DIGITS, AND ONE NUMBER SHOWS IT. Nicomachus of Gerasa claimed the nth perfect number has n digits. The Euclid perfect numbers are 2^(p−1)·(2^p − 1) with 2^p − 1 prime: p = 2, 3, 5, 7 give 6, 28, 496, 8128, then 2^11 − 1 = 2047 = 23 · 89 is not prime, so the fifth comes from p = 13: 2^12 · 8191 = 33550336, with 8191 prime. It lies between 10^7 and 10^8, so it has eight digits, not five. The refutation is exactly this: the claim\'s denial holds at n = 5.',
    js: () => {
      let prime = true
      for (let k = 2; k * k <= 8191; k++) if (8191 % k === 0) prime = false
      return 2 ** 11 - 1 === 23 * 89 && 2 ** 12 * (2 ** 13 - 1) === 33550336 && prime && 10 ** 7 <= 33550336 && 33550336 < 10 ** 8
    },
    lean: 'theorem nicomachus_digit_rule_fails : 2 ^ 11 - 1 = 23 * 89 ∧ 2 ^ 12 * (2 ^ 13 - 1) = 33550336 ∧ (List.range\' 2 89).all (fun k => 8191 % k != 0) ∧ 10 ^ 7 ≤ 33550336 ∧ 33550336 < 10 ^ 8 := by decide' },

  { key: 'augustine_six_is_perfect',
    why: 'THE SIX DAYS AND THE PERFECT NUMBER. Augustine (City of God XI.30) says creation took six days because six is perfect: its proper divisors 1, 2, 3 sum to it. The same holds for 28 (1 + 2 + 4 + 7 + 14). Decided by walking every smaller divisor. The theology is Augustine\'s; the perfection is arithmetic.',
    js: () => [6, 28].every((n) => { let s = 0; for (let d = 1; d < n; d++) if (n % d === 0) s += d; return s === n }),
    lean: 'theorem augustine_six_is_perfect : ((List.range 6).filter (fun d => d > 0 ∧ 6 % d = 0)).foldl (fun a d => a + d) 0 = 6 ∧ ((List.range 28).filter (fun d => d > 0 ∧ 28 % d = 0)).foldl (fun a d => a + d) 0 = 28 := by decide' },

  { key: 'sefer_yetzirah_stones_build_houses',
    why: 'THE STONES THAT BUILD HOUSES ARE FACTORIALS. Sefer Yetzirah 4 counts how many "houses" letters ("stones") build: two stones build two, three build six, four build twenty-four, then 120, 720 and 5040. Each is n! — the number of orders of n distinct letters — computed here as the product 1 · 2 · … · n for n = 2 to 7.',
    js: () => [2, 3, 4, 5, 6, 7].map((n) => { let p = 1; for (let k = 1; k <= n; k++) p *= k; return p }).join() === '2,6,24,120,720,5040',
    lean: 'theorem sefer_yetzirah_stones_build_houses : [2,3,4,5,6,7].map (fun n => (List.range n).foldl (fun a k => a * (k + 1)) 1) = [2,6,24,120,720,5040] := by decide' },

  { key: 'llull_pairs_and_triples',
    why: 'LLULL\'S NINE DIGNITIES, COMBINED. Ramon Llull\'s Ars lettered nine divine dignities B to K and combined them: every pair without repetition, C(9,2) = 36, the count of his third figure\'s compartments, and every triple, C(9,3) = 84. Counted here by walking the letters in order. That a full-text source confirms the 36 compartments is recorded as open in the research; the counts themselves are decided.',
    js: () => { let p = 0, t = 0; for (let a = 0; a < 9; a++) for (let b = a + 1; b < 9; b++) { p++; for (let c = b + 1; c < 9; c++) t++ } return p === 36 && t === 84 },
    lean: 'theorem llull_pairs_and_triples : ((List.range 9).map (fun a => 8 - a)).foldl (fun s x => s + x) 0 = 36 ∧ 9 * 8 * 7 / 6 = 84 := by decide' },

  { key: 'baudhayana_sqrt2_is_pell',
    why: 'THE ALTAR BUILDERS\' √2 IS A PELL SOLUTION. The Śulba-sūtras give √2 ≈ 1 + 1/3 + 1/(3·4) − 1/(3·4·34) = 577/408, read in 408ths as 408 + 136 + 34 − 1 = 577. It is as close as a fraction with denominator 408 can be, and exactly so: 577² = 2 · 408² + 1, a solution of x² − 2y² = 1, so 577/408 exceeds √2 by less than 1/(2·408²). Decided in integers.',
    js: () => 408 + 136 + 34 - 1 === 577 && 577 * 577 === 2 * 408 * 408 + 1,
    lean: 'theorem baudhayana_sqrt2_is_pell : 408 + 136 + 34 - 1 = 577 ∧ 577 * 577 = 2 * 408 * 408 + 1 := by decide' },
]

// compute → generate → verify. Where algebra's history meets theology — the counts the texts state and the refutations
// the research found — decidable arithmetic, demarcated: meaning, dating and doctrine stay with the sources.
emit({ file: 'Scripture.lean', skill: 'scripture',
  header: 'SCRIPTURE — the arithmetic of sacred texts and the refutations of their numerology, decidable, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
