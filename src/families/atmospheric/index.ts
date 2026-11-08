import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ATMOSPHERIC — THE AIR ABOVE THE GROUND, AS ARITHMETIC (chosen by the registry, not by hand). The atmosphere is numbers:
 *  pressure falling with altitude, the lapse rate, relative humidity, column ozone, wind shear, parcel stability, the
 *  Coriolis turn, and aerosol density. Crosses to `climate` — the atmosphere is what climate integrates. A measure. */

const PROOF = 'atmospheric arithmetic (pressure, lapse rate, humidity, ozone, wind shear, stability, Coriolis, aerosol); the registry\'s air domain; a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'atmospheric', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `atmospheric.${name}`, params })

export class AtmosphericFormulas {
  /** PRESSURE at altitude: sea-level pressure less the altitude drop. value max(0, sealevel − altitude). */
  static pressure(sealevel: number, altitude: number): CrossFormula { return c('atmospheric-pressure', 'pressure(sealevel, altitude) = max(0, sealevel − altitude)', Math.max(0, sealevel - altitude), nat(sealevel, altitude), 'pressure', [sealevel, altitude]) }
  /** LAPSE RATE: surface temperature over the height it falls across. value ⌊surface / height⌋. */
  static lapserate(surface: number, height: number): CrossFormula { return c('atmospheric-lapserate', 'lapserate(surface, height) = ⌊surface / height⌋', height > 0 ? Math.floor(surface / height) : 0, nat(surface, height) && height > 0, 'lapserate', [surface, height]) }
  /** RELATIVE HUMIDITY as a percentage. value ⌊vapor · 100 / saturation⌋. */
  static humidity(vapor: number, saturation: number): CrossFormula { return c('atmospheric-humidity', 'humidity(vapor, saturation) = ⌊vapor · 100 / saturation⌋', saturation > 0 ? Math.floor((vapor * 100) / saturation) : 0, nat(vapor, saturation) && saturation > 0 && vapor <= saturation, 'humidity', [vapor, saturation]) }
  /** COLUMN OZONE in Dobson units. value dobson. */
  static ozone(dobson: number): CrossFormula { return c('atmospheric-ozone', 'ozone(dobson) = dobson', dobson, nat(dobson), 'ozone', [dobson]) }
  /** WIND SHEAR: the speed difference between upper and lower layers. value max(0, upper − lower). */
  static windshear(upper: number, lower: number): CrossFormula { return c('atmospheric-windshear', 'windshear(upper, lower) = max(0, upper − lower)', Math.max(0, upper - lower), nat(upper, lower), 'windshear', [upper, lower]) }
  /** STABILITY: how much the environment exceeds the parcel. value max(0, environment − parcel). */
  static stability(parcel: number, environment: number): CrossFormula { return c('atmospheric-stability', 'stability(parcel, environment) = max(0, environment − parcel)', Math.max(0, environment - parcel), nat(parcel, environment), 'stability', [parcel, environment]) }
  /** CORIOLIS turn: velocity scaled by latitude over the pole. value ⌊velocity · latitude / 90⌋. */
  static coriolis(velocity: number, latitude: number): CrossFormula { return c('atmospheric-coriolis', 'coriolis(velocity, latitude) = ⌊velocity · latitude / 90⌋', Math.floor((velocity * latitude) / 90), nat(velocity, latitude) && latitude <= 90, 'coriolis', [velocity, latitude]) }
  /** AEROSOL density: particles per unit volume. value ⌊particles / volume⌋. */
  static aerosol(particles: number, volume: number): CrossFormula { return c('atmospheric-aerosol', 'aerosol(particles, volume) = ⌊particles / volume⌋', volume > 0 ? Math.floor(particles / volume) : 0, nat(particles, volume) && volume > 0, 'aerosol', [particles, volume]) }
}

for (const name of ['aerosol', 'coriolis', 'humidity', 'lapserate', 'ozone', 'pressure', 'stability', 'windshear'] as const)
  hexRegisterOf('atmospheric', name, (AtmosphericFormulas[name] as (...x: unknown[]) => unknown).bind(AtmosphericFormulas))
