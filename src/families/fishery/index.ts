import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FISHERY — FISHERIES SCIENCE, AS ARITHMETIC (chosen by the public-API registry, not by hand). A fishery is numbers: the
 *  catch an effort lands at a rate, the biomass of a stock by weight, the quota left under an allowance, catch per unit
 *  effort, whether the catch is sustainable against recruitment, the bycatch discarded, spawning output, and mortality.
 *  Crosses to `environment` — a fishery is what the environment sustains. A measure. */

const PROOF = 'fishery arithmetic (catch, biomass, quota, cpue, sustainable, bycatch, spawning, mortality); fisheries science as integers; a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fishery', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `fishery.${name}`, params })

export class FisheryFormulas {
  /** CATCH: effort landed at a per-unit rate. value effort · rate. */
  static catch(effort: number, rate: number): CrossFormula { return c('fishery-catch', 'catch(effort, rate) = effort · rate', effort * rate, nat(effort, rate), 'catch', [effort, rate]) }
  /** BIOMASS: a stock of fish at a weight each. value stock · weight. */
  static biomass(stock: number, weight: number): CrossFormula { return c('fishery-biomass', 'biomass(stock, weight) = stock · weight', stock * weight, nat(stock, weight), 'biomass', [stock, weight]) }
  /** QUOTA remaining: the allowance less what was caught, floored at 0. value max(0, allowed − caught). */
  static quota(allowed: number, caught: number): CrossFormula { return c('fishery-quota', 'quota(allowed, caught) = max(0, allowed − caught)', Math.max(0, allowed - caught), nat(allowed, caught), 'quota', [allowed, caught]) }
  /** CPUE: catch per unit effort, ×100. value ⌊catch · 100 / effort⌋. */
  static cpue(cat: number, effort: number): CrossFormula { return c('fishery-cpue', 'cpue(catch, effort) = ⌊catch · 100 / effort⌋', effort > 0 ? Math.floor((cat * 100) / effort) : 0, nat(cat, effort) && effort > 0, 'cpue', [cat, effort]) }
  /** SUSTAINABLE: 1 when the catch stays within recruitment. value [caught ≤ recruitment]. */
  static sustainable(caught: number, recruitment: number): CrossFormula { return c('fishery-sustainable', 'sustainable(caught, recruitment) = [caught ≤ recruitment]', caught <= recruitment ? 1 : 0, nat(caught, recruitment), 'sustainable', [caught, recruitment]) }
  /** BYCATCH as a percentage of the total haul. value ⌊discard · 100 / total⌋. */
  static bycatch(discard: number, total: number): CrossFormula { return c('fishery-bycatch', 'bycatch(discard, total) = ⌊discard · 100 / total⌋', total > 0 ? Math.floor((discard * 100) / total) : 0, nat(discard, total) && total > 0 && discard <= total, 'bycatch', [discard, total]) }
  /** SPAWNING output: eggs at a survival percentage. value ⌊eggs · survival / 100⌋. */
  static spawning(eggs: number, survival: number): CrossFormula { return c('fishery-spawning', 'spawning(eggs, survival) = ⌊eggs · survival / 100⌋', Math.floor((eggs * survival) / 100), nat(eggs, survival), 'spawning', [eggs, survival]) }
  /** MORTALITY as a percentage of the population. value ⌊deaths · 100 / population⌋. */
  static mortality(deaths: number, population: number): CrossFormula { return c('fishery-mortality', 'mortality(deaths, population) = ⌊deaths · 100 / population⌋', population > 0 ? Math.floor((deaths * 100) / population) : 0, nat(deaths, population) && population > 0 && deaths <= population, 'mortality', [deaths, population]) }
}

for (const name of ['biomass', 'bycatch', 'catch', 'cpue', 'mortality', 'quota', 'spawning', 'sustainable'] as const)
  hexRegisterOf('fishery', name, (FisheryFormulas[name] as (...x: unknown[]) => unknown).bind(FisheryFormulas))
