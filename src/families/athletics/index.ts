import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ATHLETICS — PERFORMANCE AS ARITHMETIC. Sport is numbers: pace per unit of distance, speed over time, stride per step,
 *  the even split across laps, an estimated VO2 max, mechanical power, the height of a jump, and a scoring-table points
 *  total against a standard. Crosses to `sports` — athletics is the measured side of the game. A measure. */

const PROOF = 'athletics arithmetic (pace, speed, stride, split, vo2max, power, jump, points); performance as integer measures crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'athletics', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `athletics.${name}`, params })

export class AthleticsFormulas {
  /** PACE: seconds per unit of distance. value ⌊seconds / distance⌋. */
  static pace(seconds: number, distance: number): CrossFormula { return c('athletics-pace', 'pace(seconds, distance) = ⌊seconds / distance⌋', distance > 0 ? Math.floor(seconds / distance) : 0, nat(seconds, distance) && distance > 0, 'pace', [seconds, distance]) }
  /** SPEED: distance over seconds. value ⌊distance / seconds⌋. */
  static speed(distance: number, seconds: number): CrossFormula { return c('athletics-speed', 'speed(distance, seconds) = ⌊distance / seconds⌋', seconds > 0 ? Math.floor(distance / seconds) : 0, nat(distance, seconds) && seconds > 0, 'speed', [distance, seconds]) }
  /** STRIDE: distance per step. value ⌊distance / steps⌋. */
  static stride(distance: number, steps: number): CrossFormula { return c('athletics-stride', 'stride(distance, steps) = ⌊distance / steps⌋', steps > 0 ? Math.floor(distance / steps) : 0, nat(distance, steps) && steps > 0, 'stride', [distance, steps]) }
  /** SPLIT: an even share of the total across the laps. value ⌊total / laps⌋. */
  static split(total: number, laps: number): CrossFormula { return c('athletics-split', 'split(total, laps) = ⌊total / laps⌋', laps > 0 ? Math.floor(total / laps) : 0, nat(total, laps) && laps > 0, 'split', [total, laps]) }
  /** VO2 MAX: a speed-over-age estimate. value ⌊speed · 1000 / age⌋. */
  static vo2max(speed_: number, age: number): CrossFormula { return c('athletics-vo2max', 'vo2max(speed, age) = ⌊speed · 1000 / age⌋', age > 0 ? Math.floor((speed_ * 1000) / age) : 0, nat(speed_, age) && age > 0, 'vo2max', [speed_, age]) }
  /** POWER: work over time. value ⌊work / time⌋. */
  static power(work: number, time: number): CrossFormula { return c('athletics-power', 'power(work, time) = ⌊work / time⌋', time > 0 ? Math.floor(work / time) : 0, nat(work, time) && time > 0, 'power', [work, time]) }
  /** JUMP: height from takeoff speed under gravity. value ⌊takeoff² / (2 · gravity)⌋. */
  static jump(takeoff: number, gravity: number): CrossFormula { return c('athletics-jump', 'jump(takeoff, gravity) = ⌊takeoff² / (2 · gravity)⌋', gravity > 0 ? Math.floor((takeoff * takeoff) / (2 * gravity)) : 0, nat(takeoff, gravity) && gravity > 0, 'jump', [takeoff, gravity]) }
  /** POINTS: a scoring-table total against a standard. value ⌊performance · 1000 / standard⌋. */
  static points(performance: number, standard: number): CrossFormula { return c('athletics-points', 'points(performance, standard) = ⌊performance · 1000 / standard⌋', standard > 0 ? Math.floor((performance * 1000) / standard) : 0, nat(performance, standard) && standard > 0, 'points', [performance, standard]) }
}

for (const name of ['jump', 'pace', 'points', 'power', 'speed', 'split', 'stride', 'vo2max'] as const)
  hexRegisterOf('athletics', name, (AthleticsFormulas[name] as (...x: unknown[]) => unknown).bind(AthleticsFormulas))
