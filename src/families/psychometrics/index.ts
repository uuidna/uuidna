import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PSYCHOMETRICS — THE MEASUREMENT OF THE MIND, AS ARITHMETIC. A test is numbers: how reliably it repeats, how well it
 *  predicts, a raw score turned standard, a percentile rank, how hard an item is, how well an item discriminates, the
 *  internal consistency of the whole, and a raw score normalised to a scale. Crosses to `psychology` — psychometrics is
 *  how psychology is measured. A measure. */

const PROOF = 'psychometrics arithmetic (reliability, validity, standard score, percentile, item difficulty, discrimination, Cronbach\'s alpha, normalisation); the measurement of the mind; a measure crossed to psychology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'psychometrics', dst: 'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `psychometrics.${name}`, params })

export class PsychometricsFormulas {
  /** RELIABILITY: consistent responses over the total, as a percentage. value ⌊consistent · 100 / total⌋. */
  static reliability(consistent: number, total: number): CrossFormula { return c('psychometrics-reliability', 'reliability(consistent, total) = ⌊consistent · 100 / total⌋', total > 0 ? Math.floor((consistent * 100) / total) : 0, nat(consistent, total) && total > 0 && consistent <= total, 'reliability', [consistent, total]) }
  /** VALIDITY: correct predictions over all predictions, as a percentage. value ⌊hits · 100 / predictions⌋. */
  static validity(hits: number, predictions: number): CrossFormula { return c('psychometrics-validity', 'validity(hits, predictions) = ⌊hits · 100 / predictions⌋', predictions > 0 ? Math.floor((hits * 100) / predictions) : 0, nat(hits, predictions) && predictions > 0 && hits <= predictions, 'validity', [hits, predictions]) }
  /** STANDARD SCORE: a raw score turned standard against a mean and a standard deviation. value sd > 0 ? ⌊max(0, raw − mean) · 100 / sd⌋ : 0. */
  static standardscore(raw: number, mean: number, sd: number): CrossFormula { return c('psychometrics-standardscore', 'standardscore(raw, mean, sd) = ⌊max(0, raw − mean) · 100 / sd⌋', sd > 0 ? Math.floor((Math.max(0, raw - mean) * 100) / sd) : 0, nat(raw, mean, sd) && sd > 0, 'standardscore', [raw, mean, sd]) }
  /** PERCENTILE: the share scoring at or below, as a rank. value ⌊below · 100 / total⌋. */
  static percentile(below: number, total: number): CrossFormula { return c('psychometrics-percentile', 'percentile(below, total) = ⌊below · 100 / total⌋', total > 0 ? Math.floor((below * 100) / total) : 0, nat(below, total) && total > 0 && below <= total, 'percentile', [below, total]) }
  /** ITEM DIFFICULTY: the proportion answering an item correctly (the p-value). value ⌊correct · 100 / total⌋. */
  static itemdifficulty(correct: number, total: number): CrossFormula { return c('psychometrics-itemdifficulty', 'itemdifficulty(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && total > 0 && correct <= total, 'itemdifficulty', [correct, total]) }
  /** DISCRIMINATION: how far an item separates the upper group from the lower, per group size. value group > 0 ? ⌊max(0, upper − lower) · 100 / group⌋ : 0. */
  static discrimination(upper: number, lower: number, group: number): CrossFormula { return c('psychometrics-discrimination', 'discrimination(upper, lower, group) = ⌊max(0, upper − lower) · 100 / group⌋', group > 0 ? Math.floor((Math.max(0, upper - lower) * 100) / group) : 0, nat(upper, lower, group) && group > 0, 'discrimination', [upper, lower, group]) }
  /** CRONBACH'S ALPHA: internal consistency, ⌊(k / (k − 1)) · (1 − sumvar / totvar) · 100⌋. value totvar > 0 ? ⌊k · max(0, totvar − sumvar) · 100 / (max(1, k − 1) · totvar)⌋ : 0. */
  static cronbach(k: number, sumvar: number, totvar: number): CrossFormula { return c('psychometrics-cronbach', 'cronbach(k, sumvar, totvar) = ⌊k · max(0, totvar − sumvar) · 100 / (max(1, k − 1) · totvar)⌋', totvar > 0 ? Math.floor((k * Math.max(0, totvar - sumvar) * 100) / (Math.max(1, k - 1) * totvar)) : 0, nat(k, sumvar, totvar) && totvar > 0, 'cronbach', [k, sumvar, totvar]) }
  /** NORMALISATION: a raw score out of its maximum, placed on a scale. value max > 0 ? ⌊raw · scale / max⌋ : 0. */
  static normalization(raw: number, max: number, scale: number): CrossFormula { return c('psychometrics-normalization', 'normalization(raw, max, scale) = ⌊raw · scale / max⌋', max > 0 ? Math.floor((raw * scale) / max) : 0, nat(raw, max, scale) && max > 0, 'normalization', [raw, max, scale]) }
}

for (const name of ['cronbach', 'discrimination', 'itemdifficulty', 'normalization', 'percentile', 'reliability', 'standardscore', 'validity'] as const)
  hexRegisterOf('psychometrics', name, (PsychometricsFormulas[name] as (...x: unknown[]) => unknown).bind(PsychometricsFormulas))
