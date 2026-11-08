import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PRICING — THE PRICING USE CASE FROM payloadcms/website, AS ARITHMETIC. A SaaS pricing table is numbers: a plan billed
 *  annually, a percentage discount, the savings against monthly, per-seat totals, monthly and annual recurring revenue,
 *  the price step on an upgrade, and the features a tier admits. Crosses to `ecommerce` — pricing is what a store charges.
 *  A measure. */

const PROOF = 'pricing arithmetic (annual billing, discount, savings, seats, mrr, arr, upgrade, tier) from the payloadcms/website Pricing use case; a measure crossed to ecommerce'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pricing', dst: 'ecommerce', formula, value, proof: PROOF, ...extra }, holds, { name: `pricing.${name}`, params })

export class PricingFormulas {
  /** ANNUAL BILLING: a monthly price over a run of months. value monthly · months. */
  static annual(monthly: number, months: number): CrossFormula { return c('pricing-annual', 'annual(monthly, months) = monthly · months', monthly * months, nat(monthly, months), 'annual', [monthly, months]) }
  /** ANNUAL RECURRING REVENUE: monthly recurring revenue over a run of months. value mrr · months. */
  static arr(mrr: number, months: number): CrossFormula { return c('pricing-arr', 'arr(mrr, months) = mrr · months', mrr * months, nat(mrr, months), 'arr', [mrr, months]) }
  /** DISCOUNT: a percentage off a price. value ⌊price · pct / 100⌋. */
  static discount(price: number, pct: number): CrossFormula { return c('pricing-discount', 'discount(price, pct) = ⌊price · pct / 100⌋', Math.floor((price * pct) / 100), nat(price, pct) && pct <= 100, 'discount', [price, pct]) }
  /** MONTHLY RECURRING REVENUE: subscribers at a price each. value subs · price. */
  static mrr(subs: number, price: number): CrossFormula { return c('pricing-mrr', 'mrr(subs, price) = subs · price', subs * price, nat(subs, price), 'mrr', [subs, price]) }
  /** SAVINGS: a year of monthly billing against the annual price. value max(0, monthly · 12 − annual). */
  static savings(monthly: number, annual: number): CrossFormula { return c('pricing-savings', 'savings(monthly, annual) = max(0, monthly · 12 − annual)', Math.max(0, monthly * 12 - annual), nat(monthly, annual), 'savings', [monthly, annual]) }
  /** SEATS: users at a per-seat price. value users · perSeat. */
  static seats(users: number, perSeat: number): CrossFormula { return c('pricing-seats', 'seats(users, perSeat) = users · perSeat', users * perSeat, nat(users, perSeat), 'seats', [users, perSeat]) }
  /** TIER: the features a tier admits. value ⌊features / tiers⌋. */
  static tier(features: number, tiers: number): CrossFormula { return c('pricing-tier', 'tier(features, tiers) = ⌊features / tiers⌋', tiers > 0 ? Math.floor(features / tiers) : 0, nat(features, tiers) && tiers > 0, 'tier', [features, tiers]) }
  /** UPGRADE: the price step from one plan to another. value max(0, to − from). */
  static upgrade(from: number, to: number): CrossFormula { return c('pricing-upgrade', 'upgrade(from, to) = max(0, to − from)', Math.max(0, to - from), nat(from, to), 'upgrade', [from, to]) }
}

for (const name of ['annual', 'arr', 'discount', 'mrr', 'savings', 'seats', 'tier', 'upgrade'] as const)
  hexRegisterOf('pricing', name, (PricingFormulas[name] as (...x: unknown[]) => unknown).bind(PricingFormulas))
