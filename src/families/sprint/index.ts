import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPRINT — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'sprint arithmetic (velocity, acceleration, stridelength, stridefrequency, splittime, topspeed, distancecovered, reactiontime); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sprint', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `sprint.${name}`, params })

export class SprintFormulas {
  static velocity(x: number, y: number): CrossFormula { return c('sprint-velocity', 'velocity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'velocity', [x, y]) }
  static acceleration(x: number, y: number): CrossFormula { return c('sprint-acceleration', 'acceleration(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'acceleration', [x, y]) }
  static stridelength(x: number, y: number): CrossFormula { return c('sprint-stridelength', 'stridelength(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'stridelength', [x, y]) }
  static stridefrequency(x: number, y: number): CrossFormula { return c('sprint-stridefrequency', 'stridefrequency(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'stridefrequency', [x, y]) }
  static splittime(x: number, y: number): CrossFormula { return c('sprint-splittime', 'splittime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'splittime', [x, y]) }
  static topspeed(x: number, y: number): CrossFormula { return c('sprint-topspeed', 'topspeed(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'topspeed', [x, y]) }
  static distancecovered(x: number, y: number): CrossFormula { return c('sprint-distancecovered', 'distancecovered(x, y) = x · y', x * y, nat(x, y), 'distancecovered', [x, y]) }
  static reactiontime(x: number, y: number): CrossFormula { return c('sprint-reactiontime', 'reactiontime(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'reactiontime', [x, y]) }
}

for (const name of ['acceleration', 'distancecovered', 'reactiontime', 'splittime', 'stridefrequency', 'stridelength', 'topspeed', 'velocity'] as const)
  hexRegisterOf('sprint', name, (SprintFormulas[name] as (...x: unknown[]) => unknown).bind(SprintFormulas))
