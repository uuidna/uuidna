import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRAJECTORY — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'trajectory arithmetic (displacement, peakvelocity, acceleration, jerklimit, pathlength, segmenttime, blendradius, traversaltime); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'trajectory', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `trajectory.${name}`, params })

export class TrajectoryFormulas {
  static displacement(x: number, y: number): CrossFormula { return c('trajectory-displacement', 'displacement(x, y) = x · y', x * y, nat(x, y), 'displacement', [x, y]) }
  static peakvelocity(x: number, y: number): CrossFormula { return c('trajectory-peakvelocity', 'peakvelocity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'peakvelocity', [x, y]) }
  static acceleration(x: number, y: number): CrossFormula { return c('trajectory-acceleration', 'acceleration(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'acceleration', [x, y]) }
  static jerklimit(x: number, y: number): CrossFormula { return c('trajectory-jerklimit', 'jerklimit(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'jerklimit', [x, y]) }
  static pathlength(x: number, y: number): CrossFormula { return c('trajectory-pathlength', 'pathlength(x, y) = x + y', x + y, nat(x, y), 'pathlength', [x, y]) }
  static segmenttime(x: number, y: number): CrossFormula { return c('trajectory-segmenttime', 'segmenttime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'segmenttime', [x, y]) }
  static blendradius(x: number, y: number): CrossFormula { return c('trajectory-blendradius', 'blendradius(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'blendradius', [x, y]) }
  static traversaltime(x: number, y: number): CrossFormula { return c('trajectory-traversaltime', 'traversaltime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'traversaltime', [x, y]) }
}

for (const name of ['acceleration', 'blendradius', 'displacement', 'jerklimit', 'pathlength', 'peakvelocity', 'segmenttime', 'traversaltime'] as const)
  hexRegisterOf('trajectory', name, (TrajectoryFormulas[name] as (...x: unknown[]) => unknown).bind(TrajectoryFormulas))
