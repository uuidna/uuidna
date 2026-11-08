import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DAIRY — THE HERD, AS ARITHMETIC (chosen by the agricultural registry, not by hand). Milk is numbers: yield per cow,
 *  butterfat and protein as a share of milk, somatic cell count per volume, days in lactation, conception rate per
 *  insemination, feed efficiency, and persistency against peak. Crosses to `agriculture` — dairy is what the farm measures.
 *  A measure. */

const PROOF = 'dairy arithmetic (yield per cow, butterfat, somatic cells, lactation, protein, conception, feed efficiency, persistency); the herd as integers; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dairy', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `dairy.${name}`, params })

export class DairyFormulas {
  /** YIELD per cow: milk over the cows. value ⌊milk / cows⌋. */
  static output(milk: number, cows: number): CrossFormula { return c('dairy-output', 'output(milk, cows) = ⌊milk / cows⌋', cows > 0 ? Math.floor(milk / cows) : 0, nat(milk, cows) && cows > 0, 'output', [milk, cows]) }
  /** BUTTERFAT as a percentage of milk. value ⌊fat · 100 / milk⌋. */
  static butterfat(fat: number, milk: number): CrossFormula { return c('dairy-butterfat', 'butterfat(fat, milk) = ⌊fat · 100 / milk⌋', milk > 0 ? Math.floor((fat * 100) / milk) : 0, nat(fat, milk) && milk > 0 && fat <= milk, 'butterfat', [fat, milk]) }
  /** SOMATIC cell count per volume (SCC proxy). value ⌊cells / volume⌋. */
  static somatic(cells: number, volume: number): CrossFormula { return c('dairy-somatic', 'somatic(cells, volume) = ⌊cells / volume⌋', volume > 0 ? Math.floor(cells / volume) : 0, nat(cells, volume) && volume > 0, 'somatic', [cells, volume]) }
  /** LACTATION: days in milk. value days. */
  static lactation(days: number): CrossFormula { return c('dairy-lactation', 'lactation(days) = days', days, nat(days), 'lactation', [days]) }
  /** PROTEIN as a percentage of milk. value ⌊protein · 100 / milk⌋. */
  static protein(protein_: number, milk: number): CrossFormula { return c('dairy-protein', 'protein(protein, milk) = ⌊protein · 100 / milk⌋', milk > 0 ? Math.floor((protein_ * 100) / milk) : 0, nat(protein_, milk) && milk > 0 && protein_ <= milk, 'protein', [protein_, milk]) }
  /** CONCEPTION rate per insemination. value ⌊conceived · 100 / inseminations⌋. */
  static conception(conceived: number, inseminations: number): CrossFormula { return c('dairy-conception', 'conception(conceived, inseminations) = ⌊conceived · 100 / inseminations⌋', inseminations > 0 ? Math.floor((conceived * 100) / inseminations) : 0, nat(conceived, inseminations) && inseminations > 0 && conceived <= inseminations, 'conception', [conceived, inseminations]) }
  /** FEED EFFICIENCY: milk over feed. value ⌊milk · 100 / feed⌋. */
  static feedefficiency(milk: number, feed: number): CrossFormula { return c('dairy-feedefficiency', 'feedefficiency(milk, feed) = ⌊milk · 100 / feed⌋', feed > 0 ? Math.floor((milk * 100) / feed) : 0, nat(milk, feed) && feed > 0, 'feedefficiency', [milk, feed]) }
  /** PERSISTENCY against peak. value ⌊current · 100 / peak⌋. */
  static persistency(current: number, peak: number): CrossFormula { return c('dairy-persistency', 'persistency(current, peak) = ⌊current · 100 / peak⌋', peak > 0 ? Math.floor((current * 100) / peak) : 0, nat(current, peak) && peak > 0 && current <= peak, 'persistency', [current, peak]) }
}

for (const name of ['butterfat', 'conception', 'feedefficiency', 'lactation', 'output', 'persistency', 'protein', 'somatic'] as const)
  hexRegisterOf('dairy', name, (DairyFormulas[name] as (...x: unknown[]) => unknown).bind(DairyFormulas))
