import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PROPULSION — MOVING MASS, AS ARITHMETIC (chosen by the engineering registry, not by hand). A thrust chamber is numbers:
 *  thrust from pressure over an area, propulsive efficiency, specific fuel consumption, the bypass ratio, the compression
 *  ratio, shaft power, exhaust temperature, and the mass flow. Crosses to `aerospace` — propulsion is what flight runs on.
 *  A measure. */

const PROOF = 'propulsion arithmetic (thrust, efficiency, specific fuel, bypass ratio, compression ratio, power, exhaust, mass flow); the engineering registry\'s uncovered domain; a measure crossed to aerospace'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'propulsion', dst: 'aerospace', formula, value, proof: PROOF, ...extra }, holds, { name: `propulsion.${name}`, params })

export class PropulsionFormulas {
  /** THRUST: chamber pressure over the nozzle area. value pressure · area. */
  static thrust(pressure: number, area: number): CrossFormula { return c('propulsion-thrust', 'thrust(pressure, area) = pressure · area', pressure * area, nat(pressure, area), 'thrust', [pressure, area]) }
  /** PROPULSIVE EFFICIENCY as a percentage. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('propulsion-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** SPECIFIC FUEL CONSUMPTION: fuel per unit of thrust (per thousand). value ⌊fuel · 1000 / thrust_⌋. */
  static specificfuel(fuel: number, thrust_: number): CrossFormula { return c('propulsion-specificfuel', 'specificfuel(fuel, thrust_) = ⌊fuel · 1000 / thrust_⌋', thrust_ > 0 ? Math.floor((fuel * 1000) / thrust_) : 0, nat(fuel, thrust_) && thrust_ > 0, 'specificfuel', [fuel, thrust_]) }
  /** BYPASS RATIO: secondary flow over primary flow (percent). value ⌊secondary · 100 / primary⌋. */
  static bypass(secondary: number, primary: number): CrossFormula { return c('propulsion-bypass', 'bypass(secondary, primary) = ⌊secondary · 100 / primary⌋', primary > 0 ? Math.floor((secondary * 100) / primary) : 0, nat(secondary, primary) && primary > 0, 'bypass', [secondary, primary]) }
  /** COMPRESSION RATIO: outlet pressure over inlet pressure (percent). value ⌊outlet · 100 / inlet⌋. */
  static compression(outlet: number, inlet: number): CrossFormula { return c('propulsion-compression', 'compression(outlet, inlet) = ⌊outlet · 100 / inlet⌋', inlet > 0 ? Math.floor((outlet * 100) / inlet) : 0, nat(outlet, inlet) && inlet > 0, 'compression', [outlet, inlet]) }
  /** SHAFT POWER: force at a velocity. value force · velocity. */
  static power(force: number, velocity: number): CrossFormula { return c('propulsion-power', 'power(force, velocity) = force · velocity', force * velocity, nat(force, velocity), 'power', [force, velocity]) }
  /** EXHAUST TEMPERATURE: the measured reading, held. value temperature. */
  static exhaust(temperature: number): CrossFormula { return c('propulsion-exhaust', 'exhaust(temperature) = temperature', temperature, nat(temperature), 'exhaust', [temperature]) }
  /** MASS FLOW: density at a velocity. value density · velocity. */
  static massflow(density: number, velocity: number): CrossFormula { return c('propulsion-massflow', 'massflow(density, velocity) = density · velocity', density * velocity, nat(density, velocity), 'massflow', [density, velocity]) }
}

for (const name of ['bypass', 'compression', 'efficiency', 'exhaust', 'massflow', 'power', 'specificfuel', 'thrust'] as const)
  hexRegisterOf('propulsion', name, (PropulsionFormulas[name] as (...x: unknown[]) => unknown).bind(PropulsionFormulas))
