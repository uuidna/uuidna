import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CARAMELIZATION — scaffolded integer measures crossed to chemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'caramelization arithmetic (temperaturethreshold, browningrate, sugarconversion, masslosspct, colorindex, timeattemp, activationstage, residualsugar); scaffolded from the integer-op palette; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'caramelization', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `caramelization.${name}`, params })

export class CaramelizationFormulas {
  static temperaturethreshold(x: number, y: number): CrossFormula { return c('caramelization-temperaturethreshold', 'temperaturethreshold(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'temperaturethreshold', [x, y]) }
  static browningrate(x: number, y: number): CrossFormula { return c('caramelization-browningrate', 'browningrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'browningrate', [x, y]) }
  static sugarconversion(x: number, y: number): CrossFormula { return c('caramelization-sugarconversion', 'sugarconversion(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'sugarconversion', [x, y]) }
  static masslosspct(x: number, y: number): CrossFormula { return c('caramelization-masslosspct', 'masslosspct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'masslosspct', [x, y]) }
  static colorindex(x: number, y: number): CrossFormula { return c('caramelization-colorindex', 'colorindex(x, y) = x · y', x * y, nat(x, y), 'colorindex', [x, y]) }
  static timeattemp(x: number, y: number): CrossFormula { return c('caramelization-timeattemp', 'timeattemp(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'timeattemp', [x, y]) }
  static activationstage(x: number, y: number): CrossFormula { return c('caramelization-activationstage', 'activationstage(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'activationstage', [x, y]) }
  static residualsugar(x: number, y: number): CrossFormula { return c('caramelization-residualsugar', 'residualsugar(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'residualsugar', [x, y]) }
}

for (const name of ['activationstage', 'browningrate', 'colorindex', 'masslosspct', 'residualsugar', 'sugarconversion', 'temperaturethreshold', 'timeattemp'] as const)
  hexRegisterOf('caramelization', name, (CaramelizationFormulas[name] as (...x: unknown[]) => unknown).bind(CaramelizationFormulas))
