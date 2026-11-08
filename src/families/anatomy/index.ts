import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANATOMY — THE BODY AS ARITHMETIC (chosen by the registry, not by hand). Form is numbers: a body-surface proxy, the
 *  waist-to-hip ratio, left/right symmetry, a part against the whole, the span of a segment, a volume, a mass, and the
 *  girth of a limb. Crosses to `med` — anatomy is what medicine measures. A measure. */

const PROOF = 'anatomy arithmetic (surface proxy, waist-hip ratio, symmetry, proportion, span, volume, mass, girth); a registry domain; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'anatomy', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `anatomy.${name}`, params })

export class AnatomyFormulas {
  /** SURFACE: a body-surface proxy, height by weight. value height · weight. */
  static surface(height: number, weight: number): CrossFormula { return c('anatomy-surface', 'surface(height, weight) = height · weight', height * weight, nat(height, weight), 'surface', [height, weight]) }
  /** WAIST-TO-HIP RATIO as a percentage. value ⌊waist · 100 / hip⌋. */
  static ratio(waist: number, hip: number): CrossFormula { return c('anatomy-ratio', 'ratio(waist, hip) = ⌊waist · 100 / hip⌋', hip > 0 ? Math.floor((waist * 100) / hip) : 0, nat(waist, hip) && hip > 0, 'ratio', [waist, hip]) }
  /** SYMMETRY: the smaller side over the larger, as a percentage. value ⌊min · 100 / max⌋. */
  static symmetry(left: number, right: number): CrossFormula { return c('anatomy-symmetry', 'symmetry(left, right) = ⌊min · 100 / max⌋', Math.max(left, right) > 0 ? Math.floor((Math.min(left, right) * 100) / Math.max(left, right)) : 0, nat(left, right) && Math.max(left, right) > 0, 'symmetry', [left, right]) }
  /** PROPORTION: a part against the whole, as a percentage. value ⌊part · 100 / whole⌋. */
  static proportion(part: number, whole: number): CrossFormula { return c('anatomy-proportion', 'proportion(part, whole) = ⌊part · 100 / whole⌋', whole > 0 ? Math.floor((part * 100) / whole) : 0, nat(part, whole) && whole > 0 && part <= whole, 'proportion', [part, whole]) }
  /** SPAN: a length divided into segments. value ⌊length / segments⌋. */
  static span(length: number, segments: number): CrossFormula { return c('anatomy-span', 'span(length, segments) = ⌊length / segments⌋', segments > 0 ? Math.floor(length / segments) : 0, nat(length, segments) && segments > 0, 'span', [length, segments]) }
  /** VOLUME: a length at a cross-sectional area. value length · area. */
  static volume(length: number, area: number): CrossFormula { return c('anatomy-volume', 'volume(length, area) = length · area', length * area, nat(length, area), 'volume', [length, area]) }
  /** MASS: a volume at a density. value volume · density. */
  static mass(volume: number, density: number): CrossFormula { return c('anatomy-mass', 'mass(volume, density) = volume · density', volume * density, nat(volume, density), 'mass', [volume, density]) }
  /** GIRTH: a circumference proxy, about 2πr ≈ 6r. value radius · 6. */
  static girth(radius: number): CrossFormula { return c('anatomy-girth', 'girth(radius) = radius · 6', radius * 6, nat(radius), 'girth', [radius]) }
}

for (const name of ['girth', 'mass', 'proportion', 'ratio', 'span', 'surface', 'symmetry', 'volume'] as const)
  hexRegisterOf('anatomy', name, (AnatomyFormulas[name] as (...x: unknown[]) => unknown).bind(AnatomyFormulas))
