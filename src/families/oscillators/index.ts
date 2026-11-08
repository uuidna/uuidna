import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** OSCILLATORS — PERIODIC SIGNALS AS ARITHMETIC. A running oscillator is numbers: its frequency from the cycles it turns
 *  in a span, the period of one cycle, the duty a square wave holds high, the phase a shift lands at, the resonant point of
 *  an LC tank, the nth harmonic of a fundamental, the jitter averaged over samples, and the stability drift in ppm. Crosses
 *  to `electronics` — an oscillator is the clock electronics runs on. A measure. */

const PROOF = 'oscillators arithmetic (frequency, period, duty cycle, phase, LC resonance, harmonics, jitter, stability ppm); periodic signals as integers; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'oscillators', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `oscillators.${name}`, params })

export class OscillatorsFormulas {
  /** FREQUENCY: cycles turned over a span of seconds. value ⌊cycles / seconds⌋ (Hz). */
  static frequency(cycles: number, seconds: number): CrossFormula { return c('oscillators-frequency', 'frequency(cycles, seconds) = ⌊cycles / seconds⌋', seconds > 0 ? Math.floor(cycles / seconds) : 0, nat(cycles, seconds) && seconds > 0, 'frequency', [cycles, seconds]) }
  /** PERIOD: time of one cycle from a total span. value ⌊total / cycles⌋. */
  static period(total: number, cycles: number): CrossFormula { return c('oscillators-period', 'period(total, cycles) = ⌊total / cycles⌋', cycles > 0 ? Math.floor(total / cycles) : 0, nat(total, cycles) && cycles > 0, 'period', [total, cycles]) }
  /** DUTY CYCLE: fraction a wave is held high, as a percentage. value ⌊on · 100 / total⌋. */
  static dutycycle(on: number, total: number): CrossFormula { return c('oscillators-dutycycle', 'dutycycle(on, total) = ⌊on · 100 / total⌋', total > 0 ? Math.floor((on * 100) / total) : 0, nat(on, total) && total > 0 && on <= total, 'dutycycle', [on, total]) }
  /** PHASE: a shift of the period, in degrees. value ⌊shift · 360 / period⌋. */
  static phase(shift: number, period: number): CrossFormula { return c('oscillators-phase', 'phase(shift, period) = ⌊shift · 360 / period⌋', period > 0 ? Math.floor((shift * fullTurn) / period) : 0, nat(shift, period) && period > 0, 'phase', [shift, period]) }
  /** RESONANCE: the resonant point of an LC tank. value ⌊1000000 / (l · cc)⌋. */
  static resonance(l: number, cc: number): CrossFormula { return c('oscillators-resonance', 'resonance(l, cc) = ⌊1000000 / (l · cc)⌋', l * cc > 0 ? Math.floor(1000000 / (l * cc)) : 0, nat(l, cc) && l * cc > 0, 'resonance', [l, cc]) }
  /** HARMONICS: the nth harmonic of a fundamental. value fundamental · n. */
  static harmonics(fundamental: number, n: number): CrossFormula { return c('oscillators-harmonics', 'harmonics(fundamental, n) = fundamental · n', fundamental * n, nat(fundamental, n), 'harmonics', [fundamental, n]) }
  /** JITTER: timing error averaged over the samples taken. value ⌊total / samples⌋. */
  static jitter(total: number, samples: number): CrossFormula { return c('oscillators-jitter', 'jitter(total, samples) = ⌊total / samples⌋', samples > 0 ? Math.floor(total / samples) : 0, nat(total, samples) && samples > 0, 'jitter', [total, samples]) }
  /** STABILITY: drift against a nominal, in parts per million. value ⌊drift · 1000000 / nominal⌋. */
  static stability(drift: number, nominal: number): CrossFormula { return c('oscillators-stability', 'stability(drift, nominal) = ⌊drift · 1000000 / nominal⌋', nominal > 0 ? Math.floor((drift * 1000000) / nominal) : 0, nat(drift, nominal) && nominal > 0, 'stability', [drift, nominal]) }
}

for (const name of ['dutycycle', 'frequency', 'harmonics', 'jitter', 'period', 'phase', 'resonance', 'stability'] as const)
  hexRegisterOf('oscillators', name, (OscillatorsFormulas[name] as (...x: unknown[]) => unknown).bind(OscillatorsFormulas))
