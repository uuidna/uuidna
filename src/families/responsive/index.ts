import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RESPONSIVE — LAYING OUT A SCREEN, AS ARITHMETIC. A responsive design is numbers: the breakpoint a width lands in, a
 *  fluid size between a min and max, the columns that fit, the gutter per column, a modular scale factor, pixels from a
 *  viewport-width unit, a fitted height at an aspect ratio, and physical pixels at a device density. Crosses to `frontend`
 *  — responsive is how a frontend meets its viewport. A measure. */

const PROOF = 'responsive arithmetic (breakpoint, fluid size, columns, gutter, scale factor, viewport units, aspect fit, density); laying out a screen as integers; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'responsive', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `responsive.${name}`, params })

export class ResponsiveFormulas {
  /** BREAKPOINT: which fixed-step tier a width lands in. value ⌊width / step⌋. */
  static breakpoint(width: number, step: number): CrossFormula { return c('responsive-breakpoint', 'breakpoint(width, step) = ⌊width / step⌋', step > 0 ? Math.floor(width / step) : 0, nat(width, step) && step > 0, 'breakpoint', [width, step]) }
  /** FLUID SIZE: the midpoint size between a min and a max. value ⌊(min + max) / 2⌋. */
  static fluidsize(min: number, max: number): CrossFormula { return c('responsive-fluidsize', 'fluidsize(min, max) = ⌊(min + max) / 2⌋', Math.floor((min + max) / 2), nat(min, max) && min <= max, 'fluidsize', [min, max]) }
  /** COLUMNS: how many fixed-width columns fit a width. value ⌊width / colWidth⌋. */
  static columns(width: number, colWidth: number): CrossFormula { return c('responsive-columns', 'columns(width, colWidth) = ⌊width / colWidth⌋', colWidth > 0 ? Math.floor(width / colWidth) : 0, nat(width, colWidth) && colWidth > 0, 'columns', [width, colWidth]) }
  /** GUTTER: total gutter space shared across the columns. value ⌊total / cols⌋. */
  static gutter(total: number, cols: number): CrossFormula { return c('responsive-gutter', 'gutter(total, cols) = ⌊total / cols⌋', cols > 0 ? Math.floor(total / cols) : 0, nat(total, cols) && cols > 0, 'gutter', [total, cols]) }
  /** SCALE FACTOR: a base size stepped by a modular ratio. value base · ratio. */
  static scalefactor(base: number, ratio: number): CrossFormula { return c('responsive-scalefactor', 'scalefactor(base, ratio) = base · ratio', base * ratio, nat(base, ratio), 'scalefactor', [base, ratio]) }
  /** VIEWPORT UNITS: pixels from a viewport-width percentage. value ⌊vw · width / 100⌋. */
  static viewportunits(vw: number, width: number): CrossFormula { return c('responsive-viewportunits', 'viewportunits(vw, width) = ⌊vw · width / 100⌋', Math.floor((vw * width) / 100), nat(vw, width) && vw <= 100, 'viewportunits', [vw, width]) }
  /** ASPECT FIT: the height a width takes at an aspect ratio num:den. value ⌊width · den / num⌋. */
  static aspectfit(width: number, num: number, den: number): CrossFormula { return c('responsive-aspectfit', 'aspectfit(width, num, den) = ⌊width · den / num⌋', num > 0 ? Math.floor((width * den) / num) : 0, nat(width, num, den) && num > 0, 'aspectfit', [width, num, den]) }
  /** DENSITY: physical pixels for a CSS length at a device pixel ratio. value pixels · dppx. */
  static density(pixels: number, dppx: number): CrossFormula { return c('responsive-density', 'density(pixels, dppx) = pixels · dppx', pixels * dppx, nat(pixels, dppx), 'density', [pixels, dppx]) }
}

for (const name of ['aspectfit', 'breakpoint', 'columns', 'density', 'fluidsize', 'gutter', 'scalefactor', 'viewportunits'] as const)
  hexRegisterOf('responsive', name, (ResponsiveFormulas[name] as (...x: unknown[]) => unknown).bind(ResponsiveFormulas))
