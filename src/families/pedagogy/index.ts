import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PEDAGOGY — LEARNING, AS ARITHMETIC (chosen by the registry, not by hand). Teaching is numbers: how much a cohort has
 *  mastered, what it retained, students per teacher, who completed, who stays active, progress toward a target, the gain
 *  from before to after, and the pace of lessons. Crosses to `sociology` — pedagogy is how a society learns. A measure. */

const PROOF = 'pedagogy arithmetic (mastery, retention, student-teacher ratio, completion, engagement, progress, gain, pace); a learning measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pedagogy', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `pedagogy.${name}`, params })

export class PedagogyFormulas {
  /** MASTERY: items answered correctly, as a percentage. value ⌊correct · 100 / items⌋. */
  static mastery(correct: number, items: number): CrossFormula { return c('pedagogy-mastery', 'mastery(correct, items) = ⌊correct · 100 / items⌋', items > 0 ? Math.floor((correct * 100) / items) : 0, nat(correct, items) && items > 0 && correct <= items, 'mastery', [correct, items]) }
  /** RETENTION: of what was taught, how much was retained, as a percentage. value ⌊retained · 100 / taught⌋. */
  static retention(retained: number, taught: number): CrossFormula { return c('pedagogy-retention', 'retention(retained, taught) = ⌊retained · 100 / taught⌋', taught > 0 ? Math.floor((retained * 100) / taught) : 0, nat(retained, taught) && taught > 0 && retained <= taught, 'retention', [retained, taught]) }
  /** RATIO: students per teacher. value ⌊students / teachers⌋. */
  static ratio(students: number, teachers: number): CrossFormula { return c('pedagogy-ratio', 'ratio(students, teachers) = ⌊students / teachers⌋', teachers > 0 ? Math.floor(students / teachers) : 0, nat(students, teachers) && teachers > 0, 'ratio', [students, teachers]) }
  /** COMPLETION: of those enrolled, how many finished, as a percentage. value ⌊finished · 100 / enrolled⌋. */
  static completion(finished: number, enrolled: number): CrossFormula { return c('pedagogy-completion', 'completion(finished, enrolled) = ⌊finished · 100 / enrolled⌋', enrolled > 0 ? Math.floor((finished * 100) / enrolled) : 0, nat(finished, enrolled) && enrolled > 0 && finished <= enrolled, 'completion', [finished, enrolled]) }
  /** ENGAGEMENT: of the cohort, how many are active, as a percentage. value ⌊active · 100 / total⌋. */
  static engagement(active: number, total: number): CrossFormula { return c('pedagogy-engagement', 'engagement(active, total) = ⌊active · 100 / total⌋', total > 0 ? Math.floor((active * 100) / total) : 0, nat(active, total) && total > 0 && active <= total, 'engagement', [active, total]) }
  /** PROGRESS: current toward a target, as a percentage. value ⌊current · 100 / target⌋. */
  static progress(current: number, target: number): CrossFormula { return c('pedagogy-progress', 'progress(current, target) = ⌊current · 100 / target⌋', target > 0 ? Math.floor((current * 100) / target) : 0, nat(current, target) && target > 0 && current <= target, 'progress', [current, target]) }
  /** GAIN: the rise from before to after, never negative. value max(0, post − pre). */
  static gain(post: number, pre: number): CrossFormula { return c('pedagogy-gain', 'gain(post, pre) = max(0, post − pre)', Math.max(0, post - pre), nat(post, pre), 'gain', [post, pre]) }
  /** PACE: lessons over weeks. value ⌊lessons / weeks⌋. */
  static pace(lessons: number, weeks: number): CrossFormula { return c('pedagogy-pace', 'pace(lessons, weeks) = ⌊lessons / weeks⌋', weeks > 0 ? Math.floor(lessons / weeks) : 0, nat(lessons, weeks) && weeks > 0, 'pace', [lessons, weeks]) }
}

for (const name of ['completion', 'engagement', 'gain', 'mastery', 'pace', 'progress', 'ratio', 'retention'] as const)
  hexRegisterOf('pedagogy', name, (PedagogyFormulas[name] as (...x: unknown[]) => unknown).bind(PedagogyFormulas))
