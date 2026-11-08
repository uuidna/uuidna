import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LITURGY — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'liturgy arithmetic (feastdays, cyclelength, hourorderings, rubriccombos, seasons, chantmodes, vestmentsubsets, processionpaths); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'liturgy', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `liturgy.${name}`, params })

export class LiturgyFormulas {
  static feastdays(x: number, y: number): CrossFormula { return c('liturgy-feastdays', 'feastdays(x, y) = x + y', x + y, nat(x, y), 'feastdays', [x, y]) }
  static cyclelength(x: number, y: number): CrossFormula { return c('liturgy-cyclelength', 'cyclelength(x, y) = x · y', x * y, nat(x, y), 'cyclelength', [x, y]) }
  static hourorderings(x: number): CrossFormula { return c('liturgy-hourorderings', 'hourorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'hourorderings', [x]) }
  static rubriccombos(x: number, y: number): CrossFormula { return c('liturgy-rubriccombos', 'rubriccombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'rubriccombos', [x, y]) }
  static seasons(x: number, y: number): CrossFormula { return c('liturgy-seasons', 'seasons(x, y) = x + y', x + y, nat(x, y), 'seasons', [x, y]) }
  static chantmodes(x: number, y: number): CrossFormula { return c('liturgy-chantmodes', 'chantmodes(x, y) = x · y', x * y, nat(x, y), 'chantmodes', [x, y]) }
  static vestmentsubsets(x: number): CrossFormula { return c('liturgy-vestmentsubsets', 'vestmentsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'vestmentsubsets', [x]) }
  static processionpaths(x: number, y: number): CrossFormula { return c('liturgy-processionpaths', 'processionpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'processionpaths', [x, y]) }
}

for (const name of ['chantmodes', 'cyclelength', 'feastdays', 'hourorderings', 'processionpaths', 'rubriccombos', 'seasons', 'vestmentsubsets'] as const)
  hexRegisterOf('liturgy', name, (LiturgyFormulas[name] as (...x: unknown[]) => unknown).bind(LiturgyFormulas))
