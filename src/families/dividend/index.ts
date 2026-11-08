import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DividendFormulas — 8 exact-integer formulas of the dividend domain, each at a hex address crossing to cross; develops the dividend leads. */

const PROOF = "dividend counts: pershare(x, y) = x · y; payout(x, y) = x · 100 / y; yield(x, y) = x · 100 / y; frequency(x, y) = x + y; total(x, y) = x · y; growth(x, y) = x · 100 / y; exdates(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'dividend', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `dividend.${name}`, params })

export class DividendFormulas {
  /** pershare(x, y) = x · y. */
  static pershare(x: number, y: number): CrossFormula { return f('dividend-pershare', 'pershare(x, y) = x · y', x * y, nat(x, y), 'pershare', [x, y]) }
  /** payout(x, y) = x · 100 / y. */
  static payout(x: number, y: number): CrossFormula { return f('dividend-payout', 'payout(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'payout', [x, y]) }
  /** yield(x, y) = x · 100 / y. */
  static yield(x: number, y: number): CrossFormula { return f('dividend-yield', 'yield(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yield', [x, y]) }
  /** frequency(x, y) = x + y. */
  static frequency(x: number, y: number): CrossFormula { return f('dividend-frequency', 'frequency(x, y) = x + y', x + y, nat(x, y), 'frequency', [x, y]) }
  /** total(x, y) = x · y. */
  static total(x: number, y: number): CrossFormula { return f('dividend-total', 'total(x, y) = x · y', x * y, nat(x, y), 'total', [x, y]) }
  /** growth(x, y) = x · 100 / y. */
  static growth(x: number, y: number): CrossFormula { return f('dividend-growth', 'growth(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'growth', [x, y]) }
  /** exdates(x, y) = x + y. */
  static exdates(x: number, y: number): CrossFormula { return f('dividend-exdates', 'exdates(x, y) = x + y', x + y, nat(x, y), 'exdates', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('dividend-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'exdates', 'frequency', 'growth', 'payout', 'pershare', 'total', 'yield'] as const)
  hexRegisterOf('dividend', name, (DividendFormulas[name] as (...x: unknown[]) => unknown).bind(DividendFormulas))
