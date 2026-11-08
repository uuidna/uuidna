import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MONOPOLY — scaffolded integer measures crossed to microeconomics. Every output an exact finite nonnegative integer. */

const PROOF = 'monopoly arithmetic (marketshare, markup, deadweightloss, lernerindex, outputreduction, pricemargin, barriersubsets, profitmax); scaffolded from the integer-op palette; a measure crossed to microeconomics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'monopoly', dst: 'microeconomics', formula, value, proof: PROOF, ...extra }, holds, { name: `monopoly.${name}`, params })

export class MonopolyFormulas {
  static marketshare(x: number, y: number): CrossFormula { return c('monopoly-marketshare', 'marketshare(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'marketshare', [x, y]) }
  static markup(x: number, y: number): CrossFormula { return c('monopoly-markup', 'markup(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'markup', [x, y]) }
  static deadweightloss(x: number, y: number): CrossFormula { return c('monopoly-deadweightloss', 'deadweightloss(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'deadweightloss', [x, y]) }
  static lernerindex(x: number, y: number): CrossFormula { return c('monopoly-lernerindex', 'lernerindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'lernerindex', [x, y]) }
  static outputreduction(x: number, y: number): CrossFormula { return c('monopoly-outputreduction', 'outputreduction(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'outputreduction', [x, y]) }
  static pricemargin(x: number, y: number): CrossFormula { return c('monopoly-pricemargin', 'pricemargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pricemargin', [x, y]) }
  static barriersubsets(x: number): CrossFormula { return c('monopoly-barriersubsets', 'barriersubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'barriersubsets', [x]) }
  static profitmax(x: number, y: number): CrossFormula { return c('monopoly-profitmax', 'profitmax(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'profitmax', [x, y]) }
}

for (const name of ['barriersubsets', 'deadweightloss', 'lernerindex', 'marketshare', 'markup', 'outputreduction', 'pricemargin', 'profitmax'] as const)
  hexRegisterOf('monopoly', name, (MonopolyFormulas[name] as (...x: unknown[]) => unknown).bind(MonopolyFormulas))
