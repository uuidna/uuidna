import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LEXICOGRAPHY — THE MAKING OF DICTIONARIES, AS ARITHMETIC. A dictionary is numbers: how many headwords it holds, how many
 *  senses those headwords carry, how much of the language it covers, the polysemy per entry, the length of a definition, the
 *  cross-references between entries, the frequency band a word falls in, and inflected forms per lemma. Crosses to `linguistics`
 *  — lexicography is the measured record of what linguistics describes. A measure. */

const PROOF = 'lexicography arithmetic (headwords, senses, coverage, polysemy, definition length, cross-references, frequency rank, lemma ratio); the dictionary as a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lexicography', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `lexicography.${name}`, params })

export class LexicographyFormulas {
  /** HEADWORDS: entries across the pages at a count per page. value pages · perPage. */
  static headwords(pages: number, perPage: number): CrossFormula { return c('lexicography-headwords', 'headwords(pages, perPage) = pages · perPage', pages * perPage, nat(pages, perPage), 'headwords', [pages, perPage]) }
  /** SENSES: the senses the headwords carry at an average each. value headwords · avgSenses. */
  static senses(headwords: number, avgSenses: number): CrossFormula { return c('lexicography-senses', 'senses(headwords, avgSenses) = headwords · avgSenses', headwords * avgSenses, nat(headwords, avgSenses), 'senses', [headwords, avgSenses]) }
  /** COVERAGE: the share of the lexicon defined, as a percentage. value ⌊defined · 100 / total⌋. */
  static coverage(defined: number, total: number): CrossFormula { return c('lexicography-coverage', 'coverage(defined, total) = ⌊defined · 100 / total⌋', total > 0 ? Math.floor((defined * 100) / total) : 0, nat(defined, total) && total > 0 && defined <= total, 'coverage', [defined, total]) }
  /** POLYSEMY: senses per headword. value ⌊senses / headwords⌋. */
  static polysemy(senses: number, headwords: number): CrossFormula { return c('lexicography-polysemy', 'polysemy(senses, headwords) = ⌊senses / headwords⌋', headwords > 0 ? Math.floor(senses / headwords) : 0, nat(senses, headwords) && headwords > 0, 'polysemy', [senses, headwords]) }
  /** DEFINITION LENGTH: average words per definition. value ⌊words / entries⌋. */
  static definitionlength(words: number, entries: number): CrossFormula { return c('lexicography-definitionlength', 'definitionlength(words, entries) = ⌊words / entries⌋', entries > 0 ? Math.floor(words / entries) : 0, nat(words, entries) && entries > 0, 'definitionlength', [words, entries]) }
  /** CROSS-REFERENCES: the links between entries at a count each. value entries · refsEach. */
  static crossref(entries: number, refsEach: number): CrossFormula { return c('lexicography-crossref', 'crossref(entries, refsEach) = entries · refsEach', entries * refsEach, nat(entries, refsEach), 'crossref', [entries, refsEach]) }
  /** FREQUENCY RANK: the band a word of a given rank falls in. value ⌊rank / band⌋. */
  static frequencyrank(rank: number, band: number): CrossFormula { return c('lexicography-frequencyrank', 'frequencyrank(rank, band) = ⌊rank / band⌋', band > 0 ? Math.floor(rank / band) : 0, nat(rank, band) && band > 0, 'frequencyrank', [rank, band]) }
  /** LEMMA RATIO: inflected forms per lemma. value ⌊forms / lemmas⌋. */
  static lemmaratio(forms: number, lemmas: number): CrossFormula { return c('lexicography-lemmaratio', 'lemmaratio(forms, lemmas) = ⌊forms / lemmas⌋', lemmas > 0 ? Math.floor(forms / lemmas) : 0, nat(forms, lemmas) && lemmas > 0, 'lemmaratio', [forms, lemmas]) }
}

for (const name of ['coverage', 'crossref', 'definitionlength', 'frequencyrank', 'headwords', 'lemmaratio', 'polysemy', 'senses'] as const)
  hexRegisterOf('lexicography', name, (LexicographyFormulas[name] as (...x: unknown[]) => unknown).bind(LexicographyFormulas))
