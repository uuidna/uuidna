import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ODOMETRY — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'odometry arithmetic (distance, wheelrevolutions, headingchange, positionerror, ticksperrev, driftrate, slipcompensation, pathdistance); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'odometry', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `odometry.${name}`, params })

export class OdometryFormulas {
  static distance(x: number, y: number): CrossFormula { return c('odometry-distance', 'distance(x, y) = x · y', x * y, nat(x, y), 'distance', [x, y]) }
  static wheelrevolutions(x: number, y: number): CrossFormula { return c('odometry-wheelrevolutions', 'wheelrevolutions(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'wheelrevolutions', [x, y]) }
  static headingchange(x: number, y: number): CrossFormula { return c('odometry-headingchange', 'headingchange(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'headingchange', [x, y]) }
  static positionerror(x: number, y: number): CrossFormula { return c('odometry-positionerror', 'positionerror(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'positionerror', [x, y]) }
  static ticksperrev(x: number, y: number): CrossFormula { return c('odometry-ticksperrev', 'ticksperrev(x, y) = x · y', x * y, nat(x, y), 'ticksperrev', [x, y]) }
  static driftrate(x: number, y: number): CrossFormula { return c('odometry-driftrate', 'driftrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'driftrate', [x, y]) }
  static slipcompensation(x: number, y: number): CrossFormula { return c('odometry-slipcompensation', 'slipcompensation(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'slipcompensation', [x, y]) }
  static pathdistance(x: number, y: number): CrossFormula { return c('odometry-pathdistance', 'pathdistance(x, y) = x + y', x + y, nat(x, y), 'pathdistance', [x, y]) }
}

for (const name of ['distance', 'driftrate', 'headingchange', 'pathdistance', 'positionerror', 'slipcompensation', 'ticksperrev', 'wheelrevolutions'] as const)
  hexRegisterOf('odometry', name, (OdometryFormulas[name] as (...x: unknown[]) => unknown).bind(OdometryFormulas))
