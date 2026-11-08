import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PALEOGRAPHY — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'paleography arithmetic (letterforms, scriptorderings, ligaturepairs, abbreviationsubsets, dateestimate, handcount, minusculeratio, graphemecombos); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'paleography', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `paleography.${name}`, params })

export class PaleographyFormulas {
  static letterforms(x: number, y: number): CrossFormula { return c('paleography-letterforms', 'letterforms(x, y) = x · y', x * y, nat(x, y), 'letterforms', [x, y]) }
  static scriptorderings(x: number): CrossFormula { return c('paleography-scriptorderings', 'scriptorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'scriptorderings', [x]) }
  static ligaturepairs(x: number, y: number): CrossFormula { return c('paleography-ligaturepairs', 'ligaturepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'ligaturepairs', [x, y]) }
  static abbreviationsubsets(x: number): CrossFormula { return c('paleography-abbreviationsubsets', 'abbreviationsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'abbreviationsubsets', [x]) }
  static dateestimate(x: number, y: number): CrossFormula { return c('paleography-dateestimate', 'dateestimate(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'dateestimate', [x, y]) }
  static handcount(x: number, y: number): CrossFormula { return c('paleography-handcount', 'handcount(x, y) = x + y', x + y, nat(x, y), 'handcount', [x, y]) }
  static minusculeratio(x: number, y: number): CrossFormula { return c('paleography-minusculeratio', 'minusculeratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'minusculeratio', [x, y]) }
  static graphemecombos(x: number, y: number): CrossFormula { return c('paleography-graphemecombos', 'graphemecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'graphemecombos', [x, y]) }
}

for (const name of ['abbreviationsubsets', 'dateestimate', 'graphemecombos', 'handcount', 'letterforms', 'ligaturepairs', 'minusculeratio', 'scriptorderings'] as const)
  hexRegisterOf('paleography', name, (PaleographyFormulas[name] as (...x: unknown[]) => unknown).bind(PaleographyFormulas))
