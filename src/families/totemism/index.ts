import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOTEMISM — scaffolded integer measures crossed to sociology. Every output an exact finite nonnegative integer. */

const PROOF = 'totemism arithmetic (clans, totempairs, lineageorderings, taboocount, kinshipsubsets, emblemcombos, descentgroups, exogamyratio); scaffolded from the integer-op palette; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'totemism', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `totemism.${name}`, params })

export class TotemismFormulas {
  static clans(x: number, y: number): CrossFormula { return c('totemism-clans', 'clans(x, y) = x + y', x + y, nat(x, y), 'clans', [x, y]) }
  static totempairs(x: number, y: number): CrossFormula { return c('totemism-totempairs', 'totempairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'totempairs', [x, y]) }
  static lineageorderings(x: number): CrossFormula { return c('totemism-lineageorderings', 'lineageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'lineageorderings', [x]) }
  static taboocount(x: number, y: number): CrossFormula { return c('totemism-taboocount', 'taboocount(x, y) = x + y', x + y, nat(x, y), 'taboocount', [x, y]) }
  static kinshipsubsets(x: number): CrossFormula { return c('totemism-kinshipsubsets', 'kinshipsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'kinshipsubsets', [x]) }
  static emblemcombos(x: number, y: number): CrossFormula { return c('totemism-emblemcombos', 'emblemcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'emblemcombos', [x, y]) }
  static descentgroups(x: number, y: number): CrossFormula { return c('totemism-descentgroups', 'descentgroups(x, y) = x · y', x * y, nat(x, y), 'descentgroups', [x, y]) }
  static exogamyratio(x: number, y: number): CrossFormula { return c('totemism-exogamyratio', 'exogamyratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'exogamyratio', [x, y]) }
}

for (const name of ['clans', 'descentgroups', 'emblemcombos', 'exogamyratio', 'kinshipsubsets', 'lineageorderings', 'taboocount', 'totempairs'] as const)
  hexRegisterOf('totemism', name, (TotemismFormulas[name] as (...x: unknown[]) => unknown).bind(TotemismFormulas))
