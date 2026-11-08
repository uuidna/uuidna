import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CAMPAIGN — RUNNING AN AD CAMPAIGN, AS ARITHMETIC. Spending to be seen is numbers: the people reached, the impressions
 *  served, how often each person saw it, the clickthrough rate, cost per mille, cost per click, engagement, and the return
 *  on the spend. Crosses to `marketing` — a campaign is what marketing runs. A measure. */

const PROOF = 'campaign arithmetic (reach, impressions, frequency, ctr, cpm, cpc, engagement, roi); running an ad campaign as numbers; a measure crossed to marketing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'campaign', dst: 'marketing', formula, value, proof: PROOF, ...extra }, holds, { name: `campaign.${name}`, params })

export class CampaignFormulas {
  /** REACH: the people reached, a percentage of the audience. value ⌊audience · pct / 100⌋. */
  static reach(audience: number, pct: number): CrossFormula { return c('campaign-reach', 'reach(audience, pct) = ⌊audience · pct / 100⌋', Math.floor((audience * pct) / 100), nat(audience, pct) && pct <= 100, 'reach', [audience, pct]) }
  /** IMPRESSIONS: the people reached times how often each one saw it. value reach · frequency. */
  static impressions(reach: number, frequency: number): CrossFormula { return c('campaign-impressions', 'impressions(reach, frequency) = reach · frequency', reach * frequency, nat(reach, frequency), 'impressions', [reach, frequency]) }
  /** FREQUENCY: impressions over the people reached. value ⌊impressions / reach⌋. */
  static frequency(impressions: number, reach: number): CrossFormula { return c('campaign-frequency', 'frequency(impressions, reach) = ⌊impressions / reach⌋', reach > 0 ? Math.floor(impressions / reach) : 0, nat(impressions, reach) && reach > 0, 'frequency', [impressions, reach]) }
  /** CTR: clickthrough rate in basis points (per 10000). value ⌊clicks · 10000 / impressions⌋. */
  static ctr(clicks: number, impressions: number): CrossFormula { return c('campaign-ctr', 'ctr(clicks, impressions) = ⌊clicks · 10000 / impressions⌋', impressions > 0 ? Math.floor((clicks * 10000) / impressions) : 0, nat(clicks, impressions) && impressions > 0 && clicks <= impressions, 'ctr', [clicks, impressions]) }
  /** CPM: cost per mille, the spend per thousand impressions. value ⌊cost · 1000 / impressions⌋. */
  static cpm(cost: number, impressions: number): CrossFormula { return c('campaign-cpm', 'cpm(cost, impressions) = ⌊cost · 1000 / impressions⌋', impressions > 0 ? Math.floor((cost * 1000) / impressions) : 0, nat(cost, impressions) && impressions > 0, 'cpm', [cost, impressions]) }
  /** CPC: cost per click. value ⌊cost / clicks⌋. */
  static cpc(cost: number, clicks: number): CrossFormula { return c('campaign-cpc', 'cpc(cost, clicks) = ⌊cost / clicks⌋', clicks > 0 ? Math.floor(cost / clicks) : 0, nat(cost, clicks) && clicks > 0, 'cpc', [cost, clicks]) }
  /** ENGAGEMENT: the actions taken as a percentage of the people reached. value ⌊actions · 100 / reach⌋. */
  static engagement(actions: number, reach: number): CrossFormula { return c('campaign-engagement', 'engagement(actions, reach) = ⌊actions · 100 / reach⌋', reach > 0 ? Math.floor((actions * 100) / reach) : 0, nat(actions, reach) && reach > 0 && actions <= reach, 'engagement', [actions, reach]) }
  /** ROI: return on the spend, a percentage. value ⌊max(0, revenue − cost) · 100 / cost⌋. */
  static roi(revenue: number, cost: number): CrossFormula { return c('campaign-roi', 'roi(revenue, cost) = ⌊max(0, revenue − cost) · 100 / cost⌋', cost > 0 ? Math.floor((Math.max(0, revenue - cost) * 100) / cost) : 0, nat(revenue, cost) && cost > 0, 'roi', [revenue, cost]) }
}

for (const name of ['cpc', 'cpm', 'ctr', 'engagement', 'frequency', 'impressions', 'reach', 'roi'] as const)
  hexRegisterOf('campaign', name, (CampaignFormulas[name] as (...x: unknown[]) => unknown).bind(CampaignFormulas))
