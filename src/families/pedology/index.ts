import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PEDOLOGY — SOIL SCIENCE, AS ARITHMETIC. The soil is numbers: pore space, how much water it holds, how acid it runs,
 *  the organic carbon in it, how fast water soaks in, its texture, how much it erodes, and how much it feeds a crop.
 *  Crosses to `agriculture` — the soil is what a field is grown on. A measure. */

const PROOF = 'pedology arithmetic (porosity, moisture, pH, organic carbon, infiltration, texture, erosion, fertility); soil science as integers; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pedology', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `pedology.${name}`, params })

export class PedologyFormulas {
  /** POROSITY: void space as a percentage of the bulk volume. value ⌊voids · 100 / volume⌋. */
  static porosity(voids: number, volume: number): CrossFormula { return c('pedology-porosity', 'porosity(voids, volume) = ⌊voids · 100 / volume⌋', volume > 0 ? Math.floor((voids * 100) / volume) : 0, nat(voids, volume) && volume > 0 && voids <= volume, 'porosity', [voids, volume]) }
  /** MOISTURE: gravimetric water content against the dry mass, as a percentage. value ⌊water · 100 / dry⌋. */
  static moisture(water: number, dry: number): CrossFormula { return c('pedology-moisture', 'moisture(water, dry) = ⌊water · 100 / dry⌋', dry > 0 ? Math.floor((water * 100) / dry) : 0, nat(water, dry) && dry > 0, 'moisture', [water, dry]) }
  /** PH: acidity against the base, as a percentage. value ⌊acid · 100 / base⌋. */
  static ph(acid: number, base: number): CrossFormula { return c('pedology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) }
  /** ORGANIC: organic carbon as a percentage of the total mass. value ⌊carbon · 100 / total⌋. */
  static organic(carbon: number, total: number): CrossFormula { return c('pedology-organic', 'organic(carbon, total) = ⌊carbon · 100 / total⌋', total > 0 ? Math.floor((carbon * 100) / total) : 0, nat(carbon, total) && total > 0 && carbon <= total, 'organic', [carbon, total]) }
  /** INFILTRATION: the volume that soaks in over time. value ⌊volume / time⌋. */
  static infiltration(volume: number, time: number): CrossFormula { return c('pedology-infiltration', 'infiltration(volume, time) = ⌊volume / time⌋', time > 0 ? Math.floor(volume / time) : 0, nat(volume, time) && time > 0, 'infiltration', [volume, time]) }
  /** TEXTURE: sand against clay, as a percentage. value ⌊sand · 100 / clay⌋. */
  static texture(sand: number, clay: number): CrossFormula { return c('pedology-texture', 'texture(sand, clay) = ⌊sand · 100 / clay⌋', clay > 0 ? Math.floor((sand * 100) / clay) : 0, nat(sand, clay) && clay > 0, 'texture', [sand, clay]) }
  /** EROSION: soil lost per unit area. value ⌊lost / area⌋. */
  static erosion(lost: number, area: number): CrossFormula { return c('pedology-erosion', 'erosion(lost, area) = ⌊lost / area⌋', area > 0 ? Math.floor(lost / area) : 0, nat(lost, area) && area > 0, 'erosion', [lost, area]) }
  /** FERTILITY: nutrients available per crop. value ⌊nutrients / crops⌋. */
  static fertility(nutrients: number, crops: number): CrossFormula { return c('pedology-fertility', 'fertility(nutrients, crops) = ⌊nutrients / crops⌋', crops > 0 ? Math.floor(nutrients / crops) : 0, nat(nutrients, crops) && crops > 0, 'fertility', [nutrients, crops]) }
}

for (const name of ['erosion', 'fertility', 'infiltration', 'moisture', 'organic', 'ph', 'porosity', 'texture'] as const)
  hexRegisterOf('pedology', name, (PedologyFormulas[name] as (...x: unknown[]) => unknown).bind(PedologyFormulas))
