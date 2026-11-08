import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ONBOARDING — BRINGING A NEW HIRE UP TO SPEED, AS ARITHMETIC. Getting someone productive is numbers: the ramp a plan
 *  earns, how much of it is done, the stages crossed, the cost of enablement, the days to productive, the checklist pace,
 *  mentoring hours spent, and whether satisfaction meets the bar. Crosses to `pedagogy` — onboarding is teaching a person
 *  the job. A measure. */

const PROOF = 'onboarding arithmetic (rampup, completion, milestone, enablement cost, time-to-productive, checklist pace, mentoring hours, satisfaction); a measure crossed to pedagogy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'onboarding', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name: `onboarding.${name}`, params })

export class OnboardingFormulas {
  /** RAMPUP: productivity earned over days at a per-day gain. value days · perDay. */
  static rampup(days: number, perDay: number): CrossFormula { return c('onboarding-rampup', 'rampup(days, perDay) = days · perDay', days * perDay, nat(days, perDay), 'rampup', [days, perDay]) }
  /** COMPLETION of the plan as a percentage. value ⌊done · 100 / total⌋. */
  static completion(done: number, total: number): CrossFormula { return c('onboarding-completion', 'completion(done, total) = ⌊done · 100 / total⌋', total > 0 ? Math.floor((done * 100) / total) : 0, nat(done, total) && total > 0 && done <= total, 'completion', [done, total]) }
  /** MILESTONE: the stages a set of tasks spans at a per-stage size. value ⌈tasks / perStage⌉. */
  static milestone(tasks: number, perStage: number): CrossFormula { return c('onboarding-milestone', 'milestone(tasks, perStage) = ⌈tasks / perStage⌉', perStage > 0 ? Math.ceil(tasks / perStage) : 0, nat(tasks, perStage) && perStage > 0, 'milestone', [tasks, perStage]) }
  /** ENABLEMENT COST: training hours at a rate per thousand. value ⌊hours · rate / 1000⌋. */
  static enablement(hours: number, rate: number): CrossFormula { return c('onboarding-enablement', 'enablement(hours, rate) = ⌊hours · rate / 1000⌋', Math.floor((hours * rate) / 1000), nat(hours, rate), 'enablement', [hours, rate]) }
  /** TIME-TO-PRODUCTIVE: total ramp days over the hires. value ⌊totalDays / hires⌋. */
  static timetoproductive(totalDays: number, hires: number): CrossFormula { return c('onboarding-timetoproductive', 'timetoproductive(totalDays, hires) = ⌊totalDays / hires⌋', hires > 0 ? Math.floor(totalDays / hires) : 0, nat(totalDays, hires) && hires > 0, 'timetoproductive', [totalDays, hires]) }
  /** CHECKLIST PACE: items cleared per day. value ⌊items / days⌋. */
  static checklist(items: number, days: number): CrossFormula { return c('onboarding-checklist', 'checklist(items, days) = ⌊items / days⌋', days > 0 ? Math.floor(items / days) : 0, nat(items, days) && days > 0, 'checklist', [items, days]) }
  /** MENTORING: sessions at hours each. value sessions · hours. */
  static mentoring(sessions: number, hours: number): CrossFormula { return c('onboarding-mentoring', 'mentoring(sessions, hours) = sessions · hours', sessions * hours, nat(sessions, hours), 'mentoring', [sessions, hours]) }
  /** SATISFACTION: 1 when the score meets the target. value [score ≥ target]. */
  static satisfaction(score: number, target: number): CrossFormula { return c('onboarding-satisfaction', 'satisfaction(score, target) = [score ≥ target]', score >= target ? 1 : 0, nat(score, target) && score <= 100 && target <= 100, 'satisfaction', [score, target]) }
}

for (const name of ['checklist', 'completion', 'enablement', 'mentoring', 'milestone', 'rampup', 'satisfaction', 'timetoproductive'] as const)
  hexRegisterOf('onboarding', name, (OnboardingFormulas[name] as (...x: unknown[]) => unknown).bind(OnboardingFormulas))
