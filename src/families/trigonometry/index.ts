import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

// degrees of a half and a full turn, taken from the Lean theorems (Qpu.Pi.pi_half_turn = 180, pi_turn_degrees = 360)
// via the lattice, never hardcoded.
const { halfTurn, fullTurn } = latticeNamesOf()

/** TRIGONOMETRY — THE RIGHT TRIANGLE AND THE WAVE, AS INTEGER ARITHMETIC. Angles turn into ratios scaled by a thousand
 *  (sine, cosine, tangent), the triangle closes (hypotenuse, squared as a proxy), degrees become milliradians, and a
 *  periodic signal is read out: its period, amplitude and phase. Crosses to `code` — trig is a library a program calls.
 *  Every value a deterministic integer; every division guarded. */

const PROOF = 'trigonometry arithmetic (sine, cosine, tangent, hypotenuse, radians, period, amplitude, phase) scaled to integers x1000 via Math.round; the right triangle and the wave; crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'trigonometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `trigonometry.${name}`, params })

export class TrigonometryFormulas {
  /** SINE scaled by a thousand. value ⌊sin(deg)·1000⌉; for degrees 0..90 result is 0..1000. */
  static sine(degrees: number): CrossFormula { return c('trigonometry-sine', 'sine(degrees) = round(sin(degrees·π/180)·1000)', Math.round(Math.sin((degrees * Math.PI) / halfTurn) * 1000), nat(degrees), 'sine', [degrees]) }
  /** COSINE scaled by a thousand. value ⌊cos(deg)·1000⌉. */
  static cosine(degrees: number): CrossFormula { return c('trigonometry-cosine', 'cosine(degrees) = round(cos(degrees·π/180)·1000)', Math.round(Math.cos((degrees * Math.PI) / halfTurn) * 1000), nat(degrees), 'cosine', [degrees]) }
  /** TANGENT as the opposite over the adjacent, scaled by a thousand. value ⌊opposite·1000 / adjacent⌋. */
  static tangent(opposite: number, adjacent: number): CrossFormula { return c('trigonometry-tangent', 'tangent(opposite, adjacent) = ⌊opposite·1000 / adjacent⌋', adjacent > 0 ? Math.floor((opposite * 1000) / adjacent) : 0, nat(opposite, adjacent) && adjacent > 0, 'tangent', [opposite, adjacent]) }
  /** HYPOTENUSE squared, a proxy that stays integer. value a² + b². */
  static hypotenuse(a: number, b: number): CrossFormula { return c('trigonometry-hypotenuse', 'hypotenuse(a, b) = a² + b²', a * a + b * b, nat(a, b), 'hypotenuse', [a, b]) }
  /** RADIANS, degrees to milliradian-ish integers. value ⌊degrees·175 / 10000⌋. */
  static radians(degrees: number): CrossFormula { return c('trigonometry-radians', 'radians(degrees) = ⌊degrees·175 / 10000⌋', Math.floor((degrees * 175) / 10000), nat(degrees), 'radians', [degrees]) }
  /** PERIOD: the frequency shared across cycles. value ⌊frequency / cycles⌋. */
  static period(frequency: number, cycles: number): CrossFormula { return c('trigonometry-period', 'period(frequency, cycles) = ⌊frequency / cycles⌋', cycles > 0 ? Math.floor(frequency / cycles) : 0, nat(frequency, cycles) && cycles > 0, 'period', [frequency, cycles]) }
  /** AMPLITUDE: half the peak-to-trough swing. value ⌊(peak − trough) / 2⌋. */
  static amplitude(peak: number, trough: number): CrossFormula { return c('trigonometry-amplitude', 'amplitude(peak, trough) = ⌊(peak − trough) / 2⌋', peak >= trough ? Math.floor((peak - trough) / 2) : 0, nat(peak, trough) && peak >= trough, 'amplitude', [peak, trough]) }
  /** PHASE: the shift as degrees of the period. value ⌊shift·360 / period⌋. */
  static phase(shift: number, period_: number): CrossFormula { return c('trigonometry-phase', 'phase(shift, period_) = ⌊shift·360 / period_⌋', period_ > 0 ? Math.floor((shift * fullTurn) / period_) : 0, nat(shift, period_) && period_ > 0, 'phase', [shift, period_]) }
}

for (const name of ['amplitude', 'cosine', 'hypotenuse', 'period', 'phase', 'radians', 'sine', 'tangent'] as const)
  hexRegisterOf('trigonometry', name, (TrigonometryFormulas[name] as (...x: unknown[]) => unknown).bind(TrigonometryFormulas))
