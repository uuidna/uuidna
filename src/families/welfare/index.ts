import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WELFARE — SOCIAL PROVISION, AS ARITHMETIC (chosen by the registry, not by hand). The safety net is numbers: the share
 *  below the line, inequality by the Lorenz area, the benefit each recipient draws, how far coverage reaches, what a
 *  benefit replaces of a wage, how many depend on each worker, how many move between cohorts, and how much is
 *  redistributed from income. Crosses to `econ` — welfare is economics turned to people. A measure. */

const PROOF = 'welfare arithmetic (poverty share, gini, benefit per recipient, coverage, replacement, dependency, mobility, transfer); a social measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'welfare', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `welfare.${name}`, params })

export class WelfareFormulas {
  /** POVERTY RATE: the share below the line, as a percentage. value ⌊below · 100 / population⌋. */
  static poverty(below: number, population: number): CrossFormula { return c('welfare-poverty', 'poverty(below, population) = ⌊below · 100 / population⌋', population > 0 ? Math.floor((below * 100) / population) : 0, nat(below, population) && population > 0 && below <= population, 'poverty', [below, population]) }
  /** GINI: inequality from the Lorenz area over the total, as a percentage. value ⌊area · 100 / total⌋. */
  static gini(area: number, total: number): CrossFormula { return c('welfare-gini', 'gini(area, total) = ⌊area · 100 / total⌋', total > 0 ? Math.floor((area * 100) / total) : 0, nat(area, total) && total > 0 && area <= total, 'gini', [area, total]) }
  /** BENEFIT per recipient: the payment split across those who draw it. value ⌊payment / recipients⌋. */
  static benefit(payment: number, recipients: number): CrossFormula { return c('welfare-benefit', 'benefit(payment, recipients) = ⌊payment / recipients⌋', recipients > 0 ? Math.floor(payment / recipients) : 0, nat(payment, recipients) && recipients > 0, 'benefit', [payment, recipients]) }
  /** COVERAGE: the enrolled share of those eligible, as a percentage. value ⌊enrolled · 100 / eligible⌋. */
  static coverage(enrolled: number, eligible: number): CrossFormula { return c('welfare-coverage', 'coverage(enrolled, eligible) = ⌊enrolled · 100 / eligible⌋', eligible > 0 ? Math.floor((enrolled * 100) / eligible) : 0, nat(enrolled, eligible) && eligible > 0 && enrolled <= eligible, 'coverage', [enrolled, eligible]) }
  /** REPLACEMENT RATE: what the benefit replaces of the wage, as a percentage. value ⌊benefit · 100 / wage⌋. */
  static replacement(benefit_: number, wage: number): CrossFormula { return c('welfare-replacement', 'replacement(benefit, wage) = ⌊benefit · 100 / wage⌋', wage > 0 ? Math.floor((benefit_ * 100) / wage) : 0, nat(benefit_, wage) && wage > 0, 'replacement', [benefit_, wage]) }
  /** DEPENDENCY RATIO: dependents over workers, as a percentage. value ⌊dependents · 100 / workers⌋. */
  static dependency(dependents: number, workers: number): CrossFormula { return c('welfare-dependency', 'dependency(dependents, workers) = ⌊dependents · 100 / workers⌋', workers > 0 ? Math.floor((dependents * 100) / workers) : 0, nat(dependents, workers) && workers > 0, 'dependency', [dependents, workers]) }
  /** MOBILITY: the share of a cohort that moved, as a percentage. value ⌊moved · 100 / cohort⌋. */
  static mobility(moved: number, cohort: number): CrossFormula { return c('welfare-mobility', 'mobility(moved, cohort) = ⌊moved · 100 / cohort⌋', cohort > 0 ? Math.floor((moved * 100) / cohort) : 0, nat(moved, cohort) && cohort > 0 && moved <= cohort, 'mobility', [moved, cohort]) }
  /** TRANSFER: the redistributed share of income, as a percentage. value ⌊redistributed · 100 / income⌋. */
  static transfer(redistributed: number, income: number): CrossFormula { return c('welfare-transfer', 'transfer(redistributed, income) = ⌊redistributed · 100 / income⌋', income > 0 ? Math.floor((redistributed * 100) / income) : 0, nat(redistributed, income) && income > 0 && redistributed <= income, 'transfer', [redistributed, income]) }
}

for (const name of ['benefit', 'coverage', 'dependency', 'gini', 'mobility', 'poverty', 'replacement', 'transfer'] as const)
  hexRegisterOf('welfare', name, (WelfareFormulas[name] as (...x: unknown[]) => unknown).bind(WelfareFormulas))
