import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HVAC — HEATING, VENTILATION AND AIR CONDITIONING, AS ARITHMETIC (chosen by the equipment registry, not by hand). Conditioning
 *  air is numbers: the cooling load a space throws off, the airflow that carries it, the tons of refrigeration that meet it, the
 *  duct that fits the flow, the fresh air occupants need, the sensible and latent heat in a stream, and whether the space holds its
 *  setpoint. Crosses to `mechanical` — hvac is mechanical work moving heat. A measure. */

const PROOF = 'hvac arithmetic (cooling load, airflow, tonnage, ducting, ventilation, sensible heat, latent heat, setpoint); the equipment registry\'s uncovered domain; a measure crossed to mechanical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hvac', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `hvac.${name}`, params })

export class HvacFormulas {
  /** COOLING LOAD: floor area at a load factor (BTU/h per ft²). value area · factor. */
  static coolingload(area: number, factor: number): CrossFormula { return c('hvac-coolingload', 'coolingload(area, factor) = area · factor', area * factor, nat(area, factor), 'coolingload', [area, factor]) }
  /** AIRFLOW: the cfm a load needs at a per-ton airflow. value tons · perTon. */
  static airflow(tons: number, perTon: number): CrossFormula { return c('hvac-airflow', 'airflow(tons, perTon) = tons · perTon', tons * perTon, nat(tons, perTon), 'airflow', [tons, perTon]) }
  /** TONNAGE: tons of refrigeration from a BTU/h load at a per-ton rate. value ⌊btu / per⌋. */
  static tonnage(btu: number, per: number): CrossFormula { return c('hvac-tonnage', 'tonnage(btu, per) = ⌊btu / per⌋', per > 0 ? Math.floor(btu / per) : 0, nat(btu, per) && per > 0, 'tonnage', [btu, per]) }
  /** DUCTING: the duct area that carries a flow at a velocity. value ⌈cfm / velocity⌉. */
  static ducting(cfm: number, velocity: number): CrossFormula { return c('hvac-ducting', 'ducting(cfm, velocity) = ⌈cfm / velocity⌉', velocity > 0 ? Math.ceil(cfm / velocity) : 0, nat(cfm, velocity) && velocity > 0, 'ducting', [cfm, velocity]) }
  /** VENTILATION: fresh-air cfm for occupants at a per-person rate. value people · rate. */
  static ventilation(people: number, rate: number): CrossFormula { return c('hvac-ventilation', 'ventilation(people, rate) = people · rate', people * rate, nat(people, rate), 'ventilation', [people, rate]) }
  /** SENSIBLE HEAT: airflow across a dry-bulb difference. value cfm · dt. */
  static sensibleheat(cfm: number, dt: number): CrossFormula { return c('hvac-sensibleheat', 'sensibleheat(cfm, dt) = cfm · dt', cfm * dt, nat(cfm, dt), 'sensibleheat', [cfm, dt]) }
  /** LATENT HEAT: airflow across a humidity-ratio difference (grains), halved to the stream. value ⌊cfm · grains / 2⌋. */
  static latentheat(cfm: number, grains: number): CrossFormula { return c('hvac-latentheat', 'latentheat(cfm, grains) = ⌊cfm · grains / 2⌋', Math.floor((cfm * grains) / 2), nat(cfm, grains), 'latentheat', [cfm, grains]) }
  /** THE SETPOINT: 1 when the space temperature is at or below its target. value [temp ≤ target]. */
  static setpoint(temp: number, target: number): CrossFormula { return c('hvac-setpoint', 'setpoint(temp, target) = [temp ≤ target]', temp <= target ? 1 : 0, nat(temp, target), 'setpoint', [temp, target]) }
}

for (const name of ['airflow', 'coolingload', 'ducting', 'latentheat', 'sensibleheat', 'setpoint', 'tonnage', 'ventilation'] as const)
  hexRegisterOf('hvac', name, (HvacFormulas[name] as (...x: unknown[]) => unknown).bind(HvacFormulas))
