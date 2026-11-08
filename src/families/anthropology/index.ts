import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ANTHROPOLOGY — THE STUDY OF PEOPLES, AS ARITHMETIC. Kin per generation, how far a trait diffuses, lineage per founder,
 *  artifacts per dig, strata depth, cognate share of a vocabulary, migration per generation, and how often a rite is kept.
 *  Crosses to `sociology` — anthropology is the long view of what sociology measures now. A measure. */

const PROOF = 'anthropology arithmetic (kinship, diffusion, lineage, artifacts, stratigraphy, language, migration, ritual); the study of peoples as integers; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'anthropology', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `anthropology.${name}`, params })

export class AnthropologyFormulas {
  /** KINSHIP: relatives spread over the generations that bore them. value ⌊relatives / generations⌋. */
  static kinship(relatives: number, generations: number): CrossFormula { return c('anthropology-kinship', 'kinship(relatives, generations) = ⌊relatives / generations⌋', generations > 0 ? Math.floor(relatives / generations) : 0, nat(relatives, generations) && generations > 0, 'kinship', [relatives, generations]) }
  /** DIFFUSION: the share of contacts that adopted a trait, as a percentage. value ⌊adopted · 100 / contacts⌋. */
  static diffusion(adopted: number, contacts: number): CrossFormula { return c('anthropology-diffusion', 'diffusion(adopted, contacts) = ⌊adopted · 100 / contacts⌋', contacts > 0 ? Math.floor((adopted * 100) / contacts) : 0, nat(adopted, contacts) && contacts > 0 && adopted <= contacts, 'diffusion', [adopted, contacts]) }
  /** LINEAGE: descendants per founding line. value ⌊descendants / founders⌋. */
  static lineage(descendants: number, founders: number): CrossFormula { return c('anthropology-lineage', 'lineage(descendants, founders) = ⌊descendants / founders⌋', founders > 0 ? Math.floor(descendants / founders) : 0, nat(descendants, founders) && founders > 0, 'lineage', [descendants, founders]) }
  /** ARTIFACTS: finds per unit excavated. value ⌊found / excavated⌋. */
  static artifacts(found: number, excavated: number): CrossFormula { return c('anthropology-artifacts', 'artifacts(found, excavated) = ⌊found / excavated⌋', excavated > 0 ? Math.floor(found / excavated) : 0, nat(found, excavated) && excavated > 0, 'artifacts', [found, excavated]) }
  /** STRATIGRAPHY: depth per layer. value ⌊depth / layers⌋. */
  static stratigraphy(depth: number, layers: number): CrossFormula { return c('anthropology-stratigraphy', 'stratigraphy(depth, layers) = ⌊depth / layers⌋', layers > 0 ? Math.floor(depth / layers) : 0, nat(depth, layers) && layers > 0, 'stratigraphy', [depth, layers]) }
  /** LANGUAGE: cognate share of a vocabulary, as a percentage. value ⌊shared · 100 / words⌋. */
  static language(shared: number, words: number): CrossFormula { return c('anthropology-language', 'language(shared, words) = ⌊shared · 100 / words⌋', words > 0 ? Math.floor((shared * 100) / words) : 0, nat(shared, words) && words > 0 && shared <= words, 'language', [shared, words]) }
  /** MIGRATION: distance covered per generation. value ⌊distance / generations⌋. */
  static migration(distance: number, generations: number): CrossFormula { return c('anthropology-migration', 'migration(distance, generations) = ⌊distance / generations⌋', generations > 0 ? Math.floor(distance / generations) : 0, nat(distance, generations) && generations > 0, 'migration', [distance, generations]) }
  /** RITUAL: how often a rite is observed across its occasions, as a percentage. value ⌊observed · 100 / occasions⌋. */
  static ritual(observed: number, occasions: number): CrossFormula { return c('anthropology-ritual', 'ritual(observed, occasions) = ⌊observed · 100 / occasions⌋', occasions > 0 ? Math.floor((observed * 100) / occasions) : 0, nat(observed, occasions) && occasions > 0 && observed <= occasions, 'ritual', [observed, occasions]) }
}

for (const name of ['artifacts', 'diffusion', 'kinship', 'language', 'lineage', 'migration', 'ritual', 'stratigraphy'] as const)
  hexRegisterOf('anthropology', name, (AnthropologyFormulas[name] as (...x: unknown[]) => unknown).bind(AnthropologyFormulas))
