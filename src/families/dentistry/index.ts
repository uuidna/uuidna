import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DENTISTRY — DENTAL MEDICINE, AS ARITHMETIC (chosen by the registry, not by hand). Dental care is numbers: decay as a
 *  share of the teeth, plaque over the surfaces scored, an anesthetic dose by weight, the months until recall, restoration
 *  coverage, probing-pocket depth, a fluoride reading against its limit, and extractions as a share of the teeth. Crosses
 *  to `med` — dentistry is a branch of medicine. A measure. */

const PROOF = 'dentistry arithmetic (decay share, plaque score, anesthetic dose, recall months, restoration coverage, pocket depth, fluoride limit, extraction share); dental medicine as a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dentistry', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `dentistry.${name}`, params })

export class DentistryFormulas {
  /** DECAY as a share of the teeth. value ⌊decayed · 100 / teeth⌋. */
  static decay(decayed: number, teeth: number): CrossFormula { return c('dentistry-decay', 'decay(decayed, teeth) = ⌊decayed · 100 / teeth⌋', teeth > 0 ? Math.floor((decayed * 100) / teeth) : 0, nat(decayed, teeth) && teeth > 0 && decayed <= teeth, 'decay', [decayed, teeth]) }
  /** PLAQUE score over the surfaces examined. value ⌊surfaces · 100 / total⌋. */
  static plaque(surfaces: number, total: number): CrossFormula { return c('dentistry-plaque', 'plaque(surfaces, total) = ⌊surfaces · 100 / total⌋', total > 0 ? Math.floor((surfaces * 100) / total) : 0, nat(surfaces, total) && total > 0 && surfaces <= total, 'plaque', [surfaces, total]) }
  /** ANESTHETIC dose: weight at a per-kilogram rate. value weight · perKg. */
  static anesthetic(weight: number, perKg: number): CrossFormula { return c('dentistry-anesthetic', 'anesthetic(weight, perKg) = weight · perKg', weight * perKg, nat(weight, perKg), 'anesthetic', [weight, perKg]) }
  /** RECALL: the months remaining until the next visit. value max(0, months − since). */
  static recall(months: number, since: number): CrossFormula { return c('dentistry-recall', 'recall(months, since) = max(0, months − since)', Math.max(0, months - since), nat(months, since), 'recall', [months, since]) }
  /** RESTORATION coverage: the fillings placed against those needed. value ⌊filled · 100 / needed⌋. */
  static restoration(filled: number, needed: number): CrossFormula { return c('dentistry-restoration', 'restoration(filled, needed) = ⌊filled · 100 / needed⌋', needed > 0 ? Math.floor((filled * 100) / needed) : 0, nat(filled, needed) && needed > 0 && filled <= needed, 'restoration', [filled, needed]) }
  /** POCKET: probing depth in millimetres. value depth (holds depth ≤ 12 mm). */
  static pocket(depth: number): CrossFormula { return c('dentistry-pocket', 'pocket(depth) = depth', depth, nat(depth) && depth <= 12, 'pocket', [depth]) }
  /** FLUORIDE: 1 when a reading is within its limit. value [ppm ≤ limit]. */
  static fluoride(ppm: number, limit: number): CrossFormula { return c('dentistry-fluoride', 'fluoride(ppm, limit) = [ppm ≤ limit]', ppm <= limit ? 1 : 0, nat(ppm, limit), 'fluoride', [ppm, limit]) }
  /** EXTRACTION as a share of the teeth. value ⌊removed · 100 / teeth⌋. */
  static extraction(removed: number, teeth: number): CrossFormula { return c('dentistry-extraction', 'extraction(removed, teeth) = ⌊removed · 100 / teeth⌋', teeth > 0 ? Math.floor((removed * 100) / teeth) : 0, nat(removed, teeth) && teeth > 0 && removed <= teeth, 'extraction', [removed, teeth]) }
}

for (const name of ['anesthetic', 'decay', 'extraction', 'fluoride', 'plaque', 'pocket', 'recall', 'restoration'] as const)
  hexRegisterOf('dentistry', name, (DentistryFormulas[name] as (...x: unknown[]) => unknown).bind(DentistryFormulas))
