import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ERGOMETRY — scaffolded integer measures crossed to sports. Every output an exact finite nonnegative integer. */

const PROOF = 'ergometry arithmetic (power, workdone, split, strokerate, energyrate, efficiency, distance, caloriesper); scaffolded from the integer-op palette; a measure crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ergometry', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `ergometry.${name}`, params })

export class ErgometryFormulas {
  static power(x: number, y: number): CrossFormula { return c('ergometry-power', 'power(x, y) = x · y', x * y, nat(x, y), 'power', [x, y]) }
  static workdone(x: number, y: number): CrossFormula { return c('ergometry-workdone', 'workdone(x, y) = x · y', x * y, nat(x, y), 'workdone', [x, y]) }
  static split(x: number, y: number): CrossFormula { return c('ergometry-split', 'split(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'split', [x, y]) }
  static strokerate(x: number, y: number): CrossFormula { return c('ergometry-strokerate', 'strokerate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'strokerate', [x, y]) }
  static energyrate(x: number, y: number): CrossFormula { return c('ergometry-energyrate', 'energyrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'energyrate', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('ergometry-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  static distance(x: number, y: number): CrossFormula { return c('ergometry-distance', 'distance(x, y) = x · y', x * y, nat(x, y), 'distance', [x, y]) }
  static caloriesper(x: number, y: number): CrossFormula { return c('ergometry-caloriesper', 'caloriesper(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'caloriesper', [x, y]) }
}

for (const name of ['caloriesper', 'distance', 'efficiency', 'energyrate', 'power', 'split', 'strokerate', 'workdone'] as const)
  hexRegisterOf('ergometry', name, (ErgometryFormulas[name] as (...x: unknown[]) => unknown).bind(ErgometryFormulas))
