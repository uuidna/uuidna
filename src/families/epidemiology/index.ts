import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EPIDEMIOLOGY — DISEASE SPREAD AS ARITHMETIC (chosen by the registry, not by hand). An outbreak is numbers: the basic
 *  reproduction number, incidence per 100k, prevalence, the attack rate, case fatality, the herd-immunity threshold,
 *  doubling of cases, and vaccine efficacy. Crosses to `med` — epidemiology is what medicine measures. A measure. */

const PROOF = 'epidemiology arithmetic (R0, incidence, prevalence, attack rate, case fatality, herd immunity, doubling, vaccine efficacy); a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'epidemiology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `epidemiology.${name}`, params })

export class EpidemiologyFormulas {
  /** R0: contacts times transmissibility (a percent). value ⌊contacts · transmissibility / 100⌋. */
  static r0(contacts: number, transmissibility: number): CrossFormula { return c('epidemiology-r0', 'r0(contacts, transmissibility) = ⌊contacts · transmissibility / 100⌋', Math.floor((contacts * transmissibility) / 100), nat(contacts, transmissibility), 'r0', [contacts, transmissibility]) }
  /** INCIDENCE: new cases per 100k of the population. value ⌊cases · 100000 / population⌋. */
  static incidence(cases: number, population: number): CrossFormula { return c('epidemiology-incidence', 'incidence(cases, population) = ⌊cases · 100000 / population⌋', population > 0 ? Math.floor((cases * 100000) / population) : 0, nat(cases, population) && population > 0, 'incidence', [cases, population]) }
  /** PREVALENCE: existing cases as a percentage of the population. value ⌊existing · 100 / population⌋. */
  static prevalence(existing: number, population: number): CrossFormula { return c('epidemiology-prevalence', 'prevalence(existing, population) = ⌊existing · 100 / population⌋', population > 0 ? Math.floor((existing * 100) / population) : 0, nat(existing, population) && population > 0 && existing <= population, 'prevalence', [existing, population]) }
  /** ATTACK RATE: the ill as a percentage of the exposed. value ⌊ill · 100 / exposed⌋. */
  static attack(ill: number, exposed: number): CrossFormula { return c('epidemiology-attack', 'attack(ill, exposed) = ⌊ill · 100 / exposed⌋', exposed > 0 ? Math.floor((ill * 100) / exposed) : 0, nat(ill, exposed) && exposed > 0 && ill <= exposed, 'attack', [ill, exposed]) }
  /** CASE FATALITY: deaths as a percentage of cases. value ⌊deaths · 100 / cases⌋. */
  static fatality(deaths: number, cases: number): CrossFormula { return c('epidemiology-fatality', 'fatality(deaths, cases) = ⌊deaths · 100 / cases⌋', cases > 0 ? Math.floor((deaths * 100) / cases) : 0, nat(deaths, cases) && cases > 0 && deaths <= cases, 'fatality', [deaths, cases]) }
  /** HERD IMMUNITY: the threshold percentage from R0. value R0 > 0 ? ⌊(R0 − 1) · 100 / R0⌋ : 0. */
  static herd(r0: number): CrossFormula { return c('epidemiology-herd', 'herd(r0) = ⌊(r0 − 1) · 100 / r0⌋', r0 > 0 ? Math.floor(((r0 - 1) * 100) / r0) : 0, nat(r0) && r0 > 0, 'herd', [r0]) }
  /** DOUBLING: the growth in cases over the previous count. value max(0, cases − previous). */
  static doubling(cases: number, previous: number): CrossFormula { return c('epidemiology-doubling', 'doubling(cases, previous) = max(0, cases − previous)', Math.max(0, cases - previous), nat(cases, previous), 'doubling', [cases, previous]) }
  /** VACCINE EFFICACY: the protected as a percentage of the vaccinated. value ⌊protected · 100 / vaccinated⌋. */
  static vaccine(protectedCount: number, vaccinated: number): CrossFormula { return c('epidemiology-vaccine', 'vaccine(protected, vaccinated) = ⌊protected · 100 / vaccinated⌋', vaccinated > 0 ? Math.floor((protectedCount * 100) / vaccinated) : 0, nat(protectedCount, vaccinated) && vaccinated > 0 && protectedCount <= vaccinated, 'vaccine', [protectedCount, vaccinated]) }
}

for (const name of ['attack', 'doubling', 'fatality', 'herd', 'incidence', 'prevalence', 'r0', 'vaccine'] as const)
  hexRegisterOf('epidemiology', name, (EpidemiologyFormulas[name] as (...x: unknown[]) => unknown).bind(EpidemiologyFormulas))
