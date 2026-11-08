import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BRANDING — A BRAND'S STANDING, AS ARITHMETIC (chosen by the public-API registry, not by hand). A brand is numbers:
 *  how many know it, how many recall it, how consistent it stays across touchpoints, the premium it earns, how many stay
 *  loyal, how the talk nets out, how far it reaches, and the net promoter score. Crosses to `content` — branding is the
 *  standing of what content carries. A measure. */

const PROOF = 'branding arithmetic (awareness, recall, consistency, equity, loyalty, sentiment, reach, nps); a public-API measure crossed to content'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'branding', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `branding.${name}`, params })

export class BrandingFormulas {
  /** AWARENESS as a percentage of those surveyed. value ⌊aware · 100 / surveyed⌋. */
  static awareness(aware: number, surveyed: number): CrossFormula { return c('branding-awareness', 'awareness(aware, surveyed) = ⌊aware · 100 / surveyed⌋', surveyed > 0 ? Math.floor((aware * 100) / surveyed) : 0, nat(aware, surveyed) && surveyed > 0 && aware <= surveyed, 'awareness', [aware, surveyed]) }
  /** RECALL as a percentage of those shown. value ⌊recalled · 100 / shown⌋. */
  static recall(recalled: number, shown: number): CrossFormula { return c('branding-recall', 'recall(recalled, shown) = ⌊recalled · 100 / shown⌋', shown > 0 ? Math.floor((recalled * 100) / shown) : 0, nat(recalled, shown) && shown > 0 && recalled <= shown, 'recall', [recalled, shown]) }
  /** CONSISTENCY: on-brand touchpoints as a percentage of all touchpoints. value ⌊onbrand · 100 / touchpoints⌋. */
  static consistency(onbrand: number, touchpoints: number): CrossFormula { return c('branding-consistency', 'consistency(onbrand, touchpoints) = ⌊onbrand · 100 / touchpoints⌋', touchpoints > 0 ? Math.floor((onbrand * 100) / touchpoints) : 0, nat(onbrand, touchpoints) && touchpoints > 0 && onbrand <= touchpoints, 'consistency', [onbrand, touchpoints]) }
  /** EQUITY: the premium price as a percentage of the baseline. value ⌊premium · 100 / baseline⌋. */
  static equity(premium: number, baseline: number): CrossFormula { return c('branding-equity', 'equity(premium, baseline) = ⌊premium · 100 / baseline⌋', baseline > 0 ? Math.floor((premium * 100) / baseline) : 0, nat(premium, baseline) && baseline > 0, 'equity', [premium, baseline]) }
  /** LOYALTY: repeat buyers as a percentage of customers. value ⌊repeat · 100 / customers⌋. */
  static loyalty(repeat: number, customers: number): CrossFormula { return c('branding-loyalty', 'loyalty(repeat, customers) = ⌊repeat · 100 / customers⌋', customers > 0 ? Math.floor((repeat * 100) / customers) : 0, nat(repeat, customers) && customers > 0 && repeat <= customers, 'loyalty', [repeat, customers]) }
  /** SENTIMENT: positive mentions net of negative. value positive − negative (may be negative). */
  static sentiment(positive: number, negative: number): CrossFormula { return c('branding-sentiment', 'sentiment(positive, negative) = positive − negative', positive - negative, nat(positive, negative), 'sentiment', [positive, negative]) }
  /** REACH: those exposed as a percentage of the target. value ⌊exposed · 100 / target⌋. */
  static reach(exposed: number, target: number): CrossFormula { return c('branding-reach', 'reach(exposed, target) = ⌊exposed · 100 / target⌋', target > 0 ? Math.floor((exposed * 100) / target) : 0, nat(exposed, target) && target > 0, 'reach', [exposed, target]) }
  /** NPS: promoters net of detractors. value promoters − detractors (may be negative). */
  static nps(promoters: number, detractors: number): CrossFormula { return c('branding-nps', 'nps(promoters, detractors) = promoters − detractors', promoters - detractors, nat(promoters, detractors), 'nps', [promoters, detractors]) }
}

for (const name of ['awareness', 'consistency', 'equity', 'loyalty', 'nps', 'reach', 'recall', 'sentiment'] as const)
  hexRegisterOf('branding', name, (BrandingFormulas[name] as (...x: unknown[]) => unknown).bind(BrandingFormulas))
