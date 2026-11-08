import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHYSICS — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'physics arithmetic (force, momentum, work, power, pressure, density, energylevels, degreesoffreedom); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'physics', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `physics.${name}`, params })

export class PhysicsFormulas {
  static force(x: number, y: number): CrossFormula { return c('physics-force', 'force(x, y) = x · y', x * y, nat(x, y), 'force', [x, y]) }
  static momentum(x: number, y: number): CrossFormula { return c('physics-momentum', 'momentum(x, y) = x · y', x * y, nat(x, y), 'momentum', [x, y]) }
  static work(x: number, y: number): CrossFormula { return c('physics-work', 'work(x, y) = x · y', x * y, nat(x, y), 'work', [x, y]) }
  static power(x: number, y: number): CrossFormula { return c('physics-power', 'power(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'power', [x, y]) }
  static pressure(x: number, y: number): CrossFormula { return c('physics-pressure', 'pressure(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'pressure', [x, y]) }
  static density(x: number, y: number): CrossFormula { return c('physics-density', 'density(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'density', [x, y]) }
  static energylevels(x: number): CrossFormula { return c('physics-energylevels', 'energylevels(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'energylevels', [x]) }
  static degreesoffreedom(x: number, y: number): CrossFormula { return c('physics-degreesoffreedom', 'degreesoffreedom(x, y) = x + y', x + y, nat(x, y), 'degreesoffreedom', [x, y]) }
}

for (const name of ['degreesoffreedom', 'density', 'energylevels', 'force', 'momentum', 'power', 'pressure', 'work'] as const)
  hexRegisterOf('physics', name, (PhysicsFormulas[name] as (...x: unknown[]) => unknown).bind(PhysicsFormulas))
