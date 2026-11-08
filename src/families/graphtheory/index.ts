import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRAPHTHEORY — THE SHAPE OF A NETWORK, AS ARITHMETIC. A graph is counted: the edges a complete graph holds, how dense it
 *  is, the average degree, the handshake sum, the edges a spanning tree needs, the components a forest splits into, the edges
 *  a planar drawing allows, and the independent cycles it carries. Crosses to `algebra` — counting a graph is algebra on its
 *  incidences. A measure. */

const PROOF = 'graphtheory arithmetic (complete-graph edges, density, average degree, handshake sum, tree edges, forest components, planar bound, cyclomatic number); a measure crossed to algebra'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'graphtheory', dst: 'algebra', formula, value, proof: PROOF, ...extra }, holds, { name: `graphtheory.${name}`, params })

export class GraphtheoryFormulas {
  /** COMPLETE-GRAPH EDGES: the edges K_n holds. value n · (n − 1) / 2. */
  static edges(n: number): CrossFormula { return c('graphtheory-edges', 'edges(n) = n · (n − 1) / 2', Math.floor((n * Math.max(0, n - 1)) / 2), nat(n), 'edges', [n]) }
  /** DENSITY as a percentage of the complete graph. value ⌊2 · edges · 100 / (n · (n − 1))⌋. */
  static density(edges: number, n: number): CrossFormula { return c('graphtheory-density', 'density(edges, n) = ⌊2 · edges · 100 / (n · (n − 1))⌋', n * (n - 1) > 0 ? Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(edges, n) && n > 1, 'density', [edges, n]) }
  /** AVERAGE DEGREE: twice the edges over the nodes. value ⌊2 · edges / n⌋. */
  static degree(edges: number, n: number): CrossFormula { return c('graphtheory-degree', 'degree(edges, n) = ⌊2 · edges / n⌋', n > 0 ? Math.floor((2 * edges) / n) : 0, nat(edges, n) && n > 0, 'degree', [edges, n]) }
  /** HANDSHAKE SUM: the degrees of every vertex add to twice the edges. value 2 · edges. */
  static handshake(edges: number): CrossFormula { return c('graphtheory-handshake', 'handshake(edges) = 2 · edges', 2 * edges, nat(edges), 'handshake', [edges]) }
  /** TREE EDGES: a spanning tree on n nodes. value max(0, n − 1). */
  static treeedges(n: number): CrossFormula { return c('graphtheory-treeedges', 'treeedges(n) = max(0, n − 1)', Math.max(0, n - 1), nat(n), 'treeedges', [n]) }
  /** FOREST COMPONENTS: nodes less edges in an acyclic graph. value max(0, nodes − edges). */
  static components(nodes: number, edges: number): CrossFormula { return c('graphtheory-components', 'components(nodes, edges) = max(0, nodes − edges)', Math.max(0, nodes - edges), nat(nodes, edges) && edges <= nodes, 'components', [nodes, edges]) }
  /** PLANAR BOUND: the most edges a planar graph on n nodes allows. value max(0, 3 · n − 6). */
  static planaredges(n: number): CrossFormula { return c('graphtheory-planaredges', 'planaredges(n) = max(0, 3 · n − 6)', Math.max(0, 3 * n - 6), nat(n), 'planaredges', [n]) }
  /** CYCLOMATIC NUMBER: the independent cycles a graph carries. value max(0, edges − nodes + components). */
  static cyclomatic(edges: number, nodes: number, components: number): CrossFormula { return c('graphtheory-cyclomatic', 'cyclomatic(edges, nodes, components) = max(0, edges − nodes + components)', Math.max(0, edges - nodes + components), nat(edges, nodes, components), 'cyclomatic', [edges, nodes, components]) }
}

for (const name of ['components', 'cyclomatic', 'degree', 'density', 'edges', 'handshake', 'planaredges', 'treeedges'] as const)
  hexRegisterOf('graphtheory', name, (GraphtheoryFormulas[name] as (...x: unknown[]) => unknown).bind(GraphtheoryFormulas))
