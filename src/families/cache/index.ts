import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CacheFormulas — 8 exact-integer formulas of the cache domain, each at a hex address crossing to cross; develops the cache leads. */

const PROOF = "cache counts: lines(x, y) = x / y; ways(x) = 2^x; sets(x, y) = x / y; hitpct(x, y) = x · 100 / y; tagbits(x, y) = max(0, x − y); blocks(x, y) = x / y; levels(x, y) = x + y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'cache', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `cache.${name}`, params })

export class CacheFormulas {
  /** lines(x, y) = x / y. */
  static lines(x: number, y: number): CrossFormula { return f('cache-lines', 'lines(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'lines', [x, y]) }
  /** ways(x) = 2^x. */
  static ways(x: number): CrossFormula { return f('cache-ways', 'ways(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'ways', [x]) }
  /** sets(x, y) = x / y. */
  static sets(x: number, y: number): CrossFormula { return f('cache-sets', 'sets(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'sets', [x, y]) }
  /** hitpct(x, y) = x · 100 / y. */
  static hitpct(x: number, y: number): CrossFormula { return f('cache-hitpct', 'hitpct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'hitpct', [x, y]) }
  /** tagbits(x, y) = max(0, x − y). */
  static tagbits(x: number, y: number): CrossFormula { return f('cache-tagbits', 'tagbits(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'tagbits', [x, y]) }
  /** blocks(x, y) = x / y. */
  static blocks(x: number, y: number): CrossFormula { return f('cache-blocks', 'blocks(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'blocks', [x, y]) }
  /** levels(x, y) = x + y. */
  static levels(x: number, y: number): CrossFormula { return f('cache-levels', 'levels(x, y) = x + y', x + y, nat(x, y), 'levels', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('cache-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['blocks', 'combos', 'hitpct', 'levels', 'lines', 'sets', 'tagbits', 'ways'] as const)
  hexRegisterOf('cache', name, (CacheFormulas[name] as (...x: unknown[]) => unknown).bind(CacheFormulas))
