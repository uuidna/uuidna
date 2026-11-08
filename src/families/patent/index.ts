import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PATENT — INTELLECTUAL PROPERTY AS ARITHMETIC. The life of a right and its worth are numbers: the term from the filing
 *  year, the priority window, the royalty on revenue, a reasonable-royalty damage, the claim count, infringing units,
 *  maintenance, and whether the invention is novel over the prior art. Exact and jurisdiction-agnostic; crosses to `law`,
 *  where the right is granted and enforced. A measure, not advice. */

const PROOF = 'intellectual-property arithmetic (term, priority window, royalty, reasonable-royalty damages, claim count, infringing units, maintenance, novelty over prior art); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const p = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'patent', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `patent.${name}`, params })

export class PatentFormulas {
  /** THE TERM: the year a right filed in `filed` expires after `life` years. value filed + life. */
  static term(filed: number, life: number): CrossFormula { return p('patent-term', 'term(filed, life) = filed + life', filed + life, nat(filed, life), 'term', [filed, life]) }
  /** THE PRIORITY WINDOW: 1 when a later filing is within the `months` convention window (12 for patents). value [months ≤ 12]. */
  static priority(months: number): CrossFormula { return p('patent-priority', 'priority(months) = [months ≤ 12]', months <= 12 ? 1 : 0, nat(months), 'priority', [months]) }
  /** ROYALTY at `rate`% of licensed revenue. value ⌊revenue · rate / 100⌋. */
  static royalty(revenue: number, rate: number): CrossFormula { return p('patent-royalty', 'royalty(revenue, rate) = ⌊revenue · rate / 100⌋', Math.floor((revenue * rate) / 100), nat(revenue, rate) && rate <= 100, 'royalty', [revenue, rate]) }
  /** REASONABLE-ROYALTY DAMAGES: infringing `units` at a per-unit royalty. value units · perUnit. */
  static damages(units: number, perUnit: number): CrossFormula { return p('patent-damages', 'damages(units, perUnit) = units · perUnit', units * perUnit, nat(units, perUnit), 'damages', [units, perUnit]) }
  /** THE CLAIM COUNT: independent plus dependent claims. value independent + dependent. */
  static claims(independent: number, dependent: number): CrossFormula { return p('patent-claims', 'claims(independent, dependent) = independent + dependent', independent + dependent, nat(independent, dependent) && independent > 0, 'claims', [independent, dependent]) }
  /** INFRINGING UNITS: made less those licensed. value max(0, made − licensed). */
  static infringement(made: number, licensed: number): CrossFormula { return p('patent-infringement', 'infringement(made, licensed) = max(0, made − licensed)', Math.max(0, made - licensed), nat(made, licensed), 'infringement', [made, licensed]) }
  /** MAINTENANCE paid over `years` at a yearly `fee`. value years · fee. */
  static maintenance(years: number, fee: number): CrossFormula { return p('patent-maintenance', 'maintenance(years, fee) = years · fee', years * fee, nat(years, fee), 'maintenance', [years, fee]) }
  /** NOVELTY: 1 only when no prior art anticipates the invention. value [prior = 0]. */
  static novelty(prior: number): CrossFormula { return p('patent-novelty', 'novelty(prior) = [prior = 0]', prior === 0 ? 1 : 0, nat(prior), 'novelty', [prior]) }
}

for (const name of ['claims', 'damages', 'infringement', 'maintenance', 'novelty', 'priority', 'royalty', 'term'] as const)
  hexRegisterOf('patent', name, (PatentFormulas[name] as (...x: unknown[]) => unknown).bind(PatentFormulas))
