import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REFRACTION — LIGHT BENDING AT A BOUNDARY, AS ARITHMETIC (no trig; integer proxies and ratios only). How a medium slows
 *  and bends light is numbers: the refractive index, Snell's ratio, the critical angle, dispersion between colours, optical
 *  density, the speed in a medium, a prism's deviation, and whether light is totally internally reflected. Crosses to
 *  `optics` — refraction is the law optics is built on. A measure. */

const PROOF = 'refraction arithmetic (index, Snell ratio, critical angle, dispersion, optical density, speed in medium, prism deviation, total internal reflection); light bending at a boundary as integer proxies; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'refraction', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `refraction.${name}`, params })

export class RefractionFormulas {
  /** REFRACTIVE INDEX (×1000): the vacuum speed over the speed in the medium. value ⌊c · 1000 / v⌋. */
  static index(c0: number, v: number): CrossFormula { return c('refraction-index', 'index(c, v) = ⌊c · 1000 / v⌋', v > 0 ? Math.floor((c0 * 1000) / v) : 0, nat(c0, v) && v > 0, 'index', [c0, v]) }
  /** SNELL'S RATIO: the refracted proxy angle, n1·a1 over n2. value ⌊n1 · a1 / n2⌋. */
  static snell(n1: number, a1: number, n2: number): CrossFormula { return c('refraction-snell', 'snell(n1, a1, n2) = ⌊n1 · a1 / n2⌋', n2 > 0 ? Math.floor((n1 * a1) / n2) : 0, nat(n1, a1, n2) && n2 > 0, 'snell', [n1, a1, n2]) }
  /** CRITICAL ANGLE (proxy, scaled by 90): the lighter index over the denser. value ⌊n2 · 90 / n1⌋. */
  static criticalangle(n1: number, n2: number): CrossFormula { return c('refraction-criticalangle', 'criticalangle(n1, n2) = ⌊n2 · 90 / n1⌋', n1 > 0 ? Math.floor((n2 * 90) / n1) : 0, nat(n1, n2) && n1 > 0, 'criticalangle', [n1, n2]) }
  /** DISPERSION: the index spread between blue and red. value max(0, nblue − nred). */
  static dispersion(nblue: number, nred: number): CrossFormula { return c('refraction-dispersion', 'dispersion(nblue, nred) = max(0, nblue − nred)', Math.max(0, nblue - nred), nat(nblue, nred), 'dispersion', [nblue, nred]) }
  /** OPTICAL DENSITY (×100 relative): an index against a reference index. value ⌊n · 100 / ref⌋. */
  static opticaldensity(n: number, ref: number): CrossFormula { return c('refraction-opticaldensity', 'opticaldensity(n, ref) = ⌊n · 100 / ref⌋', ref > 0 ? Math.floor((n * 100) / ref) : 0, nat(n, ref) && ref > 0, 'opticaldensity', [n, ref]) }
  /** SPEED IN MEDIUM: the vacuum speed over the index (×1000). value ⌊c · 1000 / n⌋. */
  static speedinmedium(c0: number, n: number): CrossFormula { return c('refraction-speedinmedium', 'speedinmedium(c, n) = ⌊c · 1000 / n⌋', n > 0 ? Math.floor((c0 * 1000) / n) : 0, nat(c0, n) && n > 0, 'speedinmedium', [c0, n]) }
  /** PRISM DEVIATION: incidence plus emergence less the prism angle. value max(0, a1 + a2 − prism). */
  static prismdeviation(a1: number, a2: number, prism: number): CrossFormula { return c('refraction-prismdeviation', 'prismdeviation(a1, a2, prism) = max(0, a1 + a2 − prism)', Math.max(0, a1 + a2 - prism), nat(a1, a2, prism), 'prismdeviation', [a1, a2, prism]) }
  /** TOTAL INTERNAL REFLECTION: 1 when the angle meets the critical angle. value [angle ≥ critical]. */
  static totalinternal(angle: number, critical: number): CrossFormula { return c('refraction-totalinternal', 'totalinternal(angle, critical) = [angle ≥ critical]', angle >= critical ? 1 : 0, nat(angle, critical), 'totalinternal', [angle, critical]) }
}

for (const name of ['criticalangle', 'dispersion', 'index', 'opticaldensity', 'prismdeviation', 'snell', 'speedinmedium', 'totalinternal'] as const)
  hexRegisterOf('refraction', name, (RefractionFormulas[name] as (...x: unknown[]) => unknown).bind(RefractionFormulas))
