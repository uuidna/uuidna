import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** CARTOGRAPHY — MAPPING THE GROUND AS ARITHMETIC. A map is numbers: the scale a ground distance maps to, a pixel
 *  distance on the ground, contour lines by interval, projection distortion, the resolution of an area in pixels,
 *  a compass bearing normalised, the area of a region, and the tiles a zoom level covers. Crosses to `geography` —
 *  cartography draws what geography measures. A measure. */

const PROOF = 'cartography arithmetic (map scale, pixel distance, contour lines, projection distortion, resolution, bearing, area, zoom tiles); the ground as a drawing; a measure crossed to geography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cartography', dst: 'geography', formula, value, proof: PROOF, ...extra }, holds, { name: `cartography.${name}`, params })

export class CartographyFormulas {
  /** AREA: a region's length by width. value length · width. */
  static area(length: number, width: number): CrossFormula { return c('cartography-area', 'area(length, width) = length · width', length * width, nat(length, width), 'area', [length, width]) }
  /** BEARING: a compass direction normalised to [0, 360). value ((degrees mod 360) + 360) mod 360. */
  static bearing(degrees: number): CrossFormula { return c('cartography-bearing', 'bearing(degrees) = ((degrees mod 360) + 360) mod 360', ((degrees % fullTurn) + fullTurn) % fullTurn, Number.isSafeInteger(degrees), 'bearing', [degrees]) }
  /** CONTOUR: the contour line an elevation falls on at a spacing. value ⌊elevation / interval⌋. */
  static contour(elevation: number, interval: number): CrossFormula { return c('cartography-contour', 'contour(elevation, interval) = ⌊elevation / interval⌋', interval > 0 ? Math.floor(elevation / interval) : 0, nat(elevation, interval) && interval > 0, 'contour', [elevation, interval]) }
  /** DISTANCE: pixels on the map at a scale, as ground distance. value pixels · scale. */
  static distance(pixels: number, scale_: number): CrossFormula { return c('cartography-distance', 'distance(pixels, scale_) = pixels · scale_', pixels * scale_, nat(pixels, scale_), 'distance', [pixels, scale_]) }
  /** DISTORTION: a projected length against the true length, as a percentage. value ⌊projected · 100 / true_⌋. */
  static distortion(projected: number, true_: number): CrossFormula { return c('cartography-distortion', 'distortion(projected, true_) = ⌊projected · 100 / true_⌋', true_ > 0 ? Math.floor((projected * 100) / true_) : 0, nat(projected, true_) && true_ > 0, 'distortion', [projected, true_]) }
  /** RESOLUTION: an area over the pixels that render it. value ⌊area / pixels⌋. */
  static resolution(area: number, pixels: number): CrossFormula { return c('cartography-resolution', 'resolution(area, pixels) = ⌊area / pixels⌋', pixels > 0 ? Math.floor(area / pixels) : 0, nat(area, pixels) && pixels > 0, 'resolution', [area, pixels]) }
  /** SCALE: a ground distance against a map distance. value ⌊ground / map⌋. */
  static scale(ground: number, map: number): CrossFormula { return c('cartography-scale', 'scale(ground, map) = ⌊ground / map⌋', map > 0 ? Math.floor(ground / map) : 0, nat(ground, map) && map > 0, 'scale', [ground, map]) }
  /** ZOOM: the tiles a zoom level covers, quadrupling per level. value tiles · 4^levels. */
  static zoom(tiles: number, levels: number): CrossFormula { return c('cartography-zoom', 'zoom(tiles, levels) = tiles · 4^levels', tiles * (4 ** levels), nat(tiles, levels), 'zoom', [tiles, levels]) }
}

for (const name of ['area', 'bearing', 'contour', 'distance', 'distortion', 'resolution', 'scale', 'zoom'] as const)
  hexRegisterOf('cartography', name, (CartographyFormulas[name] as (...x: unknown[]) => unknown).bind(CartographyFormulas))
