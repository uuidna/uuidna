import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCHEDULING — PROJECT TIME AS ARITHMETIC. A plan is numbers: the critical path through parallel legs, the slack a task
 *  can absorb, the free float before a successor, the duration a crew needs, the lead/lag between links, resource
 *  utilization, the makespan of the whole plan, and how late a finish lands. Crosses to `logistics` — scheduling is the
 *  clock logistics moves against. A measure. */

const PROOF = 'scheduling arithmetic (critical path, slack, free float, duration, lead/lag, utilization, makespan, lateness); project time as integers; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'scheduling', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `scheduling.${name}`, params })

export class SchedulingFormulas {
  /** CRITICAL PATH: the longest of three parallel legs. value max(a, b, c). */
  static criticalpath(a: number, b: number, c2: number): CrossFormula { return c('scheduling-criticalpath', 'criticalpath(a, b, c) = max(a, b, c)', Math.max(a, b, c2), nat(a, b, c2), 'criticalpath', [a, b, c2]) }
  /** DURATION: work divided over a crew. value ⌈work / crew⌉. */
  static duration(work: number, crew: number): CrossFormula { return c('scheduling-duration', 'duration(work, crew) = ⌈work / crew⌉', crew > 0 ? Math.ceil(work / crew) : 0, nat(work, crew) && crew > 0, 'duration', [work, crew]) }
  /** FREE FLOAT: slack before a successor's earliest start. value max(0, nextEarly − finish). */
  static float(nextEarly: number, finish: number): CrossFormula { return c('scheduling-float', 'float(nextEarly, finish) = max(0, nextEarly − finish)', Math.max(0, nextEarly - finish), nat(nextEarly, finish), 'float', [nextEarly, finish]) }
  /** LATENESS: how far a finish overruns its due date. value max(0, finish − due). */
  static lateness(finish: number, due: number): CrossFormula { return c('scheduling-lateness', 'lateness(finish, due) = max(0, finish − due)', Math.max(0, finish - due), nat(finish, due), 'lateness', [finish, due]) }
  /** LEAD/LAG: a successor's start offset from a predecessor finish. value finish + lag. */
  static leadlag(finish: number, lag: number): CrossFormula { return c('scheduling-leadlag', 'leadlag(finish, lag) = finish + lag', finish + lag, nat(finish, lag), 'leadlag', [finish, lag]) }
  /** MAKESPAN: span from first start to last finish. value max(0, last − first). */
  static makespan(last: number, first: number): CrossFormula { return c('scheduling-makespan', 'makespan(last, first) = max(0, last − first)', Math.max(0, last - first), nat(last, first), 'makespan', [last, first]) }
  /** SLACK: total float a task can absorb. value max(0, latest − early). */
  static slack(latest: number, early: number): CrossFormula { return c('scheduling-slack', 'slack(latest, early) = max(0, latest − early)', Math.max(0, latest - early), nat(latest, early), 'slack', [latest, early]) }
  /** UTILIZATION: busy over available, as a percentage. value ⌊busy · 100 / avail⌋. */
  static utilization(busy: number, avail: number): CrossFormula { return c('scheduling-utilization', 'utilization(busy, avail) = ⌊busy · 100 / avail⌋', avail > 0 ? Math.floor((busy * 100) / avail) : 0, nat(busy, avail) && avail > 0 && busy <= avail, 'utilization', [busy, avail]) }
}

for (const name of ['criticalpath', 'duration', 'float', 'lateness', 'leadlag', 'makespan', 'slack', 'utilization'] as const)
  hexRegisterOf('scheduling', name, (SchedulingFormulas[name] as (...x: unknown[]) => unknown).bind(SchedulingFormulas))
