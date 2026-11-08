import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STEPS — THE STEPS BLOCK USE CASE FROM payloadcms/website, AS ARITHMETIC. A step-by-step flow (onboarding, a tutorial)
 *  is numbers: how far along a run is, which step is current, how many steps remain, the count of steps, whether a position
 *  is in order, how long the flow takes, how deeply steps nest, and the completion rate. Crosses to `frontend` — steps are
 *  what the frontend renders. A measure. */

const PROOF = 'steps arithmetic (progress, current, remaining, count, order, duration, depth, completion); the Steps block use case from payloadcms/website; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'steps', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `steps.${name}`, params })

export class StepsFormulas {
  /** PROGRESS: steps done as a percentage of the total. value ⌊done · 100 / total⌋. */
  static progress(done: number, total: number): CrossFormula { return c('steps-progress', 'progress(done, total) = ⌊done · 100 / total⌋', total > 0 ? Math.floor((done * 100) / total) : 0, nat(done, total) && total > 0 && done <= total, 'progress', [done, total]) }
  /** CURRENT: the current step as a percentage of the total. value ⌊step · 100 / total⌋. */
  static current(step: number, total: number): CrossFormula { return c('steps-current', 'current(step, total) = ⌊step · 100 / total⌋', total > 0 ? Math.floor((step * 100) / total) : 0, nat(step, total) && total > 0 && step <= total, 'current', [step, total]) }
  /** REMAINING: the steps left to do. value max(0, total − done). */
  static remaining(done: number, total: number): CrossFormula { return c('steps-remaining', 'remaining(done, total) = max(0, total − done)', Math.max(0, total - done), nat(done, total), 'remaining', [done, total]) }
  /** COUNT: the number of steps in the flow. value steps. */
  static count(steps: number): CrossFormula { return c('steps-count', 'count(steps) = steps', steps, nat(steps), 'count', [steps]) }
  /** ORDER: 1 when a position is within the total. value [position ≤ total]. */
  static order(position: number, total: number): CrossFormula { return c('steps-order', 'order(position, total) = [position ≤ total]', position <= total ? 1 : 0, nat(position, total), 'order', [position, total]) }
  /** DURATION: steps at a time each. value steps · perStep. */
  static duration(steps: number, perStep: number): CrossFormula { return c('steps-duration', 'duration(steps, perStep) = steps · perStep', steps * perStep, nat(steps, perStep), 'duration', [steps, perStep]) }
  /** DEPTH: how deeply steps nest (holds at five or fewer). value nested. */
  static depth(nested: number): CrossFormula { return c('steps-depth', 'depth(nested) = nested', nested, nat(nested) && nested <= 5, 'depth', [nested]) }
  /** COMPLETION: finished runs as a percentage of started. value ⌊finished · 100 / started⌋. */
  static completion(finished: number, started: number): CrossFormula { return c('steps-completion', 'completion(finished, started) = ⌊finished · 100 / started⌋', started > 0 ? Math.floor((finished * 100) / started) : 0, nat(finished, started) && started > 0 && finished <= started, 'completion', [finished, started]) }
}

for (const name of ['completion', 'count', 'current', 'depth', 'duration', 'order', 'progress', 'remaining'] as const)
  hexRegisterOf('steps', name, (StepsFormulas[name] as (...x: unknown[]) => unknown).bind(StepsFormulas))
