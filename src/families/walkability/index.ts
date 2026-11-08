import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WALKABILITY — A NEIGHBOURHOOD ON FOOT, AS ARITHMETIC (chosen by the public-API registry, not by hand). How walkable a place
 *  is reduces to numbers: a walk score, the amenities within reach, the share of streets with sidewalks, crossings per distance,
 *  the walkshed a pace covers, pedestrian safety, transit proximity, and the penalty a slope adds. Crosses to `sociology` —
 *  walkability is what a built environment does to how people live together. A measure. */

const PROOF = 'walkability arithmetic (walk score, amenity access, sidewalk ratio, crossing density, walkshed, pedestrian safety, transit proximity, slope penalty); the registry\'s next uncovered domain; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'walkability', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `walkability.${name}`, params })

export class WalkabilityFormulas {
  /** AMENITY ACCESS: the share of nearby amenities reachable on foot, as a percentage. value ⌊reachable · 100 / total⌋. */
  static amenityaccess(reachable: number, total: number): CrossFormula { return c('walkability-amenityaccess', 'amenityaccess(reachable, total) = ⌊reachable · 100 / total⌋', total > 0 ? Math.floor((reachable * 100) / total) : 0, nat(reachable, total) && total > 0 && reachable <= total, 'amenityaccess', [reachable, total]) }
  /** CROSSING DENSITY: pedestrian crossings per 1000 metres of street. value ⌊crossings · 1000 / length⌋. */
  static crossingdensity(crossings: number, length: number): CrossFormula { return c('walkability-crossingdensity', 'crossingdensity(crossings, length) = ⌊crossings · 1000 / length⌋', length > 0 ? Math.floor((crossings * 1000) / length) : 0, nat(crossings, length) && length > 0, 'crossingdensity', [crossings, length]) }
  /** PEDESTRIAN SAFETY: a score falling with incidents per exposure. value max(0, 100 − ⌊incidents · 100 / trips⌋). */
  static pedestriansafety(incidents: number, trips: number): CrossFormula { return c('walkability-pedestriansafety', 'pedestriansafety(incidents, trips) = max(0, 100 − ⌊incidents · 100 / trips⌋)', trips > 0 ? Math.max(0, 100 - Math.floor((incidents * 100) / trips)) : 0, nat(incidents, trips) && trips > 0 && incidents <= trips, 'pedestriansafety', [incidents, trips]) }
  /** SIDEWALK RATIO: the share of street segments with a sidewalk, as a percentage. value ⌊withSidewalk · 100 / total⌋. */
  static sidewalkratio(withSidewalk: number, total: number): CrossFormula { return c('walkability-sidewalkratio', 'sidewalkratio(withSidewalk, total) = ⌊withSidewalk · 100 / total⌋', total > 0 ? Math.floor((withSidewalk * 100) / total) : 0, nat(withSidewalk, total) && total > 0 && withSidewalk <= total, 'sidewalkratio', [withSidewalk, total]) }
  /** SLOPE PENALTY: the percent grade a route climbs, rise over run. value ⌊rise · 100 / run⌋. */
  static slopepenalty(rise: number, run: number): CrossFormula { return c('walkability-slopepenalty', 'slopepenalty(rise, run) = ⌊rise · 100 / run⌋', run > 0 ? Math.floor((rise * 100) / run) : 0, nat(rise, run) && run > 0, 'slopepenalty', [rise, run]) }
  /** TRANSIT PROXIMITY: a score falling with distance to the nearest stop. value max(0, 100 − ⌊distance · 100 / maxdist⌋). */
  static transitproximity(distance: number, maxdist: number): CrossFormula { return c('walkability-transitproximity', 'transitproximity(distance, maxdist) = max(0, 100 − ⌊distance · 100 / maxdist⌋)', maxdist > 0 ? Math.max(0, 100 - Math.floor((distance * 100) / maxdist)) : 0, nat(distance, maxdist) && maxdist > 0, 'transitproximity', [distance, maxdist]) }
  /** WALK SCORE: amenities reached against the most a place could offer, as a percentage. value ⌊amenities · 100 / max⌋. */
  static walkscore(amenities: number, max: number): CrossFormula { return c('walkability-walkscore', 'walkscore(amenities, max) = ⌊amenities · 100 / max⌋', max > 0 ? Math.floor((amenities * 100) / max) : 0, nat(amenities, max) && max > 0 && amenities <= max, 'walkscore', [amenities, max]) }
  /** WALKSHED: the distance a pace covers in a time, metres per minute over minutes. value speed · minutes. */
  static walkshed(speed: number, minutes: number): CrossFormula { return c('walkability-walkshed', 'walkshed(speed, minutes) = speed · minutes', speed * minutes, nat(speed, minutes), 'walkshed', [speed, minutes]) }
}

for (const name of ['amenityaccess', 'crossingdensity', 'pedestriansafety', 'sidewalkratio', 'slopepenalty', 'transitproximity', 'walkscore', 'walkshed'] as const)
  hexRegisterOf('walkability', name, (WalkabilityFormulas[name] as (...x: unknown[]) => unknown).bind(WalkabilityFormulas))
