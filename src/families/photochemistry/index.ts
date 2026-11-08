import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHOTOCHEMISTRY — LIGHT DRIVING REACTIONS, AS ARITHMETIC (chosen by the public-API registry, not by hand). A photon
 *  budget is numbers: the quantum yield of a reaction, Beer–Lambert absorbance, photon flux, actinometric dose, how many
 *  fluorophores survive bleaching, molecules excited, excited-state lifetime, and percent conversion. Crosses to `optics` —
 *  photochemistry is what optics shines. A measure. */

const PROOF = 'photochemistry arithmetic (quantum yield, absorbance, photon flux, actinometry, bleaching, excitation, lifetime, conversion); a light-driven measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'photochemistry', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `photochemistry.${name}`, params })

export class PhotochemistryFormulas {
  /** QUANTUM YIELD: molecules reacted per hundred photons absorbed. value ⌊reacted · 100 / absorbed⌋. */
  static quantumyield(reacted: number, absorbed: number): CrossFormula { return c('photochemistry-quantumyield', 'quantumyield(reacted, absorbed) = ⌊reacted · 100 / absorbed⌋', absorbed > 0 ? Math.floor((reacted * 100) / absorbed) : 0, nat(reacted, absorbed) && absorbed > 0 && reacted <= absorbed, 'quantumyield', [reacted, absorbed]) }
  /** ABSORBANCE (Beer–Lambert): A = ε · c · l, molar coefficient by concentration by path. value coeff · conc · path. */
  static absorbance(coeff: number, conc: number, path: number): CrossFormula { return c('photochemistry-absorbance', 'absorbance(coeff, conc, path) = coeff · conc · path', coeff * conc * path, nat(coeff, conc, path), 'absorbance', [coeff, conc, path]) }
  /** PHOTON FLUX: photons over seconds. value ⌊photons / seconds⌋. */
  static photonflux(photons: number, seconds: number): CrossFormula { return c('photochemistry-photonflux', 'photonflux(photons, seconds) = ⌊photons / seconds⌋', seconds > 0 ? Math.floor(photons / seconds) : 0, nat(photons, seconds) && seconds > 0, 'photonflux', [photons, seconds]) }
  /** ACTINOMETRY: molecules converted from a photon dose at a percent efficiency. value ⌊photons · efficiency / 100⌋. */
  static actinometry(photons: number, efficiency: number): CrossFormula { return c('photochemistry-actinometry', 'actinometry(photons, efficiency) = ⌊photons · efficiency / 100⌋', Math.floor((photons * efficiency) / 100), nat(photons, efficiency), 'actinometry', [photons, efficiency]) }
  /** BLEACHING: fluorophores surviving after photobleaching. value max(0, initial − bleached). */
  static bleaching(initial: number, bleached: number): CrossFormula { return c('photochemistry-bleaching', 'bleaching(initial, bleached) = max(0, initial − bleached)', Math.max(0, initial - bleached), nat(initial, bleached), 'bleaching', [initial, bleached]) }
  /** EXCITATION: molecules raised to the excited state by photons at a cross-section. value photons · crossSection. */
  static excitation(photons: number, crossSection: number): CrossFormula { return c('photochemistry-excitation', 'excitation(photons, crossSection) = photons · crossSection', photons * crossSection, nat(photons, crossSection), 'excitation', [photons, crossSection]) }
  /** LIFETIME: average excited-state lifetime, total time over decay events. value ⌊total / decays⌋. */
  static lifetime(total: number, decays: number): CrossFormula { return c('photochemistry-lifetime', 'lifetime(total, decays) = ⌊total / decays⌋', decays > 0 ? Math.floor(total / decays) : 0, nat(total, decays) && decays > 0, 'lifetime', [total, decays]) }
  /** CONVERSION: percent of starting material consumed. value ⌊converted · 100 / initial⌋. */
  static conversion(converted: number, initial: number): CrossFormula { return c('photochemistry-conversion', 'conversion(converted, initial) = ⌊converted · 100 / initial⌋', initial > 0 ? Math.floor((converted * 100) / initial) : 0, nat(converted, initial) && initial > 0 && converted <= initial, 'conversion', [converted, initial]) }
}

for (const name of ['absorbance', 'actinometry', 'bleaching', 'conversion', 'excitation', 'lifetime', 'photonflux', 'quantumyield'] as const)
  hexRegisterOf('photochemistry', name, (PhotochemistryFormulas[name] as (...x: unknown[]) => unknown).bind(PhotochemistryFormulas))
