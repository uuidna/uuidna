import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ADVERTISING — A CAMPAIGN AS ARITHMETIC (chosen by the public-API registry, not by hand). Running ads is numbers:
 *  click-through in basis points, cost per mille, cost per click, conversion rate, return on ad spend, reach at a
 *  frequency, cost per acquisition, and engagement over reach. Crosses to `content` — advertising is what content
 *  carries. A measure. */

const PROOF = 'advertising arithmetic (ctr, cpm, cpc, conversion, roas, reach, cpa, engagement); a public-API domain; a measure crossed to content'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'advertising', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `advertising.${name}`, params })

export class AdvertisingFormulas {
  /** CLICK-THROUGH RATE in basis points. value ⌊clicks · 10000 / impressions⌋. */
  static ctr(clicks: number, impressions: number): CrossFormula { return c('advertising-ctr', 'ctr(clicks, impressions) = ⌊clicks · 10000 / impressions⌋', impressions > 0 ? Math.floor((clicks * 10000) / impressions) : 0, nat(clicks, impressions) && impressions > 0 && clicks <= impressions, 'ctr', [clicks, impressions]) }
  /** COST PER MILLE: cost per thousand impressions. value ⌊cost · 1000 / impressions⌋. */
  static cpm(cost: number, impressions: number): CrossFormula { return c('advertising-cpm', 'cpm(cost, impressions) = ⌊cost · 1000 / impressions⌋', impressions > 0 ? Math.floor((cost * 1000) / impressions) : 0, nat(cost, impressions) && impressions > 0, 'cpm', [cost, impressions]) }
  /** COST PER CLICK: cost over the clicks. value ⌊cost / clicks⌋. */
  static cpc(cost: number, clicks: number): CrossFormula { return c('advertising-cpc', 'cpc(cost, clicks) = ⌊cost / clicks⌋', clicks > 0 ? Math.floor(cost / clicks) : 0, nat(cost, clicks) && clicks > 0, 'cpc', [cost, clicks]) }
  /** CONVERSION RATE as a percentage. value ⌊converted · 100 / clicks⌋. */
  static conversion(converted: number, clicks: number): CrossFormula { return c('advertising-conversion', 'conversion(converted, clicks) = ⌊converted · 100 / clicks⌋', clicks > 0 ? Math.floor((converted * 100) / clicks) : 0, nat(converted, clicks) && clicks > 0 && converted <= clicks, 'conversion', [converted, clicks]) }
  /** RETURN ON AD SPEND as a percentage. value ⌊revenue · 100 / spend⌋. */
  static roas(revenue: number, spend: number): CrossFormula { return c('advertising-roas', 'roas(revenue, spend) = ⌊revenue · 100 / spend⌋', spend > 0 ? Math.floor((revenue * 100) / spend) : 0, nat(revenue, spend) && spend > 0, 'roas', [revenue, spend]) }
  /** REACH: unique people behind impressions at a frequency. value ⌊impressions / frequency⌋. */
  static reach(impressions: number, frequency: number): CrossFormula { return c('advertising-reach', 'reach(impressions, frequency) = ⌊impressions / frequency⌋', frequency > 0 ? Math.floor(impressions / frequency) : 0, nat(impressions, frequency) && frequency > 0, 'reach', [impressions, frequency]) }
  /** COST PER ACQUISITION: cost over the acquisitions. value ⌊cost / acquisitions⌋. */
  static cpa(cost: number, acquisitions: number): CrossFormula { return c('advertising-cpa', 'cpa(cost, acquisitions) = ⌊cost / acquisitions⌋', acquisitions > 0 ? Math.floor(cost / acquisitions) : 0, nat(cost, acquisitions) && acquisitions > 0, 'cpa', [cost, acquisitions]) }
  /** ENGAGEMENT RATE as a percentage. value ⌊interactions · 100 / reach⌋. */
  static engagement(interactions: number, reach_: number): CrossFormula { return c('advertising-engagement', 'engagement(interactions, reach) = ⌊interactions · 100 / reach⌋', reach_ > 0 ? Math.floor((interactions * 100) / reach_) : 0, nat(interactions, reach_) && reach_ > 0, 'engagement', [interactions, reach_]) }
}

for (const name of ['conversion', 'cpa', 'cpc', 'cpm', 'ctr', 'engagement', 'reach', 'roas'] as const)
  hexRegisterOf('advertising', name, (AdvertisingFormulas[name] as (...x: unknown[]) => unknown).bind(AdvertisingFormulas))
