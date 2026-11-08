import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HELIOPHYSICS — THE SUN AS ARITHMETIC (chosen by the registry, not by hand). The star is numbers: sunspot count, the
 *  wind's travel time, a flare's class, the irradiance it lands, a mass ejection's momentum, the geomagnetic index, where
 *  the cycle stands, and the particle flux. Crosses to `astronomy` — heliophysics is the nearest star astronomy studies.
 *  A measure. */

const PROOF = 'heliophysics arithmetic (sunspot number, solar-wind travel, flare class, irradiance, coronal mass momentum, magnetic index, cycle phase, particle flux); the registry\'s nearest-star domain; a measure crossed to astronomy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'heliophysics', dst: 'astronomy', formula, value, proof: PROOF, ...extra }, holds, { name: `heliophysics.${name}`, params })

export class HeliophysicsFormulas {
  /** CORONAL MASS: a mass ejection's momentum, mass by speed. value mass · speed. */
  static coronalmass(mass: number, speed: number): CrossFormula { return c('heliophysics-coronalmass', 'coronalmass(mass, speed) = mass · speed', mass * speed, nat(mass, speed), 'coronalmass', [mass, speed]) }
  /** CYCLE: the year's phase in the 11-year solar cycle. value max(0, now − start) mod 11. */
  static cycle(start: number, now: number): CrossFormula { return c('heliophysics-cycle', 'cycle(start, now) = max(0, now − start) mod 11', Math.max(0, now - start) % 11, nat(start, now) && now >= start, 'cycle', [start, now]) }
  /** FLARE CLASS: peak X-ray flux over the class base. value ⌊peak / base⌋. */
  static flareclass(peak: number, base: number): CrossFormula { return c('heliophysics-flareclass', 'flareclass(peak, base) = ⌊peak / base⌋', base > 0 ? Math.floor(peak / base) : 0, nat(peak, base) && base > 0, 'flareclass', [peak, base]) }
  /** FLUX: particles counted over the seconds observed. value ⌊photons / seconds⌋. */
  static flux(photons: number, seconds: number): CrossFormula { return c('heliophysics-flux', 'flux(photons, seconds) = ⌊photons / seconds⌋', seconds > 0 ? Math.floor(photons / seconds) : 0, nat(photons, seconds) && seconds > 0, 'flux', [photons, seconds]) }
  /** IRRADIANCE: power landing over the area. value ⌊power / area⌋. */
  static irradiance(power: number, area: number): CrossFormula { return c('heliophysics-irradiance', 'irradiance(power, area) = ⌊power / area⌋', area > 0 ? Math.floor(power / area) : 0, nat(power, area) && area > 0, 'irradiance', [power, area]) }
  /** MAGNETIC INDEX: the geomagnetic sum averaged over its readings. value ⌊sum / count⌋. */
  static magneticindex(sum: number, count: number): CrossFormula { return c('heliophysics-magneticindex', 'magneticindex(sum, count) = ⌊sum / count⌋', count > 0 ? Math.floor(sum / count) : 0, nat(sum, count) && count > 0, 'magneticindex', [sum, count]) }
  /** SOLAR WIND: travel time at the wind's speed over the distance. value ⌊distance / speed⌋. */
  static solarwind(distance: number, speed: number): CrossFormula { return c('heliophysics-solarwind', 'solarwind(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'solarwind', [distance, speed]) }
  /** SUNSPOT: the Wolf number from groups and spots. value 10 · groups + spots. */
  static sunspot(groups: number, spots: number): CrossFormula { return c('heliophysics-sunspot', 'sunspot(groups, spots) = 10 · groups + spots', 10 * groups + spots, nat(groups, spots), 'sunspot', [groups, spots]) }
}

for (const name of ['coronalmass', 'cycle', 'flareclass', 'flux', 'irradiance', 'magneticindex', 'solarwind', 'sunspot'] as const)
  hexRegisterOf('heliophysics', name, (HeliophysicsFormulas[name] as (...x: unknown[]) => unknown).bind(HeliophysicsFormulas))
