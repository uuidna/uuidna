import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NOISE — ACOUSTIC LEVELS AS ARITHMETIC (chosen by the registry, not by hand). Sound is numbers: signal over noise,
 *  two sources combined, loss over distance, the dose an exposure carries, what a barrier removes, the threshold a
 *  masker raises, the average floor, and the range between peak and floor. Decibels as integer proxies, no logs.
 *  Crosses to `acoustics` — noise is the acoustics the world measures. A measure. */

const PROOF = 'noise arithmetic (snr, summed levels, attenuation, exposure dose, noise reduction, masking threshold, floor, dynamic range); decibels as integer proxies with no logs; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'noise', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `noise.${name}`, params })

export class NoiseFormulas {
  /** SIGNAL-TO-NOISE: the signal level above the noise level, in dB. value max(0, signal − noise). */
  static snr(signal: number, noise: number): CrossFormula { return c('noise-snr', 'snr(signal, noise) = max(0, signal − noise)', Math.max(0, signal - noise), nat(signal, noise), 'snr', [signal, noise]) }
  /** SUMMED LEVELS: two sources combined as an energy proxy. value a + b. */
  static sumlevels(a: number, b: number): CrossFormula { return c('noise-sumlevels', 'sumlevels(a, b) = a + b', a + b, nat(a, b), 'sumlevels', [a, b]) }
  /** ATTENUATION: a level after a propagation loss, in dB. value max(0, level − loss). */
  static attenuation(level: number, loss: number): CrossFormula { return c('noise-attenuation', 'attenuation(level, loss) = max(0, level − loss)', Math.max(0, level - loss), nat(level, loss), 'attenuation', [level, loss]) }
  /** EXPOSURE DOSE: a level sustained over hours. value level · hours. */
  static exposuredose(level: number, hours: number): CrossFormula { return c('noise-exposuredose', 'exposuredose(level, hours) = level · hours', level * hours, nat(level, hours), 'exposuredose', [level, hours]) }
  /** NOISE REDUCTION: what a barrier removes from the outside level, in dB. value max(0, outside − barrier). */
  static nr(outside: number, barrier: number): CrossFormula { return c('noise-nr', 'nr(outside, barrier) = max(0, outside − barrier)', Math.max(0, outside - barrier), nat(outside, barrier), 'nr', [outside, barrier]) }
  /** MASKING THRESHOLD: a masker raises the threshold to a percentage of its level. value ⌊masker · ratio / 100⌋. */
  static maskingthreshold(masker: number, ratio: number): CrossFormula { return c('noise-maskingthreshold', 'maskingthreshold(masker, ratio) = ⌊masker · ratio / 100⌋', Math.floor((masker * ratio) / 100), nat(masker, ratio), 'maskingthreshold', [masker, ratio]) }
  /** NOISE FLOOR: the average ambient level over the samples taken. value ⌊total / samples⌋. */
  static floor(total: number, samples: number): CrossFormula { return c('noise-floor', 'floor(total, samples) = ⌊total / samples⌋', samples > 0 ? Math.floor(total / samples) : 0, nat(total, samples) && samples > 0, 'floor', [total, samples]) }
  /** DYNAMIC RANGE: the span from peak down to the floor, in dB. value max(0, peak − floor). */
  static dynamicrange(peak: number, floor: number): CrossFormula { return c('noise-dynamicrange', 'dynamicrange(peak, floor) = max(0, peak − floor)', Math.max(0, peak - floor), nat(peak, floor), 'dynamicrange', [peak, floor]) }
}

for (const name of ['attenuation', 'dynamicrange', 'exposuredose', 'floor', 'maskingthreshold', 'nr', 'snr', 'sumlevels'] as const)
  hexRegisterOf('noise', name, (NoiseFormulas[name] as (...x: unknown[]) => unknown).bind(NoiseFormulas))
