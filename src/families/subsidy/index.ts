import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SUBSIDY — scaffolded integer measures crossed to macroeconomics. Every output an exact finite nonnegative integer. */

const PROOF = 'subsidy arithmetic (amount, costtotal, pricereduction, beneficiaries, efficiencyloss, passthrough, budgetpct, multipliereffect); scaffolded from the integer-op palette; a measure crossed to macroeconomics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'subsidy', dst: 'macroeconomics', formula, value, proof: PROOF, ...extra }, holds, { name: `subsidy.${name}`, params })

export class SubsidyFormulas {
  static amount(x: number, y: number): CrossFormula { return c('subsidy-amount', 'amount(x, y) = x · y', x * y, nat(x, y), 'amount', [x, y]) }
  static costtotal(x: number, y: number): CrossFormula { return c('subsidy-costtotal', 'costtotal(x, y) = x · y', x * y, nat(x, y), 'costtotal', [x, y]) }
  static pricereduction(x: number, y: number): CrossFormula { return c('subsidy-pricereduction', 'pricereduction(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pricereduction', [x, y]) }
  static beneficiaries(x: number, y: number): CrossFormula { return c('subsidy-beneficiaries', 'beneficiaries(x, y) = x · y', x * y, nat(x, y), 'beneficiaries', [x, y]) }
  static efficiencyloss(x: number, y: number): CrossFormula { return c('subsidy-efficiencyloss', 'efficiencyloss(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'efficiencyloss', [x, y]) }
  static passthrough(x: number, y: number): CrossFormula { return c('subsidy-passthrough', 'passthrough(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'passthrough', [x, y]) }
  static budgetpct(x: number, y: number): CrossFormula { return c('subsidy-budgetpct', 'budgetpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'budgetpct', [x, y]) }
  static multipliereffect(x: number, y: number): CrossFormula { return c('subsidy-multipliereffect', 'multipliereffect(x, y) = x · y', x * y, nat(x, y), 'multipliereffect', [x, y]) }
}

for (const name of ['amount', 'beneficiaries', 'budgetpct', 'costtotal', 'efficiencyloss', 'multipliereffect', 'passthrough', 'pricereduction'] as const)
  hexRegisterOf('subsidy', name, (SubsidyFormulas[name] as (...x: unknown[]) => unknown).bind(SubsidyFormulas))
