import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEMANTICS — MEANING AS ARITHMETIC (chosen by the registry, not by hand). What words and sentences mean is numbers:
 *  how alike two meanings are, how many senses a word carries, whether a premise entails a conclusion, how ambiguous a
 *  sentence reads, how dense a text is with concepts, how far two concepts sit in a graph, how coherent a passage is, and
 *  the sign of its sentiment. Crosses to `linguistics` — semantics is the meaning linguistics describes. A measure. */

const PROOF = 'semantics arithmetic (similarity, polysemy, entailment, ambiguity, density, distance, coherence, sentiment); meaning as a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'semantics', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `semantics.${name}`, params })

export class SemanticsFormulas {
  /** SIMILARITY: shared features as a percentage of total. value ⌊shared · 100 / total⌋. */
  static similarity(shared: number, total: number): CrossFormula { return c('semantics-similarity', 'similarity(shared, total) = ⌊shared · 100 / total⌋', total > 0 ? Math.floor((shared * 100) / total) : 0, nat(shared, total) && total > 0 && shared <= total, 'similarity', [shared, total]) }
  /** POLYSEMY: senses per word. value ⌊senses / words⌋. */
  static polysemy(senses: number, words: number): CrossFormula { return c('semantics-polysemy', 'polysemy(senses, words) = ⌊senses / words⌋', words > 0 ? Math.floor(senses / words) : 0, nat(senses, words) && words > 0, 'polysemy', [senses, words]) }
  /** ENTAILMENT: entailed conclusions as a percentage of premises. value ⌊entailed · 100 / premises⌋. */
  static entailment(entailed: number, premises: number): CrossFormula { return c('semantics-entailment', 'entailment(entailed, premises) = ⌊entailed · 100 / premises⌋', premises > 0 ? Math.floor((entailed * 100) / premises) : 0, nat(entailed, premises) && premises > 0 && entailed <= premises, 'entailment', [entailed, premises]) }
  /** AMBIGUITY: readings per sentence. value ⌊readings / sentences⌋. */
  static ambiguity(readings: number, sentences: number): CrossFormula { return c('semantics-ambiguity', 'ambiguity(readings, sentences) = ⌊readings / sentences⌋', sentences > 0 ? Math.floor(readings / sentences) : 0, nat(readings, sentences) && sentences > 0, 'ambiguity', [readings, sentences]) }
  /** DENSITY: concepts as a percentage of tokens. value ⌊concepts · 100 / tokens⌋. */
  static density(concepts: number, tokens: number): CrossFormula { return c('semantics-density', 'density(concepts, tokens) = ⌊concepts · 100 / tokens⌋', tokens > 0 ? Math.floor((concepts * 100) / tokens) : 0, nat(concepts, tokens) && tokens > 0, 'density', [concepts, tokens]) }
  /** DISTANCE: hops between two concepts in a graph. value hops. */
  static distance(hops: number): CrossFormula { return c('semantics-distance', 'distance(hops) = hops', hops, nat(hops), 'distance', [hops]) }
  /** COHERENCE: linked units as a percentage of all units. value ⌊linked · 100 / units⌋. */
  static coherence(linked: number, units: number): CrossFormula { return c('semantics-coherence', 'coherence(linked, units) = ⌊linked · 100 / units⌋', units > 0 ? Math.floor((linked * 100) / units) : 0, nat(linked, units) && units > 0 && linked <= units, 'coherence', [linked, units]) }
  /** SENTIMENT: positive minus negative (may be negative). value positive − negative. */
  static sentiment(positive: number, negative: number): CrossFormula { return c('semantics-sentiment', 'sentiment(positive, negative) = positive − negative', positive - negative, nat(positive, negative), 'sentiment', [positive, negative]) }
}

for (const name of ['ambiguity', 'coherence', 'density', 'distance', 'entailment', 'polysemy', 'sentiment', 'similarity'] as const)
  hexRegisterOf('semantics', name, (SemanticsFormulas[name] as (...x: unknown[]) => unknown).bind(SemanticsFormulas))
