import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRIPPER — scaffolded integer measures crossed to robotics. Every output an exact finite nonnegative integer. */

const PROOF = 'gripper arithmetic (gripforce, strokewidth, payloadlimit, closetime, fingercount, frictionhold, contactpressure, slipmargin); scaffolded from the integer-op palette; a measure crossed to robotics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gripper', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, { name: `gripper.${name}`, params })

export class GripperFormulas {
  static gripforce(x: number, y: number): CrossFormula { return c('gripper-gripforce', 'gripforce(x, y) = x · y', x * y, nat(x, y), 'gripforce', [x, y]) }
  static strokewidth(x: number, y: number): CrossFormula { return c('gripper-strokewidth', 'strokewidth(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'strokewidth', [x, y]) }
  static payloadlimit(x: number, y: number): CrossFormula { return c('gripper-payloadlimit', 'payloadlimit(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'payloadlimit', [x, y]) }
  static closetime(x: number, y: number): CrossFormula { return c('gripper-closetime', 'closetime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'closetime', [x, y]) }
  static fingercount(x: number, y: number): CrossFormula { return c('gripper-fingercount', 'fingercount(x, y) = x + y', x + y, nat(x, y), 'fingercount', [x, y]) }
  static frictionhold(x: number, y: number): CrossFormula { return c('gripper-frictionhold', 'frictionhold(x, y) = x · y', x * y, nat(x, y), 'frictionhold', [x, y]) }
  static contactpressure(x: number, y: number): CrossFormula { return c('gripper-contactpressure', 'contactpressure(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'contactpressure', [x, y]) }
  static slipmargin(x: number, y: number): CrossFormula { return c('gripper-slipmargin', 'slipmargin(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'slipmargin', [x, y]) }
}

for (const name of ['closetime', 'contactpressure', 'fingercount', 'frictionhold', 'gripforce', 'payloadlimit', 'slipmargin', 'strokewidth'] as const)
  hexRegisterOf('gripper', name, (GripperFormulas[name] as (...x: unknown[]) => unknown).bind(GripperFormulas))
