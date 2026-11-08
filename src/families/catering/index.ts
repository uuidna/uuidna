import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CATERING — FEEDING A ROOM, AS ARITHMETIC. Serving a crowd is numbers: the portions each guest gets, cost per head,
 *  scaling a per-person recipe to the headcount, how much of what was provided got consumed, the staff a room needs,
 *  the waste off what was prepared, drinks per guest, and the margin on a priced plate. Crosses to `cuisine`. A measure. */

const PROOF = 'catering arithmetic (portions, cost per head, recipe scaling, consumption, staff ratio, waste, beverage, margin); feeding a room as a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'catering', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `catering.${name}`, params })

export class CateringFormulas {
  /** PORTIONS: the total split across the guests. value ⌊total / guests⌋. */
  static portions(total: number, guests: number): CrossFormula { return c('catering-portions', 'portions(total, guests) = ⌊total / guests⌋', guests > 0 ? Math.floor(total / guests) : 0, nat(total, guests) && guests > 0, 'portions', [total, guests]) }
  /** COST PER HEAD: the cost split across the guests. value ⌊cost / guests⌋. */
  static costperhead(cost: number, guests: number): CrossFormula { return c('catering-costperhead', 'costperhead(cost, guests) = ⌊cost / guests⌋', guests > 0 ? Math.floor(cost / guests) : 0, nat(cost, guests) && guests > 0, 'costperhead', [cost, guests]) }
  /** SCALING: a per-person recipe to the headcount. value perperson · headcount. */
  static scaling(perperson: number, headcount: number): CrossFormula { return c('catering-scaling', 'scaling(perperson, headcount) = perperson · headcount', perperson * headcount, nat(perperson, headcount), 'scaling', [perperson, headcount]) }
  /** CONSUMPTION as a percentage of what was provided. value ⌊consumed · 100 / provided⌋. */
  static consumption(consumed: number, provided: number): CrossFormula { return c('catering-consumption', 'consumption(consumed, provided) = ⌊consumed · 100 / provided⌋', provided > 0 ? Math.floor((consumed * 100) / provided) : 0, nat(consumed, provided) && provided > 0 && consumed <= provided, 'consumption', [consumed, provided]) }
  /** STAFF RATIO: the guests each staff member covers. value ⌊guests / staff⌋. */
  static staffratio(guests: number, staff: number): CrossFormula { return c('catering-staffratio', 'staffratio(guests, staff) = ⌊guests / staff⌋', staff > 0 ? Math.floor(guests / staff) : 0, nat(guests, staff) && staff > 0, 'staffratio', [guests, staff]) }
  /** WASTE as a percentage of what was prepared. value ⌊leftover · 100 / prepared⌋. */
  static waste(leftover: number, prepared: number): CrossFormula { return c('catering-waste', 'waste(leftover, prepared) = ⌊leftover · 100 / prepared⌋', prepared > 0 ? Math.floor((leftover * 100) / prepared) : 0, nat(leftover, prepared) && prepared > 0 && leftover <= prepared, 'waste', [leftover, prepared]) }
  /** BEVERAGE: the drinks split across the guests. value ⌊drinks / guests⌋. */
  static beverage(drinks: number, guests: number): CrossFormula { return c('catering-beverage', 'beverage(drinks, guests) = ⌊drinks / guests⌋', guests > 0 ? Math.floor(drinks / guests) : 0, nat(drinks, guests) && guests > 0, 'beverage', [drinks, guests]) }
  /** MARGIN as a percentage of the price. value ⌊(price − cost) · 100 / price⌋. */
  static margin(price: number, cost: number): CrossFormula { return c('catering-margin', 'margin(price, cost) = ⌊(price − cost) · 100 / price⌋', price > 0 ? Math.floor(((price - cost) * 100) / price) : 0, nat(price, cost) && price > 0 && cost <= price, 'margin', [price, cost]) }
}

for (const name of ['beverage', 'consumption', 'costperhead', 'margin', 'portions', 'scaling', 'staffratio', 'waste'] as const)
  hexRegisterOf('catering', name, (CateringFormulas[name] as (...x: unknown[]) => unknown).bind(CateringFormulas))
