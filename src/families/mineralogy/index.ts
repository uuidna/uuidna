import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MINERALOGY — MINERALS AS ARITHMETIC (chosen by the materials registry, not by hand). A mineral is numbers: hardness on
 *  the Mohs scale, density from mass over volume, cleavage planes, how light refracts, ore grade, crystallinity, purity,
 *  and specific gravity against water. Crosses to `materials` — minerals are what materials are made of. A measure. */

const PROOF = 'mineralogy arithmetic (Mohs hardness, density, cleavage, refraction, ore grade, crystallinity, purity, specific gravity); a materials domain; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mineralogy', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `mineralogy.${name}`, params })

export class MineralogyFormulas {
  /** HARDNESS on the Mohs scale: the scratch rank. value scratch. */
  static hardness(scratch: number): CrossFormula { return c('mineralogy-hardness', 'hardness(scratch) = scratch', scratch, nat(scratch), 'hardness', [scratch]) }
  /** DENSITY: mass over volume. value ⌊mass / volume⌋. */
  static density(mass: number, volume: number): CrossFormula { return c('mineralogy-density', 'density(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'density', [mass, volume]) }
  /** CLEAVAGE: the number of planes. value planes. */
  static cleavage(planes: number): CrossFormula { return c('mineralogy-cleavage', 'cleavage(planes) = planes', planes, nat(planes), 'cleavage', [planes]) }
  /** REFRACTION: incident angle over the refractive index (·1000). value ⌊incident · 1000 / index⌋. */
  static refraction(incident: number, index: number): CrossFormula { return c('mineralogy-refraction', 'refraction(incident, index) = ⌊incident · 1000 / index⌋', index > 0 ? Math.floor((incident * 1000) / index) : 0, nat(incident, index) && index > 0, 'refraction', [incident, index]) }
  /** ORE GRADE as a percentage. value ⌊ore · 100 / (ore + gangue)⌋. */
  static grade(ore: number, gangue: number): CrossFormula { return c('mineralogy-grade', 'grade(ore, gangue) = ⌊ore · 100 / (ore + gangue)⌋', (ore + gangue) > 0 ? Math.floor((ore * 100) / (ore + gangue)) : 0, nat(ore, gangue) && (ore + gangue) > 0, 'grade', [ore, gangue]) }
  /** CRYSTALLINITY as a percentage. value ⌊crystalline · 100 / total⌋. */
  static crystallinity(crystalline: number, total: number): CrossFormula { return c('mineralogy-crystallinity', 'crystallinity(crystalline, total) = ⌊crystalline · 100 / total⌋', total > 0 ? Math.floor((crystalline * 100) / total) : 0, nat(crystalline, total) && total > 0 && crystalline <= total, 'crystallinity', [crystalline, total]) }
  /** PURITY as a percentage. value ⌊mineral · 100 / sample⌋. */
  static purity(mineral: number, sample: number): CrossFormula { return c('mineralogy-purity', 'purity(mineral, sample) = ⌊mineral · 100 / sample⌋', sample > 0 ? Math.floor((mineral * 100) / sample) : 0, nat(mineral, sample) && sample > 0 && mineral <= sample, 'purity', [mineral, sample]) }
  /** SPECIFIC GRAVITY against water (·1000). value ⌊weight · 1000 / water⌋. */
  static specific(weight: number, water: number): CrossFormula { return c('mineralogy-specific', 'specific(weight, water) = ⌊weight · 1000 / water⌋', water > 0 ? Math.floor((weight * 1000) / water) : 0, nat(weight, water) && water > 0, 'specific', [weight, water]) }
}

for (const name of ['cleavage', 'crystallinity', 'density', 'grade', 'hardness', 'purity', 'refraction', 'specific'] as const)
  hexRegisterOf('mineralogy', name, (MineralogyFormulas[name] as (...x: unknown[]) => unknown).bind(MineralogyFormulas))
