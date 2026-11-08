import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACCOUNTING — THE LEDGER, AND WHAT THE LEDGER OWES THE LAW. Double-entry is arithmetic: the books balance when debits
 *  equal credits; equity is assets less liabilities; net income is revenue less expenses; depreciation, ratios, accruals
 *  and tax are the rest. Each crosses to `law` — the ledger is what an audit, a tax authority or a court reads — closing
 *  the chain trading → accounting → law. Exact; a measure, not advice. */

const PROOF = 'double-entry and the ledger (balance, equity, net income, straight-line depreciation, margin, current ratio, accrued interest, tax) read by audit, tax and the court: accounting → law. A measure, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const a = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'accounting', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `accounting.${name}`, params })

export class AccountingFormulas {
  /** THE BOOKS BALANCE when debits equal credits (double-entry). value [debits = credits]. */
  static balance(debits: number, credits: number): CrossFormula { return a('accounting-balance', 'balance(debits, credits) = [debits = credits]', debits === credits ? 1 : 0, nat(debits, credits), 'balance', [debits, credits]) }
  /** OWNER'S EQUITY: assets less liabilities (may be negative — insolvency is a valid reading). value assets − liabilities. */
  static equity(assets: number, liabilities: number): CrossFormula { return a('accounting-equity', 'equity(assets, liabilities) = assets − liabilities', assets - liabilities, nat(assets, liabilities), 'equity', [assets, liabilities]) }
  /** NET INCOME: revenue less expenses (may be negative — a loss is a valid reading). value revenue − expenses. */
  static net(revenue: number, expenses: number): CrossFormula { return a('accounting-net', 'net(revenue, expenses) = revenue − expenses', revenue - expenses, nat(revenue, expenses), 'net', [revenue, expenses]) }
  /** STRAIGHT-LINE DEPRECIATION per period: (cost − salvage) over the useful life. value ⌊(cost − salvage) / life⌋. */
  static depreciation(cost: number, salvage: number, life: number): CrossFormula { return a('accounting-depreciation', 'depreciation(cost, salvage, life) = ⌊(cost − salvage) / life⌋', life > 0 && cost >= salvage ? Math.floor((cost - salvage) / life) : 0, nat(cost, salvage, life) && life > 0 && cost >= salvage, 'depreciation', [cost, salvage, life]) }
  /** PROFIT MARGIN as a percentage of revenue. value ⌊profit · 100 / revenue⌋. */
  static margin(profit: number, revenue: number): CrossFormula { return a('accounting-margin', 'margin(profit, revenue) = ⌊profit · 100 / revenue⌋', revenue > 0 ? Math.floor((profit * 100) / revenue) : 0, nat(profit, revenue) && revenue > 0, 'margin', [profit, revenue]) }
  /** CURRENT RATIO (×100): current assets over current liabilities. value ⌊assets · 100 / liabilities⌋. */
  static current(assets: number, liabilities: number): CrossFormula { return a('accounting-current', 'current(assets, liabilities) = ⌊assets · 100 / liabilities⌋', liabilities > 0 ? Math.floor((assets * 100) / liabilities) : 0, nat(assets, liabilities) && liabilities > 0, 'current', [assets, liabilities]) }
  /** ACCRUED INTEREST over `days` at `rate`% per annum (365-day year). value ⌊principal · rate · days / 36500⌋. */
  static accrue(principal: number, rate: number, days: number): CrossFormula { return a('accounting-accrue', 'accrue(principal, rate, days) = ⌊principal · rate · days / 36500⌋', Math.floor((principal * rate * days) / 36500), nat(principal, rate, days), 'accrue', [principal, rate, days]) }
  /** TAX on an amount at `pct`%. value ⌊amount · pct / 100⌋. */
  static tax(amount: number, pct: number): CrossFormula { return a('accounting-tax', 'tax(amount, pct) = ⌊amount · pct / 100⌋', Math.floor((amount * pct) / 100), nat(amount, pct) && pct <= 100, 'tax', [amount, pct]) }
}

for (const name of ['accrue', 'balance', 'current', 'depreciation', 'equity', 'margin', 'net', 'tax'] as const)
  hexRegisterOf('accounting', name, (AccountingFormulas[name] as (...x: unknown[]) => unknown).bind(AccountingFormulas))
