import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VALUATION — WHAT A COMPANY IS WORTH, AS ARITHMETIC. Pricing a business is numbers: the price-to-earnings and
 *  price-to-book ratios, operating cash flow (EBITDA), the market capitalisation, the enterprise value, the book value
 *  of equity, the EV/EBITDA multiple, and a fair price from earnings and a target multiple. Crosses to `econ` —
 *  valuation is economics applied to a single firm. A measure. */

const PROOF = 'valuation arithmetic (P/E, P/B, EBITDA, market cap, enterprise value, book value, EV/EBITDA multiple, fair value); a firm priced in integers; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'valuation', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `valuation.${name}`, params })

export class ValuationFormulas {
  /** PRICE-TO-EARNINGS: share price over earnings per share. value ⌊price / eps⌋. */
  static pe(price: number, eps: number): CrossFormula { return c('valuation-pe', 'pe(price, eps) = ⌊price / eps⌋', eps > 0 ? Math.floor(price / eps) : 0, nat(price, eps) && eps > 0, 'pe', [price, eps]) }
  /** PRICE-TO-BOOK, as a percentage. value ⌊price · 100 / book⌋. */
  static pb(price: number, book: number): CrossFormula { return c('valuation-pb', 'pb(price, book) = ⌊price · 100 / book⌋', book > 0 ? Math.floor((price * 100) / book) : 0, nat(price, book) && book > 0, 'pb', [price, book]) }
  /** EBITDA: operating income plus depreciation and amortisation. value ebit + da. */
  static ebitda(ebit: number, da: number): CrossFormula { return c('valuation-ebitda', 'ebitda(ebit, da) = ebit + da', ebit + da, nat(ebit, da), 'ebitda', [ebit, da]) }
  /** MARKET CAP: shares outstanding at the share price. value shares · price. */
  static marketcap(shares: number, price: number): CrossFormula { return c('valuation-marketcap', 'marketcap(shares, price) = shares · price', shares * price, nat(shares, price), 'marketcap', [shares, price]) }
  /** ENTERPRISE VALUE: market cap plus debt less cash. value max(0, cap + debt − cash). */
  static enterprise(cap: number, debt: number, cash: number): CrossFormula { return c('valuation-enterprise', 'enterprise(cap, debt, cash) = max(0, cap + debt − cash)', Math.max(0, cap + debt - cash), nat(cap, debt, cash), 'enterprise', [cap, debt, cash]) }
  /** BOOK VALUE of equity: assets less liabilities. value max(0, assets − liabilities). */
  static bookvalue(assets: number, liabilities: number): CrossFormula { return c('valuation-bookvalue', 'bookvalue(assets, liabilities) = max(0, assets − liabilities)', Math.max(0, assets - liabilities), nat(assets, liabilities), 'bookvalue', [assets, liabilities]) }
  /** THE EV/EBITDA MULTIPLE: enterprise value over EBITDA. value ⌊ev / ebitda⌋. */
  static multiple(ev: number, ebitda: number): CrossFormula { return c('valuation-multiple', 'multiple(ev, ebitda) = ⌊ev / ebitda⌋', ebitda > 0 ? Math.floor(ev / ebitda) : 0, nat(ev, ebitda) && ebitda > 0, 'multiple', [ev, ebitda]) }
  /** FAIR VALUE: earnings per share at a target multiple. value eps · pe. */
  static fairvalue(eps: number, pe: number): CrossFormula { return c('valuation-fairvalue', 'fairvalue(eps, pe) = eps · pe', eps * pe, nat(eps, pe), 'fairvalue', [eps, pe]) }
}

for (const name of ['bookvalue', 'ebitda', 'enterprise', 'fairvalue', 'marketcap', 'multiple', 'pb', 'pe'] as const)
  hexRegisterOf('valuation', name, (ValuationFormulas[name] as (...x: unknown[]) => unknown).bind(ValuationFormulas))
