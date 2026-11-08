import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SCRABBLE — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'scrabble arithmetic (tiles, lettervalues, rackcombos, wordpermutations, boardcells, bingobonus, blanktiles, scoremultiplier); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'scrabble', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `scrabble.${name}`, params })

export class ScrabbleFormulas {
  static tiles(x: number, y: number): CrossFormula { return c('scrabble-tiles', 'tiles(x, y) = x + y', x + y, nat(x, y), 'tiles', [x, y]) }
  static lettervalues(x: number, y: number): CrossFormula { return c('scrabble-lettervalues', 'lettervalues(x, y) = x · y', x * y, nat(x, y), 'lettervalues', [x, y]) }
  static rackcombos(x: number, y: number): CrossFormula { return c('scrabble-rackcombos', 'rackcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'rackcombos', [x, y]) }
  static wordpermutations(x: number): CrossFormula { return c('scrabble-wordpermutations', 'wordpermutations(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'wordpermutations', [x]) }
  static boardcells(x: number, y: number): CrossFormula { return c('scrabble-boardcells', 'boardcells(x, y) = x · y', x * y, nat(x, y), 'boardcells', [x, y]) }
  static bingobonus(x: number, y: number): CrossFormula { return c('scrabble-bingobonus', 'bingobonus(x, y) = x + y', x + y, nat(x, y), 'bingobonus', [x, y]) }
  static blanktiles(x: number, y: number): CrossFormula { return c('scrabble-blanktiles', 'blanktiles(x, y) = x + y', x + y, nat(x, y), 'blanktiles', [x, y]) }
  static scoremultiplier(x: number, y: number): CrossFormula { return c('scrabble-scoremultiplier', 'scoremultiplier(x, y) = x · y', x * y, nat(x, y), 'scoremultiplier', [x, y]) }
}

for (const name of ['bingobonus', 'blanktiles', 'boardcells', 'lettervalues', 'rackcombos', 'scoremultiplier', 'tiles', 'wordpermutations'] as const)
  hexRegisterOf('scrabble', name, (ScrabbleFormulas[name] as (...x: unknown[]) => unknown).bind(ScrabbleFormulas))
