import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DEMOGRAPHICS — POPULATION STATISTICS, AS ARITHMETIC. A population is numbers: births and deaths per thousand, natural
 *  growth, how many per unit of land, who depends on the workers, the median age, net migration, and how long a life runs.
 *  Crosses to `econ` — a population is the economy's measure. A measure. */

const PROOF = 'demographics arithmetic (birth rate, death rate, natural growth, density, dependency, median age, net migration, life expectancy); population statistics as integers; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'demographics', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `demographics.${name}`, params })

export class DemographicsFormulas {
  /** BIRTH RATE: births per thousand of the population. value ⌊births · 1000 / population⌋. */
  static birthrate(births: number, population: number): CrossFormula { return c('demographics-birthrate', 'birthrate(births, population) = ⌊births · 1000 / population⌋', population > 0 ? Math.floor((births * 1000) / population) : 0, nat(births, population) && population > 0, 'birthrate', [births, population]) }
  /** DEATH RATE: deaths per thousand of the population. value ⌊deaths · 1000 / population⌋. */
  static deathrate(deaths: number, population: number): CrossFormula { return c('demographics-deathrate', 'deathrate(deaths, population) = ⌊deaths · 1000 / population⌋', population > 0 ? Math.floor((deaths * 1000) / population) : 0, nat(deaths, population) && population > 0, 'deathrate', [deaths, population]) }
  /** NATURAL GROWTH: births less deaths (may be negative). value births − deaths. */
  static growth(births: number, deaths: number): CrossFormula { return c('demographics-growth', 'growth(births, deaths) = births − deaths', births - deaths, nat(births, deaths), 'growth', [births, deaths]) }
  /** DENSITY: population over the land area. value ⌊population / area⌋. */
  static density(population: number, area: number): CrossFormula { return c('demographics-density', 'density(population, area) = ⌊population / area⌋', area > 0 ? Math.floor(population / area) : 0, nat(population, area) && area > 0, 'density', [population, area]) }
  /** DEPENDENCY RATIO: dependents per hundred of working age. value ⌊dependents · 100 / working⌋. */
  static dependency(dependents: number, working: number): CrossFormula { return c('demographics-dependency', 'dependency(dependents, working) = ⌊dependents · 100 / working⌋', working > 0 ? Math.floor((dependents * 100) / working) : 0, nat(dependents, working) && working > 0, 'dependency', [dependents, working]) }
  /** MEDIAN AGE: the summed ages over the count, as a mean proxy. value ⌊sumAges / count⌋. */
  static median(sumAges: number, count: number): CrossFormula { return c('demographics-median', 'median(sumAges, count) = ⌊sumAges / count⌋', count > 0 ? Math.floor(sumAges / count) : 0, nat(sumAges, count) && count > 0, 'median', [sumAges, count]) }
  /** NET MIGRATION: arrivals less departures (may be negative). value in − out. */
  static migration(into: number, out: number): CrossFormula { return c('demographics-migration', 'migration(in, out) = in − out', into - out, nat(into, out), 'migration', [into, out]) }
  /** LIFE EXPECTANCY: summed years of life over the deaths, as a proxy. value ⌊sumYears / deaths⌋. */
  static life(sumYears: number, deaths: number): CrossFormula { return c('demographics-life', 'life(sumYears, deaths) = ⌊sumYears / deaths⌋', deaths > 0 ? Math.floor(sumYears / deaths) : 0, nat(sumYears, deaths) && deaths > 0, 'life', [sumYears, deaths]) }
}

for (const name of ['birthrate', 'deathrate', 'density', 'dependency', 'growth', 'life', 'median', 'migration'] as const)
  hexRegisterOf('demographics', name, (DemographicsFormulas[name] as (...x: unknown[]) => unknown).bind(DemographicsFormulas))
