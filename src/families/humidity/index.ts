import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HUMIDITY — WATER IN THE AIR, AS ARITHMETIC (the moisture a parcel carries, read as integers). Relative humidity against
 *  saturation, absolute humidity per volume, specific humidity per total mass, the pressure-based humidity ratio, the
 *  saturation vapour pressure a reading implies, the vapour-pressure deficit, a comfort index, and the mass mixing ratio.
 *  Crosses to `meteorology` — humidity is a state the weather carries. A measure. */

const PROOF = 'humidity arithmetic (relative, absolute, specific, ratio, saturation, deficit, comfort index, mixing ratio); water in the air as integers; a measure crossed to meteorology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'humidity', dst: 'meteorology', formula, value, proof: PROOF, ...extra }, holds, { name: `humidity.${name}`, params })

export class HumidityFormulas {
  /** RELATIVE HUMIDITY as a percentage of saturation. value ⌊vapor · 100 / sat⌋. */
  static relative(vapor: number, sat: number): CrossFormula { return c('humidity-relative', 'relative(vapor, sat) = ⌊vapor · 100 / sat⌋', sat > 0 ? Math.floor((vapor * 100) / sat) : 0, nat(vapor, sat) && sat > 0, 'relative', [vapor, sat]) }
  /** ABSOLUTE HUMIDITY: water mass over the volume it fills. value ⌊mass / volume⌋. */
  static absolute(mass: number, volume: number): CrossFormula { return c('humidity-absolute', 'absolute(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'absolute', [mass, volume]) }
  /** SPECIFIC HUMIDITY: vapour per total (moist) air mass, in g/kg. value ⌊vapor · 1000 / total⌋. */
  static specific(vapor: number, total: number): CrossFormula { return c('humidity-specific', 'specific(vapor, total) = ⌊vapor · 1000 / total⌋', total > 0 ? Math.floor((vapor * 1000) / total) : 0, nat(vapor, total) && total > 0, 'specific', [vapor, total]) }
  /** HUMIDITY RATIO from vapour and total pressure, in g/kg. value ⌊622 · e / (p − e)⌋. */
  static ratio(e: number, p: number): CrossFormula { const dry = Math.max(0, p - e); return c('humidity-ratio', 'ratio(e, p) = ⌊622 · e / (p − e)⌋', dry > 0 ? Math.floor((622 * e) / dry) : 0, nat(e, p) && dry > 0, 'ratio', [e, p]) }
  /** SATURATION vapour pressure implied by a vapour pressure and its relative humidity. value ⌊e · 100 / rh⌋. */
  static saturation(e: number, rh: number): CrossFormula { return c('humidity-saturation', 'saturation(e, rh) = ⌊e · 100 / rh⌋', rh > 0 ? Math.floor((e * 100) / rh) : 0, nat(e, rh) && rh > 0, 'saturation', [e, rh]) }
  /** VAPOUR-PRESSURE DEFICIT: how far below saturation the air sits. value max(0, sat − vapor). */
  static deficit(sat: number, vapor: number): CrossFormula { return c('humidity-deficit', 'deficit(sat, vapor) = max(0, sat − vapor)', Math.max(0, sat - vapor), nat(sat, vapor), 'deficit', [sat, vapor]) }
  /** COMFORT INDEX: temperature lifted by a share of the humidity. value temp + ⌊rh / 5⌋. */
  static comfortindex(temp: number, rh: number): CrossFormula { return c('humidity-comfortindex', 'comfortindex(temp, rh) = temp + ⌊rh / 5⌋', temp + Math.floor(rh / 5), nat(temp, rh), 'comfortindex', [temp, rh]) }
  /** MIXING RATIO: vapour per dry air mass, in g/kg. value ⌊vapor · 1000 / dry⌋. */
  static mixingratio(vapor: number, dry: number): CrossFormula { return c('humidity-mixingratio', 'mixingratio(vapor, dry) = ⌊vapor · 1000 / dry⌋', dry > 0 ? Math.floor((vapor * 1000) / dry) : 0, nat(vapor, dry) && dry > 0, 'mixingratio', [vapor, dry]) }
}

for (const name of ['absolute', 'comfortindex', 'deficit', 'mixingratio', 'ratio', 'relative', 'saturation', 'specific'] as const)
  hexRegisterOf('humidity', name, (HumidityFormulas[name] as (...x: unknown[]) => unknown).bind(HumidityFormulas))
