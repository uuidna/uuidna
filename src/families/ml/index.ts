import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ML — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'ml arithmetic (parameters, accuracy, featurecombos, epochs, layersubsets, learningrate, gradientsteps, f1score); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ml', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `ml.${name}`, params })

export class MlFormulas {
  static parameters(x: number, y: number): CrossFormula { return c('ml-parameters', 'parameters(x, y) = x · y', x * y, nat(x, y), 'parameters', [x, y]) }
  static accuracy(x: number, y: number): CrossFormula { return c('ml-accuracy', 'accuracy(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'accuracy', [x, y]) }
  static featurecombos(x: number, y: number): CrossFormula { return c('ml-featurecombos', 'featurecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'featurecombos', [x, y]) }
  static epochs(x: number, y: number): CrossFormula { return c('ml-epochs', 'epochs(x, y) = x · y', x * y, nat(x, y), 'epochs', [x, y]) }
  static layersubsets(x: number): CrossFormula { return c('ml-layersubsets', 'layersubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'layersubsets', [x]) }
  static learningrate(x: number, y: number): CrossFormula { return c('ml-learningrate', 'learningrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'learningrate', [x, y]) }
  static gradientsteps(x: number, y: number): CrossFormula { return c('ml-gradientsteps', 'gradientsteps(x, y) = x · y', x * y, nat(x, y), 'gradientsteps', [x, y]) }
  static f1score(x: number, y: number): CrossFormula { return c('ml-f1score', 'f1score(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'f1score', [x, y]) }
}

for (const name of ['accuracy', 'epochs', 'f1score', 'featurecombos', 'gradientsteps', 'layersubsets', 'learningrate', 'parameters'] as const)
  hexRegisterOf('ml', name, (MlFormulas[name] as (...x: unknown[]) => unknown).bind(MlFormulas))
