import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BondFormulas — 8 exact-integer formulas of the bond domain, each at a hex address crossing to cross; develops the bond leads. */

const PROOF = "bond counts: coupon(x, y) = x · 100 / y; facevalue(x, y) = x · y; yield(x, y) = x · 100 / y; maturity(x, y) = x + y; duration(x, y) = x / y; payments(x, y) = x · y; rating(x, y) = max(0, x − y); combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'bond', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `bond.${name}`, params })

export class BondFormulas {
  /** coupon(x, y) = x · 100 / y. */
  static coupon(x: number, y: number): CrossFormula { return f('bond-coupon', 'coupon(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coupon', [x, y]) }
  /** facevalue(x, y) = x · y. */
  static facevalue(x: number, y: number): CrossFormula { return f('bond-facevalue', 'facevalue(x, y) = x · y', x * y, nat(x, y), 'facevalue', [x, y]) }
  /** yield(x, y) = x · 100 / y. */
  static yield(x: number, y: number): CrossFormula { return f('bond-yield', 'yield(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yield', [x, y]) }
  /** maturity(x, y) = x + y. */
  static maturity(x: number, y: number): CrossFormula { return f('bond-maturity', 'maturity(x, y) = x + y', x + y, nat(x, y), 'maturity', [x, y]) }
  /** duration(x, y) = x / y. */
  static duration(x: number, y: number): CrossFormula { return f('bond-duration', 'duration(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'duration', [x, y]) }
  /** payments(x, y) = x · y. */
  static payments(x: number, y: number): CrossFormula { return f('bond-payments', 'payments(x, y) = x · y', x * y, nat(x, y), 'payments', [x, y]) }
  /** rating(x, y) = max(0, x − y). */
  static rating(x: number, y: number): CrossFormula { return f('bond-rating', 'rating(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'rating', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('bond-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'coupon', 'duration', 'facevalue', 'maturity', 'payments', 'rating', 'yield'] as const)
  hexRegisterOf('bond', name, (BondFormulas[name] as (...x: unknown[]) => unknown).bind(BondFormulas))
