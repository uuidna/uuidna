import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BURNDOWN — A SPRINT'S PROGRESS, AS ARITHMETIC (chosen by the registry, not by hand). Finishing work is numbers: the work
 *  that remains, the ideal and actual burn per day, the days a remainder forecasts, scope that creeps in, team velocity, the
 *  percent of a sprint done, and how far actual sits from ideal. Crosses to `statistics` — a burndown is a measured series. */

const PROOF = 'burndown arithmetic (remaining work, ideal/actual burn rate, completion forecast, scope creep, velocity, sprint progress, variance); a measured series crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'burndown', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `burndown.${name}`, params })

export class BurndownFormulas {
  /** REMAINING WORK: the points left after the done ones. value max(0, total − done). */
  static remaining(total: number, done: number): CrossFormula { return c('burndown-remaining', 'remaining(total, done) = max(0, total − done)', Math.max(0, total - done), nat(total, done) && done <= total, 'remaining', [total, done]) }
  /** IDEAL RATE: the work to burn each day to finish on time. value ⌊total / days⌋. */
  static idealrate(total: number, days: number): CrossFormula { return c('burndown-idealrate', 'idealrate(total, days) = ⌊total / days⌋', days > 0 ? Math.floor(total / days) : 0, nat(total, days) && days > 0, 'idealrate', [total, days]) }
  /** ACTUAL RATE: the work actually burned each day. value ⌊done / days⌋. */
  static actualrate(done: number, days: number): CrossFormula { return c('burndown-actualrate', 'actualrate(done, days) = ⌊done / days⌋', days > 0 ? Math.floor(done / days) : 0, nat(done, days) && days > 0, 'actualrate', [done, days]) }
  /** COMPLETION FORECAST: the days a remainder needs at the current rate. value ⌈remaining / rate⌉. */
  static completionforecast(remaining: number, rate: number): CrossFormula { return c('burndown-completionforecast', 'completionforecast(remaining, rate) = ⌈remaining / rate⌉', rate > 0 ? Math.ceil(remaining / rate) : 0, nat(remaining, rate) && rate > 0, 'completionforecast', [remaining, rate]) }
  /** SCOPE CREEP: the net work added mid-sprint. value max(0, added − removed). */
  static scopecreep(added: number, removed: number): CrossFormula { return c('burndown-scopecreep', 'scopecreep(added, removed) = max(0, added − removed)', Math.max(0, added - removed), nat(added, removed), 'scopecreep', [added, removed]) }
  /** VELOCITY: the points a team clears per sprint. value ⌊points / sprints⌋. */
  static velocity(points: number, sprints: number): CrossFormula { return c('burndown-velocity', 'velocity(points, sprints) = ⌊points / sprints⌋', sprints > 0 ? Math.floor(points / sprints) : 0, nat(points, sprints) && sprints > 0, 'velocity', [points, sprints]) }
  /** SPRINT PROGRESS as a percentage. value ⌊done · 100 / total⌋. */
  static sprintprogress(done: number, total: number): CrossFormula { return c('burndown-sprintprogress', 'sprintprogress(done, total) = ⌊done · 100 / total⌋', total > 0 ? Math.floor((done * 100) / total) : 0, nat(done, total) && total > 0 && done <= total, 'sprintprogress', [done, total]) }
  /** VARIANCE: how far actual burn sits above the ideal. value max(0, actual − ideal). */
  static variance(actual: number, ideal: number): CrossFormula { return c('burndown-variance', 'variance(actual, ideal) = max(0, actual − ideal)', Math.max(0, actual - ideal), nat(actual, ideal), 'variance', [actual, ideal]) }
}

for (const name of ['actualrate', 'completionforecast', 'idealrate', 'remaining', 'scopecreep', 'sprintprogress', 'variance', 'velocity'] as const)
  hexRegisterOf('burndown', name, (BurndownFormulas[name] as (...x: unknown[]) => unknown).bind(BurndownFormulas))
