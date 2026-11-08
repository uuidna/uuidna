import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PREVALENCE — HOW WIDESPREAD A CONDITION IS, AS ARITHMETIC (an epidemiology domain, drawn the way the registry draws a
 *  measure). Counting who has a condition is numbers: cases per 100,000 at an instant, over a period, over a lifetime, the
 *  caseload a rate implies, the burden in years, a standardised rate, a prevalence ratio, and the width of an interval.
 *  Crosses to `statistics` — prevalence is a statistic of a population. A measure. */

const PROOF = 'prevalence arithmetic (point, period and lifetime prevalence, caseload, burden, standardised rate, ratio, interval width); an epidemiology measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'prevalence', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `prevalence.${name}`, params })

export class PrevalenceFormulas {
  /** STANDARDISED RATE: observed cases scaled to a standard by the expected count. value ⌊observed · standard / expected⌋. */
  static adjustedrate(observed: number, expected: number, standard: number): CrossFormula { return c('prevalence-adjustedrate', 'adjustedrate(observed, expected, standard) = ⌊observed · standard / expected⌋', expected > 0 ? Math.floor((observed * standard) / expected) : 0, nat(observed, expected, standard) && expected > 0, 'adjustedrate', [observed, expected, standard]) }
  /** BURDEN: cases each carrying a number of years lost. value cases · years. */
  static burden(cases: number, years: number): CrossFormula { return c('prevalence-burden', 'burden(cases, years) = cases · years', cases * years, nat(cases, years), 'burden', [cases, years]) }
  /** CASELOAD: the cases a per-100,000 rate implies in a population. value ⌊rate · population / 100000⌋. */
  static caseload(rate: number, population: number): CrossFormula { return c('prevalence-caseload', 'caseload(rate, population) = ⌊rate · population / 100000⌋', Math.floor((rate * population) / 100000), nat(rate, population), 'caseload', [rate, population]) }
  /** CONFIDENCE WIDTH: the span of an interval, its upper bound less its lower. value max(0, upper − lower). */
  static confidencewidth(upper: number, lower: number): CrossFormula { return c('prevalence-confidencewidth', 'confidencewidth(upper, lower) = max(0, upper − lower)', Math.max(0, upper - lower), nat(upper, lower) && upper >= lower, 'confidencewidth', [upper, lower]) }
  /** LIFETIME PREVALENCE: who has ever had the condition, as a percentage. value ⌊ever · 100 / population⌋. */
  static lifetimeprevalence(ever: number, population: number): CrossFormula { return c('prevalence-lifetimeprevalence', 'lifetimeprevalence(ever, population) = ⌊ever · 100 / population⌋', population > 0 ? Math.floor((ever * 100) / population) : 0, nat(ever, population) && population > 0 && ever <= population, 'lifetimeprevalence', [ever, population]) }
  /** PERIOD PREVALENCE: existing plus new cases over a period, per 100,000. value ⌊(existing + incident) · 100000 / population⌋. */
  static periodprevalence(existing: number, incident: number, population: number): CrossFormula { return c('prevalence-periodprevalence', 'periodprevalence(existing, incident, population) = ⌊(existing + incident) · 100000 / population⌋', population > 0 ? Math.floor(((existing + incident) * 100000) / population) : 0, nat(existing, incident, population) && population > 0, 'periodprevalence', [existing, incident, population]) }
  /** POINT PREVALENCE: cases at an instant, per 100,000. value ⌊cases · 100000 / population⌋. */
  static pointprevalence(cases: number, population: number): CrossFormula { return c('prevalence-pointprevalence', 'pointprevalence(cases, population) = ⌊cases · 100000 / population⌋', population > 0 ? Math.floor((cases * 100000) / population) : 0, nat(cases, population) && population > 0 && cases <= population, 'pointprevalence', [cases, population]) }
  /** PREVALENCE RATIO: exposed prevalence against unexposed, ×100. value ⌊exposed · 100 / unexposed⌋. */
  static ratio(exposed: number, unexposed: number): CrossFormula { return c('prevalence-ratio', 'ratio(exposed, unexposed) = ⌊exposed · 100 / unexposed⌋', unexposed > 0 ? Math.floor((exposed * 100) / unexposed) : 0, nat(exposed, unexposed) && unexposed > 0, 'ratio', [exposed, unexposed]) }
}

for (const name of ['adjustedrate', 'burden', 'caseload', 'confidencewidth', 'lifetimeprevalence', 'periodprevalence', 'pointprevalence', 'ratio'] as const)
  hexRegisterOf('prevalence', name, (PrevalenceFormulas[name] as (...x: unknown[]) => unknown).bind(PrevalenceFormulas))
