import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RASTER — THE BITMAP IMAGE AS ARITHMETIC. A raster image is numbers: the pixels a frame holds, its resolution in
 *  dots per inch, the bytes it costs on disk, its aspect ratio, its megapixel count, the bits a pixel carries, the
 *  ratio a codec compresses it by, and the size a scale factor gives it. Crosses to `optics` — a raster is what an
 *  optical sensor samples. A measure. */

const PROOF = 'raster arithmetic (pixels, dpi, file size, aspect ratio, megapixels, bit depth, compression, scaling); the bitmap image as whole-number measures; crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'raster', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `raster.${name}`, params })

export class RasterFormulas {
  /** PIXELS: the pixels a frame holds. value width · height. */
  static pixels(width: number, height: number): CrossFormula { return c('raster-pixels', 'pixels(width, height) = width · height', width * height, nat(width, height), 'pixels', [width, height]) }
  /** DPI: dots per inch across a span. value ⌊pixels / inches⌋. */
  static dpi(pixels: number, inches: number): CrossFormula { return c('raster-dpi', 'dpi(pixels, inches) = ⌊pixels / inches⌋', inches > 0 ? Math.floor(pixels / inches) : 0, nat(pixels, inches) && inches > 0, 'dpi', [pixels, inches]) }
  /** FILE SIZE: pixels at a bytes-per-pixel cost. value pixels · bytes. */
  static filesize(pixels: number, bytes: number): CrossFormula { return c('raster-filesize', 'filesize(pixels, bytes) = pixels · bytes', pixels * bytes, nat(pixels, bytes), 'filesize', [pixels, bytes]) }
  /** ASPECT RATIO: width over height, scaled by a hundred. value ⌊width · 100 / height⌋. */
  static aspectratio(width: number, height: number): CrossFormula { return c('raster-aspectratio', 'aspectratio(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspectratio', [width, height]) }
  /** MEGAPIXELS: the frame in millions of pixels. value ⌊width · height / 1000000⌋. */
  static megapixels(width: number, height: number): CrossFormula { return c('raster-megapixels', 'megapixels(width, height) = ⌊width · height / 1000000⌋', Math.floor((width * height) / 1000000), nat(width, height), 'megapixels', [width, height]) }
  /** BIT DEPTH: the bits a pixel carries across its channels. value channels · bits. */
  static bitdepth(channels: number, bits: number): CrossFormula { return c('raster-bitdepth', 'bitdepth(channels, bits) = channels · bits', channels * bits, nat(channels, bits), 'bitdepth', [channels, bits]) }
  /** COMPRESSION: the ratio a codec shrinks by. value ⌊original / compressed⌋. */
  static compression(original: number, compressed: number): CrossFormula { return c('raster-compression', 'compression(original, compressed) = ⌊original / compressed⌋', compressed > 0 ? Math.floor(original / compressed) : 0, nat(original, compressed) && compressed > 0, 'compression', [original, compressed]) }
  /** SCALING: a size under a scale factor. value size · factor. */
  static scaling(size: number, factor: number): CrossFormula { return c('raster-scaling', 'scaling(size, factor) = size · factor', size * factor, nat(size, factor), 'scaling', [size, factor]) }
}

for (const name of ['aspectratio', 'bitdepth', 'compression', 'dpi', 'filesize', 'megapixels', 'pixels', 'scaling'] as const)
  hexRegisterOf('raster', name, (RasterFormulas[name] as (...x: unknown[]) => unknown).bind(RasterFormulas))
