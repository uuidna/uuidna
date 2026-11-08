import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COLLATERAL — SECURED LENDING, AS ARITHMETIC (chosen by the public-API registry, not by hand). Backing a loan is
 *  numbers: loan-to-value, the haircut on posted assets, the margin a position requires, coverage, the value of the
 *  collateral, any shortfall, how far it is over-collateralized, and the price that trips a margin call. Crosses to
 *  `banking` — collateral is what banking lends against. A measure. */

const PROOF = 'collateral arithmetic (loan-to-value, haircut, margin requirement, coverage, collateral value, shortfall, over-collateralization, call threshold); secured lending as a measure crossed to banking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'collateral', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `collateral.${name}`, params })

export class CollateralFormulas {
  /** LOAN-TO-VALUE as a percentage. value ⌊loan · 100 / value⌋. */
  static loantovalue(loan: number, value: number): CrossFormula { return c('collateral-loantovalue', 'loantovalue(loan, value) = ⌊loan · 100 / value⌋', value > 0 ? Math.floor((loan * 100) / value) : 0, nat(loan, value) && value > 0, 'loantovalue', [loan, value]) }
  /** HAIRCUT: the amount discounted from an asset's value at a percentage. value ⌊value · pct / 100⌋. */
  static haircut(value: number, pct: number): CrossFormula { return c('collateral-haircut', 'haircut(value, pct) = ⌊value · pct / 100⌋', Math.floor((value * pct) / 100), nat(value, pct) && pct <= 100, 'haircut', [value, pct]) }
  /** MARGIN REQUIREMENT: the margin a position requires at a percentage. value ⌊position · pct / 100⌋. */
  static marginrequirement(position: number, pct: number): CrossFormula { return c('collateral-marginrequirement', 'marginrequirement(position, pct) = ⌊position · pct / 100⌋', Math.floor((position * pct) / 100), nat(position, pct) && pct <= 100, 'marginrequirement', [position, pct]) }
  /** COVERAGE RATIO: collateral over the loan, as a percentage. value ⌊collateral · 100 / loan⌋. */
  static coverageratio(collateral: number, loan: number): CrossFormula { return c('collateral-coverageratio', 'coverageratio(collateral, loan) = ⌊collateral · 100 / loan⌋', loan > 0 ? Math.floor((collateral * 100) / loan) : 0, nat(collateral, loan) && loan > 0, 'coverageratio', [collateral, loan]) }
  /** COLLATERAL VALUE: units at a price each. value units · price. */
  static collateralvalue(units: number, price: number): CrossFormula { return c('collateral-collateralvalue', 'collateralvalue(units, price) = units · price', units * price, nat(units, price), 'collateralvalue', [units, price]) }
  /** SHORTFALL: how far posted collateral falls below what is required. value max(0, required − posted). */
  static shortfall(required: number, posted: number): CrossFormula { return c('collateral-shortfall', 'shortfall(required, posted) = max(0, required − posted)', Math.max(0, required - posted), nat(required, posted), 'shortfall', [required, posted]) }
  /** OVER-COLLATERALIZATION: the excess of collateral over the loan, as a percentage. value max(0, ⌊(collateral − loan) · 100 / loan⌋). */
  static overcollateralization(collateral: number, loan: number): CrossFormula { return c('collateral-overcollateralization', 'overcollateralization(collateral, loan) = max(0, ⌊(collateral − loan) · 100 / loan⌋)', loan > 0 ? Math.max(0, Math.floor((Math.max(0, collateral - loan) * 100) / loan)) : 0, nat(collateral, loan) && loan > 0, 'overcollateralization', [collateral, loan]) }
  /** CALL THRESHOLD: the value at which a margin call trips, a percentage of the collateral. value ⌊value · pct / 100⌋. */
  static callthreshold(value: number, pct: number): CrossFormula { return c('collateral-callthreshold', 'callthreshold(value, pct) = ⌊value · pct / 100⌋', Math.floor((value * pct) / 100), nat(value, pct) && pct <= 100, 'callthreshold', [value, pct]) }
}

for (const name of ['callthreshold', 'collateralvalue', 'coverageratio', 'haircut', 'loantovalue', 'marginrequirement', 'overcollateralization', 'shortfall'] as const)
  hexRegisterOf('collateral', name, (CollateralFormulas[name] as (...x: unknown[]) => unknown).bind(CollateralFormulas))
