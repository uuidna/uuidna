import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** UPLOAD — THE PAYLOAD CMS UPLOAD / MEDIA API, AS ARITHMETIC. An uploaded image is numbers: its pixel area, its aspect
 *  ratio, a resized dimension, a re-encoded quality, a thumbnail sheet, the bytes a raw bitmap takes, whether it fits a
 *  size limit, and how much of a crop is kept. Crosses to `payload` — upload is the media layer Payload stores. A measure. */

const PROOF = 'upload arithmetic (image area, aspect ratio, resize, quality, thumbnail sheet, raw filesize, size limit, crop); the Payload CMS upload/media API as exact integers; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'upload', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `upload.${name}`, params })

export class UploadFormulas {
  /** AREA: the pixels of an image. value width · height. */
  static area(width: number, height: number): CrossFormula { return c('upload-area', 'area(width, height) = width · height', width * height, nat(width, height), 'area', [width, height]) }
  /** ASPECT ratio, times a hundred. value ⌊width · 100 / height⌋. */
  static aspect(width: number, height: number): CrossFormula { return c('upload-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) }
  /** RESIZE a dimension by a percentage. value ⌊dim · pct / 100⌋. */
  static resize(dim: number, pct: number): CrossFormula { return c('upload-resize', 'resize(dim, pct) = ⌊dim · pct / 100⌋', Math.floor((dim * pct) / 100), nat(dim, pct), 'resize', [dim, pct]) }
  /** QUALITY: the bytes left after re-encoding at a percentage. value ⌊bytes · pct / 100⌋. */
  static quality(bytes: number, pct: number): CrossFormula { return c('upload-quality', 'quality(bytes, pct) = ⌊bytes · pct / 100⌋', Math.floor((bytes * pct) / 100), nat(bytes, pct), 'quality', [bytes, pct]) }
  /** THUMBNAIL sheet: a square size times the count. value size · count. */
  static thumbnail(size: number, count: number): CrossFormula { return c('upload-thumbnail', 'thumbnail(size, count) = size · count', size * count, nat(size, count), 'thumbnail', [size, count]) }
  /** FILESIZE: the bytes a raw bitmap of so many pixels at a bit depth takes. value ⌊pixels · depth / 8⌋. */
  static filesize(pixels: number, depth: number): CrossFormula { return c('upload-filesize', 'filesize(pixels, depth) = ⌊pixels · depth / 8⌋', Math.floor((pixels * depth) / 8), nat(pixels, depth), 'filesize', [pixels, depth]) }
  /** WITHIN the size limit: 1 when the file fits. value [size ≤ max]. */
  static within(size: number, max: number): CrossFormula { return c('upload-within', 'within(size, max) = [size ≤ max]', size <= max ? 1 : 0, nat(size, max), 'within', [size, max]) }
  /** CROP: the percentage of an image kept. value ⌊kept · 100 / total⌋. */
  static crop(kept: number, total: number): CrossFormula { return c('upload-crop', 'crop(kept, total) = ⌊kept · 100 / total⌋', total > 0 ? Math.floor((kept * 100) / total) : 0, nat(kept, total) && total > 0 && kept <= total, 'crop', [kept, total]) }
}

for (const name of ['area', 'aspect', 'crop', 'filesize', 'quality', 'resize', 'thumbnail', 'within'] as const)
  hexRegisterOf('upload', name, (UploadFormulas[name] as (...x: unknown[]) => unknown).bind(UploadFormulas))
