import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ATTENTION — THE MIND'S COMPUTE BUDGET, AS ARITHMETIC. What a focused mind spends is numbers: time on task, targets
 *  caught, interruptions per hour, the span held, task switches, relevant stimuli selected, effort sustained, and the
 *  workload against capacity. Crosses to `psychology` — attention is what cognition allocates. A measure. */

const PROOF = 'attention arithmetic (focus, vigilance, distraction, span, switching, selective, sustained, workload); the mind\'s compute budget; a measure crossed to psychology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'attention', dst: 'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `attention.${name}`, params })

export class AttentionFormulas {
  /** FOCUS: the share of time spent on task, as a percentage. value ⌊ontask · 100 / total⌋. */
  static focus(ontask: number, total: number): CrossFormula { return c('attention-focus', 'focus(ontask, total) = ⌊ontask · 100 / total⌋', total > 0 ? Math.floor((ontask * 100) / total) : 0, nat(ontask, total) && total > 0 && ontask <= total, 'focus', [ontask, total]) }
  /** VIGILANCE: targets detected over targets present, as a percentage. value ⌊detected · 100 / targets⌋. */
  static vigilance(detected: number, targets: number): CrossFormula { return c('attention-vigilance', 'vigilance(detected, targets) = ⌊detected · 100 / targets⌋', targets > 0 ? Math.floor((detected * 100) / targets) : 0, nat(detected, targets) && targets > 0 && detected <= targets, 'vigilance', [detected, targets]) }
  /** DISTRACTION: interruptions per hour. value ⌊interruptions / hours⌋. */
  static distraction(interruptions: number, hours: number): CrossFormula { return c('attention-distraction', 'distraction(interruptions, hours) = ⌊interruptions / hours⌋', hours > 0 ? Math.floor(interruptions / hours) : 0, nat(interruptions, hours) && hours > 0, 'distraction', [interruptions, hours]) }
  /** SPAN: the attention span in minutes. value minutes. */
  static span(minutes: number): CrossFormula { return c('attention-span', 'span(minutes) = minutes', minutes, nat(minutes), 'span', [minutes]) }
  /** SWITCHING: task switches per task. value ⌊switches / tasks⌋. */
  static switching(switches: number, tasks: number): CrossFormula { return c('attention-switching', 'switching(switches, tasks) = ⌊switches / tasks⌋', tasks > 0 ? Math.floor(switches / tasks) : 0, nat(switches, tasks) && tasks > 0, 'switching', [switches, tasks]) }
  /** SELECTIVE: relevant stimuli over all stimuli, as a percentage. value ⌊relevant · 100 / stimuli⌋. */
  static selective(relevant: number, stimuli: number): CrossFormula { return c('attention-selective', 'selective(relevant, stimuli) = ⌊relevant · 100 / stimuli⌋', stimuli > 0 ? Math.floor((relevant * 100) / stimuli) : 0, nat(relevant, stimuli) && stimuli > 0 && relevant <= stimuli, 'selective', [relevant, stimuli]) }
  /** SUSTAINED: effort maintained over effort required, as a percentage. value ⌊maintained · 100 / required⌋. */
  static sustained(maintained: number, required: number): CrossFormula { return c('attention-sustained', 'sustained(maintained, required) = ⌊maintained · 100 / required⌋', required > 0 ? Math.floor((maintained * 100) / required) : 0, nat(maintained, required) && required > 0, 'sustained', [maintained, required]) }
  /** WORKLOAD: cognitive demands over capacity, as a percentage. value ⌊demands · 100 / capacity⌋. */
  static workload(demands: number, capacity: number): CrossFormula { return c('attention-workload', 'workload(demands, capacity) = ⌊demands · 100 / capacity⌋', capacity > 0 ? Math.floor((demands * 100) / capacity) : 0, nat(demands, capacity) && capacity > 0, 'workload', [demands, capacity]) }
}

for (const name of ['distraction', 'focus', 'selective', 'span', 'sustained', 'switching', 'vigilance', 'workload'] as const)
  hexRegisterOf('attention', name, (AttentionFormulas[name] as (...x: unknown[]) => unknown).bind(AttentionFormulas))
