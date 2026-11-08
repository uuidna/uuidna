import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GELATINIZATION — scaffolded integer measures crossed to chemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'gelatinization arithmetic (onsettemp, swellingratio, waterabsorption, peakviscosity, starchconversion, setbacktemp, granuleexpansion, pasteclarity); scaffolded from the integer-op palette; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gelatinization', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `gelatinization.${name}`, params })

export class GelatinizationFormulas {
  static onsettemp(x: number, y: number): CrossFormula { return c('gelatinization-onsettemp', 'onsettemp(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'onsettemp', [x, y]) }
  static swellingratio(x: number, y: number): CrossFormula { return c('gelatinization-swellingratio', 'swellingratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'swellingratio', [x, y]) }
  static waterabsorption(x: number, y: number): CrossFormula { return c('gelatinization-waterabsorption', 'waterabsorption(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'waterabsorption', [x, y]) }
  static peakviscosity(x: number, y: number): CrossFormula { return c('gelatinization-peakviscosity', 'peakviscosity(x, y) = x · y', x * y, nat(x, y), 'peakviscosity', [x, y]) }
  static starchconversion(x: number, y: number): CrossFormula { return c('gelatinization-starchconversion', 'starchconversion(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'starchconversion', [x, y]) }
  static setbacktemp(x: number, y: number): CrossFormula { return c('gelatinization-setbacktemp', 'setbacktemp(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'setbacktemp', [x, y]) }
  static granuleexpansion(x: number, y: number): CrossFormula { return c('gelatinization-granuleexpansion', 'granuleexpansion(x, y) = x · y', x * y, nat(x, y), 'granuleexpansion', [x, y]) }
  static pasteclarity(x: number, y: number): CrossFormula { return c('gelatinization-pasteclarity', 'pasteclarity(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'pasteclarity', [x, y]) }
}

for (const name of ['granuleexpansion', 'onsettemp', 'pasteclarity', 'peakviscosity', 'setbacktemp', 'starchconversion', 'swellingratio', 'waterabsorption'] as const)
  hexRegisterOf('gelatinization', name, (GelatinizationFormulas[name] as (...x: unknown[]) => unknown).bind(GelatinizationFormulas))
