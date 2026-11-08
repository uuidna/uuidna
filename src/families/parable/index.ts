import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PARABLE — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'parable arithmetic (elementcount, interpretationpaths, symbolpairs, meaninglayers, charactercount, motifcombos, narrativeorderings, moralcount); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'parable', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `parable.${name}`, params })

export class ParableFormulas {
  static elementcount(x: number, y: number): CrossFormula { return c('parable-elementcount', 'elementcount(x, y) = x + y', x + y, nat(x, y), 'elementcount', [x, y]) }
  static interpretationpaths(x: number): CrossFormula { return c('parable-interpretationpaths', 'interpretationpaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'interpretationpaths', [x]) }
  static symbolpairs(x: number, y: number): CrossFormula { return c('parable-symbolpairs', 'symbolpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'symbolpairs', [x, y]) }
  static meaninglayers(x: number): CrossFormula { return c('parable-meaninglayers', 'meaninglayers(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'meaninglayers', [x]) }
  static charactercount(x: number, y: number): CrossFormula { return c('parable-charactercount', 'charactercount(x, y) = x + y', x + y, nat(x, y), 'charactercount', [x, y]) }
  static motifcombos(x: number, y: number): CrossFormula { return c('parable-motifcombos', 'motifcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'motifcombos', [x, y]) }
  static narrativeorderings(x: number, y: number): CrossFormula { return c('parable-narrativeorderings', 'narrativeorderings(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'narrativeorderings', [x, y]) }
  static moralcount(x: number, y: number): CrossFormula { return c('parable-moralcount', 'moralcount(x, y) = x · y', x * y, nat(x, y), 'moralcount', [x, y]) }
}

for (const name of ['charactercount', 'elementcount', 'interpretationpaths', 'meaninglayers', 'moralcount', 'motifcombos', 'narrativeorderings', 'symbolpairs'] as const)
  hexRegisterOf('parable', name, (ParableFormulas[name] as (...x: unknown[]) => unknown).bind(ParableFormulas))
