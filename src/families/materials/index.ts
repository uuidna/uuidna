import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MATERIALS — MATERIALS SCIENCE / ENGINEERING, AS ARITHMETIC (chosen by the public-API registry, not by hand). A loaded
 *  part is numbers: stress on an area, strain over a length, density by volume, the elastic modulus, hardness under a load,
 *  whether fatigue cycles stay under the limit, thermal expansion, and whether the applied load stays under yield strength.
 *  Crosses to `cern` — materials is what the beam-line is built from. A measure. */

const PROOF = 'materials arithmetic (stress, strain, density, modulus, hardness, fatigue, thermal expansion, yield); the registry\'s materials-science domain; a measure crossed to cern'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'materials', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name: `materials.${name}`, params })

export class MaterialsFormulas {
  /** STRESS: force over the area it acts on. value ⌊force / area⌋. */
  static stress(force: number, area: number): CrossFormula { return c('materials-stress', 'stress(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'stress', [force, area]) }
  /** STRAIN: elongation over the original length, as a percentage. value ⌊delta · 100 / length⌋. */
  static strain(delta: number, length: number): CrossFormula { return c('materials-strain', 'strain(delta, length) = ⌊delta · 100 / length⌋', length > 0 ? Math.floor((delta * 100) / length) : 0, nat(delta, length) && length > 0, 'strain', [delta, length]) }
  /** DENSITY: mass over the volume it fills. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('materials-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** MODULUS: elastic modulus, stress over strain. value ⌊stress / strain⌋. */
  static modulus(stress: number, strain: number): CrossFormula { return c('materials-modulus', 'modulus(stress, strain) = ⌊stress / strain⌋', strain > 0 ? Math.floor(stress / strain) : 0, nat(stress, strain) && strain > 0, 'modulus', [stress, strain]) }
  /** HARDNESS: load over the indentation it makes. value ⌊load / indent⌋. */
  static hardness(load: number, indent: number): CrossFormula { return c('materials-hardness', 'hardness(load, indent) = ⌊load / indent⌋', indent > 0 ? Math.floor(load / indent) : 0, nat(load, indent) && indent > 0, 'hardness', [load, indent]) }
  /** FATIGUE: 1 when the cycles stay under the endurance limit. value [cycles ≤ limit]. */
  static fatigue(cycles: number, limit: number): CrossFormula { return c('materials-fatigue', 'fatigue(cycles, limit) = [cycles ≤ limit]', cycles <= limit ? 1 : 0, nat(cycles, limit), 'fatigue', [cycles, limit]) }
  /** THERMAL: expansion, the temperature change at a coefficient. value deltaT · coeff. */
  static thermal(deltaT: number, coeff: number): CrossFormula { return c('materials-thermal', 'thermal(deltaT, coeff) = deltaT · coeff', deltaT * coeff, nat(deltaT, coeff), 'thermal', [deltaT, coeff]) }
  /** YIELD: 1 when the applied load stays under yield strength. value [applied ≤ strength]. */
  static yield(applied: number, strength: number): CrossFormula { return c('materials-yield', 'yield(applied, strength) = [applied ≤ strength]', applied <= strength ? 1 : 0, nat(applied, strength), 'yield', [applied, strength]) }
}

for (const name of ['density', 'fatigue', 'hardness', 'modulus', 'strain', 'stress', 'thermal', 'yield'] as const)
  hexRegisterOf('materials', name, (MaterialsFormulas[name] as (...x: unknown[]) => unknown).bind(MaterialsFormulas))
