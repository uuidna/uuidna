import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TreeFormulas — 8 exact-integer formulas of the tree domain, each at a hex address crossing to cross; develops the tree leads. */

const PROOF = "tree counts: nodes(x, y) = max(0, x − y); height(x, y) = x / y; leaves(x) = 2^x; internal(x, y) = max(0, x − y); children(x, y) = x · y; paths(x, y) = x · y; depth(x, y) = x + y; subsets(x) = 2^x"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'tree', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `tree.${name}`, params })

export class TreeFormulas {
  /** nodes(x, y) = max(0, x − y). */
  static nodes(x: number, y: number): CrossFormula { return f('tree-nodes', 'nodes(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'nodes', [x, y]) }
  /** height(x, y) = x / y. */
  static height(x: number, y: number): CrossFormula { return f('tree-height', 'height(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'height', [x, y]) }
  /** leaves(x) = 2^x. */
  static leaves(x: number): CrossFormula { return f('tree-leaves', 'leaves(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'leaves', [x]) }
  /** internal(x, y) = max(0, x − y). */
  static internal(x: number, y: number): CrossFormula { return f('tree-internal', 'internal(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'internal', [x, y]) }
  /** children(x, y) = x · y. */
  static children(x: number, y: number): CrossFormula { return f('tree-children', 'children(x, y) = x · y', x * y, nat(x, y), 'children', [x, y]) }
  /** paths(x, y) = x · y. */
  static paths(x: number, y: number): CrossFormula { return f('tree-paths', 'paths(x, y) = x · y', x * y, nat(x, y), 'paths', [x, y]) }
  /** depth(x, y) = x + y. */
  static depth(x: number, y: number): CrossFormula { return f('tree-depth', 'depth(x, y) = x + y', x + y, nat(x, y), 'depth', [x, y]) }
  /** subsets(x) = 2^x. */
  static subsets(x: number): CrossFormula { return f('tree-subsets', 'subsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'subsets', [x]) }
}

for (const name of ['children', 'depth', 'height', 'internal', 'leaves', 'nodes', 'paths', 'subsets'] as const)
  hexRegisterOf('tree', name, (TreeFormulas[name] as (...x: unknown[]) => unknown).bind(TreeFormulas))
