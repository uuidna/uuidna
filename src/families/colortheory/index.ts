import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** COLORTHEORY — COLOR AS ARITHMETIC (chosen by the registry, not by hand). A color is numbers: the complement of a hue,
 *  the luminance of a channel triple, the contrast between two tones, the gray of a pixel, a blend of two values, a hue
 *  rotation, the saturation of a swatch, and a tint toward white. Crosses to `colorgrading` — colortheory is what grading
 *  applies. A measure. */

const PROOF = 'colortheory arithmetic (complement, luminance, contrast ratio, grayscale, blend, hue shift, saturation, tint); color as exact integer channels; a measure crossed to colorgrading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'colortheory', dst: 'colorgrading', formula, value, proof: PROOF, ...extra }, holds, { name: `colortheory.${name}`, params })

export class ColortheoryFormulas {
  /** COMPLEMENT: the opposite hue on the wheel. value 360 − hue. */
  static complement(hue: number): CrossFormula { return c('colortheory-complement', 'complement(hue) = 360 − hue', Math.max(0, 360 - hue), nat(hue) && hue <= 360, 'complement', [hue]) }
  /** LUMINANCE: perceived brightness of a channel triple. value ⌊(r·54 + g·183 + b·19) / 256⌋. */
  static luminance(r: number, g: number, b: number): CrossFormula { return c('colortheory-luminance', 'luminance(r, g, b) = ⌊(r·54 + g·183 + b·19) / 256⌋', Math.floor((r * 54 + g * 183 + b * 19) / 256), nat(r, g, b) && r <= 255 && g <= 255 && b <= 255, 'luminance', [r, g, b]) }
  /** CONTRAST RATIO: lighter over darker tone, scaled by 100. value ⌊(max + 5) · 100 / (min + 5)⌋. */
  static contrastratio(l1: number, l2: number): CrossFormula { return c('colortheory-contrastratio', 'contrastratio(l1, l2) = ⌊(max + 5) · 100 / (min + 5)⌋', (Math.min(l1, l2) + 5) > 0 ? Math.floor(((Math.max(l1, l2) + 5) * 100) / (Math.min(l1, l2) + 5)) : 0, nat(l1, l2), 'contrastratio', [l1, l2]) }
  /** GRAYSCALE: the average of three channels. value ⌊(r + g + b) / 3⌋. */
  static grayscale(r: number, g: number, b: number): CrossFormula { return c('colortheory-grayscale', 'grayscale(r, g, b) = ⌊(r + g + b) / 3⌋', Math.floor((r + g + b) / 3), nat(r, g, b) && r <= 255 && g <= 255 && b <= 255, 'grayscale', [r, g, b]) }
  /** BLEND: a linear mix of two values at t percent. value ⌊(a · (100 − t) + b · t) / 100⌋. */
  static blend(a: number, b: number, t: number): CrossFormula { return c('colortheory-blend', 'blend(a, b, t) = ⌊(a · (100 − t) + b · t) / 100⌋', Math.floor((a * Math.max(0, 100 - t) + b * t) / 100), nat(a, b, t) && t <= 100, 'blend', [a, b, t]) }
  /** HUE SHIFT: rotate a hue by some degrees around the wheel. value (hue + deg) mod 360. */
  static hueshift(hue: number, deg: number): CrossFormula { return c('colortheory-hueshift', 'hueshift(hue, deg) = (hue + deg) mod 360', (hue + deg) % fullTurn, nat(hue, deg), 'hueshift', [hue, deg]) }
  /** SATURATION: the chroma of a swatch as a percentage. value ⌊(max − min) · 100 / max⌋. */
  static saturation(max: number, min: number): CrossFormula { return c('colortheory-saturation', 'saturation(max, min) = ⌊(max − min) · 100 / max⌋', max > 0 ? Math.floor((Math.max(0, max - min) * 100) / max) : 0, nat(max, min) && min <= max && max <= 255, 'saturation', [max, min]) }
  /** TINT: lighten a channel toward white by t percent. value c + ⌊(255 − c) · t / 100⌋. */
  static tint(c0: number, t: number): CrossFormula { return c('colortheory-tint', 'tint(c, t) = c + ⌊(255 − c) · t / 100⌋', c0 + Math.floor((Math.max(0, 255 - c0) * t) / 100), nat(c0, t) && c0 <= 255 && t <= 100, 'tint', [c0, t]) }
}

for (const name of ['blend', 'complement', 'contrastratio', 'grayscale', 'hueshift', 'luminance', 'saturation', 'tint'] as const)
  hexRegisterOf('colortheory', name, (ColortheoryFormulas[name] as (...x: unknown[]) => unknown).bind(ColortheoryFormulas))
