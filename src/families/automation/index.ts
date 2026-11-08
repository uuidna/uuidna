import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUTOMATION — THE WORK A ROBOT DOES, AS ARITHMETIC. A line of machines is numbers: tasks an hour, the share of time
 *  running, how long a cycle takes, the share of runs that err, the hours a robot saves over a hand, overall equipment
 *  effectiveness, the runs that pay a robot back, and the share of work it covers. Crosses to `robotics` — automation is
 *  what the robots carry out. A measure. */

const PROOF = 'automation arithmetic (throughput, uptime, cycle time, error rate, savings, OEE, payback, coverage); the work a robot does, a measure crossed to robotics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'automation', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, { name: `automation.${name}`, params })

export class AutomationFormulas {
  /** THROUGHPUT: tasks over the hours worked. value ⌊tasks / hours⌋. */
  static throughput(tasks: number, hours: number): CrossFormula { return c('automation-throughput', 'throughput(tasks, hours) = ⌊tasks / hours⌋', hours > 0 ? Math.floor(tasks / hours) : 0, nat(tasks, hours) && hours > 0, 'throughput', [tasks, hours]) }
  /** UPTIME as a percentage of time running. value ⌊running · 100 / total⌋. */
  static uptime(running: number, total: number): CrossFormula { return c('automation-uptime', 'uptime(running, total) = ⌊running · 100 / total⌋', total > 0 ? Math.floor((running * 100) / total) : 0, nat(running, total) && total > 0 && running <= total, 'uptime', [running, total]) }
  /** CYCLE TIME: the span from start to end. value max(0, end − start). */
  static cycletime(start: number, end: number): CrossFormula { return c('automation-cycletime', 'cycletime(start, end) = max(0, end − start)', Math.max(0, end - start), nat(start, end), 'cycletime', [start, end]) }
  /** ERROR RATE as a percentage of the runs. value ⌊errors · 100 / runs⌋. */
  static errorrate(errors: number, runs: number): CrossFormula { return c('automation-errorrate', 'errorrate(errors, runs) = ⌊errors · 100 / runs⌋', runs > 0 ? Math.floor((errors * 100) / runs) : 0, nat(errors, runs) && runs > 0 && errors <= runs, 'errorrate', [errors, runs]) }
  /** SAVINGS: the hours a robot saves over the hand it replaces. value max(0, manual − automated). */
  static savings(manual: number, automated: number): CrossFormula { return c('automation-savings', 'savings(manual, automated) = max(0, manual − automated)', Math.max(0, manual - automated), nat(manual, automated), 'savings', [manual, automated]) }
  /** OEE: overall equipment effectiveness, availability times performance. value ⌊availability · performance / 100⌋. */
  static oee(availability: number, performance: number): CrossFormula { return c('automation-oee', 'oee(availability, performance) = ⌊availability · performance / 100⌋', Math.floor((availability * performance) / 100), nat(availability, performance), 'oee', [availability, performance]) }
  /** PAYBACK: the runs a cost takes to pay back at a per-run saving. value ⌊cost / savings⌋. */
  static payback(cost: number, savings_: number): CrossFormula { return c('automation-payback', 'payback(cost, savings) = ⌊cost / savings⌋', savings_ > 0 ? Math.floor(cost / savings_) : 0, nat(cost, savings_) && savings_ > 0, 'payback', [cost, savings_]) }
  /** COVERAGE: the share of work automated. value ⌊automated · 100 / total⌋. */
  static coverage(automated: number, total: number): CrossFormula { return c('automation-coverage', 'coverage(automated, total) = ⌊automated · 100 / total⌋', total > 0 ? Math.floor((automated * 100) / total) : 0, nat(automated, total) && total > 0 && automated <= total, 'coverage', [automated, total]) }
}

for (const name of ['coverage', 'cycletime', 'errorrate', 'oee', 'payback', 'savings', 'throughput', 'uptime'] as const)
  hexRegisterOf('automation', name, (AutomationFormulas[name] as (...x: unknown[]) => unknown).bind(AutomationFormulas))
