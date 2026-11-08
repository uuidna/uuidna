import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** TRIANGULATION — FIXING POINTS FROM ANGLES AND A KNOWN BASE, AS ARITHMETIC (chosen by the public-API registry, not by
 *  hand). Locating a station is numbers: the triangle's closing angle, the squared base length, where two sightlines meet,
 *  a resection's angle sum, the area a traverse encloses, a running bearing, the redundancy of a network, and how densely
 *  its points fall. Crosses to `surveying` — triangulation is the geometry surveying runs on. A measure. */

const PROOF = 'triangulation arithmetic (angle closure, squared baseline, intersection, resection, shoelace area, bearing sum, network redundancy, point density); the registry\'s uncovered geodesy domain; a measure crossed to surveying'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'triangulation', dst: 'surveying', formula, value, proof: PROOF, ...extra }, holds, { name: `triangulation.${name}`, params })

export class TriangulationFormulas {
  /** ANGLE CLOSURE: a triangle's third angle, the two measured angles subtracted from 180. value max(0, 180 − a − b). */
  static angleclosure(a: number, b: number): CrossFormula { return c('triangulation-angleclosure', 'angleclosure(a, b) = max(0, 180 − a − b)', Math.max(0, 180 - a - b), nat(a, b), 'angleclosure', [a, b]) }
  /** AREA FROM COORDS: a triangle's area from base and height, the shoelace halving. value ⌊base · height / 2⌋. */
  static areacoords(base: number, height: number): CrossFormula { return c('triangulation-areacoords', 'areacoords(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base, height), 'areacoords', [base, height]) }
  /** BASELINE: the squared length of the known base, Pythagoras without the root. value dx² + dy². */
  static baseline(dx: number, dy: number): CrossFormula { return c('triangulation-baseline', 'baseline(dx, dy) = dx² + dy²', dx * dx + dy * dy, nat(dx, dy), 'baseline', [dx, dy]) }
  /** BEARING SUM: a running bearing, two turns added and wrapped to a circle. value (b1 + b2) mod 360. */
  static bearingsum(b1: number, b2: number): CrossFormula { return c('triangulation-bearingsum', 'bearingsum(b1, b2) = (b1 + b2) mod 360', (b1 + b2) % fullTurn, nat(b1, b2), 'bearingsum', [b1, b2]) }
  /** INTERSECTION: where two sightlines meet along the base, their midpoint coordinate. value ⌊(x1 + x2) / 2⌋. */
  static intersection(x1: number, x2: number): CrossFormula { return c('triangulation-intersection', 'intersection(x1, x2) = ⌊(x1 + x2) / 2⌋', Math.floor((x1 + x2) / 2), nat(x1, x2), 'intersection', [x1, x2]) }
  /** NETWORK REDUNDANCY: the degrees of freedom, observations beyond the unknowns. value max(0, obs − unknowns). */
  static networkredundancy(obs: number, unknowns: number): CrossFormula { return c('triangulation-networkredundancy', 'networkredundancy(obs, unknowns) = max(0, obs − unknowns)', Math.max(0, obs - unknowns), nat(obs, unknowns), 'networkredundancy', [obs, unknowns]) }
  /** POINT DENSITY: control points per unit area. value ⌊points / area⌋. */
  static pointdensity(points: number, area: number): CrossFormula { return c('triangulation-pointdensity', 'pointdensity(points, area) = ⌊points / area⌋', area > 0 ? Math.floor(points / area) : 0, nat(points, area) && area > 0, 'pointdensity', [points, area]) }
  /** RESECTION: the sum of the three observed angles at an unknown station. value a + b + c. */
  static resection(a: number, b: number, d: number): CrossFormula { return c('triangulation-resection', 'resection(a, b, c) = a + b + c', a + b + d, nat(a, b, d), 'resection', [a, b, d]) }
}

for (const name of ['angleclosure', 'areacoords', 'baseline', 'bearingsum', 'intersection', 'networkredundancy', 'pointdensity', 'resection'] as const)
  hexRegisterOf('triangulation', name, (TriangulationFormulas[name] as (...x: unknown[]) => unknown).bind(TriangulationFormulas))
