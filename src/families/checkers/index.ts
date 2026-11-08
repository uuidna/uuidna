import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHECKERS — scaffolded integer measures crossed to graphtheory. Every output an exact finite nonnegative integer. */

const PROOF = 'checkers arithmetic (squares, playablesquares, pieces, movepaths, kingrows, jumpcombos, positionsubsets, branchingfactor); scaffolded from the integer-op palette; a measure crossed to graphtheory'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'checkers', dst: 'graphtheory', formula, value, proof: PROOF, ...extra }, holds, { name: `checkers.${name}`, params })

export class CheckersFormulas {
  static squares(x: number, y: number): CrossFormula { return c('checkers-squares', 'squares(x, y) = x · y', x * y, nat(x, y), 'squares', [x, y]) }
  static playablesquares(x: number, y: number): CrossFormula { return c('checkers-playablesquares', 'playablesquares(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'playablesquares', [x, y]) }
  static pieces(x: number, y: number): CrossFormula { return c('checkers-pieces', 'pieces(x, y) = x · y', x * y, nat(x, y), 'pieces', [x, y]) }
  static movepaths(x: number, y: number): CrossFormula { return c('checkers-movepaths', 'movepaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'movepaths', [x, y]) }
  static kingrows(x: number, y: number): CrossFormula { return c('checkers-kingrows', 'kingrows(x, y) = x + y', x + y, nat(x, y), 'kingrows', [x, y]) }
  static jumpcombos(x: number, y: number): CrossFormula { return c('checkers-jumpcombos', 'jumpcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'jumpcombos', [x, y]) }
  static positionsubsets(x: number): CrossFormula { return c('checkers-positionsubsets', 'positionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'positionsubsets', [x]) }
  static branchingfactor(x: number, y: number): CrossFormula { return c('checkers-branchingfactor', 'branchingfactor(x, y) = x + y', x + y, nat(x, y), 'branchingfactor', [x, y]) }
}

for (const name of ['branchingfactor', 'jumpcombos', 'kingrows', 'movepaths', 'pieces', 'playablesquares', 'positionsubsets', 'squares'] as const)
  hexRegisterOf('checkers', name, (CheckersFormulas[name] as (...x: unknown[]) => unknown).bind(CheckersFormulas))
