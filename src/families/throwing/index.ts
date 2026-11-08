import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THROWING — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'throwing arithmetic (range, releasevelocity, flighttime, spin, momentum, peakheight, effortratio, distancegain); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'throwing', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `throwing.${name}`, params })

export class ThrowingFormulas {
  static range(x: number, y: number): CrossFormula { return c('throwing-range', 'range(x, y) = x · y', x * y, nat(x, y), 'range', [x, y]) }
  static releasevelocity(x: number, y: number): CrossFormula { return c('throwing-releasevelocity', 'releasevelocity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'releasevelocity', [x, y]) }
  static flighttime(x: number, y: number): CrossFormula { return c('throwing-flighttime', 'flighttime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'flighttime', [x, y]) }
  static spin(x: number, y: number): CrossFormula { return c('throwing-spin', 'spin(x, y) = x · y', x * y, nat(x, y), 'spin', [x, y]) }
  static momentum(x: number, y: number): CrossFormula { return c('throwing-momentum', 'momentum(x, y) = x · y', x * y, nat(x, y), 'momentum', [x, y]) }
  static peakheight(x: number, y: number): CrossFormula { return c('throwing-peakheight', 'peakheight(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'peakheight', [x, y]) }
  static effortratio(x: number, y: number): CrossFormula { return c('throwing-effortratio', 'effortratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'effortratio', [x, y]) }
  static distancegain(x: number, y: number): CrossFormula { return c('throwing-distancegain', 'distancegain(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'distancegain', [x, y]) }
}

for (const name of ['distancegain', 'effortratio', 'flighttime', 'momentum', 'peakheight', 'range', 'releasevelocity', 'spin'] as const)
  hexRegisterOf('throwing', name, (ThrowingFormulas[name] as (...x: unknown[]) => unknown).bind(ThrowingFormulas))
