import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AIRQUALITY — BREATHING ROOM, AS ARITHMETIC (chosen by the public-API registry, not by hand). What is in the air is
 *  numbers: the index for a concentration, the PM2.5 reading against a threshold, the 8-hour ozone load, how far a reading
 *  is over the limit, mass over volume, concentration-time exposure, air changes a room gets, and how a plume thins with
 *  distance. Crosses to `environment` — air quality is one reading the environment keeps. A measure. */

const PROOF = 'airquality arithmetic (aqi, pm2.5 index, 8-hour ozone, exceedance, concentration, exposure, ventilation, dispersion); a public-API domain; a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'airquality', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `airquality.${name}`, params })

export class AirqualityFormulas {
  /** AQI: index points for a concentration at a per-unit slope. value conc · slope. */
  static aqi(conc: number, slope: number): CrossFormula { return c('airquality-aqi', 'aqi(conc, slope) = conc · slope', conc * slope, nat(conc, slope), 'aqi', [conc, slope]) }
  /** PM2.5 INDEX: a reading as a percentage of a threshold. value ⌊conc · 100 / base⌋. */
  static pm25index(conc: number, base: number): CrossFormula { return c('airquality-pm25index', 'pm25index(conc, base) = ⌊conc · 100 / base⌋', base > 0 ? Math.floor((conc * 100) / base) : 0, nat(conc, base) && base > 0, 'pm25index', [conc, base]) }
  /** OZONE: the 8-hour ozone load from ppb over the hours measured. value ⌊ppb · hours / 8⌋. */
  static ozone(ppb: number, hours: number): CrossFormula { return c('airquality-ozone', 'ozone(ppb, hours) = ⌊ppb · hours / 8⌋', Math.floor((ppb * hours) / 8), nat(ppb, hours), 'ozone', [ppb, hours]) }
  /** EXCEEDANCE: how far a reading is over the limit. value max(0, measured − limit). */
  static exceedance(measured: number, limit: number): CrossFormula { return c('airquality-exceedance', 'exceedance(measured, limit) = max(0, measured − limit)', Math.max(0, measured - limit), nat(measured, limit), 'exceedance', [measured, limit]) }
  /** CONCENTRATION: mass over the volume it fills. value ⌊mass / volume⌋. */
  static concentration(mass: number, volume: number): CrossFormula { return c('airquality-concentration', 'concentration(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'concentration', [mass, volume]) }
  /** EXPOSURE INDEX: concentration-time over the hours breathed. value conc · hours. */
  static exposureindex(conc: number, hours: number): CrossFormula { return c('airquality-exposureindex', 'exposureindex(conc, hours) = conc · hours', conc * hours, nat(conc, hours), 'exposureindex', [conc, hours]) }
  /** VENTILATION: air changes an hour a flow gives a room. value ⌊flow · 60 / volume⌋. */
  static ventilation(flow: number, volume: number): CrossFormula { return c('airquality-ventilation', 'ventilation(flow, volume) = ⌊flow · 60 / volume⌋', volume > 0 ? Math.floor((flow * 60) / volume) : 0, nat(flow, volume) && volume > 0, 'ventilation', [flow, volume]) }
  /** DISPERSION: how a plume thins with distance from the source. value ⌊source / distance⌋. */
  static dispersion(source: number, distance: number): CrossFormula { return c('airquality-dispersion', 'dispersion(source, distance) = ⌊source / distance⌋', distance > 0 ? Math.floor(source / distance) : 0, nat(source, distance) && distance > 0, 'dispersion', [source, distance]) }
}

for (const name of ['aqi', 'concentration', 'dispersion', 'exceedance', 'exposureindex', 'ozone', 'pm25index', 'ventilation'] as const)
  hexRegisterOf('airquality', name, (AirqualityFormulas[name] as (...x: unknown[]) => unknown).bind(AirqualityFormulas))
