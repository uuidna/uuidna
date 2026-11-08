import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** KERNING — THE SPACING BETWEEN LETTERS, AS ARITHMETIC (in font design units, an em divided into 1000). Fitting type is
 *  numbers: a pair's adjustment, tracking across a run, a value as a per-mille ratio of the em, side bearings, the advance
 *  width, the space between words, total units for a count of ems, and the optical-size adjustment. Crosses to `typography`
 *  — kerning is what typography sets. A measure. */

const PROOF = 'kerning arithmetic (pair adjustment, tracking, em ratio, side bearing, advance width, word spacing, units, optical size); font design units with the em divided into 1000; a measure crossed to typography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'kerning', dst: 'typography', formula, value, proof: PROOF, ...extra }, holds, { name: `kerning.${name}`, params })

export class KerningFormulas {
  /** PAIR ADJUSTMENT: default spacing pulled in by a kern, never below zero. value max(0, space − kern). */
  static pairadjust(space: number, kern: number): CrossFormula { return c('kerning-pairadjust', 'pairadjust(space, kern) = max(0, space − kern)', Math.max(0, space - kern), nat(space, kern), 'pairadjust', [space, kern]) }
  /** TRACKING: a per-glyph unit added across a run of glyphs. value glyphs · units. */
  static tracking(glyphs: number, units: number): CrossFormula { return c('kerning-tracking', 'tracking(glyphs, units) = glyphs · units', glyphs * units, nat(glyphs, units), 'tracking', [glyphs, units]) }
  /** EM RATIO: a part of the em as per-mille of the whole em. value ⌊part · 1000 / whole⌋. */
  static emratio(part: number, whole: number): CrossFormula { return c('kerning-emratio', 'emratio(part, whole) = ⌊part · 1000 / whole⌋', whole > 0 ? Math.floor((part * 1000) / whole) : 0, nat(part, whole) && whole > 0, 'emratio', [part, whole]) }
  /** SIDE BEARING: the left and right bearings of a glyph. value left + right. */
  static sidebearing(left: number, right: number): CrossFormula { return c('kerning-sidebearing', 'sidebearing(left, right) = left + right', left + right, nat(left, right), 'sidebearing', [left, right]) }
  /** ADVANCE WIDTH: the ink width plus both side bearings. value ink + left + right. */
  static advancewidth(ink: number, left: number, right: number): CrossFormula { return c('kerning-advancewidth', 'advancewidth(ink, left, right) = ink + left + right', ink + left + right, nat(ink, left, right), 'advancewidth', [ink, left, right]) }
  /** WORD SPACING: the gaps between words at a space each (one fewer gap than words). value max(0, words − 1) · space. */
  static wordspacing(words: number, space: number): CrossFormula { return c('kerning-wordspacing', 'wordspacing(words, space) = max(0, words − 1) · space', Math.max(0, words - 1) * space, nat(words, space), 'wordspacing', [words, space]) }
  /** UNITS: the total design units for a count of ems at a units-per-em. value ems · upm. */
  static units(ems: number, upm: number): CrossFormula { return c('kerning-units', 'units(ems, upm) = ems · upm', ems * upm, nat(ems, upm), 'units', [ems, upm]) }
  /** OPTICAL SIZE: a size scaled by a per-mille optical adjustment. value ⌊size · adjust / 1000⌋. */
  static optical(size: number, adjust: number): CrossFormula { return c('kerning-optical', 'optical(size, adjust) = ⌊size · adjust / 1000⌋', Math.floor((size * adjust) / 1000), nat(size, adjust), 'optical', [size, adjust]) }
}

for (const name of ['advancewidth', 'emratio', 'optical', 'pairadjust', 'sidebearing', 'tracking', 'units', 'wordspacing'] as const)
  hexRegisterOf('kerning', name, (KerningFormulas[name] as (...x: unknown[]) => unknown).bind(KerningFormulas))
