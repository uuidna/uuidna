import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CURRICULUM — A COURSE OF STUDY, AS ARITHMETIC (chosen by the public-API registry, not by hand). Designing a programme
 *  is numbers: the credit hours a load carries, how many courses that many credits buys, contact hours over a term, the
 *  share of the syllabus covered, how deep the prerequisite chain runs, the pace of topics per week, the assignment
 *  workload, and whether the outcomes align with the target. Crosses to `pedagogy` — curriculum is what pedagogy teaches.
 *  A measure. */

const PROOF = 'curriculum arithmetic (credit hours, course count, contact hours, syllabus coverage, prerequisite depth, pacing, workload, outcome alignment); a measure crossed to pedagogy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'curriculum', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name: `curriculum.${name}`, params })

export class CurriculumFormulas {
  /** CREDIT HOURS: courses at a credit each. value courses · creditsEach. */
  static credithours(courses: number, creditsEach: number): CrossFormula { return c('curriculum-credithours', 'credithours(courses, creditsEach) = courses · creditsEach', courses * creditsEach, nat(courses, creditsEach), 'credithours', [courses, creditsEach]) }
  /** COURSE COUNT: the courses a credit budget buys. value ⌊credits / perCourse⌋. */
  static coursecount(credits: number, perCourse: number): CrossFormula { return c('curriculum-coursecount', 'coursecount(credits, perCourse) = ⌊credits / perCourse⌋', perCourse > 0 ? Math.floor(credits / perCourse) : 0, nat(credits, perCourse) && perCourse > 0, 'coursecount', [credits, perCourse]) }
  /** CONTACT HOURS: weeks at hours each. value weeks · hoursPerWeek. */
  static contacthours(weeks: number, hoursPerWeek: number): CrossFormula { return c('curriculum-contacthours', 'contacthours(weeks, hoursPerWeek) = weeks · hoursPerWeek', weeks * hoursPerWeek, nat(weeks, hoursPerWeek), 'contacthours', [weeks, hoursPerWeek]) }
  /** COVERAGE: the share of the syllabus taught, as a percentage. value ⌊taught · 100 / total⌋. */
  static coverage(taught: number, total: number): CrossFormula { return c('curriculum-coverage', 'coverage(taught, total) = ⌊taught · 100 / total⌋', total > 0 ? Math.floor((taught * 100) / total) : 0, nat(taught, total) && total > 0 && taught <= total, 'coverage', [taught, total]) }
  /** PREREQUISITE DEPTH: the levels a chain of courses needs at a per-level width. value ⌈courses / perLevel⌉. */
  static prerequisitedepth(courses: number, perLevel: number): CrossFormula { return c('curriculum-prerequisitedepth', 'prerequisitedepth(courses, perLevel) = ⌈courses / perLevel⌉', perLevel > 0 ? Math.ceil(courses / perLevel) : 0, nat(courses, perLevel) && perLevel > 0, 'prerequisitedepth', [courses, perLevel]) }
  /** PACING: topics over the weeks of the term. value ⌊topics / weeks⌋. */
  static pacing(topics: number, weeks: number): CrossFormula { return c('curriculum-pacing', 'pacing(topics, weeks) = ⌊topics / weeks⌋', weeks > 0 ? Math.floor(topics / weeks) : 0, nat(topics, weeks) && weeks > 0, 'pacing', [topics, weeks]) }
  /** WORKLOAD: assignments at hours each. value assignments · hoursEach. */
  static workload(assignments: number, hoursEach: number): CrossFormula { return c('curriculum-workload', 'workload(assignments, hoursEach) = assignments · hoursEach', assignments * hoursEach, nat(assignments, hoursEach), 'workload', [assignments, hoursEach]) }
  /** ALIGNMENT: 1 when measured outcomes meet the target. value [met ≥ target]. */
  static alignment(met: number, target: number): CrossFormula { return c('curriculum-alignment', 'alignment(met, target) = [met ≥ target]', met >= target ? 1 : 0, nat(met, target) && met <= 100 && target <= 100, 'alignment', [met, target]) }
}

for (const name of ['alignment', 'contacthours', 'coursecount', 'coverage', 'credithours', 'pacing', 'prerequisitedepth', 'workload'] as const)
  hexRegisterOf('curriculum', name, (CurriculumFormulas[name] as (...x: unknown[]) => unknown).bind(CurriculumFormulas))
