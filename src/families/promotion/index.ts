import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROMOTION — RUNNING A SALE, AS ARITHMETIC (chosen by the campaign registry, not by hand). Moving product is numbers:
 *  the discount a price carries, how many coupons came back, the lift a promo bought, the coupon liability on the books,
 *  what a bundle saves, the markdown off the tag, the rep's spiff, and the units that would not have sold. Crosses to
 *  `marketing` — promotion is the spend marketing books. A measure. */

const PROOF = 'promotion arithmetic (discount, redemption, lift, coupon liability, bundle saving, markdown, spiff, incremental units); a campaign measure crossed to marketing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'promotion', dst: 'marketing', formula, value, proof: PROOF, ...extra }, holds, { name: `promotion.${name}`, params })

export class PromotionFormulas {
  /** DISCOUNT: the amount a percent takes off a price. value ⌊price · pct / 100⌋. */
  static discount(price: number, pct: number): CrossFormula { return c('promotion-discount', 'discount(price, pct) = ⌊price · pct / 100⌋', Math.floor((price * pct) / 100), nat(price, pct) && pct <= 100, 'discount', [price, pct]) }
  /** REDEMPTION: the share of issued coupons that came back. value ⌊redeemed · 100 / issued⌋. */
  static redemption(redeemed: number, issued: number): CrossFormula { return c('promotion-redemption', 'redemption(redeemed, issued) = ⌊redeemed · 100 / issued⌋', issued > 0 ? Math.floor((redeemed * 100) / issued) : 0, nat(redeemed, issued) && issued > 0 && redeemed <= issued, 'redemption', [redeemed, issued]) }
  /** LIFT: the percent a promo raised sales over the baseline. value ⌊(after − before) · 100 / before⌋. */
  static lift(after: number, before: number): CrossFormula { return c('promotion-lift', 'lift(after, before) = ⌊max(0, after − before) · 100 / before⌋', before > 0 ? Math.floor((Math.max(0, after - before) * 100) / before) : 0, nat(after, before) && before > 0, 'lift', [after, before]) }
  /** COUPON LIABILITY: face value times the count outstanding. value faceValue · count. */
  static coupon(faceValue: number, count: number): CrossFormula { return c('promotion-coupon', 'coupon(faceValue, count) = faceValue · count', faceValue * count, nat(faceValue, count), 'coupon', [faceValue, count]) }
  /** BUNDLE SAVING: what the bundle price saves against buying apart. value max(0, itemsPrice − bundlePrice). */
  static bundle(itemsPrice: number, bundlePrice: number): CrossFormula { return c('promotion-bundle', 'bundle(itemsPrice, bundlePrice) = max(0, itemsPrice − bundlePrice)', Math.max(0, itemsPrice - bundlePrice), nat(itemsPrice, bundlePrice), 'bundle', [itemsPrice, bundlePrice]) }
  /** MARKDOWN: the percent off the original tag. value ⌊(original − sale) · 100 / original⌋. */
  static markdown(original: number, sale: number): CrossFormula { return c('promotion-markdown', 'markdown(original, sale) = ⌊(original − sale) · 100 / original⌋', original > 0 ? Math.floor((Math.max(0, original - sale) * 100) / original) : 0, nat(original, sale) && original > 0, 'markdown', [original, sale]) }
  /** SPIFF: the rep incentive, units times the per-unit bonus. value units · perUnit. */
  static spiff(units: number, perUnit: number): CrossFormula { return c('promotion-spiff', 'spiff(units, perUnit) = units · perUnit', units * perUnit, nat(units, perUnit), 'spiff', [units, perUnit]) }
  /** INCREMENTAL: the units the promo sold over the baseline. value max(0, promo − baseline). */
  static incremental(promo: number, baseline: number): CrossFormula { return c('promotion-incremental', 'incremental(promo, baseline) = max(0, promo − baseline)', Math.max(0, promo - baseline), nat(promo, baseline), 'incremental', [promo, baseline]) }
}

for (const name of ['bundle', 'coupon', 'discount', 'incremental', 'lift', 'markdown', 'redemption', 'spiff'] as const)
  hexRegisterOf('promotion', name, (PromotionFormulas[name] as (...x: unknown[]) => unknown).bind(PromotionFormulas))
