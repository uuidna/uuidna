import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COGENERATION — scaffolded integer measures crossed to thermodynamics. Every output an exact finite nonnegative integer. */

const PROOF = 'cogeneration arithmetic (totalefficiency, powertoheat, electricaloutput, heatoutput, fuelinput, primaryenergysaving, heatrecovery, carnotlimit); scaffolded from the integer-op palette; a measure crossed to thermodynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cogeneration', dst: 'thermodynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `cogeneration.${name}`, params })

export class CogenerationFormulas {
  static totalefficiency(x: number, y: number): CrossFormula { return c('cogeneration-totalefficiency', 'totalefficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'totalefficiency', [x, y]) }
  static powertoheat(x: number, y: number): CrossFormula { return c('cogeneration-powertoheat', 'powertoheat(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'powertoheat', [x, y]) }
  static electricaloutput(x: number, y: number): CrossFormula { return c('cogeneration-electricaloutput', 'electricaloutput(x, y) = x · y', x * y, nat(x, y), 'electricaloutput', [x, y]) }
  static heatoutput(x: number, y: number): CrossFormula { return c('cogeneration-heatoutput', 'heatoutput(x, y) = x · y', x * y, nat(x, y), 'heatoutput', [x, y]) }
  static fuelinput(x: number, y: number): CrossFormula { return c('cogeneration-fuelinput', 'fuelinput(x, y) = x + y', x + y, nat(x, y), 'fuelinput', [x, y]) }
  static primaryenergysaving(x: number, y: number): CrossFormula { return c('cogeneration-primaryenergysaving', 'primaryenergysaving(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'primaryenergysaving', [x, y]) }
  static heatrecovery(x: number, y: number): CrossFormula { return c('cogeneration-heatrecovery', 'heatrecovery(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'heatrecovery', [x, y]) }
  static carnotlimit(x: number, y: number): CrossFormula { return c('cogeneration-carnotlimit', 'carnotlimit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'carnotlimit', [x, y]) }
}

for (const name of ['carnotlimit', 'electricaloutput', 'fuelinput', 'heatoutput', 'heatrecovery', 'powertoheat', 'primaryenergysaving', 'totalefficiency'] as const)
  hexRegisterOf('cogeneration', name, (CogenerationFormulas[name] as (...x: unknown[]) => unknown).bind(CogenerationFormulas))
