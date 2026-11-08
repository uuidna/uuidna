import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PERFORMANCE — THE WORKFORCE AS ARITHMETIC (appraisal, not opinion). A review is numbers: the average rating, output per
 *  hour, the share of a goal reached, a two-sided appraisal, the percent gained over the last cycle, billable utilization,
 *  tasks per day, and the weighted score. Crosses to `pedagogy` — a performance measure is what teaching is judged against.
 *  A measure. */

const PROOF = 'performance arithmetic (rating, productivity, goal, appraisal, improvement, utilization, throughput, weighted score); the workforce appraisal domain as exact naturals; a measure crossed to pedagogy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'performance', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name: `performance.${name}`, params })

export class PerformanceFormulas {
  /** AVERAGE RATING: total points over the number of reviews. value ⌊points / count⌋. */
  static rating(points: number, count: number): CrossFormula { return c('performance-rating', 'rating(points, count) = ⌊points / count⌋', count > 0 ? Math.floor(points / count) : 0, nat(points, count) && count > 0, 'rating', [points, count]) }
  /** PRODUCTIVITY: units of output per hour worked. value ⌊output / hours⌋. */
  static productivity(output: number, hours: number): CrossFormula { return c('performance-productivity', 'productivity(output, hours) = ⌊output / hours⌋', hours > 0 ? Math.floor(output / hours) : 0, nat(output, hours) && hours > 0, 'productivity', [output, hours]) }
  /** GOAL ATTAINMENT as a percentage. value ⌊done · 100 / target⌋. */
  static goal(done: number, target: number): CrossFormula { return c('performance-goal', 'goal(done, target) = ⌊done · 100 / target⌋', target > 0 ? Math.floor((done * 100) / target) : 0, nat(done, target) && target > 0, 'goal', [done, target]) }
  /** APPRAISAL: the mean of a self and a manager score. value ⌊(self + manager) / 2⌋. */
  static appraisal(self: number, manager: number): CrossFormula { return c('performance-appraisal', 'appraisal(self, manager) = ⌊(self + manager) / 2⌋', Math.floor((self + manager) / 2), nat(self, manager), 'appraisal', [self, manager]) }
  /** IMPROVEMENT: the percent gained over the previous cycle, clamped at 0. value max(0, ⌊(now − before) · 100 / before⌋). */
  static improvement(now: number, before: number): CrossFormula { return c('performance-improvement', 'improvement(now, before) = max(0, ⌊(now − before) · 100 / before⌋)', before > 0 ? Math.max(0, Math.floor(((now - before) * 100) / before)) : 0, nat(now, before) && before > 0, 'improvement', [now, before]) }
  /** UTILIZATION: billable hours as a percentage of available hours. value ⌊billable · 100 / available⌋. */
  static utilization(billable: number, available: number): CrossFormula { return c('performance-utilization', 'utilization(billable, available) = ⌊billable · 100 / available⌋', available > 0 ? Math.floor((billable * 100) / available) : 0, nat(billable, available) && available > 0 && billable <= available, 'utilization', [billable, available]) }
  /** THROUGHPUT: tasks completed per day. value ⌊tasks / days⌋. */
  static throughput(tasks: number, days: number): CrossFormula { return c('performance-throughput', 'throughput(tasks, days) = ⌊tasks / days⌋', days > 0 ? Math.floor(tasks / days) : 0, nat(tasks, days) && days > 0, 'throughput', [tasks, days]) }
  /** WEIGHTED SCORE: a rating times its weight. value rating · weight. */
  static score(rating: number, weight: number): CrossFormula { return c('performance-score', 'score(rating, weight) = rating · weight', rating * weight, nat(rating, weight), 'score', [rating, weight]) }
}

for (const name of ['appraisal', 'goal', 'improvement', 'productivity', 'rating', 'score', 'throughput', 'utilization'] as const)
  hexRegisterOf('performance', name, (PerformanceFormulas[name] as (...x: unknown[]) => unknown).bind(PerformanceFormulas))
