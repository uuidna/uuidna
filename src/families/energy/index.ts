import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENERGY — THE ENERGY/POWER INDUSTRY, AS ARITHMETIC (chosen by the public-API registry, not by hand). Generation and
 *  delivery are numbers: power from voltage and current, energy over hours, conversion efficiency, grid load, the bill,
 *  installed capacity, carbon emitted, and state of charge. Crosses to `obs` — energy is what observability watches. A measure. */

const PROOF = 'energy arithmetic (power, energy, efficiency, load, cost, capacity, carbon, storage); the energy/power industry as a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'energy', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `energy.${name}`, params })

export class EnergyFormulas {
  /** POWER: voltage times current. value voltage · current (watts). */
  static power(voltage: number, current: number): CrossFormula { return c('energy-power', 'power(voltage, current) = voltage · current', voltage * current, nat(voltage, current), 'power', [voltage, current]) }
  /** ENERGY: power over hours. value power · hours (watt-hours). */
  static energy(power: number, hours: number): CrossFormula { return c('energy-energy', 'energy(power, hours) = power · hours', power * hours, nat(power, hours), 'energy', [power, hours]) }
  /** EFFICIENCY: output over input as a percentage. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('energy-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** LOAD: demand over capacity as a percentage. value ⌊demand · 100 / capacity⌋. */
  static load(demand: number, capacity: number): CrossFormula { return c('energy-load', 'load(demand, capacity) = ⌊demand · 100 / capacity⌋', capacity > 0 ? Math.floor((demand * 100) / capacity) : 0, nat(demand, capacity) && capacity > 0, 'load', [demand, capacity]) }
  /** COST: kilowatt-hours at a rate in cents. value ⌊kwh · rate / 100⌋. */
  static cost(kwh: number, rate: number): CrossFormula { return c('energy-cost', 'cost(kwh, rate) = ⌊kwh · rate / 100⌋', Math.floor((kwh * rate) / 100), nat(kwh, rate), 'cost', [kwh, rate]) }
  /** CAPACITY: panels at watts each. value panels · watts. */
  static capacity(panels: number, watts: number): CrossFormula { return c('energy-capacity', 'capacity(panels, watts) = panels · watts', panels * watts, nat(panels, watts), 'capacity', [panels, watts]) }
  /** CARBON: kilowatt-hours at an emission factor per thousand. value ⌊kwh · factor / 1000⌋. */
  static carbon(kwh: number, factor: number): CrossFormula { return c('energy-carbon', 'carbon(kwh, factor) = ⌊kwh · factor / 1000⌋', Math.floor((kwh * factor) / 1000), nat(kwh, factor), 'carbon', [kwh, factor]) }
  /** STORAGE: state of charge over capacity as a percentage. value ⌊charge · 100 / capacity⌋. */
  static storage(charge: number, capacity: number): CrossFormula { return c('energy-storage', 'storage(charge, capacity) = ⌊charge · 100 / capacity⌋', capacity > 0 ? Math.floor((charge * 100) / capacity) : 0, nat(charge, capacity) && capacity > 0 && charge <= capacity, 'storage', [charge, capacity]) }
}

for (const name of ['capacity', 'carbon', 'cost', 'efficiency', 'energy', 'load', 'power', 'storage'] as const)
  hexRegisterOf('energy', name, (EnergyFormulas[name] as (...x: unknown[]) => unknown).bind(EnergyFormulas))
