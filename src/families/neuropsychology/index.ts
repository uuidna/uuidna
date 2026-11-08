import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NEUROPSYCHOLOGY — THE MIND MEASURED, AS ARITHMETIC. The clinic's scores are numbers: the intelligence quotient from
 *  mental and chronological age, the memory quotient against expectation, hemispheric lateralization, the deficit from a
 *  baseline, recovery after injury, working-memory span, processing speed, and executive function net of errors. Crosses
 *  to `neurology` — neuropsychology is the behaviour the brain's wiring produces. A measure. */

const PROOF = 'neuropsychology arithmetic (iq, memory quotient, lateralization, deficit, recovery, span, processing speed, executive function); the mind scored from counts and ages; a measure crossed to neurology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'neuropsychology', dst: 'neurology', formula, value, proof: PROOF, ...extra }, holds, { name: `neuropsychology.${name}`, params })

export class NeuropsychologyFormulas {
  /** THE INTELLIGENCE QUOTIENT: mental age over chronological age, scaled by 100. value ⌊mental · 100 / chrono⌋. */
  static iq(mental: number, chrono: number): CrossFormula { return c('neuropsychology-iq', 'iq(mental, chrono) = ⌊mental · 100 / chrono⌋', chrono > 0 ? Math.floor((mental * 100) / chrono) : 0, nat(mental, chrono) && chrono > 0, 'iq', [mental, chrono]) }
  /** MEMORY QUOTIENT: the raw score against what was expected, scaled by 100. value ⌊raw · 100 / expected⌋. */
  static memoryquotient(raw: number, expected: number): CrossFormula { return c('neuropsychology-memoryquotient', 'memoryquotient(raw, expected) = ⌊raw · 100 / expected⌋', expected > 0 ? Math.floor((raw * 100) / expected) : 0, nat(raw, expected) && expected > 0, 'memoryquotient', [raw, expected]) }
  /** LATERALIZATION: the right–left difference over the total, scaled by 100. value ⌊(right − left) · 100 / (right + left)⌋. */
  static lateralization(right: number, left: number): CrossFormula { return c('neuropsychology-lateralization', 'lateralization(right, left) = ⌊max(0, right − left) · 100 / (right + left)⌋', (right + left) > 0 ? Math.floor((Math.max(0, right - left) * 100) / (right + left)) : 0, nat(right, left) && (right + left) > 0, 'lateralization', [right, left]) }
  /** DEFICIT: the points lost from a baseline. value max(0, baseline − current). */
  static deficit(baseline: number, current: number): CrossFormula { return c('neuropsychology-deficit', 'deficit(baseline, current) = max(0, baseline − current)', Math.max(0, baseline - current), nat(baseline, current), 'deficit', [baseline, current]) }
  /** RECOVERY: how much was regained of what was lost, scaled by 100. value ⌊regained · 100 / lost⌋. */
  static recovery(regained: number, lost: number): CrossFormula { return c('neuropsychology-recovery', 'recovery(regained, lost) = ⌊regained · 100 / lost⌋', lost > 0 ? Math.floor((regained * 100) / lost) : 0, nat(regained, lost) && lost > 0, 'recovery', [regained, lost]) }
  /** SPAN: the average working-memory span over the trials. value ⌊items / trials⌋. */
  static span(items: number, trials: number): CrossFormula { return c('neuropsychology-span', 'span(items, trials) = ⌊items / trials⌋', trials > 0 ? Math.floor(items / trials) : 0, nat(items, trials) && trials > 0, 'span', [items, trials]) }
  /** PROCESSING SPEED: items per minute. value ⌊items · 60 / seconds⌋. */
  static processingspeed(items: number, seconds: number): CrossFormula { return c('neuropsychology-processingspeed', 'processingspeed(items, seconds) = ⌊items · 60 / seconds⌋', seconds > 0 ? Math.floor((items * 60) / seconds) : 0, nat(items, seconds) && seconds > 0, 'processingspeed', [items, seconds]) }
  /** EXECUTIVE FUNCTION: correct responses net of errors. value max(0, correct − errors). */
  static executivefunction(correct: number, errors: number): CrossFormula { return c('neuropsychology-executivefunction', 'executivefunction(correct, errors) = max(0, correct − errors)', Math.max(0, correct - errors), nat(correct, errors), 'executivefunction', [correct, errors]) }
}

for (const name of ['deficit', 'executivefunction', 'iq', 'lateralization', 'memoryquotient', 'processingspeed', 'recovery', 'span'] as const)
  hexRegisterOf('neuropsychology', name, (NeuropsychologyFormulas[name] as (...x: unknown[]) => unknown).bind(NeuropsychologyFormulas))
