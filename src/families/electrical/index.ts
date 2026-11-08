import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELECTRICAL — ELECTRICAL ENGINEERING, AS ARITHMETIC (chosen by the public-API registry, not by hand). A circuit is
 *  numbers: power from voltage and current, resistance by Ohm's law, impedance, power factor, transformer turns ratio,
 *  the load a supply carries, conversion efficiency, and frequency. Crosses to `energy` — electrical work is energy
 *  accounted. A measure. */

const PROOF = 'electrical arithmetic (power, resistance, impedance, power factor, transformer ratio, load, efficiency, frequency); electrical engineering as integers; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'electrical', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `electrical.${name}`, params })

export class ElectricalFormulas {
  /** POWER: voltage times current. value voltage · current. */
  static power(voltage: number, current: number): CrossFormula { return c('electrical-power', 'power(voltage, current) = voltage · current', voltage * current, nat(voltage, current), 'power', [voltage, current]) }
  /** RESISTANCE by Ohm's law: voltage over current. value ⌊voltage / current⌋. */
  static resistance(voltage: number, current: number): CrossFormula { return c('electrical-resistance', 'resistance(voltage, current) = ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0, 'resistance', [voltage, current]) }
  /** IMPEDANCE: resistance plus reactance. value resistance + reactance. */
  static impedance(resistance_: number, reactance: number): CrossFormula { return c('electrical-impedance', 'impedance(resistance, reactance) = resistance + reactance', resistance_ + reactance, nat(resistance_, reactance), 'impedance', [resistance_, reactance]) }
  /** POWER FACTOR as a percentage: real over apparent. value ⌊real · 100 / apparent⌋. */
  static powerfactor(real: number, apparent: number): CrossFormula { return c('electrical-powerfactor', 'powerfactor(real, apparent) = ⌊real · 100 / apparent⌋', apparent > 0 ? Math.floor((real * 100) / apparent) : 0, nat(real, apparent) && apparent > 0 && real <= apparent, 'powerfactor', [real, apparent]) }
  /** TRANSFORMER turns ratio as a percentage: primary over secondary. value ⌊primary · 100 / secondary⌋. */
  static transformer(primary: number, secondary: number): CrossFormula { return c('electrical-transformer', 'transformer(primary, secondary) = ⌊primary · 100 / secondary⌋', secondary > 0 ? Math.floor((primary * 100) / secondary) : 0, nat(primary, secondary) && secondary > 0, 'transformer', [primary, secondary]) }
  /** LOAD: power drawn at a supply voltage. value ⌊power / voltage⌋. */
  static load(power: number, voltage: number): CrossFormula { return c('electrical-load', 'load(power, voltage) = ⌊power / voltage⌋', voltage > 0 ? Math.floor(power / voltage) : 0, nat(power, voltage) && voltage > 0, 'load', [power, voltage]) }
  /** EFFICIENCY as a percentage: output over input. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('electrical-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** FREQUENCY: cycles over seconds. value ⌊cycles / seconds⌋. */
  static frequency(cycles: number, seconds: number): CrossFormula { return c('electrical-frequency', 'frequency(cycles, seconds) = ⌊cycles / seconds⌋', seconds > 0 ? Math.floor(cycles / seconds) : 0, nat(cycles, seconds) && seconds > 0, 'frequency', [cycles, seconds]) }
}

for (const name of ['efficiency', 'frequency', 'impedance', 'load', 'power', 'powerfactor', 'resistance', 'transformer'] as const)
  hexRegisterOf('electrical', name, (ElectricalFormulas[name] as (...x: unknown[]) => unknown).bind(ElectricalFormulas))
