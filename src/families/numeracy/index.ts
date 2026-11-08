import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NUMERACY — EARLY-NUMBER LEARNING, AS ARITHMETIC (chosen by the curriculum registry, not by hand). Learning number is
 *  numbers: problems solved, accuracy, fact fluency, place value, operation speed, error rate, mastery, and the growth
 *  from a start to an end. Crosses to `pedagogy` — numeracy is what pedagogy teaches. A measure. */

const PROOF = 'numeracy arithmetic (problems solved, accuracy, fact fluency, place value, operation speed, error rate, mastery, growth); the curriculum registry\'s uncovered domain; a measure crossed to pedagogy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'numeracy', dst: 'pedagogy', formula, value, proof: PROOF, ...extra }, holds, { name: `numeracy.${name}`, params })

export class NumeracyFormulas {
  /** PROBLEMS SOLVED: problems per session over the sessions worked. value sessions · perSession. */
  static problemsolved(sessions: number, perSession: number): CrossFormula { return c('numeracy-problemsolved', 'problemsolved(sessions, perSession) = sessions · perSession', sessions * perSession, nat(sessions, perSession), 'problemsolved', [sessions, perSession]) }
  /** ACCURACY as a percentage. value ⌊correct · 100 / total⌋. */
  static accuracy(correct: number, total: number): CrossFormula { return c('numeracy-accuracy', 'accuracy(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'accuracy', [correct, total]) }
  /** FACT FLUENCY: facts recalled per minute. value ⌊facts · 60 / seconds⌋. */
  static factfluency(facts: number, seconds: number): CrossFormula { return c('numeracy-factfluency', 'factfluency(facts, seconds) = ⌊facts · 60 / seconds⌋', seconds > 0 ? Math.floor((facts * 60) / seconds) : 0, nat(facts, seconds) && seconds > 0, 'factfluency', [facts, seconds]) }
  /** PLACE VALUE: a digit worth its place. value digit · place. */
  static placevalue(digit: number, place: number): CrossFormula { return c('numeracy-placevalue', 'placevalue(digit, place) = digit · place', digit * place, nat(digit, place) && digit <= 9, 'placevalue', [digit, place]) }
  /** OPERATION SPEED: operations over minutes. value ⌊operations / minutes⌋. */
  static operationspeed(operations: number, minutes: number): CrossFormula { return c('numeracy-operationspeed', 'operationspeed(operations, minutes) = ⌊operations / minutes⌋', minutes > 0 ? Math.floor(operations / minutes) : 0, nat(operations, minutes) && minutes > 0, 'operationspeed', [operations, minutes]) }
  /** ERROR RATE as a percentage. value ⌊errors · 100 / total⌋. */
  static errorrate(errors: number, total: number): CrossFormula { return c('numeracy-errorrate', 'errorrate(errors, total) = ⌊errors · 100 / total⌋', total > 0 ? Math.floor((errors * 100) / total) : 0, nat(errors, total) && total > 0 && errors <= total, 'errorrate', [errors, total]) }
  /** MASTERY: goals mastered as a percentage. value ⌊mastered · 100 / goals⌋. */
  static masterypercent(mastered: number, goals: number): CrossFormula { return c('numeracy-masterypercent', 'masterypercent(mastered, goals) = ⌊mastered · 100 / goals⌋', goals > 0 ? Math.floor((mastered * 100) / goals) : 0, nat(mastered, goals) && goals > 0 && mastered <= goals, 'masterypercent', [mastered, goals]) }
  /** GROWTH: the gain from a start score to an end score. value max(0, end − start). */
  static growth(end: number, start: number): CrossFormula { return c('numeracy-growth', 'growth(end, start) = max(0, end − start)', Math.max(0, end - start), nat(end, start), 'growth', [end, start]) }
}

for (const name of ['accuracy', 'errorrate', 'factfluency', 'growth', 'masterypercent', 'operationspeed', 'placevalue', 'problemsolved'] as const)
  hexRegisterOf('numeracy', name, (NumeracyFormulas[name] as (...x: unknown[]) => unknown).bind(NumeracyFormulas))
