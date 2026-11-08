import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INSurance — WHAT A POLICY PAYS, AND WHAT IT KEEPS. A claim is arithmetic over the policy's own numbers: the premium on
 *  the sum insured, the claim after a deductible, the coinsurance penalty for under-insurance, indemnity capped at the
 *  limit, the loss ratio, the outstanding reserve, a subrogation recovery, the insured's co-payment. Exact and
 *  jurisdiction-agnostic. Crosses to `law`: coverage and claims are decided by the policy and, in dispute, the court. A
 *  measure, not advice. */

const PROOF = 'insurance arithmetic (premium, claim net of deductible, coinsurance penalty, indemnity at the limit, loss ratio, reserve, subrogation, co-payment) over the policy\'s own numbers; a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const i = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'insurance', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `insurance.${name}`, params })

export class InsuranceFormulas {
  /** THE PREMIUM at `rate`% of the sum insured. value ⌊sum · rate / 100⌋. */
  static premium(sum: number, rate: number): CrossFormula { return i('insurance-premium', 'premium(sum, rate) = ⌊sum · rate / 100⌋', Math.floor((sum * rate) / 100), nat(sum, rate) && rate <= 100, 'premium', [sum, rate]) }
  /** THE PAYABLE CLAIM after the deductible. value max(0, loss − deductible). */
  static claim(loss: number, deductible: number): CrossFormula { return i('insurance-claim', 'claim(loss, deductible) = max(0, loss − deductible)', Math.max(0, loss - deductible), nat(loss, deductible), 'claim', [loss, deductible]) }
  /** THE COINSURANCE SETTLEMENT when under-insured: the claim scaled by cover carried over cover required. value ⌊claim · carried / required⌋. */
  static coinsurance(claim: number, carried: number, required: number): CrossFormula { return i('insurance-coinsurance', 'coinsurance(claim, carried, required) = ⌊claim · carried / required⌋', required > 0 ? Math.min(claim, Math.floor((claim * carried) / required)) : 0, nat(claim, carried, required) && required > 0, 'coinsurance', [claim, carried, required]) }
  /** INDEMNITY capped at the policy limit. value min(claim, limit). */
  static indemnity(claim: number, limit: number): CrossFormula { return i('insurance-indemnity', 'indemnity(claim, limit) = min(claim, limit)', Math.min(claim, limit), nat(claim, limit), 'indemnity', [claim, limit]) }
  /** THE LOSS RATIO as a percentage: claims over premiums. value ⌊claims · 100 / premiums⌋. */
  static lossratio(claims: number, premiums: number): CrossFormula { return i('insurance-lossratio', 'lossratio(claims, premiums) = ⌊claims · 100 / premiums⌋', premiums > 0 ? Math.floor((claims * 100) / premiums) : 0, nat(claims, premiums) && premiums > 0, 'lossratio', [claims, premiums]) }
  /** THE OUTSTANDING RESERVE: claims incurred not yet paid. value max(0, claims − paid). */
  static reserve(claims: number, paid: number): CrossFormula { return i('insurance-reserve', 'reserve(claims, paid) = max(0, claims − paid)', Math.max(0, claims - paid), nat(claims, paid), 'reserve', [claims, paid]) }
  /** SUBROGATION: the insurer recovers from the wrongdoer, never more than it paid. value min(paid, recovered). */
  static subrogation(paid: number, recovered: number): CrossFormula { return i('insurance-subrogation', 'subrogation(paid, recovered) = min(paid, recovered)', Math.min(paid, recovered), nat(paid, recovered), 'subrogation', [paid, recovered]) }
  /** THE CO-PAYMENT: the insured's `pct`% share of the claim. value ⌊claim · pct / 100⌋. */
  static copay(claim: number, pct: number): CrossFormula { return i('insurance-copay', 'copay(claim, pct) = ⌊claim · pct / 100⌋', Math.floor((claim * pct) / 100), nat(claim, pct) && pct <= 100, 'copay', [claim, pct]) }
  /** PREMIUM at `rate`% of the sum. value ⌊rate·sum/100⌋. */
  static premium2(rate: number, sum: number): CrossFormula { return i('insurance-premium2', 'premium(rate, sum) = ⌊rate·sum/100⌋', Math.floor((rate * sum) / 100), nat(rate, sum), 'premium2', [rate, sum]) }
  /** CLAIM RATIO: claims over policies, as a percentage. value ⌊claims·100/policies⌋. */
  static claimratio(claims: number, policies: number): CrossFormula { return i('insurance-claimratio', 'claimratio(claims, policies) = ⌊claims·100/policies⌋', policies > 0 ? Math.floor((claims * 100) / policies) : 0, nat(claims, policies) && policies > 0, 'claimratio', [claims, policies]) }
  /** RETAINED: loss net of the deductible. value max(0, loss − deductible). */
  static retained(loss: number, deductible: number): CrossFormula { return i('insurance-retained', 'retained(loss, deductible) = max(0, loss − deductible)', Math.max(0, loss - deductible), nat(loss, deductible), 'retained', [loss, deductible]) }
  /** COINSURANCE: the insured's `share`% of the loss. value ⌊loss·share/100⌋. */
  static coinsurance2(loss: number, share: number): CrossFormula { return i('insurance-coinsurance2', 'coinsurance(loss, share) = ⌊loss·share/100⌋', Math.floor((loss * share) / 100), nat(loss, share), 'coinsurance2', [loss, share]) }
  /** CEDED: portfolio net of retention. value max(0, portfolio − retention). */
  static ceded(portfolio: number, retention: number): CrossFormula { return i('insurance-ceded', 'ceded(portfolio, retention) = max(0, portfolio − retention)', Math.max(0, portfolio - retention), nat(portfolio, retention), 'ceded', [portfolio, retention]) }
  /** FREQUENCY · SEVERITY: the pure loss cost. value freq · sev. */
  static frequencyseverity(freq: number, sev: number): CrossFormula { return i('insurance-frequencyseverity', 'frequencyseverity(freq, sev) = freq · sev', freq * sev, nat(freq, sev), 'frequencyseverity', [freq, sev]) }
  /** SOLVENCY MARGIN: assets net of liabilities. value max(0, assets − liabilities). */
  static solvencymargin(assets: number, liabilities: number): CrossFormula { return i('insurance-solvencymargin', 'solvencymargin(assets, liabilities) = max(0, assets − liabilities)', Math.max(0, assets - liabilities), nat(assets, liabilities), 'solvencymargin', [assets, liabilities]) }
}

for (const name of ['ceded', 'claim', 'claimratio', 'coinsurance', 'coinsurance2', 'copay', 'frequencyseverity', 'indemnity', 'lossratio', 'premium', 'premium2', 'reserve', 'retained', 'solvencymargin', 'subrogation'] as const)
  hexRegisterOf('insurance', name, (InsuranceFormulas[name] as (...x: unknown[]) => unknown).bind(InsuranceFormulas))
