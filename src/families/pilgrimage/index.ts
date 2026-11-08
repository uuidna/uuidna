import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PILGRIMAGE — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'pilgrimage arithmetic (stagecount, routeorderings, stationpairs, distance, daysrequired, waypointsubsets, groupsize, restpoints); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pilgrimage', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `pilgrimage.${name}`, params })

export class PilgrimageFormulas {
  static stagecount(x: number, y: number): CrossFormula { return c('pilgrimage-stagecount', 'stagecount(x, y) = x + y', x + y, nat(x, y), 'stagecount', [x, y]) }
  static routeorderings(x: number): CrossFormula { return c('pilgrimage-routeorderings', 'routeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'routeorderings', [x]) }
  static stationpairs(x: number, y: number): CrossFormula { return c('pilgrimage-stationpairs', 'stationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'stationpairs', [x, y]) }
  static distance(x: number, y: number): CrossFormula { return c('pilgrimage-distance', 'distance(x, y) = x · y', x * y, nat(x, y), 'distance', [x, y]) }
  static daysrequired(x: number, y: number): CrossFormula { return c('pilgrimage-daysrequired', 'daysrequired(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'daysrequired', [x, y]) }
  static waypointsubsets(x: number): CrossFormula { return c('pilgrimage-waypointsubsets', 'waypointsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'waypointsubsets', [x]) }
  static groupsize(x: number, y: number): CrossFormula { return c('pilgrimage-groupsize', 'groupsize(x, y) = x · y', x * y, nat(x, y), 'groupsize', [x, y]) }
  static restpoints(x: number, y: number): CrossFormula { return c('pilgrimage-restpoints', 'restpoints(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'restpoints', [x, y]) }
}

for (const name of ['daysrequired', 'distance', 'groupsize', 'restpoints', 'routeorderings', 'stagecount', 'stationpairs', 'waypointsubsets'] as const)
  hexRegisterOf('pilgrimage', name, (PilgrimageFormulas[name] as (...x: unknown[]) => unknown).bind(PilgrimageFormulas))
