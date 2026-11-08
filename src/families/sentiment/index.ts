import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SENTIMENT — OPINION AS ARITHMETIC (chosen by the opinion-mining registry, not by hand). Reading a corpus is numbers:
 *  polarity (positive less negative), the net score in percent, how subjective the text is, intensity, how far raters
 *  agree, the classifier's confidence, the mixed-signal ratio, and the positive valence. Crosses to `semantics` —
 *  sentiment is the feeling semantics carries. A measure. */

const PROOF = 'sentiment arithmetic (polarity, net score, subjectivity, intensity, agreement, confidence, mixed ratio, valence); an opinion-mining domain; a measure crossed to semantics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sentiment', dst: 'semantics', formula, value, proof: PROOF, ...extra }, holds, { name: `sentiment.${name}`, params })

export class SentimentFormulas {
  /** POLARITY: positive mentions less negative, never below zero. value max(0, pos − neg). */
  static polarity(pos: number, neg: number): CrossFormula { return c('sentiment-polarity', 'polarity(pos, neg) = max(0, pos − neg)', Math.max(0, pos - neg), nat(pos, neg), 'polarity', [pos, neg]) }
  /** NET SCORE: positive mentions as a percentage of the total. value ⌊pos · 100 / total⌋. */
  static netscore(pos: number, total: number): CrossFormula { return c('sentiment-netscore', 'netscore(pos, total) = ⌊pos · 100 / total⌋', total > 0 ? Math.floor((pos * 100) / total) : 0, nat(pos, total) && total > 0 && pos <= total, 'netscore', [pos, total]) }
  /** SUBJECTIVITY: subjective sentences as a percentage of the total. value ⌊subj · 100 / total⌋. */
  static subjectivity(subj: number, total: number): CrossFormula { return c('sentiment-subjectivity', 'subjectivity(subj, total) = ⌊subj · 100 / total⌋', total > 0 ? Math.floor((subj * 100) / total) : 0, nat(subj, total) && total > 0 && subj <= total, 'subjectivity', [subj, total]) }
  /** INTENSITY: the strength of a signal over how many times it recurs. value strength · count. */
  static intensity(strength: number, count: number): CrossFormula { return c('sentiment-intensity', 'intensity(strength, count) = strength · count', strength * count, nat(strength, count), 'intensity', [strength, count]) }
  /** AGREEMENT: how far raters agree, as a percentage. value ⌊agree · 100 / raters⌋. */
  static agreement(agree: number, raters: number): CrossFormula { return c('sentiment-agreement', 'agreement(agree, raters) = ⌊agree · 100 / raters⌋', raters > 0 ? Math.floor((agree * 100) / raters) : 0, nat(agree, raters) && raters > 0 && agree <= raters, 'agreement', [agree, raters]) }
  /** CONFIDENCE: the classifier's correct calls over all samples, as a percentage. value ⌊correct · 100 / samples⌋. */
  static confidence(correct: number, samples: number): CrossFormula { return c('sentiment-confidence', 'confidence(correct, samples) = ⌊correct · 100 / samples⌋', samples > 0 ? Math.floor((correct * 100) / samples) : 0, nat(correct, samples) && samples > 0 && correct <= samples, 'confidence', [correct, samples]) }
  /** MIXED RATIO: the weaker signal over the stronger, as a percentage. value ⌊min · 100 / max⌋. */
  static mixedratio(pos: number, neg: number): CrossFormula { return c('sentiment-mixedratio', 'mixedratio(pos, neg) = ⌊min(pos, neg) · 100 / max(pos, neg)⌋', Math.max(pos, neg) > 0 ? Math.floor((Math.min(pos, neg) * 100) / Math.max(pos, neg)) : 0, nat(pos, neg), 'mixedratio', [pos, neg]) }
  /** VALENCE: positive share across positive, negative and neutral mentions. value ⌊pos · 100 / (pos + neg + neu)⌋. */
  static valence(pos: number, neg: number, neu: number): CrossFormula { return c('sentiment-valence', 'valence(pos, neg, neu) = ⌊pos · 100 / (pos + neg + neu)⌋', (pos + neg + neu) > 0 ? Math.floor((pos * 100) / (pos + neg + neu)) : 0, nat(pos, neg, neu), 'valence', [pos, neg, neu]) }
}

for (const name of ['agreement', 'confidence', 'intensity', 'mixedratio', 'netscore', 'polarity', 'subjectivity', 'valence'] as const)
  hexRegisterOf('sentiment', name, (SentimentFormulas[name] as (...x: unknown[]) => unknown).bind(SentimentFormulas))
