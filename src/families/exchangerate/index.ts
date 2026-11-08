import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EXCHANGERATE — scaffolded integer measures crossed to banking. Every output an exact finite nonnegative integer. */

const PROOF = 'exchangerate arithmetic (crossrate, spread, pippips, forwardpoints, volatilitypct, conversioncombos, reservemonths, peggedmargin); scaffolded from the integer-op palette; a measure crossed to banking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'exchangerate', dst: 'banking', formula, value, proof: PROOF, ...extra }, holds, { name: `exchangerate.${name}`, params })

export class ExchangerateFormulas {
  static crossrate(x: number, y: number): CrossFormula { return c('exchangerate-crossrate', 'crossrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'crossrate', [x, y]) }
  static spread(x: number, y: number): CrossFormula { return c('exchangerate-spread', 'spread(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'spread', [x, y]) }
  static pippips(x: number, y: number): CrossFormula { return c('exchangerate-pippips', 'pippips(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pippips', [x, y]) }
  static forwardpoints(x: number, y: number): CrossFormula { return c('exchangerate-forwardpoints', 'forwardpoints(x, y) = x · y', x * y, nat(x, y), 'forwardpoints', [x, y]) }
  static volatilitypct(x: number, y: number): CrossFormula { return c('exchangerate-volatilitypct', 'volatilitypct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'volatilitypct', [x, y]) }
  static conversioncombos(x: number, y: number): CrossFormula { return c('exchangerate-conversioncombos', 'conversioncombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'conversioncombos', [x, y]) }
  static reservemonths(x: number, y: number): CrossFormula { return c('exchangerate-reservemonths', 'reservemonths(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'reservemonths', [x, y]) }
  static peggedmargin(x: number, y: number): CrossFormula { return c('exchangerate-peggedmargin', 'peggedmargin(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'peggedmargin', [x, y]) }
}

for (const name of ['conversioncombos', 'crossrate', 'forwardpoints', 'peggedmargin', 'pippips', 'reservemonths', 'spread', 'volatilitypct'] as const)
  hexRegisterOf('exchangerate', name, (ExchangerateFormulas[name] as (...x: unknown[]) => unknown).bind(ExchangerateFormulas))
