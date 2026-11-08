import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PID — THE CONTROL LOOP, AS ARITHMETIC. A controller is numbers: the proportional, integral and derivative terms on the
 *  error, their sum as the output, the Ziegler–Nichols gains from the critical point, the integral gain from the reset
 *  time, the anti-windup clamp on the accumulated error, and the error from a setpoint. Crosses to `dynamics` — a PID loop
 *  is what drives a dynamical system toward its setpoint. A controller. */

const PROOF = 'pid arithmetic (proportional, integral, derivative terms, summed output, Ziegler–Nichols gains, reset-time tuning, anti-windup clamp, setpoint error); the control loop as integers; a controller crossed to dynamics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pid', dst: 'dynamics', formula, value, proof: PROOF, ...extra }, holds, { name: `pid.${name}`, params })

export class PidFormulas {
  /** PROPORTIONAL term: the proportional gain on the error. value kp · e. */
  static proportional(kp: number, e: number): CrossFormula { return c('pid-proportional', 'proportional(kp, e) = kp · e', kp * e, nat(kp, e), 'proportional', [kp, e]) }
  /** INTEGRAL term: the integral gain on the accumulated error. value ki · sumE. */
  static integral(ki: number, sumE: number): CrossFormula { return c('pid-integral', 'integral(ki, sumE) = ki · sumE', ki * sumE, nat(ki, sumE), 'integral', [ki, sumE]) }
  /** DERIVATIVE term: the derivative gain on the error change. value kd · dE. */
  static derivative(kd: number, dE: number): CrossFormula { return c('pid-derivative', 'derivative(kd, dE) = kd · dE', kd * dE, nat(kd, dE), 'derivative', [kd, dE]) }
  /** OUTPUT: the controller output, the sum of the three terms. value p + i + d. */
  static output(p: number, i: number, d: number): CrossFormula { return c('pid-output', 'output(p, i, d) = p + i + d', p + i + d, nat(p, i, d), 'output', [p, i, d]) }
  /** ZIEGLER–NICHOLS: the integral gain from the critical gain and period (Ki = 1.2·Ku / Tu). value ⌊6 · ku / (5 · tu)⌋. */
  static ziegler(ku: number, tu: number): CrossFormula { return c('pid-ziegler', 'ziegler(ku, tu) = ⌊6 · ku / (5 · tu)⌋', tu > 0 ? Math.floor((6 * ku) / (5 * tu)) : 0, nat(ku, tu) && tu > 0, 'ziegler', [ku, tu]) }
  /** TUNING: the integral gain from the proportional gain and the reset time. value ⌊kp / ti⌋. */
  static tuning(kp: number, ti: number): CrossFormula { return c('pid-tuning', 'tuning(kp, ti) = ⌊kp / ti⌋', ti > 0 ? Math.floor(kp / ti) : 0, nat(kp, ti) && ti > 0, 'tuning', [kp, ti]) }
  /** WINDUP: the anti-windup clamp on the accumulated error. value min(sumE, limit). */
  static windup(sumE: number, limit: number): CrossFormula { return c('pid-windup', 'windup(sumE, limit) = min(sumE, limit)', Math.min(sumE, limit), nat(sumE, limit), 'windup', [sumE, limit]) }
  /** SETPOINT: the error from the setpoint, clamped at zero. value max(0, target − measured). */
  static setpoint(target: number, measured: number): CrossFormula { return c('pid-setpoint', 'setpoint(target, measured) = max(0, target − measured)', Math.max(0, target - measured), nat(target, measured), 'setpoint', [target, measured]) }
}

for (const name of ['derivative', 'integral', 'output', 'proportional', 'setpoint', 'tuning', 'windup', 'ziegler'] as const)
  hexRegisterOf('pid', name, (PidFormulas[name] as (...x: unknown[]) => unknown).bind(PidFormulas))
