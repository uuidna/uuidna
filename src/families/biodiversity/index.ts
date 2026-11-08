import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BIODIVERSITY — LIFE'S VARIETY, AS ARITHMETIC (chosen by the ecology registry, not by hand). A community is numbers:
 *  the species present, how evenly the individuals spread across them, diversity and dominance indices, how much is
 *  endemic, the turnover between two places, abundance per area, and how much of it is rare. Crosses to `ecology` —
 *  biodiversity is what ecology measures. A measure. */

const PROOF = 'biodiversity arithmetic (richness, evenness, shannon, simpson, endemism, turnover, abundance, rarity); an ecology measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'biodiversity', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `biodiversity.${name}`, params })

export class BiodiversityFormulas {
  /** RICHNESS: the count of species present. value species. */
  static richness(species: number): CrossFormula { return c('biodiversity-richness', 'richness(species) = species', species, nat(species), 'richness', [species]) }
  /** EVENNESS: individuals spread across the species. value ⌊individuals / species⌋. */
  static evenness(individuals: number, species: number): CrossFormula { return c('biodiversity-evenness', 'evenness(individuals, species) = ⌊individuals / species⌋', species > 0 ? Math.floor(individuals / species) : 0, nat(individuals, species) && species > 0, 'evenness', [individuals, species]) }
  /** SHANNON: a species' share of the total, as a percentage. value ⌊species · 100 / total⌋. */
  static shannon(species: number, total: number): CrossFormula { return c('biodiversity-shannon', 'shannon(species, total) = ⌊species · 100 / total⌋', total > 0 ? Math.floor((species * 100) / total) : 0, nat(species, total) && total > 0 && species <= total, 'shannon', [species, total]) }
  /** SIMPSON: the dominant species' share of the total, as a percentage. value ⌊dominant · 100 / total⌋. */
  static simpson(dominant: number, total: number): CrossFormula { return c('biodiversity-simpson', 'simpson(dominant, total) = ⌊dominant · 100 / total⌋', total > 0 ? Math.floor((dominant * 100) / total) : 0, nat(dominant, total) && total > 0 && dominant <= total, 'simpson', [dominant, total]) }
  /** ENDEMISM: the endemic share of the total, as a percentage. value ⌊endemic · 100 / total⌋. */
  static endemism(endemic: number, total: number): CrossFormula { return c('biodiversity-endemism', 'endemism(endemic, total) = ⌊endemic · 100 / total⌋', total > 0 ? Math.floor((endemic * 100) / total) : 0, nat(endemic, total) && total > 0 && endemic <= total, 'endemism', [endemic, total]) }
  /** TURNOVER: the shared share of the combined pool, as a percentage. value ⌊shared · 100 / combined⌋. */
  static turnover(shared: number, combined: number): CrossFormula { return c('biodiversity-turnover', 'turnover(shared, combined) = ⌊shared · 100 / combined⌋', combined > 0 ? Math.floor((shared * 100) / combined) : 0, nat(shared, combined) && combined > 0, 'turnover', [shared, combined]) }
  /** ABUNDANCE: the count per unit area. value ⌊count / area⌋. */
  static abundance(count: number, area: number): CrossFormula { return c('biodiversity-abundance', 'abundance(count, area) = ⌊count / area⌋', area > 0 ? Math.floor(count / area) : 0, nat(count, area) && area > 0, 'abundance', [count, area]) }
  /** RARITY: the rare share of the species, as a percentage. value ⌊rare · 100 / species⌋. */
  static rarity(rare: number, species: number): CrossFormula { return c('biodiversity-rarity', 'rarity(rare, species) = ⌊rare · 100 / species⌋', species > 0 ? Math.floor((rare * 100) / species) : 0, nat(rare, species) && species > 0 && rare <= species, 'rarity', [rare, species]) }
}

for (const name of ['abundance', 'endemism', 'evenness', 'rarity', 'richness', 'shannon', 'simpson', 'turnover'] as const)
  hexRegisterOf('biodiversity', name, (BiodiversityFormulas[name] as (...x: unknown[]) => unknown).bind(BiodiversityFormulas))
