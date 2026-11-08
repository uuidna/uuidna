import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MARKETING — SPEND AND RETURN, AS ARITHMETIC (chosen by the registry). A campaign is numbers: return on ad spend, cost
 *  per click, cost per thousand, cost per lead, return on investment, the budget, reach from a budget, and churn. Crosses
 *  to `analytics`. A measure. */

const PROOF = 'marketing arithmetic (ROAS, cost per click, CPM, cost per lead, ROI, budget, reach, churn); a measure crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const m = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'marketing', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `marketing.${name}`, params })

export class MarketingFormulas {
  /** RETURN ON AD SPEND as a percentage: revenue over spend. value ⌊revenue · 100 / spend⌋. */
  static roas(revenue: number, spend: number): CrossFormula { return m('marketing-roas', 'roas(revenue, spend) = ⌊revenue · 100 / spend⌋', spend > 0 ? Math.floor((revenue * 100) / spend) : 0, nat(revenue, spend) && spend > 0, 'roas', [revenue, spend]) }
  /** COST PER CLICK: spend over clicks. value ⌊spend / clicks⌋. */
  static cpc(spend: number, clicks: number): CrossFormula { return m('marketing-cpc', 'cpc(spend, clicks) = ⌊spend / clicks⌋', clicks > 0 ? Math.floor(spend / clicks) : 0, nat(spend, clicks) && clicks > 0, 'cpc', [spend, clicks]) }
  /** COST PER THOUSAND IMPRESSIONS. value ⌊spend · 1000 / impressions⌋. */
  static cpm(spend: number, impressions: number): CrossFormula { return m('marketing-cpm', 'cpm(spend, impressions) = ⌊spend · 1000 / impressions⌋', impressions > 0 ? Math.floor((spend * 1000) / impressions) : 0, nat(spend, impressions) && impressions > 0, 'cpm', [spend, impressions]) }
  /** COST PER LEAD: spend over leads. value ⌊spend / leads⌋. */
  static cpl(spend: number, leads: number): CrossFormula { return m('marketing-cpl', 'cpl(spend, leads) = ⌊spend / leads⌋', leads > 0 ? Math.floor(spend / leads) : 0, nat(spend, leads) && leads > 0, 'cpl', [spend, leads]) }
  /** RETURN ON INVESTMENT as a percentage (may be negative — a loss). value ⌊(revenue − cost) · 100 / cost⌋. */
  static roi(revenue: number, cost: number): CrossFormula { return m('marketing-roi', 'roi(revenue, cost) = ⌊(revenue − cost) · 100 / cost⌋', cost > 0 ? Math.floor(((revenue - cost) * 100) / cost) : 0, nat(revenue, cost) && cost > 0, 'roi', [revenue, cost]) }
  /** THE BUDGET: a daily spend over a number of days. value daily · days. */
  static budget(daily: number, days: number): CrossFormula { return m('marketing-budget', 'budget(daily, days) = daily · days', daily * days, nat(daily, days), 'budget', [daily, days]) }
  /** REACH from a budget: the impressions a budget buys at a CPM. value ⌊budget · 1000 / cpm⌋. */
  static reach(budget: number, cpm: number): CrossFormula { return m('marketing-reach', 'reach(budget, cpm) = ⌊budget · 1000 / cpm⌋', cpm > 0 ? Math.floor((budget * 1000) / cpm) : 0, nat(budget, cpm) && cpm > 0, 'reach', [budget, cpm]) }
  /** CHURN as a percentage: customers lost over the starting count. value ⌊lost · 100 / start⌋. */
  static churn(lost: number, start: number): CrossFormula { return m('marketing-churn', 'churn(lost, start) = ⌊lost · 100 / start⌋', start > 0 ? Math.floor((lost * 100) / start) : 0, nat(lost, start) && start > 0 && lost <= start, 'churn', [lost, start]) }
}

for (const name of ['budget', 'churn', 'cpc', 'cpl', 'cpm', 'reach', 'roas', 'roi'] as const)
  hexRegisterOf('marketing', name, (MarketingFormulas[name] as (...x: unknown[]) => unknown).bind(MarketingFormulas))
