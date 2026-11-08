import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FEEDBACK — CLOSED-LOOP CONTROL, AS ARITHMETIC. A feedback loop is numbers: the closed-loop gain a loop settles to,
 *  the loop transfer (open-loop gain around the ring), the error between reference and output, how much the loop suppresses
 *  disturbance (sensitivity), the damping of the response, its overshoot, how long it takes to settle, and the residual
 *  steady-state error. Crosses to `control` — feedback is the mechanism control applies. A measure. */

const PROOF = 'feedback arithmetic (closed-loop gain, loop transfer, error signal, sensitivity, damping, overshoot, settling time, steady-state error); closed-loop control reduced to integers; a measure crossed to control'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'feedback', dst: 'control', formula, value, proof: PROOF, ...extra }, holds, { name: `feedback.${name}`, params })

export class FeedbackFormulas {
  /** CLOSED-LOOP GAIN: the gain a loop settles to under unity-scaled negative feedback. value ⌊forward / (1 + loop)⌋. */
  static closedloopgain(forward: number, loop: number): CrossFormula { return c('feedback-closedloopgain', 'closedloopgain(forward, loop) = ⌊forward / (1 + loop)⌋', (1 + loop) > 0 ? Math.floor(forward / (1 + loop)) : 0, nat(forward, loop), 'closedloopgain', [forward, loop]) }
  /** DAMPING RATIO (percent): the actual damping against critical, scaled by 100. value ⌊actual · 100 / critical⌋. */
  static dampingratio(actual: number, critical: number): CrossFormula { return c('feedback-dampingratio', 'dampingratio(actual, critical) = ⌊actual · 100 / critical⌋', critical > 0 ? Math.floor((actual * 100) / critical) : 0, nat(actual, critical) && critical > 0, 'dampingratio', [actual, critical]) }
  /** ERROR SIGNAL: the difference the loop must drive to zero. value max(0, reference − output). */
  static errorsignal(reference: number, output: number): CrossFormula { return c('feedback-errorsignal', 'errorsignal(reference, output) = max(0, reference − output)', Math.max(0, reference - output), nat(reference, output), 'errorsignal', [reference, output]) }
  /** LOOP TRANSFER: the open-loop gain around the ring. value forward · feedback. */
  static looptransfer(forward: number, feedback: number): CrossFormula { return c('feedback-looptransfer', 'looptransfer(forward, feedback) = forward · feedback', forward * feedback, nat(forward, feedback), 'looptransfer', [forward, feedback]) }
  /** OVERSHOOT (percent): how far the peak exceeds the steady value. value ⌊max(0, peak − steady) · 100 / steady⌋. */
  static overshoot(peak: number, steady: number): CrossFormula { return c('feedback-overshoot', 'overshoot(peak, steady) = ⌊max(0, peak − steady) · 100 / steady⌋', steady > 0 ? Math.floor((Math.max(0, peak - steady) * 100) / steady) : 0, nat(peak, steady) && steady > 0, 'overshoot', [peak, steady]) }
  /** SENSITIVITY (percent): disturbance left unsuppressed, scaled by 100. value ⌊100 / (1 + loop)⌋. */
  static sensitivity(loop: number): CrossFormula { return c('feedback-sensitivity', 'sensitivity(loop) = ⌊100 / (1 + loop)⌋', (1 + loop) > 0 ? Math.floor(100 / (1 + loop)) : 0, nat(loop), 'sensitivity', [loop]) }
  /** SETTLING TIME: time constants to settle, as bands of the constant. value constant · bands. */
  static settlingtime(constant: number, bands: number): CrossFormula { return c('feedback-settlingtime', 'settlingtime(constant, bands) = constant · bands', constant * bands, nat(constant, bands), 'settlingtime', [constant, bands]) }
  /** STEADY-STATE ERROR: residual error under the loop gain. value ⌊reference / (1 + loop)⌋. */
  static steadystateerror(reference: number, loop: number): CrossFormula { return c('feedback-steadystateerror', 'steadystateerror(reference, loop) = ⌊reference / (1 + loop)⌋', (1 + loop) > 0 ? Math.floor(reference / (1 + loop)) : 0, nat(reference, loop), 'steadystateerror', [reference, loop]) }
}

for (const name of ['closedloopgain', 'dampingratio', 'errorsignal', 'looptransfer', 'overshoot', 'sensitivity', 'settlingtime', 'steadystateerror'] as const)
  hexRegisterOf('feedback', name, (FeedbackFormulas[name] as (...x: unknown[]) => unknown).bind(FeedbackFormulas))
