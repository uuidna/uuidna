import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VACCINATION — A PUBLIC-HEALTH DOMAIN, AS ARITHMETIC (chosen by the registry, not by hand). Immunising a population is
 *  numbers: coverage reached, the herd-immunity threshold a disease demands, vaccine efficacy, the doses a rollout needs,
 *  antibody titre after boosting, the interval between shots, seroconversion, and a campaign's reach. Crosses to
 *  `immunology` — vaccination is what immunology explains. A measure. */

const PROOF = 'vaccination arithmetic (coverage, herd threshold, efficacy, doses needed, titre, booster interval, seroconversion, campaign reach); a public-health domain; a measure crossed to immunology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'vaccination', dst: 'immunology', formula, value, proof: PROOF, ...extra }, holds, { name: `vaccination.${name}`, params })

export class VaccinationFormulas {
  /** COVERAGE as a percentage of the population vaccinated. value ⌊vaccinated · 100 / population⌋. */
  static coverage(vaccinated: number, population: number): CrossFormula { return c('vaccination-coverage', 'coverage(vaccinated, population) = ⌊vaccinated · 100 / population⌋', population > 0 ? Math.floor((vaccinated * 100) / population) : 0, nat(vaccinated, population) && population > 0 && vaccinated <= population, 'coverage', [vaccinated, population]) }
  /** HERD-IMMUNITY THRESHOLD as a percentage, from the basic reproduction number. value ⌊(r0 − 1) · 100 / r0⌋. */
  static herdthreshold(r0: number): CrossFormula { return c('vaccination-herdthreshold', 'herdthreshold(r0) = ⌊(r0 − 1) · 100 / r0⌋', r0 > 0 ? Math.floor((Math.max(0, r0 - 1) * 100) / r0) : 0, nat(r0) && r0 > 0, 'herdthreshold', [r0]) }
  /** VACCINE EFFICACY as a percentage, from attack rates. value ⌊(control − vaccinated) · 100 / control⌋. */
  static efficacy(control: number, vaccinated: number): CrossFormula { return c('vaccination-efficacy', 'efficacy(control, vaccinated) = ⌊max(0, control − vaccinated) · 100 / control⌋', control > 0 ? Math.floor((Math.max(0, control - vaccinated) * 100) / control) : 0, nat(control, vaccinated) && control > 0, 'efficacy', [control, vaccinated]) }
  /** DOSES NEEDED: people at a number of doses each. value people · dosesper. */
  static dosesneeded(people: number, dosesper: number): CrossFormula { return c('vaccination-dosesneeded', 'dosesneeded(people, dosesper) = people · dosesper', people * dosesper, nat(people, dosesper), 'dosesneeded', [people, dosesper]) }
  /** ANTIBODY TITRE after a number of doublings from an initial level. value initial · 2^doublings. */
  static titer(initial: number, doublings: number): CrossFormula { return c('vaccination-titer', 'titer(initial, doublings) = initial · 2^doublings', initial * Math.pow(2, doublings), nat(initial, doublings), 'titer', [initial, doublings]) }
  /** BOOSTER INTERVAL: a total span split into a number of intervals. value ⌊totalmonths / intervals⌋. */
  static boosterinterval(totalmonths: number, intervals: number): CrossFormula { return c('vaccination-boosterinterval', 'boosterinterval(totalmonths, intervals) = ⌊totalmonths / intervals⌋', intervals > 0 ? Math.floor(totalmonths / intervals) : 0, nat(totalmonths, intervals) && intervals > 0, 'boosterinterval', [totalmonths, intervals]) }
  /** SEROCONVERSION as a percentage of those tested who converted. value ⌊converted · 100 / tested⌋. */
  static seroconversion(converted: number, tested: number): CrossFormula { return c('vaccination-seroconversion', 'seroconversion(converted, tested) = ⌊converted · 100 / tested⌋', tested > 0 ? Math.floor((converted * 100) / tested) : 0, nat(converted, tested) && tested > 0 && converted <= tested, 'seroconversion', [converted, tested]) }
  /** CAMPAIGN REACH: sites, each serving so many per day, over a number of days. value sites · perSite · days. */
  static campaignreach(sites: number, perSite: number, days: number): CrossFormula { return c('vaccination-campaignreach', 'campaignreach(sites, perSite, days) = sites · perSite · days', sites * perSite * days, nat(sites, perSite, days), 'campaignreach', [sites, perSite, days]) }
}

for (const name of ['boosterinterval', 'campaignreach', 'coverage', 'dosesneeded', 'efficacy', 'herdthreshold', 'seroconversion', 'titer'] as const)
  hexRegisterOf('vaccination', name, (VaccinationFormulas[name] as (...x: unknown[]) => unknown).bind(VaccinationFormulas))
