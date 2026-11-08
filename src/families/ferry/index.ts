import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FERRY — scaffolded integer measures crossed to logistics. Every output an exact finite nonnegative integer. */

const PROOF = 'ferry arithmetic (capacity, crossingtime, vehicledecks, dailycrossings, loadfactor, turnaroundmin, routepairs, throughput); scaffolded from the integer-op palette; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ferry', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `ferry.${name}`, params })

export class FerryFormulas {
  static capacity(x: number, y: number): CrossFormula { return c('ferry-capacity', 'capacity(x, y) = x · y', x * y, nat(x, y), 'capacity', [x, y]) }
  static crossingtime(x: number, y: number): CrossFormula { return c('ferry-crossingtime', 'crossingtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'crossingtime', [x, y]) }
  static vehicledecks(x: number, y: number): CrossFormula { return c('ferry-vehicledecks', 'vehicledecks(x, y) = x + y', x + y, nat(x, y), 'vehicledecks', [x, y]) }
  static dailycrossings(x: number, y: number): CrossFormula { return c('ferry-dailycrossings', 'dailycrossings(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dailycrossings', [x, y]) }
  static loadfactor(x: number, y: number): CrossFormula { return c('ferry-loadfactor', 'loadfactor(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'loadfactor', [x, y]) }
  static turnaroundmin(x: number, y: number): CrossFormula { return c('ferry-turnaroundmin', 'turnaroundmin(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'turnaroundmin', [x, y]) }
  static routepairs(x: number, y: number): CrossFormula { return c('ferry-routepairs', 'routepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'routepairs', [x, y]) }
  static throughput(x: number, y: number): CrossFormula { return c('ferry-throughput', 'throughput(x, y) = x · y', x * y, nat(x, y), 'throughput', [x, y]) }
}

for (const name of ['capacity', 'crossingtime', 'dailycrossings', 'loadfactor', 'routepairs', 'throughput', 'turnaroundmin', 'vehicledecks'] as const)
  hexRegisterOf('ferry', name, (FerryFormulas[name] as (...x: unknown[]) => unknown).bind(FerryFormulas))
