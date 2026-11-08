import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELECTRONICS — THE CIRCUIT, AS ARITHMETIC. Running a circuit is numbers: Ohm's law for resistance, power in watts,
 *  resistances in series and in parallel, charge over time, capacitance from charge and voltage, frequency from cycles,
 *  and efficiency as a percentage. Crosses to `energy` — a circuit is energy moved. A measure. */

const PROOF = 'electronics arithmetic (ohm resistance, power watts, series + parallel resistance, charge, capacitance, frequency, efficiency); a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'electronics', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `electronics.${name}`, params })

export class ElectronicsFormulas {
  /** OHM'S LAW: resistance from voltage over current. value ⌊voltage / current⌋. */
  static ohm(voltage: number, current: number): CrossFormula { return c('electronics-ohm', 'ohm(voltage, current) = ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0, 'ohm', [voltage, current]) }
  /** POWER: watts as voltage times current. value voltage · current. */
  static power(voltage: number, current: number): CrossFormula { return c('electronics-power', 'power(voltage, current) = voltage · current', voltage * current, nat(voltage, current), 'power', [voltage, current]) }
  /** SERIES RESISTANCE: resistances add. value r1 + r2. */
  static series(r1: number, r2: number): CrossFormula { return c('electronics-series', 'series(r1, r2) = r1 + r2', r1 + r2, nat(r1, r2), 'series', [r1, r2]) }
  /** PARALLEL RESISTANCE: the product over the sum. value ⌊r1 · r2 / (r1 + r2)⌋. */
  static parallel(r1: number, r2: number): CrossFormula { return c('electronics-parallel', 'parallel(r1, r2) = ⌊r1 · r2 / (r1 + r2)⌋', (r1 + r2) > 0 ? Math.floor((r1 * r2) / (r1 + r2)) : 0, nat(r1, r2) && (r1 + r2) > 0, 'parallel', [r1, r2]) }
  /** CHARGE: current over time, in coulombs. value current · time. */
  static charge(current: number, time: number): CrossFormula { return c('electronics-charge', 'charge(current, time) = current · time', current * time, nat(current, time), 'charge', [current, time]) }
  /** CAPACITANCE: charge over voltage. value ⌊charge / voltage⌋. */
  static capacitance(charge_: number, voltage: number): CrossFormula { return c('electronics-capacitance', 'capacitance(charge_, voltage) = ⌊charge_ / voltage⌋', voltage > 0 ? Math.floor(charge_ / voltage) : 0, nat(charge_, voltage) && voltage > 0, 'capacitance', [charge_, voltage]) }
  /** FREQUENCY: cycles over seconds. value ⌊cycles / seconds⌋. */
  static frequency(cycles: number, seconds: number): CrossFormula { return c('electronics-frequency', 'frequency(cycles, seconds) = ⌊cycles / seconds⌋', seconds > 0 ? Math.floor(cycles / seconds) : 0, nat(cycles, seconds) && seconds > 0, 'frequency', [cycles, seconds]) }
  /** EFFICIENCY as a percentage. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('electronics-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
}

for (const name of ['capacitance', 'charge', 'efficiency', 'frequency', 'ohm', 'parallel', 'power', 'series'] as const)
  hexRegisterOf('electronics', name, (ElectronicsFormulas[name] as (...x: unknown[]) => unknown).bind(ElectronicsFormulas))
