import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BudgetFormulas — 8 exact-integer formulas of the budget domain, each at a hex address crossing to cross; develops the budget leads. */

const PROOF = "budget counts: allocated(x, y) = x · y; spent(x, y) = max(0, x − y); variance(x, y) = max(0, x − y); categories(x, y) = x + y; surplus(x, y) = max(0, x − y); utilization(x, y) = x · 100 / y; quarters(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'budget', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `budget.${name}`, params })

export class BudgetFormulas {
  /** allocated(x, y) = x · y. */
  static allocated(x: number, y: number): CrossFormula { return f('budget-allocated', 'allocated(x, y) = x · y', x * y, nat(x, y), 'allocated', [x, y]) }
  /** spent(x, y) = max(0, x − y). */
  static spent(x: number, y: number): CrossFormula { return f('budget-spent', 'spent(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'spent', [x, y]) }
  /** variance(x, y) = max(0, x − y). */
  static variance(x: number, y: number): CrossFormula { return f('budget-variance', 'variance(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'variance', [x, y]) }
  /** categories(x, y) = x + y. */
  static categories(x: number, y: number): CrossFormula { return f('budget-categories', 'categories(x, y) = x + y', x + y, nat(x, y), 'categories', [x, y]) }
  /** surplus(x, y) = max(0, x − y). */
  static surplus(x: number, y: number): CrossFormula { return f('budget-surplus', 'surplus(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'surplus', [x, y]) }
  /** utilization(x, y) = x · 100 / y. */
  static utilization(x: number, y: number): CrossFormula { return f('budget-utilization', 'utilization(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'utilization', [x, y]) }
  /** quarters(x, y) = x + y. */
  static quarters(x: number, y: number): CrossFormula { return f('budget-quarters', 'quarters(x, y) = x + y', x + y, nat(x, y), 'quarters', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('budget-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['allocated', 'categories', 'combos', 'quarters', 'spent', 'surplus', 'utilization', 'variance'] as const)
  hexRegisterOf('budget', name, (BudgetFormulas[name] as (...x: unknown[]) => unknown).bind(BudgetFormulas))
