import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SAFETY — WORKPLACE SAFETY AS ARITHMETIC. Protecting people is numbers: the OSHA incident rate, severity per incident, the
 *  risk of a hazard, near-misses per incident, compliance and training percentages, chemical exposure, and the margin left
 *  under a limit. Crosses to `construction` — safety is what building work must hold. A measure. */

const PROOF = 'safety arithmetic (OSHA incident rate, severity, risk, near-miss ratio, compliance, exposure, safety margin, training); workplace protection as integers; a measure crossed to construction'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'safety', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name: `safety.${name}`, params })

export class SafetyFormulas {
  /** OSHA INCIDENT RATE: incidents per 200,000 hours worked. value ⌊incidents · 200000 / hours⌋. */
  static incidentrate(incidents: number, hours: number): CrossFormula { return c('safety-incidentrate', 'incidentrate(incidents, hours) = ⌊incidents · 200000 / hours⌋', hours > 0 ? Math.floor((incidents * 200000) / hours) : 0, nat(incidents, hours) && hours > 0, 'incidentrate', [incidents, hours]) }
  /** SEVERITY: lost days per incident. value ⌊lostdays / incidents⌋. */
  static severity(lostdays: number, incidents: number): CrossFormula { return c('safety-severity', 'severity(lostdays, incidents) = ⌊lostdays / incidents⌋', incidents > 0 ? Math.floor(lostdays / incidents) : 0, nat(lostdays, incidents) && incidents > 0, 'severity', [lostdays, incidents]) }
  /** RISK: probability times impact. value probability · impact. */
  static risk(probability: number, impact: number): CrossFormula { return c('safety-risk', 'risk(probability, impact) = probability · impact', probability * impact, nat(probability, impact), 'risk', [probability, impact]) }
  /** NEAR-MISS RATIO: near-misses per incident. value ⌊nearmisses / incidents⌋. */
  static nearmiss(nearmisses: number, incidents: number): CrossFormula { return c('safety-nearmiss', 'nearmiss(nearmisses, incidents) = ⌊nearmisses / incidents⌋', incidents > 0 ? Math.floor(nearmisses / incidents) : 0, nat(nearmisses, incidents) && incidents > 0, 'nearmiss', [nearmisses, incidents]) }
  /** COMPLIANCE as a percentage. value ⌊compliant · 100 / checks⌋. */
  static compliance(compliant: number, checks: number): CrossFormula { return c('safety-compliance', 'compliance(compliant, checks) = ⌊compliant · 100 / checks⌋', checks > 0 ? Math.floor((compliant * 100) / checks) : 0, nat(compliant, checks) && checks > 0 && compliant <= checks, 'compliance', [compliant, checks]) }
  /** EXPOSURE: concentration over a duration. value concentration · duration. */
  static exposure(concentration: number, duration: number): CrossFormula { return c('safety-exposure', 'exposure(concentration, duration) = concentration · duration', concentration * duration, nat(concentration, duration), 'exposure', [concentration, duration]) }
  /** SAFETY MARGIN: how far under the limit the actual reading is. value max(0, limit − actual). */
  static margin(limit: number, actual: number): CrossFormula { return c('safety-margin', 'margin(limit, actual) = max(0, limit − actual)', Math.max(0, limit - actual), nat(limit, actual), 'margin', [limit, actual]) }
  /** TRAINING as a percentage of the workforce. value ⌊trained · 100 / workers⌋. */
  static training(trained: number, workers: number): CrossFormula { return c('safety-training', 'training(trained, workers) = ⌊trained · 100 / workers⌋', workers > 0 ? Math.floor((trained * 100) / workers) : 0, nat(trained, workers) && workers > 0 && trained <= workers, 'training', [trained, workers]) }
}

for (const name of ['compliance', 'exposure', 'incidentrate', 'margin', 'nearmiss', 'risk', 'severity', 'training'] as const)
  hexRegisterOf('safety', name, (SafetyFormulas[name] as (...x: unknown[]) => unknown).bind(SafetyFormulas))
