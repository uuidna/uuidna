import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MOBILITY — HOW PEOPLE MOVE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Moving people is numbers:
 *  the share a mode carries, commute minutes, trips per person, opportunities within reach, the congestion index, seats
 *  filled per vehicle, the fare for a distance, and the share of an area the network covers. Crosses to `logistics` —
 *  mobility is logistics for people. A measure. */

const PROOF = 'mobility arithmetic (mode share, commute time, trip rate, accessibility, congestion, vehicle occupancy, fare cost, network coverage); a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mobility', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `mobility.${name}`, params })

export class MobilityFormulas {
  /** MODE SHARE: the percentage of trips a mode carries. value ⌊trips · 100 / total⌋. */
  static modeshare(trips: number, total: number): CrossFormula { return c('mobility-modeshare', 'modeshare(trips, total) = ⌊trips · 100 / total⌋', total > 0 ? Math.floor((trips * 100) / total) : 0, nat(trips, total) && total > 0 && trips <= total, 'modeshare', [trips, total]) }
  /** COMMUTE TIME: minutes to cover a distance at a speed (km, km/h). value ⌊distance · 60 / speed⌋. */
  static commutetime(distance: number, speed: number): CrossFormula { return c('mobility-commutetime', 'commutetime(distance, speed) = ⌊distance · 60 / speed⌋', speed > 0 ? Math.floor((distance * 60) / speed) : 0, nat(distance, speed) && speed > 0, 'commutetime', [distance, speed]) }
  /** TRIP RATE: trips per person. value ⌊trips / people⌋. */
  static triprate(trips: number, people: number): CrossFormula { return c('mobility-triprate', 'triprate(trips, people) = ⌊trips / people⌋', people > 0 ? Math.floor(trips / people) : 0, nat(trips, people) && people > 0, 'triprate', [trips, people]) }
  /** ACCESSIBILITY: opportunities reached per unit of travel cost. value ⌊opportunities / cost⌋. */
  static accessibility(opportunities: number, cost: number): CrossFormula { return c('mobility-accessibility', 'accessibility(opportunities, cost) = ⌊opportunities / cost⌋', cost > 0 ? Math.floor(opportunities / cost) : 0, nat(opportunities, cost) && cost > 0, 'accessibility', [opportunities, cost]) }
  /** CONGESTION: the travel-time index, actual against free-flow. value ⌊actual · 100 / free⌋. */
  static congestion(actual: number, free: number): CrossFormula { return c('mobility-congestion', 'congestion(actual, free) = ⌊actual · 100 / free⌋', free > 0 ? Math.floor((actual * 100) / free) : 0, nat(actual, free) && free > 0, 'congestion', [actual, free]) }
  /** VEHICLE OCCUPANCY: passengers per vehicle. value ⌊passengers / vehicles⌋. */
  static vehicleoccupancy(passengers: number, vehicles: number): CrossFormula { return c('mobility-vehicleoccupancy', 'vehicleoccupancy(passengers, vehicles) = ⌊passengers / vehicles⌋', vehicles > 0 ? Math.floor(passengers / vehicles) : 0, nat(passengers, vehicles) && vehicles > 0, 'vehicleoccupancy', [passengers, vehicles]) }
  /** FARE COST: a distance at a per-unit rate. value distance · rate. */
  static farecost(distance: number, rate: number): CrossFormula { return c('mobility-farecost', 'farecost(distance, rate) = distance · rate', distance * rate, nat(distance, rate), 'farecost', [distance, rate]) }
  /** NETWORK COVERAGE: the percentage of an area the network serves. value ⌊served · 100 / area⌋. */
  static networkcoverage(served: number, area: number): CrossFormula { return c('mobility-networkcoverage', 'networkcoverage(served, area) = ⌊served · 100 / area⌋', area > 0 ? Math.floor((served * 100) / area) : 0, nat(served, area) && area > 0 && served <= area, 'networkcoverage', [served, area]) }
}

for (const name of ['accessibility', 'commutetime', 'congestion', 'farecost', 'modeshare', 'networkcoverage', 'triprate', 'vehicleoccupancy'] as const)
  hexRegisterOf('mobility', name, (MobilityFormulas[name] as (...x: unknown[]) => unknown).bind(MobilityFormulas))
