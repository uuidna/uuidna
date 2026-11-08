import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RUNES — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'runes arithmetic (futharkletters, inscriptionpairs, stavecount, orderingchoices, boundrunes, magicsubsets, rowdivisions, legibility); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'runes', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `runes.${name}`, params })

export class RunesFormulas {
  static futharkletters(x: number, y: number): CrossFormula { return c('runes-futharkletters', 'futharkletters(x, y) = x + y', x + y, nat(x, y), 'futharkletters', [x, y]) }
  static inscriptionpairs(x: number, y: number): CrossFormula { return c('runes-inscriptionpairs', 'inscriptionpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'inscriptionpairs', [x, y]) }
  static stavecount(x: number, y: number): CrossFormula { return c('runes-stavecount', 'stavecount(x, y) = x · y', x * y, nat(x, y), 'stavecount', [x, y]) }
  static orderingchoices(x: number): CrossFormula { return c('runes-orderingchoices', 'orderingchoices(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'orderingchoices', [x]) }
  static boundrunes(x: number, y: number): CrossFormula { return c('runes-boundrunes', 'boundrunes(x, y) = x + y', x + y, nat(x, y), 'boundrunes', [x, y]) }
  static magicsubsets(x: number): CrossFormula { return c('runes-magicsubsets', 'magicsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'magicsubsets', [x]) }
  static rowdivisions(x: number, y: number): CrossFormula { return c('runes-rowdivisions', 'rowdivisions(x, y) = x + y', x + y, nat(x, y), 'rowdivisions', [x, y]) }
  static legibility(x: number, y: number): CrossFormula { return c('runes-legibility', 'legibility(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'legibility', [x, y]) }
}

for (const name of ['boundrunes', 'futharkletters', 'inscriptionpairs', 'legibility', 'magicsubsets', 'orderingchoices', 'rowdivisions', 'stavecount'] as const)
  hexRegisterOf('runes', name, (RunesFormulas[name] as (...x: unknown[]) => unknown).bind(RunesFormulas))
