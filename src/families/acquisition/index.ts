import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACQUISITION — GROWTH AS ARITHMETIC (chosen by the registry, not by hand). Getting customers is numbers: what each one
 *  costs to win, the lifetime value over that cost, the months to pay the cost back, the lead-to-customer rate, a channel's
 *  share, the organic share, the signups a day, and the return on spend. Crosses to `analytics` — acquisition is what the
 *  numbers measure. A measure. */

const PROOF = 'acquisition arithmetic (CAC, LTV ratio, payback, conversion, channel share, organic share, velocity, ROI); a growth domain; a measure crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'acquisition', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `acquisition.${name}`, params })

export class AcquisitionFormulas {
  /** CAC: acquisition spend over the customers won. value ⌊spend / customers⌋. */
  static cac(spend: number, customers: number): CrossFormula { return c('acquisition-cac', 'cac(spend, customers) = ⌊spend / customers⌋', customers > 0 ? Math.floor(spend / customers) : 0, nat(spend, customers) && customers > 0, 'cac', [spend, customers]) }
  /** LTV RATIO: lifetime value over acquisition cost, as a percentage. value ⌊ltv · 100 / cac⌋. */
  static ltvratio(ltv: number, cac_: number): CrossFormula { return c('acquisition-ltvratio', 'ltvratio(ltv, cac) = ⌊ltv · 100 / cac⌋', cac_ > 0 ? Math.floor((ltv * 100) / cac_) : 0, nat(ltv, cac_) && cac_ > 0, 'ltvratio', [ltv, cac_]) }
  /** PAYBACK: months to recover the acquisition cost at a monthly contribution. value ⌊cac / monthly⌋. */
  static payback(cac_: number, monthly: number): CrossFormula { return c('acquisition-payback', 'payback(cac, monthly) = ⌊cac / monthly⌋', monthly > 0 ? Math.floor(cac_ / monthly) : 0, nat(cac_, monthly) && monthly > 0, 'payback', [cac_, monthly]) }
  /** CONVERSION: leads that became customers, as a percentage. value ⌊customers · 100 / leads⌋. */
  static conversion(customers: number, leads: number): CrossFormula { return c('acquisition-conversion', 'conversion(customers, leads) = ⌊customers · 100 / leads⌋', leads > 0 ? Math.floor((customers * 100) / leads) : 0, nat(customers, leads) && leads > 0 && customers <= leads, 'conversion', [customers, leads]) }
  /** CHANNEL SHARE: a channel's acquired of the total, as a percentage. value ⌊acquired · 100 / total⌋. */
  static channel(acquired: number, total: number): CrossFormula { return c('acquisition-channel', 'channel(acquired, total) = ⌊acquired · 100 / total⌋', total > 0 ? Math.floor((acquired * 100) / total) : 0, nat(acquired, total) && total > 0 && acquired <= total, 'channel', [acquired, total]) }
  /** ORGANIC SHARE: organic of the total acquired, as a percentage. value ⌊organic · 100 / total⌋. */
  static organic(organic_: number, total: number): CrossFormula { return c('acquisition-organic', 'organic(organic, total) = ⌊organic · 100 / total⌋', total > 0 ? Math.floor((organic_ * 100) / total) : 0, nat(organic_, total) && total > 0 && organic_ <= total, 'organic', [organic_, total]) }
  /** VELOCITY: signups over the days. value ⌊signups / days⌋. */
  static velocity(signups: number, days: number): CrossFormula { return c('acquisition-velocity', 'velocity(signups, days) = ⌊signups / days⌋', days > 0 ? Math.floor(signups / days) : 0, nat(signups, days) && days > 0, 'velocity', [signups, days]) }
  /** ROI: revenue over acquisition spend, as a percentage. value ⌊revenue · 100 / spend⌋. */
  static roi(revenue: number, spend: number): CrossFormula { return c('acquisition-roi', 'roi(revenue, spend) = ⌊revenue · 100 / spend⌋', spend > 0 ? Math.floor((revenue * 100) / spend) : 0, nat(revenue, spend) && spend > 0, 'roi', [revenue, spend]) }
}

for (const name of ['cac', 'channel', 'conversion', 'ltvratio', 'organic', 'payback', 'roi', 'velocity'] as const)
  hexRegisterOf('acquisition', name, (AcquisitionFormulas[name] as (...x: unknown[]) => unknown).bind(AcquisitionFormulas))
