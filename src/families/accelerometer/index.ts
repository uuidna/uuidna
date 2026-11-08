import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACCELEROMETER — A MOTION SENSOR, AS ARITHMETIC (chosen by the sensor registry, not by hand). Reading motion is numbers:
 *  the g-force a raw count means, sensitivity in output per g, the Nyquist bandwidth, the tilt angle off an axis, the RMS of
 *  a vibration, the zero-g offset, the full-scale span, and the sample rate over time. Crosses to `mechanical` — an
 *  accelerometer is what measures mechanical motion. A measure. */

const PROOF = 'accelerometer arithmetic (g-force, sensitivity, bandwidth, tilt, vibration RMS, zero-g offset, full-scale span, sample rate); a motion sensor read as a measure crossed to mechanical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'accelerometer', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `accelerometer.${name}`, params })

export class AccelerometerFormulas {
  /** G-FORCE: a raw acceleration count in units of the gravity count. value ⌊accel / g⌋. */
  static gforce(accel: number, g: number): CrossFormula { return c('accelerometer-gforce', 'gforce(accel, g) = ⌊accel / g⌋', g > 0 ? Math.floor(accel / g) : 0, nat(accel, g) && g > 0, 'gforce', [accel, g]) }
  /** SENSITIVITY: output millivolts over the g-range. value ⌊mv / grange⌋. */
  static sensitivity(mv: number, grange: number): CrossFormula { return c('accelerometer-sensitivity', 'sensitivity(mv, grange) = ⌊mv / grange⌋', grange > 0 ? Math.floor(mv / grange) : 0, nat(mv, grange) && grange > 0, 'sensitivity', [mv, grange]) }
  /** BANDWIDTH: the Nyquist limit of a sample rate. value ⌊rate / 2⌋. */
  static bandwidth(rate: number): CrossFormula { return c('accelerometer-bandwidth', 'bandwidth(rate) = ⌊rate / 2⌋', Math.floor(rate / 2), nat(rate), 'bandwidth', [rate]) }
  /** TILT: the degrees an axis reads of a full-scale quarter turn. value ⌊axis · 90 / full⌋. */
  static tilt(axis: number, full: number): CrossFormula { return c('accelerometer-tilt', 'tilt(axis, full) = ⌊axis · 90 / full⌋', full > 0 ? Math.floor((axis * 90) / full) : 0, nat(axis, full) && full > 0 && axis <= full, 'tilt', [axis, full]) }
  /** VIBRATION RMS: the RMS of a sinusoid at a peak (0.707 · peak). value ⌊peak · 707 / 1000⌋. */
  static vibrationrms(peak: number): CrossFormula { return c('accelerometer-vibrationrms', 'vibrationrms(peak) = ⌊peak · 707 / 1000⌋', Math.floor((peak * 707) / 1000), nat(peak), 'vibrationrms', [peak]) }
  /** ZERO-G OFFSET: how far a measured count sits above its reference. value max(0, measured − reference). */
  static offset(measured: number, reference: number): CrossFormula { return c('accelerometer-offset', 'offset(measured, reference) = max(0, measured − reference)', Math.max(0, measured - reference), nat(measured, reference), 'offset', [measured, reference]) }
  /** FULL-SCALE: the ±range span of a g-range. value range · 2. */
  static fullscale(range: number): CrossFormula { return c('accelerometer-fullscale', 'fullscale(range) = range · 2', range * 2, nat(range), 'fullscale', [range]) }
  /** SAMPLE RATE: samples over seconds. value ⌊samples / seconds⌋. */
  static samplerate(samples: number, seconds: number): CrossFormula { return c('accelerometer-samplerate', 'samplerate(samples, seconds) = ⌊samples / seconds⌋', seconds > 0 ? Math.floor(samples / seconds) : 0, nat(samples, seconds) && seconds > 0, 'samplerate', [samples, seconds]) }
}

for (const name of ['bandwidth', 'fullscale', 'gforce', 'offset', 'samplerate', 'sensitivity', 'tilt', 'vibrationrms'] as const)
  hexRegisterOf('accelerometer', name, (AccelerometerFormulas[name] as (...x: unknown[]) => unknown).bind(AccelerometerFormulas))
