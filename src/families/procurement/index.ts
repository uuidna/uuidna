import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROCUREMENT — BUYING AS ARITHMETIC (chosen by the registry, not by hand). Sourcing is numbers: the savings a
 *  negotiation wins, the spend a line item books, the share of compliant orders, the lead time to receipt, an economic
 *  order-quantity proxy, a supplier's on-time rate, a volume discount, and the share of accepted goods. Crosses to
 *  `logistics` — what procurement buys is what logistics moves. A measure. */

const PROOF = 'procurement arithmetic (savings, spend, compliance, lead time, economic order quantity, supplier on-time, volume discount, quality); a registry domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'procurement', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `procurement.${name}`, params })

export class ProcurementFormulas {
  /** SAVINGS: what a negotiation shaves off the baseline, never below zero. value max(0, baseline − negotiated). */
  static savings(baseline: number, negotiated: number): CrossFormula { return c('procurement-savings', 'savings(baseline, negotiated) = max(0, baseline − negotiated)', Math.max(0, baseline - negotiated), nat(baseline, negotiated), 'savings', [baseline, negotiated]) }
  /** SPEND: units at a unit price. value units · price. */
  static spend(units: number, price: number): CrossFormula { return c('procurement-spend', 'spend(units, price) = units · price', units * price, nat(units, price), 'spend', [units, price]) }
  /** COMPLIANCE: the share of compliant orders as a percentage. value ⌊compliant · 100 / total⌋. */
  static compliance(compliant: number, total: number): CrossFormula { return c('procurement-compliance', 'compliance(compliant, total) = ⌊compliant · 100 / total⌋', total > 0 ? Math.floor((compliant * 100) / total) : 0, nat(compliant, total) && total > 0 && compliant <= total, 'compliance', [compliant, total]) }
  /** LEAD TIME: days from order to receipt, never below zero. value max(0, received − ordered). */
  static leadtime(ordered: number, received: number): CrossFormula { return c('procurement-leadtime', 'leadtime(ordered, received) = max(0, received − ordered)', Math.max(0, received - ordered), nat(ordered, received), 'leadtime', [ordered, received]) }
  /** ECONOMIC ORDER QUANTITY proxy: demand over the per-order cost. value ⌊demand / cost⌋. */
  static eoq(demand: number, cost: number): CrossFormula { return c('procurement-eoq', 'eoq(demand, cost) = ⌊demand / cost⌋', cost > 0 ? Math.floor(demand / cost) : 0, nat(demand, cost) && cost > 0, 'eoq', [demand, cost]) }
  /** SUPPLIER on-time rate as a percentage. value ⌊delivered · 100 / promised⌋. */
  static supplier(delivered: number, promised: number): CrossFormula { return c('procurement-supplier', 'supplier(delivered, promised) = ⌊delivered · 100 / promised⌋', promised > 0 ? Math.floor((delivered * 100) / promised) : 0, nat(delivered, promised) && promised > 0 && delivered <= promised, 'supplier', [delivered, promised]) }
  /** VOLUME DISCOUNT: a rate (percent) off a volume. value ⌊volume · rate / 100⌋. */
  static discount(volume: number, rate: number): CrossFormula { return c('procurement-discount', 'discount(volume, rate) = ⌊volume · rate / 100⌋', Math.floor((volume * rate) / 100), nat(volume, rate), 'discount', [volume, rate]) }
  /** QUALITY: the share of accepted goods as a percentage. value ⌊accepted · 100 / received⌋. */
  static quality(accepted: number, received: number): CrossFormula { return c('procurement-quality', 'quality(accepted, received) = ⌊accepted · 100 / received⌋', received > 0 ? Math.floor((accepted * 100) / received) : 0, nat(accepted, received) && received > 0 && accepted <= received, 'quality', [accepted, received]) }
}

for (const name of ['compliance', 'discount', 'eoq', 'leadtime', 'quality', 'savings', 'spend', 'supplier'] as const)
  hexRegisterOf('procurement', name, (ProcurementFormulas[name] as (...x: unknown[]) => unknown).bind(ProcurementFormulas))
