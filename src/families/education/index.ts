import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EDUCATION — ACADEMICS AS ARITHMETIC (chosen by the registry, not by hand). Learning is numbers: a grade out of a maximum,
 *  a grade-point average, attendance, the pass rate, the student-teacher ratio, course completion, the credits a load carries,
 *  and what those credits cost. Crosses to `cross` — education is a measure the formula network reads. A measure. */

const PROOF = 'education arithmetic (grade, gpa, attendance, pass rate, student-teacher ratio, completion, credits, cost); an academics domain; a measure crossed to cross'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'education', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `education.${name}`, params })

export class EducationFormulas {
  /** GRADE as a percentage of the maximum. value ⌊score · 100 / max⌋. */
  static grade(score: number, max: number): CrossFormula { return c('education-grade', 'grade(score, max) = ⌊score · 100 / max⌋', max > 0 ? Math.floor((score * 100) / max) : 0, nat(score, max) && max > 0 && score <= max, 'grade', [score, max]) }
  /** GPA: grade points over credits. value ⌊points / credits⌋. */
  static gpa(points: number, credits: number): CrossFormula { return c('education-gpa', 'gpa(points, credits) = ⌊points / credits⌋', credits > 0 ? Math.floor(points / credits) : 0, nat(points, credits) && credits > 0, 'gpa', [points, credits]) }
  /** ATTENDANCE as a percentage. value ⌊present · 100 / total⌋. */
  static attendance(present: number, total: number): CrossFormula { return c('education-attendance', 'attendance(present, total) = ⌊present · 100 / total⌋', total > 0 ? Math.floor((present * 100) / total) : 0, nat(present, total) && total > 0 && present <= total, 'attendance', [present, total]) }
  /** PASS RATE as a percentage. value ⌊passed · 100 / total⌋. */
  static pass(passed: number, total: number): CrossFormula { return c('education-pass', 'pass(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'pass', [passed, total]) }
  /** STUDENT-TEACHER RATIO: students per teacher. value ⌊students / teachers⌋. */
  static ratio(students: number, teachers: number): CrossFormula { return c('education-ratio', 'ratio(students, teachers) = ⌊students / teachers⌋', teachers > 0 ? Math.floor(students / teachers) : 0, nat(students, teachers) && teachers > 0, 'ratio', [students, teachers]) }
  /** COMPLETION as a percentage of those enrolled. value ⌊finished · 100 / enrolled⌋. */
  static completion(finished: number, enrolled: number): CrossFormula { return c('education-completion', 'completion(finished, enrolled) = ⌊finished · 100 / enrolled⌋', enrolled > 0 ? Math.floor((finished * 100) / enrolled) : 0, nat(finished, enrolled) && enrolled > 0 && finished <= enrolled, 'completion', [finished, enrolled]) }
  /** CREDITS: courses at a credit count each. value courses · each. */
  static credits(courses: number, each: number): CrossFormula { return c('education-credits', 'credits(courses, each) = courses · each', courses * each, nat(courses, each), 'credits', [courses, each]) }
  /** COST: credits at a price per credit. value credits · perCredit. */
  static cost(credits: number, perCredit: number): CrossFormula { return c('education-cost', 'cost(credits, perCredit) = credits · perCredit', credits * perCredit, nat(credits, perCredit), 'cost', [credits, perCredit]) }
}

for (const name of ['attendance', 'completion', 'cost', 'credits', 'gpa', 'grade', 'pass', 'ratio'] as const)
  hexRegisterOf('education', name, (EducationFormulas[name] as (...x: unknown[]) => unknown).bind(EducationFormulas))
