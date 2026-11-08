import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HOSPITALITY — RUNNING ROOMS, AS ARITHMETIC (chosen by the public-API registry, not by hand). A hotel is numbers:
 *  occupancy, the average daily rate, revenue per available room, guest satisfaction, the length of a stay, the no-show
 *  rate, the share of guests who return, and the share of check-ins upsold. Crosses to `tourism` — hospitality is what
 *  tourism books. A measure. */

const PROOF = 'hospitality arithmetic (occupancy, average daily rate, revpar, satisfaction, length of stay, no-shows, repeat guests, upsell); a public-API domain; a measure crossed to tourism'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hospitality', dst: 'tourism', formula, value, proof: PROOF, ...extra }, holds, { name: `hospitality.${name}`, params })

export class HospitalityFormulas {
  /** AVERAGE DAILY RATE: room revenue over the rooms sold. value ⌊revenue / roomssold⌋. */
  static adr(revenue: number, roomssold: number): CrossFormula { return c('hospitality-adr', 'adr(revenue, roomssold) = ⌊revenue / roomssold⌋', roomssold > 0 ? Math.floor(revenue / roomssold) : 0, nat(revenue, roomssold) && roomssold > 0, 'adr', [revenue, roomssold]) }
  /** NO-SHOW RATE as a percentage. value ⌊noshows · 100 / bookings⌋. */
  static noshow(noshows: number, bookings: number): CrossFormula { return c('hospitality-noshow', 'noshow(noshows, bookings) = ⌊noshows · 100 / bookings⌋', bookings > 0 ? Math.floor((noshows * 100) / bookings) : 0, nat(noshows, bookings) && bookings > 0 && noshows <= bookings, 'noshow', [noshows, bookings]) }
  /** OCCUPANCY as a percentage. value ⌊occupied · 100 / rooms⌋. */
  static occupancy(occupied: number, rooms: number): CrossFormula { return c('hospitality-occupancy', 'occupancy(occupied, rooms) = ⌊occupied · 100 / rooms⌋', rooms > 0 ? Math.floor((occupied * 100) / rooms) : 0, nat(occupied, rooms) && rooms > 0 && occupied <= rooms, 'occupancy', [occupied, rooms]) }
  /** REPEAT GUESTS: the share who return, as a percentage. value ⌊returning · 100 / guests⌋. */
  static repeat(returning: number, guests: number): CrossFormula { return c('hospitality-repeat', 'repeat(returning, guests) = ⌊returning · 100 / guests⌋', guests > 0 ? Math.floor((returning * 100) / guests) : 0, nat(returning, guests) && guests > 0 && returning <= guests, 'repeat', [returning, guests]) }
  /** REVPAR: revenue per available room. value ⌊revenue / available⌋. */
  static revpar(revenue: number, available: number): CrossFormula { return c('hospitality-revpar', 'revpar(revenue, available) = ⌊revenue / available⌋', available > 0 ? Math.floor(revenue / available) : 0, nat(revenue, available) && available > 0, 'revpar', [revenue, available]) }
  /** SATISFACTION: the average survey score. value ⌊score / surveys⌋. */
  static satisfaction(score: number, surveys: number): CrossFormula { return c('hospitality-satisfaction', 'satisfaction(score, surveys) = ⌊score / surveys⌋', surveys > 0 ? Math.floor(score / surveys) : 0, nat(score, surveys) && surveys > 0, 'satisfaction', [score, surveys]) }
  /** LENGTH OF STAY: nights over the stays. value ⌊nights / stays⌋. */
  static stay(nights: number, stays: number): CrossFormula { return c('hospitality-stay', 'stay(nights, stays) = ⌊nights / stays⌋', stays > 0 ? Math.floor(nights / stays) : 0, nat(nights, stays) && stays > 0, 'stay', [nights, stays]) }
  /** UPSELL: the share of check-ins upgraded, as a percentage. value ⌊upgraded · 100 / checkins⌋. */
  static upsell(upgraded: number, checkins: number): CrossFormula { return c('hospitality-upsell', 'upsell(upgraded, checkins) = ⌊upgraded · 100 / checkins⌋', checkins > 0 ? Math.floor((upgraded * 100) / checkins) : 0, nat(upgraded, checkins) && checkins > 0 && upgraded <= checkins, 'upsell', [upgraded, checkins]) }
}

for (const name of ['adr', 'noshow', 'occupancy', 'repeat', 'revpar', 'satisfaction', 'stay', 'upsell'] as const)
  hexRegisterOf('hospitality', name, (HospitalityFormulas[name] as (...x: unknown[]) => unknown).bind(HospitalityFormulas))
