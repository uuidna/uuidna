import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ONTOLOGY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'ontology arithmetic (categories, entitysubsets, relationpairs, hierarchydepth, predicatecombos, substanceorderings, modalstates, partonomylinks); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ontology', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `ontology.${name}`, params })

export class OntologyFormulas {
  static categories(x: number, y: number): CrossFormula { return c('ontology-categories', 'categories(x, y) = x + y', x + y, nat(x, y), 'categories', [x, y]) }
  static entitysubsets(x: number): CrossFormula { return c('ontology-entitysubsets', 'entitysubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'entitysubsets', [x]) }
  static relationpairs(x: number, y: number): CrossFormula { return c('ontology-relationpairs', 'relationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'relationpairs', [x, y]) }
  static hierarchydepth(x: number, y: number): CrossFormula { return c('ontology-hierarchydepth', 'hierarchydepth(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'hierarchydepth', [x, y]) }
  static predicatecombos(x: number, y: number): CrossFormula { return c('ontology-predicatecombos', 'predicatecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'predicatecombos', [x, y]) }
  static substanceorderings(x: number): CrossFormula { return c('ontology-substanceorderings', 'substanceorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'substanceorderings', [x]) }
  static modalstates(x: number, y: number): CrossFormula { return c('ontology-modalstates', 'modalstates(x, y) = x · y', x * y, nat(x, y), 'modalstates', [x, y]) }
  static partonomylinks(x: number, y: number): CrossFormula { return c('ontology-partonomylinks', 'partonomylinks(x, y) = x · y', x * y, nat(x, y), 'partonomylinks', [x, y]) }
}

for (const name of ['categories', 'entitysubsets', 'hierarchydepth', 'modalstates', 'partonomylinks', 'predicatecombos', 'relationpairs', 'substanceorderings'] as const)
  hexRegisterOf('ontology', name, (OntologyFormulas[name] as (...x: unknown[]) => unknown).bind(OntologyFormulas))
