import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOLID — THREE-DIMENSIONAL SHAPE, AS ARITHMETIC. A solid is numbers: the volume a cube, cuboid, prism or pyramid
 *  encloses, the surface a cube or cuboid presents, and integer proxies for the sphere and cylinder. Crosses to
 *  `geometry` — a solid is geometry carried into the third dimension. A measure. */

const PROOF = 'solid arithmetic (cube/cuboid/prism/pyramid volume, cube/cuboid surface, sphere/cylinder integer proxies); geometry carried into three dimensions; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'solid', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `solid.${name}`, params })

export class SolidFormulas {
  /** CUBE VOLUME: a side cubed. value side³. */
  static cubevolume(side: number): CrossFormula { return c('solid-cubevolume', 'cubevolume(side) = side³', side * side * side, nat(side), 'cubevolume', [side]) }
  /** CUBOID VOLUME: length by width by height. value l · w · h. */
  static cuboidvolume(l: number, w: number, h: number): CrossFormula { return c('solid-cuboidvolume', 'cuboidvolume(l, w, h) = l · w · h', l * w * h, nat(l, w, h), 'cuboidvolume', [l, w, h]) }
  /** PRISM VOLUME: base area carried along a height. value base · height. */
  static prismvolume(base: number, height: number): CrossFormula { return c('solid-prismvolume', 'prismvolume(base, height) = base · height', base * height, nat(base, height), 'prismvolume', [base, height]) }
  /** PYRAMID VOLUME: a third of base area times height. value ⌊base · height / 3⌋. */
  static pyramidvolume(base: number, height: number): CrossFormula { return c('solid-pyramidvolume', 'pyramidvolume(base, height) = ⌊base · height / 3⌋', Math.floor((base * height) / 3), nat(base, height), 'pyramidvolume', [base, height]) }
  /** CUBE SURFACE: six square faces. value 6 · side². */
  static cubesurface(side: number): CrossFormula { return c('solid-cubesurface', 'cubesurface(side) = 6 · side²', 6 * side * side, nat(side), 'cubesurface', [side]) }
  /** CUBOID SURFACE: twice the three distinct faces. value 2 · (l·w + w·h + l·h). */
  static cuboidsurface(l: number, w: number, h: number): CrossFormula { return c('solid-cuboidsurface', 'cuboidsurface(l, w, h) = 2 · (l·w + w·h + l·h)', 2 * (l * w + w * h + l * h), nat(l, w, h), 'cuboidsurface', [l, w, h]) }
  /** SPHERE VOLUME (integer proxy): ⌊4·314·r³/300⌋ approximates 4πr³/3. value ⌊4 · 314 · r³ / 300⌋. */
  static spherevolumeproxy(r: number): CrossFormula { return c('solid-spherevolumeproxy', 'spherevolumeproxy(r) = ⌊4 · 314 · r³ / 300⌋', Math.floor((4 * 314 * (r * r * r)) / 300), nat(r), 'spherevolumeproxy', [r]) }
  /** CYLINDER VOLUME (integer proxy): ⌊314·r²·h/100⌋ approximates πr²h. value ⌊314 · r² · h / 100⌋. */
  static cylindervolumeproxy(r: number, h: number): CrossFormula { return c('solid-cylindervolumeproxy', 'cylindervolumeproxy(r, h) = ⌊314 · r² · h / 100⌋', Math.floor((314 * (r * r) * h) / 100), nat(r, h), 'cylindervolumeproxy', [r, h]) }
}

for (const name of ['cubesurface', 'cubevolume', 'cuboidsurface', 'cuboidvolume', 'cylindervolumeproxy', 'prismvolume', 'pyramidvolume', 'spherevolumeproxy'] as const)
  hexRegisterOf('solid', name, (SolidFormulas[name] as (...x: unknown[]) => unknown).bind(SolidFormulas))
