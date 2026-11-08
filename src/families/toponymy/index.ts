import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOPONYMY — scaffolded integer measures crossed to geography. Every output an exact finite nonnegative integer. */

const PROOF = 'toponymy arithmetic (placecount, etymologypaths, elementpairs, languagelayers, suffixcombos, distributionsubsets, densityper, variantspellings); scaffolded from the integer-op palette; a measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'toponymy', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `toponymy.${name}`, params })

export class ToponymyFormulas {
  static placecount(x: number, y: number): CrossFormula { return c('toponymy-placecount', 'placecount(x, y) = x · y', x * y, nat(x, y), 'placecount', [x, y]) }
  static etymologypaths(x: number): CrossFormula { return c('toponymy-etymologypaths', 'etymologypaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'etymologypaths', [x]) }
  static elementpairs(x: number, y: number): CrossFormula { return c('toponymy-elementpairs', 'elementpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'elementpairs', [x, y]) }
  static languagelayers(x: number, y: number): CrossFormula { return c('toponymy-languagelayers', 'languagelayers(x, y) = x + y', x + y, nat(x, y), 'languagelayers', [x, y]) }
  static suffixcombos(x: number, y: number): CrossFormula { return c('toponymy-suffixcombos', 'suffixcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'suffixcombos', [x, y]) }
  static distributionsubsets(x: number): CrossFormula { return c('toponymy-distributionsubsets', 'distributionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'distributionsubsets', [x]) }
  static densityper(x: number, y: number): CrossFormula { return c('toponymy-densityper', 'densityper(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'densityper', [x, y]) }
  static variantspellings(x: number, y: number): CrossFormula { return c('toponymy-variantspellings', 'variantspellings(x, y) = x · y', x * y, nat(x, y), 'variantspellings', [x, y]) }
}

for (const name of ['densityper', 'distributionsubsets', 'elementpairs', 'etymologypaths', 'languagelayers', 'placecount', 'suffixcombos', 'variantspellings'] as const)
  hexRegisterOf('toponymy', name, (ToponymyFormulas[name] as (...x: unknown[]) => unknown).bind(ToponymyFormulas))
