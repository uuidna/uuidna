import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONDUCTION — HEAT THROUGH A SOLID, AS ARITHMETIC (Fourier's law and its register of resistances). Conducting heat is
 *  numbers: the rate Fourier's law gives, the thermal resistance of a slab, its U-value and R-value, the temperature
 *  gradient, the flux density, and resistances joined in series and in parallel. Crosses to `thermodynamics` — conduction
 *  is how the second law moves heat down a gradient. A measure. */

const PROOF = 'conduction arithmetic (Fourier rate, thermal resistance, U-value, R-value, gradient, flux density, series and parallel resistance); heat through a solid; a measure crossed to thermodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'conduction', dst: 'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `conduction.${name}`, params })

export class ConductionFormulas {
  /** FOURIER'S LAW: conduction rate = conductivity · area · gradient. value cond · area · grad. */
  static fourierlaw(cond: number, area: number, grad: number): CrossFormula { return c('conduction-fourierlaw', 'fourierlaw(cond, area, grad) = cond · area · grad', cond * area * grad, nat(cond, area, grad), 'fourierlaw', [cond, area, grad]) }
  /** THERMAL RESISTANCE of a slab: length over conductivity times area. value ⌊length / (cond · area)⌋. */
  static resistance(length: number, cond: number, area: number): CrossFormula { return c('conduction-resistance', 'resistance(length, cond, area) = ⌊length / (cond · area)⌋', cond * area > 0 ? Math.floor(length / (cond * area)) : 0, nat(length, cond, area) && cond > 0 && area > 0, 'resistance', [length, cond, area]) }
  /** U-VALUE: conductivity over thickness. value ⌊cond / thickness⌋. */
  static uvalue(cond: number, thickness: number): CrossFormula { return c('conduction-uvalue', 'uvalue(cond, thickness) = ⌊cond / thickness⌋', thickness > 0 ? Math.floor(cond / thickness) : 0, nat(cond, thickness) && thickness > 0, 'uvalue', [cond, thickness]) }
  /** R-VALUE: thickness over conductivity. value ⌊thickness / cond⌋. */
  static rvalue(thickness: number, cond: number): CrossFormula { return c('conduction-rvalue', 'rvalue(thickness, cond) = ⌊thickness / cond⌋', cond > 0 ? Math.floor(thickness / cond) : 0, nat(thickness, cond) && cond > 0, 'rvalue', [thickness, cond]) }
  /** TEMPERATURE GRADIENT: temperature drop over distance. value ⌊dtemp / dist⌋. */
  static gradient(dtemp: number, dist: number): CrossFormula { return c('conduction-gradient', 'gradient(dtemp, dist) = ⌊dtemp / dist⌋', dist > 0 ? Math.floor(dtemp / dist) : 0, nat(dtemp, dist) && dist > 0, 'gradient', [dtemp, dist]) }
  /** FLUX DENSITY: heat rate over area. value ⌊heat / area⌋. */
  static fluxdensity(heat: number, area: number): CrossFormula { return c('conduction-fluxdensity', 'fluxdensity(heat, area) = ⌊heat / area⌋', area > 0 ? Math.floor(heat / area) : 0, nat(heat, area) && area > 0, 'fluxdensity', [heat, area]) }
  /** SERIES RESISTANCE: resistances in a wall add. value r1 + r2 + r3. */
  static seriesresistance(r1: number, r2: number, r3: number): CrossFormula { return c('conduction-seriesresistance', 'seriesresistance(r1, r2, r3) = r1 + r2 + r3', r1 + r2 + r3, nat(r1, r2, r3), 'seriesresistance', [r1, r2, r3]) }
  /** PARALLEL RESISTANCE: two paths combine as product over sum. value ⌊(r1 · r2) / (r1 + r2)⌋. */
  static parallelresistance(r1: number, r2: number): CrossFormula { return c('conduction-parallelresistance', 'parallelresistance(r1, r2) = ⌊(r1 · r2) / (r1 + r2)⌋', r1 + r2 > 0 ? Math.floor((r1 * r2) / (r1 + r2)) : 0, nat(r1, r2) && r1 + r2 > 0, 'parallelresistance', [r1, r2]) }
}

for (const name of ['fluxdensity', 'fourierlaw', 'gradient', 'parallelresistance', 'resistance', 'rvalue', 'seriesresistance', 'uvalue'] as const)
  hexRegisterOf('conduction', name, (ConductionFormulas[name] as (...x: unknown[]) => unknown).bind(ConductionFormulas))
