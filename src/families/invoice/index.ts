import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** InvoiceFormulas — 8 exact-integer formulas of the invoice domain, each at a hex address crossing to cross; develops the invoice leads. */

const PROOF = "invoice counts: subtotal(x, y) = x · y; tax(x, y) = x · 100 / y; total(x, y) = x + y; lineitems(x, y) = x + y; discount(x, y) = x · 100 / y; duedays(x, y) = x + y; overdue(x, y) = max(0, x − y); combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'invoice', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `invoice.${name}`, params })

export class InvoiceFormulas {
  /** subtotal(x, y) = x · y. */
  static subtotal(x: number, y: number): CrossFormula { return f('invoice-subtotal', 'subtotal(x, y) = x · y', x * y, nat(x, y), 'subtotal', [x, y]) }
  /** tax(x, y) = x · 100 / y. */
  static tax(x: number, y: number): CrossFormula { return f('invoice-tax', 'tax(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'tax', [x, y]) }
  /** total(x, y) = x + y. */
  static total(x: number, y: number): CrossFormula { return f('invoice-total', 'total(x, y) = x + y', x + y, nat(x, y), 'total', [x, y]) }
  /** lineitems(x, y) = x + y. */
  static lineitems(x: number, y: number): CrossFormula { return f('invoice-lineitems', 'lineitems(x, y) = x + y', x + y, nat(x, y), 'lineitems', [x, y]) }
  /** discount(x, y) = x · 100 / y. */
  static discount(x: number, y: number): CrossFormula { return f('invoice-discount', 'discount(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'discount', [x, y]) }
  /** duedays(x, y) = x + y. */
  static duedays(x: number, y: number): CrossFormula { return f('invoice-duedays', 'duedays(x, y) = x + y', x + y, nat(x, y), 'duedays', [x, y]) }
  /** overdue(x, y) = max(0, x − y). */
  static overdue(x: number, y: number): CrossFormula { return f('invoice-overdue', 'overdue(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'overdue', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('invoice-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'discount', 'duedays', 'lineitems', 'overdue', 'subtotal', 'tax', 'total'] as const)
  hexRegisterOf('invoice', name, (InvoiceFormulas[name] as (...x: unknown[]) => unknown).bind(InvoiceFormulas))
