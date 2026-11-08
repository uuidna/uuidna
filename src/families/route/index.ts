import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ROUTE — scaffolded integer measures crossed to networking. Every output an exact finite nonnegative integer. */

const PROOF = 'route arithmetic (hopcount, pathcombos, shortestpath, bandwidthsum, routingtable, hoporderings, redundantpaths, latencysum); scaffolded from the integer-op palette; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'route', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `route.${name}`, params })

export class RouteFormulas {
  static hopcount(x: number, y: number): CrossFormula { return c('route-hopcount', 'hopcount(x, y) = x + y', x + y, nat(x, y), 'hopcount', [x, y]) }
  static pathcombos(x: number, y: number): CrossFormula { return c('route-pathcombos', 'pathcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'pathcombos', [x, y]) }
  static shortestpath(x: number, y: number): CrossFormula { return c('route-shortestpath', 'shortestpath(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'shortestpath', [x, y]) }
  static bandwidthsum(x: number, y: number): CrossFormula { return c('route-bandwidthsum', 'bandwidthsum(x, y) = x · y', x * y, nat(x, y), 'bandwidthsum', [x, y]) }
  static routingtable(x: number, y: number): CrossFormula { return c('route-routingtable', 'routingtable(x, y) = x · y', x * y, nat(x, y), 'routingtable', [x, y]) }
  static hoporderings(x: number): CrossFormula { return c('route-hoporderings', 'hoporderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'hoporderings', [x]) }
  static redundantpaths(x: number): CrossFormula { return c('route-redundantpaths', 'redundantpaths(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'redundantpaths', [x]) }
  static latencysum(x: number, y: number, z: number): CrossFormula { return c('route-latencysum', 'latencysum(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'latencysum', [x, y, z]) }
}

for (const name of ['bandwidthsum', 'hopcount', 'hoporderings', 'latencysum', 'pathcombos', 'redundantpaths', 'routingtable', 'shortestpath'] as const)
  hexRegisterOf('route', name, (RouteFormulas[name] as (...x: unknown[]) => unknown).bind(RouteFormulas))
