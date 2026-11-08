import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BACKLOG — A PRODUCT BACKLOG AS ARITHMETIC (the queue of work ahead, not by hand). The backlog is numbers: the total size
 *  of what is queued, how much has been groomed, how old an item is, how fast items are done, the cycle time, how full the
 *  work-in-progress is, a priority score, and the sprints it takes to clear. Crosses to `logistics` — a backlog is a queue
 *  that moves through capacity. A measure. */

const PROOF = 'backlog arithmetic (size, grooming rate, item age, throughput, cycle time, WIP fill, prioritization, clearance time); a product queue as a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'backlog', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `backlog.${name}`, params })

export class BacklogFormulas {
  /** ITEM AGE: the days between when an item was created and now. value max(0, now − created). */
  static agedays(created: number, now: number): CrossFormula { return c('backlog-agedays', 'agedays(created, now) = max(0, now − created)', Math.max(0, now - created), nat(created, now), 'agedays', [created, now]) }
  /** CLEARANCE TIME: the sprints to clear the backlog at a per-sprint rate. value ⌈backlog / rate⌉. */
  static clearancetime(backlog: number, rate: number): CrossFormula { return c('backlog-clearancetime', 'clearancetime(backlog, rate) = ⌈backlog / rate⌉', rate > 0 ? Math.ceil(backlog / rate) : 0, nat(backlog, rate) && rate > 0, 'clearancetime', [backlog, rate]) }
  /** CYCLE TIME: total days over the items completed. value ⌊total / items⌋. */
  static cycletime(total: number, items: number): CrossFormula { return c('backlog-cycletime', 'cycletime(total, items) = ⌊total / items⌋', items > 0 ? Math.floor(total / items) : 0, nat(total, items) && items > 0, 'cycletime', [total, items]) }
  /** GROOMING RATE as a percentage. value ⌊groomed · 100 / total⌋. */
  static groomingrate(groomed: number, total: number): CrossFormula { return c('backlog-groomingrate', 'groomingrate(groomed, total) = ⌊groomed · 100 / total⌋', total > 0 ? Math.floor((groomed * 100) / total) : 0, nat(groomed, total) && total > 0 && groomed <= total, 'groomingrate', [groomed, total]) }
  /** PRIORITIZATION: a value-over-effort score. value ⌊value / effort⌋. */
  static prioritization(value: number, effort: number): CrossFormula { return c('backlog-prioritization', 'prioritization(value, effort) = ⌊value / effort⌋', effort > 0 ? Math.floor(value / effort) : 0, nat(value, effort) && effort > 0, 'prioritization', [value, effort]) }
  /** SIZE: items at a points-each. value items · each. */
  static size(items: number, each: number): CrossFormula { return c('backlog-size', 'size(items, each) = items · each', items * each, nat(items, each), 'size', [items, each]) }
  /** THROUGHPUT: items done over sprints. value ⌊done / sprints⌋. */
  static throughput(done: number, sprints: number): CrossFormula { return c('backlog-throughput', 'throughput(done, sprints) = ⌊done / sprints⌋', sprints > 0 ? Math.floor(done / sprints) : 0, nat(done, sprints) && sprints > 0, 'throughput', [done, sprints]) }
  /** WIP FILL: work-in-progress as a percentage of the limit. value ⌊wip · 100 / limit⌋. */
  static wipfill(wip: number, limit: number): CrossFormula { return c('backlog-wipfill', 'wipfill(wip, limit) = ⌊wip · 100 / limit⌋', limit > 0 ? Math.floor((wip * 100) / limit) : 0, nat(wip, limit) && limit > 0, 'wipfill', [wip, limit]) }
}

for (const name of ['agedays', 'clearancetime', 'cycletime', 'groomingrate', 'prioritization', 'size', 'throughput', 'wipfill'] as const)
  hexRegisterOf('backlog', name, (BacklogFormulas[name] as (...x: unknown[]) => unknown).bind(BacklogFormulas))
