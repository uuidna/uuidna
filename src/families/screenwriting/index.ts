import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCREENWRITING — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'screenwriting arithmetic (acts, scenecount, pagesperminute, beatcombos, plotpaths, charactercount, dialogueratio, structuresubsets); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'screenwriting', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `screenwriting.${name}`, params })

export class ScreenwritingFormulas {
  static acts(x: number, y: number): CrossFormula { return c('screenwriting-acts', 'acts(x, y) = x + y', x + y, nat(x, y), 'acts', [x, y]) }
  static scenecount(x: number, y: number): CrossFormula { return c('screenwriting-scenecount', 'scenecount(x, y) = x · y', x * y, nat(x, y), 'scenecount', [x, y]) }
  static pagesperminute(x: number, y: number): CrossFormula { return c('screenwriting-pagesperminute', 'pagesperminute(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'pagesperminute', [x, y]) }
  static beatcombos(x: number, y: number): CrossFormula { return c('screenwriting-beatcombos', 'beatcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'beatcombos', [x, y]) }
  static plotpaths(x: number, y: number): CrossFormula { return c('screenwriting-plotpaths', 'plotpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'plotpaths', [x, y]) }
  static charactercount(x: number, y: number): CrossFormula { return c('screenwriting-charactercount', 'charactercount(x, y) = x + y', x + y, nat(x, y), 'charactercount', [x, y]) }
  static dialogueratio(x: number, y: number): CrossFormula { return c('screenwriting-dialogueratio', 'dialogueratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'dialogueratio', [x, y]) }
  static structuresubsets(x: number): CrossFormula { return c('screenwriting-structuresubsets', 'structuresubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'structuresubsets', [x]) }
}

for (const name of ['acts', 'beatcombos', 'charactercount', 'dialogueratio', 'pagesperminute', 'plotpaths', 'scenecount', 'structuresubsets'] as const)
  hexRegisterOf('screenwriting', name, (ScreenwritingFormulas[name] as (...x: unknown[]) => unknown).bind(ScreenwritingFormulas))
