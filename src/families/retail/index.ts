import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RETAIL — BRICK-AND-MORTAR RETAIL, AS ARITHMETIC (chosen by the public-API registry, not by hand). A shop is numbers:
 *  markup and margin on a price, inventory turnover, the footfall that converts, the average basket, shrinkage off the
 *  shelf, whether to restock, and the sales a line brings in. Crosses to `econ` — retail is economics on the floor. A measure. */

const PROOF = 'retail arithmetic (markup, margin, turnover, footfall, basket, shrinkage, restock, sales); brick-and-mortar retail chosen by the public-API registry; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'retail', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `retail.${name}`, params })

export class RetailFormulas {
  /** MARKUP: the price over cost as a percentage of cost. value ⌊(price − cost) · 100 / cost⌋. */
  static markup(cost: number, price: number): CrossFormula { return c('retail-markup', 'markup(cost, price) = ⌊(price − cost) · 100 / cost⌋', cost > 0 ? Math.floor(((price - cost) * 100) / cost) : 0, nat(cost, price) && cost > 0, 'markup', [cost, price]) }
  /** MARGIN: the profit as a percentage of price. value ⌊(price − cost) · 100 / price⌋. */
  static margin(price: number, cost: number): CrossFormula { return c('retail-margin', 'margin(price, cost) = ⌊(price − cost) · 100 / price⌋', price > 0 ? Math.floor(((price - cost) * 100) / price) : 0, nat(price, cost) && price > 0, 'margin', [price, cost]) }
  /** INVENTORY TURNOVER: cost of goods sold over inventory held. value ⌊cogs / inventory⌋. */
  static turnover(cogs: number, inventory: number): CrossFormula { return c('retail-turnover', 'turnover(cogs, inventory) = ⌊cogs / inventory⌋', inventory > 0 ? Math.floor(cogs / inventory) : 0, nat(cogs, inventory) && inventory > 0, 'turnover', [cogs, inventory]) }
  /** FOOTFALL: the buyers out of the visitors, as a percentage. value ⌊buyers · 100 / visitors⌋. */
  static footfall(buyers: number, visitors: number): CrossFormula { return c('retail-footfall', 'footfall(buyers, visitors) = ⌊buyers · 100 / visitors⌋', visitors > 0 ? Math.floor((buyers * 100) / visitors) : 0, nat(buyers, visitors) && visitors > 0 && buyers <= visitors, 'footfall', [buyers, visitors]) }
  /** AVERAGE BASKET: revenue over the transactions that made it. value ⌊revenue / transactions⌋. */
  static basket(revenue: number, transactions: number): CrossFormula { return c('retail-basket', 'basket(revenue, transactions) = ⌊revenue / transactions⌋', transactions > 0 ? Math.floor(revenue / transactions) : 0, nat(revenue, transactions) && transactions > 0, 'basket', [revenue, transactions]) }
  /** SHRINKAGE: the stock lost, as a percentage of stock. value ⌊lost · 100 / stock⌋. */
  static shrinkage(lost: number, stock: number): CrossFormula { return c('retail-shrinkage', 'shrinkage(lost, stock) = ⌊lost · 100 / stock⌋', stock > 0 ? Math.floor((lost * 100) / stock) : 0, nat(lost, stock) && stock > 0 && lost <= stock, 'shrinkage', [lost, stock]) }
  /** RESTOCK: 1 when the units sold reach the reorder point. value [sold ≥ reorder]. */
  static restock(sold: number, reorder: number): CrossFormula { return c('retail-restock', 'restock(sold, reorder) = [sold ≥ reorder]', sold >= reorder ? 1 : 0, nat(sold, reorder), 'restock', [sold, reorder]) }
  /** SALES: units at a price each. value units · price. */
  static sales(units: number, price: number): CrossFormula { return c('retail-sales', 'sales(units, price) = units · price', units * price, nat(units, price), 'sales', [units, price]) }
}

for (const name of ['basket', 'footfall', 'margin', 'markup', 'restock', 'sales', 'shrinkage', 'turnover'] as const)
  hexRegisterOf('retail', name, (RetailFormulas[name] as (...x: unknown[]) => unknown).bind(RetailFormulas))
