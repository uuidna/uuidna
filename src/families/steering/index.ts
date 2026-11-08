import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STEERING — scaffolded integer measures crossed to control. Every output an exact finite nonnegative integer. */

const PROOF = 'steering arithmetic (turnradius, ackermannangle, slipangle, steeringratio, yawrate, understeer, wheelbaseratio, correctiongain); scaffolded from the integer-op palette; a measure crossed to control'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'steering', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, { name: `steering.${name}`, params })

export class SteeringFormulas {
  static turnradius(x: number, y: number): CrossFormula { return c('steering-turnradius', 'turnradius(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'turnradius', [x, y]) }
  static ackermannangle(x: number, y: number): CrossFormula { return c('steering-ackermannangle', 'ackermannangle(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'ackermannangle', [x, y]) }
  static slipangle(x: number, y: number): CrossFormula { return c('steering-slipangle', 'slipangle(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'slipangle', [x, y]) }
  static steeringratio(x: number, y: number): CrossFormula { return c('steering-steeringratio', 'steeringratio(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'steeringratio', [x, y]) }
  static yawrate(x: number, y: number): CrossFormula { return c('steering-yawrate', 'yawrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'yawrate', [x, y]) }
  static understeer(x: number, y: number): CrossFormula { return c('steering-understeer', 'understeer(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'understeer', [x, y]) }
  static wheelbaseratio(x: number, y: number): CrossFormula { return c('steering-wheelbaseratio', 'wheelbaseratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'wheelbaseratio', [x, y]) }
  static correctiongain(x: number, y: number): CrossFormula { return c('steering-correctiongain', 'correctiongain(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'correctiongain', [x, y]) }
}

for (const name of ['ackermannangle', 'correctiongain', 'slipangle', 'steeringratio', 'turnradius', 'understeer', 'wheelbaseratio', 'yawrate'] as const)
  hexRegisterOf('steering', name, (SteeringFormulas[name] as (...x: unknown[]) => unknown).bind(SteeringFormulas))
