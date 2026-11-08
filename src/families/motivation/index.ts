import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MOTIVATION — WHAT DRIVES ACTION, AS ARITHMETIC (Vroom expectancy theory, Hull drive theory, Bandura self-efficacy).
 *  Motivation is numbers: the odds effort performs, the net worth of a reward, the belief performance pays, drive from
 *  need and habit, incentive pull, effort per attempt, steps left to a goal, and confidence from past success. Crosses to
 *  `psychology` — motivation is what psychology measures in the mind. A measure. */

const PROOF = 'motivation arithmetic (expectancy, valence, instrumentality, drive, incentive, persistence, goal gradient, self-efficacy); Vroom × Hull × Bandura; a measure crossed to psychology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'motivation', dst: 'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `motivation.${name}`, params })

export class MotivationFormulas {
  /** EXPECTANCY: the odds (percent) that effort yields performance. value ⌊effort · 100 / total⌋. */
  static expectancy(effort: number, total: number): CrossFormula { return c('motivation-expectancy', 'expectancy(effort, total) = ⌊effort · 100 / total⌋', total > 0 ? Math.floor((effort * 100) / total) : 0, nat(effort, total) && total > 0 && effort <= total, 'expectancy', [effort, total]) }
  /** VALENCE: the net worth of a reward after its cost. value max(0, reward − cost). */
  static valence(reward: number, cost: number): CrossFormula { return c('motivation-valence', 'valence(reward, cost) = max(0, reward − cost)', Math.max(0, reward - cost), nat(reward, cost), 'valence', [reward, cost]) }
  /** INSTRUMENTALITY: the belief (percent) that performance pays off. value ⌊rewards · 100 / performances⌋. */
  static instrumentality(rewards: number, performances: number): CrossFormula { return c('motivation-instrumentality', 'instrumentality(rewards, performances) = ⌊rewards · 100 / performances⌋', performances > 0 ? Math.floor((rewards * 100) / performances) : 0, nat(rewards, performances) && performances > 0 && rewards <= performances, 'instrumentality', [rewards, performances]) }
  /** DRIVE: Hull's drive = need × habit strength. value need · strength. */
  static drive(need: number, strength: number): CrossFormula { return c('motivation-drive', 'drive(need, strength) = need · strength', need * strength, nat(need, strength), 'drive', [need, strength]) }
  /** INCENTIVE: the pull of a reward at its salience. value value · salience. */
  static incentive(value: number, salience: number): CrossFormula { return c('motivation-incentive', 'incentive(value, salience) = value · salience', value * salience, nat(value, salience), 'incentive', [value, salience]) }
  /** PERSISTENCE: average effort spent per attempt. value ⌊total / attempts⌋. */
  static persistence(total: number, attempts: number): CrossFormula { return c('motivation-persistence', 'persistence(total, attempts) = ⌊total / attempts⌋', attempts > 0 ? Math.floor(total / attempts) : 0, nat(total, attempts) && attempts > 0, 'persistence', [total, attempts]) }
  /** GOAL GRADIENT: the steps left to the goal at the current pace. value ⌈distance / pace⌉. */
  static goalgradient(distance: number, pace: number): CrossFormula { return c('motivation-goalgradient', 'goalgradient(distance, pace) = ⌈distance / pace⌉', pace > 0 ? Math.ceil(distance / pace) : 0, nat(distance, pace) && pace > 0, 'goalgradient', [distance, pace]) }
  /** SELF-EFFICACY: confidence (percent) from the past success rate. value ⌊successes · 100 / trials⌋. */
  static selfefficacy(successes: number, trials: number): CrossFormula { return c('motivation-selfefficacy', 'selfefficacy(successes, trials) = ⌊successes · 100 / trials⌋', trials > 0 ? Math.floor((successes * 100) / trials) : 0, nat(successes, trials) && trials > 0 && successes <= trials, 'selfefficacy', [successes, trials]) }
}

for (const name of ['drive', 'expectancy', 'goalgradient', 'incentive', 'instrumentality', 'persistence', 'selfefficacy', 'valence'] as const)
  hexRegisterOf('motivation', name, (MotivationFormulas[name] as (...x: unknown[]) => unknown).bind(MotivationFormulas))
