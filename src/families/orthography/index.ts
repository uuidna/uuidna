import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ORTHOGRAPHY — WRITING SYSTEMS, AS ARITHMETIC. How a script spells its language is numbers: how regular the spelling
 *  is, how many symbols per sound, how often words are misspelled, letters per word, how much is capitalised, how many
 *  diacritics are carried, how legible the glyphs are, and the syllables a form holds. Crosses to `linguistics` — a
 *  script is what linguistics reads. A measure. */

const PROOF = 'orthography arithmetic (spelling transparency, graphemes per phoneme, error rate, letter density, capitalisation, diacritics, legibility, syllables); a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'orthography', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `orthography.${name}`, params })

export class OrthographyFormulas {
  /** SPELLING TRANSPARENCY: the share of words spelled regularly. value ⌊regular · 100 / words⌋. */
  static transparency(regular: number, words: number): CrossFormula { return c('orthography-transparency', 'transparency(regular, words) = ⌊regular · 100 / words⌋', words > 0 ? Math.floor((regular * 100) / words) : 0, nat(regular, words) && words > 0 && regular <= words, 'transparency', [regular, words]) }
  /** GRAPHEMES per phoneme, as a percentage. value ⌊symbols · 100 / phonemes⌋. */
  static graphemes(symbols: number, phonemes: number): CrossFormula { return c('orthography-graphemes', 'graphemes(symbols, phonemes) = ⌊symbols · 100 / phonemes⌋', phonemes > 0 ? Math.floor((symbols * 100) / phonemes) : 0, nat(symbols, phonemes) && phonemes > 0, 'graphemes', [symbols, phonemes]) }
  /** ERROR RATE: the share of written words misspelled. value ⌊misspelled · 100 / written⌋. */
  static errors(misspelled: number, written: number): CrossFormula { return c('orthography-errors', 'errors(misspelled, written) = ⌊misspelled · 100 / written⌋', written > 0 ? Math.floor((misspelled * 100) / written) : 0, nat(misspelled, written) && written > 0 && misspelled <= written, 'errors', [misspelled, written]) }
  /** LETTER DENSITY: letters per word. value ⌊letters / words⌋. */
  static density(letters: number, words: number): CrossFormula { return c('orthography-density', 'density(letters, words) = ⌊letters / words⌋', words > 0 ? Math.floor(letters / words) : 0, nat(letters, words) && words > 0, 'density', [letters, words]) }
  /** CAPITALISATION: the share of characters in upper case. value ⌊uppercase · 100 / total⌋. */
  static capitals(uppercase: number, total: number): CrossFormula { return c('orthography-capitals', 'capitals(uppercase, total) = ⌊uppercase · 100 / total⌋', total > 0 ? Math.floor((uppercase * 100) / total) : 0, nat(uppercase, total) && total > 0 && uppercase <= total, 'capitals', [uppercase, total]) }
  /** DIACRITICS: the share of characters carrying a mark. value ⌊marked · 100 / characters⌋. */
  static diacritics(marked: number, characters: number): CrossFormula { return c('orthography-diacritics', 'diacritics(marked, characters) = ⌊marked · 100 / characters⌋', characters > 0 ? Math.floor((marked * 100) / characters) : 0, nat(marked, characters) && characters > 0 && marked <= characters, 'diacritics', [marked, characters]) }
  /** LEGIBILITY: the share of shown glyphs recognised. value ⌊recognized · 100 / shown⌋. */
  static legibility(recognized: number, shown: number): CrossFormula { return c('orthography-legibility', 'legibility(recognized, shown) = ⌊recognized · 100 / shown⌋', shown > 0 ? Math.floor((recognized * 100) / shown) : 0, nat(recognized, shown) && shown > 0 && recognized <= shown, 'legibility', [recognized, shown]) }
  /** SYLLABLES a form holds. value count. */
  static syllables(count: number): CrossFormula { return c('orthography-syllables', 'syllables(count) = count', count, nat(count), 'syllables', [count]) }
}

for (const name of ['capitals', 'density', 'diacritics', 'errors', 'graphemes', 'legibility', 'syllables', 'transparency'] as const)
  hexRegisterOf('orthography', name, (OrthographyFormulas[name] as (...x: unknown[]) => unknown).bind(OrthographyFormulas))
