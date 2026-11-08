import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RETIREMENT — THE SAVER'S ARITHMETIC. Retiring is numbers: the nest egg a saver builds, the rate they draw it down,
 *  the share of working income it replaces, lifetime contributions, how many years of income it buys, the employer match,
 *  the balance left after a withdrawal, and the gap between what is needed and what is saved. Crosses to `econ` —
 *  retirement is personal economics over time. A measure. */

const PROOF = 'retirement arithmetic (nest egg, withdrawal rate, replacement ratio, contributions, years of income, employer match, drawdown, shortfall); a saver\'s measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'retirement', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `retirement.${name}`, params })

export class RetirementFormulas {
  /** NEST EGG: annual savings over the years. value annual · years. */
  static nestegg(annual: number, years: number): CrossFormula { return c('retirement-nestegg', 'nestegg(annual, years) = annual · years', annual * years, nat(annual, years), 'nestegg', [annual, years]) }
  /** WITHDRAWAL RATE as a percentage of the balance. value ⌊withdrawal · 100 / balance⌋. */
  static withdrawalrate(withdrawal: number, balance: number): CrossFormula { return c('retirement-withdrawalrate', 'withdrawalrate(withdrawal, balance) = ⌊withdrawal · 100 / balance⌋', balance > 0 ? Math.floor((withdrawal * 100) / balance) : 0, nat(withdrawal, balance) && balance > 0, 'withdrawalrate', [withdrawal, balance]) }
  /** REPLACEMENT RATIO: retirement income as a percentage of working income. value ⌊retire · 100 / working⌋. */
  static replacementratio(retire: number, working: number): CrossFormula { return c('retirement-replacementratio', 'replacementratio(retire, working) = ⌊retire · 100 / working⌋', working > 0 ? Math.floor((retire * 100) / working) : 0, nat(retire, working) && working > 0, 'replacementratio', [retire, working]) }
  /** CONTRIBUTIONS: a monthly amount over the years. value monthly · 12 · years. */
  static contributions(monthly: number, years: number): CrossFormula { return c('retirement-contributions', 'contributions(monthly, years) = monthly · 12 · years', monthly * 12 * years, nat(monthly, years), 'contributions', [monthly, years]) }
  /** YEARS OF INCOME: the years a nest egg lasts at an annual draw. value ⌊nestegg / annual⌋. */
  static yearsofincome(nestegg: number, annual: number): CrossFormula { return c('retirement-yearsofincome', 'yearsofincome(nestegg, annual) = ⌊nestegg / annual⌋', annual > 0 ? Math.floor(nestegg / annual) : 0, nat(nestegg, annual) && annual > 0, 'yearsofincome', [nestegg, annual]) }
  /** EMPLOYER MATCH: a percentage of the contribution. value ⌊contribution · pct / 100⌋. */
  static matchvalue(contribution: number, pct: number): CrossFormula { return c('retirement-matchvalue', 'matchvalue(contribution, pct) = ⌊contribution · pct / 100⌋', Math.floor((contribution * pct) / 100), nat(contribution, pct), 'matchvalue', [contribution, pct]) }
  /** DRAWDOWN: the balance left after a withdrawal. value max(0, balance − withdrawal). */
  static drawdown(balance: number, withdrawal: number): CrossFormula { return c('retirement-drawdown', 'drawdown(balance, withdrawal) = max(0, balance − withdrawal)', Math.max(0, balance - withdrawal), nat(balance, withdrawal), 'drawdown', [balance, withdrawal]) }
  /** SHORTFALL: the gap between what is needed and what is saved. value max(0, needed − saved). */
  static shortfall(needed: number, saved: number): CrossFormula { return c('retirement-shortfall', 'shortfall(needed, saved) = max(0, needed − saved)', Math.max(0, needed - saved), nat(needed, saved), 'shortfall', [needed, saved]) }
}

for (const name of ['contributions', 'drawdown', 'matchvalue', 'nestegg', 'replacementratio', 'shortfall', 'withdrawalrate', 'yearsofincome'] as const)
  hexRegisterOf('retirement', name, (RetirementFormulas[name] as (...x: unknown[]) => unknown).bind(RetirementFormulas))
