import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AESTHETICS — VISUAL JUDGEMENT AS ARITHMETIC (chosen by the design registry, not by hand). Beauty is numbers:
 *  the golden-ratio partner of a width, how symmetric a composition is, how balanced two sides are, the contrast of
 *  light over dark, tonal harmony, the rhythm of repeated elements, part-to-whole proportion, and overall unity.
 *  Crosses to `layout` — aesthetics is what layout arranges. A measure. */

const PROOF = 'aesthetics arithmetic (golden ratio, symmetry, balance, contrast, harmony, rhythm, proportion, unity); visual judgement as integers; a measure crossed to layout'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aesthetics', dst: 'layout', formula, value, proof: PROOF, ...extra }, holds, { name: `aesthetics.${name}`, params })

export class AestheticsFormulas {
  /** GOLDEN RATIO PARTNER: a width divided by φ. value ⌊width · 1000 / 1618⌋. */
  static golden(width: number): CrossFormula { return c('aesthetics-golden', 'golden(width) = ⌊width · 1000 / 1618⌋', Math.floor((width * 1000) / 1618), nat(width), 'golden', [width]) }
  /** SYMMETRY as a percentage of matched points. value ⌊matched · 100 / total⌋. */
  static symmetry(matched: number, total: number): CrossFormula { return c('aesthetics-symmetry', 'symmetry(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'symmetry', [matched, total]) }
  /** BALANCE: the lighter side as a percentage of the heavier. value ⌊min · 100 / max⌋. */
  static balance(left: number, right: number): CrossFormula { return c('aesthetics-balance', 'balance(left, right) = ⌊min · 100 / max⌋', Math.max(left, right) > 0 ? Math.floor((Math.min(left, right) * 100) / Math.max(left, right)) : 0, nat(left, right) && Math.max(left, right) > 0, 'balance', [left, right]) }
  /** CONTRAST: light over dark. value ⌊light / dark⌋. */
  static contrast(light: number, dark: number): CrossFormula { return c('aesthetics-contrast', 'contrast(light, dark) = ⌊light / dark⌋', dark > 0 ? Math.floor(light / dark) : 0, nat(light, dark) && dark > 0, 'contrast', [light, dark]) }
  /** HARMONY: consonant intervals as a percentage. value ⌊consonant · 100 / total⌋. */
  static harmony(consonant: number, total: number): CrossFormula { return c('aesthetics-harmony', 'harmony(consonant, total) = ⌊consonant · 100 / total⌋', total > 0 ? Math.floor((consonant * 100) / total) : 0, nat(consonant, total) && total > 0 && consonant <= total, 'harmony', [consonant, total]) }
  /** RHYTHM: elements per interval. value ⌊elements / interval⌋. */
  static rhythm(elements: number, interval: number): CrossFormula { return c('aesthetics-rhythm', 'rhythm(elements, interval) = ⌊elements / interval⌋', interval > 0 ? Math.floor(elements / interval) : 0, nat(elements, interval) && interval > 0, 'rhythm', [elements, interval]) }
  /** PROPORTION: part over whole as a percentage. value ⌊part · 100 / whole⌋. */
  static proportion(part: number, whole: number): CrossFormula { return c('aesthetics-proportion', 'proportion(part, whole) = ⌊part · 100 / whole⌋', whole > 0 ? Math.floor((part * 100) / whole) : 0, nat(part, whole) && whole > 0 && part <= whole, 'proportion', [part, whole]) }
  /** UNITY: related elements as a percentage of the whole. value ⌊related · 100 / total⌋. */
  static unity(related: number, total: number): CrossFormula { return c('aesthetics-unity', 'unity(related, total) = ⌊related · 100 / total⌋', total > 0 ? Math.floor((related * 100) / total) : 0, nat(related, total) && total > 0 && related <= total, 'unity', [related, total]) }
}

for (const name of ['balance', 'contrast', 'golden', 'harmony', 'proportion', 'rhythm', 'symmetry', 'unity'] as const)
  hexRegisterOf('aesthetics', name, (AestheticsFormulas[name] as (...x: unknown[]) => unknown).bind(AestheticsFormulas))
