import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DIFFRACTION — WAVES BENT AND SPREAD BY APERTURES AND GRATINGS, AS ARITHMETIC (integer proxies, no trigonometry). The
 *  bending of light is numbers: the order of a maximum, the spacing a grating's lines imply, a grating's resolving power,
 *  the fringe spacing of a two-slit pattern, the Bragg order off a crystal plane, an aperture in wavelengths, the Rayleigh
 *  resolution limit, and the path difference across a slit. Crosses to `electromagnetism` — diffraction is what light does. A measure. */

const PROOF = 'diffraction arithmetic (grating order, slit spacing, resolving power, fringe spacing, Bragg order, aperture in wavelengths, Rayleigh limit, path difference); integer proxies, no trigonometry; a measure crossed to electromagnetism'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'diffraction', dst: 'electromagnetism', formula, value, proof: PROOF, ...extra }, holds, { name: `diffraction.${name}`, params })

export class DiffractionFormulas {
  /** GRATING ORDER: the path of the m-th constructive maximum. value order · wave. */
  static gratingorder(order: number, wave: number): CrossFormula { return c('diffraction-gratingorder', 'gratingorder(order, wave) = order · wave', order * wave, nat(order, wave), 'gratingorder', [order, wave]) }
  /** SLIT SPACING: a grating's line spacing from its width and line count. value ⌊width / lines⌋. */
  static slitspacing(width: number, lines: number): CrossFormula { return c('diffraction-slitspacing', 'slitspacing(width, lines) = ⌊width / lines⌋', lines > 0 ? Math.floor(width / lines) : 0, nat(width, lines) && lines > 0, 'slitspacing', [width, lines]) }
  /** RESOLVING POWER: a grating's power at an order over its illuminated lines. value order · lines. */
  static resolvingpower(order: number, lines: number): CrossFormula { return c('diffraction-resolvingpower', 'resolvingpower(order, lines) = order · lines', order * lines, nat(order, lines), 'resolvingpower', [order, lines]) }
  /** FRINGE SPACING: a two-slit pattern's fringe spacing on a screen. value ⌊wave · dist / slit⌋. */
  static fringespacing(wave: number, dist: number, slit: number): CrossFormula { return c('diffraction-fringespacing', 'fringespacing(wave, dist, slit) = ⌊wave · dist / slit⌋', slit > 0 ? Math.floor((wave * dist) / slit) : 0, nat(wave, dist, slit) && slit > 0, 'fringespacing', [wave, dist, slit]) }
  /** BRAGG ORDER: the order off a crystal plane, 2·spacing the base. value ⌊order · wave / (2 · spacing)⌋. */
  static braggangle(order: number, wave: number, spacing: number): CrossFormula { return c('diffraction-braggangle', 'braggangle(order, wave, spacing) = ⌊order · wave / (2 · spacing)⌋', spacing > 0 ? Math.floor((order * wave) / (2 * spacing)) : 0, nat(order, wave, spacing) && spacing > 0, 'braggangle', [order, wave, spacing]) }
  /** APERTURE: an aperture's diameter counted in wavelengths. value ⌊diameter / wave⌋. */
  static aperture(diameter: number, wave: number): CrossFormula { return c('diffraction-aperture', 'aperture(diameter, wave) = ⌊diameter / wave⌋', wave > 0 ? Math.floor(diameter / wave) : 0, nat(diameter, wave) && wave > 0, 'aperture', [diameter, wave]) }
  /** RAYLEIGH CRITERION: the resolution limit, 1.22 carried as 122. value ⌊122 · wave / diameter⌋. */
  static rayleighcriterion(wave: number, diameter: number): CrossFormula { return c('diffraction-rayleighcriterion', 'rayleighcriterion(wave, diameter) = ⌊122 · wave / diameter⌋', diameter > 0 ? Math.floor((122 * wave) / diameter) : 0, nat(wave, diameter) && diameter > 0, 'rayleighcriterion', [wave, diameter]) }
  /** PATH DIFFERENCE: the path difference across a slit at an order. value spacing · order. */
  static pathdifference(spacing: number, order: number): CrossFormula { return c('diffraction-pathdifference', 'pathdifference(spacing, order) = spacing · order', spacing * order, nat(spacing, order), 'pathdifference', [spacing, order]) }
}

for (const name of ['aperture', 'braggangle', 'fringespacing', 'gratingorder', 'pathdifference', 'rayleighcriterion', 'resolvingpower', 'slitspacing'] as const)
  hexRegisterOf('diffraction', name, (DiffractionFormulas[name] as (...x: unknown[]) => unknown).bind(DiffractionFormulas))
