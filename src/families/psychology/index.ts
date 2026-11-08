import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PSYCHOLOGY — THE MIND AS ARITHMETIC (chosen by the registry, not by hand). Measuring behaviour is numbers: the
 *  intelligence quotient, a correlation as a percentage, test reliability, mean reaction time, conditioning strength,
 *  recall, arousal above baseline, and conformity to a group. Crosses to `sociology` — one mind among many. A measure. */

const PROOF = 'psychology arithmetic (iq, correlation, reliability, reaction time, conditioning, recall, arousal, conformity); a measure of the mind crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'psychology', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `psychology.${name}`, params })

export class PsychologyFormulas {
  /** THE INTELLIGENCE QUOTIENT: mental age over chronological age, as a percentage. value ⌊mental · 100 / chronological⌋. */
  static iq(mental: number, chronological: number): CrossFormula { return c('psychology-iq', 'iq(mental, chronological) = ⌊mental · 100 / chronological⌋', chronological > 0 ? Math.floor((mental * 100) / chronological) : 0, nat(mental, chronological) && chronological > 0, 'iq', [mental, chronological]) }
  /** CORRELATION as a percentage: agreements over the total. value ⌊agree · 100 / total⌋. */
  static correlation(agree: number, total: number): CrossFormula { return c('psychology-correlation', 'correlation(agree, total) = ⌊agree · 100 / total⌋', total > 0 ? Math.floor((agree * 100) / total) : 0, nat(agree, total) && total > 0 && agree <= total, 'correlation', [agree, total]) }
  /** RELIABILITY as a percentage: consistent results over the trials. value ⌊consistent · 100 / trials⌋. */
  static reliability(consistent: number, trials: number): CrossFormula { return c('psychology-reliability', 'reliability(consistent, trials) = ⌊consistent · 100 / trials⌋', trials > 0 ? Math.floor((consistent * 100) / trials) : 0, nat(consistent, trials) && trials > 0 && consistent <= trials, 'reliability', [consistent, trials]) }
  /** MEAN REACTION TIME: total milliseconds over the stimuli. value ⌊total / stimuli⌋. */
  static reaction(total: number, stimuli: number): CrossFormula { return c('psychology-reaction', 'reaction(total, stimuli) = ⌊total / stimuli⌋', stimuli > 0 ? Math.floor(total / stimuli) : 0, nat(total, stimuli) && stimuli > 0, 'reaction', [total, stimuli]) }
  /** CONDITIONING strength as a percentage: conditioned responses over the trials. value ⌊responses · 100 / trials⌋. */
  static conditioning(responses: number, trials: number): CrossFormula { return c('psychology-conditioning', 'conditioning(responses, trials) = ⌊responses · 100 / trials⌋', trials > 0 ? Math.floor((responses * 100) / trials) : 0, nat(responses, trials) && trials > 0 && responses <= trials, 'conditioning', [responses, trials]) }
  /** RECALL as a percentage: remembered items over the learned items. value ⌊remembered · 100 / learned⌋. */
  static recall(remembered: number, learned: number): CrossFormula { return c('psychology-recall', 'recall(remembered, learned) = ⌊remembered · 100 / learned⌋', learned > 0 ? Math.floor((remembered * 100) / learned) : 0, nat(remembered, learned) && learned > 0 && remembered <= learned, 'recall', [remembered, learned]) }
  /** AROUSAL above baseline: stimulation less the baseline, not below zero. value max(0, stimulation − baseline). */
  static arousal(stimulation: number, baseline: number): CrossFormula { return c('psychology-arousal', 'arousal(stimulation, baseline) = max(0, stimulation − baseline)', Math.max(0, stimulation - baseline), nat(stimulation, baseline), 'arousal', [stimulation, baseline]) }
  /** CONFORMITY as a percentage: those who conformed over the group. value ⌊conformed · 100 / group⌋. */
  static conformity(conformed: number, group: number): CrossFormula { return c('psychology-conformity', 'conformity(conformed, group) = ⌊conformed · 100 / group⌋', group > 0 ? Math.floor((conformed * 100) / group) : 0, nat(conformed, group) && group > 0 && conformed <= group, 'conformity', [conformed, group]) }
}

for (const name of ['arousal', 'conditioning', 'conformity', 'correlation', 'iq', 'reaction', 'recall', 'reliability'] as const)
  hexRegisterOf('psychology', name, (PsychologyFormulas[name] as (...x: unknown[]) => unknown).bind(PsychologyFormulas))
