import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MERCHANDISING — SHELVING A CATALOGUE AS ARITHMETIC (chosen by the public-API registry, not by hand). Selling goods is
 *  numbers: the margin and markup on a price, how much of a buy sold through, how fast inventory turns, the facings on a
 *  shelf, the slots in a planogram, the breadth of an assortment, and the return earned on inventory. Crosses to `retail` —
 *  merchandising is how retail is laid out. A measure. */

const PROOF = 'merchandising arithmetic (margin, markup, sell-through, turnover, facings, planogram, assortment, gmroi); a public-API registry domain; a measure crossed to retail'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'merchandising', dst: 'retail', formula, value, proof: PROOF, ...extra }, holds, { name: `merchandising.${name}`, params })

export class MerchandisingFormulas {
  /** GROSS MARGIN as a percentage of price. value ⌊(price − cost) · 100 / price⌋. */
  static margin(price: number, cost: number): CrossFormula { return c('merchandising-margin', 'margin(price, cost) = ⌊(price − cost) · 100 / price⌋', price > 0 ? Math.floor((Math.max(0, price - cost) * 100) / price) : 0, nat(price, cost) && price > 0 && cost <= price, 'margin', [price, cost]) }
  /** MARKUP over cost as a percentage. value ⌊(price − cost) · 100 / cost⌋. */
  static markup(price: number, cost: number): CrossFormula { return c('merchandising-markup', 'markup(price, cost) = ⌊(price − cost) · 100 / cost⌋', cost > 0 ? Math.floor((Math.max(0, price - cost) * 100) / cost) : 0, nat(price, cost) && cost > 0 && cost <= price, 'markup', [price, cost]) }
  /** SELL-THROUGH: units sold as a percentage of units received. value ⌊sold · 100 / received⌋. */
  static sellthrough(sold: number, received: number): CrossFormula { return c('merchandising-sellthrough', 'sellthrough(sold, received) = ⌊sold · 100 / received⌋', received > 0 ? Math.floor((sold * 100) / received) : 0, nat(sold, received) && received > 0 && sold <= received, 'sellthrough', [sold, received]) }
  /** INVENTORY TURNOVER: cost of goods sold over average inventory. value ⌊cogs / inventory⌋. */
  static turnover(cogs: number, inventory: number): CrossFormula { return c('merchandising-turnover', 'turnover(cogs, inventory) = ⌊cogs / inventory⌋', inventory > 0 ? Math.floor(cogs / inventory) : 0, nat(cogs, inventory) && inventory > 0, 'turnover', [cogs, inventory]) }
  /** FACINGS: how many product facings fit a shelf at a facing width. value ⌊shelf / width⌋. */
  static facings(shelf: number, width: number): CrossFormula { return c('merchandising-facings', 'facings(shelf, width) = ⌊shelf / width⌋', width > 0 ? Math.floor(shelf / width) : 0, nat(shelf, width) && width > 0, 'facings', [shelf, width]) }
  /** PLANOGRAM: the slots laid out across shelves. value shelves · perShelf. */
  static planogram(shelves: number, perShelf: number): CrossFormula { return c('merchandising-planogram', 'planogram(shelves, perShelf) = shelves · perShelf', shelves * perShelf, nat(shelves, perShelf), 'planogram', [shelves, perShelf]) }
  /** ASSORTMENT: the SKUs carried across categories. value categories · skus. */
  static assortment(categories: number, skus: number): CrossFormula { return c('merchandising-assortment', 'assortment(categories, skus) = categories · skus', categories * skus, nat(categories, skus), 'assortment', [categories, skus]) }
  /** GMROI: gross-margin return on inventory investment, as a percentage. value ⌊margin · 100 / inventory⌋. */
  static gmroi(margin: number, inventory: number): CrossFormula { return c('merchandising-gmroi', 'gmroi(margin, inventory) = ⌊margin · 100 / inventory⌋', inventory > 0 ? Math.floor((margin * 100) / inventory) : 0, nat(margin, inventory) && inventory > 0, 'gmroi', [margin, inventory]) }
}

for (const name of ['assortment', 'facings', 'gmroi', 'margin', 'markup', 'planogram', 'sellthrough', 'turnover'] as const)
  hexRegisterOf('merchandising', name, (MerchandisingFormulas[name] as (...x: unknown[]) => unknown).bind(MerchandisingFormulas))
