import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COLORGRADING — THE GRADE AS ARITHMETIC. A grade is numbers: gamma scaling, contrast gain, saturation, white balance,
 *  luminance from channels, gamut clamp, lift of the shadows, and the temperature shift. Crosses to `optics` — the grade
 *  is light bent after it is captured, the same quantities optics measures. A measure. */

const PROOF = 'colorgrading arithmetic (gamma scale, contrast gain, saturation, white balance, channel luminance, gamut clamp, shadow lift, temperature shift); the grade is light after capture; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'colorgrading', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `colorgrading.${name}`, params })

export class ColorgradingFormulas {
  /** GAMMA: a value scaled by a percentage gamma. value ⌊value · pct / 100⌋. */
  static gamma(value: number, pct: number): CrossFormula { return c('colorgrading-gamma', 'gamma(value, pct) = ⌊value · pct / 100⌋', Math.floor((value * pct) / 100), nat(value, pct), 'gamma', [value, pct]) }
  /** CONTRAST: a value taken at a gain factor. value value · factor. */
  static contrast(value: number, factor: number): CrossFormula { return c('colorgrading-contrast', 'contrast(value, factor) = value · factor', value * factor, nat(value, factor), 'contrast', [value, factor]) }
  /** SATURATION: a chroma scaled by a percentage. value ⌊chroma · pct / 100⌋. */
  static saturation(chroma: number, pct: number): CrossFormula { return c('colorgrading-saturation', 'saturation(chroma, pct) = ⌊chroma · pct / 100⌋', Math.floor((chroma * pct) / 100), nat(chroma, pct), 'saturation', [chroma, pct]) }
  /** WHITE BALANCE: a channel at an 8.8 fixed-point gain. value ⌊channel · gain / 256⌋. */
  static whitebalance(channel: number, gain: number): CrossFormula { return c('colorgrading-whitebalance', 'whitebalance(channel, gain) = ⌊channel · gain / 256⌋', Math.floor((channel * gain) / 256), nat(channel, gain), 'whitebalance', [channel, gain]) }
  /** LUMINANCE: Rec.601 weights (54, 183, 19 over 256) of the channels. value ⌊(r · 54 + g · 183 + b · 19) / 256⌋. */
  static luminance(r: number, g: number, b: number): CrossFormula { return c('colorgrading-luminance', 'luminance(r, g, b) = ⌊(r · 54 + g · 183 + b · 19) / 256⌋', Math.floor((r * 54 + g * 183 + b * 19) / 256), nat(r, g, b), 'luminance', [r, g, b]) }
  /** GAMUT: a value clamped into [lo, hi]. value max(lo, min(value, hi)). */
  static gamut(value: number, lo: number, hi: number): CrossFormula { return c('colorgrading-gamut', 'gamut(value, lo, hi) = max(lo, min(value, hi))', hi >= lo ? Math.max(lo, Math.min(value, hi)) : 0, nat(value, lo, hi) && hi >= lo, 'gamut', [value, lo, hi]) }
  /** LIFT: the shadows raised by an amount. value value + amount. */
  static lift(value: number, amount: number): CrossFormula { return c('colorgrading-lift', 'lift(value, amount) = value + amount', value + amount, nat(value, amount), 'lift', [value, amount]) }
  /** TEMPERATURE: a value cooled by a shift, floored at 0. value max(0, value − shift). */
  static temperature(value: number, shift: number): CrossFormula { return c('colorgrading-temperature', 'temperature(value, shift) = max(0, value − shift)', Math.max(0, value - shift), nat(value, shift), 'temperature', [value, shift]) }
}

for (const name of ['contrast', 'gamma', 'gamut', 'lift', 'luminance', 'saturation', 'temperature', 'whitebalance'] as const)
  hexRegisterOf('colorgrading', name, (ColorgradingFormulas[name] as (...x: unknown[]) => unknown).bind(ColorgradingFormulas))
