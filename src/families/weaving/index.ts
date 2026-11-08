import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WEAVING — THE LOOM AS ARITHMETIC. A woven cloth is numbers: the thread count (warp ends plus weft picks), the warp and
 *  weft threads packed into an inch, the density of their crossings, the cover factor as a percentage, the loom's picks per
 *  minute, the width a warp spins into, and the grams per square metre. Crosses to `materials` — weaving is what a material
 *  is made into. A measure. */

const PROOF = 'weaving arithmetic (thread count, warp/weft per inch, crossing density, cover factor, loom pick rate, width, gsm); the loom as integers; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'weaving', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `weaving.${name}`, params })

export class WeavingFormulas {
  /** THREAD COUNT: warp ends plus weft picks. value warp + weft. */
  static threadcount(warp: number, weft: number): CrossFormula { return c('weaving-threadcount', 'threadcount(warp, weft) = warp + weft', warp + weft, nat(warp, weft), 'threadcount', [warp, weft]) }
  /** WARP per inch: warp ends over the width. value ⌊ends / width⌋. */
  static warp(ends: number, width: number): CrossFormula { return c('weaving-warp', 'warp(ends, width) = ⌊ends / width⌋', width > 0 ? Math.floor(ends / width) : 0, nat(ends, width) && width > 0, 'warp', [ends, width]) }
  /** WEFT per inch: weft picks over the width. value ⌊picks / width⌋. */
  static weft(picks: number, width: number): CrossFormula { return c('weaving-weft', 'weft(picks, width) = ⌊picks / width⌋', width > 0 ? Math.floor(picks / width) : 0, nat(picks, width) && width > 0, 'weft', [picks, width]) }
  /** DENSITY: the crossings of warp and weft. value warp · weft. */
  static density(warp: number, weft: number): CrossFormula { return c('weaving-density', 'density(warp, weft) = warp · weft', warp * weft, nat(warp, weft), 'density', [warp, weft]) }
  /** COVER FACTOR: threads laid against the maximum, as a percentage. value ⌊threads · 100 / max⌋. */
  static cover(threads: number, max: number): CrossFormula { return c('weaving-cover', 'cover(threads, max) = ⌊threads · 100 / max⌋', max > 0 ? Math.floor((threads * 100) / max) : 0, nat(threads, max) && max > 0 && threads <= max, 'cover', [threads, max]) }
  /** PICK RATE: the loom's picks over the minutes run. value ⌊picks / minutes⌋. */
  static pickrate(picks: number, minutes: number): CrossFormula { return c('weaving-pickrate', 'pickrate(picks, minutes) = ⌊picks / minutes⌋', minutes > 0 ? Math.floor(picks / minutes) : 0, nat(picks, minutes) && minutes > 0, 'pickrate', [picks, minutes]) }
  /** WIDTH: total warp ends at a given ends-per-inch. value ⌊ends / epi⌋. */
  static width(ends: number, epi: number): CrossFormula { return c('weaving-width', 'width(ends, epi) = ⌊ends / epi⌋', epi > 0 ? Math.floor(ends / epi) : 0, nat(ends, epi) && epi > 0, 'width', [ends, epi]) }
  /** GSM: grams over the area, as grams per square metre (1 m² = 10000 cm²). value ⌊grams · 10000 / area⌋. */
  static gsm(grams: number, area: number): CrossFormula { return c('weaving-gsm', 'gsm(grams, area) = ⌊grams · 10000 / area⌋', area > 0 ? Math.floor((grams * 10000) / area) : 0, nat(grams, area) && area > 0, 'gsm', [grams, area]) }
}

for (const name of ['cover', 'density', 'gsm', 'pickrate', 'threadcount', 'warp', 'weft', 'width'] as const)
  hexRegisterOf('weaving', name, (WeavingFormulas[name] as (...x: unknown[]) => unknown).bind(WeavingFormulas))
