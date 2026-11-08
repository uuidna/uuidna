import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PAYMENT — PROCESSING A TRANSACTION, AS ARITHMETIC (chosen by the registry). A payment is numbers: the processing fee
 *  in basis points, the chargeback rate, net settlement, interchange, a currency conversion, the payout after a reserve,
 *  the decline rate, and an authorization hold. Crosses to `accounting` — a payment books to the ledger. A measure. */

const PROOF = 'payment arithmetic (processing fee in bps, chargeback rate, net settlement, interchange, FX conversion, payout net of reserve, decline rate, authorization hold); a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const p = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'payment', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `payment.${name}`, params })

export class PaymentFormulas {
  /** THE PROCESSING FEE in basis points of the amount. value ⌊amount · bps / 10000⌋. */
  static fee(amount: number, bps: number): CrossFormula { return p('payment-fee', 'fee(amount, bps) = ⌊amount · bps / 10000⌋', Math.floor((amount * bps) / 10000), nat(amount, bps), 'fee', [amount, bps]) }
  /** THE CHARGEBACK RATE as a percentage: disputed over total. value ⌊disputed · 100 / total⌋. */
  static chargeback(disputed: number, total: number): CrossFormula { return p('payment-chargeback', 'chargeback(disputed, total) = ⌊disputed · 100 / total⌋', total > 0 ? Math.floor((disputed * 100) / total) : 0, nat(disputed, total) && total > 0 && disputed <= total, 'chargeback', [disputed, total]) }
  /** NET SETTLEMENT: the gross less fees withheld. value max(0, gross − fees). */
  static settlement(gross: number, fees: number): CrossFormula { return p('payment-settlement', 'settlement(gross, fees) = max(0, gross − fees)', Math.max(0, gross - fees), nat(gross, fees), 'settlement', [gross, fees]) }
  /** INTERCHANGE at `pct`% of the amount. value ⌊amount · pct / 100⌋. */
  static interchange(amount: number, pct: number): CrossFormula { return p('payment-interchange', 'interchange(amount, pct) = ⌊amount · pct / 100⌋', Math.floor((amount * pct) / 100), nat(amount, pct) && pct <= 100, 'interchange', [amount, pct]) }
  /** A CURRENCY CONVERSION at a rate scaled by 10000. value ⌊amount · rate / 10000⌋. */
  static fx(amount: number, rate: number): CrossFormula { return p('payment-fx', 'fx(amount, rate) = ⌊amount · rate / 10000⌋', Math.floor((amount * rate) / 10000), nat(amount, rate), 'fx', [amount, rate]) }
  /** THE PAYOUT after a rolling reserve is withheld. value max(0, balance − reserve). */
  static payout(balance: number, reserve: number): CrossFormula { return p('payment-payout', 'payout(balance, reserve) = max(0, balance − reserve)', Math.max(0, balance - reserve), nat(balance, reserve), 'payout', [balance, reserve]) }
  /** THE DECLINE RATE as a percentage: declined over attempts. value ⌊declined · 100 / attempts⌋. */
  static decline(declined: number, attempts: number): CrossFormula { return p('payment-decline', 'decline(declined, attempts) = ⌊declined · 100 / attempts⌋', attempts > 0 ? Math.floor((declined * 100) / attempts) : 0, nat(declined, attempts) && attempts > 0 && declined <= attempts, 'decline', [declined, attempts]) }
  /** AN AUTHORIZATION HOLD: the amount captured, never above the hold. value min(amount, hold). */
  static authorization(amount: number, hold: number): CrossFormula { return p('payment-authorization', 'authorization(amount, hold) = min(amount, hold)', Math.min(amount, hold), nat(amount, hold), 'authorization', [amount, hold]) }
}

for (const name of ['authorization', 'chargeback', 'decline', 'fee', 'fx', 'interchange', 'payout', 'settlement'] as const)
  hexRegisterOf('payment', name, (PaymentFormulas[name] as (...x: unknown[]) => unknown).bind(PaymentFormulas))
