import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MORPHOLOGY — WORD STRUCTURE, AS ARITHMETIC. The shape of words is numbers: morphemes per word, how much of a
 *  paradigm is inflected, derivations per root, affixes per stem, how productive a pattern is, allomorphs per morpheme,
 *  how transparent (analyzable) the forms are, and morphological density in a text. Crosses to `linguistics`. A measure. */

const PROOF = 'morphology arithmetic (morphemes per word, inflection, derivation, affixation, productivity, allomorphy, transparency, density); word structure as counts; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'morphology', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `morphology.${name}`, params })

export class MorphologyFormulas {
  /** MORPHEMES PER WORD: morpheme parts over words. value ⌊parts / words⌋. */
  static morphemes(parts: number, words: number): CrossFormula { return c('morphology-morphemes', 'morphemes(parts, words) = ⌊parts / words⌋', words > 0 ? Math.floor(parts / words) : 0, nat(parts, words) && words > 0, 'morphemes', [parts, words]) }
  /** INFLECTION: inflected forms as a percentage of the paradigm. value ⌊inflected · 100 / forms⌋. */
  static inflection(inflected: number, forms: number): CrossFormula { return c('morphology-inflection', 'inflection(inflected, forms) = ⌊inflected · 100 / forms⌋', forms > 0 ? Math.floor((inflected * 100) / forms) : 0, nat(inflected, forms) && forms > 0 && inflected <= forms, 'inflection', [inflected, forms]) }
  /** DERIVATION: derived words per root. value ⌊derived / roots⌋. */
  static derivation(derived: number, roots: number): CrossFormula { return c('morphology-derivation', 'derivation(derived, roots) = ⌊derived / roots⌋', roots > 0 ? Math.floor(derived / roots) : 0, nat(derived, roots) && roots > 0, 'derivation', [derived, roots]) }
  /** AFFIXATION: affixes per stem, as a percentage. value ⌊affixes · 100 / stems⌋. */
  static affixation(affixes: number, stems: number): CrossFormula { return c('morphology-affixation', 'affixation(affixes, stems) = ⌊affixes · 100 / stems⌋', stems > 0 ? Math.floor((affixes * 100) / stems) : 0, nat(affixes, stems) && stems > 0, 'affixation', [affixes, stems]) }
  /** PRODUCTIVITY: neologisms as a percentage of a base vocabulary. value ⌊neologisms · 100 / base⌋. */
  static productivity(neologisms: number, base: number): CrossFormula { return c('morphology-productivity', 'productivity(neologisms, base) = ⌊neologisms · 100 / base⌋', base > 0 ? Math.floor((neologisms * 100) / base) : 0, nat(neologisms, base) && base > 0, 'productivity', [neologisms, base]) }
  /** ALLOMORPHY: variant forms per morpheme. value ⌊variants / morphemes⌋. */
  static allomorphy(variants: number, morphemes_: number): CrossFormula { return c('morphology-allomorphy', 'allomorphy(variants, morphemes) = ⌊variants / morphemes⌋', morphemes_ > 0 ? Math.floor(variants / morphemes_) : 0, nat(variants, morphemes_) && morphemes_ > 0, 'allomorphy', [variants, morphemes_]) }
  /** TRANSPARENCY: analyzable forms as a percentage of the total. value ⌊analyzable · 100 / total⌋. */
  static transparency(analyzable: number, total: number): CrossFormula { return c('morphology-transparency', 'transparency(analyzable, total) = ⌊analyzable · 100 / total⌋', total > 0 ? Math.floor((analyzable * 100) / total) : 0, nat(analyzable, total) && total > 0 && analyzable <= total, 'transparency', [analyzable, total]) }
  /** DENSITY: morphemes per hundred tokens. value ⌊morphemes · 100 / tokens⌋. */
  static density(morphemes_: number, tokens: number): CrossFormula { return c('morphology-density', 'density(morphemes, tokens) = ⌊morphemes · 100 / tokens⌋', tokens > 0 ? Math.floor((morphemes_ * 100) / tokens) : 0, nat(morphemes_, tokens) && tokens > 0, 'density', [morphemes_, tokens]) }
}

for (const name of ['affixation', 'allomorphy', 'density', 'derivation', 'inflection', 'morphemes', 'productivity', 'transparency'] as const)
  hexRegisterOf('morphology', name, (MorphologyFormulas[name] as (...x: unknown[]) => unknown).bind(MorphologyFormulas))
