import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PAYABLES — WHAT THE BUSINESS OWES, AS ARITHMETIC (chosen by the ledger registry, not by hand). Money owed is numbers:
 *  how many times a year the payables turn over, days payable outstanding, amount past due, the early-payment discount, the
 *  net balance, the accrued liability, each installment, and the days left in the terms. Crosses to `accounting` — payables
 *  is a line the ledger keeps. A measure. */

const PROOF = 'payables arithmetic (AP turnover, days payable outstanding, aging, early-pay discount, outstanding balance, accrual, settlement installment, terms remaining); a ledger line crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'payables', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `payables.${name}`, params })

export class PayablesFormulas {
  /** AP TURNOVER: purchases over the average payables. value ⌊purchases / avgPayables⌋. */
  static turnover(purchases: number, avgPayables: number): CrossFormula { return c('payables-turnover', 'turnover(purchases, avgPayables) = ⌊purchases / avgPayables⌋', avgPayables > 0 ? Math.floor(purchases / avgPayables) : 0, nat(purchases, avgPayables) && avgPayables > 0, 'turnover', [purchases, avgPayables]) }
  /** DAYS PAYABLE OUTSTANDING: payables as days of cost of goods. value ⌊payables · 365 / cogs⌋. */
  static dpo(payables: number, cogs: number): CrossFormula { return c('payables-dpo', 'dpo(payables, cogs) = ⌊payables · 365 / cogs⌋', cogs > 0 ? Math.floor((payables * 365) / cogs) : 0, nat(payables, cogs) && cogs > 0, 'dpo', [payables, cogs]) }
  /** AGING: the amount still owed on an invoice. value max(0, invoiced − paid). */
  static aging(invoiced: number, paid: number): CrossFormula { return c('payables-aging', 'aging(invoiced, paid) = max(0, invoiced − paid)', Math.max(0, invoiced - paid), nat(invoiced, paid), 'aging', [invoiced, paid]) }
  /** EARLY-PAY DISCOUNT: a percentage off the amount. value ⌊amount · pct / 100⌋. */
  static discount(amount: number, pct: number): CrossFormula { return c('payables-discount', 'discount(amount, pct) = ⌊amount · pct / 100⌋', Math.floor((amount * pct) / 100), nat(amount, pct), 'discount', [amount, pct]) }
  /** OUTSTANDING: the net balance after credits. value max(0, gross − credits). */
  static outstanding(gross: number, credits: number): CrossFormula { return c('payables-outstanding', 'outstanding(gross, credits) = max(0, gross − credits)', Math.max(0, gross - credits), nat(gross, credits), 'outstanding', [gross, credits]) }
  /** ACCRUAL: a daily liability over days. value daily · days. */
  static accrual(daily: number, days: number): CrossFormula { return c('payables-accrual', 'accrual(daily, days) = daily · days', daily * days, nat(daily, days), 'accrual', [daily, days]) }
  /** SETTLEMENT: the per-installment payment. value ⌈total / installments⌉. */
  static settlement(total: number, installments: number): CrossFormula { return c('payables-settlement', 'settlement(total, installments) = ⌈total / installments⌉', installments > 0 ? Math.ceil(total / installments) : 0, nat(total, installments) && installments > 0, 'settlement', [total, installments]) }
  /** TERMS: the days left before the net term is due. value max(0, net − elapsed). */
  static terms(net: number, elapsed: number): CrossFormula { return c('payables-terms', 'terms(net, elapsed) = max(0, net − elapsed)', Math.max(0, net - elapsed), nat(net, elapsed), 'terms', [net, elapsed]) }
}

for (const name of ['accrual', 'aging', 'discount', 'dpo', 'outstanding', 'settlement', 'terms', 'turnover'] as const)
  hexRegisterOf('payables', name, (PayablesFormulas[name] as (...x: unknown[]) => unknown).bind(PayablesFormulas))
