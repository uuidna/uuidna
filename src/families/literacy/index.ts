import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LITERACY — READING, AS ARITHMETIC (chosen by the registry, not by hand). How a reader meets a text is numbers: words a
 *  minute, how much is understood, fluency, the grade a passage sits at, vocabulary coverage, decoding accuracy, the Lexile
 *  gap to close, and the fog a sentence carries. Crosses to `pedagogy` — literacy is what teaching builds. A measure. */

const PROOF = 'literacy arithmetic (words per minute, comprehension, fluency, reading level, vocabulary, accuracy, lexile delta, fog index); a reading measure crossed to pedagogy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'literacy', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name: `literacy.${name}`, params })

export class LiteracyFormulas {
  /** WORDS PER MINUTE: words read over the seconds taken. value ⌊words · 60 / seconds⌋. */
  static wordsperminute(words: number, seconds: number): CrossFormula { return c('literacy-wordsperminute', 'wordsperminute(words, seconds) = ⌊words · 60 / seconds⌋', seconds > 0 ? Math.floor((words * 60) / seconds) : 0, nat(words, seconds) && seconds > 0, 'wordsperminute', [words, seconds]) }
  /** COMPREHENSION as a percentage of questions answered. value ⌊correct · 100 / total⌋. */
  static comprehension(correct: number, total: number): CrossFormula { return c('literacy-comprehension', 'comprehension(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'comprehension', [correct, total]) }
  /** FLUENCY: words per minute scaled by comprehension. value ⌊wpm · comp / 100⌋. */
  static fluency(wpm: number, comp: number): CrossFormula { return c('literacy-fluency', 'fluency(wpm, comp) = ⌊wpm · comp / 100⌋', Math.floor((wpm * comp) / 100), nat(wpm, comp) && comp <= 100, 'fluency', [wpm, comp]) }
  /** READING LEVEL: average sentence length as a grade proxy. value ⌊words / sentences⌋. */
  static readinglevel(words: number, sentences: number): CrossFormula { return c('literacy-readinglevel', 'readinglevel(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0, nat(words, sentences) && sentences > 0, 'readinglevel', [words, sentences]) }
  /** VOCABULARY coverage as a percentage. value ⌊known · 100 / total⌋. */
  static vocabulary(known: number, total: number): CrossFormula { return c('literacy-vocabulary', 'vocabulary(known, total) = ⌊known · 100 / total⌋', total > 0 ? Math.floor((known * 100) / total) : 0, nat(known, total) && total > 0 && known <= total, 'vocabulary', [known, total]) }
  /** ACCURACY: words decoded correctly over the words attempted. value ⌊correct · 100 / attempts⌋. */
  static accuracy(correct: number, attempts: number): CrossFormula { return c('literacy-accuracy', 'accuracy(correct, attempts) = ⌊correct · 100 / attempts⌋', attempts > 0 ? Math.floor((correct * 100) / attempts) : 0, nat(correct, attempts) && attempts > 0 && correct <= attempts, 'accuracy', [correct, attempts]) }
  /** LEXILE DELTA: the gap from reader to text, never below zero. value max(0, reader − text). */
  static lexiledelta(reader: number, text: number): CrossFormula { return c('literacy-lexiledelta', 'lexiledelta(reader, text) = max(0, reader − text)', Math.max(0, reader - text), nat(reader, text), 'lexiledelta', [reader, text]) }
  /** FOG INDEX: Gunning fog over sentence length and complex words. value ⌊(⌊words / sentences⌋ + ⌊complex · 100 / words⌋) · 2 / 5⌋. */
  static fogindex(words: number, sentences: number, complex: number): CrossFormula { return c('literacy-fogindex', 'fogindex(words, sentences, complex) = ⌊(⌊words / sentences⌋ + ⌊complex · 100 / words⌋) · 2 / 5⌋', Math.floor((((sentences > 0 ? Math.floor(words / sentences) : 0) + (words > 0 ? Math.floor((complex * 100) / words) : 0)) * 2) / 5), nat(words, sentences, complex) && sentences > 0 && words > 0 && complex <= words, 'fogindex', [words, sentences, complex]) }
}

for (const name of ['accuracy', 'comprehension', 'fluency', 'fogindex', 'lexiledelta', 'readinglevel', 'vocabulary', 'wordsperminute'] as const)
  hexRegisterOf('literacy', name, (LiteracyFormulas[name] as (...x: unknown[]) => unknown).bind(LiteracyFormulas))
