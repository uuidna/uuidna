import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ECOMMERCE — A STOREFRONT, AS ARITHMETIC (chosen by the registry). A sale is numbers: the cart total, a discount, the
 *  shipping, the margin, the average order value, the conversion, a refund, and the inventory left. Crosses to
 *  `accounting` — every order books to the ledger. A measure. */

const PROOF = 'ecommerce arithmetic (cart, discount, shipping, margin, average order value, conversion, refund, inventory) booked to the ledger; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const e = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ecommerce', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `ecommerce.${name}`, params })

export class EcommerceFormulas {
  /** THE CART TOTAL: items at a unit price. value items · price. */
  static cart(items: number, price: number): CrossFormula { return e('ecommerce-cart', 'cart(items, price) = items · price', items * price, nat(items, price), 'cart', [items, price]) }
  /** A DISCOUNT: `pct`% off the price. value ⌊price · pct / 100⌋. */
  static discount(price: number, pct: number): CrossFormula { return e('ecommerce-discount', 'discount(price, pct) = ⌊price · pct / 100⌋', Math.floor((price * pct) / 100), nat(price, pct) && pct <= 100, 'discount', [price, pct]) }
  /** SHIPPING: weight at a rate per unit. value weight · rate. */
  static shipping(weight: number, rate: number): CrossFormula { return e('ecommerce-shipping', 'shipping(weight, rate) = weight · rate', weight * rate, nat(weight, rate), 'shipping', [weight, rate]) }
  /** THE MARGIN as a percentage of price. value ⌊(price − cost) · 100 / price⌋. */
  static margin(price: number, cost: number): CrossFormula { return e('ecommerce-margin', 'margin(price, cost) = ⌊(price − cost) · 100 / price⌋', price > 0 ? Math.floor(((price - cost) * 100) / price) : 0, nat(price, cost) && price > 0, 'margin', [price, cost]) }
  /** AVERAGE ORDER VALUE: revenue over orders. value ⌊revenue / orders⌋. */
  static aov(revenue: number, orders: number): CrossFormula { return e('ecommerce-aov', 'aov(revenue, orders) = ⌊revenue / orders⌋', orders > 0 ? Math.floor(revenue / orders) : 0, nat(revenue, orders) && orders > 0, 'aov', [revenue, orders]) }
  /** CONVERSION as a percentage: orders over visits. value ⌊orders · 100 / visits⌋. */
  static conversion(orders: number, visits: number): CrossFormula { return e('ecommerce-conversion', 'conversion(orders, visits) = ⌊orders · 100 / visits⌋', visits > 0 ? Math.floor((orders * 100) / visits) : 0, nat(orders, visits) && visits > 0, 'conversion', [orders, visits]) }
  /** A REFUND: `pct`% of the price returned. value ⌊price · pct / 100⌋. */
  static refund(price: number, pct: number): CrossFormula { return e('ecommerce-refund', 'refund(price, pct) = ⌊price · pct / 100⌋', Math.floor((price * pct) / 100), nat(price, pct) && pct <= 100, 'refund', [price, pct]) }
  /** INVENTORY left: stock less units sold. value max(0, stock − sold). */
  static inventory(stock: number, sold: number): CrossFormula { return e('ecommerce-inventory', 'inventory(stock, sold) = max(0, stock − sold)', Math.max(0, stock - sold), nat(stock, sold), 'inventory', [stock, sold]) }
}

for (const name of ['aov', 'cart', 'conversion', 'discount', 'inventory', 'margin', 'refund', 'shipping'] as const)
  hexRegisterOf('ecommerce', name, (EcommerceFormulas[name] as (...x: unknown[]) => unknown).bind(EcommerceFormulas))
