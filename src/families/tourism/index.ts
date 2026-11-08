import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TOURISM — TRAVEL & HOSPITALITY, AS ARITHMETIC (chosen by the public-API registry, not by hand). Filling rooms is
 *  numbers: occupancy, revenue per room, the average daily rate, guest-nights, how peak compares to the off-season,
 *  total beds, visitor spend, and the average length of stay. Crosses to `econ` — tourism is money through a region.
 *  A measure. */

const PROOF = 'tourism arithmetic (occupancy, revpar, adr, guest-nights, seasonality, capacity, spend, length of stay); travel & hospitality as a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tourism', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `tourism.${name}`, params })

export class TourismFormulas {
  /** OCCUPANCY as a percentage. value ⌊booked · 100 / rooms⌋. */
  static occupancy(booked: number, rooms: number): CrossFormula { return c('tourism-occupancy', 'occupancy(booked, rooms) = ⌊booked · 100 / rooms⌋', rooms > 0 ? Math.floor((booked * 100) / rooms) : 0, nat(booked, rooms) && rooms > 0 && booked <= rooms, 'occupancy', [booked, rooms]) }
  /** REVPAR: revenue per available room. value ⌊revenue / rooms⌋. */
  static revpar(revenue: number, rooms: number): CrossFormula { return c('tourism-revpar', 'revpar(revenue, rooms) = ⌊revenue / rooms⌋', rooms > 0 ? Math.floor(revenue / rooms) : 0, nat(revenue, rooms) && rooms > 0, 'revpar', [revenue, rooms]) }
  /** ADR: the average daily rate over the rooms sold. value ⌊revenue / sold⌋. */
  static adr(revenue: number, sold: number): CrossFormula { return c('tourism-adr', 'adr(revenue, sold) = ⌊revenue / sold⌋', sold > 0 ? Math.floor(revenue / sold) : 0, nat(revenue, sold) && sold > 0, 'adr', [revenue, sold]) }
  /** GUEST-NIGHTS: guests over the nights they stay. value guests · stay. */
  static nights(guests: number, stay: number): CrossFormula { return c('tourism-nights', 'nights(guests, stay) = guests · stay', guests * stay, nat(guests, stay), 'nights', [guests, stay]) }
  /** SEASONALITY: peak against the off-season, as a percentage. value ⌊peak · 100 / offpeak⌋. */
  static seasonality(peak: number, offpeak: number): CrossFormula { return c('tourism-seasonality', 'seasonality(peak, offpeak) = ⌊peak · 100 / offpeak⌋', offpeak > 0 ? Math.floor((peak * 100) / offpeak) : 0, nat(peak, offpeak) && offpeak > 0, 'seasonality', [peak, offpeak]) }
  /** CAPACITY: beds across the rooms. value rooms · beds. */
  static capacity(rooms: number, beds: number): CrossFormula { return c('tourism-capacity', 'capacity(rooms, beds) = rooms · beds', rooms * beds, nat(rooms, beds), 'capacity', [rooms, beds]) }
  /** SPEND: visitors at a spend per head. value visitors · perHead. */
  static spend(visitors: number, perHead: number): CrossFormula { return c('tourism-spend', 'spend(visitors, perHead) = visitors · perHead', visitors * perHead, nat(visitors, perHead), 'spend', [visitors, perHead]) }
  /** LENGTH OF STAY: guest-nights over arrivals. value ⌊nights / arrivals⌋. */
  static length(nights: number, arrivals: number): CrossFormula { return c('tourism-length', 'length(nights, arrivals) = ⌊nights / arrivals⌋', arrivals > 0 ? Math.floor(nights / arrivals) : 0, nat(nights, arrivals) && arrivals > 0, 'length', [nights, arrivals]) }
}

for (const name of ['adr', 'capacity', 'length', 'nights', 'occupancy', 'revpar', 'seasonality', 'spend'] as const)
  hexRegisterOf('tourism', name, (TourismFormulas[name] as (...x: unknown[]) => unknown).bind(TourismFormulas))
