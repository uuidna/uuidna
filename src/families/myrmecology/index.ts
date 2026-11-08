import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MYRMECOLOGY — scaffolded integer measures crossed to zoology. Every output an exact finite nonnegative integer. */

const PROOF = 'myrmecology arithmetic (colonysize, castecount, foragingpaths, pheromonetrails, nestchambers, tandempairs, workerratio, broodstages); scaffolded from the integer-op palette; a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'myrmecology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `myrmecology.${name}`, params })

export class MyrmecologyFormulas {
  static colonysize(x: number, y: number): CrossFormula { return c('myrmecology-colonysize', 'colonysize(x, y) = x · y', x * y, nat(x, y), 'colonysize', [x, y]) }
  static castecount(x: number, y: number): CrossFormula { return c('myrmecology-castecount', 'castecount(x, y) = x + y', x + y, nat(x, y), 'castecount', [x, y]) }
  static foragingpaths(x: number): CrossFormula { return c('myrmecology-foragingpaths', 'foragingpaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'foragingpaths', [x]) }
  static pheromonetrails(x: number, y: number): CrossFormula { return c('myrmecology-pheromonetrails', 'pheromonetrails(x, y) = x · y', x * y, nat(x, y), 'pheromonetrails', [x, y]) }
  static nestchambers(x: number, y: number): CrossFormula { return c('myrmecology-nestchambers', 'nestchambers(x, y) = x + y', x + y, nat(x, y), 'nestchambers', [x, y]) }
  static tandempairs(x: number, y: number): CrossFormula { return c('myrmecology-tandempairs', 'tandempairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'tandempairs', [x, y]) }
  static workerratio(x: number, y: number): CrossFormula { return c('myrmecology-workerratio', 'workerratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'workerratio', [x, y]) }
  static broodstages(x: number, y: number): CrossFormula { return c('myrmecology-broodstages', 'broodstages(x, y) = x + y', x + y, nat(x, y), 'broodstages', [x, y]) }
}

for (const name of ['broodstages', 'castecount', 'colonysize', 'foragingpaths', 'nestchambers', 'pheromonetrails', 'tandempairs', 'workerratio'] as const)
  hexRegisterOf('myrmecology', name, (MyrmecologyFormulas[name] as (...x: unknown[]) => unknown).bind(MyrmecologyFormulas))
