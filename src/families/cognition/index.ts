import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COGNITION — THE MIND AS ARITHMETIC. Thinking is numbers: cognitive load against capacity, mean reaction time, accuracy,
 *  memory span, verbal fluency, decision bias, working-memory chunks, and processing speed. Crosses to `psychology` —
 *  cognition is what psychology measures. A measure. */

const PROOF = 'cognition arithmetic (cognitive load, reaction time, accuracy, memory span, fluency, bias, working memory, processing speed); the mind as a measure crossed to psychology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cognition', dst: 'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `cognition.${name}`, params })

export class CognitionFormulas {
  /** COGNITIVE LOAD: elements held as a percentage of capacity. value ⌊elements · 100 / capacity⌋. */
  static load(elements: number, capacity: number): CrossFormula { return c('cognition-load', 'load(elements, capacity) = ⌊elements · 100 / capacity⌋', capacity > 0 ? Math.floor((elements * 100) / capacity) : 0, nat(elements, capacity) && capacity > 0, 'load', [elements, capacity]) }
  /** REACTION TIME: total milliseconds over the trials. value ⌊total / trials⌋. */
  static reaction(total: number, trials: number): CrossFormula { return c('cognition-reaction', 'reaction(total, trials) = ⌊total / trials⌋', trials > 0 ? Math.floor(total / trials) : 0, nat(total, trials) && trials > 0, 'reaction', [total, trials]) }
  /** ACCURACY as a percentage. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('cognition-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** MEMORY SPAN: items recalled as a percentage of those presented. value ⌊recalled · 100 / presented⌋. */
  static span(recalled: number, presented: number): CrossFormula { return c('cognition-span', 'span(recalled, presented) = ⌊recalled · 100 / presented⌋', presented > 0 ? Math.floor((recalled * 100) / presented) : 0, nat(recalled, presented) && presented > 0 && recalled <= presented, 'span', [recalled, presented]) }
  /** VERBAL FLUENCY: items produced per minute. value ⌊produced / minutes⌋. */
  static fluency(produced: number, minutes: number): CrossFormula { return c('cognition-fluency', 'fluency(produced, minutes) = ⌊produced / minutes⌋', minutes > 0 ? Math.floor(produced / minutes) : 0, nat(produced, minutes) && minutes > 0, 'fluency', [produced, minutes]) }
  /** DECISION BIAS: skewed decisions as a percentage of all. value ⌊skewed · 100 / decisions⌋. */
  static bias(skewed: number, decisions: number): CrossFormula { return c('cognition-bias', 'bias(skewed, decisions) = ⌊skewed · 100 / decisions⌋', decisions > 0 ? Math.floor((skewed * 100) / decisions) : 0, nat(skewed, decisions) && decisions > 0 && skewed <= decisions, 'bias', [skewed, decisions]) }
  /** WORKING MEMORY: the chunks held. value chunks. */
  static workingmemory(chunks: number): CrossFormula { return c('cognition-workingmemory', 'workingmemory(chunks) = chunks', chunks, nat(chunks), 'workingmemory', [chunks]) }
  /** PROCESSING SPEED: operations over seconds. value ⌊operations / seconds⌋. */
  static processing(operations: number, seconds: number): CrossFormula { return c('cognition-processing', 'processing(operations, seconds) = ⌊operations / seconds⌋', seconds > 0 ? Math.floor(operations / seconds) : 0, nat(operations, seconds) && seconds > 0, 'processing', [operations, seconds]) }
}

for (const name of ['accuracy', 'bias', 'fluency', 'load', 'processing', 'reaction', 'span', 'workingmemory'] as const)
  hexRegisterOf('cognition', name, (CognitionFormulas[name] as (...x: unknown[]) => unknown).bind(CognitionFormulas))
