import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STRUCTURAL — STRUCTURAL ENGINEERING, AS ARITHMETIC. A standing structure is numbers: the bending moment a force makes
 *  at a distance, the shear across sections, the buckling a column resists over its length, the margin between capacity and
 *  demand, how far a load deflects a member, the steel ratio in concrete, the slenderness of a column, the seismic force a
 *  mass takes under acceleration. Crosses to `construction` — structure is what construction raises. A measure. */

const PROOF = 'structural arithmetic (moment, shear, buckling, safety factor, deflection, reinforcement, slenderness, seismic); structural engineering as a measure crossed to construction'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'structural', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name: `structural.${name}`, params })

export class StructuralFormulas {
  /** BENDING MOMENT: a force at a lever distance. value force · distance. */
  static moment(force: number, distance: number): CrossFormula { return c('structural-moment', 'moment(force, distance) = force · distance', force * distance, nat(force, distance), 'moment', [force, distance]) }
  /** SHEAR: a load spread across sections. value ⌊load / sections⌋. */
  static shear(load: number, sections: number): CrossFormula { return c('structural-shear', 'shear(load, sections) = ⌊load / sections⌋', sections > 0 ? Math.floor(load / sections) : 0, nat(load, sections) && sections > 0, 'shear', [load, sections]) }
  /** BUCKLING: a column's stiffness over the square of its length. value ⌊stiffness / length²⌋. */
  static buckling(stiffness: number, length: number): CrossFormula { return c('structural-buckling', 'buckling(stiffness, length) = ⌊stiffness / length²⌋', length > 0 ? Math.floor(stiffness / (length * length)) : 0, nat(stiffness, length) && length > 0, 'buckling', [stiffness, length]) }
  /** SAFETY FACTOR: capacity against demand, as a percentage. value ⌊capacity · 100 / demand⌋. */
  static safetyfactor(capacity: number, demand: number): CrossFormula { return c('structural-safetyfactor', 'safetyfactor(capacity, demand) = ⌊capacity · 100 / demand⌋', demand > 0 ? Math.floor((capacity * 100) / demand) : 0, nat(capacity, demand) && demand > 0, 'safetyfactor', [capacity, demand]) }
  /** DEFLECTION: a load over the member's rigidity. value ⌊load / rigidity⌋. */
  static deflection(load: number, rigidity: number): CrossFormula { return c('structural-deflection', 'deflection(load, rigidity) = ⌊load / rigidity⌋', rigidity > 0 ? Math.floor(load / rigidity) : 0, nat(load, rigidity) && rigidity > 0, 'deflection', [load, rigidity]) }
  /** REINFORCEMENT: the steel ratio in concrete, as a percentage. value ⌊steel · 100 / concrete⌋. */
  static reinforcement(steel: number, concrete: number): CrossFormula { return c('structural-reinforcement', 'reinforcement(steel, concrete) = ⌊steel · 100 / concrete⌋', concrete > 0 ? Math.floor((steel * 100) / concrete) : 0, nat(steel, concrete) && concrete > 0, 'reinforcement', [steel, concrete]) }
  /** SLENDERNESS: a column's length over its radius of gyration. value ⌊length / radius⌋. */
  static slenderness(length: number, radius: number): CrossFormula { return c('structural-slenderness', 'slenderness(length, radius) = ⌊length / radius⌋', radius > 0 ? Math.floor(length / radius) : 0, nat(length, radius) && radius > 0, 'slenderness', [length, radius]) }
  /** SEISMIC: the force a mass takes under acceleration. value mass · acceleration. */
  static seismic(mass: number, acceleration: number): CrossFormula { return c('structural-seismic', 'seismic(mass, acceleration) = mass · acceleration', mass * acceleration, nat(mass, acceleration), 'seismic', [mass, acceleration]) }
}

for (const name of ['buckling', 'deflection', 'moment', 'reinforcement', 'safetyfactor', 'seismic', 'shear', 'slenderness'] as const)
  hexRegisterOf('structural', name, (StructuralFormulas[name] as (...x: unknown[]) => unknown).bind(StructuralFormulas))
