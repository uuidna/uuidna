import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SYLLOGISM — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'syllogism arithmetic (moodcount, figurecount, validforms, premisepairs, termorderings, distributionchecks, conclusionpaths, soundnessratio); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'syllogism', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `syllogism.${name}`, params })

export class SyllogismFormulas {
  static moodcount(x: number, y: number): CrossFormula { return c('syllogism-moodcount', 'moodcount(x, y) = x · y', x * y, nat(x, y), 'moodcount', [x, y]) }
  static figurecount(x: number, y: number): CrossFormula { return c('syllogism-figurecount', 'figurecount(x, y) = x + y', x + y, nat(x, y), 'figurecount', [x, y]) }
  static validforms(x: number, y: number): CrossFormula { return c('syllogism-validforms', 'validforms(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'validforms', [x, y]) }
  static premisepairs(x: number, y: number): CrossFormula { return c('syllogism-premisepairs', 'premisepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'premisepairs', [x, y]) }
  static termorderings(x: number): CrossFormula { return c('syllogism-termorderings', 'termorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'termorderings', [x]) }
  static distributionchecks(x: number): CrossFormula { return c('syllogism-distributionchecks', 'distributionchecks(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'distributionchecks', [x]) }
  static conclusionpaths(x: number, y: number): CrossFormula { return c('syllogism-conclusionpaths', 'conclusionpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'conclusionpaths', [x, y]) }
  static soundnessratio(x: number, y: number): CrossFormula { return c('syllogism-soundnessratio', 'soundnessratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'soundnessratio', [x, y]) }
}

for (const name of ['conclusionpaths', 'distributionchecks', 'figurecount', 'moodcount', 'premisepairs', 'soundnessratio', 'termorderings', 'validforms'] as const)
  hexRegisterOf('syllogism', name, (SyllogismFormulas[name] as (...x: unknown[]) => unknown).bind(SyllogismFormulas))
