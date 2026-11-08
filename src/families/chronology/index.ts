import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHRONOLOGY — scaffolded integer measures crossed to archaeology. Every output an exact finite nonnegative integer. */

const PROOF = 'chronology arithmetic (yearspan, eventorderings, periodcount, overlapwindows, datingerror, sequencechoices, epochdivisions, synchronisms); scaffolded from the integer-op palette; a measure crossed to archaeology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'chronology', dst: 'archaeology', formula, value, proof: PROOF, ...extra }, holds, { name: `chronology.${name}`, params })

export class ChronologyFormulas {
  static yearspan(x: number, y: number): CrossFormula { return c('chronology-yearspan', 'yearspan(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'yearspan', [x, y]) }
  static eventorderings(x: number): CrossFormula { return c('chronology-eventorderings', 'eventorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'eventorderings', [x]) }
  static periodcount(x: number, y: number): CrossFormula { return c('chronology-periodcount', 'periodcount(x, y) = x + y', x + y, nat(x, y), 'periodcount', [x, y]) }
  static overlapwindows(x: number, y: number): CrossFormula { return c('chronology-overlapwindows', 'overlapwindows(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'overlapwindows', [x, y]) }
  static datingerror(x: number, y: number): CrossFormula { return c('chronology-datingerror', 'datingerror(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'datingerror', [x, y]) }
  static sequencechoices(x: number, y: number): CrossFormula { return c('chronology-sequencechoices', 'sequencechoices(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'sequencechoices', [x, y]) }
  static epochdivisions(x: number, y: number): CrossFormula { return c('chronology-epochdivisions', 'epochdivisions(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'epochdivisions', [x, y]) }
  static synchronisms(x: number, y: number): CrossFormula { return c('chronology-synchronisms', 'synchronisms(x, y) = x · y', x * y, nat(x, y), 'synchronisms', [x, y]) }
}

for (const name of ['datingerror', 'epochdivisions', 'eventorderings', 'overlapwindows', 'periodcount', 'sequencechoices', 'synchronisms', 'yearspan'] as const)
  hexRegisterOf('chronology', name, (ChronologyFormulas[name] as (...x: unknown[]) => unknown).bind(ChronologyFormulas))
