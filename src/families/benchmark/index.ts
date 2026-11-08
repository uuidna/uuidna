import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BENCHMARK — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'benchmark arithmetic (opspersec, throughput, latencyp50, speedup, iterationpairs, variance, percentilesubsets, efficiency); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'benchmark', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `benchmark.${name}`, params })

export class BenchmarkFormulas {
  static opspersec(x: number, y: number): CrossFormula { return c('benchmark-opspersec', 'opspersec(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'opspersec', [x, y]) }
  static throughput(x: number, y: number): CrossFormula { return c('benchmark-throughput', 'throughput(x, y) = x · y', x * y, nat(x, y), 'throughput', [x, y]) }
  static latencyp50(x: number, y: number): CrossFormula { return c('benchmark-latencyp50', 'latencyp50(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'latencyp50', [x, y]) }
  static speedup(x: number, y: number): CrossFormula { return c('benchmark-speedup', 'speedup(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'speedup', [x, y]) }
  static iterationpairs(x: number, y: number): CrossFormula { return c('benchmark-iterationpairs', 'iterationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'iterationpairs', [x, y]) }
  static variance(x: number, y: number): CrossFormula { return c('benchmark-variance', 'variance(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'variance', [x, y]) }
  static percentilesubsets(x: number): CrossFormula { return c('benchmark-percentilesubsets', 'percentilesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'percentilesubsets', [x]) }
  static efficiency(x: number, y: number): CrossFormula { return c('benchmark-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
}

for (const name of ['efficiency', 'iterationpairs', 'latencyp50', 'opspersec', 'percentilesubsets', 'speedup', 'throughput', 'variance'] as const)
  hexRegisterOf('benchmark', name, (BenchmarkFormulas[name] as (...x: unknown[]) => unknown).bind(BenchmarkFormulas))
