import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FORMS — WEB FORMS AND SURVEYS, AS ARITHMETIC (chosen by the public-API registry, not by hand). A form is numbers:
 *  the share who complete it, the share who abandon it, how many fields are required, submissions per view, the error
 *  rate, time per submission, the answer rate, and where a step loses people. Crosses to `cross`. A measure. */

const PROOF = 'forms arithmetic (completion, abandonment, required fields, conversion, validation errors, time per submission, response, step dropoff); a measure crossed to cross'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'forms', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `forms.${name}`, params })

export class FormsFormulas {
  /** COMPLETION: the share who finish of those who start. value ⌊finished · 100 / started⌋. */
  static completion(finished: number, started: number): CrossFormula { return c('forms-completion', 'completion(finished, started) = ⌊finished · 100 / started⌋', started > 0 ? Math.floor((finished * 100) / started) : 0, nat(finished, started) && started > 0 && finished <= started, 'completion', [finished, started]) }
  /** ABANDONMENT: the share who drop of those who start. value ⌊dropped · 100 / started⌋. */
  static abandonment(dropped: number, started: number): CrossFormula { return c('forms-abandonment', 'abandonment(dropped, started) = ⌊dropped · 100 / started⌋', started > 0 ? Math.floor((dropped * 100) / started) : 0, nat(dropped, started) && started > 0 && dropped <= started, 'abandonment', [dropped, started]) }
  /** REQUIRED FIELDS: the share of fields that are required. value ⌊required · 100 / total⌋. */
  static fields(required: number, total: number): CrossFormula { return c('forms-fields', 'fields(required, total) = ⌊required · 100 / total⌋', total > 0 ? Math.floor((required * 100) / total) : 0, nat(required, total) && total > 0 && required <= total, 'fields', [required, total]) }
  /** CONVERSION: submissions over views. value ⌊submitted · 100 / views⌋. */
  static conversion(submitted: number, views: number): CrossFormula { return c('forms-conversion', 'conversion(submitted, views) = ⌊submitted · 100 / views⌋', views > 0 ? Math.floor((submitted * 100) / views) : 0, nat(submitted, views) && views > 0 && submitted <= views, 'conversion', [submitted, views]) }
  /** VALIDATION: the error rate over submissions. value ⌊errors · 100 / submissions⌋. */
  static validation(errors: number, submissions: number): CrossFormula { return c('forms-validation', 'validation(errors, submissions) = ⌊errors · 100 / submissions⌋', submissions > 0 ? Math.floor((errors * 100) / submissions) : 0, nat(errors, submissions) && submissions > 0, 'validation', [errors, submissions]) }
  /** AVERAGE TIME: total seconds over the submissions. value ⌊total / submissions⌋. */
  static time(total: number, submissions: number): CrossFormula { return c('forms-time', 'time(total, submissions) = ⌊total / submissions⌋', submissions > 0 ? Math.floor(total / submissions) : 0, nat(total, submissions) && submissions > 0, 'time', [total, submissions]) }
  /** RESPONSE: the share answered of those sent. value ⌊answered · 100 / sent⌋. */
  static response(answered: number, sent: number): CrossFormula { return c('forms-response', 'response(answered, sent) = ⌊answered · 100 / sent⌋', sent > 0 ? Math.floor((answered * 100) / sent) : 0, nat(answered, sent) && sent > 0 && answered <= sent, 'response', [answered, sent]) }
  /** DROPOFF: the share lost at a step of the total. value ⌊step · 100 / total⌋. */
  static dropoff(step: number, total: number): CrossFormula { return c('forms-dropoff', 'dropoff(step, total) = ⌊step · 100 / total⌋', total > 0 ? Math.floor((step * 100) / total) : 0, nat(step, total) && total > 0 && step <= total, 'dropoff', [step, total]) }
}

for (const name of ['abandonment', 'completion', 'conversion', 'dropoff', 'fields', 'response', 'time', 'validation'] as const)
  hexRegisterOf('forms', name, (FormsFormulas[name] as (...x: unknown[]) => unknown).bind(FormsFormulas))
