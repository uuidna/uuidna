import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MONITORING — SRE AND ALERTING, AS ARITHMETIC (chosen by the public-API registry, not by hand). Watching a running system
 *  is numbers: uptime, mean time to repair, mean time to failure, how many alerts fired, the Apdex score, alert noise,
 *  monitoring coverage, and the share of incidents still open. Crosses to `obs` — monitoring is how observability acts. A measure. */

const PROOF = 'monitoring arithmetic (uptime, mttr, mttf, alerts, apdex, noise, coverage, incidents); SRE and alerting over a running system; a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'monitoring', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `monitoring.${name}`, params })

export class MonitoringFormulas {
  /** UPTIME as a percentage. value ⌊up · 100 / total⌋. */
  static uptime(up: number, total: number): CrossFormula { return c('monitoring-uptime', 'uptime(up, total) = ⌊up · 100 / total⌋', total > 0 ? Math.floor((up * 100) / total) : 0, nat(up, total) && total > 0 && up <= total, 'uptime', [up, total]) }
  /** MEAN TIME TO REPAIR: total downtime over the incidents. value ⌊total / incidents⌋. */
  static mttr(total: number, incidents: number): CrossFormula { return c('monitoring-mttr', 'mttr(total, incidents) = ⌊total / incidents⌋', incidents > 0 ? Math.floor(total / incidents) : 0, nat(total, incidents) && incidents > 0, 'mttr', [total, incidents]) }
  /** MEAN TIME TO FAILURE: uptime over the failures. value ⌊uptime / failures⌋. */
  static mttf(uptime: number, failures: number): CrossFormula { return c('monitoring-mttf', 'mttf(uptime, failures) = ⌊uptime / failures⌋', failures > 0 ? Math.floor(uptime / failures) : 0, nat(uptime, failures) && failures > 0, 'mttf', [uptime, failures]) }
  /** ALERTS as a percentage: fired of the total. value ⌊fired · 100 / total⌋. */
  static alerts(fired: number, total: number): CrossFormula { return c('monitoring-alerts', 'alerts(fired, total) = ⌊fired · 100 / total⌋', total > 0 ? Math.floor((fired * 100) / total) : 0, nat(fired, total) && total > 0 && fired <= total, 'alerts', [fired, total]) }
  /** APDEX: satisfied of the total requests, as a percentage. value ⌊satisfied · 100 / total⌋. */
  static apdex(satisfied: number, total: number): CrossFormula { return c('monitoring-apdex', 'apdex(satisfied, total) = ⌊satisfied · 100 / total⌋', total > 0 ? Math.floor((satisfied * 100) / total) : 0, nat(satisfied, total) && total > 0 && satisfied <= total, 'apdex', [satisfied, total]) }
  /** NOISE: false positives of the total alerts, as a percentage. value ⌊falsePositives · 100 / total⌋. */
  static noise(falsePositives: number, total: number): CrossFormula { return c('monitoring-noise', 'noise(falsePositives, total) = ⌊falsePositives · 100 / total⌋', total > 0 ? Math.floor((falsePositives * 100) / total) : 0, nat(falsePositives, total) && total > 0 && falsePositives <= total, 'noise', [falsePositives, total]) }
  /** COVERAGE: monitored of the total services, as a percentage. value ⌊monitored · 100 / total⌋. */
  static coverage(monitored: number, total: number): CrossFormula { return c('monitoring-coverage', 'coverage(monitored, total) = ⌊monitored · 100 / total⌋', total > 0 ? Math.floor((monitored * 100) / total) : 0, nat(monitored, total) && total > 0 && monitored <= total, 'coverage', [monitored, total]) }
  /** INCIDENTS: open of the total, as a percentage. value ⌊open · 100 / total⌋. */
  static incidents(open: number, total: number): CrossFormula { return c('monitoring-incidents', 'incidents(open, total) = ⌊open · 100 / total⌋', total > 0 ? Math.floor((open * 100) / total) : 0, nat(open, total) && total > 0 && open <= total, 'incidents', [open, total]) }
}

for (const name of ['alerts', 'apdex', 'coverage', 'incidents', 'mttf', 'mttr', 'noise', 'uptime'] as const)
  hexRegisterOf('monitoring', name, (MonitoringFormulas[name] as (...x: unknown[]) => unknown).bind(MonitoringFormulas))
