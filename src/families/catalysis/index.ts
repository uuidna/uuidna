import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CATALYSIS — RUNNING A REACTION IS NUMBERS (chosen by the chemistry registry, not by hand). A catalyst's work is counted:
 *  turnovers per site, turnovers per second, how selective the product is, how much activation the catalyst removes, how
 *  much reactant converts, the catalyst loading, the rate, and the active sites per area. Crosses to `chemistry` — catalysis
 *  is what chemistry measures. A measure. */

const PROOF = 'catalysis arithmetic (turnover number, turnover frequency, selectivity, activation lowered, conversion, loading, rate, surface sites); a chemistry measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'catalysis', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `catalysis.${name}`, params })

export class CatalysisFormulas {
  /** ACTIVATION LOWERED: the barrier the catalyst removes. value max(0, uncatalyzed − catalyzed). */
  static activation(uncatalyzed: number, catalyzed: number): CrossFormula { return c('catalysis-activation', 'activation(uncatalyzed, catalyzed) = max(0, uncatalyzed − catalyzed)', Math.max(0, uncatalyzed - catalyzed), nat(uncatalyzed, catalyzed), 'activation', [uncatalyzed, catalyzed]) }
  /** CONVERSION: product as a percentage of reactant. value ⌊product · 100 / reactant⌋. */
  static conversion(product: number, reactant: number): CrossFormula { return c('catalysis-conversion', 'conversion(product, reactant) = ⌊product · 100 / reactant⌋', reactant > 0 ? Math.floor((product * 100) / reactant) : 0, nat(product, reactant) && reactant > 0 && product <= reactant, 'conversion', [product, reactant]) }
  /** TURNOVER FREQUENCY: turnovers over time. value ⌊turnover / time⌋. */
  static frequency(turnover_: number, time: number): CrossFormula { return c('catalysis-frequency', 'frequency(turnover_, time) = ⌊turnover_ / time⌋', time > 0 ? Math.floor(turnover_ / time) : 0, nat(turnover_, time) && time > 0, 'frequency', [turnover_, time]) }
  /** LOADING: catalyst as a percentage of substrate. value ⌊catalyst · 100 / substrate⌋. */
  static loading(catalyst: number, substrate: number): CrossFormula { return c('catalysis-loading', 'loading(catalyst, substrate) = ⌊catalyst · 100 / substrate⌋', substrate > 0 ? Math.floor((catalyst * 100) / substrate) : 0, nat(catalyst, substrate) && substrate > 0, 'loading', [catalyst, substrate]) }
  /** RATE: reacted over seconds. value ⌊reacted / seconds⌋. */
  static rate(reacted: number, seconds: number): CrossFormula { return c('catalysis-rate', 'rate(reacted, seconds) = ⌊reacted / seconds⌋', seconds > 0 ? Math.floor(reacted / seconds) : 0, nat(reacted, seconds) && seconds > 0, 'rate', [reacted, seconds]) }
  /** SELECTIVITY: desired as a percentage of total. value ⌊desired · 100 / total⌋. */
  static selectivity(desired: number, total: number): CrossFormula { return c('catalysis-selectivity', 'selectivity(desired, total) = ⌊desired · 100 / total⌋', total > 0 ? Math.floor((desired * 100) / total) : 0, nat(desired, total) && total > 0 && desired <= total, 'selectivity', [desired, total]) }
  /** SURFACE: active sites per area. value ⌊sites / area⌋. */
  static surface(sites: number, area: number): CrossFormula { return c('catalysis-surface', 'surface(sites, area) = ⌊sites / area⌋', area > 0 ? Math.floor(sites / area) : 0, nat(sites, area) && area > 0, 'surface', [sites, area]) }
  /** TURNOVER NUMBER: product over catalyst. value ⌊product / catalyst⌋. */
  static turnover(product: number, catalyst: number): CrossFormula { return c('catalysis-turnover', 'turnover(product, catalyst) = ⌊product / catalyst⌋', catalyst > 0 ? Math.floor(product / catalyst) : 0, nat(product, catalyst) && catalyst > 0, 'turnover', [product, catalyst]) }
}

for (const name of ['activation', 'conversion', 'frequency', 'loading', 'rate', 'selectivity', 'surface', 'turnover'] as const)
  hexRegisterOf('catalysis', name, (CatalysisFormulas[name] as (...x: unknown[]) => unknown).bind(CatalysisFormulas))
