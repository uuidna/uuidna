import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DERMATOLOGY — THE SKIN, AS ARITHMETIC. Reading the skin is numbers: burned surface, a melanoma score, a UV dose, how a
 *  wound heals, lesions over an area, pigmentation over a baseline, severity over the whole, and hydration of tissue.
 *  Crosses to `med` — dermatology is a branch of medicine. A measure. */

const PROOF = 'dermatology arithmetic (burned surface, melanoma score, UV dose, healing, lesions, pigmentation, severity, hydration); the skin as a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dermatology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `dermatology.${name}`, params })

export class DermatologyFormulas {
  /** TBSA: total body surface area burned, regions at a value each. value regions · value. */
  static tbsa(regions: number, value: number): CrossFormula { return c('dermatology-tbsa', 'tbsa(regions, value) = regions · value', regions * value, nat(regions, value), 'tbsa', [regions, value]) }
  /** MELANOMA score: asymmetry plus diameter. value asymmetry + diameter. */
  static melanoma(asymmetry: number, diameter: number): CrossFormula { return c('dermatology-melanoma', 'melanoma(asymmetry, diameter) = asymmetry + diameter', asymmetry + diameter, nat(asymmetry, diameter), 'melanoma', [asymmetry, diameter]) }
  /** UV EXPOSURE DOSE: index over minutes. value index · minutes. */
  static uv(index: number, minutes: number): CrossFormula { return c('dermatology-uv', 'uv(index, minutes) = index · minutes', index * minutes, nat(index, minutes), 'uv', [index, minutes]) }
  /** HEALING as a percentage of the wound. value ⌊healed · 100 / wound⌋. */
  static healing(healed: number, wound: number): CrossFormula { return c('dermatology-healing', 'healing(healed, wound) = ⌊healed · 100 / wound⌋', wound > 0 ? Math.floor((healed * 100) / wound) : 0, nat(healed, wound) && wound > 0 && healed <= wound, 'healing', [healed, wound]) }
  /** LESIONS per unit area. value ⌊count / area⌋. */
  static lesions(count: number, area: number): CrossFormula { return c('dermatology-lesions', 'lesions(count, area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'lesions', [count, area]) }
  /** PIGMENTATION above a baseline. value max(0, melanin − baseline). */
  static pigmentation(melanin: number, baseline: number): CrossFormula { return c('dermatology-pigmentation', 'pigmentation(melanin, baseline) = max(0, melanin − baseline)', Math.max(0, melanin - baseline), nat(melanin, baseline), 'pigmentation', [melanin, baseline]) }
  /** SEVERITY: affected area as a percentage of the total. value ⌊affected · 100 / total⌋. */
  static severity(affected: number, total: number): CrossFormula { return c('dermatology-severity', 'severity(affected, total) = ⌊affected · 100 / total⌋', total > 0 ? Math.floor((affected * 100) / total) : 0, nat(affected, total) && total > 0 && affected <= total, 'severity', [affected, total]) }
  /** HYDRATION: water as a percentage of the tissue. value ⌊water · 100 / tissue⌋. */
  static hydration(water: number, tissue: number): CrossFormula { return c('dermatology-hydration', 'hydration(water, tissue) = ⌊water · 100 / tissue⌋', tissue > 0 ? Math.floor((water * 100) / tissue) : 0, nat(water, tissue) && tissue > 0 && water <= tissue, 'hydration', [water, tissue]) }
}

for (const name of ['healing', 'hydration', 'lesions', 'melanoma', 'pigmentation', 'severity', 'tbsa', 'uv'] as const)
  hexRegisterOf('dermatology', name, (DermatologyFormulas[name] as (...x: unknown[]) => unknown).bind(DermatologyFormulas))
