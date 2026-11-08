import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CYTOGENETICS — scaffolded integer measures crossed to genetics. Every output an exact finite nonnegative integer. */

const PROOF = 'cytogenetics arithmetic (chromosomepairs, karyotypeorderings, banding, translocationpairs, ploidy, recombinationsites, aneuploidyrisk, genesubsets); scaffolded from the integer-op palette; a measure crossed to genetics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cytogenetics', dst: 'genetics', formula, value, proof: PROOF, ...extra }, holds, { name: `cytogenetics.${name}`, params })

export class CytogeneticsFormulas {
  static chromosomepairs(x: number, y: number): CrossFormula { return c('cytogenetics-chromosomepairs', 'chromosomepairs(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'chromosomepairs', [x, y]) }
  static karyotypeorderings(x: number): CrossFormula { return c('cytogenetics-karyotypeorderings', 'karyotypeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'karyotypeorderings', [x]) }
  static banding(x: number, y: number): CrossFormula { return c('cytogenetics-banding', 'banding(x, y) = x · y', x * y, nat(x, y), 'banding', [x, y]) }
  static translocationpairs(x: number, y: number): CrossFormula { return c('cytogenetics-translocationpairs', 'translocationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'translocationpairs', [x, y]) }
  static ploidy(x: number, y: number): CrossFormula { return c('cytogenetics-ploidy', 'ploidy(x, y) = x · y', x * y, nat(x, y), 'ploidy', [x, y]) }
  static recombinationsites(x: number, y: number): CrossFormula { return c('cytogenetics-recombinationsites', 'recombinationsites(x, y) = x + y', x + y, nat(x, y), 'recombinationsites', [x, y]) }
  static aneuploidyrisk(x: number, y: number): CrossFormula { return c('cytogenetics-aneuploidyrisk', 'aneuploidyrisk(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'aneuploidyrisk', [x, y]) }
  static genesubsets(x: number): CrossFormula { return c('cytogenetics-genesubsets', 'genesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'genesubsets', [x]) }
}

for (const name of ['aneuploidyrisk', 'banding', 'chromosomepairs', 'genesubsets', 'karyotypeorderings', 'ploidy', 'recombinationsites', 'translocationpairs'] as const)
  hexRegisterOf('cytogenetics', name, (CytogeneticsFormulas[name] as (...x: unknown[]) => unknown).bind(CytogeneticsFormulas))
