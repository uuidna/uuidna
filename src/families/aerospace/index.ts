import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AEROSPACE — FLIGHT & ORBITAL MECHANICS, AS ARITHMETIC (chosen by the public-API registry, not by hand). Flight is numbers:
 *  thrust from mass and acceleration, lift from a coefficient over an area, the range a fuel load buys at a burn rate, the
 *  Mach number against the speed of sound, the orbital period a radius and mass imply, escape as a mass-to-radius ratio,
 *  usable payload, and the apogee an energy budget reaches. Crosses to `cern` — flight is physics measured. A measure. */

const PROOF = 'aerospace arithmetic (thrust, lift, range, mach, orbit, escape, payload, apogee); flight & orbital mechanics from the public-API registry; a measure crossed to cern'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aerospace', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name: `aerospace.${name}`, params })

export class AerospaceFormulas {
  /** THRUST: mass under an acceleration (Newton's second law). value mass · accel. */
  static thrust(mass: number, accel: number): CrossFormula { return c('aerospace-thrust', 'thrust(mass, accel) = mass · accel', mass * accel, nat(mass, accel), 'thrust', [mass, accel]) }
  /** LIFT: a lift coefficient over a wing area (coefficient scaled by 100). value ⌊coeff · area / 100⌋. */
  static lift(coeff: number, area: number): CrossFormula { return c('aerospace-lift', 'lift(coeff, area) = ⌊coeff · area / 100⌋', Math.floor((coeff * area) / 100), nat(coeff, area), 'lift', [coeff, area]) }
  /** RANGE: the distance a fuel load buys at a burn rate. value ⌊fuel / burn⌋. */
  static range(fuel: number, burn: number): CrossFormula { return c('aerospace-range', 'range(fuel, burn) = ⌊fuel / burn⌋', burn > 0 ? Math.floor(fuel / burn) : 0, nat(fuel, burn) && burn > 0, 'range', [fuel, burn]) }
  /** MACH: speed against the speed of sound (Mach × 100). value ⌊speed · 100 / sound⌋. */
  static mach(speed: number, sound: number): CrossFormula { return c('aerospace-mach', 'mach(speed, sound) = ⌊speed · 100 / sound⌋', sound > 0 ? Math.floor((speed * 100) / sound) : 0, nat(speed, sound) && sound > 0, 'mach', [speed, sound]) }
  /** ORBIT: the Kepler period proxy T² from a radius and central mass. value ⌊radius³ / mass⌋. */
  static orbit(radius: number, mass: number): CrossFormula { return c('aerospace-orbit', 'orbit(radius, mass) = ⌊radius³ / mass⌋', mass > 0 ? Math.floor((radius * radius * radius) / mass) : 0, nat(radius, mass) && mass > 0, 'orbit', [radius, mass]) }
  /** ESCAPE: escape proxy as mass over radius. value ⌊mass / radius⌋. */
  static escape(mass: number, radius: number): CrossFormula { return c('aerospace-escape', 'escape(mass, radius) = ⌊mass / radius⌋', radius > 0 ? Math.floor(mass / radius) : 0, nat(mass, radius) && radius > 0, 'escape', [mass, radius]) }
  /** PAYLOAD: gross mass less dry mass, never below zero. value max(0, gross − dry). */
  static payload(gross: number, dry: number): CrossFormula { return c('aerospace-payload', 'payload(gross, dry) = max(0, gross − dry)', Math.max(0, gross - dry), nat(gross, dry), 'payload', [gross, dry]) }
  /** APOGEE: the height an energy budget reaches against a mass. value ⌊energy / mass⌋. */
  static apogee(energy: number, mass: number): CrossFormula { return c('aerospace-apogee', 'apogee(energy, mass) = ⌊energy / mass⌋', mass > 0 ? Math.floor(energy / mass) : 0, nat(energy, mass) && mass > 0, 'apogee', [energy, mass]) }
}

for (const name of ['apogee', 'escape', 'lift', 'mach', 'orbit', 'payload', 'range', 'thrust'] as const)
  hexRegisterOf('aerospace', name, (AerospaceFormulas[name] as (...x: unknown[]) => unknown).bind(AerospaceFormulas))
