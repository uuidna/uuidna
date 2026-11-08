import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIOINDICATOR — LIVING THINGS AS A MEASURE OF THEIR ENVIRONMENT, AS ARITHMETIC (chosen by the ecological-survey registry, not by
 *  hand). A field survey is numbers: the diversity of what lives there, the share of pollution-tolerant taxa, a biotic index, the
 *  loss of sensitive species, relative abundance, the pollution load, species richness, and how evenly the community is spread.
 *  Crosses to `ecology` — a bioindicator is what ecology reads. A measure. */

const PROOF = 'bioindicator arithmetic (diversity, tolerance share, biotic index, sensitivity loss, abundance ratio, pollution load, species richness, evenness); an ecological-survey domain; a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bioindicator', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `bioindicator.${name}`, params })

export class BioindicatorFormulas {
  /** RELATIVE ABUNDANCE: a taxon's count against the whole, as a percentage. value ⌊count · 100 / total⌋. */
  static abundanceratio(count: number, total: number): CrossFormula { return c('bioindicator-abundanceratio', 'abundanceratio(count, total) = ⌊count · 100 / total⌋', total > 0 ? Math.floor((count * 100) / total) : 0, nat(count, total) && total > 0 && count <= total, 'abundanceratio', [count, total]) }
  /** BIOTIC INDEX: the summed tolerance scores averaged over the taxa. value ⌊sum / taxa⌋. */
  static biotic(sum: number, taxa: number): CrossFormula { return c('bioindicator-biotic', 'biotic(sum, taxa) = ⌊sum / taxa⌋', taxa > 0 ? Math.floor(sum / taxa) : 0, nat(sum, taxa) && taxa > 0, 'biotic', [sum, taxa]) }
  /** DIVERSITY INDEX: the species present against all individuals, as a percentage. value ⌊species · 100 / total⌋. */
  static diversityindex(species: number, total: number): CrossFormula { return c('bioindicator-diversityindex', 'diversityindex(species, total) = ⌊species · 100 / total⌋', total > 0 ? Math.floor((species * 100) / total) : 0, nat(species, total) && total > 0 && species <= total, 'diversityindex', [species, total]) }
  /** EVENNESS: the observed spread against the maximum possible, as a percentage. value ⌊observed · 100 / max⌋. */
  static evenness(observed: number, max: number): CrossFormula { return c('bioindicator-evenness', 'evenness(observed, max) = ⌊observed · 100 / max⌋', max > 0 ? Math.floor((observed * 100) / max) : 0, nat(observed, max) && max > 0 && observed <= max, 'evenness', [observed, max]) }
  /** POLLUTION LOAD: concentration carried through a volume. value conc · volume. */
  static pollutionload(conc: number, volume: number): CrossFormula { return c('bioindicator-pollutionload', 'pollutionload(conc, volume) = conc · volume', conc * volume, nat(conc, volume), 'pollutionload', [conc, volume]) }
  /** SENSITIVITY: the sensitive species lost against a clean baseline. value max(0, baseline − present). */
  static sensitivity(baseline: number, present: number): CrossFormula { return c('bioindicator-sensitivity', 'sensitivity(baseline, present) = max(0, baseline − present)', Math.max(0, baseline - present), nat(baseline, present), 'sensitivity', [baseline, present]) }
  /** SPECIES RICHNESS: the distinct taxa counted across three strata. value a + b + c. */
  static speciesrichness(a: number, b: number, d: number): CrossFormula { return c('bioindicator-speciesrichness', 'speciesrichness(a, b, c) = a + b + c', a + b + d, nat(a, b, d), 'speciesrichness', [a, b, d]) }
  /** TOLERANCE SCORE: the share of pollution-tolerant taxa, as a percentage. value ⌊tolerant · 100 / taxa⌋. */
  static tolerancescore(tolerant: number, taxa: number): CrossFormula { return c('bioindicator-tolerancescore', 'tolerancescore(tolerant, taxa) = ⌊tolerant · 100 / taxa⌋', taxa > 0 ? Math.floor((tolerant * 100) / taxa) : 0, nat(tolerant, taxa) && taxa > 0 && tolerant <= taxa, 'tolerancescore', [tolerant, taxa]) }
}

for (const name of ['abundanceratio', 'biotic', 'diversityindex', 'evenness', 'pollutionload', 'sensitivity', 'speciesrichness', 'tolerancescore'] as const)
  hexRegisterOf('bioindicator', name, (BioindicatorFormulas[name] as (...x: unknown[]) => unknown).bind(BioindicatorFormulas))
