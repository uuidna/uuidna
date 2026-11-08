import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELEVATOR — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'elevator arithmetic (capacity, speed, floors, traveltime, waittime, dispatchcombos, accelrate, dutyload); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'elevator', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `elevator.${name}`, params })

export class ElevatorFormulas {
  static capacity(x: number, y: number): CrossFormula { return c('elevator-capacity', 'capacity(x, y) = x · y', x * y, nat(x, y), 'capacity', [x, y]) }
  static speed(x: number, y: number): CrossFormula { return c('elevator-speed', 'speed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'speed', [x, y]) }
  static floors(x: number, y: number): CrossFormula { return c('elevator-floors', 'floors(x, y) = x + y', x + y, nat(x, y), 'floors', [x, y]) }
  static traveltime(x: number, y: number): CrossFormula { return c('elevator-traveltime', 'traveltime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'traveltime', [x, y]) }
  static waittime(x: number, y: number): CrossFormula { return c('elevator-waittime', 'waittime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'waittime', [x, y]) }
  static dispatchcombos(x: number, y: number): CrossFormula { return c('elevator-dispatchcombos', 'dispatchcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'dispatchcombos', [x, y]) }
  static accelrate(x: number, y: number): CrossFormula { return c('elevator-accelrate', 'accelrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'accelrate', [x, y]) }
  static dutyload(x: number, y: number): CrossFormula { return c('elevator-dutyload', 'dutyload(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'dutyload', [x, y]) }
}

for (const name of ['accelrate', 'capacity', 'dispatchcombos', 'dutyload', 'floors', 'speed', 'traveltime', 'waittime'] as const)
  hexRegisterOf('elevator', name, (ElevatorFormulas[name] as (...x: unknown[]) => unknown).bind(ElevatorFormulas))
