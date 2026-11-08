import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOCIAL — AUDIENCE AND REACH, AS ARITHMETIC (chosen by the registry). A presence is numbers: the engagement rate, reach,
 *  virality, growth, impressions, sentiment, an influence score, and frequency. Crosses to `analytics`. A measure. */

const PROOF = 'social arithmetic (engagement rate, reach, virality, growth, impressions, sentiment, influence, frequency); a measure crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const s = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'social', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `social.${name}`, params })

export class SocialFormulas {
  /** THE ENGAGEMENT RATE as a percentage: interactions over reach. value ⌊interactions · 100 / reach⌋. */
  static engagement(interactions: number, reach: number): CrossFormula { return s('social-engagement', 'engagement(interactions, reach) = ⌊interactions · 100 / reach⌋', reach > 0 ? Math.floor((interactions * 100) / reach) : 0, nat(interactions, reach) && reach > 0, 'engagement', [interactions, reach]) }
  /** REACH: `pct`% of the followers who saw a post. value ⌊followers · pct / 100⌋. */
  static reach(followers: number, pct: number): CrossFormula { return s('social-reach', 'reach(followers, pct) = ⌊followers · pct / 100⌋', Math.floor((followers * pct) / 100), nat(followers, pct) && pct <= 100, 'reach', [followers, pct]) }
  /** VIRALITY as a percentage: shares over views. value ⌊shares · 100 / views⌋. */
  static virality(shares: number, views: number): CrossFormula { return s('social-virality', 'virality(shares, views) = ⌊shares · 100 / views⌋', views > 0 ? Math.floor((shares * 100) / views) : 0, nat(shares, views) && views > 0, 'virality', [shares, views]) }
  /** GROWTH as a percentage: followers gained over the starting count. value ⌊gained · 100 / start⌋. */
  static growth(gained: number, start: number): CrossFormula { return s('social-growth', 'growth(gained, start) = ⌊gained · 100 / start⌋', start > 0 ? Math.floor((gained * 100) / start) : 0, nat(gained, start) && start > 0, 'growth', [gained, start]) }
  /** IMPRESSIONS: posts at a reach each. value posts · reach. */
  static impressions(posts: number, reach: number): CrossFormula { return s('social-impressions', 'impressions(posts, reach) = posts · reach', posts * reach, nat(posts, reach), 'impressions', [posts, reach]) }
  /** SENTIMENT as a percentage: positive mentions over the total. value ⌊positive · 100 / total⌋. */
  static sentiment(positive: number, total: number): CrossFormula { return s('social-sentiment', 'sentiment(positive, total) = ⌊positive · 100 / total⌋', total > 0 ? Math.floor((positive * 100) / total) : 0, nat(positive, total) && total > 0 && positive <= total, 'sentiment', [positive, total]) }
  /** AN INFLUENCE SCORE: followers weighted by the engagement rate. value ⌊followers · rate / 100⌋. */
  static influence(followers: number, rate: number): CrossFormula { return s('social-influence', 'influence(followers, rate) = ⌊followers · rate / 100⌋', Math.floor((followers * rate) / 100), nat(followers, rate), 'influence', [followers, rate]) }
  /** FREQUENCY: impressions over the unique reach — how often each person saw a post. value ⌊impressions / reach⌋. */
  static frequency(impressions: number, reach: number): CrossFormula { return s('social-frequency', 'frequency(impressions, reach) = ⌊impressions / reach⌋', reach > 0 ? Math.floor(impressions / reach) : 0, nat(impressions, reach) && reach > 0, 'frequency', [impressions, reach]) }
}

for (const name of ['engagement', 'frequency', 'growth', 'impressions', 'influence', 'reach', 'sentiment', 'virality'] as const)
  hexRegisterOf('social', name, (SocialFormulas[name] as (...x: unknown[]) => unknown).bind(SocialFormulas))
