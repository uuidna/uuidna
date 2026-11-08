import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POWERFACTOR — scaffolded integer measures crossed to electronics. Every output an exact finite nonnegative integer. */

const PROOF = 'powerfactor arithmetic (ratio, realpower, apparentpower, reactivepower, correction, phaseangle, capacitorkvar, efficiency); scaffolded from the integer-op palette; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'powerfactor', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `powerfactor.${name}`, params })

export class PowerfactorFormulas {
  static ratio(x: number, y: number): CrossFormula { return c('powerfactor-ratio', 'ratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ratio', [x, y]) }
  static realpower(x: number, y: number): CrossFormula { return c('powerfactor-realpower', 'realpower(x, y) = x · y', x * y, nat(x, y), 'realpower', [x, y]) }
  static apparentpower(x: number, y: number): CrossFormula { return c('powerfactor-apparentpower', 'apparentpower(x, y) = x · y', x * y, nat(x, y), 'apparentpower', [x, y]) }
  static reactivepower(x: number, y: number): CrossFormula { return c('powerfactor-reactivepower', 'reactivepower(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'reactivepower', [x, y]) }
  static correction(x: number, y: number): CrossFormula { return c('powerfactor-correction', 'correction(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'correction', [x, y]) }
  static phaseangle(x: number, y: number): CrossFormula { return c('powerfactor-phaseangle', 'phaseangle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phaseangle', [x, y]) }
  static capacitorkvar(x: number, y: number): CrossFormula { return c('powerfactor-capacitorkvar', 'capacitorkvar(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'capacitorkvar', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('powerfactor-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
}

for (const name of ['apparentpower', 'capacitorkvar', 'correction', 'efficiency', 'phaseangle', 'ratio', 'reactivepower', 'realpower'] as const)
  hexRegisterOf('powerfactor', name, (PowerfactorFormulas[name] as (...x: unknown[]) => unknown).bind(PowerfactorFormulas))
