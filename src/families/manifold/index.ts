import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MANIFOLD — THE SHAPE OF SPACE, AS ARITHMETIC. A manifold is counted: its dimension, the genus of a surface, the Betti
 *  numbers that count holes, the Euler characteristic V − E + F, the charts an atlas needs, the boundary components, whether
 *  it is orientable, and the total rank of its homology. Crosses to `topology` — a manifold is topology made of numbers. A measure. */

const PROOF = 'manifold arithmetic (dimension, genus, Betti number, Euler characteristic, atlas charts, boundary components, orientability, homology rank); the shape of space counted; a measure crossed to topology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'manifold', dst: 'topology', formula, value, proof: PROOF, ...extra }, holds, { name: `manifold.${name}`, params })

export class ManifoldFormulas {
  /** DIMENSION of a submanifold: the ambient dimension less its codimension. value max(0, ambient − codim). */
  static dimension(ambient: number, codim: number): CrossFormula { return c('manifold-dimension', 'dimension(ambient, codim) = max(0, ambient − codim)', Math.max(0, ambient - codim), nat(ambient, codim), 'dimension', [ambient, codim]) }
  /** GENUS of a closed orientable surface from its Euler characteristic. value max(0, ⌊(2 − euler) / 2⌋). */
  static genus(euler: number): CrossFormula { return c('manifold-genus', 'genus(euler) = max(0, ⌊(2 − euler) / 2⌋)', Math.max(0, Math.floor((2 - euler) / 2)), nat(euler), 'genus', [euler]) }
  /** BETTI NUMBER: cycles that are not boundaries. value max(0, cycles − boundaries). */
  static bettinumber(cycles: number, boundaries: number): CrossFormula { return c('manifold-bettinumber', 'bettinumber(cycles, boundaries) = max(0, cycles − boundaries)', Math.max(0, cycles - boundaries), nat(cycles, boundaries), 'bettinumber', [cycles, boundaries]) }
  /** EULER CHARACTERISTIC: vertices minus edges plus faces. value max(0, v + f − e). */
  static eulercharacteristic(v: number, e: number, f: number): CrossFormula { return c('manifold-eulercharacteristic', 'eulercharacteristic(v, e, f) = max(0, v + f − e)', Math.max(0, v + f - e), nat(v, e, f), 'eulercharacteristic', [v, e, f]) }
  /** CHART COUNT: the charts an atlas needs to cover its points at a per-chart capacity. value ⌈points / perChart⌉. */
  static chartcount(points: number, perChart: number): CrossFormula { return c('manifold-chartcount', 'chartcount(points, perChart) = ⌈points / perChart⌉', perChart > 0 ? Math.ceil(points / perChart) : 0, nat(points, perChart) && perChart > 0, 'chartcount', [points, perChart]) }
  /** BOUNDARY COMPONENTS: the cells on the boundary, the interior removed. value max(0, cells − interior). */
  static boundarycomponents(cells: number, interior: number): CrossFormula { return c('manifold-boundarycomponents', 'boundarycomponents(cells, interior) = max(0, cells − interior)', Math.max(0, cells - interior), nat(cells, interior), 'boundarycomponents', [cells, interior]) }
  /** ORIENTABILITY: 1 when the surface carries no cross-caps. value [crosscaps = 0]. */
  static orientability(genus: number, crosscaps: number): CrossFormula { return c('manifold-orientability', 'orientability(genus, crosscaps) = [crosscaps = 0]', crosscaps === 0 ? 1 : 0, nat(genus, crosscaps), 'orientability', [genus, crosscaps]) }
  /** HOMOLOGY RANK: the total rank, the Betti numbers summed. value b0 + b1 + b2. */
  static homologyrank(b0: number, b1: number, b2: number): CrossFormula { return c('manifold-homologyrank', 'homologyrank(b0, b1, b2) = b0 + b1 + b2', b0 + b1 + b2, nat(b0, b1, b2), 'homologyrank', [b0, b1, b2]) }
}

for (const name of ['bettinumber', 'boundarycomponents', 'chartcount', 'dimension', 'eulercharacteristic', 'genus', 'homologyrank', 'orientability'] as const)
  hexRegisterOf('manifold', name, (ManifoldFormulas[name] as (...x: unknown[]) => unknown).bind(ManifoldFormulas))
