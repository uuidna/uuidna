import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ALERTING — THE ALARM LAYER, AS ARITHMETIC (what wakes an on-call engineer, in numbers). An alert fires when a signal
 *  crosses a threshold; the rest is bookkeeping: how many alerts were false, how fast we noticed, how far it escalated,
 *  how much of the stream was noise, how many duplicates collapsed, how severe it was, and how badly it flapped.
 *  Crosses to `observability` — alerting is what turns observed signals into a page. A measure. */

const PROOF = 'alerting arithmetic (threshold fire, false-positive rate, mean time to detect, escalation, noise ratio, deduplication, severity, flapping); turns observed signals into a page; a measure crossed to observability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'alerting', dst: 'observability', formula, value, proof: PROOF, ...extra }, holds, { name: `alerting.${name}`, params })

export class AlertingFormulas {
  /** THRESHOLD: the alert fires when the signal reaches the limit. value [signal ≥ limit]. */
  static threshold(signal: number, limit: number): CrossFormula { return c('alerting-threshold', 'threshold(signal, limit) = [signal ≥ limit]', signal >= limit ? 1 : 0, nat(signal, limit), 'threshold', [signal, limit]) }
  /** FALSE-POSITIVE RATE: the share of alerts that were false, as a percentage. value ⌊false · 100 / total⌋. */
  static falsepositiverate(falses: number, total: number): CrossFormula { return c('alerting-falsepositiverate', 'falsepositiverate(false, total) = ⌊false · 100 / total⌋', total > 0 ? Math.floor((falses * 100) / total) : 0, nat(falses, total) && total > 0 && falses <= total, 'falsepositiverate', [falses, total]) }
  /** MEAN TIME TO DETECT: total detection minutes over the incidents seen. value ⌊total / incidents⌋. */
  static mttd(total: number, incidents: number): CrossFormula { return c('alerting-mttd', 'mttd(total, incidents) = ⌊total / incidents⌋', incidents > 0 ? Math.floor(total / incidents) : 0, nat(total, incidents) && incidents > 0, 'mttd', [total, incidents]) }
  /** ESCALATION: the wait before the next tier, a level at a per-level step. value level · step. */
  static escalation(level: number, step: number): CrossFormula { return c('alerting-escalation', 'escalation(level, step) = level · step', level * step, nat(level, step), 'escalation', [level, step]) }
  /** NOISE RATIO: the share of the stream that was noise, as a percentage. value ⌊noise · 100 / total⌋. */
  static noiseratio(noise: number, total: number): CrossFormula { return c('alerting-noiseratio', 'noiseratio(noise, total) = ⌊noise · 100 / total⌋', total > 0 ? Math.floor((noise * 100) / total) : 0, nat(noise, total) && total > 0 && noise <= total, 'noiseratio', [noise, total]) }
  /** DEDUPLICATION: the duplicate alerts collapsed away. value max(0, raw − unique). */
  static deduplication(raw: number, unique: number): CrossFormula { return c('alerting-deduplication', 'deduplication(raw, unique) = max(0, raw − unique)', Math.max(0, raw - unique), nat(raw, unique), 'deduplication', [raw, unique]) }
  /** SEVERITY SCORE: impact weighted by urgency. value impact · urgency. */
  static severityscore(impact: number, urgency: number): CrossFormula { return c('alerting-severityscore', 'severityscore(impact, urgency) = impact · urgency', impact * urgency, nat(impact, urgency), 'severityscore', [impact, urgency]) }
  /** FLAPPING INDEX: state transitions over a window, as a per-window index. value ⌊transitions · 100 / window⌋. */
  static flappingindex(transitions: number, window: number): CrossFormula { return c('alerting-flappingindex', 'flappingindex(transitions, window) = ⌊transitions · 100 / window⌋', window > 0 ? Math.floor((transitions * 100) / window) : 0, nat(transitions, window) && window > 0, 'flappingindex', [transitions, window]) }
}

for (const name of ['deduplication', 'escalation', 'falsepositiverate', 'flappingindex', 'mttd', 'noiseratio', 'severityscore', 'threshold'] as const)
  hexRegisterOf('alerting', name, (AlertingFormulas[name] as (...x: unknown[]) => unknown).bind(AlertingFormulas))
