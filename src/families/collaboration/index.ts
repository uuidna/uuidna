import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COLLABORATION — TEAM WORK AS ARITHMETIC (chosen by the registry). A team is numbers: task completion, per-member
 *  workload, the cost of a meeting in person-minutes, cycle time, the backlog, throughput, utilization, and average
 *  response time. Crosses to `obs`. A measure. */

const PROOF = 'collaboration arithmetic (task completion, workload, meeting cost, cycle time, backlog, throughput, utilization, response time); a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'collaboration', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `collaboration.${name}`, params })

export class CollaborationFormulas {
  /** TASK COMPLETION as a percentage. value ⌊done · 100 / total⌋. */
  static tasks(done: number, total: number): CrossFormula { return c('collaboration-tasks', 'tasks(done, total) = ⌊done · 100 / total⌋', total > 0 ? Math.floor((done * 100) / total) : 0, nat(done, total) && total > 0 && done <= total, 'tasks', [done, total]) }
  /** PER-MEMBER WORKLOAD: open tasks over members. value ⌊tasks / members⌋. */
  static workload(tasks: number, members: number): CrossFormula { return c('collaboration-workload', 'workload(tasks, members) = ⌊tasks / members⌋', members > 0 ? Math.floor(tasks / members) : 0, nat(tasks, members) && members > 0, 'workload', [tasks, members]) }
  /** THE COST OF A MEETING in person-minutes. value people · minutes. */
  static meeting(people: number, minutes: number): CrossFormula { return c('collaboration-meeting', 'meeting(people, minutes) = people · minutes', people * minutes, nat(people, minutes), 'meeting', [people, minutes]) }
  /** CYCLE TIME: the days from start to finish. value max(0, end − start). */
  static cycle(start: number, end: number): CrossFormula { return c('collaboration-cycle', 'cycle(start, end) = max(0, end − start)', Math.max(0, end - start), nat(start, end), 'cycle', [start, end]) }
  /** THE BACKLOG: items created not yet closed. value max(0, created − closed). */
  static backlog(created: number, closed: number): CrossFormula { return c('collaboration-backlog', 'backlog(created, closed) = max(0, created − closed)', Math.max(0, created - closed), nat(created, closed), 'backlog', [created, closed]) }
  /** THROUGHPUT: items closed over days. value ⌊closed / days⌋. */
  static throughput(closed: number, days: number): CrossFormula { return c('collaboration-throughput', 'throughput(closed, days) = ⌊closed / days⌋', days > 0 ? Math.floor(closed / days) : 0, nat(closed, days) && days > 0, 'throughput', [closed, days]) }
  /** UTILIZATION as a percentage: billable hours over total. value ⌊billable · 100 / total⌋. */
  static utilization(billable: number, total: number): CrossFormula { return c('collaboration-utilization', 'utilization(billable, total) = ⌊billable · 100 / total⌋', total > 0 ? Math.floor((billable * 100) / total) : 0, nat(billable, total) && total > 0 && billable <= total, 'utilization', [billable, total]) }
  /** AVERAGE RESPONSE TIME: total minutes over the tickets answered. value ⌊total / tickets⌋. */
  static response(total: number, tickets: number): CrossFormula { return c('collaboration-response', 'response(total, tickets) = ⌊total / tickets⌋', tickets > 0 ? Math.floor(total / tickets) : 0, nat(total, tickets) && tickets > 0, 'response', [total, tickets]) }
}

for (const name of ['backlog', 'cycle', 'meeting', 'response', 'tasks', 'throughput', 'utilization', 'workload'] as const)
  hexRegisterOf('collaboration', name, (CollaborationFormulas[name] as (...x: unknown[]) => unknown).bind(CollaborationFormulas))
