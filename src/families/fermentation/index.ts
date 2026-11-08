import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FERMENTATION — THE BIOCHEMISTRY OF CULTURE, AS ARITHMETIC (a living domain chosen for the registry, not by hand).
 *  Fermentation is numbers: substrate converted, production rate, pH, biomass density, yield, ethanol against theory,
 *  temperature, and the inoculation ratio. Crosses to `biochemistry` — fermentation is what biochemistry measures. A measure. */

const PROOF = 'fermentation arithmetic (conversion, rate, pH, biomass, yield, ethanol, temperature, inoculation); a living biochemical domain as integers; a measure crossed to biochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fermentation', dst: 'biochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `fermentation.${name}`, params })

export class FermentationFormulas {
  /** BIOMASS density: cells over the culture volume. value ⌊cells / volume⌋. */
  static biomass(cells: number, volume: number): CrossFormula { return c('fermentation-biomass', 'biomass(cells, volume) = ⌊cells / volume⌋', volume > 0 ? Math.floor(cells / volume) : 0, nat(cells, volume) && volume > 0, 'biomass', [cells, volume]) }
  /** CONVERSION: substrate consumed as a percentage. value ⌊converted · 100 / substrate⌋. */
  static conversion(converted: number, substrate: number): CrossFormula { return c('fermentation-conversion', 'conversion(converted, substrate) = ⌊converted · 100 / substrate⌋', substrate > 0 ? Math.floor((converted * 100) / substrate) : 0, nat(converted, substrate) && substrate > 0 && converted <= substrate, 'conversion', [converted, substrate]) }
  /** ETHANOL against theoretical maximum, as a percentage. value ⌊produced · 100 / theoretical⌋. */
  static ethanol(produced: number, theoretical: number): CrossFormula { return c('fermentation-ethanol', 'ethanol(produced, theoretical) = ⌊produced · 100 / theoretical⌋', theoretical > 0 ? Math.floor((produced * 100) / theoretical) : 0, nat(produced, theoretical) && theoretical > 0 && produced <= theoretical, 'ethanol', [produced, theoretical]) }
  /** INOCULATION ratio: starter against the batch, as a percentage. value ⌊starter · 100 / batch⌋. */
  static inoculation(starter: number, batch: number): CrossFormula { return c('fermentation-inoculation', 'inoculation(starter, batch) = ⌊starter · 100 / batch⌋', batch > 0 ? Math.floor((starter * 100) / batch) : 0, nat(starter, batch) && batch > 0 && starter <= batch, 'inoculation', [starter, batch]) }
  /** YIELD: product from sugar, as a percentage. value ⌊product · 100 / sugar⌋. */
  static output(product: number, sugar: number): CrossFormula { return c('fermentation-output', 'output(product, sugar) = ⌊product · 100 / sugar⌋', sugar > 0 ? Math.floor((product * 100) / sugar) : 0, nat(product, sugar) && sugar > 0 && product <= sugar, 'output', [product, sugar]) }
  /** pH as the acid/base ratio, as a percentage. value ⌊acid · 100 / base⌋. */
  static ph(acid: number, base: number): CrossFormula { return c('fermentation-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) }
  /** RATE of production: amount over the hours elapsed. value ⌊produced / hours⌋. */
  static rate(produced: number, hours: number): CrossFormula { return c('fermentation-rate', 'rate(produced, hours) = ⌊produced / hours⌋', hours > 0 ? Math.floor(produced / hours) : 0, nat(produced, hours) && hours > 0, 'rate', [produced, hours]) }
  /** TEMPERATURE: the culture reading, held as a natural. value celsius. */
  static temperature(celsius: number): CrossFormula { return c('fermentation-temperature', 'temperature(celsius) = celsius', celsius, nat(celsius), 'temperature', [celsius]) }
}

for (const name of ['biomass', 'conversion', 'ethanol', 'inoculation', 'output', 'ph', 'rate', 'temperature'] as const)
  hexRegisterOf('fermentation', name, (FermentationFormulas[name] as (...x: unknown[]) => unknown).bind(FermentationFormulas))
