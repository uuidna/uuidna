import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DOMINOES — scaffolded integer measures crossed to combinatorics. Every output an exact finite nonnegative integer. */

const PROOF = 'dominoes arithmetic (distinctpairs, doubles, totaltiles, pips, chainorderings, handsubsets, maxpip, layoutpaths); scaffolded from the integer-op palette; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dominoes', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `dominoes.${name}`, params })

export class DominoesFormulas {
  static distinctpairs(x: number, y: number): CrossFormula { return c('dominoes-distinctpairs', 'distinctpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'distinctpairs', [x, y]) }
  static doubles(x: number, y: number): CrossFormula { return c('dominoes-doubles', 'doubles(x, y) = x + y', x + y, nat(x, y), 'doubles', [x, y]) }
  static totaltiles(x: number, y: number): CrossFormula { return c('dominoes-totaltiles', 'totaltiles(x, y) = x + y', x + y, nat(x, y), 'totaltiles', [x, y]) }
  static pips(x: number, y: number): CrossFormula { return c('dominoes-pips', 'pips(x, y) = x · y', x * y, nat(x, y), 'pips', [x, y]) }
  static chainorderings(x: number): CrossFormula { return c('dominoes-chainorderings', 'chainorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'chainorderings', [x]) }
  static handsubsets(x: number): CrossFormula { return c('dominoes-handsubsets', 'handsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'handsubsets', [x]) }
  static maxpip(x: number, y: number): CrossFormula { return c('dominoes-maxpip', 'maxpip(x, y) = x + y', x + y, nat(x, y), 'maxpip', [x, y]) }
  static layoutpaths(x: number, y: number): CrossFormula { return c('dominoes-layoutpaths', 'layoutpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'layoutpaths', [x, y]) }
}

for (const name of ['chainorderings', 'distinctpairs', 'doubles', 'handsubsets', 'layoutpaths', 'maxpip', 'pips', 'totaltiles'] as const)
  hexRegisterOf('dominoes', name, (DominoesFormulas[name] as (...x: unknown[]) => unknown).bind(DominoesFormulas))
