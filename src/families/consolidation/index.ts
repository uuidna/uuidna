import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONSOLIDATION — scaffolded integer measures crossed to supplychain. Every output an exact finite nonnegative integer. */

const PROOF = 'consolidation arithmetic (shipmentsmerged, fillimprovement, costsavings, ordersperload, freightclass, densitygain, splitcount, poolingratio); scaffolded from the integer-op palette; a measure crossed to supplychain'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'consolidation', dst: 'supplychain', formula, value, proof: PROOF, ...extra }, holds, { name: `consolidation.${name}`, params })

export class ConsolidationFormulas {
  static shipmentsmerged(x: number, y: number): CrossFormula { return c('consolidation-shipmentsmerged', 'shipmentsmerged(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'shipmentsmerged', [x, y]) }
  static fillimprovement(x: number, y: number): CrossFormula { return c('consolidation-fillimprovement', 'fillimprovement(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'fillimprovement', [x, y]) }
  static costsavings(x: number, y: number): CrossFormula { return c('consolidation-costsavings', 'costsavings(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'costsavings', [x, y]) }
  static ordersperload(x: number, y: number): CrossFormula { return c('consolidation-ordersperload', 'ordersperload(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ordersperload', [x, y]) }
  static freightclass(x: number, y: number): CrossFormula { return c('consolidation-freightclass', 'freightclass(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'freightclass', [x, y]) }
  static densitygain(x: number, y: number): CrossFormula { return c('consolidation-densitygain', 'densitygain(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'densitygain', [x, y]) }
  static splitcount(x: number, y: number): CrossFormula { return c('consolidation-splitcount', 'splitcount(x, y) = ⌈x / y⌉', y > 0 ? Math.ceil(x / y) : 0, nat(x, y) && y > 0, 'splitcount', [x, y]) }
  static poolingratio(x: number, y: number): CrossFormula { return c('consolidation-poolingratio', 'poolingratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'poolingratio', [x, y]) }
}

for (const name of ['costsavings', 'densitygain', 'fillimprovement', 'freightclass', 'ordersperload', 'poolingratio', 'shipmentsmerged', 'splitcount'] as const)
  hexRegisterOf('consolidation', name, (ConsolidationFormulas[name] as (...x: unknown[]) => unknown).bind(ConsolidationFormulas))
