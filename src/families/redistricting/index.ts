import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REDISTRICTING — DRAWING DISTRICTS, AS ARITHMETIC (one person, one vote, made numbers). Population deviation from the
 *  ideal, a compactness proxy, the efficiency gap between wasted votes, total population, how many districts fit, the
 *  malapportionment ratio of largest to smallest, the Hare quota per seat, and how competitive a seat is. Crosses to
 *  `governance` — redistricting is what governance apportions. A measure. */

const PROOF = 'redistricting arithmetic (population deviation, compactness proxy, efficiency gap, population, districts, malapportionment, Hare quota, competitiveness); one person one vote as numbers; a measure crossed to governance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'redistricting', dst: 'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `redistricting.${name}`, params })

export class RedistrictingFormulas {
  /** COMPACTNESS: the fill ratio of district area to its bounding box, as a percentage. value ⌊area · 100 / bbox⌋. */
  static compactness(area: number, bbox: number): CrossFormula { return c('redistricting-compactness', 'compactness(area, bbox) = ⌊area · 100 / bbox⌋', bbox > 0 ? Math.floor((area * 100) / bbox) : 0, nat(area, bbox) && bbox > 0 && area <= bbox, 'compactness', [area, bbox]) }
  /** COMPETITIVENESS: 100 minus the winner's victory margin over the total, a closeness score. value max(0, 100 − ⌊max(0, winner − loser) · 100 / (winner + loser)⌋). */
  static competitiveness(winner: number, loser: number): CrossFormula { return c('redistricting-competitiveness', 'competitiveness(winner, loser) = max(0, 100 − ⌊max(0, winner − loser) · 100 / (winner + loser)⌋)', (winner + loser) > 0 ? Math.max(0, 100 - Math.floor((Math.max(0, winner - loser) * 100) / (winner + loser))) : 0, nat(winner, loser) && (winner + loser) > 0, 'competitiveness', [winner, loser]) }
  /** DEVIATION: how far a district's population runs over the ideal, as a percentage. value ⌊max(0, pop − ideal) · 100 / ideal⌋. */
  static deviation(pop: number, ideal: number): CrossFormula { return c('redistricting-deviation', 'deviation(pop, ideal) = ⌊max(0, pop − ideal) · 100 / ideal⌋', ideal > 0 ? Math.floor((Math.max(0, pop - ideal) * 100) / ideal) : 0, nat(pop, ideal) && ideal > 0, 'deviation', [pop, ideal]) }
  /** DISTRICTS: how many districts a population fills at a target size each. value ⌊population / perDistrict⌋. */
  static districts(population: number, perDistrict: number): CrossFormula { return c('redistricting-districts', 'districts(population, perDistrict) = ⌊population / perDistrict⌋', perDistrict > 0 ? Math.floor(population / perDistrict) : 0, nat(population, perDistrict) && perDistrict > 0, 'districts', [population, perDistrict]) }
  /** EFFICIENCY GAP: the net wasted votes between two parties over the turnout, as a percentage. value ⌊max(0, wasteA − wasteB) · 100 / votes⌋. */
  static efficiencygap(wasteA: number, wasteB: number, votes: number): CrossFormula { return c('redistricting-efficiencygap', 'efficiencygap(wasteA, wasteB, votes) = ⌊max(0, wasteA − wasteB) · 100 / votes⌋', votes > 0 ? Math.floor((Math.max(0, wasteA - wasteB) * 100) / votes) : 0, nat(wasteA, wasteB, votes) && votes > 0, 'efficiencygap', [wasteA, wasteB, votes]) }
  /** MALAPPORTIONMENT: the ratio of the largest district to the smallest, as a percentage. value ⌊maxPop · 100 / minPop⌋. */
  static malapportionment(maxPop: number, minPop: number): CrossFormula { return c('redistricting-malapportionment', 'malapportionment(maxPop, minPop) = ⌊maxPop · 100 / minPop⌋', minPop > 0 ? Math.floor((maxPop * 100) / minPop) : 0, nat(maxPop, minPop) && minPop > 0 && maxPop >= minPop, 'malapportionment', [maxPop, minPop]) }
  /** POPULATION: the total people across all districts at a size each. value districts · perDistrict. */
  static population(districts: number, perDistrict: number): CrossFormula { return c('redistricting-population', 'population(districts, perDistrict) = districts · perDistrict', districts * perDistrict, nat(districts, perDistrict), 'population', [districts, perDistrict]) }
  /** QUOTA: the Hare quota, people per seat. value ⌊population / seats⌋. */
  static quota(population: number, seats: number): CrossFormula { return c('redistricting-quota', 'quota(population, seats) = ⌊population / seats⌋', seats > 0 ? Math.floor(population / seats) : 0, nat(population, seats) && seats > 0, 'quota', [population, seats]) }
}

for (const name of ['compactness', 'competitiveness', 'deviation', 'districts', 'efficiencygap', 'malapportionment', 'population', 'quota'] as const)
  hexRegisterOf('redistricting', name, (RedistrictingFormulas[name] as (...x: unknown[]) => unknown).bind(RedistrictingFormulas))
