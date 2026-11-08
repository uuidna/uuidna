import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACCESSIBILITY — WHAT A FRONTEND OWES EVERY READER, AS ARITHMETIC. Reading a page is numbers: the contrast between ink
 *  and paper, whether a tap target is big enough for a thumb, text scaled to a reader's setting, the WCAG pass rate, how
 *  many images carry alt text, the rows a focus order walks, the share of elements that are labelled, and the grade a
 *  passage reads at. Crosses to `frontend` — accessibility is the frontend judged by who it leaves out. A measure. */

const PROOF = 'accessibility arithmetic (contrast ratio, tap target, text scale, WCAG score, alt coverage, focus order, aria labelling, reading level); the frontend judged by who it leaves out; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'accessibility', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `accessibility.${name}`, params })

export class AccessibilityFormulas {
  /** CONTRAST RATIO ·100: ink against paper, the two luminances offset by 5. value ⌊(light + 5) · 100 / (dark + 5)⌋. */
  static contrastratio(light: number, dark: number): CrossFormula { return c('accessibility-contrastratio', 'contrastratio(light, dark) = ⌊(light + 5) · 100 / (dark + 5)⌋', dark + 5 > 0 ? Math.floor(((light + 5) * 100) / (dark + 5)) : 0, nat(light, dark), 'contrastratio', [light, dark]) }
  /** TAP TARGET: 1 when a control is at least the minimum size. value [size ≥ min]. */
  static taptarget(size: number, min: number): CrossFormula { return c('accessibility-taptarget', 'taptarget(size, min) = [size ≥ min]', size >= min ? 1 : 0, nat(size, min), 'taptarget', [size, min]) }
  /** TEXT SCALE: base size at a reader's percent. value ⌊base · scale / 100⌋. */
  static textscale(base: number, scale: number): CrossFormula { return c('accessibility-textscale', 'textscale(base, scale) = ⌊base · scale / 100⌋', Math.floor((base * scale) / 100), nat(base, scale), 'textscale', [base, scale]) }
  /** WCAG SCORE: checks passed over checks total, as a percentage. value ⌊passed · 100 / total⌋. */
  static wcagscore(passed: number, total: number): CrossFormula { return c('accessibility-wcagscore', 'wcagscore(passed, total) = ⌊passed · 100 / total⌋', total > 0 ? Math.floor((passed * 100) / total) : 0, nat(passed, total) && total > 0 && passed <= total, 'wcagscore', [passed, total]) }
  /** ALT COVERAGE: images with alt text over all images. value ⌊withAlt · 100 / images⌋. */
  static altcoverage(withAlt: number, images: number): CrossFormula { return c('accessibility-altcoverage', 'altcoverage(withAlt, images) = ⌊withAlt · 100 / images⌋', images > 0 ? Math.floor((withAlt * 100) / images) : 0, nat(withAlt, images) && images > 0 && withAlt <= images, 'altcoverage', [withAlt, images]) }
  /** FOCUS ORDER: the rows a tab order walks at a per-row width. value ⌈elements / perRow⌉. */
  static focusorder(elements: number, perRow: number): CrossFormula { return c('accessibility-focusorder', 'focusorder(elements, perRow) = ⌈elements / perRow⌉', perRow > 0 ? Math.ceil(elements / perRow) : 0, nat(elements, perRow) && perRow > 0, 'focusorder', [elements, perRow]) }
  /** ARIA: the share of elements carrying a label. value ⌊labelled · 100 / elements⌋. */
  static aria(labelled: number, elements: number): CrossFormula { return c('accessibility-aria', 'aria(labelled, elements) = ⌊labelled · 100 / elements⌋', elements > 0 ? Math.floor((labelled * 100) / elements) : 0, nat(labelled, elements) && elements > 0 && labelled <= elements, 'aria', [labelled, elements]) }
  /** READING LEVEL: the grade a passage reads at, words over sentences. value ⌊words / sentences⌋. */
  static readinglevel(words: number, sentences: number): CrossFormula { return c('accessibility-readinglevel', 'readinglevel(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0, nat(words, sentences) && sentences > 0, 'readinglevel', [words, sentences]) }
}

for (const name of ['altcoverage', 'aria', 'contrastratio', 'focusorder', 'readinglevel', 'taptarget', 'textscale', 'wcagscore'] as const)
  hexRegisterOf('accessibility', name, (AccessibilityFormulas[name] as (...x: unknown[]) => unknown).bind(AccessibilityFormulas))
