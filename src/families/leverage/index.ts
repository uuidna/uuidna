import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LEVERAGE — HOW A BALANCE SHEET IS FINANCED, AS ARITHMETIC (chosen by the public-API registry, not by hand). Borrowing is
 *  numbers: debt against equity, debt against assets, the equity multiplier, how many times earnings cover interest, the
 *  capital held against assets, operating leverage, the margin kept, and the gearing of debt against the whole capital
 *  base. Crosses to `banking` — leverage is what a lender underwrites. A measure. */

const PROOF = 'leverage arithmetic (debt-to-equity, debt ratio, equity multiplier, interest coverage, capital ratio, operating leverage, margin, gearing); a public-API domain; a measure crossed to banking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'leverage', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `leverage.${name}`, params })

export class LeverageFormulas {
  /** DEBT-TO-EQUITY as a percentage. value ⌊debt · 100 / equity⌋. */
  static debttoequity(debt: number, equity: number): CrossFormula { return c('leverage-debttoequity', 'debttoequity(debt, equity) = ⌊debt · 100 / equity⌋', equity > 0 ? Math.floor((debt * 100) / equity) : 0, nat(debt, equity) && equity > 0, 'debttoequity', [debt, equity]) }
  /** DEBT RATIO: debt against assets, as a percentage. value ⌊debt · 100 / assets⌋. */
  static debtratio(debt: number, assets: number): CrossFormula { return c('leverage-debtratio', 'debtratio(debt, assets) = ⌊debt · 100 / assets⌋', assets > 0 ? Math.floor((debt * 100) / assets) : 0, nat(debt, assets) && assets > 0 && debt <= assets, 'debtratio', [debt, assets]) }
  /** EQUITY MULTIPLIER: assets financed per unit of equity, as a percentage. value ⌊assets · 100 / equity⌋. */
  static equitymultiplier(assets: number, equity: number): CrossFormula { return c('leverage-equitymultiplier', 'equitymultiplier(assets, equity) = ⌊assets · 100 / equity⌋', equity > 0 ? Math.floor((assets * 100) / equity) : 0, nat(assets, equity) && equity > 0 && equity <= assets, 'equitymultiplier', [assets, equity]) }
  /** INTEREST COVERAGE: times earnings cover the interest due. value ⌊ebit / interest⌋. */
  static interestcoverage(ebit: number, interest: number): CrossFormula { return c('leverage-interestcoverage', 'interestcoverage(ebit, interest) = ⌊ebit / interest⌋', interest > 0 ? Math.floor(ebit / interest) : 0, nat(ebit, interest) && interest > 0, 'interestcoverage', [ebit, interest]) }
  /** CAPITAL RATIO: capital held against assets, as a percentage. value ⌊capital · 100 / assets⌋. */
  static capitalratio(capital: number, assets: number): CrossFormula { return c('leverage-capitalratio', 'capitalratio(capital, assets) = ⌊capital · 100 / assets⌋', assets > 0 ? Math.floor((capital * 100) / assets) : 0, nat(capital, assets) && assets > 0 && capital <= assets, 'capitalratio', [capital, assets]) }
  /** DEGREE OF OPERATING LEVERAGE: contribution margin over operating income, as a percentage. value ⌊contribution · 100 / ebit⌋. */
  static degreeofleverage(contribution: number, ebit: number): CrossFormula { return c('leverage-degreeofleverage', 'degreeofleverage(contribution, ebit) = ⌊contribution · 100 / ebit⌋', ebit > 0 ? Math.floor((contribution * 100) / ebit) : 0, nat(contribution, ebit) && ebit > 0 && contribution >= ebit, 'degreeofleverage', [contribution, ebit]) }
  /** MARGIN RATIO: margin kept out of revenue, as a percentage. value ⌊margin · 100 / revenue⌋. */
  static marginratio(margin: number, revenue: number): CrossFormula { return c('leverage-marginratio', 'marginratio(margin, revenue) = ⌊margin · 100 / revenue⌋', revenue > 0 ? Math.floor((margin * 100) / revenue) : 0, nat(margin, revenue) && revenue > 0 && margin <= revenue, 'marginratio', [margin, revenue]) }
  /** GEARING RATIO: debt against the whole capital base, as a percentage. value ⌊debt · 100 / (debt + capital)⌋. */
  static gearingratio(debt: number, capital: number): CrossFormula { return c('leverage-gearingratio', 'gearingratio(debt, capital) = ⌊debt · 100 / (debt + capital)⌋', (debt + capital) > 0 ? Math.floor((debt * 100) / (debt + capital)) : 0, nat(debt, capital) && (debt + capital) > 0, 'gearingratio', [debt, capital]) }
}

for (const name of ['capitalratio', 'debtratio', 'debttoequity', 'degreeofleverage', 'equitymultiplier', 'gearingratio', 'interestcoverage', 'marginratio'] as const)
  hexRegisterOf('leverage', name, (LeverageFormulas[name] as (...x: unknown[]) => unknown).bind(LeverageFormulas))
