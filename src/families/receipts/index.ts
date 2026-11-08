import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RECEIPTS — scaffolded integer measures crossed to accounting. Every output an exact finite nonnegative integer. */

const PROOF = 'receipts arithmetic (total, linepairs, taxamount, subtotal, itemcount, orderings, discountpct, chainlength); scaffolded from the integer-op palette; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'receipts', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `receipts.${name}`, params })

export class ReceiptsFormulas {
  static total(x: number, y: number): CrossFormula { return c('receipts-total', 'total(x, y) = x · y', x * y, nat(x, y), 'total', [x, y]) }
  static linepairs(x: number, y: number): CrossFormula { return c('receipts-linepairs', 'linepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'linepairs', [x, y]) }
  static taxamount(x: number, y: number): CrossFormula { return c('receipts-taxamount', 'taxamount(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'taxamount', [x, y]) }
  static subtotal(x: number, y: number): CrossFormula { return c('receipts-subtotal', 'subtotal(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'subtotal', [x, y]) }
  static itemcount(x: number, y: number): CrossFormula { return c('receipts-itemcount', 'itemcount(x, y) = x + y', x + y, nat(x, y), 'itemcount', [x, y]) }
  static orderings(x: number): CrossFormula { return c('receipts-orderings', 'orderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'orderings', [x]) }
  static discountpct(x: number, y: number): CrossFormula { return c('receipts-discountpct', 'discountpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'discountpct', [x, y]) }
  static chainlength(x: number, y: number): CrossFormula { return c('receipts-chainlength', 'chainlength(x, y) = x · y', x * y, nat(x, y), 'chainlength', [x, y]) }
}

for (const name of ['chainlength', 'discountpct', 'itemcount', 'linepairs', 'orderings', 'subtotal', 'taxamount', 'total'] as const)
  hexRegisterOf('receipts', name, (ReceiptsFormulas[name] as (...x: unknown[]) => unknown).bind(ReceiptsFormulas))
