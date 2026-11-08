import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PolymerFormulas — 8 exact-integer formulas of the polymer domain, each at a hex address crossing to cross; develops the polymer leads. */

const PROOF = "polymer counts: chains(x, y) = x · y; molweight(x, y) = x · y; monomers(x, y) = x · y; crosslinks(x, y) = x / y; tg(x, y) = max(0, x − y); degree(x, y) = x / y; branches(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'polymer', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `polymer.${name}`, params })

export class PolymerFormulas {
  /** chains(x, y) = x · y. */
  static chains(x: number, y: number): CrossFormula { return f('polymer-chains', 'chains(x, y) = x · y', x * y, nat(x, y), 'chains', [x, y]) }
  /** molweight(x, y) = x · y. */
  static molweight(x: number, y: number): CrossFormula { return f('polymer-molweight', 'molweight(x, y) = x · y', x * y, nat(x, y), 'molweight', [x, y]) }
  /** monomers(x, y) = x · y. */
  static monomers(x: number, y: number): CrossFormula { return f('polymer-monomers', 'monomers(x, y) = x · y', x * y, nat(x, y), 'monomers', [x, y]) }
  /** crosslinks(x, y) = x / y. */
  static crosslinks(x: number, y: number): CrossFormula { return f('polymer-crosslinks', 'crosslinks(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'crosslinks', [x, y]) }
  /** tg(x, y) = max(0, x − y). */
  static tg(x: number, y: number): CrossFormula { return f('polymer-tg', 'tg(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'tg', [x, y]) }
  /** degree(x, y) = x / y. */
  static degree(x: number, y: number): CrossFormula { return f('polymer-degree', 'degree(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'degree', [x, y]) }
  /** branches(x, y) = x + y. */
  static branches(x: number, y: number): CrossFormula { return f('polymer-branches', 'branches(x, y) = x + y', x + y, nat(x, y), 'branches', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('polymer-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['branches', 'chains', 'combos', 'crosslinks', 'degree', 'molweight', 'monomers', 'tg'] as const)
  hexRegisterOf('polymer', name, (PolymerFormulas[name] as (...x: unknown[]) => unknown).bind(PolymerFormulas))
