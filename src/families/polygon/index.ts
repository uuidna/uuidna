import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POLYGON — THE SHAPE OF A CLOSED FIGURE, AS ARITHMETIC. A polygon of n sides is numbers: the interior angles sum, the
 *  diagonals that join its corners, each exterior and interior angle, the triangles a triangulation cuts, the perimeter
 *  of its edges, the sides themselves, and an area. Crosses to `geometry` — a polygon is geometry made countable. A measure. */

const PROOF = 'polygon arithmetic (interior-angle sum, diagonals, exterior angle, interior angle, triangulation triangles, perimeter, sides, area); a closed figure made countable; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'polygon', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `polygon.${name}`, params })

export class PolygonFormulas {
  /** INTERIOR-ANGLE SUM: the degrees in an n-gon's corners. value (n − 2) · 180. */
  static interioranglesum(n: number): CrossFormula { return c('polygon-interioranglesum', 'interioranglesum(n) = (n − 2) · 180', Math.max(0, n - 2) * 180, nat(n) && n >= 3, 'interioranglesum', [n]) }
  /** DIAGONALS: the segments joining non-adjacent corners. value ⌊n · (n − 3) / 2⌋. */
  static diagonals(n: number): CrossFormula { return c('polygon-diagonals', 'diagonals(n) = ⌊n · (n − 3) / 2⌋', Math.floor(Math.max(0, n * (n - 3)) / 2), nat(n) && n >= 3, 'diagonals', [n]) }
  /** EXTERIOR ANGLE of a regular n-gon. value ⌊360 / n⌋. */
  static exteriorangle(n: number): CrossFormula { return c('polygon-exteriorangle', 'exteriorangle(n) = ⌊360 / n⌋', n > 0 ? Math.floor(360 / n) : 0, nat(n) && n >= 3, 'exteriorangle', [n]) }
  /** INTERIOR ANGLE of a regular n-gon. value ⌊(n − 2) · 180 / n⌋. */
  static interiorangle(n: number): CrossFormula { return c('polygon-interiorangle', 'interiorangle(n) = ⌊(n − 2) · 180 / n⌋', n > 0 ? Math.floor((Math.max(0, n - 2) * 180) / n) : 0, nat(n) && n >= 3, 'interiorangle', [n]) }
  /** TRIANGLES a triangulation cuts an n-gon into. value n − 2. */
  static triangles(n: number): CrossFormula { return c('polygon-triangles', 'triangles(n) = n − 2', Math.max(0, n - 2), nat(n) && n >= 3, 'triangles', [n]) }
  /** PERIMETER: sides at an equal edge length. value sides · length. */
  static perimeter(sides: number, length: number): CrossFormula { return c('polygon-perimeter', 'perimeter(sides, length) = sides · length', sides * length, nat(sides, length) && sides >= 3, 'perimeter', [sides, length]) }
  /** SIDES of an n-gon equal its vertices. value n. */
  static sides(n: number): CrossFormula { return c('polygon-sides', 'sides(n) = n', n, nat(n) && n >= 3, 'sides', [n]) }
  /** AREA of a triangle with the given base and height. value ⌊base · height / 2⌋. */
  static area(base: number, height: number): CrossFormula { return c('polygon-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base, height), 'area', [base, height]) }
}

for (const name of ['area', 'diagonals', 'exteriorangle', 'interiorangle', 'interioranglesum', 'perimeter', 'sides', 'triangles'] as const)
  hexRegisterOf('polygon', name, (PolygonFormulas[name] as (...x: unknown[]) => unknown).bind(PolygonFormulas))
