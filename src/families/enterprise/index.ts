import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENTERPRISE — ERP AND PROCUREMENT, AS ARITHMETIC (chosen by the public-API registry, not by hand). Running a business is
 *  numbers: a purchase order's total, whether an amount clears its approval threshold, the met share of an SLA, what a
 *  request is actually procured at, lead time, inventory turnover, capacity utilization, and when to reorder. Crosses to
 *  `accounting` — enterprise is what the books record. A measure. */

const PROOF = 'enterprise arithmetic (purchase order, approval, SLA, procurement, lead time, turnover, utilization, reorder); the registry\'s ERP/procurement domain; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'enterprise', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `enterprise.${name}`, params })

export class EnterpriseFormulas {
  /** PURCHASE ORDER: a line of quantity at a unit price. value quantity · price. */
  static po(quantity: number, price: number): CrossFormula { return c('enterprise-po', 'po(quantity, price) = quantity · price', quantity * price, nat(quantity, price), 'po', [quantity, price]) }
  /** APPROVAL: 1 when the amount is within its threshold. value [amount ≤ threshold]. */
  static approval(amount: number, threshold: number): CrossFormula { return c('enterprise-approval', 'approval(amount, threshold) = [amount ≤ threshold]', amount <= threshold ? 1 : 0, nat(amount, threshold), 'approval', [amount, threshold]) }
  /** THE SLA: the met share of the measured calls, as a percentage. value ⌊met · 100 / total⌋. */
  static sla(met: number, total: number): CrossFormula { return c('enterprise-sla', 'sla(met, total) = ⌊met · 100 / total⌋', total > 0 ? Math.floor((met * 100) / total) : 0, nat(met, total) && total > 0 && met <= total, 'sla', [met, total]) }
  /** PROCUREMENT: a request is procured at the smaller of what was asked and what cleared. value min(requested, approved). */
  static procurement(requested: number, approved: number): CrossFormula { return c('enterprise-procurement', 'procurement(requested, approved) = min(requested, approved)', Math.min(requested, approved), nat(requested, approved), 'procurement', [requested, approved]) }
  /** LEAD TIME: the days between order and receipt, never negative. value max(0, received − ordered). */
  static leadtime(ordered: number, received: number): CrossFormula { return c('enterprise-leadtime', 'leadtime(ordered, received) = max(0, received − ordered)', Math.max(0, received - ordered), nat(ordered, received), 'leadtime', [ordered, received]) }
  /** INVENTORY TURNOVER: cost of goods sold over the inventory held. value ⌊cogs / inventory⌋. */
  static turnover(cogs: number, inventory: number): CrossFormula { return c('enterprise-turnover', 'turnover(cogs, inventory) = ⌊cogs / inventory⌋', inventory > 0 ? Math.floor(cogs / inventory) : 0, nat(cogs, inventory) && inventory > 0, 'turnover', [cogs, inventory]) }
  /** UTILIZATION: used against capacity, as a percentage. value ⌊used · 100 / capacity⌋. */
  static utilization(used: number, capacity: number): CrossFormula { return c('enterprise-utilization', 'utilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'utilization', [used, capacity]) }
  /** REORDER: 1 when stock has fallen to its reorder point. value [stock ≤ point]. */
  static reorder(stock: number, point: number): CrossFormula { return c('enterprise-reorder', 'reorder(stock, point) = [stock ≤ point]', stock <= point ? 1 : 0, nat(stock, point), 'reorder', [stock, point]) }
}

for (const name of ['approval', 'leadtime', 'po', 'procurement', 'reorder', 'sla', 'turnover', 'utilization'] as const)
  hexRegisterOf('enterprise', name, (EnterpriseFormulas[name] as (...x: unknown[]) => unknown).bind(EnterpriseFormulas))
