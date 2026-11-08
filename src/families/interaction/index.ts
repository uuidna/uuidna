import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INTERACTION — HUMAN-COMPUTER INTERACTION, AS ARITHMETIC. The press and the answer are numbers: Fitts's index of
 *  difficulty, response time, clicks per goal, gestures, feedback lag past a threshold, affordance discovery, task flow,
 *  and target size. Crosses to `layout` — interaction is what a layout is laid out for. A measure. */

const PROOF = 'interaction arithmetic (fitts index, response time, clicks per goal, gestures, feedback lag, affordance discovery, flow, target size); human-computer interaction as a measure crossed to layout'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'interaction', dst: 'layout', formula, value, proof: PROOF, ...extra }, holds, { name: `interaction.${name}`, params })

export class InteractionFormulas {
  /** FITTS INDEX OF DIFFICULTY proxy: distance over target width, scaled. value ⌊distance · 100 / width⌋. */
  static fitts(distance: number, width: number): CrossFormula { return c('interaction-fitts', 'fitts(distance, width) = ⌊distance · 100 / width⌋', width > 0 ? Math.floor((distance * 100) / width) : 0, nat(distance, width) && width > 0, 'fitts', [distance, width]) }
  /** RESPONSE TIME in milliseconds. value milliseconds. */
  static responsetime(milliseconds: number): CrossFormula { return c('interaction-responsetime', 'responsetime(milliseconds) = milliseconds', milliseconds, nat(milliseconds), 'responsetime', [milliseconds]) }
  /** CLICKS PER GOAL: actions over the goals reached. value ⌊actions / goals⌋. */
  static clicks(actions: number, goals: number): CrossFormula { return c('interaction-clicks', 'clicks(actions, goals) = ⌊actions / goals⌋', goals > 0 ? Math.floor(actions / goals) : 0, nat(actions, goals) && goals > 0, 'clicks', [actions, goals]) }
  /** GESTURES: the gesture count. value count. */
  static gestures(count: number): CrossFormula { return c('interaction-gestures', 'gestures(count) = count', count, nat(count), 'gestures', [count]) }
  /** FEEDBACK LAG past a threshold. value max(0, delay − threshold). */
  static feedback(delay: number, threshold: number): CrossFormula { return c('interaction-feedback', 'feedback(delay, threshold) = max(0, delay − threshold)', Math.max(0, delay - threshold), nat(delay, threshold), 'feedback', [delay, threshold]) }
  /** AFFORDANCE DISCOVERY as a percentage of what is available. value ⌊discovered · 100 / available⌋. */
  static affordance(discovered: number, available: number): CrossFormula { return c('interaction-affordance', 'affordance(discovered, available) = ⌊discovered · 100 / available⌋', available > 0 ? Math.floor((discovered * 100) / available) : 0, nat(discovered, available) && available > 0 && discovered <= available, 'affordance', [discovered, available]) }
  /** FLOW: completed tasks over the tasks attempted. value ⌊completed · 100 / (completed + interrupted)⌋. */
  static flow(completed: number, interrupted: number): CrossFormula { return c('interaction-flow', 'flow(completed, interrupted) = ⌊completed · 100 / (completed + interrupted)⌋', (completed + interrupted) > 0 ? Math.floor((completed * 100) / (completed + interrupted)) : 0, nat(completed, interrupted) && (completed + interrupted) > 0, 'flow', [completed, interrupted]) }
  /** TARGET SIZE in pixels. value pixels. */
  static targetsize(pixels: number): CrossFormula { return c('interaction-targetsize', 'targetsize(pixels) = pixels', pixels, nat(pixels), 'targetsize', [pixels]) }
}

for (const name of ['affordance', 'clicks', 'feedback', 'fitts', 'flow', 'gestures', 'responsetime', 'targetsize'] as const)
  hexRegisterOf('interaction', name, (InteractionFormulas[name] as (...x: unknown[]) => unknown).bind(InteractionFormulas))
