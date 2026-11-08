import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VITICULTURE — THE GROWING OF GRAPES FOR WINE, AS ARITHMETIC (chosen by the agriculture registry, not by hand). A vineyard
 *  is numbers: sugar as brix, the crop a vine carries, how ripe the fruit is, acidity, growing degree days, planting density,
 *  fermentation progress, and tannin from the skins. Crosses to `agriculture` — viticulture is agriculture of the vine. A measure. */

const PROOF = 'viticulture arithmetic (brix, crop load, ripeness, acidity, growing degree days, planting density, fermentation, tannin); a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'viticulture', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `viticulture.${name}`, params })

export class ViticultureFormulas {
  /** ACIDITY: acid per thousand of volume. value ⌊acid · 1000 / volume⌋. */
  static acidity(acid: number, volume: number): CrossFormula { return c('viticulture-acidity', 'acidity(acid, volume) = ⌊acid · 1000 / volume⌋', volume > 0 ? Math.floor((acid * 1000) / volume) : 0, nat(acid, volume) && volume > 0, 'acidity', [acid, volume]) }
  /** BRIX: sugar as a percentage of juice. value ⌊sugar · 100 / juice⌋. */
  static brix(sugar: number, juice: number): CrossFormula { return c('viticulture-brix', 'brix(sugar, juice) = ⌊sugar · 100 / juice⌋', juice > 0 ? Math.floor((sugar * 100) / juice) : 0, nat(sugar, juice) && juice > 0 && sugar <= juice, 'brix', [sugar, juice]) }
  /** CROP LOAD: grapes a vine carries. value ⌊grapes / vines⌋. */
  static cropload(grapes: number, vines: number): CrossFormula { return c('viticulture-cropload', 'cropload(grapes, vines) = ⌊grapes / vines⌋', vines > 0 ? Math.floor(grapes / vines) : 0, nat(grapes, vines) && vines > 0, 'cropload', [grapes, vines]) }
  /** PLANTING DENSITY: vines over the area. value ⌊vines / area⌋. */
  static density(vines: number, area: number): CrossFormula { return c('viticulture-density', 'density(vines, area) = ⌊vines / area⌋', area > 0 ? Math.floor(vines / area) : 0, nat(vines, area) && area > 0, 'density', [vines, area]) }
  /** FERMENTATION: sugar converted as a percentage. value ⌊converted · 100 / sugar⌋. */
  static fermentation(converted: number, sugar: number): CrossFormula { return c('viticulture-fermentation', 'fermentation(converted, sugar) = ⌊converted · 100 / sugar⌋', sugar > 0 ? Math.floor((converted * 100) / sugar) : 0, nat(converted, sugar) && sugar > 0 && converted <= sugar, 'fermentation', [converted, sugar]) }
  /** GROWING DEGREE DAYS: heat above a base. value max(0, temperature − base). */
  static gdd(temperature: number, base: number): CrossFormula { return c('viticulture-gdd', 'gdd(temperature, base) = max(0, temperature − base)', Math.max(0, temperature - base), nat(temperature, base), 'gdd', [temperature, base]) }
  /** RIPENESS: current sugar toward the target. value ⌊current · 100 / target⌋. */
  static ripeness(current: number, target: number): CrossFormula { return c('viticulture-ripeness', 'ripeness(current, target) = ⌊current · 100 / target⌋', target > 0 ? Math.floor((current * 100) / target) : 0, nat(current, target) && target > 0, 'ripeness', [current, target]) }
  /** TANNIN: extracted over the skins. value ⌊extracted / skins⌋. */
  static tannin(extracted: number, skins: number): CrossFormula { return c('viticulture-tannin', 'tannin(extracted, skins) = ⌊extracted / skins⌋', skins > 0 ? Math.floor(extracted / skins) : 0, nat(extracted, skins) && skins > 0, 'tannin', [extracted, skins]) }
}

for (const name of ['acidity', 'brix', 'cropload', 'density', 'fermentation', 'gdd', 'ripeness', 'tannin'] as const)
  hexRegisterOf('viticulture', name, (ViticultureFormulas[name] as (...x: unknown[]) => unknown).bind(ViticultureFormulas))
