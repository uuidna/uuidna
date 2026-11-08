import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEARING — scaffolded integer measures crossed to robotics. Every output an exact finite nonnegative integer. */

const PROOF = 'gearing arithmetic (ratio, torqueout, speedout, efficiency, mechanicaladvantage, backlashangle, toothcount, reductionstages); scaffolded from the integer-op palette; a measure crossed to robotics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gearing', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, { name: `gearing.${name}`, params })

export class GearingFormulas {
  static ratio(x: number, y: number): CrossFormula { return c('gearing-ratio', 'ratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) }
  static torqueout(x: number, y: number): CrossFormula { return c('gearing-torqueout', 'torqueout(x, y) = x · y', x * y, nat(x, y), 'torqueout', [x, y]) }
  static speedout(x: number, y: number): CrossFormula { return c('gearing-speedout', 'speedout(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'speedout', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('gearing-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  static mechanicaladvantage(x: number, y: number): CrossFormula { return c('gearing-mechanicaladvantage', 'mechanicaladvantage(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'mechanicaladvantage', [x, y]) }
  static backlashangle(x: number, y: number): CrossFormula { return c('gearing-backlashangle', 'backlashangle(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'backlashangle', [x, y]) }
  static toothcount(x: number, y: number): CrossFormula { return c('gearing-toothcount', 'toothcount(x, y) = x · y', x * y, nat(x, y), 'toothcount', [x, y]) }
  static reductionstages(x: number, y: number): CrossFormula { return c('gearing-reductionstages', 'reductionstages(x, y) = x · y', x * y, nat(x, y), 'reductionstages', [x, y]) }
}

for (const name of ['backlashangle', 'efficiency', 'mechanicaladvantage', 'ratio', 'reductionstages', 'speedout', 'toothcount', 'torqueout'] as const)
  hexRegisterOf('gearing', name, (GearingFormulas[name] as (...x: unknown[]) => unknown).bind(GearingFormulas))
