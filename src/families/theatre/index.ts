import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THEATRE — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'theatre arithmetic (acts, scenecombos, castsize, cueorderings, runtime, blockingpaths, setsubsets, attendanceratio); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'theatre', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `theatre.${name}`, params })

export class TheatreFormulas {
  static acts(x: number, y: number): CrossFormula { return c('theatre-acts', 'acts(x, y) = x + y', x + y, nat(x, y), 'acts', [x, y]) }
  static scenecombos(x: number, y: number): CrossFormula { return c('theatre-scenecombos', 'scenecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'scenecombos', [x, y]) }
  static castsize(x: number, y: number): CrossFormula { return c('theatre-castsize', 'castsize(x, y) = x · y', x * y, nat(x, y), 'castsize', [x, y]) }
  static cueorderings(x: number): CrossFormula { return c('theatre-cueorderings', 'cueorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'cueorderings', [x]) }
  static runtime(x: number, y: number): CrossFormula { return c('theatre-runtime', 'runtime(x, y) = x · y', x * y, nat(x, y), 'runtime', [x, y]) }
  static blockingpaths(x: number, y: number): CrossFormula { return c('theatre-blockingpaths', 'blockingpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'blockingpaths', [x, y]) }
  static setsubsets(x: number): CrossFormula { return c('theatre-setsubsets', 'setsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'setsubsets', [x]) }
  static attendanceratio(x: number, y: number): CrossFormula { return c('theatre-attendanceratio', 'attendanceratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'attendanceratio', [x, y]) }
}

for (const name of ['acts', 'attendanceratio', 'blockingpaths', 'castsize', 'cueorderings', 'runtime', 'scenecombos', 'setsubsets'] as const)
  hexRegisterOf('theatre', name, (TheatreFormulas[name] as (...x: unknown[]) => unknown).bind(TheatreFormulas))
