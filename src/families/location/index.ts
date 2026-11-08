import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOCATION — SPACE AND DISTANCE, AS ARITHMETIC (chosen by the registry). A place is numbers: Manhattan and Chebyshev
 *  distance, a bounding-box area, a grid cell index, whether a point is within a radius, speed, estimated arrival, and the
 *  zoom level a span needs. Crosses to `cross`. A measure. */

const PROOF = 'spatial arithmetic (Manhattan and Chebyshev distance, bounding box, grid index, within radius, speed, ETA, zoom); a measure crossed through cross'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const l = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'location', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `location.${name}`, params })

export class LocationFormulas {
  /** MANHATTAN DISTANCE: the grid distance between two points. value dx + dy. */
  static manhattan(dx: number, dy: number): CrossFormula { return l('location-manhattan', 'manhattan(dx, dy) = dx + dy', dx + dy, nat(dx, dy), 'manhattan', [dx, dy]) }
  /** CHEBYSHEV DISTANCE: the king-move distance, the larger axis. value max(dx, dy). */
  static chebyshev(dx: number, dy: number): CrossFormula { return l('location-chebyshev', 'chebyshev(dx, dy) = max(dx, dy)', Math.max(dx, dy), nat(dx, dy), 'chebyshev', [dx, dy]) }
  /** A BOUNDING-BOX AREA. value dx · dy. */
  static box(dx: number, dy: number): CrossFormula { return l('location-box', 'box(dx, dy) = dx · dy', dx * dy, nat(dx, dy), 'box', [dx, dy]) }
  /** THE GRID CELL INDEX of a coordinate at a cell size. value ⌊value / size⌋. */
  static grid(value: number, size: number): CrossFormula { return l('location-grid', 'grid(value, size) = ⌊value / size⌋', size > 0 ? Math.floor(value / size) : 0, nat(value, size) && size > 0, 'grid', [value, size]) }
  /** WITHIN: 1 when a distance is inside the radius. value [distance ≤ radius]. */
  static within(distance: number, radius: number): CrossFormula { return l('location-within', 'within(distance, radius) = [distance ≤ radius]', distance <= radius ? 1 : 0, nat(distance, radius), 'within', [distance, radius]) }
  /** SPEED: distance over time. value ⌊distance / time⌋. */
  static speed(distance: number, time: number): CrossFormula { return l('location-speed', 'speed(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'speed', [distance, time]) }
  /** ESTIMATED ARRIVAL: distance over speed. value ⌊distance / speed⌋. */
  static eta(distance: number, speed: number): CrossFormula { return l('location-eta', 'eta(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'eta', [distance, speed]) }
  /** THE ZOOM LEVEL: how many cell tiles a span spans. value ⌊span / tile⌋. */
  static zoom(span: number, tile: number): CrossFormula { return l('location-zoom', 'zoom(span, tile) = ⌊span / tile⌋', tile > 0 ? Math.floor(span / tile) : 0, nat(span, tile) && tile > 0, 'zoom', [span, tile]) }
}

for (const name of ['box', 'chebyshev', 'eta', 'grid', 'manhattan', 'speed', 'within', 'zoom'] as const)
  hexRegisterOf('location', name, (LocationFormulas[name] as (...x: unknown[]) => unknown).bind(LocationFormulas))
