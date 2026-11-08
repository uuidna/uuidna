import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PETROLOGY — ROCKS AS ARITHMETIC (chosen by the mineral registry, not by hand). A rock is numbers: the color index of its
 *  dark minerals, its silica weight, the void space it holds, the density of its grains, how far a melt has differentiated,
 *  how much has crystallized, the modal share of a mineral, and the fraction still molten. Crosses to `geochemistry` —
 *  petrology is the rock geochemistry measures. A measure. */

const PROOF = 'petrology arithmetic (color index, silica content, porosity, grain density, differentiation, crystallization, modal composition, melt fraction); the rock the chemistry measures; a measure crossed to geochemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'petrology', dst: 'geochemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `petrology.${name}`, params })

export class PetrologyFormulas {
  /** COLOR INDEX: the percentage of dark (mafic) minerals. value ⌊dark · 100 / total⌋. */
  static colorindex(dark: number, total: number): CrossFormula { return c('petrology-colorindex', 'colorindex(dark, total) = ⌊dark · 100 / total⌋', total > 0 ? Math.floor((dark * 100) / total) : 0, nat(dark, total) && total > 0 && dark <= total, 'colorindex', [dark, total]) }
  /** SILICA CONTENT as a weight percentage. value ⌊silica · 100 / total⌋. */
  static silicacontent(silica: number, total: number): CrossFormula { return c('petrology-silicacontent', 'silicacontent(silica, total) = ⌊silica · 100 / total⌋', total > 0 ? Math.floor((silica * 100) / total) : 0, nat(silica, total) && total > 0 && silica <= total, 'silicacontent', [silica, total]) }
  /** POROSITY: void volume over the bulk, as a percentage. value ⌊voids · 100 / bulk⌋. */
  static porosity(voids: number, bulk: number): CrossFormula { return c('petrology-porosity', 'porosity(voids, bulk) = ⌊voids · 100 / bulk⌋', bulk > 0 ? Math.floor((voids * 100) / bulk) : 0, nat(voids, bulk) && bulk > 0 && voids <= bulk, 'porosity', [voids, bulk]) }
  /** GRAIN DENSITY: grain mass over grain volume. value ⌊mass / volume⌋. */
  static graindensity(mass: number, volume: number): CrossFormula { return c('petrology-graindensity', 'graindensity(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'graindensity', [mass, volume]) }
  /** DIFFERENTIATION INDEX: the normative felsic sum (quartz + feldspar + feldspathoid). value quartz + feldspar + feldspathoid. */
  static differentiation(quartz: number, feldspar: number, feldspathoid: number): CrossFormula { return c('petrology-differentiation', 'differentiation(quartz, feldspar, feldspathoid) = quartz + feldspar + feldspathoid', quartz + feldspar + feldspathoid, nat(quartz, feldspar, feldspathoid), 'differentiation', [quartz, feldspar, feldspathoid]) }
  /** CRYSTALLIZATION: the crystallized fraction of the melt, as a percentage. value ⌊crystals · 100 / total⌋. */
  static crystallization(crystals: number, total: number): CrossFormula { return c('petrology-crystallization', 'crystallization(crystals, total) = ⌊crystals · 100 / total⌋', total > 0 ? Math.floor((crystals * 100) / total) : 0, nat(crystals, total) && total > 0 && crystals <= total, 'crystallization', [crystals, total]) }
  /** MODAL COMPOSITION: a mineral's point-count share, as a percentage. value ⌊points · 100 / total⌋. */
  static modalcomposition(points: number, total: number): CrossFormula { return c('petrology-modalcomposition', 'modalcomposition(points, total) = ⌊points · 100 / total⌋', total > 0 ? Math.floor((points * 100) / total) : 0, nat(points, total) && total > 0 && points <= total, 'modalcomposition', [points, total]) }
  /** MELT FRACTION: the molten fraction remaining, as a percentage. value ⌊melt · 100 / total⌋. */
  static meltfraction(melt: number, total: number): CrossFormula { return c('petrology-meltfraction', 'meltfraction(melt, total) = ⌊melt · 100 / total⌋', total > 0 ? Math.floor((melt * 100) / total) : 0, nat(melt, total) && total > 0 && melt <= total, 'meltfraction', [melt, total]) }
}

for (const name of ['colorindex', 'crystallization', 'differentiation', 'graindensity', 'meltfraction', 'modalcomposition', 'porosity', 'silicacontent'] as const)
  hexRegisterOf('petrology', name, (PetrologyFormulas[name] as (...x: unknown[]) => unknown).bind(PetrologyFormulas))
