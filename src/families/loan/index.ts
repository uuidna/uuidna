import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LoanFormulas — 8 exact-integer formulas of the loan domain, each at a hex address crossing to cross; develops the loan leads. */

const PROOF = "loan counts: principal(x, y) = x · y; interest(x, y) = x · 100 / y; payment(x, y) = x / y; term(x, y) = x · y; ltv(x, y) = x · 100 / y; amortization(x, y) = x / y; points(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'loan', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `loan.${name}`, params })

export class LoanFormulas {
  /** principal(x, y) = x · y. */
  static principal(x: number, y: number): CrossFormula { return f('loan-principal', 'principal(x, y) = x · y', x * y, nat(x, y), 'principal', [x, y]) }
  /** interest(x, y) = x · 100 / y. */
  static interest(x: number, y: number): CrossFormula { return f('loan-interest', 'interest(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'interest', [x, y]) }
  /** payment(x, y) = x / y. */
  static payment(x: number, y: number): CrossFormula { return f('loan-payment', 'payment(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'payment', [x, y]) }
  /** term(x, y) = x · y. */
  static term(x: number, y: number): CrossFormula { return f('loan-term', 'term(x, y) = x · y', x * y, nat(x, y), 'term', [x, y]) }
  /** ltv(x, y) = x · 100 / y. */
  static ltv(x: number, y: number): CrossFormula { return f('loan-ltv', 'ltv(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ltv', [x, y]) }
  /** amortization(x, y) = x / y. */
  static amortization(x: number, y: number): CrossFormula { return f('loan-amortization', 'amortization(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'amortization', [x, y]) }
  /** points(x, y) = x + y. */
  static points(x: number, y: number): CrossFormula { return f('loan-points', 'points(x, y) = x + y', x + y, nat(x, y), 'points', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('loan-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['amortization', 'combos', 'interest', 'ltv', 'payment', 'points', 'principal', 'term'] as const)
  hexRegisterOf('loan', name, (LoanFormulas[name] as (...x: unknown[]) => unknown).bind(LoanFormulas))
