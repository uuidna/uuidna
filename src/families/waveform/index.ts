import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WAVEFORM — A SIGNAL AS ARITHMETIC. A periodic signal is numbers: its period from frequency, amplitude from the swing,
 *  the RMS value, the duty cycle, the crest factor, the peak-to-peak span, the frequency back from a period, and the slew
 *  rate. Crosses to `signal` — a waveform is the signal these measures describe. A measure. */

const PROOF = 'waveform arithmetic (period, amplitude, rms, duty cycle, crest factor, peak-to-peak, frequency-from-period, slew rate); a periodic signal as integers; a measure crossed to signal'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'waveform', dst: 'signal', formula, value, proof: PROOF, ...extra }, holds, { name: `waveform.${name}`, params })

export class WaveformFormulas {
  /** AMPLITUDE: half the swing between max and min. value ⌊max(0, max − min) / 2⌋. */
  static amplitude(max: number, min: number): CrossFormula { return c('waveform-amplitude', 'amplitude(max, min) = ⌊max(0, max − min) / 2⌋', Math.floor(Math.max(0, max - min) / 2), nat(max, min) && max >= min, 'amplitude', [max, min]) }
  /** CREST FACTOR: peak over rms, scaled by 1000. value ⌊peak · 1000 / rms⌋. */
  static crestfactor(peak: number, rms: number): CrossFormula { return c('waveform-crestfactor', 'crestfactor(peak, rms) = ⌊peak · 1000 / rms⌋', rms > 0 ? Math.floor((peak * 1000) / rms) : 0, nat(peak, rms) && rms > 0, 'crestfactor', [peak, rms]) }
  /** DUTY CYCLE: the on-time as a percentage of the period. value ⌊on · 100 / period⌋. */
  static dutycycle(on: number, period: number): CrossFormula { return c('waveform-dutycycle', 'dutycycle(on, period) = ⌊on · 100 / period⌋', period > 0 ? Math.floor((on * 100) / period) : 0, nat(on, period) && period > 0 && on <= period, 'dutycycle', [on, period]) }
  /** FREQUENCY FROM PERIOD: the inverse of a period in microseconds. value ⌊1000000 / period⌋. */
  static frequencyfromperiod(period: number): CrossFormula { return c('waveform-frequencyfromperiod', 'frequencyfromperiod(period) = ⌊1000000 / period⌋', period > 0 ? Math.floor(1000000 / period) : 0, nat(period) && period > 0, 'frequencyfromperiod', [period]) }
  /** PEAK-TO-PEAK: the full span from min to max. value max(0, max − min). */
  static peaktopeak(max: number, min: number): CrossFormula { return c('waveform-peaktopeak', 'peaktopeak(max, min) = max(0, max − min)', Math.max(0, max - min), nat(max, min) && max >= min, 'peaktopeak', [max, min]) }
  /** PERIOD: microseconds per cycle from a frequency. value ⌊1000000 / freq⌋. */
  static period(freq: number): CrossFormula { return c('waveform-period', 'period(freq) = ⌊1000000 / freq⌋', freq > 0 ? Math.floor(1000000 / freq) : 0, nat(freq) && freq > 0, 'period', [freq]) }
  /** RMS VALUE: the root-mean-square of a sine, peak · √2⁻¹ ≈ peak · 707 / 1000. value ⌊peak · 707 / 1000⌋. */
  static rmsvalue(peak: number): CrossFormula { return c('waveform-rmsvalue', 'rmsvalue(peak) = ⌊peak · 707 / 1000⌋', Math.floor((peak * 707) / 1000), nat(peak), 'rmsvalue', [peak]) }
  /** SLEW RATE: voltage change over the time it took. value ⌊delta / time⌋. */
  static slewrate(delta: number, time: number): CrossFormula { return c('waveform-slewrate', 'slewrate(delta, time) = ⌊delta / time⌋', time > 0 ? Math.floor(delta / time) : 0, nat(delta, time) && time > 0, 'slewrate', [delta, time]) }
}

for (const name of ['amplitude', 'crestfactor', 'dutycycle', 'frequencyfromperiod', 'peaktopeak', 'period', 'rmsvalue', 'slewrate'] as const)
  hexRegisterOf('waveform', name, (WaveformFormulas[name] as (...x: unknown[]) => unknown).bind(WaveformFormulas))
