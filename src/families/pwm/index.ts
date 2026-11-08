import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PWM — scaffolded integer measures crossed to electronics. Every output an exact finite nonnegative integer. */

const PROOF = 'pwm arithmetic (dutycycle, averagevoltage, period, resolution, onpulse, frequency, ripple, effectivepower); scaffolded from the integer-op palette; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pwm', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `pwm.${name}`, params })

export class PwmFormulas {
  static dutycycle(x: number, y: number): CrossFormula { return c('pwm-dutycycle', 'dutycycle(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'dutycycle', [x, y]) }
  static averagevoltage(x: number, y: number): CrossFormula { return c('pwm-averagevoltage', 'averagevoltage(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'averagevoltage', [x, y]) }
  static period(x: number, y: number): CrossFormula { return c('pwm-period', 'period(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'period', [x, y]) }
  static resolution(x: number, y: number): CrossFormula { return c('pwm-resolution', 'resolution(x, y) = x · y', x * y, nat(x, y), 'resolution', [x, y]) }
  static onpulse(x: number, y: number): CrossFormula { return c('pwm-onpulse', 'onpulse(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'onpulse', [x, y]) }
  static frequency(x: number, y: number): CrossFormula { return c('pwm-frequency', 'frequency(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frequency', [x, y]) }
  static ripple(x: number, y: number): CrossFormula { return c('pwm-ripple', 'ripple(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ripple', [x, y]) }
  static effectivepower(x: number, y: number): CrossFormula { return c('pwm-effectivepower', 'effectivepower(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'effectivepower', [x, y]) }
}

for (const name of ['averagevoltage', 'dutycycle', 'effectivepower', 'frequency', 'onpulse', 'period', 'resolution', 'ripple'] as const)
  hexRegisterOf('pwm', name, (PwmFormulas[name] as (...x: unknown[]) => unknown).bind(PwmFormulas))
