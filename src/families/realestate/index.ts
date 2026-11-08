import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REALESTATE — PROPERTY INVESTMENT AS ARITHMETIC (chosen by the public-API registry, not by hand). Owning property is
 *  numbers: capitalisation rate, loan-to-value, price per square foot, annual rent yield, occupancy, appreciation,
 *  a monthly interest proxy, and the equity left after debt. Crosses to `accounting` — real estate is what the books
 *  measure. A measure. */

const PROOF = 'realestate arithmetic (cap rate, loan-to-value, price per sqft, rent yield, occupancy, appreciation, mortgage interest, equity); a property domain; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'realestate', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `realestate.${name}`, params })

export class RealestateFormulas {
  /** APPRECIATION as a percentage over the purchase price. value ⌊(current − purchase) · 100 / purchase⌋. */
  static appreciation(current: number, purchase: number): CrossFormula { return c('realestate-appreciation', 'appreciation(current, purchase) = ⌊(current − purchase) · 100 / purchase⌋', purchase > 0 ? Math.floor(((current - purchase) * 100) / purchase) : 0, nat(current, purchase) && purchase > 0 && current >= purchase, 'appreciation', [current, purchase]) }
  /** CAP RATE: net income as a percentage of value. value ⌊income · 100 / value⌋. */
  static caprate(income: number, value: number): CrossFormula { return c('realestate-caprate', 'caprate(income, value) = ⌊income · 100 / value⌋', value > 0 ? Math.floor((income * 100) / value) : 0, nat(income, value) && value > 0, 'caprate', [income, value]) }
  /** EQUITY: the value left after the debt. value max(0, value − debt). */
  static equity(value: number, debt: number): CrossFormula { return c('realestate-equity', 'equity(value, debt) = max(0, value − debt)', Math.max(0, value - debt), nat(value, debt), 'equity', [value, debt]) }
  /** LOAN-TO-VALUE as a percentage. value ⌊loan · 100 / value⌋. */
  static ltv(loan: number, value: number): CrossFormula { return c('realestate-ltv', 'ltv(loan, value) = ⌊loan · 100 / value⌋', value > 0 ? Math.floor((loan * 100) / value) : 0, nat(loan, value) && value > 0 && loan <= value, 'ltv', [loan, value]) }
  /** MORTGAGE: a monthly interest proxy on the principal at an annual rate. value ⌊principal · rate / 1200⌋. */
  static mortgage(principal: number, rate: number): CrossFormula { return c('realestate-mortgage', 'mortgage(principal, rate) = ⌊principal · rate / 1200⌋', Math.floor((principal * rate) / 1200), nat(principal, rate), 'mortgage', [principal, rate]) }
  /** OCCUPANCY as a percentage of the units. value ⌊occupied · 100 / units⌋. */
  static occupancy(occupied: number, units: number): CrossFormula { return c('realestate-occupancy', 'occupancy(occupied, units) = ⌊occupied · 100 / units⌋', units > 0 ? Math.floor((occupied * 100) / units) : 0, nat(occupied, units) && units > 0 && occupied <= units, 'occupancy', [occupied, units]) }
  /** PRICE PER SQUARE FOOT. value ⌊price / area⌋. */
  static pricesqft(price: number, area: number): CrossFormula { return c('realestate-pricesqft', 'pricesqft(price, area) = ⌊price / area⌋', area > 0 ? Math.floor(price / area) : 0, nat(price, area) && area > 0, 'pricesqft', [price, area]) }
  /** RENT YIELD: annual rent as a percentage of price. value ⌊rent · 1200 / price⌋. */
  static rentyield(rent: number, price: number): CrossFormula { return c('realestate-rentyield', 'rentyield(rent, price) = ⌊rent · 1200 / price⌋', price > 0 ? Math.floor((rent * 1200) / price) : 0, nat(rent, price) && price > 0, 'rentyield', [rent, price]) }
}

for (const name of ['appreciation', 'caprate', 'equity', 'ltv', 'mortgage', 'occupancy', 'pricesqft', 'rentyield'] as const)
  hexRegisterOf('realestate', name, (RealestateFormulas[name] as (...x: unknown[]) => unknown).bind(RealestateFormulas))
