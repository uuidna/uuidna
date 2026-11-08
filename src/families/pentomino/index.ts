import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PENTOMINO — scaffolded integer measures crossed to combinatorics. Every output an exact finite nonnegative integer. */

const PROOF = 'pentomino arithmetic (pieces, cells, orientations, placementcombos, tilingsubsets, symmetryorderings, boardarea, coverage); scaffolded from the integer-op palette; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pentomino', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `pentomino.${name}`, params })

export class PentominoFormulas {
  static pieces(x: number, y: number): CrossFormula { return c('pentomino-pieces', 'pieces(x, y) = x + y', x + y, nat(x, y), 'pieces', [x, y]) }
  static cells(x: number, y: number): CrossFormula { return c('pentomino-cells', 'cells(x, y) = x · y', x * y, nat(x, y), 'cells', [x, y]) }
  static orientations(x: number, y: number): CrossFormula { return c('pentomino-orientations', 'orientations(x, y) = x · y', x * y, nat(x, y), 'orientations', [x, y]) }
  static placementcombos(x: number, y: number): CrossFormula { return c('pentomino-placementcombos', 'placementcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'placementcombos', [x, y]) }
  static tilingsubsets(x: number): CrossFormula { return c('pentomino-tilingsubsets', 'tilingsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'tilingsubsets', [x]) }
  static symmetryorderings(x: number): CrossFormula { return c('pentomino-symmetryorderings', 'symmetryorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'symmetryorderings', [x]) }
  static boardarea(x: number, y: number): CrossFormula { return c('pentomino-boardarea', 'boardarea(x, y) = x · y', x * y, nat(x, y), 'boardarea', [x, y]) }
  static coverage(x: number, y: number): CrossFormula { return c('pentomino-coverage', 'coverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'coverage', [x, y]) }
}

for (const name of ['boardarea', 'cells', 'coverage', 'orientations', 'pieces', 'placementcombos', 'symmetryorderings', 'tilingsubsets'] as const)
  hexRegisterOf('pentomino', name, (PentominoFormulas[name] as (...x: unknown[]) => unknown).bind(PentominoFormulas))
