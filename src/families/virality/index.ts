import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VIRALITY — HOW CONTENT SPREADS, AS ARITHMETIC. The spread of a thing is numbers: the K-factor an invite earns, the
 *  time a cycle takes, the shares a view yields, amplification per post, reach per seed, engagement per impression, how
 *  saturated the market is, and the half-life of attention. Crosses to `content` — virality is a measure of content. */

const PROOF = 'virality arithmetic (K-factor coefficient, cycle time, shares, amplification, reach, engagement, saturation, half-life); how content spreads; a measure crossed to content'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'virality', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `virality.${name}`, params })

export class ViralityFormulas {
  /** COEFFICIENT: the K-factor an invite earns at a conversion rate. value ⌊invites · conversion / 100⌋. */
  static coefficient(invites: number, conversion: number): CrossFormula { return c('virality-coefficient', 'coefficient(invites, conversion) = ⌊invites · conversion / 100⌋', Math.floor((invites * conversion) / 100), nat(invites, conversion), 'coefficient', [invites, conversion]) }
  /** CYCLE TIME: the days a viral cycle takes. value days. */
  static cycletime(days: number): CrossFormula { return c('virality-cycletime', 'cycletime(days) = days', days, nat(days), 'cycletime', [days]) }
  /** SHARES per hundred views. value ⌊shared · 100 / views⌋. */
  static shares(shared: number, views: number): CrossFormula { return c('virality-shares', 'shares(shared, views) = ⌊shared · 100 / views⌋', views > 0 ? Math.floor((shared * 100) / views) : 0, nat(shared, views) && views > 0 && shared <= views, 'shares', [shared, views]) }
  /** AMPLIFICATION: reshares per post. value ⌊reshares / posts⌋. */
  static amplification(reshares: number, posts: number): CrossFormula { return c('virality-amplification', 'amplification(reshares, posts) = ⌊reshares / posts⌋', posts > 0 ? Math.floor(reshares / posts) : 0, nat(reshares, posts) && posts > 0, 'amplification', [reshares, posts]) }
  /** REACH: those exposed per seed. value ⌊exposed / seed⌋. */
  static reach(exposed: number, seed: number): CrossFormula { return c('virality-reach', 'reach(exposed, seed) = ⌊exposed / seed⌋', seed > 0 ? Math.floor(exposed / seed) : 0, nat(exposed, seed) && seed > 0, 'reach', [exposed, seed]) }
  /** ENGAGEMENT per hundred impressions. value ⌊interactions · 100 / impressions⌋. */
  static engagement(interactions: number, impressions: number): CrossFormula { return c('virality-engagement', 'engagement(interactions, impressions) = ⌊interactions · 100 / impressions⌋', impressions > 0 ? Math.floor((interactions * 100) / impressions) : 0, nat(interactions, impressions) && impressions > 0 && interactions <= impressions, 'engagement', [interactions, impressions]) }
  /** SATURATION: the market reached, as a percentage. value ⌊reached · 100 / market⌋. */
  static saturation(reached: number, market: number): CrossFormula { return c('virality-saturation', 'saturation(reached, market) = ⌊reached · 100 / market⌋', market > 0 ? Math.floor((reached * 100) / market) : 0, nat(reached, market) && market > 0 && reached <= market, 'saturation', [reached, market]) }
  /** HALF-LIFE: the hours attention takes to halve. value hours. */
  static halflife(hours: number): CrossFormula { return c('virality-halflife', 'halflife(hours) = hours', hours, nat(hours), 'halflife', [hours]) }
}

for (const name of ['amplification', 'coefficient', 'cycletime', 'engagement', 'halflife', 'reach', 'saturation', 'shares'] as const)
  hexRegisterOf('virality', name, (ViralityFormulas[name] as (...x: unknown[]) => unknown).bind(ViralityFormulas))
