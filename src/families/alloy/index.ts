import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AlloyFormulas — 8 exact-integer formulas of the alloy domain, each at a hex address crossing to cross; develops the alloy leads. */

const PROOF = "alloy counts: parts(x, y) = x + y; meltpoint(x, y) = max(0, x − y); hardness(x, y) = x · y; density(x, y) = x / y; ratio(x, y) = x · 100 / y; phases(x, y) = x + y; grains(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'alloy', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `alloy.${name}`, params })

export class AlloyFormulas {
  /** parts(x, y) = x + y. */
  static parts(x: number, y: number): CrossFormula { return f('alloy-parts', 'parts(x, y) = x + y', x + y, nat(x, y), 'parts', [x, y]) }
  /** meltpoint(x, y) = max(0, x − y). */
  static meltpoint(x: number, y: number): CrossFormula { return f('alloy-meltpoint', 'meltpoint(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'meltpoint', [x, y]) }
  /** hardness(x, y) = x · y. */
  static hardness(x: number, y: number): CrossFormula { return f('alloy-hardness', 'hardness(x, y) = x · y', x * y, nat(x, y), 'hardness', [x, y]) }
  /** density(x, y) = x / y. */
  static density(x: number, y: number): CrossFormula { return f('alloy-density', 'density(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'density', [x, y]) }
  /** ratio(x, y) = x · 100 / y. */
  static ratio(x: number, y: number): CrossFormula { return f('alloy-ratio', 'ratio(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) }
  /** phases(x, y) = x + y. */
  static phases(x: number, y: number): CrossFormula { return f('alloy-phases', 'phases(x, y) = x + y', x + y, nat(x, y), 'phases', [x, y]) }
  /** grains(x, y) = x · y. */
  static grains(x: number, y: number): CrossFormula { return f('alloy-grains', 'grains(x, y) = x · y', x * y, nat(x, y), 'grains', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('alloy-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'density', 'grains', 'hardness', 'meltpoint', 'parts', 'phases', 'ratio'] as const)
  hexRegisterOf('alloy', name, (AlloyFormulas[name] as (...x: unknown[]) => unknown).bind(AlloyFormulas))
