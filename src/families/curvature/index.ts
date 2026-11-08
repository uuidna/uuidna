import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CURVATURE — HOW A SURFACE BENDS, AS ARITHMETIC. Bending is numbers: the Gaussian product of principal curvatures, their
 *  mean, a radius of curvature from an arc, total curvature over an area, sectional curvature per plane, geodesic deviation
 *  growing with distance, the angle sum of a triangle, and the angular defect at a vertex. Crosses to `topology` — curvature
 *  is the local geometry whose global shape topology counts (Gauss–Bonnet). A measure. */

const PROOF = 'curvature arithmetic (gaussian product, mean, radius, total, sectional, geodesic deviation, angle sum, angular defect); local bending crossed to topology (Gauss–Bonnet)'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'curvature', dst: 'topology', formula, value, proof: PROOF, ...extra }, holds, { name: `curvature.${name}`, params })

export class CurvatureFormulas {
  /** GAUSSIAN CURVATURE: the product of the principal curvatures. value k1 · k2. */
  static gaussian(k1: number, k2: number): CrossFormula { return c('curvature-gaussian', 'gaussian(k1, k2) = k1 · k2', k1 * k2, nat(k1, k2), 'gaussian', [k1, k2]) }
  /** MEAN CURVATURE: the average of the principal curvatures. value ⌊(k1 + k2) / 2⌋. */
  static mean(k1: number, k2: number): CrossFormula { return c('curvature-mean', 'mean(k1, k2) = ⌊(k1 + k2) / 2⌋', Math.floor((k1 + k2) / 2), nat(k1, k2), 'mean', [k1, k2]) }
  /** RADIUS OF CURVATURE: an arc length over its turning angle. value ⌊arc / angle⌋. */
  static radiusofcurvature(arc: number, angle: number): CrossFormula { return c('curvature-radiusofcurvature', 'radiusofcurvature(arc, angle) = ⌊arc / angle⌋', angle > 0 ? Math.floor(arc / angle) : 0, nat(arc, angle) && angle > 0, 'radiusofcurvature', [arc, angle]) }
  /** TOTAL CURVATURE: Gaussian curvature integrated over an area. value k · area. */
  static totalcurvature(k: number, area: number): CrossFormula { return c('curvature-totalcurvature', 'totalcurvature(k, area) = k · area', k * area, nat(k, area), 'totalcurvature', [k, area]) }
  /** SECTIONAL CURVATURE: total curvature averaged over the planes. value ⌊curv / planes⌋. */
  static sectional(curv: number, planes: number): CrossFormula { return c('curvature-sectional', 'sectional(curv, planes) = ⌊curv / planes⌋', planes > 0 ? Math.floor(curv / planes) : 0, nat(curv, planes) && planes > 0, 'sectional', [curv, planes]) }
  /** GEODESIC DEVIATION: separation grows with curvature, distance and steps. value k · dist · steps. */
  static geodesicdeviation(k: number, dist: number, steps: number): CrossFormula { return c('curvature-geodesicdeviation', 'geodesicdeviation(k, dist, steps) = k · dist · steps', k * dist * steps, nat(k, dist, steps), 'geodesicdeviation', [k, dist, steps]) }
  /** ANGLE SUM: the interior angles of a triangle on the surface. value a + b + c. */
  static anglesum(a: number, b: number, c2: number): CrossFormula { return c('curvature-anglesum', 'anglesum(a, b, c) = a + b + c', a + b + c2, nat(a, b, c2), 'anglesum', [a, b, c2]) }
  /** ANGULAR DEFECT: how far the angles around a vertex fall short of 360°. value max(0, 360 − sum). */
  static defect(sum: number): CrossFormula { return c('curvature-defect', 'defect(sum) = max(0, 360 − sum)', Math.max(0, 360 - sum), nat(sum) && sum <= 360, 'defect', [sum]) }
}

for (const name of ['anglesum', 'defect', 'gaussian', 'geodesicdeviation', 'mean', 'radiusofcurvature', 'sectional', 'totalcurvature'] as const)
  hexRegisterOf('curvature', name, (CurvatureFormulas[name] as (...x: unknown[]) => unknown).bind(CurvatureFormulas))
