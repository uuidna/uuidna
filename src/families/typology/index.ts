import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TYPOLOGY — THE SHAPE OF LANGUAGES, AS ARITHMETIC (how languages vary, counted). Word order spread across a sample,
 *  morphemes a word carries, the phoneme inventory, the consonant-to-vowel ratio, the synthetic index, marked features,
 *  the feature count a sample fills, and the genetic distance between two languages. Crosses to `linguistics` — typology
 *  is the comparative measure linguistics builds on. A measure. */

const PROOF = 'typology arithmetic (word-order frequency, morpheme complexity, phoneme inventory, consonant/vowel ratio, synthetic index, markedness, feature count, genetic distance); a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'typology', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `typology.${name}`, params })

export class TypologyFormulas {
  /** WORD-ORDER FREQUENCY: how often an order appears across a sample, as a percentage. value ⌊count · 100 / total⌋. */
  static wordorderfreq(count: number, total: number): CrossFormula { return c('typology-wordorderfreq', 'wordorderfreq(count, total) = ⌊count · 100 / total⌋', total > 0 ? Math.floor((count * 100) / total) : 0, nat(count, total) && total > 0 && count <= total, 'wordorderfreq', [count, total]) }
  /** MORPHEME COMPLEXITY: morphemes carried across a text of words. value words · morphemesPer. */
  static morphemecomplexity(words: number, morphemesPer: number): CrossFormula { return c('typology-morphemecomplexity', 'morphemecomplexity(words, morphemesPer) = words · morphemesPer', words * morphemesPer, nat(words, morphemesPer), 'morphemecomplexity', [words, morphemesPer]) }
  /** PHONEME INVENTORY: consonants and vowels together. value consonants + vowels. */
  static phonemeinventory(consonants: number, vowels: number): CrossFormula { return c('typology-phonemeinventory', 'phonemeinventory(consonants, vowels) = consonants + vowels', consonants + vowels, nat(consonants, vowels), 'phonemeinventory', [consonants, vowels]) }
  /** CONSONANT/VOWEL RATIO, scaled by 100. value ⌊consonants · 100 / vowels⌋. */
  static consonantvowelratio(consonants: number, vowels: number): CrossFormula { return c('typology-consonantvowelratio', 'consonantvowelratio(consonants, vowels) = ⌊consonants · 100 / vowels⌋', vowels > 0 ? Math.floor((consonants * 100) / vowels) : 0, nat(consonants, vowels) && vowels > 0, 'consonantvowelratio', [consonants, vowels]) }
  /** SYNTHETIC INDEX: morphemes per word, scaled by 100. value ⌊morphemes · 100 / words⌋. */
  static syntheticindex(morphemes: number, words: number): CrossFormula { return c('typology-syntheticindex', 'syntheticindex(morphemes, words) = ⌊morphemes · 100 / words⌋', words > 0 ? Math.floor((morphemes * 100) / words) : 0, nat(morphemes, words) && words > 0, 'syntheticindex', [morphemes, words]) }
  /** MARKEDNESS: the marked features left once the unmarked are removed. value max(0, total − unmarked). */
  static markednesscount(total: number, unmarked: number): CrossFormula { return c('typology-markednesscount', 'markednesscount(total, unmarked) = max(0, total - unmarked)', Math.max(0, total - unmarked), nat(total, unmarked) && unmarked <= total, 'markednesscount', [total, unmarked]) }
  /** FEATURE COUNT: the feature cells a sample fills, parameters at values each. value parameters · valuesPer. */
  static featurecount(parameters: number, valuesPer: number): CrossFormula { return c('typology-featurecount', 'featurecount(parameters, valuesPer) = parameters · valuesPer', parameters * valuesPer, nat(parameters, valuesPer), 'featurecount', [parameters, valuesPer]) }
  /** GENETIC DISTANCE: the features two languages do not share. value max(0, total − shared). */
  static geneticdistance(total: number, shared: number): CrossFormula { return c('typology-geneticdistance', 'geneticdistance(total, shared) = max(0, total - shared)', Math.max(0, total - shared), nat(total, shared) && shared <= total, 'geneticdistance', [total, shared]) }
}

for (const name of ['consonantvowelratio', 'featurecount', 'geneticdistance', 'markednesscount', 'morphemecomplexity', 'phonemeinventory', 'syntheticindex', 'wordorderfreq'] as const)
  hexRegisterOf('typology', name, (TypologyFormulas[name] as (...x: unknown[]) => unknown).bind(TypologyFormulas))
