import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CENSUS — COUNTING A POPULATION, AS ARITHMETIC (chosen by the public-data registry, not by hand). A census is numbers:
 *  people per unit of land, how fast a count grows, the middle age, who depends on whom, who works, who answered, who was
 *  missed, and the seats a count earns. Crosses to `sociology` — census is the measure sociology reasons over. A measure. */

const PROOF = 'census arithmetic (density, growth, median age, dependency, participation, response, undercount, apportionment); a population counted; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'census', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `census.${name}`, params })

export class CensusFormulas {
  /** DENSITY: people over the land they occupy. value ⌊people / area⌋. */
  static density(people: number, area: number): CrossFormula { return c('census-density', 'density(people, area) = ⌊people / area⌋', area > 0 ? Math.floor(people / area) : 0, nat(people, area) && area > 0, 'density', [people, area]) }
  /** GROWTH: percentage increase of a count over its previous count. value ⌊max(0, current − previous) · 100 / previous⌋. */
  static growth(current: number, previous: number): CrossFormula { return c('census-growth', 'growth(current, previous) = ⌊max(0, current − previous) · 100 / previous⌋', previous > 0 ? Math.floor((Math.max(0, current - previous) * 100) / previous) : 0, nat(current, previous) && previous > 0, 'growth', [current, previous]) }
  /** MEDIAN AGE: the summed ages over the people counted. value ⌊sumAges / people⌋. */
  static medianage(sumAges: number, people: number): CrossFormula { return c('census-medianage', 'medianage(sumAges, people) = ⌊sumAges / people⌋', people > 0 ? Math.floor(sumAges / people) : 0, nat(sumAges, people) && people > 0, 'medianage', [sumAges, people]) }
  /** DEPENDENCY RATIO: dependents per hundred workers. value ⌊dependents · 100 / workers⌋. */
  static dependency(dependents: number, workers: number): CrossFormula { return c('census-dependency', 'dependency(dependents, workers) = ⌊dependents · 100 / workers⌋', workers > 0 ? Math.floor((dependents * 100) / workers) : 0, nat(dependents, workers) && workers > 0, 'dependency', [dependents, workers]) }
  /** PARTICIPATION: the labour force as a percentage of the population. value ⌊labor · 100 / population⌋. */
  static participation(labor: number, population: number): CrossFormula { return c('census-participation', 'participation(labor, population) = ⌊labor · 100 / population⌋', population > 0 ? Math.floor((labor * 100) / population) : 0, nat(labor, population) && population > 0 && labor <= population, 'participation', [labor, population]) }
  /** RESPONSE RATE: who answered as a percentage of who was sampled. value ⌊responded · 100 / sampled⌋. */
  static response(responded: number, sampled: number): CrossFormula { return c('census-response', 'response(responded, sampled) = ⌊responded · 100 / sampled⌋', sampled > 0 ? Math.floor((responded * 100) / sampled) : 0, nat(responded, sampled) && sampled > 0 && responded <= sampled, 'response', [responded, sampled]) }
  /** UNDERCOUNT: how many the count missed against the true number. value max(0, actual − counted). */
  static undercount(actual: number, counted: number): CrossFormula { return c('census-undercount', 'undercount(actual, counted) = max(0, actual − counted)', Math.max(0, actual - counted), nat(actual, counted), 'undercount', [actual, counted]) }
  /** APPORTIONMENT: the seats a count earns at a fixed divisor. value ⌊population / divisor⌋. */
  static apportionment(population: number, divisor: number): CrossFormula { return c('census-apportionment', 'apportionment(population, divisor) = ⌊population / divisor⌋', divisor > 0 ? Math.floor(population / divisor) : 0, nat(population, divisor) && divisor > 0, 'apportionment', [population, divisor]) }
}

for (const name of ['apportionment', 'density', 'dependency', 'growth', 'medianage', 'participation', 'response', 'undercount'] as const)
  hexRegisterOf('census', name, (CensusFormulas[name] as (...x: unknown[]) => unknown).bind(CensusFormulas))
