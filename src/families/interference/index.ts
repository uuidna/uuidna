import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** INTERFERENCE — SUPERPOSITION OF WAVES, AS ARITHMETIC. When two waves overlap, the result is numbers: amplitudes that add
 *  in phase or cancel out of phase, the visibility of the fringes, optical path through a medium, the phase difference a path
 *  buys, how many fringes fit a region, the path doubled through a thin film, and the beat two close frequencies make.
 *  Crosses to `electromagnetism` — interference is what light, the electromagnetic wave, does. A measure. */

const PROOF = 'interference arithmetic (constructive/destructive amplitude, fringe visibility, optical path, phase difference, fringe count, thin film, beat frequency); superposition of waves; a measure crossed to electromagnetism'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'interference', dst: 'electromagnetism', formula, value, proof: PROOF, ...extra }, holds, { name: `interference.${name}`, params })

export class InterferenceFormulas {
  /** BEAT FREQUENCY: the difference of two close frequencies. value max(0, f1 − f2). */
  static beatfrequency(f1: number, f2: number): CrossFormula { return c('interference-beatfrequency', 'beatfrequency(f1, f2) = max(0, f1 − f2)', Math.max(0, f1 - f2), nat(f1, f2), 'beatfrequency', [f1, f2]) }
  /** CONSTRUCTIVE: amplitudes add when the waves are in phase. value a1 + a2. */
  static constructive(a1: number, a2: number): CrossFormula { return c('interference-constructive', 'constructive(a1, a2) = a1 + a2', a1 + a2, nat(a1, a2), 'constructive', [a1, a2]) }
  /** DESTRUCTIVE: amplitudes subtract when the waves are out of phase. value max(0, a1 − a2). */
  static destructive(a1: number, a2: number): CrossFormula { return c('interference-destructive', 'destructive(a1, a2) = max(0, a1 − a2)', Math.max(0, a1 - a2), nat(a1, a2), 'destructive', [a1, a2]) }
  /** FRINGE COUNT: the fringes that fit a region at a spacing. value ⌊width / spacing⌋. */
  static fringecount(width: number, spacing: number): CrossFormula { return c('interference-fringecount', 'fringecount(width, spacing) = ⌊width / spacing⌋', spacing > 0 ? Math.floor(width / spacing) : 0, nat(width, spacing) && spacing > 0, 'fringecount', [width, spacing]) }
  /** OPTICAL PATH: refractive index times the geometric path. value n · d. */
  static opticalpath(n: number, d: number): CrossFormula { return c('interference-opticalpath', 'opticalpath(n, d) = n · d', n * d, nat(n, d), 'opticalpath', [n, d]) }
  /** PHASE DIFFERENCE: the degrees a path difference buys at a wavelength. value ⌊path · 360 / wavelength⌋. */
  static phasedifference(path: number, wavelength: number): CrossFormula { return c('interference-phasedifference', 'phasedifference(path, wavelength) = ⌊path · 360 / wavelength⌋', wavelength > 0 ? Math.floor((path * fullTurn) / wavelength) : 0, nat(path, wavelength) && wavelength > 0, 'phasedifference', [path, wavelength]) }
  /** THIN FILM: the path difference doubled through a film of index n. value 2 · n · thickness. */
  static thinfilm(n: number, thickness: number): CrossFormula { return c('interference-thinfilm', 'thinfilm(n, thickness) = 2 · n · thickness', 2 * n * thickness, nat(n, thickness), 'thinfilm', [n, thickness]) }
  /** VISIBILITY: Michelson fringe visibility as a percentage. value ⌊(imax − imin) · 100 / (imax + imin)⌋. */
  static visibility(imax: number, imin: number): CrossFormula { return c('interference-visibility', 'visibility(imax, imin) = ⌊(imax − imin) · 100 / (imax + imin)⌋', (imax + imin) > 0 ? Math.floor((Math.max(0, imax - imin) * 100) / (imax + imin)) : 0, nat(imax, imin) && (imax + imin) > 0 && imin <= imax, 'visibility', [imax, imin]) }
}

for (const name of ['beatfrequency', 'constructive', 'destructive', 'fringecount', 'opticalpath', 'phasedifference', 'thinfilm', 'visibility'] as const)
  hexRegisterOf('interference', name, (InterferenceFormulas[name] as (...x: unknown[]) => unknown).bind(InterferenceFormulas))
