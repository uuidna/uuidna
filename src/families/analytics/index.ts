import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANALYTICS — MEASUREMENT OF A PRODUCT, AS ARITHMETIC (chosen by the registry). The health of a product is ratios:
 *  conversion rate, click-through, bounce, retention, average revenue per user, lifetime value, acquisition cost, and the
 *  funnel. Crosses to `ml` — analytics is what a model learns from. A measure. */

const PROOF = 'product analytics (conversion, click-through, bounce, retention, ARPU, lifetime value, acquisition cost, funnel); a measure crossed to ml'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const a = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'analytics', dst: 'ml', formula, value, proof: PROOF, ...extra }, holds, { name: `analytics.${name}`, params })

export class AnalyticsFormulas {
  /** CONVERSION RATE as a percentage: events over visits. value ⌊events · 100 / visits⌋. */
  static rate(events: number, visits: number): CrossFormula { return a('analytics-rate', 'rate(events, visits) = ⌊events · 100 / visits⌋', visits > 0 ? Math.floor((events * 100) / visits) : 0, nat(events, visits) && visits > 0, 'rate', [events, visits]) }
  /** CLICK-THROUGH RATE as a percentage. value ⌊clicks · 100 / impressions⌋. */
  static ctr(clicks: number, impressions: number): CrossFormula { return a('analytics-ctr', 'ctr(clicks, impressions) = ⌊clicks · 100 / impressions⌋', impressions > 0 ? Math.floor((clicks * 100) / impressions) : 0, nat(clicks, impressions) && impressions > 0, 'ctr', [clicks, impressions]) }
  /** BOUNCE RATE as a percentage: single-page sessions over all sessions. value ⌊single · 100 / sessions⌋. */
  static bounce(single: number, sessions: number): CrossFormula { return a('analytics-bounce', 'bounce(single, sessions) = ⌊single · 100 / sessions⌋', sessions > 0 ? Math.floor((single * 100) / sessions) : 0, nat(single, sessions) && sessions > 0, 'bounce', [single, sessions]) }
  /** RETENTION as a percentage: returning users over the cohort. value ⌊returning · 100 / cohort⌋. */
  static retention(returning: number, cohort: number): CrossFormula { return a('analytics-retention', 'retention(returning, cohort) = ⌊returning · 100 / cohort⌋', cohort > 0 ? Math.floor((returning * 100) / cohort) : 0, nat(returning, cohort) && cohort > 0, 'retention', [returning, cohort]) }
  /** AVERAGE REVENUE PER USER. value ⌊revenue / users⌋. */
  static arpu(revenue: number, users: number): CrossFormula { return a('analytics-arpu', 'arpu(revenue, users) = ⌊revenue / users⌋', users > 0 ? Math.floor(revenue / users) : 0, nat(revenue, users) && users > 0, 'arpu', [revenue, users]) }
  /** LIFETIME VALUE: average revenue per user over the expected months. value arpu · months. */
  static ltv(arpu: number, months: number): CrossFormula { return a('analytics-ltv', 'ltv(arpu, months) = arpu · months', arpu * months, nat(arpu, months), 'ltv', [arpu, months]) }
  /** CUSTOMER ACQUISITION COST: marketing spend over customers acquired. value ⌊spend / acquired⌋. */
  static cac(spend: number, acquired: number): CrossFormula { return a('analytics-cac', 'cac(spend, acquired) = ⌊spend / acquired⌋', acquired > 0 ? Math.floor(spend / acquired) : 0, nat(spend, acquired) && acquired > 0, 'cac', [spend, acquired]) }
  /** THE FUNNEL as a percentage: those reaching the bottom over those at the top. value ⌊bottom · 100 / top⌋. */
  static funnel(top: number, bottom: number): CrossFormula { return a('analytics-funnel', 'funnel(top, bottom) = ⌊bottom · 100 / top⌋', top > 0 ? Math.floor((bottom * 100) / top) : 0, nat(top, bottom) && top > 0 && bottom <= top, 'funnel', [top, bottom]) }
}

for (const name of ['arpu', 'bounce', 'cac', 'ctr', 'funnel', 'ltv', 'rate', 'retention'] as const)
  hexRegisterOf('analytics', name, (AnalyticsFormulas[name] as (...x: unknown[]) => unknown).bind(AnalyticsFormulas))
