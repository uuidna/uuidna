import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TURBINE — SPINNING MASS AS ARITHMETIC (chosen by the hardware registry, not by hand). A turbine is numbers: the power a
 *  flow at a head delivers, synchronous rpm from line frequency and poles, torque from power and speed, efficiency, the
 *  capacity factor, the swept area of the blades, blade tip speed, and the energy output over hours. Crosses to `energy` —
 *  a turbine is what energy flows through. A measure. */

const PROOF = 'turbine arithmetic (shaft power, synchronous rpm, torque, efficiency, capacity factor, swept area, tip speed, energy output); a hardware domain; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'turbine', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `turbine.${name}`, params })

export class TurbineFormulas {
  /** SHAFT POWER: a flow at a head. value flow · head. */
  static power(flow: number, head: number): CrossFormula { return c('turbine-power', 'power(flow, head) = flow · head', flow * head, nat(flow, head), 'power', [flow, head]) }
  /** SYNCHRONOUS RPM from line frequency and pole count. value ⌊freq · 120 / poles⌋. */
  static rpm(freq: number, poles: number): CrossFormula { return c('turbine-rpm', 'rpm(freq, poles) = ⌊freq · 120 / poles⌋', poles > 0 ? Math.floor((freq * 120) / poles) : 0, nat(freq, poles) && poles > 0, 'rpm', [freq, poles]) }
  /** TORQUE: shaft power over angular speed. value ⌊power / speed⌋. */
  static torque(power: number, speed: number): CrossFormula { return c('turbine-torque', 'torque(power, speed) = ⌊power / speed⌋', speed > 0 ? Math.floor(power / speed) : 0, nat(power, speed) && speed > 0, 'torque', [power, speed]) }
  /** EFFICIENCY as a percentage of input delivered. value ⌊out · 100 / in⌋. */
  static efficiency(out: number, inp: number): CrossFormula { return c('turbine-efficiency', 'efficiency(out, in) = ⌊out · 100 / in⌋', inp > 0 ? Math.floor((out * 100) / inp) : 0, nat(out, inp) && inp > 0 && out <= inp, 'efficiency', [out, inp]) }
  /** CAPACITY FACTOR: actual output against rated, as a percentage. value ⌊actual · 100 / rated⌋. */
  static capacity(actual: number, rated: number): CrossFormula { return c('turbine-capacity', 'capacity(actual, rated) = ⌊actual · 100 / rated⌋', rated > 0 ? Math.floor((actual * 100) / rated) : 0, nat(actual, rated) && rated > 0 && actual <= rated, 'capacity', [actual, rated]) }
  /** SWEPT AREA of the blades at a radius (π ≈ 314/100). value ⌊radius · radius · 314 / 100⌋. */
  static sweep(radius: number): CrossFormula { return c('turbine-sweep', 'sweep(radius) = ⌊radius · radius · 314 / 100⌋', Math.floor((radius * radius * 314) / 100), nat(radius), 'sweep', [radius]) }
  /** BLADE TIP SPEED from rpm and radius (2π ≈ 628/100, per 60 s). value ⌊rpm · radius · 628 / 6000⌋. */
  static tipspeed(rpm: number, radius: number): CrossFormula { return c('turbine-tipspeed', 'tipspeed(rpm, radius) = ⌊rpm · radius · 628 / 6000⌋', Math.floor((rpm * radius * 628) / 6000), nat(rpm, radius), 'tipspeed', [rpm, radius]) }
  /** ENERGY OUTPUT: power over hours at an availability percentage. value ⌊power · hours · avail / 100⌋. */
  static output(power: number, hours: number, avail: number): CrossFormula { return c('turbine-output', 'output(power, hours, avail) = ⌊power · hours · avail / 100⌋', Math.floor((power * hours * avail) / 100), nat(power, hours, avail) && avail <= 100, 'output', [power, hours, avail]) }
}

for (const name of ['capacity', 'efficiency', 'output', 'power', 'rpm', 'sweep', 'tipspeed', 'torque'] as const)
  hexRegisterOf('turbine', name, (TurbineFormulas[name] as (...x: unknown[]) => unknown).bind(TurbineFormulas))
