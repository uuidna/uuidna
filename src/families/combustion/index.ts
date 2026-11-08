import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMBUSTION — BURNING FUEL, AS ARITHMETIC. Mixing and burning is numbers: the air a fuel needs, the extra air supplied,
 *  the flame it reaches, the heat it lets go, the oxygen the molecule demands, how much of that heat does work, what it
 *  emits, and the energy packed in each unit of mass. Crosses to `thermochemistry` — combustion is the reaction
 *  thermochemistry accounts for. A measure. */

const PROOF = 'combustion arithmetic (air-fuel ratio, excess air, flame temperature, heat release, stoichiometric oxygen, efficiency, emissions, calorific value); a measure crossed to thermochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'combustion', dst: 'thermochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `combustion.${name}`, params })

export class CombustionFormulas {
  /** AIR-FUEL RATIO: mass of air per mass of fuel. value ⌊air / fuel⌋. */
  static airfuelratio(air: number, fuel: number): CrossFormula { return c('combustion-airfuelratio', 'airfuelratio(air, fuel) = ⌊air / fuel⌋', fuel > 0 ? Math.floor(air / fuel) : 0, nat(air, fuel) && fuel > 0, 'airfuelratio', [air, fuel]) }
  /** EXCESS AIR: air supplied beyond stoichiometric, as a percentage. value ⌊max(0, supplied − stoich) · 100 / stoich⌋. */
  static excessair(supplied: number, stoich: number): CrossFormula { return c('combustion-excessair', 'excessair(supplied, stoich) = ⌊max(0, supplied − stoich) · 100 / stoich⌋', stoich > 0 ? Math.floor((Math.max(0, supplied - stoich) * 100) / stoich) : 0, nat(supplied, stoich) && stoich > 0, 'excessair', [supplied, stoich]) }
  /** ADIABATIC FLAME TEMPERATURE: ambient plus the temperature rise. value ambient + rise. */
  static flametemp(ambient: number, rise: number): CrossFormula { return c('combustion-flametemp', 'flametemp(ambient, rise) = ambient + rise', ambient + rise, nat(ambient, rise), 'flametemp', [ambient, rise]) }
  /** HEAT RELEASE: fuel mass at a calorific value each. value fuel · calorific. */
  static heatrelease(fuel: number, calorific: number): CrossFormula { return c('combustion-heatrelease', 'heatrelease(fuel, calorific) = fuel · calorific', fuel * calorific, nat(fuel, calorific), 'heatrelease', [fuel, calorific]) }
  /** STOICHIOMETRIC OXYGEN for CₓHᵧ: moles of O₂ the molecule demands. value carbon + ⌊hydrogen / 4⌋. */
  static stoichiometric(carbon: number, hydrogen: number): CrossFormula { return c('combustion-stoichiometric', 'stoichiometric(carbon, hydrogen) = carbon + ⌊hydrogen / 4⌋', carbon + Math.floor(hydrogen / 4), nat(carbon, hydrogen), 'stoichiometric', [carbon, hydrogen]) }
  /** EFFICIENCY: useful heat over heat input, as a percentage. value ⌊useful · 100 / input⌋. */
  static efficiency(useful: number, input: number): CrossFormula { return c('combustion-efficiency', 'efficiency(useful, input) = ⌊useful · 100 / input⌋', input > 0 ? Math.floor((useful * 100) / input) : 0, nat(useful, input) && input > 0 && useful <= input, 'efficiency', [useful, input]) }
  /** EMISSIONS: fuel burned at an emission factor each. value fuel · factor. */
  static emissions(fuel: number, factor: number): CrossFormula { return c('combustion-emissions', 'emissions(fuel, factor) = fuel · factor', fuel * factor, nat(fuel, factor), 'emissions', [fuel, factor]) }
  /** CALORIFIC VALUE: energy over the mass that holds it. value ⌊energy / mass⌋. */
  static calorific(energy: number, mass: number): CrossFormula { return c('combustion-calorific', 'calorific(energy, mass) = ⌊energy / mass⌋', mass > 0 ? Math.floor(energy / mass) : 0, nat(energy, mass) && mass > 0, 'calorific', [energy, mass]) }
}

for (const name of ['airfuelratio', 'calorific', 'efficiency', 'emissions', 'excessair', 'flametemp', 'heatrelease', 'stoichiometric'] as const)
  hexRegisterOf('combustion', name, (CombustionFormulas[name] as (...x: unknown[]) => unknown).bind(CombustionFormulas))
