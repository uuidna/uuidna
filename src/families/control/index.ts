import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONTROL — A FEEDBACK LOOP, AS ARITHMETIC (the controller the registry leaves to dynamics). Holding a system to a setpoint
 *  is numbers: the steady error, how long it settles, how far it overshoots, where it ends up, how fast it rises, how damped
 *  it is, the gain margin, and the loop bandwidth. Crosses to `dynamics` — control is what shapes a dynamical response. A measure. */

const PROOF = 'control arithmetic (steady error, settling time, overshoot, steady state, rise time, damping, gain margin, bandwidth); the controller the registry leaves to dynamics; a measure crossed to dynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'control', dst: 'dynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `control.${name}`, params })

export class ControlFormulas {
  /** STEADY ERROR: how far the measurement sits from the setpoint. value max(0, setpoint − measured). */
  static error(setpoint: number, measured: number): CrossFormula { return c('control-error', 'error(setpoint, measured) = max(0, setpoint − measured)', Math.max(0, setpoint - measured), nat(setpoint, measured), 'error', [setpoint, measured]) }
  /** SETTLING TIME: time constants to settle, at a constant each. value tau · bands. */
  static settlingtime(tau: number, bands: number): CrossFormula { return c('control-settlingtime', 'settlingtime(tau, bands) = tau · bands', tau * bands, nat(tau, bands), 'settlingtime', [tau, bands]) }
  /** OVERSHOOT as a percentage over the final value. value ⌊max(0, peak − final) · 100 / final⌋. */
  static overshoot(peak: number, final: number): CrossFormula { return c('control-overshoot', 'overshoot(peak, final) = ⌊max(0, peak − final) · 100 / final⌋', final > 0 ? Math.floor((Math.max(0, peak - final) * 100) / final) : 0, nat(peak, final) && final > 0, 'overshoot', [peak, final]) }
  /** STEADY STATE: the final value of a step, gain times input. value gain · input. */
  static steadystate(gain: number, input: number): CrossFormula { return c('control-steadystate', 'steadystate(gain, input) = gain · input', gain * input, nat(gain, input), 'steadystate', [gain, input]) }
  /** RISE TIME: the travel over the slope that covers it. value ⌊span / rate⌋. */
  static risetime(span: number, rate: number): CrossFormula { return c('control-risetime', 'risetime(span, rate) = ⌊span / rate⌋', rate > 0 ? Math.floor(span / rate) : 0, nat(span, rate) && rate > 0, 'risetime', [span, rate]) }
  /** DAMPING RATIO as a percentage of critical damping. value ⌊actual · 100 / critical⌋. */
  static damping(actual: number, critical: number): CrossFormula { return c('control-damping', 'damping(actual, critical) = ⌊actual · 100 / critical⌋', critical > 0 ? Math.floor((actual * 100) / critical) : 0, nat(actual, critical) && critical > 0, 'damping', [actual, critical]) }
  /** GAIN MARGIN: how many times the gain can rise before the critical gain. value ⌊critical / operating⌋. */
  static gainmargin(critical: number, operating: number): CrossFormula { return c('control-gainmargin', 'gainmargin(critical, operating) = ⌊critical / operating⌋', operating > 0 ? Math.floor(critical / operating) : 0, nat(critical, operating) && operating > 0, 'gainmargin', [critical, operating]) }
  /** BANDWIDTH: the natural frequency scaled by the loop factor. value wn · factor. */
  static bandwidth(wn: number, factor: number): CrossFormula { return c('control-bandwidth', 'bandwidth(wn, factor) = wn · factor', wn * factor, nat(wn, factor), 'bandwidth', [wn, factor]) }
}

for (const name of ['bandwidth', 'damping', 'error', 'gainmargin', 'overshoot', 'risetime', 'settlingtime', 'steadystate'] as const)
  hexRegisterOf('control', name, (ControlFormulas[name] as (...x: unknown[]) => unknown).bind(ControlFormulas))
