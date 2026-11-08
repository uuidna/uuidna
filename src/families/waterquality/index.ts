import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WATERQUALITY — THE STATE OF WATER, AS ARITHMETIC (chosen by the environmental registry, not by hand). A sample is numbers:
 *  the overall quality index, dissolved oxygen as saturation, biochemical oxygen demand, turbidity, hardness as CaCO₃, the
 *  alkalinity index over neutral, nitrate against its limit, and the coliform count per volume. Crosses to `hydrology` —
 *  water quality is what hydrology measures in the water it tracks. A measure. */

const PROOF = 'waterquality arithmetic (quality index, dissolved-oxygen saturation, BOD, turbidity, hardness as CaCO₃, pH index over neutral, nitrate vs limit, coliform per volume); an environmental domain; a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'waterquality', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `waterquality.${name}`, params })

export class WaterqualityFormulas {
  /** WATER QUALITY INDEX: the mean of the sub-index scores. value ⌊sum / count⌋. */
  static wqi(sum: number, count: number): CrossFormula { return c('waterquality-wqi', 'wqi(sum, count) = ⌊sum / count⌋', count > 0 ? Math.floor(sum / count) : 0, nat(sum, count) && count > 0, 'wqi', [sum, count]) }
  /** DISSOLVED OXYGEN as a percentage of saturation. value ⌊measured · 100 / saturation⌋. */
  static dissolvedoxygen(measured: number, saturation: number): CrossFormula { return c('waterquality-dissolvedoxygen', 'dissolvedoxygen(measured, saturation) = ⌊measured · 100 / saturation⌋', saturation > 0 ? Math.floor((measured * 100) / saturation) : 0, nat(measured, saturation) && saturation > 0, 'dissolvedoxygen', [measured, saturation]) }
  /** BIOCHEMICAL OXYGEN DEMAND: the oxygen consumed between two readings. value max(0, initial − final). */
  static bod(initial: number, final: number): CrossFormula { return c('waterquality-bod', 'bod(initial, final) = max(0, initial − final)', Math.max(0, initial - final), nat(initial, final), 'bod', [initial, final]) }
  /** TURBIDITY: scattering at a calibration factor, in NTU. value scattered · factor. */
  static turbidity(scattered: number, factor: number): CrossFormula { return c('waterquality-turbidity', 'turbidity(scattered, factor) = scattered · factor', scattered * factor, nat(scattered, factor), 'turbidity', [scattered, factor]) }
  /** HARDNESS as CaCO₃: calcium and magnesium at their equivalence weights. value calcium · 2 + magnesium · 4. */
  static hardness(calcium: number, magnesium: number): CrossFormula { return c('waterquality-hardness', 'hardness(calcium, magnesium) = calcium · 2 + magnesium · 4', calcium * 2 + magnesium * 4, nat(calcium, magnesium), 'hardness', [calcium, magnesium]) }
  /** THE pH INDEX: how far the reading sits above neutral. value max(0, ph − neutral). */
  static phindex(ph: number, neutral: number): CrossFormula { return c('waterquality-phindex', 'phindex(ph, neutral) = max(0, ph − neutral)', Math.max(0, ph - neutral), nat(ph, neutral), 'phindex', [ph, neutral]) }
  /** NITRATE against its safe limit, as a percentage. value ⌊measured · 100 / limit⌋. */
  static nitrate(measured: number, limit: number): CrossFormula { return c('waterquality-nitrate', 'nitrate(measured, limit) = ⌊measured · 100 / limit⌋', limit > 0 ? Math.floor((measured * 100) / limit) : 0, nat(measured, limit) && limit > 0, 'nitrate', [measured, limit]) }
  /** COLIFORM count per unit volume (CFU). value ⌊count / volume⌋. */
  static coliform(count: number, volume: number): CrossFormula { return c('waterquality-coliform', 'coliform(count, volume) = ⌊count / volume⌋', volume > 0 ? Math.floor(count / volume) : 0, nat(count, volume) && volume > 0, 'coliform', [count, volume]) }
}

for (const name of ['bod', 'coliform', 'dissolvedoxygen', 'hardness', 'nitrate', 'phindex', 'turbidity', 'wqi'] as const)
  hexRegisterOf('waterquality', name, (WaterqualityFormulas[name] as (...x: unknown[]) => unknown).bind(WaterqualityFormulas))
