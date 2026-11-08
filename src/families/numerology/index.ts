import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUMEROLOGY — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'numerology arithmetic (digitsum, numbercombos, cyclewheel, gematriatotal, masternumbers, repetitions, harmonicsum, permutationcount); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'numerology', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `numerology.${name}`, params })

export class NumerologyFormulas {
  static digitsum(x: number, y: number, z: number): CrossFormula { return c('numerology-digitsum', 'digitsum(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'digitsum', [x, y, z]) }
  static numbercombos(x: number, y: number): CrossFormula { return c('numerology-numbercombos', 'numbercombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'numbercombos', [x, y]) }
  static cyclewheel(x: number, y: number): CrossFormula { return c('numerology-cyclewheel', 'cyclewheel(x, y) = x mod y', y > 0 ? x % y : 0, nat(x, y) && y > 0, 'cyclewheel', [x, y]) }
  static gematriatotal(x: number, y: number): CrossFormula { return c('numerology-gematriatotal', 'gematriatotal(x, y) = x · y', x * y, nat(x, y), 'gematriatotal', [x, y]) }
  static masternumbers(x: number, y: number): CrossFormula { return c('numerology-masternumbers', 'masternumbers(x, y) = x + y', x + y, nat(x, y), 'masternumbers', [x, y]) }
  static repetitions(x: number, y: number): CrossFormula { return c('numerology-repetitions', 'repetitions(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'repetitions', [x, y]) }
  static harmonicsum(x: number, y: number, z: number): CrossFormula { return c('numerology-harmonicsum', 'harmonicsum(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'harmonicsum', [x, y, z]) }
  static permutationcount(x: number, y: number): CrossFormula { return c('numerology-permutationcount', 'permutationcount(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'permutationcount', [x, y]) }
}

for (const name of ['cyclewheel', 'digitsum', 'gematriatotal', 'harmonicsum', 'masternumbers', 'numbercombos', 'permutationcount', 'repetitions'] as const)
  hexRegisterOf('numerology', name, (NumerologyFormulas[name] as (...x: unknown[]) => unknown).bind(NumerologyFormulas))
