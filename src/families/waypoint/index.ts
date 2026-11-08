import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** WAYPOINT — ROUTE GEOMETRY AS ARITHMETIC (chosen by the public-API registry, not by hand). A flight or sail plan is
 *  numbers: the squared distance of a leg, the time to reach it, how far off the line you drift, the whole route, the turn
 *  between two bearings, the fuel a leg burns, speed over the ground, and the radius of a turn. No sqrt, no trig — squared
 *  distances where length is wanted. Crosses to `navigation` — a waypoint is what navigation steers between. A measure. */

const PROOF = 'waypoint arithmetic (leg distance squared, eta, cross-track, total route, bearing delta, fuel burn, ground speed, turn radius); route geometry as integers; a measure crossed to navigation'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'waypoint', dst: 'navigation', formula, value, proof: PROOF, ...extra }, holds, { name: `waypoint.${name}`, params })

export class WaypointFormulas {
  /** LEG DISTANCE, SQUARED: the Pythagorean square of a leg from its coordinate deltas. value dx² + dy². */
  static legdistance(dx: number, dy: number): CrossFormula { return c('waypoint-legdistance', 'legdistance(dx, dy) = dx² + dy²', dx * dx + dy * dy, nat(dx, dy), 'legdistance', [dx, dy]) }
  /** ETA: whole time units to cover a distance at a speed. value ⌊distance / speed⌋. */
  static eta(distance: number, speed: number): CrossFormula { return c('waypoint-eta', 'eta(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'eta', [distance, speed]) }
  /** CROSS-TRACK, SQUARED: how far off the track line, by Pythagoras on the hypotenuse and the along-track leg. value max(0, hypot² − along²). */
  static crosstrack(hypot: number, along: number): CrossFormula { return c('waypoint-crosstrack', 'crosstrack(hypot, along) = max(0, hypot² − along²)', Math.max(0, hypot * hypot - along * along), nat(hypot, along), 'crosstrack', [hypot, along]) }
  /** TOTAL ROUTE: the legs of a plan at a length each. value legs · perLeg. */
  static totalroute(legs: number, perLeg: number): CrossFormula { return c('waypoint-totalroute', 'totalroute(legs, perLeg) = legs · perLeg', legs * perLeg, nat(legs, perLeg), 'totalroute', [legs, perLeg]) }
  /** BEARING DELTA: the turn from one bearing to another, normalised to [0, 360). value ((to − from) mod 360 + 360) mod 360. */
  static bearingdelta(from: number, to: number): CrossFormula { return c('waypoint-bearingdelta', 'bearingdelta(from, to) = ((to − from) mod 360 + 360) mod 360', (((to - from) % fullTurn) + fullTurn) % fullTurn, nat(from, to), 'bearingdelta', [from, to]) }
  /** FUEL BURN: the fuel a leg burns at a rate per hundred distance. value ⌊distance · rate / 100⌋. */
  static fuelburn(distance: number, rate: number): CrossFormula { return c('waypoint-fuelburn', 'fuelburn(distance, rate) = ⌊distance · rate / 100⌋', Math.floor((distance * rate) / 100), nat(distance, rate), 'fuelburn', [distance, rate]) }
  /** GROUND SPEED: distance over the ground in a time. value ⌊distance / time⌋. */
  static groundspeed(distance: number, time: number): CrossFormula { return c('waypoint-groundspeed', 'groundspeed(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'groundspeed', [distance, time]) }
  /** TURN RADIUS: the radius of a turn, speed squared over the turn rate. value ⌊speed² / rate⌋. */
  static turnradius(speed: number, rate: number): CrossFormula { return c('waypoint-turnradius', 'turnradius(speed, rate) = ⌊speed² / rate⌋', rate > 0 ? Math.floor((speed * speed) / rate) : 0, nat(speed, rate) && rate > 0, 'turnradius', [speed, rate]) }
}

for (const name of ['bearingdelta', 'crosstrack', 'eta', 'fuelburn', 'groundspeed', 'legdistance', 'totalroute', 'turnradius'] as const)
  hexRegisterOf('waypoint', name, (WaypointFormulas[name] as (...x: unknown[]) => unknown).bind(WaypointFormulas))
