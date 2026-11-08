import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FILTERS — ANALOG SIGNAL FILTERS, AS ARITHMETIC. A filter is numbers: the cutoff frequency set by its RC, the roll-off
 *  slope its poles give, the quality factor, the bandwidth between its edges, the order needed for an attenuation, the
 *  passband gain after ripple, the stopband attenuation, and the ripple itself. Crosses to `electronics` — a filter is a
 *  circuit. A measure. */

const PROOF = 'filters arithmetic (RC cutoff, roll-off slope, quality factor, bandwidth, order, passband gain, stopband attenuation, ripple); analog filters as a circuit; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'filters', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `filters.${name}`, params })

export class FiltersFormulas {
  /** CUTOFF FREQUENCY from an RC pair. value ⌊10⁶ / (res · cap)⌋. */
  static cutoff(res: number, cap: number): CrossFormula { return c('filters-cutoff', 'cutoff(res, cap) = ⌊10⁶ / (res · cap)⌋', res * cap > 0 ? Math.floor(1000000 / (res * cap)) : 0, nat(res, cap) && res > 0 && cap > 0, 'cutoff', [res, cap]) }
  /** ROLL-OFF: the slope in dB, 6 dB per octave per pole. value poles · 6 · octaves. */
  static rolloff(poles: number, octaves: number): CrossFormula { return c('filters-rolloff', 'rolloff(poles, octaves) = poles · 6 · octaves', poles * 6 * octaves, nat(poles, octaves), 'rolloff', [poles, octaves]) }
  /** QUALITY FACTOR: centre frequency over bandwidth. value ⌊freq / bw⌋. */
  static qfactor(freq: number, bw: number): CrossFormula { return c('filters-qfactor', 'qfactor(freq, bw) = ⌊freq / bw⌋', bw > 0 ? Math.floor(freq / bw) : 0, nat(freq, bw) && bw > 0, 'qfactor', [freq, bw]) }
  /** BANDWIDTH between the upper and lower edges. value max(0, high − low). */
  static bandwidth(high: number, low: number): CrossFormula { return c('filters-bandwidth', 'bandwidth(high, low) = max(0, high − low)', Math.max(0, high - low), nat(high, low) && high >= low, 'bandwidth', [high, low]) }
  /** ORDER: the poles needed for an attenuation at a per-pole slope. value ⌈atten / perPole⌉. */
  static order(atten: number, perPole: number): CrossFormula { return c('filters-order', 'order(atten, perPole) = ⌈atten / perPole⌉', perPole > 0 ? Math.ceil(atten / perPole) : 0, nat(atten, perPole) && perPole > 0, 'order', [atten, perPole]) }
  /** PASSBAND gain after the ripple is spent. value max(0, gain − ripple). */
  static passband(gain: number, ripple: number): CrossFormula { return c('filters-passband', 'passband(gain, ripple) = max(0, gain − ripple)', Math.max(0, gain - ripple), nat(gain, ripple) && gain >= ripple, 'passband', [gain, ripple]) }
  /** STOPBAND attenuation: the poles at a per-pole attenuation. value poles · perPole. */
  static stopband(poles: number, perPole: number): CrossFormula { return c('filters-stopband', 'stopband(poles, perPole) = poles · perPole', poles * perPole, nat(poles, perPole), 'stopband', [poles, perPole]) }
  /** RIPPLE: a percentage of the amplitude. value ⌊amp · percent / 100⌋. */
  static ripple(amp: number, percent: number): CrossFormula { return c('filters-ripple', 'ripple(amp, percent) = ⌊amp · percent / 100⌋', Math.floor((amp * percent) / 100), nat(amp, percent), 'ripple', [amp, percent]) }
}

for (const name of ['bandwidth', 'cutoff', 'order', 'passband', 'qfactor', 'ripple', 'rolloff', 'stopband'] as const)
  hexRegisterOf('filters', name, (FiltersFormulas[name] as (...x: unknown[]) => unknown).bind(FiltersFormulas))
