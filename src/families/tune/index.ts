import { mintOf, hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** A432 AS THE STARTER OF THE CHAIN, DIFFERENT WAVELENGTHS CROSSING THE FRACTAL AT ONCE. The fundamental is not chosen,
 *  it is derived: the lattice already proves 432 = 2^hexbit · (plane − seed) = 16 · 27 (theorem presentation_stylesheet_hz,
 *  Qpu.Clay). From that one frequency the chain reacts — a vibrating string's modes are the integer harmonics n · f₀
 *  (string theory's overtone series), the octaves are the self-similar doublings f₀ · 2^k (the fractal, every band at
 *  once by the mintOf doubling), and the fifths stack ×3/2 into the circle that never quite closes. Each wavelength is
 *  a natural; speed of sound 343 m/s gives the metre. The whole harmonic fractal crosses the lattice from 432. */

const L = { ...latticeNamesOf() }
const PLANE = L.coins * L.coins * L.rays // 28
const A432 = mintOf(L.hexbit) * (PLANE - L.seed) // 16 · 27 = 432, from the lattice
const SOUND = 343000 // mm/s, the speed of sound
const PROOF = 'theorem presentation_stylesheet_hz: 2^hexbit · (plane − seed) = 432 (Qpu.Clay); the harmonic series n·f₀ (a string’s modes); octaves f₀·2^k; the Pythagorean fifth 3/2; sound 343 m/s'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tune', dst: 'physics', formula, value, proof: PROOF, ...extra }, holds, { name: `tune.${name}`, params })

export class TuneFormulas {
  /** The fundamental A432, derived from the lattice: 2^hexbit · (plane − seed) = 432 Hz. Holds when it equals 432 —
   *  the starter of the chain, cross-formulated, not tuned by hand. */
  static fundamental(): CrossFormula { return f('tune-fundamental', 'fundamental = 2^hexbit · (plane − seed) Hz', A432, A432 === 432, 'fundamental', [], { lattice: `2^${L.hexbit} · (${PLANE} − ${L.seed})` }) }
  /** The n-th harmonic of A432: n · 432 Hz — a vibrating string's n-th mode (string theory's overtone series), the chain reacting from the fundamental. */
  static harmonic(n: number): CrossFormula { return f('tune-harmonic', 'harmonic(n) = n · 432 Hz (the string’s n-th mode)', n * A432, nat(n) && n > 0, 'harmonic', [n]) }
  /** The k-th octave of A432: 432 · 2^k Hz — the self-similar fractal doubling (the mintOf doubling), every band the same shape at a new scale. */
  static octave(k: number): CrossFormula { return f('tune-octave', 'octave(k) = 432 · 2^k Hz', A432 * mintOf(k), nat(k) && k < 24, 'octave', [k], { fractal: 'self-similar doubling' }) }
  /** The wavelength of a frequency in air, in millimetres: 343000 / hz — the physical length of the wave. */
  static wavelength(hz: number): CrossFormula { return f('tune-wavelength', 'wavelength(hz) = 343000 mm/s / hz', hz > 0 ? Math.round(SOUND / hz) : 0, nat(hz) && hz > 0, 'wavelength', [hz]) }
  /** The k-th perfect fifth stacked from A432 and folded into the starting octave, in Hz: 432 · (3/2)^k mod the octave
   *  — the Pythagorean chain, the reaction that spirals and never exactly returns. */
  static fifth(k: number): CrossFormula {
    let hz = A432
    for (let i = 0; i < k; i++) { hz = (hz * 3) / 2; while (hz >= A432 * 2) hz /= 2 }
    return f('tune-fifth', 'fifth(k) = 432 · (3/2)^k folded into [432, 864) Hz', Math.round(hz), nat(k) && k < 24, 'fifth', [k], { chain: 'circle of fifths' })
  }
  /** An interval num/den in cents: round(1200 · log₂(num/den)) — the measure the harmonic lattice is read in. */
  static cents(num: number, den: number): CrossFormula { return f('tune-cents', 'cents(num, den) = 1200 · log₂(num / den)', num > 0 && den > 0 ? Math.round(1200 * Math.log2(num / den)) : 0, nat(num, den) && num > 0 && den > 0, 'cents', [num, den]) }
  /** The fractal depth up to the n-th harmonic: how many self-similar octave bands it spans, ⌊log₂ n⌋ + 1 — the whole
   *  fractal counted at once from the one starter. */
  static fractal(n: number): CrossFormula { return f('tune-fractal', 'fractal(n) = ⌊log₂ n⌋ + 1 (octave bands up to the n-th harmonic)', n > 0 ? Math.floor(Math.log2(n)) + 1 : 0, nat(n) && n > 0, 'fractal', [n]) }
}

for (const name of ['cents', 'fifth', 'fractal', 'fundamental', 'harmonic', 'octave', 'wavelength'] as const)
  hexRegisterOf('tune', name, (TuneFormulas[name] as (...x: unknown[]) => unknown).bind(TuneFormulas))
