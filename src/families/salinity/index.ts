import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SALINITY — THE SEAWATER SALT BUDGET, AS ARITHMETIC. How salty the sea is, as numbers: practical salinity from a
 *  conductivity ratio, absolute salinity, density, conductivity, chlorinity, the haline contraction, a fresh/salt mixing
 *  ratio, and the freezing-point depression. Crosses to `oceanography` — salinity is what oceanography measures. A measure. */

const PROOF = 'salinity arithmetic (practical salinity, absolute salinity, density, conductivity, chlorinity, haline contraction, mixing ratio, freezing-point depression); a measure crossed to oceanography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'salinity', dst: 'oceanography', formula, value, proof: PROOF, ...extra }, holds, { name: `salinity.${name}`, params })

export class SalinityFormulas {
  /** PRACTICAL SALINITY: a conductivity ratio scaled to the practical scale (≈35 PSU). value ⌊conductivity · 35 / reference⌋. */
  static practical(conductivity: number, reference: number): CrossFormula { return c('salinity-practical', 'practical(conductivity, reference) = ⌊conductivity · 35 / reference⌋', reference > 0 ? Math.floor((conductivity * 35) / reference) : 0, nat(conductivity, reference) && reference > 0, 'practical', [conductivity, reference]) }
  /** ABSOLUTE SALINITY: practical salinity plus a composition offset (TEOS-10). value practical + delta. */
  static absolute(practical: number, delta: number): CrossFormula { return c('salinity-absolute', 'absolute(practical, delta) = practical + delta', practical + delta, nat(practical, delta), 'absolute', [practical, delta]) }
  /** DENSITY: seawater density above 1000, salt heavier, warmth lighter. value max(0, 1000 + salinity − temp). */
  static density(salinity: number, temp: number): CrossFormula { return c('salinity-density', 'density(salinity, temp) = max(0, 1000 + salinity − temp)', Math.max(0, 1000 + salinity - temp), nat(salinity, temp), 'density', [salinity, temp]) }
  /** CONDUCTIVITY: salt carries current, warmth helps. value salinity · temp. */
  static conductivity(salinity: number, temp: number): CrossFormula { return c('salinity-conductivity', 'conductivity(salinity, temp) = salinity · temp', salinity * temp, nat(salinity, temp), 'conductivity', [salinity, temp]) }
  /** CHLORINITY: the chloride share of salinity (Knudsen, factor per thousand). value ⌊salinity · factor / 1000⌋. */
  static chlorinity(salinity: number, factor: number): CrossFormula { return c('salinity-chlorinity', 'chlorinity(salinity, factor) = ⌊salinity · factor / 1000⌋', Math.floor((salinity * factor) / 1000), nat(salinity, factor), 'chlorinity', [salinity, factor]) }
  /** HALINE CONTRACTION: density carried per unit of salinity. value ⌊density / salinity⌋. */
  static haline(density: number, salinity: number): CrossFormula { return c('salinity-haline', 'haline(density, salinity) = ⌊density / salinity⌋', salinity > 0 ? Math.floor(density / salinity) : 0, nat(density, salinity) && salinity > 0, 'haline', [density, salinity]) }
  /** MIXING RATIO: fresh water as a percentage of the salt it mixes into. value ⌊fresh · 100 / salt⌋. */
  static mixingratio(fresh: number, salt: number): CrossFormula { return c('salinity-mixingratio', 'mixingratio(fresh, salt) = ⌊fresh · 100 / salt⌋', salt > 0 ? Math.floor((fresh * 100) / salt) : 0, nat(fresh, salt) && salt > 0, 'mixingratio', [fresh, salt]) }
  /** FREEZING POINT: the depression below 0 °C, in millidegrees, that salt causes. value salinity · coeff. */
  static freezingpoint(salinity: number, coeff: number): CrossFormula { return c('salinity-freezingpoint', 'freezingpoint(salinity, coeff) = salinity · coeff', Math.max(0, salinity * coeff), nat(salinity, coeff), 'freezingpoint', [salinity, coeff]) }
}

for (const name of ['absolute', 'chlorinity', 'conductivity', 'density', 'freezingpoint', 'haline', 'mixingratio', 'practical'] as const)
  hexRegisterOf('salinity', name, (SalinityFormulas[name] as (...x: unknown[]) => unknown).bind(SalinityFormulas))
