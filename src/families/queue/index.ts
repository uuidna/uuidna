import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QueueFormulas — 8 exact-integer formulas of the queue domain, each at a hex address crossing to cross; develops the queue leads. */

const PROOF = "queue counts: throughput(x, y) = x / y; latency(x, y) = x / y; depth(x, y) = x + y; waittime(x, y) = x / y; slots(x) = 2^x; arrivals(x, y) = x · y; service(x, y) = x / y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'queue', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `queue.${name}`, params })

export class QueueFormulas {
  /** throughput(x, y) = x / y. */
  static throughput(x: number, y: number): CrossFormula { return f('queue-throughput', 'throughput(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
  /** latency(x, y) = x / y. */
  static latency(x: number, y: number): CrossFormula { return f('queue-latency', 'latency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'latency', [x, y]) }
  /** depth(x, y) = x + y. */
  static depth(x: number, y: number): CrossFormula { return f('queue-depth', 'depth(x, y) = x + y', x + y, nat(x, y), 'depth', [x, y]) }
  /** waittime(x, y) = x / y. */
  static waittime(x: number, y: number): CrossFormula { return f('queue-waittime', 'waittime(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'waittime', [x, y]) }
  /** slots(x) = 2^x. */
  static slots(x: number): CrossFormula { return f('queue-slots', 'slots(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'slots', [x]) }
  /** arrivals(x, y) = x · y. */
  static arrivals(x: number, y: number): CrossFormula { return f('queue-arrivals', 'arrivals(x, y) = x · y', x * y, nat(x, y), 'arrivals', [x, y]) }
  /** service(x, y) = x / y. */
  static service(x: number, y: number): CrossFormula { return f('queue-service', 'service(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'service', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('queue-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['arrivals', 'combos', 'depth', 'latency', 'service', 'slots', 'throughput', 'waittime'] as const)
  hexRegisterOf('queue', name, (QueueFormulas[name] as (...x: unknown[]) => unknown).bind(QueueFormulas))
