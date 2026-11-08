import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PRINTMAKING — scaffolded integer measures crossed to materials. Every output an exact finite nonnegative integer. */

const PROOF = 'printmaking arithmetic (editionsize, platepasses, registrationlayers, inkcombos, impressionorderings, pressuresetting, colorsubsets, yieldratio); scaffolded from the integer-op palette; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'printmaking', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `printmaking.${name}`, params })

export class PrintmakingFormulas {
  static editionsize(x: number, y: number): CrossFormula { return c('printmaking-editionsize', 'editionsize(x, y) = x · y', x * y, nat(x, y), 'editionsize', [x, y]) }
  static platepasses(x: number, y: number): CrossFormula { return c('printmaking-platepasses', 'platepasses(x, y) = x + y', x + y, nat(x, y), 'platepasses', [x, y]) }
  static registrationlayers(x: number, y: number): CrossFormula { return c('printmaking-registrationlayers', 'registrationlayers(x, y) = x + y', x + y, nat(x, y), 'registrationlayers', [x, y]) }
  static inkcombos(x: number, y: number): CrossFormula { return c('printmaking-inkcombos', 'inkcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'inkcombos', [x, y]) }
  static impressionorderings(x: number): CrossFormula { return c('printmaking-impressionorderings', 'impressionorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'impressionorderings', [x]) }
  static pressuresetting(x: number, y: number): CrossFormula { return c('printmaking-pressuresetting', 'pressuresetting(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'pressuresetting', [x, y]) }
  static colorsubsets(x: number): CrossFormula { return c('printmaking-colorsubsets', 'colorsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'colorsubsets', [x]) }
  static yieldratio(x: number, y: number): CrossFormula { return c('printmaking-yieldratio', 'yieldratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yieldratio', [x, y]) }
}

for (const name of ['colorsubsets', 'editionsize', 'impressionorderings', 'inkcombos', 'platepasses', 'pressuresetting', 'registrationlayers', 'yieldratio'] as const)
  hexRegisterOf('printmaking', name, (PrintmakingFormulas[name] as (...x: unknown[]) => unknown).bind(PrintmakingFormulas))
