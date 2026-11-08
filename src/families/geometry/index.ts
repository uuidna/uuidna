import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOMETRY — SHAPE AS ARITHMETIC (areas, perimeters, volumes, squared lengths). A triangle's area, a regular polygon's
 *  perimeter, a rectangle's area, a circle's area by a 314/100 proxy for π, a prism's volume, the hypotenuse squared,
 *  an interior angle shared across sides, and a rectangle's diagonal squared. Crosses to `code` — shape made computable.
 *  Integers only; every division is guarded. A measure. */

const PROOF = 'geometry arithmetic (triangle area, polygon perimeter, rectangle area, circle area by 314/100 π-proxy, prism volume, hypotenuse squared, shared interior angle, diagonal squared); integers only, every division guarded; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geometry', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `geometry.${name}`, params })

export class GeometryFormulas {
  /** TRIANGLE AREA: half base times height. value ⌊base · height / 2⌋. */
  static area(base: number, height: number): CrossFormula { return c('geometry-area', 'area(base, height) = ⌊base · height / 2⌋', Math.floor((base * height) / 2), nat(base, height), 'area', [base, height]) }
  /** REGULAR POLYGON PERIMETER: sides times side length. value sides · length. */
  static perimeter(sides: number, length: number): CrossFormula { return c('geometry-perimeter', 'perimeter(sides, length) = sides · length', sides * length, nat(sides, length), 'perimeter', [sides, length]) }
  /** RECTANGLE AREA: width times height. value width · height. */
  static rectangle(width: number, height: number): CrossFormula { return c('geometry-rectangle', 'rectangle(width, height) = width · height', width * height, nat(width, height), 'rectangle', [width, height]) }
  /** CIRCLE AREA: π r² by a 314/100 proxy. value ⌊314 · radius² / 100⌋. */
  static circle(radius: number): CrossFormula { return c('geometry-circle', 'circle(radius) = ⌊314 · radius² / 100⌋', Math.floor((314 * radius * radius) / 100), nat(radius), 'circle', [radius]) }
  /** PRISM VOLUME: base area times height. value area · height. */
  static volume(area_: number, height: number): CrossFormula { return c('geometry-volume', 'volume(area, height) = area · height', area_ * height, nat(area_, height), 'volume', [area_, height]) }
  /** HYPOTENUSE SQUARED: a² + b². value a² + b². */
  static pythagorean(a: number, b: number): CrossFormula { return c('geometry-pythagorean', 'pythagorean(a, b) = a² + b²', a * a + b * b, nat(a, b), 'pythagorean', [a, b]) }
  /** SHARED INTERIOR ANGLE: the interior total over the sides. value ⌊interior / sides⌋. */
  static angle(interior: number, sides: number): CrossFormula { return c('geometry-angle', 'angle(interior, sides) = ⌊interior / sides⌋', sides > 0 ? Math.floor(interior / sides) : 0, nat(interior, sides) && sides > 0, 'angle', [interior, sides]) }
  /** DIAGONAL SQUARED: width² + height². value width² + height². */
  static diagonal(width: number, height: number): CrossFormula { return c('geometry-diagonal', 'diagonal(width, height) = width² + height²', width * width + height * height, nat(width, height), 'diagonal', [width, height]) }
}

for (const name of ['angle', 'area', 'circle', 'diagonal', 'perimeter', 'pythagorean', 'rectangle', 'volume'] as const)
  hexRegisterOf('geometry', name, (GeometryFormulas[name] as (...x: unknown[]) => unknown).bind(GeometryFormulas))
