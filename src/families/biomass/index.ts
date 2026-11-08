import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOMASS — BIOENERGY, AS ARITHMETIC. Turning crop and residue into energy is numbers: calorific value per unit mass,
 *  moisture fraction, harvest yield per hectare, conversion efficiency to biofuel, combustion efficiency, carbon balance,
 *  anaerobic digestion yield, and bulk density. Crosses to `energy` — biomass is a store of energy. A measure. */

const PROOF = 'biomass arithmetic (calorific value, moisture, yield, conversion, combustion, carbon balance, digestion, density); bioenergy as a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'biomass', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `biomass.${name}`, params })

export class BiomassFormulas {
  /** CALORIFIC VALUE: energy per unit mass. value ⌊energy / mass⌋. */
  static calorific(energy: number, mass: number): CrossFormula { return c('biomass-calorific', 'calorific(energy, mass) = ⌊energy / mass⌋', mass > 0 ? Math.floor(energy / mass) : 0, nat(energy, mass) && mass > 0, 'calorific', [energy, mass]) }
  /** CARBON NEUTRALITY: absorbed over emitted, as a percentage. value ⌊absorbed · 100 / emitted⌋. */
  static carbonneutral(absorbed: number, emitted: number): CrossFormula { return c('biomass-carbonneutral', 'carbonneutral(absorbed, emitted) = ⌊absorbed · 100 / emitted⌋', emitted > 0 ? Math.floor((absorbed * 100) / emitted) : 0, nat(absorbed, emitted) && emitted > 0, 'carbonneutral', [absorbed, emitted]) }
  /** COMBUSTION EFFICIENCY: energy released over theoretical, as a percentage. value ⌊released · 100 / theoretical⌋. */
  static combustion(released: number, theoretical: number): CrossFormula { return c('biomass-combustion', 'combustion(released, theoretical) = ⌊released · 100 / theoretical⌋', theoretical > 0 ? Math.floor((released * 100) / theoretical) : 0, nat(released, theoretical) && theoretical > 0, 'combustion', [released, theoretical]) }
  /** CONVERSION EFFICIENCY: biofuel from feedstock, as a percentage. value ⌊biofuel · 100 / feedstock⌋. */
  static conversion(biofuel: number, feedstock: number): CrossFormula { return c('biomass-conversion', 'conversion(biofuel, feedstock) = ⌊biofuel · 100 / feedstock⌋', feedstock > 0 ? Math.floor((biofuel * 100) / feedstock) : 0, nat(biofuel, feedstock) && feedstock > 0 && biofuel <= feedstock, 'conversion', [biofuel, feedstock]) }
  /** BULK DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('biomass-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** ANAEROBIC DIGESTION: methane from volatile solids, as a percentage. value ⌊methane · 100 / volatiles⌋. */
  static digestion(methane: number, volatiles: number): CrossFormula { return c('biomass-digestion', 'digestion(methane, volatiles) = ⌊methane · 100 / volatiles⌋', volatiles > 0 ? Math.floor((methane * 100) / volatiles) : 0, nat(methane, volatiles) && volatiles > 0, 'digestion', [methane, volatiles]) }
  /** MOISTURE: the wet-over-dry water fraction, as a percentage. value ⌊(wet − dry) · 100 / wet⌋. */
  static moisture(wet: number, dry: number): CrossFormula { return c('biomass-moisture', 'moisture(wet, dry) = ⌊(wet − dry) · 100 / wet⌋', wet > 0 ? Math.floor(((wet - dry) * 100) / wet) : 0, nat(wet, dry) && wet > 0 && dry <= wet, 'moisture', [wet, dry]) }
  /** HARVEST YIELD: harvested over hectares. value ⌊harvested / hectares⌋. */
  static output(harvested: number, hectares: number): CrossFormula { return c('biomass-output', 'output(harvested, hectares) = ⌊harvested / hectares⌋', hectares > 0 ? Math.floor(harvested / hectares) : 0, nat(harvested, hectares) && hectares > 0, 'output', [harvested, hectares]) }
}

for (const name of ['calorific', 'carbonneutral', 'combustion', 'conversion', 'density', 'digestion', 'moisture', 'output'] as const)
  hexRegisterOf('biomass', name, (BiomassFormulas[name] as (...x: unknown[]) => unknown).bind(BiomassFormulas))
