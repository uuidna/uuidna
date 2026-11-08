import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ARACHNOLOGY — scaffolded integer measures crossed to zoology. Every output an exact finite nonnegative integer. */

const PROOF = 'arachnology arithmetic (legcount, eyearrangements, silkglands, speciescount, webradials, venomtoxins, moltstages, preycombos); scaffolded from the integer-op palette; a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'arachnology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `arachnology.${name}`, params })

export class ArachnologyFormulas {
  static legcount(x: number, y: number): CrossFormula { return c('arachnology-legcount', 'legcount(x, y) = x + y', x + y, nat(x, y), 'legcount', [x, y]) }
  static eyearrangements(x: number): CrossFormula { return c('arachnology-eyearrangements', 'eyearrangements(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'eyearrangements', [x]) }
  static silkglands(x: number, y: number): CrossFormula { return c('arachnology-silkglands', 'silkglands(x, y) = x · y', x * y, nat(x, y), 'silkglands', [x, y]) }
  static speciescount(x: number, y: number): CrossFormula { return c('arachnology-speciescount', 'speciescount(x, y) = x · y', x * y, nat(x, y), 'speciescount', [x, y]) }
  static webradials(x: number, y: number): CrossFormula { return c('arachnology-webradials', 'webradials(x, y) = x + y', x + y, nat(x, y), 'webradials', [x, y]) }
  static venomtoxins(x: number, y: number): CrossFormula { return c('arachnology-venomtoxins', 'venomtoxins(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'venomtoxins', [x, y]) }
  static moltstages(x: number, y: number): CrossFormula { return c('arachnology-moltstages', 'moltstages(x, y) = x + y', x + y, nat(x, y), 'moltstages', [x, y]) }
  static preycombos(x: number, y: number): CrossFormula { return c('arachnology-preycombos', 'preycombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'preycombos', [x, y]) }
}

for (const name of ['eyearrangements', 'legcount', 'moltstages', 'preycombos', 'silkglands', 'speciescount', 'venomtoxins', 'webradials'] as const)
  hexRegisterOf('arachnology', name, (ArachnologyFormulas[name] as (...x: unknown[]) => unknown).bind(ArachnologyFormulas))
