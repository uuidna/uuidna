import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EVENTS — RUNNING A GATHERING, AS ARITHMETIC (chosen by the public-API registry, not by hand). An event is numbers:
 *  who showed against who signed up, the house filled, the gate taken, cost per head, interactions per head, who never
 *  came, the score per response, and leads turned into guests. Crosses to `tourism` — an event is why people travel. A measure. */

const PROOF = 'events arithmetic (attendance, capacity, revenue, cost per attendee, engagement, no-show, satisfaction, conversion); a registry domain; a measure crossed to tourism'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'events', dst: 'tourism', formula, value, proof: PROOF, ...extra }, holds, { name: `events.${name}`, params })

export class EventsFormulas {
  /** ATTENDANCE as a percentage of those registered. value ⌊attended · 100 / registered⌋. */
  static attendance(attended: number, registered: number): CrossFormula { return c('events-attendance', 'attendance(attended, registered) = ⌊attended · 100 / registered⌋', registered > 0 ? Math.floor((attended * 100) / registered) : 0, nat(attended, registered) && registered > 0 && attended <= registered, 'attendance', [attended, registered]) }
  /** CAPACITY: the house filled, tickets sold against the venue. value ⌊sold · 100 / venue⌋. */
  static capacity(sold: number, venue: number): CrossFormula { return c('events-capacity', 'capacity(sold, venue) = ⌊sold · 100 / venue⌋', venue > 0 ? Math.floor((sold * 100) / venue) : 0, nat(sold, venue) && venue > 0 && sold <= venue, 'capacity', [sold, venue]) }
  /** REVENUE: tickets at a price each. value tickets · price. */
  static revenue(tickets: number, price: number): CrossFormula { return c('events-revenue', 'revenue(tickets, price) = tickets · price', tickets * price, nat(tickets, price), 'revenue', [tickets, price]) }
  /** COST PER ATTENDEE: total cost over the heads present. value ⌊cost / attendees⌋. */
  static costperattendee(cost: number, attendees: number): CrossFormula { return c('events-costperattendee', 'costperattendee(cost, attendees) = ⌊cost / attendees⌋', attendees > 0 ? Math.floor(cost / attendees) : 0, nat(cost, attendees) && attendees > 0, 'costperattendee', [cost, attendees]) }
  /** ENGAGEMENT: interactions per head present. value ⌊interactions / attendees⌋. */
  static engagement(interactions: number, attendees: number): CrossFormula { return c('events-engagement', 'engagement(interactions, attendees) = ⌊interactions / attendees⌋', attendees > 0 ? Math.floor(interactions / attendees) : 0, nat(interactions, attendees) && attendees > 0, 'engagement', [interactions, attendees]) }
  /** NO-SHOW as a percentage of those registered. value ⌊noshows · 100 / registered⌋. */
  static noshow(noshows: number, registered: number): CrossFormula { return c('events-noshow', 'noshow(noshows, registered) = ⌊noshows · 100 / registered⌋', registered > 0 ? Math.floor((noshows * 100) / registered) : 0, nat(noshows, registered) && registered > 0 && noshows <= registered, 'noshow', [noshows, registered]) }
  /** SATISFACTION: the score averaged over the responses. value ⌊score / responses⌋. */
  static satisfaction(score: number, responses: number): CrossFormula { return c('events-satisfaction', 'satisfaction(score, responses) = ⌊score / responses⌋', responses > 0 ? Math.floor(score / responses) : 0, nat(score, responses) && responses > 0, 'satisfaction', [score, responses]) }
  /** CONVERSION: leads turned into guests, as a percentage. value ⌊converted · 100 / leads⌋. */
  static conversion(converted: number, leads: number): CrossFormula { return c('events-conversion', 'conversion(converted, leads) = ⌊converted · 100 / leads⌋', leads > 0 ? Math.floor((converted * 100) / leads) : 0, nat(converted, leads) && leads > 0 && converted <= leads, 'conversion', [converted, leads]) }
}

for (const name of ['attendance', 'capacity', 'conversion', 'costperattendee', 'engagement', 'noshow', 'revenue', 'satisfaction'] as const)
  hexRegisterOf('events', name, (EventsFormulas[name] as (...x: unknown[]) => unknown).bind(EventsFormulas))
