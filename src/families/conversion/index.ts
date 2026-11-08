import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONVERSION — THE FUNNEL AS ARITHMETIC (chosen by the growth registry, not by hand). Turning traffic into customers is
 *  numbers: the rate visitors convert, how far a funnel carries them, cost per acquisition, return on ad spend, how many
 *  bounce, the carts abandoned, checkouts completed, and the uplift a variant wins. Crosses to `marketing` — conversion is
 *  what marketing is spent to buy. A measure. */

const PROOF = 'conversion arithmetic (rate, funnel, cost per acquisition, return on ad spend, bounce, cart abandonment, checkout, uplift); the funnel from traffic to customer; a measure crossed to marketing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'conversion', dst: 'marketing', formula, value, proof: PROOF, ...extra }, holds, { name: `conversion.${name}`, params })

export class ConversionFormulas {
  /** CONVERSION RATE: the percentage of visitors who convert. value ⌊conversions · 100 / visitors⌋. */
  static rate(conversions: number, visitors: number): CrossFormula { return c('conversion-rate', 'rate(conversions, visitors) = ⌊conversions · 100 / visitors⌋', visitors > 0 ? Math.floor((conversions * 100) / visitors) : 0, nat(conversions, visitors) && visitors > 0 && conversions <= visitors, 'rate', [conversions, visitors]) }
  /** FUNNEL: the percentage reaching the bottom from the top. value ⌊bottom · 100 / top⌋. */
  static funnel(top: number, bottom: number): CrossFormula { return c('conversion-funnel', 'funnel(top, bottom) = ⌊bottom · 100 / top⌋', top > 0 ? Math.floor((bottom * 100) / top) : 0, nat(top, bottom) && top > 0 && bottom <= top, 'funnel', [top, bottom]) }
  /** COST PER ACQUISITION: spend over the conversions it bought. value ⌊spend / conversions⌋. */
  static cpa(spend: number, conversions: number): CrossFormula { return c('conversion-cpa', 'cpa(spend, conversions) = ⌊spend / conversions⌋', conversions > 0 ? Math.floor(spend / conversions) : 0, nat(spend, conversions) && conversions > 0, 'cpa', [spend, conversions]) }
  /** RETURN ON AD SPEND: revenue over spend, as a percentage. value ⌊revenue · 100 / spend⌋. */
  static roas(revenue: number, spend: number): CrossFormula { return c('conversion-roas', 'roas(revenue, spend) = ⌊revenue · 100 / spend⌋', spend > 0 ? Math.floor((revenue * 100) / spend) : 0, nat(revenue, spend) && spend > 0, 'roas', [revenue, spend]) }
  /** BOUNCE RATE: the percentage of sessions that bounce. value ⌊bounced · 100 / sessions⌋. */
  static bounce(bounced: number, sessions: number): CrossFormula { return c('conversion-bounce', 'bounce(bounced, sessions) = ⌊bounced · 100 / sessions⌋', sessions > 0 ? Math.floor((bounced * 100) / sessions) : 0, nat(bounced, sessions) && sessions > 0 && bounced <= sessions, 'bounce', [bounced, sessions]) }
  /** CART ABANDONMENT: the percentage of started carts left unfinished. value ⌊(started − completed) · 100 / started⌋. */
  static cart(started: number, completed: number): CrossFormula { return c('conversion-cart', 'cart(started, completed) = ⌊(started − completed) · 100 / started⌋', started > 0 ? Math.floor((Math.max(0, started - completed) * 100) / started) : 0, nat(started, completed) && started > 0 && completed <= started, 'cart', [started, completed]) }
  /** CHECKOUT: the percentage of initiated checkouts that purchase. value ⌊purchases · 100 / initiated⌋. */
  static checkout(purchases: number, initiated: number): CrossFormula { return c('conversion-checkout', 'checkout(purchases, initiated) = ⌊purchases · 100 / initiated⌋', initiated > 0 ? Math.floor((purchases * 100) / initiated) : 0, nat(purchases, initiated) && initiated > 0 && purchases <= initiated, 'checkout', [purchases, initiated]) }
  /** UPLIFT: the variant's gain over control, as a percentage. value ⌊(variant − control) · 100 / control⌋. */
  static uplift(variant: number, control: number): CrossFormula { return c('conversion-uplift', 'uplift(variant, control) = ⌊max(0, variant − control) · 100 / control⌋', control > 0 ? Math.floor((Math.max(0, variant - control) * 100) / control) : 0, nat(variant, control) && control > 0, 'uplift', [variant, control]) }
}

for (const name of ['bounce', 'cart', 'checkout', 'cpa', 'funnel', 'rate', 'roas', 'uplift'] as const)
  hexRegisterOf('conversion', name, (ConversionFormulas[name] as (...x: unknown[]) => unknown).bind(ConversionFormulas))
