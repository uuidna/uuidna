import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RouterFormulas — 8 exact-integer formulas of the router domain, each at a hex address crossing to cross; develops the router leads. */

const PROOF = "router counts: routes(x, y) = x · y; hops(x, y) = x + y; ttl(x, y) = max(0, x − y); tables(x, y) = x · y; interfaces(x, y) = x + y; latency(x, y) = x / y; queues(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'router', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `router.${name}`, params })

export class RouterFormulas {
  /** routes(x, y) = x · y. */
  static routes(x: number, y: number): CrossFormula { return f('router-routes', 'routes(x, y) = x · y', x * y, nat(x, y), 'routes', [x, y]) }
  /** hops(x, y) = x + y. */
  static hops(x: number, y: number): CrossFormula { return f('router-hops', 'hops(x, y) = x + y', x + y, nat(x, y), 'hops', [x, y]) }
  /** ttl(x, y) = max(0, x − y). */
  static ttl(x: number, y: number): CrossFormula { return f('router-ttl', 'ttl(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'ttl', [x, y]) }
  /** tables(x, y) = x · y. */
  static tables(x: number, y: number): CrossFormula { return f('router-tables', 'tables(x, y) = x · y', x * y, nat(x, y), 'tables', [x, y]) }
  /** interfaces(x, y) = x + y. */
  static interfaces(x: number, y: number): CrossFormula { return f('router-interfaces', 'interfaces(x, y) = x + y', x + y, nat(x, y), 'interfaces', [x, y]) }
  /** latency(x, y) = x / y. */
  static latency(x: number, y: number): CrossFormula { return f('router-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'latency', [x, y]) }
  /** queues(x, y) = x · y. */
  static queues(x: number, y: number): CrossFormula { return f('router-queues', 'queues(x, y) = x · y', x * y, nat(x, y), 'queues', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('router-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['combos', 'hops', 'interfaces', 'latency', 'queues', 'routes', 'tables', 'ttl'] as const)
  hexRegisterOf('router', name, (RouterFormulas[name] as (...x: unknown[]) => unknown).bind(RouterFormulas))
