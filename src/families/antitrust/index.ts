import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANTITRUST — COMPETITION AS ARITHMETIC. Market power is numbers: a firm's market share, the Herfindahl index, the
 *  concentration ratio, a dominance threshold, the price-cost markup, cartel overcharge damages, a turnover-based fine,
 *  and the combined share after a merger. Crosses to `law`, where the competition authority and the court decide. A
 *  measure, not advice. */

const PROOF = 'competition arithmetic (market share, Herfindahl index, concentration ratio, dominance threshold, price-cost markup, overcharge damages, turnover fine, post-merger share); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const a = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'antitrust', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `antitrust.${name}`, params })

export class AntitrustFormulas {
  /** MARKET SHARE as a percentage. value ⌊firm · 100 / market⌋. */
  static share(firm: number, market: number): CrossFormula { return a('antitrust-share', 'share(firm, market) = ⌊firm · 100 / market⌋', market > 0 ? Math.floor((firm * 100) / market) : 0, nat(firm, market) && market > 0 && firm <= market, 'share', [firm, market]) }
  /** THE HERFINDAHL INDEX of two firms: the sum of their squared percentage shares. value a² + b². */
  static hhi(shareA: number, shareB: number): CrossFormula { return a('antitrust-hhi', 'hhi(a, b) = a² + b²', shareA * shareA + shareB * shareB, nat(shareA, shareB) && shareA + shareB <= 100, 'hhi', [shareA, shareB]) }
  /** THE CONCENTRATION RATIO as a percentage: the top firms over the whole market. value ⌊top · 100 / total⌋. */
  static concentration(top: number, total: number): CrossFormula { return a('antitrust-concentration', 'concentration(top, total) = ⌊top · 100 / total⌋', total > 0 ? Math.floor((top * 100) / total) : 0, nat(top, total) && total > 0 && top <= total, 'concentration', [top, total]) }
  /** DOMINANCE: 1 when a share reaches the threshold at which dominance is presumed. value [share ≥ threshold]. */
  static dominance(share: number, threshold: number): CrossFormula { return a('antitrust-dominance', 'dominance(share, threshold) = [share ≥ threshold]', share >= threshold ? 1 : 0, nat(share, threshold), 'dominance', [share, threshold]) }
  /** THE PRICE-COST MARKUP as a percentage (may be negative — below-cost is predatory). value ⌊(price − cost) · 100 / price⌋. */
  static margin(price: number, cost: number): CrossFormula { return a('antitrust-margin', 'margin(price, cost) = ⌊(price − cost) · 100 / price⌋', price > 0 ? Math.floor(((price - cost) * 100) / price) : 0, nat(price, cost) && price > 0, 'margin', [price, cost]) }
  /** OVERCHARGE DAMAGES: a cartel overcharge per unit over the affected units. value overcharge · units. */
  static damages(overcharge: number, units: number): CrossFormula { return a('antitrust-damages', 'damages(overcharge, units) = overcharge · units', overcharge * units, nat(overcharge, units), 'damages', [overcharge, units]) }
  /** A COMPETITION FINE: `pct`% of worldwide turnover. value ⌊turnover · pct / 100⌋. */
  static fine(turnover: number, pct: number): CrossFormula { return a('antitrust-fine', 'fine(turnover, pct) = ⌊turnover · pct / 100⌋', Math.floor((turnover * pct) / 100), nat(turnover, pct) && pct <= 100, 'fine', [turnover, pct]) }
  /** THE POST-MERGER SHARE: the two merging firms' shares combined. value a + b. */
  static merger(shareA: number, shareB: number): CrossFormula { return a('antitrust-merger', 'merger(a, b) = a + b', shareA + shareB, nat(shareA, shareB) && shareA + shareB <= 100, 'merger', [shareA, shareB]) }
}

for (const name of ['concentration', 'damages', 'dominance', 'fine', 'hhi', 'margin', 'merger', 'share'] as const)
  hexRegisterOf('antitrust', name, (AntitrustFormulas[name] as (...x: unknown[]) => unknown).bind(AntitrustFormulas))
