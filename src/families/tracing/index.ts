import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRACING — DISTRIBUTED REQUEST TRACING, AS ARITHMETIC (chosen by the registry, not by hand). A traced request is numbers:
 *  the spans it emits, the critical path through them, the fraction sampled, the latency budget left, the fan-out to
 *  downstream services, the depth of the span tree, instrumentation overhead, and whether a slow trace is tail-sampled.
 *  Crosses to `observability` — tracing is what observability reads. A measure. */

const PROOF = 'tracing arithmetic (span count, critical path, sample rate, latency budget, fan-out, trace depth, overhead, tail sampling); a request measured span by span; a measure crossed to observability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tracing', dst: 'observability', formula, value, proof: PROOF, ...extra }, holds, { name: `tracing.${name}`, params })

export class TracingFormulas {
  /** SPAN COUNT: spans emitted across the services a trace touches. value services · spans. */
  static spancount(services: number, spans: number): CrossFormula { return c('tracing-spancount', 'spancount(services, spans) = services · spans', services * spans, nat(services, spans), 'spancount', [services, spans]) }
  /** CRITICAL PATH: the serial duration left after work that ran in parallel. value max(0, total − parallel). */
  static criticalpath(total: number, parallel: number): CrossFormula { return c('tracing-criticalpath', 'criticalpath(total, parallel) = max(0, total − parallel)', Math.max(0, total - parallel), nat(total, parallel), 'criticalpath', [total, parallel]) }
  /** SAMPLE RATE as a percentage of traces kept. value ⌊sampled · 100 / total⌋. */
  static samplerate(sampled: number, total: number): CrossFormula { return c('tracing-samplerate', 'samplerate(sampled, total) = ⌊sampled · 100 / total⌋', total > 0 ? Math.floor((sampled * 100) / total) : 0, nat(sampled, total) && total > 0 && sampled <= total, 'samplerate', [sampled, total]) }
  /** LATENCY BUDGET: milliseconds of budget left after what a span already used. value max(0, budget − used). */
  static latencybudget(budget: number, used: number): CrossFormula { return c('tracing-latencybudget', 'latencybudget(budget, used) = max(0, budget − used)', Math.max(0, budget - used), nat(budget, used), 'latencybudget', [budget, used]) }
  /** FAN-OUT: downstream calls a service makes per request. value services · calls. */
  static fanout(services: number, calls: number): CrossFormula { return c('tracing-fanout', 'fanout(services, calls) = services · calls', services * calls, nat(services, calls), 'fanout', [services, calls]) }
  /** TRACE DEPTH: levels of the span tree at a branching factor. value ⌈spans / branch⌉. */
  static tracedepth(spans: number, branch: number): CrossFormula { return c('tracing-tracedepth', 'tracedepth(spans, branch) = ⌈spans / branch⌉', branch > 0 ? Math.ceil(spans / branch) : 0, nat(spans, branch) && branch > 0, 'tracedepth', [spans, branch]) }
  /** OVERHEAD: instrumentation bytes (per span) at a rate per thousand. value ⌊bytes · rate / 1000⌋. */
  static overhead(bytes: number, rate: number): CrossFormula { return c('tracing-overhead', 'overhead(bytes, rate) = ⌊bytes · rate / 1000⌋', Math.floor((bytes * rate) / 1000), nat(bytes, rate), 'overhead', [bytes, rate]) }
  /** TAIL SAMPLING: 1 when a trace's latency reaches the threshold to keep. value [latency ≥ threshold]. */
  static tailsampling(latency: number, threshold: number): CrossFormula { return c('tracing-tailsampling', 'tailsampling(latency, threshold) = [latency ≥ threshold]', latency >= threshold ? 1 : 0, nat(latency, threshold), 'tailsampling', [latency, threshold]) }
}

for (const name of ['criticalpath', 'fanout', 'latencybudget', 'overhead', 'samplerate', 'spancount', 'tailsampling', 'tracedepth'] as const)
  hexRegisterOf('tracing', name, (TracingFormulas[name] as (...x: unknown[]) => unknown).bind(TracingFormulas))
