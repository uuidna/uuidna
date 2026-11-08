import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BACKLASH — scaffolded integer measures crossed to control. Every output an exact finite nonnegative integer. */

const PROOF = 'backlash arithmetic (deadband, compensation, hysteresis, lostmotion, positioningerror, gearplay, reversaldelay, stiffnessloss); scaffolded from the integer-op palette; a measure crossed to control'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'backlash', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, { name: `backlash.${name}`, params })

export class BacklashFormulas {
  static deadband(x: number, y: number): CrossFormula { return c('backlash-deadband', 'deadband(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'deadband', [x, y]) }
  static compensation(x: number, y: number): CrossFormula { return c('backlash-compensation', 'compensation(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'compensation', [x, y]) }
  static hysteresis(x: number, y: number): CrossFormula { return c('backlash-hysteresis', 'hysteresis(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'hysteresis', [x, y]) }
  static lostmotion(x: number, y: number): CrossFormula { return c('backlash-lostmotion', 'lostmotion(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'lostmotion', [x, y]) }
  static positioningerror(x: number, y: number): CrossFormula { return c('backlash-positioningerror', 'positioningerror(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'positioningerror', [x, y]) }
  static gearplay(x: number, y: number): CrossFormula { return c('backlash-gearplay', 'gearplay(x, y) = x · y', x * y, nat(x, y), 'gearplay', [x, y]) }
  static reversaldelay(x: number, y: number): CrossFormula { return c('backlash-reversaldelay', 'reversaldelay(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'reversaldelay', [x, y]) }
  static stiffnessloss(x: number, y: number): CrossFormula { return c('backlash-stiffnessloss', 'stiffnessloss(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'stiffnessloss', [x, y]) }
}

for (const name of ['compensation', 'deadband', 'gearplay', 'hysteresis', 'lostmotion', 'positioningerror', 'reversaldelay', 'stiffnessloss'] as const)
  hexRegisterOf('backlash', name, (BacklashFormulas[name] as (...x: unknown[]) => unknown).bind(BacklashFormulas))
