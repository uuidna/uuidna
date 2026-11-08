import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOCHEMISTRY — EARTH'S MATTER AS RATIOS (chosen by the registry, not by hand). Reading rock, water, and crust is numbers:
 *  isotope ratios, weathering extent, crustal enrichment, acidity, salinity, how an element splits between solid and
 *  liquid, radiometric age, and mineral saturation. Crosses to `chemistry` — geochemistry is chemistry on the planet. A measure. */

const PROOF = 'geochemistry arithmetic (isotope ratio, weathering, enrichment, pH proxy, salinity, partition, radiometric age, saturation); a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geochemistry', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `geochemistry.${name}`, params })

export class GeochemistryFormulas {
  /** ISOTOPE RATIO: daughter over parent, as a percentage. value ⌊daughter · 100 / parent⌋. */
  static isotope(parent: number, daughter: number): CrossFormula { return c('geochemistry-isotope', 'isotope(parent, daughter) = ⌊daughter · 100 / parent⌋', parent > 0 ? Math.floor((daughter * 100) / parent) : 0, nat(parent, daughter) && parent > 0, 'isotope', [parent, daughter]) }
  /** WEATHERING: the dissolved fraction of the rock, as a percentage. value ⌊dissolved · 100 / rock⌋. */
  static weathering(dissolved: number, rock: number): CrossFormula { return c('geochemistry-weathering', 'weathering(dissolved, rock) = ⌊dissolved · 100 / rock⌋', rock > 0 ? Math.floor((dissolved * 100) / rock) : 0, nat(dissolved, rock) && rock > 0 && dissolved <= rock, 'weathering', [dissolved, rock]) }
  /** CRUSTAL ENRICHMENT: a sample against the crustal abundance, as a percentage. value ⌊sample · 100 / crust⌋. */
  static enrichment(sample: number, crust: number): CrossFormula { return c('geochemistry-enrichment', 'enrichment(sample, crust) = ⌊sample · 100 / crust⌋', crust > 0 ? Math.floor((sample * 100) / crust) : 0, nat(sample, crust) && crust > 0, 'enrichment', [sample, crust]) }
  /** ACIDITY: acid over base, as a percentage (a pH proxy). value ⌊acid · 100 / base⌋. */
  static ph(acid: number, base: number): CrossFormula { return c('geochemistry-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) }
  /** SALINITY: salt in water, per thousand. value ⌊salt · 1000 / water⌋. */
  static salinity(salt: number, water: number): CrossFormula { return c('geochemistry-salinity', 'salinity(salt, water) = ⌊salt · 1000 / water⌋', water > 0 ? Math.floor((salt * 1000) / water) : 0, nat(salt, water) && water > 0, 'salinity', [salt, water]) }
  /** PARTITION: how an element splits between solid and liquid, as a percentage. value ⌊solid · 100 / liquid⌋. */
  static partition(solid: number, liquid: number): CrossFormula { return c('geochemistry-partition', 'partition(solid, liquid) = ⌊solid · 100 / liquid⌋', liquid > 0 ? Math.floor((solid * 100) / liquid) : 0, nat(solid, liquid) && liquid > 0, 'partition', [solid, liquid]) }
  /** RADIOMETRIC AGE: daughter over parent, per thousand (an age proxy). value ⌊daughter · 1000 / parent⌋. */
  static age(parent: number, daughter: number): CrossFormula { return c('geochemistry-age', 'age(parent, daughter) = ⌊daughter · 1000 / parent⌋', parent > 0 ? Math.floor((daughter * 1000) / parent) : 0, nat(parent, daughter) && parent > 0, 'age', [parent, daughter]) }
  /** SATURATION: ion activity against solubility, as a percentage. value ⌊ion · 100 / solubility⌋. */
  static saturation(ion: number, solubility: number): CrossFormula { return c('geochemistry-saturation', 'saturation(ion, solubility) = ⌊ion · 100 / solubility⌋', solubility > 0 ? Math.floor((ion * 100) / solubility) : 0, nat(ion, solubility) && solubility > 0, 'saturation', [ion, solubility]) }
}

for (const name of ['age', 'enrichment', 'isotope', 'partition', 'ph', 'salinity', 'saturation', 'weathering'] as const)
  hexRegisterOf('geochemistry', name, (GeochemistryFormulas[name] as (...x: unknown[]) => unknown).bind(GeochemistryFormulas))
