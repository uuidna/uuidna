import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LEXICON — A VOCABULARY, AS ARITHMETIC. Words are numbers: the type-token ratio of a text, the size of a vocabulary,
 *  the words that appear exactly once, how dense the content words are, a word's rank by frequency, the frequency Zipf's
 *  law predicts for a rank, how much of a corpus a word list covers, and how fast new types arrive. Crosses to
 *  `linguistics` — a lexicon is what linguistics measures. A measure. */

const PROOF = 'lexicon arithmetic (type-token ratio, vocabulary size, hapax legomena, lexical density, frequency rank, Zipf-scaled frequency, coverage, growth rate); words counted as numbers; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lexicon', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `lexicon.${name}`, params })

export class LexiconFormulas {
  /** TYPE-TOKEN RATIO as a percentage: distinct words over total words. value ⌊types · 100 / tokens⌋. */
  static typetokenratio(types: number, tokens: number): CrossFormula { return c('lexicon-typetokenratio', 'typetokenratio(types, tokens) = ⌊types · 100 / tokens⌋', tokens > 0 ? Math.floor((types * 100) / tokens) : 0, nat(types, tokens) && tokens > 0 && types <= tokens, 'typetokenratio', [types, tokens]) }
  /** VOCABULARY SIZE: known words plus newly learned words. value known + learned. */
  static vocabularysize(known: number, learned: number): CrossFormula { return c('lexicon-vocabularysize', 'vocabularysize(known, learned) = known + learned', known + learned, nat(known, learned), 'vocabularysize', [known, learned]) }
  /** HAPAX LEGOMENA: words appearing exactly once — types minus the repeated ones. value max(0, types − repeated). */
  static hapaxlegomena(types: number, repeated: number): CrossFormula { return c('lexicon-hapaxlegomena', 'hapaxlegomena(types, repeated) = max(0, types − repeated)', Math.max(0, types - repeated), nat(types, repeated) && repeated <= types, 'hapaxlegomena', [types, repeated]) }
  /** LEXICAL DENSITY as a percentage: content words over all words. value ⌊content · 100 / total⌋. */
  static lexicaldensity(content: number, total: number): CrossFormula { return c('lexicon-lexicaldensity', 'lexicaldensity(content, total) = ⌊content · 100 / total⌋', total > 0 ? Math.floor((content * 100) / total) : 0, nat(content, total) && total > 0 && content <= total, 'lexicaldensity', [content, total]) }
  /** FREQUENCY RANK: Zipf's product of a word's frequency and its rank. value occurrences · rank. */
  static frequencyrank(occurrences: number, rank: number): CrossFormula { return c('lexicon-frequencyrank', 'frequencyrank(occurrences, rank) = occurrences · rank', occurrences * rank, nat(occurrences, rank), 'frequencyrank', [occurrences, rank]) }
  /** ZIPF-SCALED FREQUENCY: the frequency Zipf's law predicts at a rank from a constant. value ⌊constant / rank⌋. */
  static zipfscaled(constant: number, rank: number): CrossFormula { return c('lexicon-zipfscaled', 'zipfscaled(constant, rank) = ⌊constant / rank⌋', rank > 0 ? Math.floor(constant / rank) : 0, nat(constant, rank) && rank > 0, 'zipfscaled', [constant, rank]) }
  /** COVERAGE as a percentage: corpus tokens a word list covers. value ⌊covered · 100 / corpus⌋. */
  static coverage(covered: number, corpus: number): CrossFormula { return c('lexicon-coverage', 'coverage(covered, corpus) = ⌊covered · 100 / corpus⌋', corpus > 0 ? Math.floor((covered * 100) / corpus) : 0, nat(covered, corpus) && corpus > 0 && covered <= corpus, 'coverage', [covered, corpus]) }
  /** GROWTH RATE: new types per thousand tokens read. value ⌊newtypes · 1000 / tokens⌋. */
  static growthrate(newtypes: number, tokens: number): CrossFormula { return c('lexicon-growthrate', 'growthrate(newtypes, tokens) = ⌊newtypes · 1000 / tokens⌋', tokens > 0 ? Math.floor((newtypes * 1000) / tokens) : 0, nat(newtypes, tokens) && tokens > 0, 'growthrate', [newtypes, tokens]) }
}

for (const name of ['coverage', 'frequencyrank', 'growthrate', 'hapaxlegomena', 'lexicaldensity', 'typetokenratio', 'vocabularysize', 'zipfscaled'] as const)
  hexRegisterOf('lexicon', name, (LexiconFormulas[name] as (...x: unknown[]) => unknown).bind(LexiconFormulas))
