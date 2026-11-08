import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUCLEARPOWER — scaffolded integer measures crossed to energy. Every output an exact finite nonnegative integer. */

const PROOF = 'nuclearpower arithmetic (thermaloutput, electricaloutput, efficiency, fuelburnup, capacityfactor, halflifecycles, coolingloops, decayheat); scaffolded from the integer-op palette; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'nuclearpower', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `nuclearpower.${name}`, params })

export class NuclearpowerFormulas {
  static thermaloutput(x: number, y: number): CrossFormula { return c('nuclearpower-thermaloutput', 'thermaloutput(x, y) = x · y', x * y, nat(x, y), 'thermaloutput', [x, y]) }
  static electricaloutput(x: number, y: number): CrossFormula { return c('nuclearpower-electricaloutput', 'electricaloutput(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'electricaloutput', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('nuclearpower-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  static fuelburnup(x: number, y: number): CrossFormula { return c('nuclearpower-fuelburnup', 'fuelburnup(x, y) = x · y', x * y, nat(x, y), 'fuelburnup', [x, y]) }
  static capacityfactor(x: number, y: number): CrossFormula { return c('nuclearpower-capacityfactor', 'capacityfactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'capacityfactor', [x, y]) }
  static halflifecycles(x: number, y: number): CrossFormula { return c('nuclearpower-halflifecycles', 'halflifecycles(x, y) = x + y', x + y, nat(x, y), 'halflifecycles', [x, y]) }
  static coolingloops(x: number, y: number): CrossFormula { return c('nuclearpower-coolingloops', 'coolingloops(x, y) = x + y', x + y, nat(x, y), 'coolingloops', [x, y]) }
  static decayheat(x: number, y: number): CrossFormula { return c('nuclearpower-decayheat', 'decayheat(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'decayheat', [x, y]) }
}

for (const name of ['capacityfactor', 'coolingloops', 'decayheat', 'efficiency', 'electricaloutput', 'fuelburnup', 'halflifecycles', 'thermaloutput'] as const)
  hexRegisterOf('nuclearpower', name, (NuclearpowerFormulas[name] as (...x: unknown[]) => unknown).bind(NuclearpowerFormulas))
