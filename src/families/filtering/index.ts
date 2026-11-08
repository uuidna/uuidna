import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FILTERING — SHAPING A SIGNAL IN FREQUENCY, AS ARITHMETIC. A filter is numbers: the cutoff frequency it turns at, the
 *  width of the band it passes, where the stopband begins, how steeply it rolls off, the order that steepness needs, the
 *  group delay its taps impose, the attenuation it reaches, and the bandwidth around a centre. Crosses to `signal` —
 *  filtering is what shapes a signal. A measure. */

const PROOF = 'filtering arithmetic (cutoff, passband, stopband, rolloff, order, group delay, attenuation, bandwidth); a frequency-domain measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'filtering', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `filtering.${name}`, params })

export class FilteringFormulas {
  /** CUTOFF: the frequency a filter turns at, a fraction of the sample rate. value ⌊sample / div⌋. */
  static cutoff(sample: number, div: number): CrossFormula { return c('filtering-cutoff', 'cutoff(sample, div) = ⌊sample / div⌋', div > 0 ? Math.floor(sample / div) : 0, nat(sample, div) && div > 0, 'cutoff', [sample, div]) }
  /** PASSBAND: the width of the band a filter passes. value max(0, high − low). */
  static passband(high: number, low: number): CrossFormula { return c('filtering-passband', 'passband(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low), 'passband', [high, low]) }
  /** STOPBAND: where attenuation begins, a transition above the cutoff. value cutoff + transition. */
  static stopband(cutoff: number, transition: number): CrossFormula { return c('filtering-stopband', 'stopband(cutoff, transition) = cutoff + transition', cutoff + transition, nat(cutoff, transition), 'stopband', [cutoff, transition]) }
  /** ROLLOFF: the slope past the cutoff, 6 dB per octave per order. value order · 6. */
  static rolloff(order: number): CrossFormula { return c('filtering-rolloff', 'rolloff(order) = order · 6', order * 6, nat(order), 'rolloff', [order]) }
  /** ORDER: the order a required attenuation needs at a slope per octave. value ⌈atten / perOctave⌉. */
  static order(atten: number, perOctave: number): CrossFormula { return c('filtering-order', 'order(atten, perOctave) = ⌈atten / perOctave⌉', perOctave > 0 ? Math.ceil(atten / perOctave) : 0, nat(atten, perOctave) && perOctave > 0, 'order', [atten, perOctave]) }
  /** GROUP DELAY: the delay a linear-phase FIR imposes, half its taps. value ⌊max(0, taps − 1) / 2⌋. */
  static groupdelay(taps: number): CrossFormula { return c('filtering-groupdelay', 'groupdelay(taps) = ⌊max(0, taps − 1) / 2⌋', Math.floor(Math.max(0, taps - 1) / 2), nat(taps), 'groupdelay', [taps]) }
  /** ATTENUATION: the stopband attenuation an order reaches over octaves. value order · 6 · octaves. */
  static attenuation(order: number, octaves: number): CrossFormula { return c('filtering-attenuation', 'attenuation(order, octaves) = order · 6 · octaves', order * 6 * octaves, nat(order, octaves), 'attenuation', [order, octaves]) }
  /** BANDWIDTH: the band around a centre at a quality factor. value ⌊centre / q⌋. */
  static bandwidth(centre: number, q: number): CrossFormula { return c('filtering-bandwidth', 'bandwidth(centre, q) = ⌊centre / q⌋', q > 0 ? Math.floor(centre / q) : 0, nat(centre, q) && q > 0, 'bandwidth', [centre, q]) }
}

for (const name of ['attenuation', 'bandwidth', 'cutoff', 'groupdelay', 'order', 'passband', 'rolloff', 'stopband'] as const)
  hexRegisterOf('filtering', name, (FilteringFormulas[name] as (...x: unknown[]) => unknown).bind(FilteringFormulas))
