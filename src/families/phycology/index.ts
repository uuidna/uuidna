import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHYCOLOGY — THE STUDY OF ALGAE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Algae are numbers:
 *  chlorophyll per cell, standing biomass, primary productivity, bloom density, growth over a generation, lipid fraction,
 *  the turbidity a culture scatters, and whether nutrient uptake meets demand. Crosses to `botany` — algae are plants
 *  without roots, the oldest branch botany measures. A measure. */

const PROOF = 'phycology arithmetic (chlorophyll, biomass, productivity, bloom density, growth rate, lipid content, turbidity, nutrient uptake); algae as the rootless oldest plants; a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'phycology', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `phycology.${name}`, params })

export class PhycologyFormulas {
  /** CHLOROPHYLL: pigment molecules over a cell count. value cells · pigment. */
  static chlorophyll(cells: number, pigment: number): CrossFormula { return c('phycology-chlorophyll', 'chlorophyll(cells, pigment) = cells · pigment', cells * pigment, nat(cells, pigment), 'chlorophyll', [cells, pigment]) }
  /** BIOMASS: standing stock as cell density over a sampled volume. value density · volume. */
  static biomass(density: number, volume: number): CrossFormula { return c('phycology-biomass', 'biomass(density, volume) = density · volume', density * volume, nat(density, volume), 'biomass', [density, volume]) }
  /** PRIMARY PRODUCTIVITY: carbon fixed per day. value ⌊carbon / days⌋. */
  static productivity(carbon: number, days: number): CrossFormula { return c('phycology-productivity', 'productivity(carbon, days) = ⌊carbon / days⌋', days > 0 ? Math.floor(carbon / days) : 0, nat(carbon, days) && days > 0, 'productivity', [carbon, days]) }
  /** BLOOM DENSITY: the sample tiles a cell count needs at a per-tile capacity. value ⌈cells / area⌉. */
  static bloomdensity(cells: number, area: number): CrossFormula { return c('phycology-bloomdensity', 'bloomdensity(cells, area) = ⌈cells / area⌉', area > 0 ? Math.ceil(cells / area) : 0, nat(cells, area) && area > 0, 'bloomdensity', [cells, area]) }
  /** GROWTH RATE as a percentage over a generation. value ⌊(final − initial) · 100 / initial⌋. */
  static growthrate(initial: number, final: number): CrossFormula { return c('phycology-growthrate', 'growthrate(initial, final) = ⌊max(0, final − initial) · 100 / initial⌋', initial > 0 ? Math.floor((Math.max(0, final - initial) * 100) / initial) : 0, nat(initial, final) && initial > 0, 'growthrate', [initial, final]) }
  /** LIPID CONTENT as a percentage of dry mass. value ⌊lipid · 100 / total⌋. */
  static lipidcontent(lipid: number, total: number): CrossFormula { return c('phycology-lipidcontent', 'lipidcontent(lipid, total) = ⌊lipid · 100 / total⌋', total > 0 ? Math.floor((lipid * 100) / total) : 0, nat(lipid, total) && total > 0 && lipid <= total, 'lipidcontent', [lipid, total]) }
  /** TURBIDITY: nephelometric units from particles at a scatter coefficient per thousand. value ⌊particles · scatter / 1000⌋. */
  static turbidity(particles: number, scatter: number): CrossFormula { return c('phycology-turbidity', 'turbidity(particles, scatter) = ⌊particles · scatter / 1000⌋', Math.floor((particles * scatter) / 1000), nat(particles, scatter), 'turbidity', [particles, scatter]) }
  /** NUTRIENT UPTAKE: 1 when uptake meets demand. value [uptake ≥ demand]. */
  static nutrientuptake(uptake: number, demand: number): CrossFormula { return c('phycology-nutrientuptake', 'nutrientuptake(uptake, demand) = [uptake ≥ demand]', uptake >= demand ? 1 : 0, nat(uptake, demand), 'nutrientuptake', [uptake, demand]) }
}

for (const name of ['biomass', 'bloomdensity', 'chlorophyll', 'growthrate', 'lipidcontent', 'nutrientuptake', 'productivity', 'turbidity'] as const)
  hexRegisterOf('phycology', name, (PhycologyFormulas[name] as (...x: unknown[]) => unknown).bind(PhycologyFormulas))
