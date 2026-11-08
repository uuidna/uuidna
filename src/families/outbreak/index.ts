import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OUTBREAK — THE SHAPE OF AN EPIDEMIC, AS ARITHMETIC (an outbreak is the counts it leaves behind, nothing more). Spread is
 *  numbers: how many each case infects, the share of a population struck, how fast the count doubles, how deadly it runs,
 *  the days between generations, the running total, the wall at which transmission stalls, and whether it is still growing.
 *  Crosses to `epidemiology` — an outbreak is the event epidemiology measures. A measure. */

const PROOF = 'outbreak arithmetic (reproduction, attack rate, doubling time, case fatality, generation interval, cumulative cases, herd immunity, growth factor); the shape of an epidemic as counts; a measure crossed to epidemiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'outbreak', dst: 'epidemiology', formula, value, proof: PROOF, ...extra }, holds, { name: `outbreak.${name}`, params })

export class OutbreakFormulas {
  /** REPRODUCTION: secondary cases per primary case. value ⌊secondary / primary⌋. */
  static reproduction(secondary: number, primary: number): CrossFormula { return c('outbreak-reproduction', 'reproduction(secondary, primary) = ⌊secondary / primary⌋', primary > 0 ? Math.floor(secondary / primary) : 0, nat(secondary, primary) && primary > 0, 'reproduction', [secondary, primary]) }
  /** ATTACK RATE: the share of a population struck, as a percentage. value ⌊cases · 100 / population⌋. */
  static attackrate(cases: number, population: number): CrossFormula { return c('outbreak-attackrate', 'attackrate(cases, population) = ⌊cases · 100 / population⌋', population > 0 ? Math.floor((cases * 100) / population) : 0, nat(cases, population) && population > 0 && cases <= population, 'attackrate', [cases, population]) }
  /** DOUBLING TIME: days over the number of doublings that span them. value ⌊period / generations⌋. */
  static doublingtime(period: number, generations: number): CrossFormula { return c('outbreak-doublingtime', 'doublingtime(period, generations) = ⌊period / generations⌋', generations > 0 ? Math.floor(period / generations) : 0, nat(period, generations) && generations > 0, 'doublingtime', [period, generations]) }
  /** CASE FATALITY: deaths among cases, as a percentage. value ⌊deaths · 100 / cases⌋. */
  static casefatality(deaths: number, cases: number): CrossFormula { return c('outbreak-casefatality', 'casefatality(deaths, cases) = ⌊deaths · 100 / cases⌋', cases > 0 ? Math.floor((deaths * 100) / cases) : 0, nat(deaths, cases) && cases > 0 && deaths <= cases, 'casefatality', [deaths, cases]) }
  /** GENERATION INTERVAL: total days over the intervals they contain. value ⌊total / intervals⌋. */
  static generationinterval(total: number, intervals: number): CrossFormula { return c('outbreak-generationinterval', 'generationinterval(total, intervals) = ⌊total / intervals⌋', intervals > 0 ? Math.floor(total / intervals) : 0, nat(total, intervals) && intervals > 0, 'generationinterval', [total, intervals]) }
  /** CUMULATIVE CASES: a steady daily count over the days it runs. value daily · days. */
  static cumulativecases(daily: number, days: number): CrossFormula { return c('outbreak-cumulativecases', 'cumulativecases(daily, days) = daily · days', daily * days, nat(daily, days), 'cumulativecases', [daily, days]) }
  /** HERD IMMUNITY: the immune share at which transmission stalls, as a percentage. value ⌊(r0 − 1) · 100 / r0⌋. */
  static herdimmunity(r0: number): CrossFormula { return c('outbreak-herdimmunity', 'herdimmunity(r0) = ⌊(r0 − 1) · 100 / r0⌋', r0 > 0 ? Math.floor((Math.max(0, r0 - 1) * 100) / r0) : 0, nat(r0) && r0 > 0, 'herdimmunity', [r0]) }
  /** GROWTH FACTOR: this period's cases over the previous period's. value ⌊current / previous⌋. */
  static growthfactor(current: number, previous: number): CrossFormula { return c('outbreak-growthfactor', 'growthfactor(current, previous) = ⌊current / previous⌋', previous > 0 ? Math.floor(current / previous) : 0, nat(current, previous) && previous > 0, 'growthfactor', [current, previous]) }
}

for (const name of ['attackrate', 'casefatality', 'cumulativecases', 'doublingtime', 'generationinterval', 'growthfactor', 'herdimmunity', 'reproduction'] as const)
  hexRegisterOf('outbreak', name, (OutbreakFormulas[name] as (...x: unknown[]) => unknown).bind(OutbreakFormulas))
