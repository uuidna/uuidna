import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EquityFormulas — 8 exact-integer formulas of the equity domain, each at a hex address crossing to cross; develops the equity leads. */

const PROOF = "equity counts: shares(x, y) = x · y; eps(x, y) = x / y; pe(x, y) = x / y; marketcap(x, y) = x · y; dividendyield(x, y) = x · 100 / y; float(x, y) = x · 100 / y; classes(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'equity', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `equity.${name}`, params })

export class EquityFormulas {
  /** shares(x, y) = x · y. */
  static shares(x: number, y: number): CrossFormula { return f('equity-shares', 'shares(x, y) = x · y', x * y, nat(x, y), 'shares', [x, y]) }
  /** eps(x, y) = x / y. */
  static eps(x: number, y: number): CrossFormula { return f('equity-eps', 'eps(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'eps', [x, y]) }
  /** pe(x, y) = x / y. */
  static pe(x: number, y: number): CrossFormula { return f('equity-pe', 'pe(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'pe', [x, y]) }
  /** marketcap(x, y) = x · y. */
  static marketcap(x: number, y: number): CrossFormula { return f('equity-marketcap', 'marketcap(x, y) = x · y', x * y, nat(x, y), 'marketcap', [x, y]) }
  /** dividendyield(x, y) = x · 100 / y. */
  static dividendyield(x: number, y: number): CrossFormula { return f('equity-dividendyield', 'dividendyield(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'dividendyield', [x, y]) }
  /** float(x, y) = x · 100 / y. */
  static float(x: number, y: number): CrossFormula { return f('equity-float', 'float(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'float', [x, y]) }
  /** classes(x, y) = x + y. */
  static classes(x: number, y: number): CrossFormula { return f('equity-classes', 'classes(x, y) = x + y', x + y, nat(x, y), 'classes', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('equity-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['classes', 'combos', 'dividendyield', 'eps', 'float', 'marketcap', 'pe', 'shares'] as const)
  hexRegisterOf('equity', name, (EquityFormulas[name] as (...x: unknown[]) => unknown).bind(EquityFormulas))
