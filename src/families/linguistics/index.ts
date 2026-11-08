import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LINGUISTICS — LANGUAGE ANALYSIS, AS ARITHMETIC (chosen by the registry, not by hand). Reading a corpus is numbers:
 *  the syllables a text carries, how varied its vocabulary is, how long its sentences run, how many words two languages
 *  share, its phoneme inventory, how often a word occurs per million, the morphemes per word, and the edit distance
 *  between two strings. Crosses to `ml` — language analysis is what a model learns from. A measure. */

const PROOF = 'linguistics arithmetic (syllables, lexical diversity, readability, cognates, phonemes, word frequency, morphemes, edit distance); a language-analysis domain; a measure crossed to ml'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'linguistics', dst: 'ml', formula, value, proof: PROOF, ...extra }, holds, { name: `linguistics.${name}`, params })

export class LinguisticsFormulas {
  /** SYLLABLES: words at an average syllable count each. value words · avg. */
  static syllables(words: number, avg: number): CrossFormula { return c('linguistics-syllables', 'syllables(words, avg) = words · avg', words * avg, nat(words, avg), 'syllables', [words, avg]) }
  /** LEXICAL DIVERSITY: type-token ratio as a percentage. value ⌊unique · 100 / total⌋. */
  static lexical(unique: number, total: number): CrossFormula { return c('linguistics-lexical', 'lexical(unique, total) = ⌊unique · 100 / total⌋', total > 0 ? Math.floor((unique * 100) / total) : 0, nat(unique, total) && total > 0 && unique <= total, 'lexical', [unique, total]) }
  /** READABILITY: average sentence length in words. value ⌊words / sentences⌋. */
  static readability(words: number, sentences: number): CrossFormula { return c('linguistics-readability', 'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0, nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) }
  /** COGNATES: shared vocabulary between two languages as a percentage. value ⌊shared · 100 / total⌋. */
  static cognates(shared: number, total: number): CrossFormula { return c('linguistics-cognates', 'cognates(shared, total) = ⌊shared · 100 / total⌋', total > 0 ? Math.floor((shared * 100) / total) : 0, nat(shared, total) && total > 0 && shared <= total, 'cognates', [shared, total]) }
  /** PHONEMES: the phoneme inventory. value count. */
  static phonemes(count: number): CrossFormula { return c('linguistics-phonemes', 'phonemes(count) = count', count, nat(count), 'phonemes', [count]) }
  /** WORD FREQUENCY: occurrences per million of a corpus. value ⌊occurrences · 1000000 / corpus⌋. */
  static frequency(occurrences: number, corpus: number): CrossFormula { return c('linguistics-frequency', 'frequency(occurrences, corpus) = ⌊occurrences · 1000000 / corpus⌋', corpus > 0 ? Math.floor((occurrences * 1000000) / corpus) : 0, nat(occurrences, corpus) && corpus > 0, 'frequency', [occurrences, corpus]) }
  /** MORPHEMES: words at a morpheme count each. value words · perWord. */
  static morphemes(words: number, perWord: number): CrossFormula { return c('linguistics-morphemes', 'morphemes(words, perWord) = words · perWord', words * perWord, nat(words, perWord), 'morphemes', [words, perWord]) }
  /** EDIT DISTANCE: edits over a string length as a percentage. value ⌊edits · 100 / length⌋. */
  static distance(edits: number, length: number): CrossFormula { return c('linguistics-distance', 'distance(edits, length) = ⌊edits · 100 / length⌋', length > 0 ? Math.floor((edits * 100) / length) : 0, nat(edits, length) && length > 0, 'distance', [edits, length]) }
}

for (const name of ['cognates', 'distance', 'frequency', 'lexical', 'morphemes', 'phonemes', 'readability', 'syllables'] as const)
  hexRegisterOf('linguistics', name, (LinguisticsFormulas[name] as (...x: unknown[]) => unknown).bind(LinguisticsFormulas))
