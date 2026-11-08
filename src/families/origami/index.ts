import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ORIGAMI — scaffolded integer measures crossed to geometry. Every output an exact finite nonnegative integer. */

const PROOF = 'origami arithmetic (creasecount, foldorderings, mountainvalley, flatfoldability, vertexpairs, layersubsets, crimpangle, panelcount); scaffolded from the integer-op palette; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'origami', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `origami.${name}`, params })

export class OrigamiFormulas {
  static creasecount(x: number, y: number): CrossFormula { return c('origami-creasecount', 'creasecount(x, y) = x + y', x + y, nat(x, y), 'creasecount', [x, y]) }
  static foldorderings(x: number): CrossFormula { return c('origami-foldorderings', 'foldorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'foldorderings', [x]) }
  static mountainvalley(x: number, y: number): CrossFormula { return c('origami-mountainvalley', 'mountainvalley(x, y) = x · y', x * y, nat(x, y), 'mountainvalley', [x, y]) }
  static flatfoldability(x: number, y: number): CrossFormula { return c('origami-flatfoldability', 'flatfoldability(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'flatfoldability', [x, y]) }
  static vertexpairs(x: number, y: number): CrossFormula { return c('origami-vertexpairs', 'vertexpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'vertexpairs', [x, y]) }
  static layersubsets(x: number): CrossFormula { return c('origami-layersubsets', 'layersubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'layersubsets', [x]) }
  static crimpangle(x: number, y: number): CrossFormula { return c('origami-crimpangle', 'crimpangle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'crimpangle', [x, y]) }
  static panelcount(x: number, y: number): CrossFormula { return c('origami-panelcount', 'panelcount(x, y) = x · y', x * y, nat(x, y), 'panelcount', [x, y]) }
}

for (const name of ['creasecount', 'crimpangle', 'flatfoldability', 'foldorderings', 'layersubsets', 'mountainvalley', 'panelcount', 'vertexpairs'] as const)
  hexRegisterOf('origami', name, (OrigamiFormulas[name] as (...x: unknown[]) => unknown).bind(OrigamiFormulas))
