import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PSYCHIATRY — CLINICAL MENTAL-HEALTH MEASURES, AS ARITHMETIC. Scoring a condition is numbers: the PHQ-9 total, severity
 *  against a ceiling, remission and relapse rates, medication adherence, symptom response, risk load, and a net wellbeing.
 *  Crosses to `med` — psychiatry is a branch of medicine. A measure. */

const PROOF = 'psychiatry arithmetic (PHQ-9 total, severity, remission, relapse, adherence, response, risk, wellbeing); a clinical mental-health measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'psychiatry', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `psychiatry.${name}`, params })

export class PsychiatryFormulas {
  /** PHQ-9 TOTAL: the sum of the item scores. value items. */
  static phq(items: number): CrossFormula { return c('psychiatry-phq', 'phq(items) = items', items, nat(items), 'phq', [items]) }
  /** SEVERITY as a percentage of the maximum. value ⌊score · 100 / max⌋. */
  static severity(score: number, max: number): CrossFormula { return c('psychiatry-severity', 'severity(score, max) = ⌊score · 100 / max⌋', max > 0 ? Math.floor((score * 100) / max) : 0, nat(score, max) && max > 0 && score <= max, 'severity', [score, max]) }
  /** REMISSION rate: the improved over the treated. value ⌊improved · 100 / treated⌋. */
  static remission(improved: number, treated: number): CrossFormula { return c('psychiatry-remission', 'remission(improved, treated) = ⌊improved · 100 / treated⌋', treated > 0 ? Math.floor((improved * 100) / treated) : 0, nat(improved, treated) && treated > 0 && improved <= treated, 'remission', [improved, treated]) }
  /** RELAPSE rate: the returned over the recovered. value ⌊returned · 100 / recovered⌋. */
  static relapse(returned: number, recovered: number): CrossFormula { return c('psychiatry-relapse', 'relapse(returned, recovered) = ⌊returned · 100 / recovered⌋', recovered > 0 ? Math.floor((returned * 100) / recovered) : 0, nat(returned, recovered) && recovered > 0 && returned <= recovered, 'relapse', [returned, recovered]) }
  /** ADHERENCE: the doses taken over those prescribed. value ⌊taken · 100 / prescribed⌋. */
  static adherence(taken: number, prescribed: number): CrossFormula { return c('psychiatry-adherence', 'adherence(taken, prescribed) = ⌊taken · 100 / prescribed⌋', prescribed > 0 ? Math.floor((taken * 100) / prescribed) : 0, nat(taken, prescribed) && prescribed > 0 && taken <= prescribed, 'adherence', [taken, prescribed]) }
  /** RESPONSE: the symptom reduction as a percentage. value ⌊(before − after) · 100 / before⌋. */
  static response(before: number, after: number): CrossFormula { return c('psychiatry-response', 'response(before, after) = ⌊(before − after) · 100 / before⌋', before > 0 ? Math.floor(((before - after) * 100) / before) : 0, nat(before, after) && before > 0 && after <= before, 'response', [before, after]) }
  /** RISK: the factors present over the total. value ⌊factors · 100 / total⌋. */
  static risk(factors: number, total: number): CrossFormula { return c('psychiatry-risk', 'risk(factors, total) = ⌊factors · 100 / total⌋', total > 0 ? Math.floor((factors * 100) / total) : 0, nat(factors, total) && total > 0 && factors <= total, 'risk', [factors, total]) }
  /** WELLBEING: positive affect net of negative, never below zero. value max(0, positive − negative). */
  static wellbeing(positive: number, negative: number): CrossFormula { return c('psychiatry-wellbeing', 'wellbeing(positive, negative) = max(0, positive − negative)', Math.max(0, positive - negative), nat(positive, negative), 'wellbeing', [positive, negative]) }
}

for (const name of ['adherence', 'phq', 'relapse', 'remission', 'response', 'risk', 'severity', 'wellbeing'] as const)
  hexRegisterOf('psychiatry', name, (PsychiatryFormulas[name] as (...x: unknown[]) => unknown).bind(PsychiatryFormulas))
