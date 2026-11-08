import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENDURANCE — scaffolded integer measures crossed to physiology. Every output an exact finite nonnegative integer. */

const PROOF = 'endurance arithmetic (vo2proxy, timetoexhaustion, aerobicratio, lactatethreshold, heartratereserve, trainingload, distancecapacity, fatigueindex); scaffolded from the integer-op palette; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'endurance', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `endurance.${name}`, params })

export class EnduranceFormulas {
  static vo2proxy(x: number, y: number): CrossFormula { return c('endurance-vo2proxy', 'vo2proxy(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'vo2proxy', [x, y]) }
  static timetoexhaustion(x: number, y: number): CrossFormula { return c('endurance-timetoexhaustion', 'timetoexhaustion(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'timetoexhaustion', [x, y]) }
  static aerobicratio(x: number, y: number): CrossFormula { return c('endurance-aerobicratio', 'aerobicratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'aerobicratio', [x, y]) }
  static lactatethreshold(x: number, y: number): CrossFormula { return c('endurance-lactatethreshold', 'lactatethreshold(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'lactatethreshold', [x, y]) }
  static heartratereserve(x: number, y: number): CrossFormula { return c('endurance-heartratereserve', 'heartratereserve(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'heartratereserve', [x, y]) }
  static trainingload(x: number, y: number): CrossFormula { return c('endurance-trainingload', 'trainingload(x, y) = x · y', x * y, nat(x, y), 'trainingload', [x, y]) }
  static distancecapacity(x: number, y: number): CrossFormula { return c('endurance-distancecapacity', 'distancecapacity(x, y) = x · y', x * y, nat(x, y), 'distancecapacity', [x, y]) }
  static fatigueindex(x: number, y: number): CrossFormula { return c('endurance-fatigueindex', 'fatigueindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'fatigueindex', [x, y]) }
}

for (const name of ['aerobicratio', 'distancecapacity', 'fatigueindex', 'heartratereserve', 'lactatethreshold', 'timetoexhaustion', 'trainingload', 'vo2proxy'] as const)
  hexRegisterOf('endurance', name, (EnduranceFormulas[name] as (...x: unknown[]) => unknown).bind(EnduranceFormulas))
