import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EPIGRAPHY — scaffolded integer measures crossed to archaeology. Every output an exact finite nonnegative integer. */

const PROOF = 'epigraphy arithmetic (characters, lineorderings, restorationpairs, damageratio, scriptsubsets, datingrange, wordcount, lacunae); scaffolded from the integer-op palette; a measure crossed to archaeology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'epigraphy', dst: 'archaeology', formula, value, proof: PROOF, ...extra }, holds, { name: `epigraphy.${name}`, params })

export class EpigraphyFormulas {
  static characters(x: number, y: number): CrossFormula { return c('epigraphy-characters', 'characters(x, y) = x · y', x * y, nat(x, y), 'characters', [x, y]) }
  static lineorderings(x: number): CrossFormula { return c('epigraphy-lineorderings', 'lineorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'lineorderings', [x]) }
  static restorationpairs(x: number, y: number): CrossFormula { return c('epigraphy-restorationpairs', 'restorationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'restorationpairs', [x, y]) }
  static damageratio(x: number, y: number): CrossFormula { return c('epigraphy-damageratio', 'damageratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'damageratio', [x, y]) }
  static scriptsubsets(x: number): CrossFormula { return c('epigraphy-scriptsubsets', 'scriptsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'scriptsubsets', [x]) }
  static datingrange(x: number, y: number): CrossFormula { return c('epigraphy-datingrange', 'datingrange(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'datingrange', [x, y]) }
  static wordcount(x: number, y: number): CrossFormula { return c('epigraphy-wordcount', 'wordcount(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'wordcount', [x, y]) }
  static lacunae(x: number, y: number): CrossFormula { return c('epigraphy-lacunae', 'lacunae(x, y) = x + y', x + y, nat(x, y), 'lacunae', [x, y]) }
}

for (const name of ['characters', 'damageratio', 'datingrange', 'lacunae', 'lineorderings', 'restorationpairs', 'scriptsubsets', 'wordcount'] as const)
  hexRegisterOf('epigraphy', name, (EpigraphyFormulas[name] as (...x: unknown[]) => unknown).bind(EpigraphyFormulas))
