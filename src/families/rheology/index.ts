import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RHEOLOGY — THE FLOW AND DEFORMATION OF MATTER, AS ARITHMETIC. Materials under stress are numbers: viscosity from stress
 *  over shear, the shear rate itself, the modulus, the yield past a threshold, thixotropic loss, elastic recovery,
 *  flow through resistance, and stress relaxation over time. Crosses to `materials` — rheology is how materials behave.
 *  A measure. */

const PROOF = 'rheology arithmetic (viscosity, shear rate, modulus, yield, thixotropy, elasticity, flow, relaxation); the flow and deformation of matter; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rheology', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `rheology.${name}`, params })

export class RheologyFormulas {
  /** VISCOSITY: stress over shear rate. value ⌊stress / shear⌋. */
  static viscosity(stress: number, shear: number): CrossFormula { return c('rheology-viscosity', 'viscosity(stress, shear) = ⌊stress / shear⌋', shear > 0 ? Math.floor(stress / shear) : 0, nat(stress, shear) && shear > 0, 'viscosity', [stress, shear]) }
  /** SHEAR RATE: velocity over the gap. value ⌊velocity / gap⌋. */
  static shear(velocity: number, gap: number): CrossFormula { return c('rheology-shear', 'shear(velocity, gap) = ⌊velocity / gap⌋', gap > 0 ? Math.floor(velocity / gap) : 0, nat(velocity, gap) && gap > 0, 'shear', [velocity, gap]) }
  /** MODULUS: stress over strain. value ⌊stress / strain⌋. */
  static modulus(stress: number, strain: number): CrossFormula { return c('rheology-modulus', 'modulus(stress, strain) = ⌊stress / strain⌋', strain > 0 ? Math.floor(stress / strain) : 0, nat(stress, strain) && strain > 0, 'modulus', [stress, strain]) }
  /** YIELD: applied stress past a threshold. value max(0, applied − threshold). */
  static yielding(applied: number, threshold: number): CrossFormula { return c('rheology-yielding', 'yielding(applied, threshold) = max(0, applied − threshold)', Math.max(0, applied - threshold), nat(applied, threshold), 'yielding', [applied, threshold]) }
  /** THIXOTROPY: the loss from initial to final structure. value max(0, initial − final). */
  static thixotropy(initial: number, final: number): CrossFormula { return c('rheology-thixotropy', 'thixotropy(initial, final) = max(0, initial − final)', Math.max(0, initial - final), nat(initial, final), 'thixotropy', [initial, final]) }
  /** ELASTICITY: recovered over deformed, as a percentage. value ⌊recovered · 100 / deformed⌋. */
  static elasticity(recovered: number, deformed: number): CrossFormula { return c('rheology-elasticity', 'elasticity(recovered, deformed) = ⌊recovered · 100 / deformed⌋', deformed > 0 ? Math.floor((recovered * 100) / deformed) : 0, nat(recovered, deformed) && deformed > 0 && recovered <= deformed, 'elasticity', [recovered, deformed]) }
  /** FLOW: pressure over resistance. value ⌊pressure / resistance⌋. */
  static flow(pressure: number, resistance: number): CrossFormula { return c('rheology-flow', 'flow(pressure, resistance) = ⌊pressure / resistance⌋', resistance > 0 ? Math.floor(pressure / resistance) : 0, nat(pressure, resistance) && resistance > 0, 'flow', [pressure, resistance]) }
  /** RELAXATION: stress over time. value ⌊stress / time⌋. */
  static relaxation(stress: number, time: number): CrossFormula { return c('rheology-relaxation', 'relaxation(stress, time) = ⌊stress / time⌋', time > 0 ? Math.floor(stress / time) : 0, nat(stress, time) && time > 0, 'relaxation', [stress, time]) }
}

for (const name of ['elasticity', 'flow', 'modulus', 'relaxation', 'shear', 'thixotropy', 'viscosity', 'yielding'] as const)
  hexRegisterOf('rheology', name, (RheologyFormulas[name] as (...x: unknown[]) => unknown).bind(RheologyFormulas))
