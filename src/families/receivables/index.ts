import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RECEIVABLES — MONEY OWED, AS ARITHMETIC (what a ledger is still waiting to collect). Open invoices are numbers: how
 *  fast they turn over, the days they stay outstanding, the overdue amount once current is taken off, the share written
 *  off as bad debt, the collection rate, the balance still outstanding, the advance a factor pays, and the early-pay
 *  discount the terms grant. Crosses to `accounting` — receivables are an entry the ledger carries. A measure. */

const PROOF = 'receivables arithmetic (turnover, days sales outstanding, aging, bad debt, collection rate, outstanding balance, factoring advance, early-pay terms); money owed the ledger has yet to collect; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'receivables', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `receivables.${name}`, params })

export class ReceivablesFormulas {
  /** TURNOVER: credit sales over the average receivables carried. value ⌊sales / avg⌋. */
  static turnover(sales: number, avg: number): CrossFormula { return c('receivables-turnover', 'turnover(sales, avg) = ⌊sales / avg⌋', avg > 0 ? Math.floor(sales / avg) : 0, nat(sales, avg) && avg > 0, 'turnover', [sales, avg]) }
  /** DAYS SALES OUTSTANDING: receivables as days of a year's sales. value ⌊receivables · 365 / sales⌋. */
  static dso(receivables: number, sales: number): CrossFormula { return c('receivables-dso', 'dso(receivables, sales) = ⌊receivables · 365 / sales⌋', sales > 0 ? Math.floor((receivables * 365) / sales) : 0, nat(receivables, sales) && sales > 0, 'dso', [receivables, sales]) }
  /** AGING: the overdue amount once the current balance is taken off the total. value max(0, total − current). */
  static aging(total: number, current: number): CrossFormula { return c('receivables-aging', 'aging(total, current) = max(0, total − current)', Math.max(0, total - current), nat(total, current), 'aging', [total, current]) }
  /** BAD DEBT: the share of receivables written off at a percent rate. value ⌊receivables · rate / 100⌋. */
  static baddebt(receivables: number, rate: number): CrossFormula { return c('receivables-baddebt', 'baddebt(receivables, rate) = ⌊receivables · rate / 100⌋', Math.floor((receivables * rate) / 100), nat(receivables, rate), 'baddebt', [receivables, rate]) }
  /** COLLECTION: the percent of what was billed that was collected. value ⌊collected · 100 / billed⌋. */
  static collection(collected: number, billed: number): CrossFormula { return c('receivables-collection', 'collection(collected, billed) = ⌊collected · 100 / billed⌋', billed > 0 ? Math.floor((collected * 100) / billed) : 0, nat(collected, billed) && billed > 0 && collected <= billed, 'collection', [collected, billed]) }
  /** OUTSTANDING: the balance still owed once collections are taken off what was billed. value max(0, billed − collected). */
  static outstanding(billed: number, collected: number): CrossFormula { return c('receivables-outstanding', 'outstanding(billed, collected) = max(0, billed − collected)', Math.max(0, billed - collected), nat(billed, collected), 'outstanding', [billed, collected]) }
  /** FACTORING: the advance a factor pays against an invoice at a percent rate. value ⌊invoice · rate / 100⌋. */
  static factoring(invoice: number, rate: number): CrossFormula { return c('receivables-factoring', 'factoring(invoice, rate) = ⌊invoice · rate / 100⌋', Math.floor((invoice * rate) / 100), nat(invoice, rate) && rate <= 100, 'factoring', [invoice, rate]) }
  /** TERMS: the early-pay discount the terms grant on an amount. value ⌊amount · discount / 100⌋. */
  static terms(amount: number, discount: number): CrossFormula { return c('receivables-terms', 'terms(amount, discount) = ⌊amount · discount / 100⌋', Math.floor((amount * discount) / 100), nat(amount, discount) && discount <= 100, 'terms', [amount, discount]) }
}

for (const name of ['aging', 'baddebt', 'collection', 'dso', 'factoring', 'outstanding', 'terms', 'turnover'] as const)
  hexRegisterOf('receivables', name, (ReceivablesFormulas[name] as (...x: unknown[]) => unknown).bind(ReceivablesFormulas))
