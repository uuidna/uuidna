import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHURN — SUBSCRIPTION ATTRITION, AS ARITHMETIC. Keeping customers is numbers: the rate they leave, the share retained,
 *  the lifetime value a churn rate implies, net revenue after expansion and loss, win-backs, tenure, cohort decay, and the
 *  share at risk. Crosses to `analytics` — churn is what analytics measures. A measure. */

const PROOF = 'churn arithmetic (rate, retention, lifetime value, net revenue, reactivation, tenure, cohort decay, at-risk share); subscription attrition as a measure crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'churn', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `churn.${name}`, params })

export class ChurnFormulas {
  /** CHURN RATE as a percentage. value ⌊lost · 100 / start⌋. */
  static rate(lost: number, start: number): CrossFormula { return c('churn-rate', 'rate(lost, start) = ⌊lost · 100 / start⌋', start > 0 ? Math.floor((lost * 100) / start) : 0, nat(lost, start) && start > 0 && lost <= start, 'rate', [lost, start]) }
  /** RETENTION as a percentage. value ⌊retained · 100 / start⌋. */
  static retention(retained: number, start: number): CrossFormula { return c('churn-retention', 'retention(retained, start) = ⌊retained · 100 / start⌋', start > 0 ? Math.floor((retained * 100) / start) : 0, nat(retained, start) && start > 0 && retained <= start, 'retention', [retained, start]) }
  /** LIFETIME VALUE proxy: revenue over the churn rate. value ⌊revenue · 100 / churnrate⌋. */
  static lifetime(revenue: number, churnrate: number): CrossFormula { return c('churn-lifetime', 'lifetime(revenue, churnrate) = ⌊revenue · 100 / churnrate⌋', churnrate > 0 ? Math.floor((revenue * 100) / churnrate) : 0, nat(revenue, churnrate) && churnrate > 0, 'lifetime', [revenue, churnrate]) }
  /** NET REVENUE: expansion less churned (may be negative). value expansion − churned. */
  static netrevenue(expansion: number, churned: number): CrossFormula { return c('churn-netrevenue', 'netrevenue(expansion, churned) = expansion − churned', expansion - churned, nat(expansion, churned), 'netrevenue', [expansion, churned]) }
  /** REACTIVATION as a percentage of the churned. value ⌊returned · 100 / churned⌋. */
  static reactivation(returned: number, churned: number): CrossFormula { return c('churn-reactivation', 'reactivation(returned, churned) = ⌊returned · 100 / churned⌋', churned > 0 ? Math.floor((returned * 100) / churned) : 0, nat(returned, churned) && churned > 0, 'reactivation', [returned, churned]) }
  /** TENURE: months a customer holds. value months. */
  static tenure(months: number): CrossFormula { return c('churn-tenure', 'tenure(months) = months', months, nat(months), 'tenure', [months]) }
  /** COHORT DECAY: the share of a cohort remaining. value ⌊remaining · 100 / initial⌋. */
  static cohortdecay(remaining: number, initial: number): CrossFormula { return c('churn-cohortdecay', 'cohortdecay(remaining, initial) = ⌊remaining · 100 / initial⌋', initial > 0 ? Math.floor((remaining * 100) / initial) : 0, nat(remaining, initial) && initial > 0 && remaining <= initial, 'cohortdecay', [remaining, initial]) }
  /** AT-RISK SHARE as a percentage of the active. value ⌊atrisk · 100 / active⌋. */
  static risk(atrisk: number, active: number): CrossFormula { return c('churn-risk', 'risk(atrisk, active) = ⌊atrisk · 100 / active⌋', active > 0 ? Math.floor((atrisk * 100) / active) : 0, nat(atrisk, active) && active > 0 && atrisk <= active, 'risk', [atrisk, active]) }
}

for (const name of ['cohortdecay', 'lifetime', 'netrevenue', 'rate', 'reactivation', 'retention', 'risk', 'tenure'] as const)
  hexRegisterOf('churn', name, (ChurnFormulas[name] as (...x: unknown[]) => unknown).bind(ChurnFormulas))
