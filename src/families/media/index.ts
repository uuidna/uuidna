import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MEDIA — THE MEDIA BLOCK USE CASE FROM payloadcms/website, AS ARITHMETIC. A picture on a page is numbers: its aspect
 *  ratio, the rows a gallery lays out, how much loads below the fold, whether a caption fits, how many sizes are rendered,
 *  how a width fits its container, how long the bytes take to load, and whether it is landscape. Crosses to `payload` — the
 *  Media block is a Payload field. A measure. */

const PROOF = 'media arithmetic (aspect ratio, gallery rows, lazy below-fold, caption fit, rendered sizes, container fit, load time, landscape); the Media block use case from payloadcms/website; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'media', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `media.${name}`, params })

export class MediaFormulas {
  /** ASPECT RATIO as a percentage of width over height. value ⌊width · 100 / height⌋. */
  static aspect(width: number, height: number): CrossFormula { return c('media-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) }
  /** GALLERY: the rows a count of items lays out at a column count. value ⌈items / cols⌉. */
  static gallery(items: number, cols: number): CrossFormula { return c('media-gallery', 'gallery(items, cols) = ⌈items / cols⌉', cols > 0 ? Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'gallery', [items, cols]) }
  /** LAZY: the percentage of images below the fold that defer loading. value ⌊below · 100 / total⌋. */
  static lazy(below: number, total: number): CrossFormula { return c('media-lazy', 'lazy(below, total) = ⌊below · 100 / total⌋', total > 0 ? Math.floor((below * 100) / total) : 0, nat(below, total) && total > 0 && below <= total, 'lazy', [below, total]) }
  /** CAPTION: 1 when the caption fits within the maximum characters. value [chars ≤ max]. */
  static caption(chars: number, max: number): CrossFormula { return c('media-caption', 'caption(chars, max) = [chars ≤ max]', chars <= max ? 1 : 0, nat(chars, max), 'caption', [chars, max]) }
  /** SIZES: the number of responsive sizes rendered. value count. */
  static sizes(count: number): CrossFormula { return c('media-sizes', 'sizes(count) = count', count, nat(count), 'sizes', [count]) }
  /** FIT: how a width fills its container, as a percentage. value ⌊width · 100 / container⌋. */
  static fit(width: number, container: number): CrossFormula { return c('media-fit', 'fit(width, container) = ⌊width · 100 / container⌋', container > 0 ? Math.floor((width * 100) / container) : 0, nat(width, container) && container > 0, 'fit', [width, container]) }
  /** LOAD: the seconds the bytes take to load at a byte rate. value ⌊bytes / rate⌋. */
  static load(bytes: number, rate: number): CrossFormula { return c('media-load', 'load(bytes, rate) = ⌊bytes / rate⌋', rate > 0 ? Math.floor(bytes / rate) : 0, nat(bytes, rate) && rate > 0, 'load', [bytes, rate]) }
  /** RATIO: 1 when the image is landscape (width ≥ height). value [w ≥ h]. */
  static ratio(w: number, h: number): CrossFormula { return c('media-ratio', 'ratio(w, h) = [w ≥ h]', w >= h ? 1 : 0, nat(w, h), 'ratio', [w, h]) }
}

for (const name of ['aspect', 'caption', 'fit', 'gallery', 'lazy', 'load', 'ratio', 'sizes'] as const)
  hexRegisterOf('media', name, (MediaFormulas[name] as (...x: unknown[]) => unknown).bind(MediaFormulas))
