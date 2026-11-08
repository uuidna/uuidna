import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRAMMAR — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'grammar arithmetic (rules, posclasses, parsepaths, rulecombos, phrasestructuresubsets, agreementfeatures, recursiondepth, grammaticalityratio); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'grammar', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `grammar.${name}`, params })

export class GrammarFormulas {
  static rules(x: number, y: number): CrossFormula { return c('grammar-rules', 'rules(x, y) = x · y', x * y, nat(x, y), 'rules', [x, y]) }
  static posclasses(x: number, y: number): CrossFormula { return c('grammar-posclasses', 'posclasses(x, y) = x + y', x + y, nat(x, y), 'posclasses', [x, y]) }
  static parsepaths(x: number): CrossFormula { return c('grammar-parsepaths', 'parsepaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'parsepaths', [x]) }
  static rulecombos(x: number, y: number): CrossFormula { return c('grammar-rulecombos', 'rulecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'rulecombos', [x, y]) }
  static phrasestructuresubsets(x: number): CrossFormula { return c('grammar-phrasestructuresubsets', 'phrasestructuresubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'phrasestructuresubsets', [x]) }
  static agreementfeatures(x: number, y: number): CrossFormula { return c('grammar-agreementfeatures', 'agreementfeatures(x, y) = x + y', x + y, nat(x, y), 'agreementfeatures', [x, y]) }
  static recursiondepth(x: number, y: number): CrossFormula { return c('grammar-recursiondepth', 'recursiondepth(x, y) = x + y', x + y, nat(x, y), 'recursiondepth', [x, y]) }
  static grammaticalityratio(x: number, y: number): CrossFormula { return c('grammar-grammaticalityratio', 'grammaticalityratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'grammaticalityratio', [x, y]) }
}

for (const name of ['agreementfeatures', 'grammaticalityratio', 'parsepaths', 'phrasestructuresubsets', 'posclasses', 'recursiondepth', 'rulecombos', 'rules'] as const)
  hexRegisterOf('grammar', name, (GrammarFormulas[name] as (...x: unknown[]) => unknown).bind(GrammarFormulas))
