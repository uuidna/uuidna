import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ASSESSMENT — MEASURING WHAT A LEARNER KNOWS, AS ARITHMETIC. Grading is numbers: a raw score as a percentage, a
 *  percentile rank, a curved grade, the pass rate of a cohort, a weighted mean of parts, total rubric points, the
 *  mastery level reached, and the improvement between two sittings. Crosses to `pedagogy` — assessment is what teaching
 *  is judged by. A measure. */

const PROOF = 'assessment arithmetic (score percentage, percentile rank, curved grade, pass rate, weighted mean, rubric points, mastery level, improvement); a measure crossed to pedagogy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'assessment', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name: `assessment.${name}`, params })

export class AssessmentFormulas {
  /** SCORE: correct answers as a percentage of the total. value ⌊correct · 100 / total⌋. */
  static score(correct: number, total: number): CrossFormula { return c('assessment-score', 'score(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'score', [correct, total]) }
  /** PERCENTILE: the share of a cohort scoring at or below, as a percentage. value ⌊below · 100 / total⌋. */
  static percentile(below: number, total: number): CrossFormula { return c('assessment-percentile', 'percentile(below, total) = ⌊below · 100 / total⌋', total > 0 ? Math.floor((below * 100) / total) : 0, nat(below, total) && total > 0 && below <= total, 'percentile', [below, total]) }
  /** GRADE CURVE: a raw grade lifted by a bonus. value raw + bonus. */
  static gradecurve(raw: number, bonus: number): CrossFormula { return c('assessment-gradecurve', 'gradecurve(raw, bonus) = raw + bonus', raw + bonus, nat(raw, bonus), 'gradecurve', [raw, bonus]) }
  /** PASS RATE: those who passed as a percentage of those who sat. value ⌊passed · 100 / total⌋. */
  static passrate(passed: number, total: number): CrossFormula { return c('assessment-passrate', 'passrate(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'passrate', [passed, total]) }
  /** WEIGHTED MEAN: the weighted total over the total weight. value ⌊sum / weight⌋. */
  static weightedmean(sum: number, weight: number): CrossFormula { return c('assessment-weightedmean', 'weightedmean(sum, weight) = ⌊sum / weight⌋', weight > 0 ? Math.floor(sum / weight) : 0, nat(sum, weight) && weight > 0, 'weightedmean', [sum, weight]) }
  /** RUBRIC SCORE: points awarded per criterion across the criteria. value points · criteria. */
  static rubricscore(points: number, criteria: number): CrossFormula { return c('assessment-rubricscore', 'rubricscore(points, criteria) = points · criteria', points * criteria, nat(points, criteria), 'rubricscore', [points, criteria]) }
  /** MASTERY LEVEL: objectives mastered as a percentage of the total. value ⌊mastered · 100 / total⌋. */
  static masterylevel(mastered: number, total: number): CrossFormula { return c('assessment-masterylevel', 'masterylevel(mastered, total) = ⌊mastered · 100 / total⌋', total > 0 ? Math.floor((mastered * 100) / total) : 0, nat(mastered, total) && total > 0 && mastered <= total, 'masterylevel', [mastered, total]) }
  /** IMPROVEMENT: the gain from a prior sitting to a later one. value max(0, post − pre). */
  static improvement(post: number, pre: number): CrossFormula { return c('assessment-improvement', 'improvement(post, pre) = max(0, post − pre)', Math.max(0, post - pre), nat(post, pre), 'improvement', [post, pre]) }
}

for (const name of ['gradecurve', 'improvement', 'masterylevel', 'passrate', 'percentile', 'rubricscore', 'score', 'weightedmean'] as const)
  hexRegisterOf('assessment', name, (AssessmentFormulas[name] as (...x: unknown[]) => unknown).bind(AssessmentFormulas))
