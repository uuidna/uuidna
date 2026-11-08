import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONIC — THE SECTIONS OF A CONE, AS ARITHMETIC. A conic is numbers: its eccentricity, the focal length, the directrix
 *  distance, the latus rectum, the semi-major and semi-minor axes, the discriminant that names the curve, and the span
 *  from centre to vertex. Integer proxies throughout (squared lengths, scaled ratios — no sqrt). Crosses to `geometry` —
 *  a conic is geometry made of foci and axes. A measure. */

const PROOF = 'conic arithmetic (eccentricity, focal length, directrix, latus rectum, semi-major, semi-minor, discriminant, vertex distance); integer proxies, no sqrt; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'conic', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `conic.${name}`, params })

export class ConicFormulas {
  /** ECCENTRICITY scaled by 100: the focal distance over the semi-major axis. value ⌊focus · 100 / axis⌋. */
  static eccentricityscaled(focus: number, axis: number): CrossFormula { return c('conic-eccentricityscaled', 'eccentricityscaled(focus, axis) = ⌊focus · 100 / axis⌋', axis > 0 ? Math.floor((focus * 100) / axis) : 0, nat(focus, axis) && axis > 0 && focus <= axis, 'eccentricityscaled', [focus, axis]) }
  /** FOCAL LENGTH (squared): c² = a² − b² for an ellipse. value max(0, a² − b²). */
  static focallength(a: number, b: number): CrossFormula { return c('conic-focallength', 'focallength(a, b) = max(0, a² − b²)', Math.max(0, a * a - b * b), nat(a, b) && a >= b, 'focallength', [a, b]) }
  /** DIRECTRIX distance from centre: a² / c. value ⌊a² / c⌋. */
  static directrix(a: number, focus: number): CrossFormula { return c('conic-directrix', 'directrix(a, focus) = ⌊a² / focus⌋', focus > 0 ? Math.floor((a * a) / focus) : 0, nat(a, focus) && focus > 0, 'directrix', [a, focus]) }
  /** LATUS RECTUM length: 2b² / a. value ⌊2 · b² / a⌋. */
  static latusrectum(a: number, b: number): CrossFormula { return c('conic-latusrectum', 'latusrectum(a, b) = ⌊2 · b² / a⌋', a > 0 ? Math.floor((2 * b * b) / a) : 0, nat(a, b) && a > 0, 'latusrectum', [a, b]) }
  /** SEMI-MAJOR axis: half the sum of the two focal radii (2a = r₁ + r₂). value ⌊(r1 + r2) / 2⌋. */
  static semimajor(r1: number, r2: number): CrossFormula { return c('conic-semimajor', 'semimajor(r1, r2) = ⌊(r1 + r2) / 2⌋', Math.floor((r1 + r2) / 2), nat(r1, r2), 'semimajor', [r1, r2]) }
  /** SEMI-MINOR axis (squared): b² = a² − c². value max(0, a² − c²). */
  static semiminor(a: number, focus: number): CrossFormula { return c('conic-semiminor', 'semiminor(a, focus) = max(0, a² − focus²)', Math.max(0, a * a - focus * focus), nat(a, focus) && a >= focus, 'semiminor', [a, focus]) }
  /** DISCRIMINANT of the general conic: B² − 4AC. value max(0, b² − 4 · a · c). */
  static discriminant(a: number, b: number, cc: number): CrossFormula { return c('conic-discriminant', 'discriminant(a, b, c) = max(0, b² − 4 · a · c)', Math.max(0, b * b - 4 * a * cc), nat(a, b, cc), 'discriminant', [a, b, cc]) }
  /** VERTEX DISTANCE from centre: how far a vertex sits past an offset. value max(0, a − offset). */
  static vertexdistance(a: number, offset: number): CrossFormula { return c('conic-vertexdistance', 'vertexdistance(a, offset) = max(0, a − offset)', Math.max(0, a - offset), nat(a, offset), 'vertexdistance', [a, offset]) }
}

for (const name of ['directrix', 'discriminant', 'eccentricityscaled', 'focallength', 'latusrectum', 'semimajor', 'semiminor', 'vertexdistance'] as const)
  hexRegisterOf('conic', name, (ConicFormulas[name] as (...x: unknown[]) => unknown).bind(ConicFormulas))
