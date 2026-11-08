import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CRITICALCHAIN — CRITICAL CHAIN PROJECT MANAGEMENT, AS ARITHMETIC. Protecting a plan is numbers: the project buffer at the
 *  end of the chain, the feeding buffers where paths join, the resource buffer's wake-ups, how much buffer a run has consumed,
 *  the chain's length, the aggregated estimate, the fever-chart margin still left, and the safety an aggressive estimate strips.
 *  Crosses to `logistics` — a critical chain is a schedule logistics must deliver against. A measure. */

const PROOF = 'critical chain arithmetic (project buffer, feeding buffer, resource buffer, buffer consumption, chain length, aggregation, fever margin, safety removed); CCPM as integers; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'criticalchain', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `criticalchain.${name}`, params })

export class CriticalchainFormulas {
  /** PROJECT BUFFER: a share of the aggregated safety, held at the end of the chain. value ⌊aggregated · share / 100⌋. */
  static projectbuffer(aggregated: number, share: number): CrossFormula { return c('criticalchain-projectbuffer', 'projectbuffer(aggregated, share) = ⌊aggregated · share / 100⌋', Math.floor((aggregated * share) / 100), nat(aggregated, share) && share <= 100, 'projectbuffer', [aggregated, share]) }
  /** FEEDING BUFFER: a share of a feeding path, held where it joins the chain. value ⌊path · share / 100⌋. */
  static feedingbuffer(path: number, share: number): CrossFormula { return c('criticalchain-feedingbuffer', 'feedingbuffer(path, share) = ⌊path · share / 100⌋', Math.floor((path * share) / 100), nat(path, share) && share <= 100, 'feedingbuffer', [path, share]) }
  /** RESOURCE BUFFER: lead-time wake-ups across the tasks awaiting a resource. value tasks · lead. */
  static resourcebuffer(tasks: number, lead: number): CrossFormula { return c('criticalchain-resourcebuffer', 'resourcebuffer(tasks, lead) = tasks · lead', tasks * lead, nat(tasks, lead), 'resourcebuffer', [tasks, lead]) }
  /** BUFFER CONSUMPTION: the buffer used, as a percentage. value ⌊used · 100 / size⌋. */
  static bufferconsumption(used: number, size: number): CrossFormula { return c('criticalchain-bufferconsumption', 'bufferconsumption(used, size) = ⌊used · 100 / size⌋', size > 0 ? Math.floor((used * 100) / size) : 0, nat(used, size) && size > 0 && used <= size, 'bufferconsumption', [used, size]) }
  /** CHAIN LENGTH: the tasks on the critical chain at an average duration. value tasks · avg. */
  static chainlength(tasks: number, avg: number): CrossFormula { return c('criticalchain-chainlength', 'chainlength(tasks, avg) = tasks · avg', tasks * avg, nat(tasks, avg), 'chainlength', [tasks, avg]) }
  /** AGGREGATION: the aggregated estimate, the midpoint of an optimistic and a pessimistic one. value ⌊(optimistic + pessimistic) / 2⌋. */
  static aggregation(optimistic: number, pessimistic: number): CrossFormula { return c('criticalchain-aggregation', 'aggregation(optimistic, pessimistic) = ⌊(optimistic + pessimistic) / 2⌋', Math.floor((optimistic + pessimistic) / 2), nat(optimistic, pessimistic), 'aggregation', [optimistic, pessimistic]) }
  /** FEVER MARGIN: the buffer still left after consumption, the fever chart's green. value max(0, buffer − consumed). */
  static fevermargin(buffer: number, consumed: number): CrossFormula { return c('criticalchain-fevermargin', 'fevermargin(buffer, consumed) = max(0, buffer − consumed)', Math.max(0, buffer - consumed), nat(buffer, consumed), 'fevermargin', [buffer, consumed]) }
  /** SAFETY REMOVED: how much padding an aggressive estimate strips from a safe one. value max(0, estimate − aggressive). */
  static safetyremoved(estimate: number, aggressive: number): CrossFormula { return c('criticalchain-safetyremoved', 'safetyremoved(estimate, aggressive) = max(0, estimate − aggressive)', Math.max(0, estimate - aggressive), nat(estimate, aggressive), 'safetyremoved', [estimate, aggressive]) }
}

for (const name of ['aggregation', 'bufferconsumption', 'chainlength', 'feedingbuffer', 'fevermargin', 'projectbuffer', 'resourcebuffer', 'safetyremoved'] as const)
  hexRegisterOf('criticalchain', name, (CriticalchainFormulas[name] as (...x: unknown[]) => unknown).bind(CriticalchainFormulas))
