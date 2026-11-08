import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SILAGE — FORAGE PRESERVATION AS ARITHMETIC. Ensiling a crop is numbers: the dry matter it holds, how dense the packed
 *  mass is, the dry matter fermentation costs, the acidity reached, the mass packed per layer, the daily feed-out, the
 *  volume a silo holds, and the moisture that remains. Crosses to `agriculture` — silage is what a farm preserves. A measure. */

const PROOF = 'silage arithmetic (dry matter, density, fermentation loss, pH, packing density, feed-out, capacity, moisture); forage preservation as a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'silage', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `silage.${name}`, params })

export class SilageFormulas {
  /** DRY MATTER: the dry fraction of the fresh crop, as a percentage. value ⌊dry · 100 / total⌋. */
  static drymatter(dry: number, total: number): CrossFormula { return c('silage-drymatter', 'drymatter(dry, total) = ⌊dry · 100 / total⌋', total > 0 ? Math.floor((dry * 100) / total) : 0, nat(dry, total) && total > 0 && dry <= total, 'drymatter', [dry, total]) }
  /** DENSITY: mass over the volume it fills. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('silage-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** FERMENTATION LOSS: dry matter lost in the ensiling, as a percentage. value ⌊loss · 100 / initial⌋. */
  static fermentationloss(loss: number, initial: number): CrossFormula { return c('silage-fermentationloss', 'fermentationloss(loss, initial) = ⌊loss · 100 / initial⌋', initial > 0 ? Math.floor((loss * 100) / initial) : 0, nat(loss, initial) && initial > 0 && loss <= initial, 'fermentationloss', [loss, initial]) }
  /** PH LEVEL: the average acidity (×10) over the samples read. value ⌊total / samples⌋. */
  static phlevel(total: number, samples: number): CrossFormula { return c('silage-phlevel', 'phlevel(total, samples) = ⌊total / samples⌋', samples > 0 ? Math.floor(total / samples) : 0, nat(total, samples) && samples > 0, 'phlevel', [total, samples]) }
  /** PACKING DENSITY: the mass packed across the layers. value layers · perLayer. */
  static packingdensity(layers: number, perLayer: number): CrossFormula { return c('silage-packingdensity', 'packingdensity(layers, perLayer) = layers · perLayer', layers * perLayer, nat(layers, perLayer), 'packingdensity', [layers, perLayer]) }
  /** FEED-OUT: the mass removed each day of the feeding period. value ⌊removed / days⌋. */
  static feedout(removed: number, days: number): CrossFormula { return c('silage-feedout', 'feedout(removed, days) = ⌊removed / days⌋', days > 0 ? Math.floor(removed / days) : 0, nat(removed, days) && days > 0, 'feedout', [removed, days]) }
  /** CAPACITY: the volume a silo holds, area by height. value area · height. */
  static capacity(area: number, height: number): CrossFormula { return c('silage-capacity', 'capacity(area, height) = area · height', area * height, nat(area, height), 'capacity', [area, height]) }
  /** MOISTURE: the water fraction of the fresh crop, as a percentage. value ⌊water · 100 / total⌋. */
  static moisture(water: number, total: number): CrossFormula { return c('silage-moisture', 'moisture(water, total) = ⌊water · 100 / total⌋', total > 0 ? Math.floor((water * 100) / total) : 0, nat(water, total) && total > 0 && water <= total, 'moisture', [water, total]) }
}

for (const name of ['capacity', 'density', 'drymatter', 'feedout', 'fermentationloss', 'moisture', 'packingdensity', 'phlevel'] as const)
  hexRegisterOf('silage', name, (SilageFormulas[name] as (...x: unknown[]) => unknown).bind(SilageFormulas))
