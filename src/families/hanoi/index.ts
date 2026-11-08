import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HANOI — scaffolded integer measures crossed to combinatorics. Every output an exact finite nonnegative integer. */

const PROOF = 'hanoi arithmetic (disks, movesupperbound, pegs, recursiondepth, subtowers, moveorderings, statesubsets, transfertime); scaffolded from the integer-op palette; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hanoi', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `hanoi.${name}`, params })

export class HanoiFormulas {
  static disks(x: number, y: number): CrossFormula { return c('hanoi-disks', 'disks(x, y) = x + y', x + y, nat(x, y), 'disks', [x, y]) }
  static movesupperbound(x: number): CrossFormula { return c('hanoi-movesupperbound', 'movesupperbound(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'movesupperbound', [x]) }
  static pegs(x: number, y: number): CrossFormula { return c('hanoi-pegs', 'pegs(x, y) = x + y', x + y, nat(x, y), 'pegs', [x, y]) }
  static recursiondepth(x: number, y: number): CrossFormula { return c('hanoi-recursiondepth', 'recursiondepth(x, y) = x + y', x + y, nat(x, y), 'recursiondepth', [x, y]) }
  static subtowers(x: number, y: number): CrossFormula { return c('hanoi-subtowers', 'subtowers(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'subtowers', [x, y]) }
  static moveorderings(x: number): CrossFormula { return c('hanoi-moveorderings', 'moveorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'moveorderings', [x]) }
  static statesubsets(x: number): CrossFormula { return c('hanoi-statesubsets', 'statesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'statesubsets', [x]) }
  static transfertime(x: number, y: number): CrossFormula { return c('hanoi-transfertime', 'transfertime(x, y) = x · y', x * y, nat(x, y), 'transfertime', [x, y]) }
}

for (const name of ['disks', 'moveorderings', 'movesupperbound', 'pegs', 'recursiondepth', 'statesubsets', 'subtowers', 'transfertime'] as const)
  hexRegisterOf('hanoi', name, (HanoiFormulas[name] as (...x: unknown[]) => unknown).bind(HanoiFormulas))
