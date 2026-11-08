import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TYPOGRAPHY — WEB TYPE, AS ARITHMETIC. Setting text is numbers: the measure (line length) against the ideal, the modular
 *  scale that sizes the steps, letter-spacing (tracking) and line-height (leading) from a percent, the words a line holds,
 *  whether a last line is a widow, the font-weight of a step, and the vertical rhythm of a column. Crosses to `css` — type is
 *  what a stylesheet sets. A measure. */

const PROOF = 'typography arithmetic (measure, modular scale, tracking, leading, words, widows, weight, rhythm); web type as integers; a measure crossed to css'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'typography', dst: 'css', formula, value, proof: PROOF, ...extra }, holds, { name: `typography.${name}`, params })

export class TypographyFormulas {
  /** MEASURE: 1 when a line length is within the ideal (~66 chars). value [chars ≤ ideal]. */
  static measure(chars: number, ideal: number): CrossFormula { return c('typography-measure', 'measure(chars, ideal) = [chars ≤ ideal]', chars <= ideal ? 1 : 0, nat(chars, ideal), 'measure', [chars, ideal]) }
  /** MODULAR SCALE: a base sized up a step on the 1.25 (major third) ratio. value ⌊base · 5^step / 4^step⌋. */
  static scale(base: number, step: number): CrossFormula { return c('typography-scale', 'scale(base, step) = ⌊base · 5^step / 4^step⌋', nat(base, step) ? Math.floor((base * 5 ** step) / 4 ** step) : 0, nat(base, step), 'scale', [base, step]) }
  /** TRACKING: letter-spacing as a percent of the size. value ⌊size · pct / 100⌋. */
  static tracking(size: number, pct: number): CrossFormula { return c('typography-tracking', 'tracking(size, pct) = ⌊size · pct / 100⌋', Math.floor((size * pct) / 100), nat(size, pct), 'tracking', [size, pct]) }
  /** LEADING: line-height as a percent of the size. value ⌊size · pct / 100⌋. */
  static leading(size: number, pct: number): CrossFormula { return c('typography-leading', 'leading(size, pct) = ⌊size · pct / 100⌋', Math.floor((size * pct) / 100), nat(size, pct), 'leading', [size, pct]) }
  /** WORDS: the words a line holds at an average chars-per-word. value ⌊chars / perWord⌋. */
  static words(chars: number, perWord: number): CrossFormula { return c('typography-words', 'words(chars, perWord) = ⌊chars / perWord⌋', perWord > 0 ? Math.floor(chars / perWord) : 0, nat(chars, perWord) && perWord > 0, 'words', [chars, perWord]) }
  /** WIDOWS: 1 when a last line is not a single word (not a widow). value [last > 1]. */
  static widows(last: number, total: number): CrossFormula { return c('typography-widows', 'widows(last, total) = [last > 1]', last > 1 ? 1 : 0, nat(last, total) && last <= total, 'widows', [last, total]) }
  /** WEIGHT: the font-weight of a step (100..900). value step · 100. */
  static weight(step: number): CrossFormula { return c('typography-weight', 'weight(step) = step · 100', step * 100, nat(step) && step >= 1 && step <= 9, 'weight', [step]) }
  /** RHYTHM: the vertical rhythm of a column, lines on a baseline. value lines · baseline. */
  static rhythm(lines: number, baseline: number): CrossFormula { return c('typography-rhythm', 'rhythm(lines, baseline) = lines · baseline', lines * baseline, nat(lines, baseline), 'rhythm', [lines, baseline]) }
}

for (const name of ['leading', 'measure', 'rhythm', 'scale', 'tracking', 'weight', 'widows', 'words'] as const)
  hexRegisterOf('typography', name, (TypographyFormulas[name] as (...x: unknown[]) => unknown).bind(TypographyFormulas))
