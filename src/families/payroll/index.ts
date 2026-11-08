import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PayrollFormulas — 8 exact-integer formulas of the payroll domain, each at a hex address crossing to cross; develops the payroll leads. */

const PROOF = "payroll counts: gross(x, y) = x · y; net(x, y) = max(0, x − y); withholding(x, y) = x · 100 / y; employees(x, y) = x · y; overtime(x, y) = x · y; deductions(x, y) = x + y; periods(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'payroll', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `payroll.${name}`, params })

export class PayrollFormulas {
  /** gross(x, y) = x · y. */
  static gross(x: number, y: number): CrossFormula { return f('payroll-gross', 'gross(x, y) = x · y', x * y, nat(x, y), 'gross', [x, y]) }
  /** net(x, y) = max(0, x − y). */
  static net(x: number, y: number): CrossFormula { return f('payroll-net', 'net(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'net', [x, y]) }
  /** withholding(x, y) = x · 100 / y. */
  static withholding(x: number, y: number): CrossFormula { return f('payroll-withholding', 'withholding(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'withholding', [x, y]) }
  /** employees(x, y) = x · y. */
  static employees(x: number, y: number): CrossFormula { return f('payroll-employees', 'employees(x, y) = x · y', x * y, nat(x, y), 'employees', [x, y]) }
  /** overtime(x, y) = x · y. */
  static overtime(x: number, y: number): CrossFormula { return f('payroll-overtime', 'overtime(x, y) = x · y', x * y, nat(x, y), 'overtime', [x, y]) }
  /** deductions(x, y) = x + y. */
  static deductions(x: number, y: number): CrossFormula { return f('payroll-deductions', 'deductions(x, y) = x + y', x + y, nat(x, y), 'deductions', [x, y]) }
  /** periods(x, y) = x + y. */
  static periods(x: number, y: number): CrossFormula { return f('payroll-periods', 'periods(x, y) = x + y', x + y, nat(x, y), 'periods', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('payroll-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'deductions', 'employees', 'gross', 'net', 'overtime', 'periods', 'withholding'] as const)
  hexRegisterOf('payroll', name, (PayrollFormulas[name] as (...x: unknown[]) => unknown).bind(PayrollFormulas))
