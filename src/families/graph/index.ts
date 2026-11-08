import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GraphFormulas — 8 exact-integer formulas of the graph domain, each at a hex address crossing to cross; develops the graph leads. */

const PROOF = "graph counts: edges(x, y) = C(x, y); degree(x, y) = x · y; paths(x, y) = x! / (x − y)!; components(x, y) = x + y; spanning(x, y) = max(0, x − y); density(x, y) = x · 100 / y; cliques(x) = 2^x; diameter(x, y) = x / y"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'graph', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `graph.${name}`, params })

export class GraphFormulas {
  /** edges(x, y) = C(x, y). */
  static edges(x: number, y: number): CrossFormula { return f('graph-edges', 'edges(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'edges', [x, y]) }
  /** degree(x, y) = x · y. */
  static degree(x: number, y: number): CrossFormula { return f('graph-degree', 'degree(x, y) = x · y', x * y, nat(x, y), 'degree', [x, y]) }
  /** paths(x, y) = x! / (x − y)!. */
  static paths(x: number, y: number): CrossFormula { return f('graph-paths', 'paths(x, y) = x! / (x − y)!', permOf(x, y), nat(x, y) && x <= 20 && y <= x, 'paths', [x, y]) }
  /** components(x, y) = x + y. */
  static components(x: number, y: number): CrossFormula { return f('graph-components', 'components(x, y) = x + y', x + y, nat(x, y), 'components', [x, y]) }
  /** spanning(x, y) = max(0, x − y). */
  static spanning(x: number, y: number): CrossFormula { return f('graph-spanning', 'spanning(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'spanning', [x, y]) }
  /** density(x, y) = x · 100 / y. */
  static density(x: number, y: number): CrossFormula { return f('graph-density', 'density(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'density', [x, y]) }
  /** cliques(x) = 2^x. */
  static cliques(x: number): CrossFormula { return f('graph-cliques', 'cliques(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'cliques', [x]) }
  /** diameter(x, y) = x / y. */
  static diameter(x: number, y: number): CrossFormula { return f('graph-diameter', 'diameter(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'diameter', [x, y]) }
}

for (const name of ['cliques', 'components', 'degree', 'density', 'diameter', 'edges', 'paths', 'spanning'] as const)
  hexRegisterOf('graph', name, (GraphFormulas[name] as (...x: unknown[]) => unknown).bind(GraphFormulas))
