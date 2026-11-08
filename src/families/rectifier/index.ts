import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RECTIFIER — scaffolded integer measures crossed to electronics. Every output an exact finite nonnegative integer. */

const PROOF = 'rectifier arithmetic (ripplefactor, outputvoltage, efficiency, diodecount, pivrating, formfactor, loadcombos, conductionangle); scaffolded from the integer-op palette; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rectifier', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `rectifier.${name}`, params })

export class RectifierFormulas {
  static ripplefactor(x: number, y: number): CrossFormula { return c('rectifier-ripplefactor', 'ripplefactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ripplefactor', [x, y]) }
  static outputvoltage(x: number, y: number): CrossFormula { return c('rectifier-outputvoltage', 'outputvoltage(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'outputvoltage', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('rectifier-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  static diodecount(x: number, y: number): CrossFormula { return c('rectifier-diodecount', 'diodecount(x, y) = x + y', x + y, nat(x, y), 'diodecount', [x, y]) }
  static pivrating(x: number, y: number): CrossFormula { return c('rectifier-pivrating', 'pivrating(x, y) = x · y', x * y, nat(x, y), 'pivrating', [x, y]) }
  static formfactor(x: number, y: number): CrossFormula { return c('rectifier-formfactor', 'formfactor(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'formfactor', [x, y]) }
  static loadcombos(x: number, y: number): CrossFormula { return c('rectifier-loadcombos', 'loadcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'loadcombos', [x, y]) }
  static conductionangle(x: number, y: number): CrossFormula { return c('rectifier-conductionangle', 'conductionangle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'conductionangle', [x, y]) }
}

for (const name of ['conductionangle', 'diodecount', 'efficiency', 'formfactor', 'loadcombos', 'outputvoltage', 'pivrating', 'ripplefactor'] as const)
  hexRegisterOf('rectifier', name, (RectifierFormulas[name] as (...x: unknown[]) => unknown).bind(RectifierFormulas))
