import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOCALIZATION — scaffolded integer measures crossed to control. Every output an exact finite nonnegative integer. */

const PROOF = 'localization arithmetic (covariance, gain, innovation, confidence, gridresolution, particlecount, updaterate, positionvariance); scaffolded from the integer-op palette; a measure crossed to control'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'localization', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, { name: `localization.${name}`, params })

export class LocalizationFormulas {
  static covariance(x: number, y: number): CrossFormula { return c('localization-covariance', 'covariance(x, y) = x · y', x * y, nat(x, y), 'covariance', [x, y]) }
  static gain(x: number, y: number): CrossFormula { return c('localization-gain', 'gain(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'gain', [x, y]) }
  static innovation(x: number, y: number): CrossFormula { return c('localization-innovation', 'innovation(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'innovation', [x, y]) }
  static confidence(x: number, y: number): CrossFormula { return c('localization-confidence', 'confidence(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'confidence', [x, y]) }
  static gridresolution(x: number, y: number): CrossFormula { return c('localization-gridresolution', 'gridresolution(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'gridresolution', [x, y]) }
  static particlecount(x: number, y: number): CrossFormula { return c('localization-particlecount', 'particlecount(x, y) = x · y', x * y, nat(x, y), 'particlecount', [x, y]) }
  static updaterate(x: number, y: number): CrossFormula { return c('localization-updaterate', 'updaterate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'updaterate', [x, y]) }
  static positionvariance(x: number, y: number): CrossFormula { return c('localization-positionvariance', 'positionvariance(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'positionvariance', [x, y]) }
}

for (const name of ['confidence', 'covariance', 'gain', 'gridresolution', 'innovation', 'particlecount', 'positionvariance', 'updaterate'] as const)
  hexRegisterOf('localization', name, (LocalizationFormulas[name] as (...x: unknown[]) => unknown).bind(LocalizationFormulas))
