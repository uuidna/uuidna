import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EXEGESIS — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'exegesis arithmetic (senseoptions, lexemecombos, parsepaths, morphemecount, variantreadings, clauseorderings, rootmatches, semanticrange); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'exegesis', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `exegesis.${name}`, params })

export class ExegesisFormulas {
  static senseoptions(x: number): CrossFormula { return c('exegesis-senseoptions', 'senseoptions(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'senseoptions', [x]) }
  static lexemecombos(x: number, y: number): CrossFormula { return c('exegesis-lexemecombos', 'lexemecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'lexemecombos', [x, y]) }
  static parsepaths(x: number): CrossFormula { return c('exegesis-parsepaths', 'parsepaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'parsepaths', [x]) }
  static morphemecount(x: number, y: number): CrossFormula { return c('exegesis-morphemecount', 'morphemecount(x, y) = x · y', x * y, nat(x, y), 'morphemecount', [x, y]) }
  static variantreadings(x: number, y: number): CrossFormula { return c('exegesis-variantreadings', 'variantreadings(x, y) = x + y', x + y, nat(x, y), 'variantreadings', [x, y]) }
  static clauseorderings(x: number, y: number): CrossFormula { return c('exegesis-clauseorderings', 'clauseorderings(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'clauseorderings', [x, y]) }
  static rootmatches(x: number, y: number): CrossFormula { return c('exegesis-rootmatches', 'rootmatches(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rootmatches', [x, y]) }
  static semanticrange(x: number, y: number): CrossFormula { return c('exegesis-semanticrange', 'semanticrange(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'semanticrange', [x, y]) }
}

for (const name of ['clauseorderings', 'lexemecombos', 'morphemecount', 'parsepaths', 'rootmatches', 'semanticrange', 'senseoptions', 'variantreadings'] as const)
  hexRegisterOf('exegesis', name, (ExegesisFormulas[name] as (...x: unknown[]) => unknown).bind(ExegesisFormulas))
