import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** OBS — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'obs arithmetic (uptime, errorrate, latencyp99, throughput, alertcombos, sloburn, samplingrate, dashboardsubsets); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'obs', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `obs.${name}`, params })

export class ObsFormulas {
  static uptime(x: number, y: number): CrossFormula { return c('obs-uptime', 'uptime(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'uptime', [x, y]) }
  static errorrate(x: number, y: number): CrossFormula { return c('obs-errorrate', 'errorrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'errorrate', [x, y]) }
  static latencyp99(x: number, y: number): CrossFormula { return c('obs-latencyp99', 'latencyp99(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'latencyp99', [x, y]) }
  static throughput(x: number, y: number): CrossFormula { return c('obs-throughput', 'throughput(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'throughput', [x, y]) }
  static alertcombos(x: number, y: number): CrossFormula { return c('obs-alertcombos', 'alertcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'alertcombos', [x, y]) }
  static sloburn(x: number, y: number): CrossFormula { return c('obs-sloburn', 'sloburn(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'sloburn', [x, y]) }
  static samplingrate(x: number, y: number): CrossFormula { return c('obs-samplingrate', 'samplingrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'samplingrate', [x, y]) }
  static dashboardsubsets(x: number): CrossFormula { return c('obs-dashboardsubsets', 'dashboardsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'dashboardsubsets', [x]) }
}

for (const name of ['alertcombos', 'dashboardsubsets', 'errorrate', 'latencyp99', 'samplingrate', 'sloburn', 'throughput', 'uptime'] as const)
  hexRegisterOf('obs', name, (ObsFormulas[name] as (...x: unknown[]) => unknown).bind(ObsFormulas))
