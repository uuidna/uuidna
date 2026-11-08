import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REASONING — DRAWING CONCLUSIONS, AS ARITHMETIC. Thinking is numbers: the steps an inference takes, how often it lands
 *  correct, whether a deduction is valid, the share that is biased, the load it puts on working memory, how long a response
 *  takes, the score on a syllogism, and how far confidence sits from accuracy. Crosses to `cognition` — reasoning is the act
 *  cognition performs. A measure. */

const PROOF = 'reasoning arithmetic (inference steps, accuracy, deduction validity, bias rate, working-memory load, response latency, syllogism score, confidence calibration); drawing conclusions as a measure crossed to cognition'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'reasoning', dst: 'cognition', formula, value, proof: PROOF, ...extra }, holds, { name: `reasoning.${name}`, params })

export class ReasoningFormulas {
  /** INFERENCE STEPS: premises expanded by the rules that fire on each. value premises · rules. */
  static inferencesteps(premises: number, rules: number): CrossFormula { return c('reasoning-inferencesteps', 'inferencesteps(premises, rules) = premises · rules', premises * rules, nat(premises, rules), 'inferencesteps', [premises, rules]) }
  /** ACCURACY as a percentage. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('reasoning-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** DEDUCTION VALIDITY: 1 when the conclusion asserts no more than the premises support. value [conclusion ≤ premises]. */
  static deductionvalidity(premises: number, conclusion: number): CrossFormula { return c('reasoning-deductionvalidity', 'deductionvalidity(premises, conclusion) = [conclusion ≤ premises]', conclusion <= premises ? 1 : 0, nat(premises, conclusion), 'deductionvalidity', [premises, conclusion]) }
  /** BIAS RATE as a percentage of judgements that are biased. value ⌊biased · 100 / total⌋. */
  static biasrate(biased: number, total: number): CrossFormula { return c('reasoning-biasrate', 'biasrate(biased, total) = ⌊biased · 100 / total⌋', total > 0 ? Math.floor((biased * 100) / total) : 0, nat(biased, total) && total > 0 && biased <= total, 'biasrate', [biased, total]) }
  /** WORKING-MEMORY LOAD: items held at a size each. value items · size. */
  static workingmemoryload(items: number, size: number): CrossFormula { return c('reasoning-workingmemoryload', 'workingmemoryload(items, size) = items · size', items * size, nat(items, size), 'workingmemoryload', [items, size]) }
  /** RESPONSE LATENCY: total milliseconds over the responses given. value ⌊total / responses⌋. */
  static responselatency(total: number, responses: number): CrossFormula { return c('reasoning-responselatency', 'responselatency(total, responses) = ⌊total / responses⌋', responses > 0 ? Math.floor(total / responses) : 0, nat(total, responses) && responses > 0, 'responselatency', [total, responses]) }
  /** SYLLOGISM SCORE: correct syllogisms at points each. value correct · points. */
  static syllogismscore(correct: number, points: number): CrossFormula { return c('reasoning-syllogismscore', 'syllogismscore(correct, points) = correct · points', correct * points, nat(correct, points), 'syllogismscore', [correct, points]) }
  /** CONFIDENCE CALIBRATION: how far confidence runs ahead of accuracy. value max(0, confidence − accuracy). */
  static confidencecalibration(confidence: number, accuracy: number): CrossFormula { return c('reasoning-confidencecalibration', 'confidencecalibration(confidence, accuracy) = max(0, confidence − accuracy)', Math.max(0, confidence - accuracy), nat(confidence, accuracy) && confidence <= 100 && accuracy <= 100, 'confidencecalibration', [confidence, accuracy]) }
}

for (const name of ['accuracy', 'biasrate', 'confidencecalibration', 'deductionvalidity', 'inferencesteps', 'responselatency', 'syllogismscore', 'workingmemoryload'] as const)
  hexRegisterOf('reasoning', name, (ReasoningFormulas[name] as (...x: unknown[]) => unknown).bind(ReasoningFormulas))
