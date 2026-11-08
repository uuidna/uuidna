import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LENSES — GEOMETRIC OPTICS AS ARITHMETIC (chosen by the public-API registry, not by hand). A lens is numbers: the
 *  focal length an object and image fix, magnification, the f-number, optical power, the image distance the thin-lens
 *  law gives, field of view, numerical aperture, and hyperfocal depth of field. Crosses to `optics` — a lens is what
 *  optics describes. A measure. */

const PROOF = 'lenses arithmetic (focal length, magnification, f-number, optical power, image distance, field of view, numerical aperture, depth of field); the thin-lens law as integers; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lenses', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `lenses.${name}`, params })

export class LensesFormulas {
  /** DEPTH OF FIELD (hyperfocal distance): focal length squared over f-number times circle of confusion. value ⌊f² / (N · coc)⌋. */
  static depthoffield(f: number, N: number, coc: number): CrossFormula { const d = N * coc; return c('lenses-depthoffield', 'depthoffield(f, N, coc) = ⌊f² / (N · coc)⌋', d > 0 ? Math.floor((f * f) / d) : 0, nat(f, N, coc) && N > 0 && coc > 0, 'depthoffield', [f, N, coc]) }
  /** FIELD OF VIEW: the width a sensor sees at a distance through a lens. value ⌊distance · sensor / f⌋. */
  static fieldofview(distance: number, sensor: number, f: number): CrossFormula { return c('lenses-fieldofview', 'fieldofview(distance, sensor, f) = ⌊distance · sensor / f⌋', f > 0 ? Math.floor((distance * sensor) / f) : 0, nat(distance, sensor, f) && f > 0, 'fieldofview', [distance, sensor, f]) }
  /** F-NUMBER: focal length over aperture diameter. value ⌊f / D⌋. */
  static fnumber(f: number, D: number): CrossFormula { return c('lenses-fnumber', 'fnumber(f, D) = ⌊f / D⌋', D > 0 ? Math.floor(f / D) : 0, nat(f, D) && D > 0, 'fnumber', [f, D]) }
  /** FOCAL LENGTH from an object and image distance (thin lens). value ⌊obj · img / (obj + img)⌋. */
  static focallength(obj: number, img: number): CrossFormula { const s = obj + img; return c('lenses-focallength', 'focallength(obj, img) = ⌊obj · img / (obj + img)⌋', s > 0 ? Math.floor((obj * img) / s) : 0, nat(obj, img) && s > 0, 'focallength', [obj, img]) }
  /** IMAGE DISTANCE from object distance and focal length (thin lens). value ⌊obj · f / (obj − f)⌋. */
  static imagedistance(obj: number, f: number): CrossFormula { const d = Math.max(0, obj - f); return c('lenses-imagedistance', 'imagedistance(obj, f) = ⌊obj · f / (obj − f)⌋', d > 0 ? Math.floor((obj * f) / d) : 0, nat(obj, f) && d > 0, 'imagedistance', [obj, f]) }
  /** MAGNIFICATION: image distance over object distance. value ⌊img / obj⌋. */
  static magnification(img: number, obj: number): CrossFormula { return c('lenses-magnification', 'magnification(img, obj) = ⌊img / obj⌋', obj > 0 ? Math.floor(img / obj) : 0, nat(img, obj) && obj > 0, 'magnification', [img, obj]) }
  /** NUMERICAL APERTURE (scaled ×1000): half the aperture over focal length. value ⌊500 · D / f⌋. */
  static numericalaperture(D: number, f: number): CrossFormula { return c('lenses-numericalaperture', 'numericalaperture(D, f) = ⌊500 · D / f⌋', f > 0 ? Math.floor((500 * D) / f) : 0, nat(D, f) && f > 0, 'numericalaperture', [D, f]) }
  /** OPTICAL POWER in diopters: a thousand over the focal length (mm). value ⌊1000 / f⌋. */
  static power(f: number): CrossFormula { return c('lenses-power', 'power(f) = ⌊1000 / f⌋', f > 0 ? Math.floor(1000 / f) : 0, nat(f) && f > 0, 'power', [f]) }
}

for (const name of ['depthoffield', 'fieldofview', 'fnumber', 'focallength', 'imagedistance', 'magnification', 'numericalaperture', 'power'] as const)
  hexRegisterOf('lenses', name, (LensesFormulas[name] as (...x: unknown[]) => unknown).bind(LensesFormulas))
