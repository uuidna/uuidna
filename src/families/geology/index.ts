import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOLOGY — THE EARTH, AS ARITHMETIC (chosen by the public-API registry, not by hand). Reading the ground is numbers:
 *  quake magnitude, the depth of stacked layers, pore space as a percentage, radiometric age, density, strata count,
 *  erosion rate, and ore grade. Crosses to `cern` — geology is matter the collider studies. A measure. */

const PROOF = 'geology arithmetic (magnitude, depth, porosity, age, density, strata, erosion, grade); an earth-science domain; a measure crossed to cern'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geology', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name: `geology.${name}`, params })

export class GeologyFormulas {
  /** MAGNITUDE: a Richter proxy, the released energy itself. value energy. */
  static magnitude(energy: number): CrossFormula { return c('geology-magnitude', 'magnitude(energy) = energy', energy, nat(energy) && energy <= 10, 'magnitude', [energy]) }
  /** DEPTH: stacked layers at a thickness each. value layers · each. */
  static depth(layers: number, each: number): CrossFormula { return c('geology-depth', 'depth(layers, each) = layers · each', layers * each, nat(layers, each), 'depth', [layers, each]) }
  /** POROSITY: pore space as a percentage. value ⌊voids · 100 / total⌋. */
  static porosity(voids: number, total: number): CrossFormula { return c('geology-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100) / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) }
  /** AGE: radiometric, half-lives elapsed times the half-life. value halflife · halvings. */
  static age(halflife: number, halvings: number): CrossFormula { return c('geology-age', 'age(halflife, halvings) = halflife · halvings', halflife * halvings, nat(halflife, halvings), 'age', [halflife, halvings]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('geology-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** STRATA: the count of distinct layers. value count. */
  static strata(count: number): CrossFormula { return c('geology-strata', 'strata(count) = count', count, nat(count), 'strata', [count]) }
  /** EROSION: material lost over years. value ⌊lost / years⌋. */
  static erosion(lost: number, years: number): CrossFormula { return c('geology-erosion', 'erosion(lost, years) = ⌊lost / years⌋', years > 0 ? Math.floor(lost / years) : 0, nat(lost, years) && years > 0, 'erosion', [lost, years]) }
  /** GRADE: ore as a percentage of rock. value ⌊ore · 100 / rock⌋. */
  static grade(ore: number, rock: number): CrossFormula { return c('geology-grade', 'grade(ore, rock) = ⌊ore · 100 / rock⌋', rock > 0 ? Math.floor((ore * 100) / rock) : 0, nat(ore, rock) && rock > 0 && ore <= rock, 'grade', [ore, rock]) }
}

for (const name of ['age', 'density', 'depth', 'erosion', 'grade', 'magnitude', 'porosity', 'strata'] as const)
  hexRegisterOf('geology', name, (GeologyFormulas[name] as (...x: unknown[]) => unknown).bind(GeologyFormulas))
