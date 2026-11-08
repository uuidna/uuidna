import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOPOLOGY — THE SHAPE OF SPACE, AS ARITHMETIC (chosen by the registry, not by hand). The invariants that survive
 *  bending without tearing are numbers: the Euler characteristic, the genus, connectivity, Betti numbers, dimension,
 *  homology, a neighborhood's reach, and the boundary's share of the closure. Crosses to `code` — a shape is a program.
 *  A measure. */

const PROOF = 'topology arithmetic (euler characteristic, genus, connectivity, betti, dimension, homology, neighborhood, boundary); an uncovered domain; a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'topology', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `topology.${name}`, params })

export class TopologyFormulas {
  /** EULER CHARACTERISTIC: vertices minus edges plus faces (may be negative). value V − E + F. */
  static euler(vertices: number, edges: number, faces: number): CrossFormula { return c('topology-euler', 'euler(vertices, edges, faces) = vertices − edges + faces', vertices - edges + faces, nat(vertices, edges, faces), 'euler', [vertices, edges, faces]) }
  /** GENUS: the handles a surface carries, from its Euler characteristic. value max(0, 2 − euler). */
  static genus(euler_: number): CrossFormula { return c('topology-genus', 'genus(euler_) = max(0, 2 − euler_)', Math.max(0, 2 - euler_), nat(euler_), 'genus', [euler_]) }
  /** CONNECTIVITY: the paths that reach each node. value ⌊paths / nodes⌋. */
  static connectivity(paths: number, nodes: number): CrossFormula { return c('topology-connectivity', 'connectivity(paths, nodes) = ⌊paths / nodes⌋', nodes > 0 ? Math.floor(paths / nodes) : 0, nat(paths, nodes) && nodes > 0, 'connectivity', [paths, nodes]) }
  /** BETTI NUMBER: cycles that are not boundaries. value max(0, cycles − boundaries). */
  static betti(cycles: number, boundaries: number): CrossFormula { return c('topology-betti', 'betti(cycles, boundaries) = max(0, cycles − boundaries)', Math.max(0, cycles - boundaries), nat(cycles, boundaries), 'betti', [cycles, boundaries]) }
  /** DIMENSION: the count of coordinates. value coordinates. */
  static dimension(coordinates: number): CrossFormula { return c('topology-dimension', 'dimension(coordinates) = coordinates', coordinates, nat(coordinates), 'dimension', [coordinates]) }
  /** HOMOLOGY: the kernel beyond the image. value max(0, kernel − image). */
  static homology(kernel: number, image: number): CrossFormula { return c('topology-homology', 'homology(kernel, image) = max(0, kernel − image)', Math.max(0, kernel - image), nat(kernel, image), 'homology', [kernel, image]) }
  /** NEIGHBORHOOD: the points within a radius. value points · radius. */
  static neighborhood(points: number, radius: number): CrossFormula { return c('topology-neighborhood', 'neighborhood(points, radius) = points · radius', points * radius, nat(points, radius), 'neighborhood', [points, radius]) }
  /** BOUNDARY: the interior's share of the closure, per hundred. value ⌊interior · 100 / closure⌋. */
  static boundary(interior: number, closure: number): CrossFormula { return c('topology-boundary', 'boundary(interior, closure) = ⌊interior · 100 / closure⌋', closure > 0 ? Math.floor((interior * 100) / closure) : 0, nat(interior, closure) && closure > 0 && interior <= closure, 'boundary', [interior, closure]) }
}

for (const name of ['betti', 'boundary', 'connectivity', 'dimension', 'euler', 'genus', 'homology', 'neighborhood'] as const)
  hexRegisterOf('topology', name, (TopologyFormulas[name] as (...x: unknown[]) => unknown).bind(TopologyFormulas))
