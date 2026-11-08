import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BACKGAMMON — scaffolded integer measures crossed to probability. Every output an exact finite nonnegative integer. */

const PROOF = 'backgammon arithmetic (points, dicecombos, pipcount, doublescube, checkers, rolloutcomes, bearoffperms, winprob); scaffolded from the integer-op palette; a measure crossed to probability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'backgammon', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, { name: `backgammon.${name}`, params })

export class BackgammonFormulas {
  static points(x: number, y: number): CrossFormula { return c('backgammon-points', 'points(x, y) = x + y', x + y, nat(x, y), 'points', [x, y]) }
  static dicecombos(x: number, y: number): CrossFormula { return c('backgammon-dicecombos', 'dicecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'dicecombos', [x, y]) }
  static pipcount(x: number, y: number): CrossFormula { return c('backgammon-pipcount', 'pipcount(x, y) = x · y', x * y, nat(x, y), 'pipcount', [x, y]) }
  static doublescube(x: number): CrossFormula { return c('backgammon-doublescube', 'doublescube(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'doublescube', [x]) }
  static checkers(x: number, y: number): CrossFormula { return c('backgammon-checkers', 'checkers(x, y) = x + y', x + y, nat(x, y), 'checkers', [x, y]) }
  static rolloutcomes(x: number, y: number): CrossFormula { return c('backgammon-rolloutcomes', 'rolloutcomes(x, y) = x · y', x * y, nat(x, y), 'rolloutcomes', [x, y]) }
  static bearoffperms(x: number): CrossFormula { return c('backgammon-bearoffperms', 'bearoffperms(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'bearoffperms', [x]) }
  static winprob(x: number, y: number): CrossFormula { return c('backgammon-winprob', 'winprob(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'winprob', [x, y]) }
}

for (const name of ['bearoffperms', 'checkers', 'dicecombos', 'doublescube', 'pipcount', 'points', 'rolloutcomes', 'winprob'] as const)
  hexRegisterOf('backgammon', name, (BackgammonFormulas[name] as (...x: unknown[]) => unknown).bind(BackgammonFormulas))
