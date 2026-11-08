import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RESTAURANT — RUNNING A KITCHEN AND DINING ROOM, AS ARITHMETIC. Food cost as a share of sales, table turnover, the
 *  average check, labor cost percent, waste percent, menu margin, seat utilization, and the prep time per dish. Crosses to
 *  `retail` — a restaurant is retail of a plate. A measure. */

const PROOF = 'restaurant arithmetic (food cost %, table turnover, average check, labor cost %, waste %, menu margin, seat utilization, prep time per dish); a measure crossed to retail'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'restaurant', dst: 'retail', formula, value, proof: PROOF, ...extra }, holds, { name: `restaurant.${name}`, params })

export class RestaurantFormulas {
  /** FOOD COST as a percent of sales. value ⌊cost · 100 / sales⌋. */
  static foodcost(cost: number, sales: number): CrossFormula { return c('restaurant-foodcost', 'foodcost(cost, sales) = ⌊cost · 100 / sales⌋', sales > 0 ? Math.floor((cost * 100) / sales) : 0, nat(cost, sales) && sales > 0, 'foodcost', [cost, sales]) }
  /** TABLE TURNOVER: the covers served per seat. value ⌊covers / seats⌋. */
  static turnover(covers: number, seats: number): CrossFormula { return c('restaurant-turnover', 'turnover(covers, seats) = ⌊covers / seats⌋', seats > 0 ? Math.floor(covers / seats) : 0, nat(covers, seats) && seats > 0, 'turnover', [covers, seats]) }
  /** AVERAGE CHECK: revenue over the covers served. value ⌊revenue / covers⌋. */
  static averagecheck(revenue: number, covers: number): CrossFormula { return c('restaurant-averagecheck', 'averagecheck(revenue, covers) = ⌊revenue / covers⌋', covers > 0 ? Math.floor(revenue / covers) : 0, nat(revenue, covers) && covers > 0, 'averagecheck', [revenue, covers]) }
  /** LABOR COST as a percent of sales. value ⌊labor · 100 / sales⌋. */
  static laborcost(labor: number, sales: number): CrossFormula { return c('restaurant-laborcost', 'laborcost(labor, sales) = ⌊labor · 100 / sales⌋', sales > 0 ? Math.floor((labor * 100) / sales) : 0, nat(labor, sales) && sales > 0, 'laborcost', [labor, sales]) }
  /** WASTE as a percent of what was prepared. value ⌊wasted · 100 / prepared⌋. */
  static waste(wasted: number, prepared: number): CrossFormula { return c('restaurant-waste', 'waste(wasted, prepared) = ⌊wasted · 100 / prepared⌋', prepared > 0 ? Math.floor((wasted * 100) / prepared) : 0, nat(wasted, prepared) && prepared > 0 && wasted <= prepared, 'waste', [wasted, prepared]) }
  /** MENU MARGIN as a percent of price. value ⌊(price − cost) · 100 / price⌋. */
  static margin(price: number, cost: number): CrossFormula { return c('restaurant-margin', 'margin(price, cost) = ⌊(price − cost) · 100 / price⌋', price > 0 ? Math.floor(((price - cost) * 100) / price) : 0, nat(price, cost) && price > 0 && cost <= price, 'margin', [price, cost]) }
  /** SEAT UTILIZATION as a percent of seats. value ⌊occupied · 100 / seats⌋. */
  static seatutilization(occupied: number, seats: number): CrossFormula { return c('restaurant-seatutilization', 'seatutilization(occupied, seats) = ⌊occupied · 100 / seats⌋', seats > 0 ? Math.floor((occupied * 100) / seats) : 0, nat(occupied, seats) && seats > 0 && occupied <= seats, 'seatutilization', [occupied, seats]) }
  /** PREP TIME per dish: minutes over the dishes made. value ⌊minutes / dishes⌋. */
  static preptime(minutes: number, dishes: number): CrossFormula { return c('restaurant-preptime', 'preptime(minutes, dishes) = ⌊minutes / dishes⌋', dishes > 0 ? Math.floor(minutes / dishes) : 0, nat(minutes, dishes) && dishes > 0, 'preptime', [minutes, dishes]) }
}

for (const name of ['averagecheck', 'foodcost', 'laborcost', 'margin', 'preptime', 'seatutilization', 'turnover', 'waste'] as const)
  hexRegisterOf('restaurant', name, (RestaurantFormulas[name] as (...x: unknown[]) => unknown).bind(RestaurantFormulas))
