import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LedgerFormulas — 8 exact-integer formulas of the ledger domain, each at a hex address crossing to cross; develops the ledger leads. */

const PROOF = "ledger counts: debits(x, y) = x · y; credits(x, y) = x · y; balance(x, y) = max(0, x − y); accounts(x, y) = x + y; entries(x, y) = x · y; periods(x, y) = x + y; reconciled(x, y) = x · 100 / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'ledger', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `ledger.${name}`, params })

export class LedgerFormulas {
  /** debits(x, y) = x · y. */
  static debits(x: number, y: number): CrossFormula { return f('ledger-debits', 'debits(x, y) = x · y', x * y, nat(x, y), 'debits', [x, y]) }
  /** credits(x, y) = x · y. */
  static credits(x: number, y: number): CrossFormula { return f('ledger-credits', 'credits(x, y) = x · y', x * y, nat(x, y), 'credits', [x, y]) }
  /** balance(x, y) = max(0, x − y). */
  static balance(x: number, y: number): CrossFormula { return f('ledger-balance', 'balance(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'balance', [x, y]) }
  /** accounts(x, y) = x + y. */
  static accounts(x: number, y: number): CrossFormula { return f('ledger-accounts', 'accounts(x, y) = x + y', x + y, nat(x, y), 'accounts', [x, y]) }
  /** entries(x, y) = x · y. */
  static entries(x: number, y: number): CrossFormula { return f('ledger-entries', 'entries(x, y) = x · y', x * y, nat(x, y), 'entries', [x, y]) }
  /** periods(x, y) = x + y. */
  static periods(x: number, y: number): CrossFormula { return f('ledger-periods', 'periods(x, y) = x + y', x + y, nat(x, y), 'periods', [x, y]) }
  /** reconciled(x, y) = x · 100 / y. */
  static reconciled(x: number, y: number): CrossFormula { return f('ledger-reconciled', 'reconciled(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'reconciled', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('ledger-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['accounts', 'balance', 'combos', 'credits', 'debits', 'entries', 'periods', 'reconciled'] as const)
  hexRegisterOf('ledger', name, (LedgerFormulas[name] as (...x: unknown[]) => unknown).bind(LedgerFormulas))
