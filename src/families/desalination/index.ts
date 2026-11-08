import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DESALINATION — TURNING SEAWATER INTO FRESH WATER, AS ARITHMETIC (a reverse-osmosis train is numbers). Recovery ratio,
 *  feed salinity, the permeate a mass balance leaves, salt rejection, membrane flux, the osmotic pressure to beat, the
 *  brine sent back, and the specific energy a cubic metre costs. Crosses to `chemistry` — desalination is a chemistry the
 *  membrane does. A measure. */

const PROOF = 'desalination arithmetic (recovery, salinity, permeate mass balance, salt rejection, membrane flux, osmotic pressure, brine, specific energy); a reverse-osmosis train as integers; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'desalination', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `desalination.${name}`, params })

export class DesalinationFormulas {
  /** RECOVERY: the permeate won as a percentage of the feed. value ⌊permeate · 100 / feed⌋. */
  static recovery(permeate: number, feed: number): CrossFormula { return c('desalination-recovery', 'recovery(permeate, feed) = ⌊permeate · 100 / feed⌋', feed > 0 ? Math.floor((permeate * 100) / feed) : 0, nat(permeate, feed) && feed > 0 && permeate <= feed, 'recovery', [permeate, feed]) }
  /** SALINITY: salt mass over volume, a concentration. value ⌊salt / volume⌋. */
  static salinity(salt: number, volume: number): CrossFormula { return c('desalination-salinity', 'salinity(salt, volume) = ⌊salt / volume⌋', volume > 0 ? Math.floor(salt / volume) : 0, nat(salt, volume) && volume > 0, 'salinity', [salt, volume]) }
  /** PERMEATE: the fresh water a mass balance leaves. value max(0, feed − brine). */
  static permeate(feed: number, brine: number): CrossFormula { return c('desalination-permeate', 'permeate(feed, brine) = max(0, feed − brine)', Math.max(0, feed - brine), nat(feed, brine), 'permeate', [feed, brine]) }
  /** REJECTION: the salt the membrane holds back, as a percentage. value ⌊(feedSalt − permSalt) · 100 / feedSalt⌋. */
  static rejection(feedSalt: number, permSalt: number): CrossFormula { return c('desalination-rejection', 'rejection(feedSalt, permSalt) = ⌊(feedSalt − permSalt) · 100 / feedSalt⌋', feedSalt > 0 ? Math.floor((Math.max(0, feedSalt - permSalt) * 100) / feedSalt) : 0, nat(feedSalt, permSalt) && feedSalt > 0 && permSalt <= feedSalt, 'rejection', [feedSalt, permSalt]) }
  /** FLUX: permeate volume over membrane area. value ⌊volume / area⌋. */
  static flux(volume: number, area: number): CrossFormula { return c('desalination-flux', 'flux(volume, area) = ⌊volume / area⌋', area > 0 ? Math.floor(volume / area) : 0, nat(volume, area) && area > 0, 'flux', [volume, area]) }
  /** OSMOTIC PRESSURE: van't Hoff, proportional to concentration and temperature. value conc · temp. */
  static osmotic(conc: number, temp: number): CrossFormula { return c('desalination-osmotic', 'osmotic(conc, temp) = conc · temp', conc * temp, nat(conc, temp), 'osmotic', [conc, temp]) }
  /** BRINE: the concentrate a mass balance sends back. value max(0, feed − permeate). */
  static brine(feed: number, permeate: number): CrossFormula { return c('desalination-brine', 'brine(feed, permeate) = max(0, feed − permeate)', Math.max(0, feed - permeate), nat(feed, permeate), 'brine', [feed, permeate]) }
  /** SPECIFIC ENERGY: power over the flow it treats. value ⌊power / flow⌋. */
  static energy(power: number, flow: number): CrossFormula { return c('desalination-energy', 'energy(power, flow) = ⌊power / flow⌋', flow > 0 ? Math.floor(power / flow) : 0, nat(power, flow) && flow > 0, 'energy', [power, flow]) }
}

for (const name of ['brine', 'energy', 'flux', 'osmotic', 'permeate', 'recovery', 'rejection', 'salinity'] as const)
  hexRegisterOf('desalination', name, (DesalinationFormulas[name] as (...x: unknown[]) => unknown).bind(DesalinationFormulas))
