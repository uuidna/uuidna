import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONTRACT — THE MEASURES OF A BARGAIN AND ITS BREACH, ANY JURISDICTION. What a broken contract is worth is arithmetic
 *  over the numbers the parties agreed and the facts supply: the expectation net of what was received, the reliance spent,
 *  loss net of mitigation, liquidated damages per day, a deposit or penalty by percentage, restitution of a benefit, and
 *  whether a breach was cured in time. Exact and jurisdiction-agnostic; a measure crossing to the `law` family, advice
 *  only when law.reviewed confirms it true on the document. */

const PROOF = 'contract measures (expectation, reliance, mitigated loss, liquidated damages, deposit/penalty by percentage, restitution, the cure period); a measure crossed to law, advice only when reviewed true'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const k = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'contract', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `contract.${name}`, params })

export class ContractFormulas {
  /** EXPECTATION: the benefit of the bargain — what was promised net of what was received. value max(0, promised − received). */
  static expectation(promised: number, received: number): CrossFormula { return k('contract-expectation', 'expectation(promised, received) = max(0, promised − received)', Math.max(0, promised - received), nat(promised, received), 'expectation', [promised, received]) }
  /** MITIGATED LOSS: the loss the innocent party could not avoid. value max(0, loss − avoided). */
  static mitigation(loss: number, avoided: number): CrossFormula { return k('contract-mitigation', 'mitigation(loss, avoided) = max(0, loss − avoided)', Math.max(0, loss - avoided), nat(loss, avoided), 'mitigation', [loss, avoided]) }
  /** RELIANCE: what was spent in reliance on the promise, recoverable when expectation cannot be shown — the promised value was not proved. value spent. */
  static reliance(spent: number): CrossFormula { return k('contract-reliance', 'reliance(spent) = spent', spent, nat(spent), 'reliance', [spent]) }
  /** LIQUIDATED DAMAGES at an agreed `rate` per day of delay. value rate · days. */
  static liquidated(rate: number, days: number): CrossFormula { return k('contract-liquidated', 'liquidated(rate, days) = rate · days', rate * days, nat(rate, days), 'liquidated', [rate, days]) }
  /** A DEPOSIT or part-payment: `pct`% of the price. value ⌊price · pct / 100⌋. */
  static deposit(price: number, pct: number): CrossFormula { return k('contract-deposit', 'deposit(price, pct) = ⌊price · pct / 100⌋', Math.floor((price * pct) / 100), nat(price, pct) && pct <= 100, 'deposit', [price, pct]) }
  /** A PENALTY by percentage of the amount. value ⌊amount · pct / 100⌋. */
  static penalty(amount: number, pct: number): CrossFormula { return k('contract-penalty', 'penalty(amount, pct) = ⌊amount · pct / 100⌋', Math.floor((amount * pct) / 100), nat(amount, pct) && pct <= 100, 'penalty', [amount, pct]) }
  /** RESTITUTION of a benefit conferred, net of value returned. value max(0, benefit − returned). */
  static restitution(benefit: number, returned: number): CrossFormula { return k('contract-restitution', 'restitution(benefit, returned) = max(0, benefit − returned)', Math.max(0, benefit - returned), nat(benefit, returned), 'restitution', [benefit, returned]) }
  /** THE CURE PERIOD: 1 when the breach was cured within the period allowed. value [days ≤ period]. */
  static cure(days: number, period: number): CrossFormula { return k('contract-cure', 'cure(days, period) = [days ≤ period]', days <= period ? 1 : 0, nat(days, period), 'cure', [days, period]) }
}

for (const name of ['cure', 'deposit', 'expectation', 'liquidated', 'mitigation', 'penalty', 'reliance', 'restitution'] as const)
  hexRegisterOf('contract', name, (ContractFormulas[name] as (...x: unknown[]) => unknown).bind(ContractFormulas))
