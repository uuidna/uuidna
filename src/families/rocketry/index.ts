import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ROCKETRY — LAUNCH VEHICLES AS ARITHMETIC (chosen by the public-API registry, not by hand). Getting mass to orbit is
 *  numbers: thrust from mass flow, total impulse over a burn, thrust-to-weight, the Tsiolkovsky delta-v proxy, the wet/dry
 *  mass ratio, specific impulse, the payload fraction, and the stage count. Crosses to `aerospace` — rocketry is the thrust
 *  aerospace flies on. A measure. */

const PROOF = 'rocketry arithmetic (thrust, impulse, thrust-to-weight, delta-v, mass ratio, specific impulse, payload fraction, staging); a registry domain; a measure crossed to aerospace'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rocketry', dst: 'aerospace', formula, value, proof: PROOF, ...extra }, holds, { name: `rocketry.${name}`, params })

export class RocketryFormulas {
  /** THRUST: mass flow at an exhaust velocity. value massflow · velocity. */
  static thrust(massflow: number, velocity: number): CrossFormula { return c('rocketry-thrust', 'thrust(massflow, velocity) = massflow · velocity', massflow * velocity, nat(massflow, velocity), 'thrust', [massflow, velocity]) }
  /** TOTAL IMPULSE: thrust over a burn time. value thrust · burntime. */
  static impulse(thrust_: number, burntime: number): CrossFormula { return c('rocketry-impulse', 'impulse(thrust, burntime) = thrust · burntime', thrust_ * burntime, nat(thrust_, burntime), 'impulse', [thrust_, burntime]) }
  /** THRUST-TO-WEIGHT (×100). value ⌊thrust · 100 / weight⌋. */
  static twr(thrust_: number, weight: number): CrossFormula { return c('rocketry-twr', 'twr(thrust, weight) = ⌊thrust · 100 / weight⌋', weight > 0 ? Math.floor((thrust_ * 100) / weight) : 0, nat(thrust_, weight) && weight > 0, 'twr', [thrust_, weight]) }
  /** DELTA-V: the Tsiolkovsky proxy, exhaust velocity times the log-ratio. value exhaust · ratio. */
  static deltav(exhaust: number, ratio: number): CrossFormula { return c('rocketry-deltav', 'deltav(exhaust, ratio) = exhaust · ratio', exhaust * ratio, nat(exhaust, ratio), 'deltav', [exhaust, ratio]) }
  /** MASS RATIO: wet over dry (×100). value ⌊wet · 100 / dry⌋. */
  static massratio(wet: number, dry: number): CrossFormula { return c('rocketry-massratio', 'massratio(wet, dry) = ⌊wet · 100 / dry⌋', dry > 0 ? Math.floor((wet * 100) / dry) : 0, nat(wet, dry) && dry > 0, 'massratio', [wet, dry]) }
  /** SPECIFIC IMPULSE proxy: thrust over mass flow. value ⌊thrust / flow⌋. */
  static isp(thrust_: number, flow: number): CrossFormula { return c('rocketry-isp', 'isp(thrust, flow) = ⌊thrust / flow⌋', flow > 0 ? Math.floor(thrust_ / flow) : 0, nat(thrust_, flow) && flow > 0, 'isp', [thrust_, flow]) }
  /** PAYLOAD FRACTION (×100). value ⌊mass · 100 / total⌋. */
  static payload(mass: number, total: number): CrossFormula { return c('rocketry-payload', 'payload(mass, total) = ⌊mass · 100 / total⌋', total > 0 ? Math.floor((mass * 100) / total) : 0, nat(mass, total) && total > 0 && mass <= total, 'payload', [mass, total]) }
  /** STAGING: the stage count. value stages. */
  static staging(stages: number): CrossFormula { return c('rocketry-staging', 'staging(stages) = stages', stages, nat(stages), 'staging', [stages]) }
}

for (const name of ['deltav', 'impulse', 'isp', 'massratio', 'payload', 'staging', 'thrust', 'twr'] as const)
  hexRegisterOf('rocketry', name, (RocketryFormulas[name] as (...x: unknown[]) => unknown).bind(RocketryFormulas))
