import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOXICOLOGY — HOW A DOSE MEETS A BODY, AS ARITHMETIC. Poison is numbers: the lethal dose for a body mass, the dose
 *  actually administered, the therapeutic index, how fast a body clears a compound, its half-life, cumulative exposure,
 *  how much a compound concentrates in tissue, and the margin of safety. Crosses to `physiology` — toxicology is what a
 *  living body does to, and under, a dose. A measure. */

const PROOF = 'toxicology arithmetic (lethal dose, administered dose, therapeutic index, clearance, half-life, exposure, bioaccumulation, margin of safety); a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'toxicology', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `toxicology.${name}`, params })

export class ToxicologyFormulas {
  /** LETHAL DOSE: the per-kilogram LD50 scaled to a body mass. value perKg · weight. */
  static ld50(perKg: number, weight: number): CrossFormula { return c('toxicology-ld50', 'ld50(perKg, weight) = perKg · weight', perKg * weight, nat(perKg, weight), 'ld50', [perKg, weight]) }
  /** ADMINISTERED DOSE: a concentration over a volume. value conc · volume. */
  static dose(conc: number, volume: number): CrossFormula { return c('toxicology-dose', 'dose(conc, volume) = conc · volume', conc * volume, nat(conc, volume), 'dose', [conc, volume]) }
  /** THERAPEUTIC INDEX: the lethal dose over the effective dose. value ⌊ld50 / ed50⌋. */
  static therapeuticindex(ld50: number, ed50: number): CrossFormula { return c('toxicology-therapeuticindex', 'therapeuticindex(ld50, ed50) = ⌊ld50 / ed50⌋', ed50 > 0 ? Math.floor(ld50 / ed50) : 0, nat(ld50, ed50) && ed50 > 0, 'therapeuticindex', [ld50, ed50]) }
  /** CLEARANCE: the elimination rate over the plasma concentration. value ⌊rate / conc⌋. */
  static clearance(rate: number, conc: number): CrossFormula { return c('toxicology-clearance', 'clearance(rate, conc) = ⌊rate / conc⌋', conc > 0 ? Math.floor(rate / conc) : 0, nat(rate, conc) && conc > 0, 'clearance', [rate, conc]) }
  /** HALF-LIFE: 0.693 · volume of distribution over clearance. value ⌊693 · volume / (1000 · clearance)⌋. */
  static halflife(volume: number, clearance: number): CrossFormula { return c('toxicology-halflife', 'halflife(volume, clearance) = ⌊693 · volume / (1000 · clearance)⌋', clearance > 0 ? Math.floor((693 * volume) / (1000 * clearance)) : 0, nat(volume, clearance) && clearance > 0, 'halflife', [volume, clearance]) }
  /** EXPOSURE: a concentration held over a duration. value conc · duration. */
  static exposure(conc: number, duration: number): CrossFormula { return c('toxicology-exposure', 'exposure(conc, duration) = conc · duration', conc * duration, nat(conc, duration), 'exposure', [conc, duration]) }
  /** BIOACCUMULATION: the tissue concentration over the water concentration (BCF). value ⌊organism / water⌋. */
  static bioaccumulation(organism: number, water: number): CrossFormula { return c('toxicology-bioaccumulation', 'bioaccumulation(organism, water) = ⌊organism / water⌋', water > 0 ? Math.floor(organism / water) : 0, nat(organism, water) && water > 0, 'bioaccumulation', [organism, water]) }
  /** MARGIN OF SAFETY: the no-effect level over the actual exposure. value ⌊noael / exposure⌋. */
  static margin(noael: number, exposure: number): CrossFormula { return c('toxicology-margin', 'margin(noael, exposure) = ⌊noael / exposure⌋', exposure > 0 ? Math.floor(noael / exposure) : 0, nat(noael, exposure) && exposure > 0, 'margin', [noael, exposure]) }
}

for (const name of ['bioaccumulation', 'clearance', 'dose', 'exposure', 'halflife', 'ld50', 'margin', 'therapeuticindex'] as const)
  hexRegisterOf('toxicology', name, (ToxicologyFormulas[name] as (...x: unknown[]) => unknown).bind(ToxicologyFormulas))
