import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ImageFormulas — 8 exact-integer formulas of the image domain, each at a hex address crossing to cross; develops the image leads. */

const PROOF = "image counts: pixels(x, y) = x · y; bytesrgb(x, y, z) = x · y · z; mipmaps(x, y) = x + y; stride(x, y) = x · y; channels(x, y) = x + y; aspect(x, y) = x / y; blocks(x, y) = ceil(x / y); palettebits(x) = 2^x"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'image', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `image.${name}`, params })

export class ImageFormulas {
  /** pixels(x, y) = x · y. */
  static pixels(x: number, y: number): CrossFormula { return f('image-pixels', 'pixels(x, y) = x · y', x * y, nat(x, y), 'pixels', [x, y]) }
  /** bytesrgb(x, y, z) = x · y · z. */
  static bytesrgb(x: number, y: number, z: number): CrossFormula { return f('image-bytesrgb', 'bytesrgb(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'bytesrgb', [x, y, z]) }
  /** mipmaps(x, y) = x + y. */
  static mipmaps(x: number, y: number): CrossFormula { return f('image-mipmaps', 'mipmaps(x, y) = x + y', x + y, nat(x, y), 'mipmaps', [x, y]) }
  /** stride(x, y) = x · y. */
  static stride(x: number, y: number): CrossFormula { return f('image-stride', 'stride(x, y) = x · y', x * y, nat(x, y), 'stride', [x, y]) }
  /** channels(x, y) = x + y. */
  static channels(x: number, y: number): CrossFormula { return f('image-channels', 'channels(x, y) = x + y', x + y, nat(x, y), 'channels', [x, y]) }
  /** aspect(x, y) = x / y. */
  static aspect(x: number, y: number): CrossFormula { return f('image-aspect', 'aspect(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'aspect', [x, y]) }
  /** blocks(x, y) = ceil(x / y). */
  static blocks(x: number, y: number): CrossFormula { return f('image-blocks', 'blocks(x, y) = ceil(x / y)', y > 0 ? Math.floor((x + y - 1) / y) : 0, nat(x, y) && y > 0, 'blocks', [x, y]) }
  /** palettebits(x) = 2^x. */
  static palettebits(x: number): CrossFormula { return f('image-palettebits', 'palettebits(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'palettebits', [x]) }
}

for (const name of ['aspect', 'blocks', 'bytesrgb', 'channels', 'mipmaps', 'palettebits', 'pixels', 'stride'] as const)
  hexRegisterOf('image', name, (ImageFormulas[name] as (...x: unknown[]) => unknown).bind(ImageFormulas))
