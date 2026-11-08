import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SortFormulas — 8 exact-integer formulas of the sort domain, each at a hex address crossing to cross; develops the sort leads. */

const PROOF = "sort counts: comparisons(x, y) = x · y; swaps(x, y) = x / y; passes(x, y) = x / y; merges(x, y) = x / y; partitions(x) = 2^x; runs(x, y) = x + y; depth(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'sort', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `sort.${name}`, params })

export class SortFormulas {
  /** comparisons(x, y) = x · y. */
  static comparisons(x: number, y: number): CrossFormula { return f('sort-comparisons', 'comparisons(x, y) = x · y', x * y, nat(x, y), 'comparisons', [x, y]) }
  /** swaps(x, y) = x / y. */
  static swaps(x: number, y: number): CrossFormula { return f('sort-swaps', 'swaps(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'swaps', [x, y]) }
  /** passes(x, y) = x / y. */
  static passes(x: number, y: number): CrossFormula { return f('sort-passes', 'passes(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'passes', [x, y]) }
  /** merges(x, y) = x / y. */
  static merges(x: number, y: number): CrossFormula { return f('sort-merges', 'merges(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'merges', [x, y]) }
  /** partitions(x) = 2^x. */
  static partitions(x: number): CrossFormula { return f('sort-partitions', 'partitions(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'partitions', [x]) }
  /** runs(x, y) = x + y. */
  static runs(x: number, y: number): CrossFormula { return f('sort-runs', 'runs(x, y) = x + y', x + y, nat(x, y), 'runs', [x, y]) }
  /** depth(x, y) = x / y. */
  static depth(x: number, y: number): CrossFormula { return f('sort-depth', 'depth(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'depth', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('sort-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'comparisons', 'depth', 'merges', 'partitions', 'passes', 'runs', 'swaps'] as const)
  hexRegisterOf('sort', name, (SortFormulas[name] as (...x: unknown[]) => unknown).bind(SortFormulas))
