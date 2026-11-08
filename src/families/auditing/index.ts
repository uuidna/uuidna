import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUDITING — THE AUDIT AS ARITHMETIC. An audit is numbers: the materiality threshold against the total, the sample a
 *  population needs at a confidence, the error rate found in a sample, account coverage, findings per control, the
 *  variance of actual against expected, the risk of a likelihood times an impact, and the compliance rate. Crosses to
 *  `accounting` — auditing is what verifies the books. A measure. */

const PROOF = 'auditing arithmetic (materiality, sample size, error rate, coverage, findings, variance, risk, compliance); the audit as arithmetic; a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'auditing', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `auditing.${name}`, params })

export class AuditingFormulas {
  /** MATERIALITY: a threshold as a percentage of the total. value ⌊threshold · 100 / total⌋. */
  static materiality(threshold: number, total: number): CrossFormula { return c('auditing-materiality', 'materiality(threshold, total) = ⌊threshold · 100 / total⌋', total > 0 ? Math.floor((threshold * 100) / total) : 0, nat(threshold, total) && total > 0, 'materiality', [threshold, total]) }
  /** SAMPLE SIZE: the population divided by the confidence divisor. value ⌊population / confidence⌋. */
  static samplesize(population: number, confidence: number): CrossFormula { return c('auditing-samplesize', 'samplesize(population, confidence) = ⌊population / confidence⌋', confidence > 0 ? Math.floor(population / confidence) : 0, nat(population, confidence) && confidence > 0, 'samplesize', [population, confidence]) }
  /** ERROR RATE: errors as a percentage of the sampled items. value ⌊errors · 100 / sampled⌋. */
  static errorrate(errors: number, sampled: number): CrossFormula { return c('auditing-errorrate', 'errorrate(errors, sampled) = ⌊errors · 100 / sampled⌋', sampled > 0 ? Math.floor((errors * 100) / sampled) : 0, nat(errors, sampled) && sampled > 0 && errors <= sampled, 'errorrate', [errors, sampled]) }
  /** COVERAGE: audited accounts as a percentage of all accounts. value ⌊audited · 100 / accounts⌋. */
  static coverage(audited: number, accounts: number): CrossFormula { return c('auditing-coverage', 'coverage(audited, accounts) = ⌊audited · 100 / accounts⌋', accounts > 0 ? Math.floor((audited * 100) / accounts) : 0, nat(audited, accounts) && accounts > 0 && audited <= accounts, 'coverage', [audited, accounts]) }
  /** FINDINGS: issues as a percentage of the controls tested. value ⌊issues · 100 / controls⌋. */
  static findings(issues: number, controls: number): CrossFormula { return c('auditing-findings', 'findings(issues, controls) = ⌊issues · 100 / controls⌋', controls > 0 ? Math.floor((issues * 100) / controls) : 0, nat(issues, controls) && controls > 0, 'findings', [issues, controls]) }
  /** VARIANCE: actual as a percentage of expected. value ⌊actual · 100 / expected⌋. */
  static variance(actual: number, expected: number): CrossFormula { return c('auditing-variance', 'variance(actual, expected) = ⌊actual · 100 / expected⌋', expected > 0 ? Math.floor((actual * 100) / expected) : 0, nat(actual, expected) && expected > 0, 'variance', [actual, expected]) }
  /** RISK: likelihood times impact. value likelihood · impact. */
  static risk(likelihood: number, impact: number): CrossFormula { return c('auditing-risk', 'risk(likelihood, impact) = likelihood · impact', likelihood * impact, nat(likelihood, impact), 'risk', [likelihood, impact]) }
  /** COMPLIANCE: compliant items as a percentage of all requirements. value ⌊compliant · 100 / requirements⌋. */
  static compliance(compliant: number, requirements: number): CrossFormula { return c('auditing-compliance', 'compliance(compliant, requirements) = ⌊compliant · 100 / requirements⌋', requirements > 0 ? Math.floor((compliant * 100) / requirements) : 0, nat(compliant, requirements) && requirements > 0 && compliant <= requirements, 'compliance', [compliant, requirements]) }
}

for (const name of ['compliance', 'coverage', 'errorrate', 'findings', 'materiality', 'risk', 'samplesize', 'variance'] as const)
  hexRegisterOf('auditing', name, (AuditingFormulas[name] as (...x: unknown[]) => unknown).bind(AuditingFormulas))
