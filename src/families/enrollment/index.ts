import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENROLLMENT — THE REGISTRY'S STUDENT-BODY DOMAIN, AS ARITHMETIC (chosen by the public-API registry, not by hand). A
 *  cohort is numbers: what share of applicants enroll, who comes back, who leaves, the yield on admissions, the
 *  student-faculty ratio, seats left, the waitlist, and full-time-equivalent head count. Crosses to `sociology` —
 *  enrollment is the population a cohort study measures. A measure. */

const PROOF = 'enrollment arithmetic (enroll rate, retention, attrition, admission yield, student-faculty ratio, remaining capacity, waitlist, full-time-equivalent); the registry\'s student-body domain; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'enrollment', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `enrollment.${name}`, params })

export class EnrollmentFormulas {
  /** ENROLL RATE: what share of applicants enroll, as a percentage. value ⌊enrolled · 100 / applied⌋. */
  static rate(enrolled: number, applied: number): CrossFormula { return c('enrollment-rate', 'rate(enrolled, applied) = ⌊enrolled · 100 / applied⌋', applied > 0 ? Math.floor((enrolled * 100) / applied) : 0, nat(enrolled, applied) && applied > 0 && enrolled <= applied, 'rate', [enrolled, applied]) }
  /** RETENTION: what share of a starting cohort returns, as a percentage. value ⌊returned · 100 / start⌋. */
  static retention(returned: number, start: number): CrossFormula { return c('enrollment-retention', 'retention(returned, start) = ⌊returned · 100 / start⌋', start > 0 ? Math.floor((returned * 100) / start) : 0, nat(returned, start) && start > 0 && returned <= start, 'retention', [returned, start]) }
  /** ATTRITION: how many of a starting cohort did not return. value max(0, start − returned). */
  static attrition(start: number, returned: number): CrossFormula { return c('enrollment-attrition', 'attrition(start, returned) = max(0, start − returned)', Math.max(0, start - returned), nat(start, returned), 'attrition', [start, returned]) }
  /** ADMISSION YIELD: what share of admitted students enroll, as a percentage. value ⌊enrolled · 100 / admitted⌋. */
  static yield(enrolled: number, admitted: number): CrossFormula { return c('enrollment-yield', 'yield(enrolled, admitted) = ⌊enrolled · 100 / admitted⌋', admitted > 0 ? Math.floor((enrolled * 100) / admitted) : 0, nat(enrolled, admitted) && admitted > 0 && enrolled <= admitted, 'yield', [enrolled, admitted]) }
  /** STUDENT-FACULTY RATIO: students per faculty member. value ⌊students / faculty⌋. */
  static ratio(students: number, faculty: number): CrossFormula { return c('enrollment-ratio', 'ratio(students, faculty) = ⌊students / faculty⌋', faculty > 0 ? Math.floor(students / faculty) : 0, nat(students, faculty) && faculty > 0, 'ratio', [students, faculty]) }
  /** REMAINING CAPACITY: seats not yet filled. value max(0, seats − filled). */
  static capacity(seats: number, filled: number): CrossFormula { return c('enrollment-capacity', 'capacity(seats, filled) = max(0, seats − filled)', Math.max(0, seats - filled), nat(seats, filled), 'capacity', [seats, filled]) }
  /** WAITLIST: applicants beyond the seats available. value max(0, applied − seats). */
  static waitlist(applied: number, seats: number): CrossFormula { return c('enrollment-waitlist', 'waitlist(applied, seats) = max(0, applied − seats)', Math.max(0, applied - seats), nat(applied, seats), 'waitlist', [applied, seats]) }
  /** FULL-TIME EQUIVALENT: full-timers plus a third of part-timers. value fulltime + ⌊parttime / 3⌋. */
  static fulltimeequivalent(fulltime: number, parttime: number): CrossFormula { return c('enrollment-fulltimeequivalent', 'fulltimeequivalent(fulltime, parttime) = fulltime + ⌊parttime / 3⌋', fulltime + Math.floor(parttime / 3), nat(fulltime, parttime), 'fulltimeequivalent', [fulltime, parttime]) }
}

for (const name of ['attrition', 'capacity', 'fulltimeequivalent', 'rate', 'ratio', 'retention', 'waitlist', 'yield'] as const)
  hexRegisterOf('enrollment', name, (EnrollmentFormulas[name] as (...x: unknown[]) => unknown).bind(EnrollmentFormulas))
