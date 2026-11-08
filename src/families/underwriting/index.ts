import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** UNDERWRITING — PRICING RISK, AS ARITHMETIC (chosen by the public-API registry, not by hand). Writing a policy is
 *  numbers: the risk rate from past claims, the base premium at a rate, the loading surcharge, the applicant's score,
 *  the accept/decline call, the exposure on the book, the reserve still owed, and the loss ratio. Crosses to `insurance`
 *  — underwriting is what an insurer does before it insures. A measure. */

const PROOF = 'underwriting arithmetic (risk rate, premium, loading, score, decline, exposure, reserve, loss ratio); the price of risk before a policy is written; a measure crossed to insurance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'underwriting', dst: 'insurance', formula, value, proof: PROOF, ...extra }, holds, { name: `underwriting.${name}`, params })

export class UnderwritingFormulas {
  /** RISK RATE: past claims per year, as a rate per hundred. value ⌊claims · 100 / years⌋. */
  static risk(claims: number, years: number): CrossFormula { return c('underwriting-risk', 'risk(claims, years) = ⌊claims · 100 / years⌋', years > 0 ? Math.floor((claims * 100) / years) : 0, nat(claims, years) && years > 0, 'risk', [claims, years]) }
  /** PREMIUM: a base amount at a percentage rate. value ⌊base · rate / 100⌋. */
  static premium(base: number, rate: number): CrossFormula { return c('underwriting-premium', 'premium(base, rate) = ⌊base · rate / 100⌋', Math.floor((base * rate) / 100), nat(base, rate), 'premium', [base, rate]) }
  /** LOADING: a surcharge, a percentage of the premium. value ⌊premium · pct / 100⌋. */
  static loading(premium: number, pct: number): CrossFormula { return c('underwriting-loading', 'loading(premium, pct) = ⌊premium · pct / 100⌋', Math.floor((premium * pct) / 100), nat(premium, pct), 'loading', [premium, pct]) }
  /** SCORE: total factor points over the factors counted. value ⌊factors / count⌋. */
  static score(factors: number, count: number): CrossFormula { return c('underwriting-score', 'score(factors, count) = ⌊factors / count⌋', count > 0 ? Math.floor(factors / count) : 0, nat(factors, count) && count > 0, 'score', [factors, count]) }
  /** THE DECLINE: 1 when the score meets the decline threshold. value [score ≥ threshold]. */
  static decline(score: number, threshold: number): CrossFormula { return c('underwriting-decline', 'decline(score, threshold) = [score ≥ threshold]', score >= threshold ? 1 : 0, nat(score, threshold), 'decline', [score, threshold]) }
  /** EXPOSURE: insured units at a value each. value units · value. */
  static exposure(units: number, value: number): CrossFormula { return c('underwriting-exposure', 'exposure(units, value) = units · value', units * value, nat(units, value), 'exposure', [units, value]) }
  /** RESERVE: the incurred loss still owed after what is paid. value max(0, incurred − paid). */
  static reserve(incurred: number, paid: number): CrossFormula { return c('underwriting-reserve', 'reserve(incurred, paid) = max(0, incurred − paid)', Math.max(0, incurred - paid), nat(incurred, paid), 'reserve', [incurred, paid]) }
  /** LOSS RATIO: losses over premiums, as a percentage. value ⌊losses · 100 / premiums⌋. */
  static ratio(losses: number, premiums: number): CrossFormula { return c('underwriting-ratio', 'ratio(losses, premiums) = ⌊losses · 100 / premiums⌋', premiums > 0 ? Math.floor((losses * 100) / premiums) : 0, nat(losses, premiums) && premiums > 0, 'ratio', [losses, premiums]) }
}

for (const name of ['decline', 'exposure', 'loading', 'premium', 'ratio', 'reserve', 'risk', 'score'] as const)
  hexRegisterOf('underwriting', name, (UnderwritingFormulas[name] as (...x: unknown[]) => unknown).bind(UnderwritingFormulas))
