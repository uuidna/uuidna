import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RUBIK — scaffolded integer measures crossed to combinatorics. Every output an exact finite nonnegative integer. */

const PROOF = 'rubik arithmetic (faces, stickers, cornerperms, edgepairs, movesubsets, godsnumber, cubies, solvedratio); scaffolded from the integer-op palette; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rubik', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `rubik.${name}`, params })

export class RubikFormulas {
  static faces(x: number, y: number): CrossFormula { return c('rubik-faces', 'faces(x, y) = x + y', x + y, nat(x, y), 'faces', [x, y]) }
  static stickers(x: number, y: number): CrossFormula { return c('rubik-stickers', 'stickers(x, y) = x · y', x * y, nat(x, y), 'stickers', [x, y]) }
  static cornerperms(x: number): CrossFormula { return c('rubik-cornerperms', 'cornerperms(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'cornerperms', [x]) }
  static edgepairs(x: number, y: number): CrossFormula { return c('rubik-edgepairs', 'edgepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'edgepairs', [x, y]) }
  static movesubsets(x: number): CrossFormula { return c('rubik-movesubsets', 'movesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'movesubsets', [x]) }
  static godsnumber(x: number, y: number): CrossFormula { return c('rubik-godsnumber', 'godsnumber(x, y) = x + y', x + y, nat(x, y), 'godsnumber', [x, y]) }
  static cubies(x: number, y: number): CrossFormula { return c('rubik-cubies', 'cubies(x, y) = x + y', x + y, nat(x, y), 'cubies', [x, y]) }
  static solvedratio(x: number, y: number): CrossFormula { return c('rubik-solvedratio', 'solvedratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'solvedratio', [x, y]) }
}

for (const name of ['cornerperms', 'cubies', 'edgepairs', 'faces', 'godsnumber', 'movesubsets', 'solvedratio', 'stickers'] as const)
  hexRegisterOf('rubik', name, (RubikFormulas[name] as (...x: unknown[]) => unknown).bind(RubikFormulas))
