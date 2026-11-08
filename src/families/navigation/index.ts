import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** NAVIGATION — FINDING THE WAY, AS ARITHMETIC (chosen by the public-API registry, not by hand). Getting there is numbers:
 *  the bearing to steer, the distance covered, the time still to run, how far off the planned line, the geometry of the fix,
 *  the fraction of the route done, the heading once drift is taken out, and how often a fix holds. Crosses to `transport` —
 *  navigation is what moving things depends on. A measure. */

const PROOF = 'navigation arithmetic (bearing, distance, eta, crosstrack, dilution, waypoint, heading, accuracy); a registry domain; a measure crossed to transport'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'navigation', dst: 'transport', formula, value, proof: PROOF, ...extra }, holds, { name: `navigation.${name}`, params })

export class NavigationFormulas {
  /** BEARING normalised to a compass circle. value ((degrees mod 360) + 360) mod 360. */
  static bearing(degrees: number): CrossFormula { return c('navigation-bearing', 'bearing(degrees) = ((degrees mod 360) + 360) mod 360', ((degrees % fullTurn) + fullTurn) % fullTurn, nat(degrees), 'bearing', [degrees]) }
  /** DISTANCE covered at a speed over a time. value speed · time. */
  static distance(speed: number, time: number): CrossFormula { return c('navigation-distance', 'distance(speed, time) = speed · time', speed * time, nat(speed, time), 'distance', [speed, time]) }
  /** ETA: the time still to run at a speed. value ⌊distance / speed⌋. */
  static eta(distance: number, speed: number): CrossFormula { return c('navigation-eta', 'eta(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'eta', [distance, speed]) }
  /** CROSSTRACK: how far off the planned line, as a fraction of the leg. value ⌊offset · 100 / leg⌋. */
  static crosstrack(offset: number, leg: number): CrossFormula { return c('navigation-crosstrack', 'crosstrack(offset, leg) = ⌊offset · 100 / leg⌋', leg > 0 ? Math.floor((offset * 100) / leg) : 0, nat(offset, leg) && leg > 0, 'crosstrack', [offset, leg]) }
  /** DILUTION: the fix geometry, error spread over the satellites in view (a GDOP proxy). value ⌊error / satellites⌋. */
  static dilution(error: number, satellites: number): CrossFormula { return c('navigation-dilution', 'dilution(error, satellites) = ⌊error / satellites⌋', satellites > 0 ? Math.floor(error / satellites) : 0, nat(error, satellites) && satellites > 0, 'dilution', [error, satellites]) }
  /** WAYPOINT: the fraction of the route done. value ⌊completed · 100 / total⌋. */
  static waypoint(completed: number, total: number): CrossFormula { return c('navigation-waypoint', 'waypoint(completed, total) = ⌊completed · 100 / total⌋', total > 0 ? Math.floor((completed * 100) / total) : 0, nat(completed, total) && total > 0 && completed <= total, 'waypoint', [completed, total]) }
  /** HEADING: the course once drift is taken out, normalised. value ((course + drift) mod 360 + 360) mod 360. */
  static heading(course: number, drift: number): CrossFormula { return c('navigation-heading', 'heading(course, drift) = ((course + drift) mod 360 + 360) mod 360', (((course + drift) % fullTurn) + fullTurn) % fullTurn, nat(course, drift), 'heading', [course, drift]) }
  /** ACCURACY: how often a fix holds. value ⌊fixes · 100 / attempts⌋. */
  static accuracy(fixes: number, attempts: number): CrossFormula { return c('navigation-accuracy', 'accuracy(fixes, attempts) = ⌊fixes · 100 / attempts⌋', attempts > 0 ? Math.floor((fixes * 100) / attempts) : 0, nat(fixes, attempts) && attempts > 0 && fixes <= attempts, 'accuracy', [fixes, attempts]) }
}

for (const name of ['accuracy', 'bearing', 'crosstrack', 'dilution', 'distance', 'eta', 'heading', 'waypoint'] as const)
  hexRegisterOf('navigation', name, (NavigationFormulas[name] as (...x: unknown[]) => unknown).bind(NavigationFormulas))
