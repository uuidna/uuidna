import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELNINO — scaffolded integer measures crossed to climate. Every output an exact finite nonnegative integer. */

const PROOF = 'elnino arithmetic (oni, ssttanomaly, phasecount, cycleyears, teleconnections, intensityindex, durationmonths, rainfallshift); scaffolded from the integer-op palette; a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'elnino', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `elnino.${name}`, params })

export class ElninoFormulas {
  static oni(x: number, y: number): CrossFormula { return c('elnino-oni', 'oni(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'oni', [x, y]) }
  static ssttanomaly(x: number, y: number): CrossFormula { return c('elnino-ssttanomaly', 'ssttanomaly(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'ssttanomaly', [x, y]) }
  static phasecount(x: number, y: number): CrossFormula { return c('elnino-phasecount', 'phasecount(x, y) = x + y', x + y, nat(x, y), 'phasecount', [x, y]) }
  static cycleyears(x: number, y: number): CrossFormula { return c('elnino-cycleyears', 'cycleyears(x, y) = x + y', x + y, nat(x, y), 'cycleyears', [x, y]) }
  static teleconnections(x: number, y: number): CrossFormula { return c('elnino-teleconnections', 'teleconnections(x, y) = x · y', x * y, nat(x, y), 'teleconnections', [x, y]) }
  static intensityindex(x: number, y: number): CrossFormula { return c('elnino-intensityindex', 'intensityindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'intensityindex', [x, y]) }
  static durationmonths(x: number, y: number): CrossFormula { return c('elnino-durationmonths', 'durationmonths(x, y) = x + y', x + y, nat(x, y), 'durationmonths', [x, y]) }
  static rainfallshift(x: number, y: number): CrossFormula { return c('elnino-rainfallshift', 'rainfallshift(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'rainfallshift', [x, y]) }
}

for (const name of ['cycleyears', 'durationmonths', 'intensityindex', 'oni', 'phasecount', 'rainfallshift', 'ssttanomaly', 'teleconnections'] as const)
  hexRegisterOf('elnino', name, (ElninoFormulas[name] as (...x: unknown[]) => unknown).bind(ElninoFormulas))
