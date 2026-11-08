import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LODGING — HOSPITALITY AS ARITHMETIC (chosen by the public-API registry, not by hand). A place to stay is numbers:
 *  rooms filled, the nightly rate earned, turnovers cleaned, bookings cancelled, how far ahead guests book, the rating
 *  reviews settle on, amenities used, and the peak season against the off. Crosses to `tourism` — lodging is where
 *  tourism rests. A measure. */

const PROOF = 'lodging arithmetic (occupancy, nightly rate, cleaning, cancellation, lead time, rating, amenity use, seasonality); a hospitality domain from the public-API registry; a measure crossed to tourism'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lodging', dst: 'tourism', formula, value, proof: PROOF, ...extra }, holds, { name: `lodging.${name}`, params })

export class LodgingFormulas {
  /** OCCUPANCY as a percentage of units booked. value ⌊booked · 100 / units⌋. */
  static occupancy(booked: number, units: number): CrossFormula { return c('lodging-occupancy', 'occupancy(booked, units) = ⌊booked · 100 / units⌋', units > 0 ? Math.floor((booked * 100) / units) : 0, nat(booked, units) && units > 0 && booked <= units, 'occupancy', [booked, units]) }
  /** NIGHTLY RATE: revenue over the nights sold. value ⌊revenue / nights⌋. */
  static nightlyrate(revenue: number, nights: number): CrossFormula { return c('lodging-nightlyrate', 'nightlyrate(revenue, nights) = ⌊revenue / nights⌋', nights > 0 ? Math.floor(revenue / nights) : 0, nat(revenue, nights) && nights > 0, 'nightlyrate', [revenue, nights]) }
  /** CLEANING: rooms cleaned per turnover. value ⌊cleaned / turnovers⌋. */
  static cleaning(cleaned: number, turnovers: number): CrossFormula { return c('lodging-cleaning', 'cleaning(cleaned, turnovers) = ⌊cleaned / turnovers⌋', turnovers > 0 ? Math.floor(cleaned / turnovers) : 0, nat(cleaned, turnovers) && turnovers > 0, 'cleaning', [cleaned, turnovers]) }
  /** CANCELLATION as a percentage of bookings. value ⌊cancelled · 100 / bookings⌋. */
  static cancellation(cancelled: number, bookings: number): CrossFormula { return c('lodging-cancellation', 'cancellation(cancelled, bookings) = ⌊cancelled · 100 / bookings⌋', bookings > 0 ? Math.floor((cancelled * 100) / bookings) : 0, nat(cancelled, bookings) && bookings > 0 && cancelled <= bookings, 'cancellation', [cancelled, bookings]) }
  /** LEAD TIME: nights between booking and stay. value max(0, stay − booked). */
  static leadtime(booked: number, stay: number): CrossFormula { return c('lodging-leadtime', 'leadtime(booked, stay) = max(0, stay − booked)', Math.max(0, stay - booked), nat(booked, stay), 'leadtime', [booked, stay]) }
  /** RATING: the score averaged over the reviews. value ⌊score / reviews⌋. */
  static rating(score: number, reviews: number): CrossFormula { return c('lodging-rating', 'rating(score, reviews) = ⌊score / reviews⌋', reviews > 0 ? Math.floor(score / reviews) : 0, nat(score, reviews) && reviews > 0, 'rating', [score, reviews]) }
  /** AMENITY: amenities used as a percentage of those offered. value ⌊used · 100 / offered⌋. */
  static amenity(used: number, offered: number): CrossFormula { return c('lodging-amenity', 'amenity(used, offered) = ⌊used · 100 / offered⌋', offered > 0 ? Math.floor((used * 100) / offered) : 0, nat(used, offered) && offered > 0 && used <= offered, 'amenity', [used, offered]) }
  /** SEASONALITY: peak demand against the off-peak, as a percentage. value ⌊peak · 100 / offpeak⌋. */
  static seasonality(peak: number, offpeak: number): CrossFormula { return c('lodging-seasonality', 'seasonality(peak, offpeak) = ⌊peak · 100 / offpeak⌋', offpeak > 0 ? Math.floor((peak * 100) / offpeak) : 0, nat(peak, offpeak) && offpeak > 0, 'seasonality', [peak, offpeak]) }
}

for (const name of ['amenity', 'cancellation', 'cleaning', 'leadtime', 'nightlyrate', 'occupancy', 'rating', 'seasonality'] as const)
  hexRegisterOf('lodging', name, (LodgingFormulas[name] as (...x: unknown[]) => unknown).bind(LodgingFormulas))
