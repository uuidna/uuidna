import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INCIDENCE — NEW OCCURRENCE OF DISEASE, AS ARITHMETIC (a measure of how fast a condition appears in a population). Counting
 *  new cases is numbers: the rate per 100k, the cumulative incidence per 1000 at risk, the density per person-time, the relative
 *  risk between exposed and unexposed, the attributable-risk fraction, the odds ratio, the absolute risk difference, and the
 *  standardized ratio of observed to expected. Crosses to `epidemiology` — incidence is what epidemiology studies. A measure. */

const PROOF = 'incidence arithmetic (incidence rate, cumulative incidence, person-time density, relative risk, attributable-risk fraction, odds ratio, risk difference, standardized ratio); new-case occurrence as a measure crossed to epidemiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'incidence', dst: 'epidemiology', formula, value, proof: PROOF, ...extra }, holds, { name: `incidence.${name}`, params })

export class IncidenceFormulas {
  /** INCIDENCE RATE: new cases per 100,000 of the population. value ⌊cases · 100000 / population⌋. */
  static rate(cases: number, population: number): CrossFormula { return c('incidence-rate', 'rate(cases, population) = ⌊cases · 100000 / population⌋', population > 0 ? Math.floor((cases * 100000) / population) : 0, nat(cases, population) && population > 0, 'rate', [cases, population]) }
  /** CUMULATIVE INCIDENCE: new cases per 1,000 of those at risk. value ⌊cases · 1000 / atRisk⌋. */
  static cumulative(cases: number, atRisk: number): CrossFormula { return c('incidence-cumulative', 'cumulative(cases, atRisk) = ⌊cases · 1000 / atRisk⌋', atRisk > 0 ? Math.floor((cases * 1000) / atRisk) : 0, nat(cases, atRisk) && atRisk > 0 && cases <= atRisk, 'cumulative', [cases, atRisk]) }
  /** PERSON-TIME DENSITY: new cases per 10,000 person-time units. value ⌊cases · 10000 / time⌋. */
  static persontime(cases: number, time: number): CrossFormula { return c('incidence-persontime', 'persontime(cases, time) = ⌊cases · 10000 / time⌋', time > 0 ? Math.floor((cases * 10000) / time) : 0, nat(cases, time) && time > 0, 'persontime', [cases, time]) }
  /** RELATIVE RISK: exposed risk over unexposed risk, as a percent. value ⌊exposed · 100 / unexposed⌋. */
  static relativerisk(exposed: number, unexposed: number): CrossFormula { return c('incidence-relativerisk', 'relativerisk(exposed, unexposed) = ⌊exposed · 100 / unexposed⌋', unexposed > 0 ? Math.floor((exposed * 100) / unexposed) : 0, nat(exposed, unexposed) && unexposed > 0, 'relativerisk', [exposed, unexposed]) }
  /** ATTRIBUTABLE-RISK FRACTION: the excess in the exposed, as a percent of the exposed risk. value ⌊max(0, exposed − unexposed) · 100 / exposed⌋. */
  static attributablerisk(exposed: number, unexposed: number): CrossFormula { return c('incidence-attributablerisk', 'attributablerisk(exposed, unexposed) = ⌊max(0, exposed − unexposed) · 100 / exposed⌋', exposed > 0 ? Math.floor((Math.max(0, exposed - unexposed) * 100) / exposed) : 0, nat(exposed, unexposed) && exposed > 0, 'attributablerisk', [exposed, unexposed]) }
  /** ODDS RATIO: the cross-product ad over bc, as a percent. value ⌊ad · 100 / bc⌋. */
  static oddsratio(ad: number, bc: number): CrossFormula { return c('incidence-oddsratio', 'oddsratio(ad, bc) = ⌊ad · 100 / bc⌋', bc > 0 ? Math.floor((ad * 100) / bc) : 0, nat(ad, bc) && bc > 0, 'oddsratio', [ad, bc]) }
  /** RISK DIFFERENCE: the absolute excess of exposed over unexposed. value max(0, exposed − unexposed). */
  static riskdifference(exposed: number, unexposed: number): CrossFormula { return c('incidence-riskdifference', 'riskdifference(exposed, unexposed) = max(0, exposed − unexposed)', Math.max(0, exposed - unexposed), nat(exposed, unexposed), 'riskdifference', [exposed, unexposed]) }
  /** STANDARDIZED RATIO: observed over expected cases, as a percent (SMR). value ⌊observed · 100 / expected⌋. */
  static standardized(observed: number, expected: number): CrossFormula { return c('incidence-standardized', 'standardized(observed, expected) = ⌊observed · 100 / expected⌋', expected > 0 ? Math.floor((observed * 100) / expected) : 0, nat(observed, expected) && expected > 0, 'standardized', [observed, expected]) }
}

for (const name of ['attributablerisk', 'cumulative', 'oddsratio', 'persontime', 'rate', 'relativerisk', 'riskdifference', 'standardized'] as const)
  hexRegisterOf('incidence', name, (IncidenceFormulas[name] as (...x: unknown[]) => unknown).bind(IncidenceFormulas))
