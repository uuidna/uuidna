import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOYALTY — A RETAIL LOYALTY PROGRAM, AS ARITHMETIC. A member's standing is numbers: points earned on spend, the tier those
 *  points buy, points redeemed back into value, the share of members retained, repeat purchases per member, lifetime value,
 *  the churn share, and whether a reward threshold is met. Crosses to `retail` — loyalty is what a store runs on its buyers.
 *  A measure. */

const PROOF = 'loyalty arithmetic (points earned, tier, redemption, retention, repeat rate, lifetime value, churn, reward threshold); a measure crossed to retail'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'loyalty', dst: 'retail', formula, value, proof: PROOF, ...extra }, holds, { name: `loyalty.${name}`, params })

export class LoyaltyFormulas {
  /** POINTS EARNED: spend at a points-per-unit rate. value spend · rate. */
  static points(spend: number, rate: number): CrossFormula { return c('loyalty-points', 'points(spend, rate) = spend · rate', spend * rate, nat(spend, rate), 'points', [spend, rate]) }
  /** TIER: the whole tiers points buy at a per-tier threshold. value ⌊points / perTier⌋. */
  static tier(points: number, perTier: number): CrossFormula { return c('loyalty-tier', 'tier(points, perTier) = ⌊points / perTier⌋', perTier > 0 ? Math.floor(points / perTier) : 0, nat(points, perTier) && perTier > 0, 'tier', [points, perTier]) }
  /** REDEMPTION: units of value points redeem into at a points-per-unit cost. value ⌊points / perUnit⌋. */
  static redemption(points: number, perUnit: number): CrossFormula { return c('loyalty-redemption', 'redemption(points, perUnit) = ⌊points / perUnit⌋', perUnit > 0 ? Math.floor(points / perUnit) : 0, nat(points, perUnit) && perUnit > 0, 'redemption', [points, perUnit]) }
  /** RETENTION as a percentage. value ⌊retained · 100 / total⌋. */
  static retention(retained: number, total: number): CrossFormula { return c('loyalty-retention', 'retention(retained, total) = ⌊retained · 100 / total⌋', total > 0 ? Math.floor((retained * 100) / total) : 0, nat(retained, total) && total > 0 && retained <= total, 'retention', [retained, total]) }
  /** REPEAT RATE: purchases over members. value ⌊purchases / members⌋. */
  static repeat(purchases: number, members: number): CrossFormula { return c('loyalty-repeat', 'repeat(purchases, members) = ⌊purchases / members⌋', members > 0 ? Math.floor(purchases / members) : 0, nat(purchases, members) && members > 0, 'repeat', [purchases, members]) }
  /** LIFETIME VALUE: average order over a member's orders. value avgOrder · orders. */
  static lifetime(avgOrder: number, orders: number): CrossFormula { return c('loyalty-lifetime', 'lifetime(avgOrder, orders) = avgOrder · orders', avgOrder * orders, nat(avgOrder, orders), 'lifetime', [avgOrder, orders]) }
  /** CHURN as a percentage. value ⌊lost · 100 / total⌋. */
  static churn(lost: number, total: number): CrossFormula { return c('loyalty-churn', 'churn(lost, total) = ⌊lost · 100 / total⌋', total > 0 ? Math.floor((lost * 100) / total) : 0, nat(lost, total) && total > 0 && lost <= total, 'churn', [lost, total]) }
  /** THE REWARD: 1 when points meet the threshold. value [points ≥ threshold]. */
  static reward(points: number, threshold: number): CrossFormula { return c('loyalty-reward', 'reward(points, threshold) = [points ≥ threshold]', points >= threshold ? 1 : 0, nat(points, threshold), 'reward', [points, threshold]) }
}

for (const name of ['churn', 'lifetime', 'points', 'redemption', 'repeat', 'retention', 'reward', 'tier'] as const)
  hexRegisterOf('loyalty', name, (LoyaltyFormulas[name] as (...x: unknown[]) => unknown).bind(LoyaltyFormulas))
