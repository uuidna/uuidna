import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PSYCH — FORENSIC PSYCHIATRY AS EVIDENCE. The questions a court puts to a psychiatrist resolve to thresholds and
 *  scores: competency to stand trial, decisional capacity, a violence-risk score from static and dynamic factors, the
 *  insanity test, malingering, restoration, recidivism, and dangerousness. A measure crossing to `evidence` — an opinion
 *  aid, never the diagnosis itself. */

const PROOF = 'forensic-psychiatry arithmetic (competency, capacity, violence-risk score, insanity test, malingering, restoration, recidivism, dangerousness); a measure crossed to evidence, not a diagnosis'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const p = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'psych', dst: 'evidence', formula, value, proof: PROOF, ...extra }, holds, { name: `psych.${name}`, params })

export class PsychFormulas {
  /** COMPETENCY to stand trial: 1 when the understanding score meets the threshold. value [score ≥ threshold]. */
  static competency(score: number, threshold: number): CrossFormula { return p('psych-competency', 'competency(score, threshold) = [score ≥ threshold]', score >= threshold ? 1 : 0, nat(score, threshold), 'competency', [score, threshold]) }
  /** DECISIONAL CAPACITY: 1 when every domain assessed is intact. value [intact = domains]. */
  static capacity(domains: number, intact: number): CrossFormula { return p('psych-capacity', 'capacity(domains, intact) = [intact = domains]', domains > 0 && intact === domains ? 1 : 0, nat(domains, intact) && intact <= domains && domains > 0, 'capacity', [domains, intact]) }
  /** THE VIOLENCE-RISK SCORE: static (historical) plus dynamic (changeable) factors. value static + dynamic. */
  static risk(staticFactors: number, dynamic: number): CrossFormula { return p('psych-risk', 'risk(static, dynamic) = static + dynamic', staticFactors + dynamic, nat(staticFactors, dynamic), 'risk', [staticFactors, dynamic]) }
  /** THE INSANITY TEST: 1 when cognitive or volitional impairment reaches the legal threshold. value [cognitive + volitional ≥ threshold]. */
  static insanity(cognitive: number, volitional: number, threshold: number): CrossFormula { return p('psych-insanity', 'insanity(cognitive, volitional, threshold) = [cognitive + volitional ≥ threshold]', cognitive + volitional >= threshold ? 1 : 0, nat(cognitive, volitional, threshold), 'insanity', [cognitive, volitional, threshold]) }
  /** MALINGERING: 1 when inconsistencies reach the cutoff for feigning. value [inconsistencies ≥ cutoff]. */
  static malingering(inconsistencies: number, cutoff: number): CrossFormula { return p('psych-malingering', 'malingering(inconsistencies, cutoff) = [inconsistencies ≥ cutoff]', inconsistencies >= cutoff ? 1 : 0, nat(inconsistencies, cutoff), 'malingering', [inconsistencies, cutoff]) }
  /** RESTORATION: 1 when completed sessions meet those needed to restore competency. value [sessions ≥ needed]. */
  static restoration(sessions: number, needed: number): CrossFormula { return p('psych-restoration', 'restoration(sessions, needed) = [sessions ≥ needed]', sessions >= needed ? 1 : 0, nat(sessions, needed), 'restoration', [sessions, needed]) }
  /** RECIDIVISM load: prior offences weighted by a factor. value priors · factor. */
  static recidivism(priors: number, factor: number): CrossFormula { return p('psych-recidivism', 'recidivism(priors, factor) = priors · factor', priors * factor, nat(priors, factor), 'recidivism', [priors, factor]) }
  /** DANGEROUSNESS: a history count weighted by severity. value history · severity. */
  static dangerousness(history: number, severity: number): CrossFormula { return p('psych-dangerousness', 'dangerousness(history, severity) = history · severity', history * severity, nat(history, severity), 'dangerousness', [history, severity]) }
}

for (const name of ['capacity', 'competency', 'dangerousness', 'insanity', 'malingering', 'recidivism', 'restoration', 'risk'] as const)
  hexRegisterOf('psych', name, (PsychFormulas[name] as (...x: unknown[]) => unknown).bind(PsychFormulas))
