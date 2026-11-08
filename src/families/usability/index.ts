import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** USABILITY — HOW WELL PEOPLE SUCCEED WITH THE INTERFACE, AS ARITHMETIC. Task success, time efficiency, error rate,
 *  satisfaction, learnability, time on task, a SUS proxy, and retention. Crosses to `layout` — usability is what the
 *  arrangement of the screen earns or loses. A measure. */

const PROOF = 'usability arithmetic (task success, efficiency, error rate, satisfaction, learnability, time on task, SUS proxy, retention); how well people succeed with the interface; a measure crossed to layout'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'usability', dst: 'layout', formula, value, proof: PROOF, ...extra }, holds, { name: `usability.${name}`, params })

export class UsabilityFormulas {
  /** TASK SUCCESS: completed over attempts as a percentage. value ⌊completed · 100 / attempts⌋. */
  static success(completed: number, attempts: number): CrossFormula { return c('usability-success', 'success(completed, attempts) = ⌊completed · 100 / attempts⌋', attempts > 0 ? Math.floor((completed * 100) / attempts) : 0, nat(completed, attempts) && attempts > 0 && completed <= attempts, 'success', [completed, attempts]) }
  /** EFFICIENCY: tasks finished per unit time, scaled. value ⌊tasks · 100 / time⌋. */
  static efficiency(tasks: number, time: number): CrossFormula { return c('usability-efficiency', 'efficiency(tasks, time) = ⌊tasks · 100 / time⌋', time > 0 ? Math.floor((tasks * 100) / time) : 0, nat(tasks, time) && time > 0, 'efficiency', [tasks, time]) }
  /** ERROR RATE: mistakes over tasks as a percentage. value ⌊mistakes · 100 / tasks⌋. */
  static errors(mistakes: number, tasks: number): CrossFormula { return c('usability-errors', 'errors(mistakes, tasks) = ⌊mistakes · 100 / tasks⌋', tasks > 0 ? Math.floor((mistakes * 100) / tasks) : 0, nat(mistakes, tasks) && tasks > 0, 'errors', [mistakes, tasks]) }
  /** SATISFACTION: score over the maximum as a percentage. value ⌊score · 100 / max⌋. */
  static satisfaction(score: number, max: number): CrossFormula { return c('usability-satisfaction', 'satisfaction(score, max) = ⌊score · 100 / max⌋', max > 0 ? Math.floor((score * 100) / max) : 0, nat(score, max) && max > 0 && score <= max, 'satisfaction', [score, max]) }
  /** LEARNABILITY: improvement averaged over sessions. value ⌊improved / sessions⌋. */
  static learnability(improved: number, sessions: number): CrossFormula { return c('usability-learnability', 'learnability(improved, sessions) = ⌊improved / sessions⌋', sessions > 0 ? Math.floor(improved / sessions) : 0, nat(improved, sessions) && sessions > 0, 'learnability', [improved, sessions]) }
  /** TIME ON TASK: seconds averaged over tasks. value ⌊seconds / tasks⌋. */
  static timeontask(seconds: number, tasks: number): CrossFormula { return c('usability-timeontask', 'timeontask(seconds, tasks) = ⌊seconds / tasks⌋', tasks > 0 ? Math.floor(seconds / tasks) : 0, nat(seconds, tasks) && tasks > 0, 'timeontask', [seconds, tasks]) }
  /** SUS PROXY: a raw score scaled to the familiar 0–100 band. value ⌊raw · 25 / 10⌋. */
  static sus(raw: number): CrossFormula { return c('usability-sus', 'sus(raw) = ⌊raw · 25 / 10⌋', Math.floor((raw * 25) / 10), nat(raw), 'sus', [raw]) }
  /** RETENTION: returning users over all users as a percentage. value ⌊returned · 100 / users⌋. */
  static retention(returned: number, users: number): CrossFormula { return c('usability-retention', 'retention(returned, users) = ⌊returned · 100 / users⌋', users > 0 ? Math.floor((returned * 100) / users) : 0, nat(returned, users) && users > 0 && returned <= users, 'retention', [returned, users]) }
}

for (const name of ['efficiency', 'errors', 'learnability', 'retention', 'satisfaction', 'success', 'sus', 'timeontask'] as const)
  hexRegisterOf('usability', name, (UsabilityFormulas[name] as (...x: unknown[]) => unknown).bind(UsabilityFormulas))
