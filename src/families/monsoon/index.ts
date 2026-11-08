import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MONSOON — scaffolded integer measures crossed to climate. Every output an exact finite nonnegative integer. */

const PROOF = 'monsoon arithmetic (onsetday, rainfall, durationdays, windreversal, intensityindex, rainydays, deficitpct, cyclelength); scaffolded from the integer-op palette; a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'monsoon', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `monsoon.${name}`, params })

export class MonsoonFormulas {
  static onsetday(x: number, y: number): CrossFormula { return c('monsoon-onsetday', 'onsetday(x, y) = x + y', x + y, nat(x, y), 'onsetday', [x, y]) }
  static rainfall(x: number, y: number): CrossFormula { return c('monsoon-rainfall', 'rainfall(x, y) = x · y', x * y, nat(x, y), 'rainfall', [x, y]) }
  static durationdays(x: number, y: number): CrossFormula { return c('monsoon-durationdays', 'durationdays(x, y) = x + y', x + y, nat(x, y), 'durationdays', [x, y]) }
  static windreversal(x: number, y: number): CrossFormula { return c('monsoon-windreversal', 'windreversal(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'windreversal', [x, y]) }
  static intensityindex(x: number, y: number): CrossFormula { return c('monsoon-intensityindex', 'intensityindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'intensityindex', [x, y]) }
  static rainydays(x: number, y: number): CrossFormula { return c('monsoon-rainydays', 'rainydays(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rainydays', [x, y]) }
  static deficitpct(x: number, y: number): CrossFormula { return c('monsoon-deficitpct', 'deficitpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'deficitpct', [x, y]) }
  static cyclelength(x: number, y: number): CrossFormula { return c('monsoon-cyclelength', 'cyclelength(x, y) = x · y', x * y, nat(x, y), 'cyclelength', [x, y]) }
}

for (const name of ['cyclelength', 'deficitpct', 'durationdays', 'intensityindex', 'onsetday', 'rainfall', 'rainydays', 'windreversal'] as const)
  hexRegisterOf('monsoon', name, (MonsoonFormulas[name] as (...x: unknown[]) => unknown).bind(MonsoonFormulas))
