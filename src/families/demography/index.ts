import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEMOGRAPHY — A POPULATION AS ARITHMETIC. The study of a people is numbers: how many are born and die per thousand,
 *  whether the population grows on its own, how many depend on each worker, how old the middle person is, how long a life
 *  runs, how many men stand per hundred women, and how long until the count doubles. Crosses to `sociology` — demography
 *  is the measure a society is read through. A measure. */

const PROOF = 'demography arithmetic (birth rate, death rate, natural increase, dependency ratio, median age, life expectancy, sex ratio, doubling time); a people as a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'demography', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `demography.${name}`, params })

export class DemographyFormulas {
  /** BIRTH RATE: births per thousand people. value ⌊births · 1000 / pop⌋. */
  static birthrate(births: number, pop: number): CrossFormula { return c('demography-birthrate', 'birthrate(births, pop) = ⌊births · 1000 / pop⌋', pop > 0 ? Math.floor((births * 1000) / pop) : 0, nat(births, pop) && pop > 0, 'birthrate', [births, pop]) }
  /** DEATH RATE: deaths per thousand people. value ⌊deaths · 1000 / pop⌋. */
  static deathrate(deaths: number, pop: number): CrossFormula { return c('demography-deathrate', 'deathrate(deaths, pop) = ⌊deaths · 1000 / pop⌋', pop > 0 ? Math.floor((deaths * 1000) / pop) : 0, nat(deaths, pop) && pop > 0, 'deathrate', [deaths, pop]) }
  /** DEPENDENCY RATIO: dependents per hundred workers. value ⌊dependents · 100 / workers⌋. */
  static dependencyratio(dependents: number, workers: number): CrossFormula { return c('demography-dependencyratio', 'dependencyratio(dependents, workers) = ⌊dependents · 100 / workers⌋', workers > 0 ? Math.floor((dependents * 100) / workers) : 0, nat(dependents, workers) && workers > 0, 'dependencyratio', [dependents, workers]) }
  /** DOUBLING TIME: the rule of 70 — years for a population to double at a growth rate. value ⌊70 / rate⌋. */
  static doublingtime(rate: number): CrossFormula { return c('demography-doublingtime', 'doublingtime(rate) = ⌊70 / rate⌋', rate > 0 ? Math.floor(70 / rate) : 0, nat(rate) && rate > 0, 'doublingtime', [rate]) }
  /** LIFE EXPECTANCY: person-years lived over the deaths that closed them. value ⌊years / deaths⌋. */
  static lifeexpectancy(years: number, deaths: number): CrossFormula { return c('demography-lifeexpectancy', 'lifeexpectancy(years, deaths) = ⌊years / deaths⌋', deaths > 0 ? Math.floor(years / deaths) : 0, nat(years, deaths) && deaths > 0, 'lifeexpectancy', [years, deaths]) }
  /** MEDIAN AGE: total age-years over the count — the middle age. value ⌊years / count⌋. */
  static medianage(years: number, count: number): CrossFormula { return c('demography-medianage', 'medianage(years, count) = ⌊years / count⌋', count > 0 ? Math.floor(years / count) : 0, nat(years, count) && count > 0, 'medianage', [years, count]) }
  /** NATURAL INCREASE: births over deaths, never below zero. value max(0, births − deaths). */
  static naturalincrease(births: number, deaths: number): CrossFormula { return c('demography-naturalincrease', 'naturalincrease(births, deaths) = max(0, births − deaths)', Math.max(0, births - deaths), nat(births, deaths), 'naturalincrease', [births, deaths]) }
  /** SEX RATIO: men per hundred women. value ⌊males · 100 / females⌋. */
  static sexratio(males: number, females: number): CrossFormula { return c('demography-sexratio', 'sexratio(males, females) = ⌊males · 100 / females⌋', females > 0 ? Math.floor((males * 100) / females) : 0, nat(males, females) && females > 0, 'sexratio', [males, females]) }
}

for (const name of ['birthrate', 'deathrate', 'dependencyratio', 'doublingtime', 'lifeexpectancy', 'medianage', 'naturalincrease', 'sexratio'] as const)
  hexRegisterOf('demography', name, (DemographyFormulas[name] as (...x: unknown[]) => unknown).bind(DemographyFormulas))
