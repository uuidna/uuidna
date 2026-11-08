import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ZEROSHOT — zero-shot learning as exact combinatorics, not a fabricated coverage number. The embedding matrix cells,
 *  the attribute matrix, the seen×unseen transfer pairs, the similarity comparisons, the seen classes left after the
 *  unseen are held out, the prompt×class grid, the binary attribute signatures (2^a), and the classes per fold. Each an
 *  exact integer at a hex address; develops the zero-shot lead. */

const PROOF = 'zeroshot counts: embeddings = classes·dims; attributes = classes·attrs; transferPairs = seen·unseen; comparisons = queries·classes; seenClasses = max(0, classes − unseen); prompts = templates·classes; signatures = 2^attrs (A000079); partitions = classes/folds'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const div = (a: number, b: number) => (b > 0 ? Math.floor(a / b) : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'zeroshot', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `zeroshot.${name}`, params })

export class ZeroshotFormulas {
  /** The embedding matrix cells for `classes` classes of `dims` dimensions: classes · dims. */
  static embeddings(classes: number, dims: number): CrossFormula { return f('zeroshot-embeddings', 'embeddings(classes, dims) = classes · dims', classes * dims, nat(classes, dims), 'embeddings', [classes, dims]) }
  /** The attribute matrix for `classes` classes over `attrs` attributes: classes · attrs. */
  static attributes(classes: number, attrs: number): CrossFormula { return f('zeroshot-attributes', 'attributes(classes, attrs) = classes · attrs', classes * attrs, nat(classes, attrs), 'attributes', [classes, attrs]) }
  /** The seen×unseen transfer pairs from `seen` and `unseen` classes: seen · unseen. */
  static transferPairs(seen: number, unseen: number): CrossFormula { return f('zeroshot-transferPairs', 'transferPairs(seen, unseen) = seen · unseen', seen * unseen, nat(seen, unseen), 'transferPairs', [seen, unseen]) }
  /** The similarity comparisons for `queries` queries against `classes`: queries · classes. */
  static comparisons(queries: number, classes: number): CrossFormula { return f('zeroshot-comparisons', 'comparisons(queries, classes) = queries · classes', queries * classes, nat(queries, classes), 'comparisons', [queries, classes]) }
  /** The seen classes left after `unseen` of `classes` are held out: max(0, classes − unseen). */
  static seenClasses(classes: number, unseen: number): CrossFormula { return f('zeroshot-seenClasses', 'seenClasses(classes, unseen) = max(0, classes − unseen)', Math.max(0, classes - unseen), nat(classes, unseen), 'seenClasses', [classes, unseen]) }
  /** The prompt×class grid over `templates` templates and `classes`: templates · classes. */
  static prompts(templates: number, classes: number): CrossFormula { return f('zeroshot-prompts', 'prompts(templates, classes) = templates · classes', templates * classes, nat(templates, classes), 'prompts', [templates, classes]) }
  /** The binary attribute signatures over `attrs` attributes: 2^attrs (attrs ≤ 30). */
  static signatures(attrs: number): CrossFormula { return f('zeroshot-signatures', 'signatures(attrs) = 2^attrs', attrs <= 30 ? 2 ** attrs : 0, nat(attrs) && attrs <= 30, 'signatures', [attrs]) }
  /** The classes per fold from `classes` over `folds`: classes / folds. */
  static partitions(classes: number, folds: number): CrossFormula { return f('zeroshot-partitions', 'partitions(classes, folds) = classes / folds', div(classes, folds), nat(classes, folds) && folds > 0, 'partitions', [classes, folds]) }
}

for (const name of ['attributes', 'comparisons', 'embeddings', 'partitions', 'prompts', 'seenClasses', 'signatures', 'transferPairs'] as const)
  hexRegisterOf('zeroshot', name, (ZeroshotFormulas[name] as (...x: unknown[]) => unknown).bind(ZeroshotFormulas))
