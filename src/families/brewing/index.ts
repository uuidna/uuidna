import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BREWING — THE BREWHOUSE AS ARITHMETIC. A batch is numbers: alcohol from the gravity drop, how far the yeast
 *  attenuated, hop bitterness, colour, mash and extract efficiency, worth gravity, and carbonation. Integers only,
 *  every division guarded. Crosses to `cuisine` — brewing is cuisine measured. A measure. */

const PROOF = 'brewing arithmetic (abv, attenuation, ibu, srm, efficiency, gravity, carbonation, mash); integer values, every division guarded; a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'brewing', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `brewing.${name}`, params })

export class BrewingFormulas {
  /** ABV x100 proxy from the gravity drop. value ⌊(original − final) · 1000 / 75⌋, guarded original ≥ final. */
  static abv(original: number, final: number): CrossFormula { return c('brewing-abv', 'abv(original, final) = ⌊(original − final) · 1000 / 75⌋', original >= final ? Math.floor(((original - final) * 1000) / 75) : 0, nat(original, final) && original >= final, 'abv', [original, final]) }
  /** APPARENT ATTENUATION as a percentage. value ⌊(original − final) · 100 / original⌋. */
  static attenuation(original: number, final: number): CrossFormula { return c('brewing-attenuation', 'attenuation(original, final) = ⌊(original − final) · 100 / original⌋', original > 0 ? Math.floor(((original - final) * 100) / original) : 0, nat(original, final) && original > 0 && final <= original, 'attenuation', [original, final]) }
  /** CARBONATION: dissolved CO₂ over volume. value ⌊co2 / volume⌋. */
  static carbonation(co2: number, volume: number): CrossFormula { return c('brewing-carbonation', 'carbonation(co2, volume) = ⌊co2 / volume⌋', volume > 0 ? Math.floor(co2 / volume) : 0, nat(co2, volume) && volume > 0, 'carbonation', [co2, volume]) }
  /** BREWHOUSE EFFICIENCY as a percentage of potential extract. value ⌊extracted · 100 / potential⌋. */
  static efficiency(extracted: number, potential: number): CrossFormula { return c('brewing-efficiency', 'efficiency(extracted, potential) = ⌊extracted · 100 / potential⌋', potential > 0 ? Math.floor((extracted * 100) / potential) : 0, nat(extracted, potential) && potential > 0 && extracted <= potential, 'efficiency', [extracted, potential]) }
  /** WORT GRAVITY: sugar over volume, points. value ⌊sugar · 1000 / volume⌋. */
  static gravity(sugar: number, volume: number): CrossFormula { return c('brewing-gravity', 'gravity(sugar, volume) = ⌊sugar · 1000 / volume⌋', volume > 0 ? Math.floor((sugar * 1000) / volume) : 0, nat(sugar, volume) && volume > 0, 'gravity', [sugar, volume]) }
  /** HOP BITTERNESS: alpha acid by hop mass. value alpha · hops. */
  static ibu(alpha: number, hops: number): CrossFormula { return c('brewing-ibu', 'ibu(alpha, hops) = alpha · hops', alpha * hops, nat(alpha, hops), 'ibu', [alpha, hops]) }
  /** MASH RATIO: grain to water, percent. value ⌊grain · 100 / water⌋. */
  static mash(grain: number, water: number): CrossFormula { return c('brewing-mash', 'mash(grain, water) = ⌊grain · 100 / water⌋', water > 0 ? Math.floor((grain * 100) / water) : 0, nat(grain, water) && water > 0, 'mash', [grain, water]) }
  /** COLOUR proxy (SRM): malt over volume. value ⌊malt / volume⌋. */
  static srm(malt: number, volume: number): CrossFormula { return c('brewing-srm', 'srm(malt, volume) = ⌊malt / volume⌋', volume > 0 ? Math.floor(malt / volume) : 0, nat(malt, volume) && volume > 0, 'srm', [malt, volume]) }
}

for (const name of ['abv', 'attenuation', 'carbonation', 'efficiency', 'gravity', 'ibu', 'mash', 'srm'] as const)
  hexRegisterOf('brewing', name, (BrewingFormulas[name] as (...x: unknown[]) => unknown).bind(BrewingFormulas))
