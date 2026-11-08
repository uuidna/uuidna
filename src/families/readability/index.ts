import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** READABILITY — HOW HARD A TEXT IS TO READ, AS ARITHMETIC. Reading is numbers: words per sentence, syllables per word,
 *  and the grade formulas built on them — Flesch Reading Ease, Flesch–Kincaid, Coleman–Liau, the Automated Readability
 *  Index, Gunning Fog, SMOG. Crosses to `linguistics` — readability is the measure linguistics puts on prose. A measure. */

const PROOF = 'readability arithmetic (words/sentence, syllables/word, Flesch ease, Flesch–Kincaid, Coleman–Liau, ARI, Gunning Fog, SMOG); a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'readability', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `readability.${name}`, params })

export class ReadabilityFormulas {
  /** WORDS PER SENTENCE: average sentence length (ASL). value ⌊words / sentences⌋. */
  static wordspersentence(words: number, sentences: number): CrossFormula { return c('readability-wordspersentence', 'wordspersentence(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0, nat(words, sentences) && sentences > 0, 'wordspersentence', [words, sentences]) }
  /** SYLLABLES PER (HUNDRED) WORDS. value ⌊syllables · 100 / words⌋. */
  static syllablesperword(syllables: number, words: number): CrossFormula { return c('readability-syllablesperword', 'syllablesperword(syllables, words) = ⌊syllables · 100 / words⌋', words > 0 ? Math.floor((syllables * 100) / words) : 0, nat(syllables, words) && words > 0, 'syllablesperword', [syllables, words]) }
  /** FLESCH READING EASE from ASL and syllables-per-hundred (asw). value max(0, 206 − asl − ⌊846 · asw / 1000⌋). */
  static fleschscaled(asl: number, asw: number): CrossFormula { return c('readability-fleschscaled', 'fleschscaled(asl, asw) = max(0, 206 − asl − ⌊846 · asw / 1000⌋)', Math.max(0, 206 - asl - Math.floor((846 * asw) / 1000)), nat(asl, asw), 'fleschscaled', [asl, asw]) }
  /** FLESCH–KINCAID GRADE from ASL and syllables-per-hundred (asw). value max(0, ⌊39 · asl / 100⌋ + ⌊118 · asw / 1000⌋ − 16). */
  static fleschkincaid(asl: number, asw: number): CrossFormula { return c('readability-fleschkincaid', 'fleschkincaid(asl, asw) = max(0, ⌊39 · asl / 100⌋ + ⌊118 · asw / 1000⌋ − 16)', Math.max(0, Math.floor((39 * asl) / 100) + Math.floor((118 * asw) / 1000) - 16), nat(asl, asw), 'fleschkincaid', [asl, asw]) }
  /** COLEMAN–LIAU from letters-per-hundred (letters) and sentences-per-hundred. value max(0, ⌊588 · letters / 10000⌋ − ⌊296 · sentences / 1000⌋ − 16). */
  static colemanliau(letters: number, sentences: number): CrossFormula { return c('readability-colemanliau', 'colemanliau(letters, sentences) = max(0, ⌊588 · letters / 10000⌋ − ⌊296 · sentences / 1000⌋ − 16)', Math.max(0, Math.floor((588 * letters) / 10000) - Math.floor((296 * sentences) / 1000) - 16), nat(letters, sentences), 'colemanliau', [letters, sentences]) }
  /** AUTOMATED READABILITY INDEX from chars, words, sentences. value max(0, ⌊471 · chars / (100 · words)⌋ + ⌊words / (2 · sentences)⌋ − 21). */
  static automatedindex(chars: number, words: number, sentences: number): CrossFormula { return c('readability-automatedindex', 'automatedindex(chars, words, sentences) = max(0, ⌊471 · chars / (100 · words)⌋ + ⌊words / (2 · sentences)⌋ − 21)', words > 0 && sentences > 0 ? Math.max(0, Math.floor((471 * chars) / (100 * words)) + Math.floor(words / (2 * sentences)) - 21) : 0, nat(chars, words, sentences) && words > 0 && sentences > 0, 'automatedindex', [chars, words, sentences]) }
  /** GUNNING FOG from words, sentences, complex-word count. value max(0, ⌊(⌊words / sentences⌋ + ⌊100 · complex / words⌋) · 2 / 5⌋). */
  static gunningfog(words: number, sentences: number, complex: number): CrossFormula { return c('readability-gunningfog', 'gunningfog(words, sentences, complex) = max(0, ⌊(⌊words / sentences⌋ + ⌊100 · complex / words⌋) · 2 / 5⌋)', sentences > 0 && words > 0 ? Math.max(0, Math.floor((Math.floor(words / sentences) + Math.floor((100 * complex) / words)) * 2 / 5)) : 0, nat(words, sentences, complex) && sentences > 0 && words > 0, 'gunningfog', [words, sentences, complex]) }
  /** SMOG from polysyllable count and sentences. value ⌊√⌊polysyllables · 30 / sentences⌋⌋ + 3. */
  static smogscaled(polysyllables: number, sentences: number): CrossFormula { return c('readability-smogscaled', 'smogscaled(polysyllables, sentences) = ⌊√⌊polysyllables · 30 / sentences⌋⌋ + 3', sentences > 0 ? Math.floor(Math.sqrt(Math.floor((polysyllables * 30) / sentences))) + 3 : 0, nat(polysyllables, sentences) && sentences > 0, 'smogscaled', [polysyllables, sentences]) }
}

for (const name of ['automatedindex', 'colemanliau', 'fleschkincaid', 'fleschscaled', 'gunningfog', 'smogscaled', 'syllablesperword', 'wordspersentence'] as const)
  hexRegisterOf('readability', name, (ReadabilityFormulas[name] as (...x: unknown[]) => unknown).bind(ReadabilityFormulas))
