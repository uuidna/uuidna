import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KYC — KNOWING A CUSTOMER BEFORE SERVING THEM, AS ARITHMETIC (chosen by the registry, not by hand). Due diligence is
 *  numbers: how complete the collected record is, how much of it screens clean against sanctions and PEP lists, the
 *  customer's risk rating, whether a transaction is reportable, whether enhanced diligence is required, how much of the
 *  beneficial ownership is identified, how long until the next periodic review, and the ongoing monitoring cadence. It
 *  INVOLVES OTHER FAMILIES: completeness is built on what `identity` verified; the risk rating is an `audit` score; the
 *  reportable-transaction test is an `econ` threshold. Crosses to `law` — KYC is what the law requires before service, as
 *  the FATF Recommendations and AML/CFT regimes write it. A measure, never a legal conclusion. */

const PROOF = 'kyc arithmetic (record completeness, sanctions/PEP screening, customer risk rating, reportable transaction, enhanced diligence, beneficial ownership coverage, review expiry, monitoring cadence); it involves identity (verified record), audit (risk score) and econ (reportable threshold); the FATF/AML due-diligence a law requires before service, a measure crossed to law — never a legal conclusion'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'kyc', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `kyc.${name}`, params })

export class KycFormulas {
  /** COMPLETENESS as a percentage: CDD fields verified over fields required (built on what identity verified). value ⌊verified · 100 / required⌋. */
  static completeness(verified: number, required: number): CrossFormula { return c('kyc-completeness', 'completeness(verified, required) = ⌊verified · 100 / required⌋', required > 0 ? Math.floor((verified * 100) / required) : 0, nat(verified, required) && required > 0 && verified <= required, 'completeness', [verified, required]) }
  /** SCREENING in basis points: sanctions/PEP list hits over names checked. value ⌊hits · 10000 / checks⌋. */
  static screening(hits: number, checks: number): CrossFormula { return c('kyc-screening', 'screening(hits, checks) = ⌊hits · 10000 / checks⌋', checks > 0 ? Math.floor((hits * 10000) / checks) : 0, nat(hits, checks) && checks > 0 && hits <= checks, 'screening', [hits, checks]) }
  /** RISK RATING as a percentage: risk flags raised over factors assessed (an audit score). value ⌊flags · 100 / factors⌋. */
  static risk(flags: number, factors: number): CrossFormula { return c('kyc-risk', 'risk(flags, factors) = ⌊flags · 100 / factors⌋', factors > 0 ? Math.floor((flags * 100) / factors) : 0, nat(flags, factors) && factors > 0 && flags <= factors, 'risk', [flags, factors]) }
  /** REPORTABLE: whether a transaction amount meets the reporting threshold (an econ threshold; CTR/SAR trigger). value [amount ≥ threshold]. */
  static aml(amount: number, threshold: number): CrossFormula { return c('kyc-aml', 'aml(amount, threshold) = [amount ≥ threshold]', amount >= threshold ? 1 : 0, nat(amount, threshold), 'aml', [amount, threshold]) }
  /** ENHANCED DILIGENCE: whether the risk rating demands EDD over standard CDD. value [risk ≥ tier]. */
  static diligence(risk: number, tier: number): CrossFormula { return c('kyc-diligence', 'diligence(risk, tier) = [risk ≥ tier]', risk >= tier ? 1 : 0, nat(risk, tier), 'diligence', [risk, tier]) }
  /** BENEFICIAL OWNERSHIP as a percentage: ultimate owners identified over owners above the control threshold. value ⌊identified · 100 / owners⌋. */
  static ubo(identified: number, owners: number): CrossFormula { return c('kyc-ubo', 'ubo(identified, owners) = ⌊identified · 100 / owners⌋', owners > 0 ? Math.floor((identified * 100) / owners) : 0, nat(identified, owners) && owners > 0 && identified <= owners, 'ubo', [identified, owners]) }
  /** REVIEW EXPIRY: days remaining until the next periodic review. value max(0, valid − elapsed). */
  static expiry(valid: number, elapsed: number): CrossFormula { return c('kyc-expiry', 'expiry(valid, elapsed) = max(0, valid − elapsed)', Math.max(0, valid - elapsed), nat(valid, elapsed), 'expiry', [valid, elapsed]) }
  /** MONITORING cadence: reviews performed over monitoring periods. value ⌊reviews / periods⌋. */
  static monitoring(reviews: number, periods: number): CrossFormula { return c('kyc-monitoring', 'monitoring(reviews, periods) = ⌊reviews / periods⌋', periods > 0 ? Math.floor(reviews / periods) : 0, nat(reviews, periods) && periods > 0, 'monitoring', [reviews, periods]) }
}

for (const name of Object.getOwnPropertyNames(KycFormulas).filter((k) => typeof (KycFormulas as unknown as Record<string, unknown>)[k] === 'function' && !['length', 'name', 'prototype'].includes(k)))
  hexRegisterOf('kyc', name, (KycFormulas as unknown as Record<string, (...y: unknown[]) => unknown>)[name]!.bind(KycFormulas))
