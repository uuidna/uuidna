import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HashFormulas — 8 exact-integer formulas of the hash domain, each at a hex address crossing to cross; develops the hash leads. */

const PROOF = "hash counts: buckets(x) = 2^x; collisions(x, y) = max(0, x − y); loadpct(x, y) = x · 100 / y; digestbits(x, y) = x · y; seeds(x, y) = x + y; probes(x, y) = x / y; bitsperkey(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'hash', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `hash.${name}`, params })

export class HashFormulas {
  /** buckets(x) = 2^x. */
  static buckets(x: number): CrossFormula { return f('hash-buckets', 'buckets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'buckets', [x]) }
  /** collisions(x, y) = max(0, x − y). */
  static collisions(x: number, y: number): CrossFormula { return f('hash-collisions', 'collisions(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'collisions', [x, y]) }
  /** loadpct(x, y) = x · 100 / y. */
  static loadpct(x: number, y: number): CrossFormula { return f('hash-loadpct', 'loadpct(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'loadpct', [x, y]) }
  /** digestbits(x, y) = x · y. */
  static digestbits(x: number, y: number): CrossFormula { return f('hash-digestbits', 'digestbits(x, y) = x · y', x * y, nat(x, y), 'digestbits', [x, y]) }
  /** seeds(x, y) = x + y. */
  static seeds(x: number, y: number): CrossFormula { return f('hash-seeds', 'seeds(x, y) = x + y', x + y, nat(x, y), 'seeds', [x, y]) }
  /** probes(x, y) = x / y. */
  static probes(x: number, y: number): CrossFormula { return f('hash-probes', 'probes(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'probes', [x, y]) }
  /** bitsperkey(x, y) = x / y. */
  static bitsperkey(x: number, y: number): CrossFormula { return f('hash-bitsperkey', 'bitsperkey(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'bitsperkey', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('hash-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['bitsperkey', 'buckets', 'collisions', 'combos', 'digestbits', 'loadpct', 'probes', 'seeds'] as const)
  hexRegisterOf('hash', name, (HashFormulas[name] as (...x: unknown[]) => unknown).bind(HashFormulas))
