import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TELEMETRY — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'telemetry arithmetic (metrics, spanpairs, samplingrate, cardinality, retentiondays, dimensionsubsets, aggregationpaths, ingestrate); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'telemetry', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `telemetry.${name}`, params })

export class TelemetryFormulas {
  static metrics(x: number, y: number): CrossFormula { return c('telemetry-metrics', 'metrics(x, y) = x + y', x + y, nat(x, y), 'metrics', [x, y]) }
  static spanpairs(x: number, y: number): CrossFormula { return c('telemetry-spanpairs', 'spanpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'spanpairs', [x, y]) }
  static samplingrate(x: number, y: number): CrossFormula { return c('telemetry-samplingrate', 'samplingrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'samplingrate', [x, y]) }
  static cardinality(x: number, y: number): CrossFormula { return c('telemetry-cardinality', 'cardinality(x, y) = x · y', x * y, nat(x, y), 'cardinality', [x, y]) }
  static retentiondays(x: number, y: number): CrossFormula { return c('telemetry-retentiondays', 'retentiondays(x, y) = x · y', x * y, nat(x, y), 'retentiondays', [x, y]) }
  static dimensionsubsets(x: number): CrossFormula { return c('telemetry-dimensionsubsets', 'dimensionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'dimensionsubsets', [x]) }
  static aggregationpaths(x: number, y: number): CrossFormula { return c('telemetry-aggregationpaths', 'aggregationpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'aggregationpaths', [x, y]) }
  static ingestrate(x: number, y: number): CrossFormula { return c('telemetry-ingestrate', 'ingestrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'ingestrate', [x, y]) }
}

for (const name of ['aggregationpaths', 'cardinality', 'dimensionsubsets', 'ingestrate', 'metrics', 'retentiondays', 'samplingrate', 'spanpairs'] as const)
  hexRegisterOf('telemetry', name, (TelemetryFormulas[name] as (...x: unknown[]) => unknown).bind(TelemetryFormulas))
