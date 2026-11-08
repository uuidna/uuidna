import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CUSTOMER — THE CRM / CUSTOMER-RELATION DOMAIN, AS ARITHMETIC. Keeping customers is numbers: how satisfied they are,
 *  the net promoter score, who churned and who stayed, the tickets each agent carries, how many get resolved, response
 *  load, and how often an upsell lands. Crosses to `analytics` — customer relations is what analytics reads. A measure. */

const PROOF = 'customer arithmetic (csat, nps, churn, retention, tickets per agent, resolution, response, upsell); the CRM domain as integer measures crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'customer', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `customer.${name}`, params })

export class CustomerFormulas {
  /** CSAT: satisfied of those surveyed, as a percentage. value ⌊satisfied · 100 / surveyed⌋. */
  static csat(satisfied: number, surveyed: number): CrossFormula { return c('customer-csat', 'csat(satisfied, surveyed) = ⌊satisfied · 100 / surveyed⌋', surveyed > 0 ? Math.floor((satisfied * 100) / surveyed) : 0, nat(satisfied, surveyed) && surveyed > 0 && satisfied <= surveyed, 'csat', [satisfied, surveyed]) }
  /** NPS: promoters less detractors (may be negative; still an integer). value promoters − detractors. */
  static nps(promoters: number, detractors: number): CrossFormula { return c('customer-nps', 'nps(promoters, detractors) = promoters − detractors', promoters - detractors, nat(promoters, detractors), 'nps', [promoters, detractors]) }
  /** CHURN: customers lost over those at the start, as a percentage. value ⌊lost · 100 / start⌋. */
  static churn(lost: number, start: number): CrossFormula { return c('customer-churn', 'churn(lost, start) = ⌊lost · 100 / start⌋', start > 0 ? Math.floor((lost * 100) / start) : 0, nat(lost, start) && start > 0 && lost <= start, 'churn', [lost, start]) }
  /** RETENTION: customers retained over those at the start, as a percentage. value ⌊retained · 100 / start⌋. */
  static retention(retained: number, start: number): CrossFormula { return c('customer-retention', 'retention(retained, start) = ⌊retained · 100 / start⌋', start > 0 ? Math.floor((retained * 100) / start) : 0, nat(retained, start) && start > 0 && retained <= start, 'retention', [retained, start]) }
  /** TICKETS: open tickets spread over the agents on duty. value ⌊open / agents⌋. */
  static tickets(open: number, agents: number): CrossFormula { return c('customer-tickets', 'tickets(open, agents) = ⌊open / agents⌋', agents > 0 ? Math.floor(open / agents) : 0, nat(open, agents) && agents > 0, 'tickets', [open, agents]) }
  /** RESOLUTION: resolved of the total, as a percentage. value ⌊resolved · 100 / total⌋. */
  static resolution(resolved: number, total: number): CrossFormula { return c('customer-resolution', 'resolution(resolved, total) = ⌊resolved · 100 / total⌋', total > 0 ? Math.floor((resolved * 100) / total) : 0, nat(resolved, total) && total > 0 && resolved <= total, 'resolution', [resolved, total]) }
  /** RESPONSE: total response minutes over the tickets they covered. value ⌊total / tickets⌋. */
  static response(total: number, tickets: number): CrossFormula { return c('customer-response', 'response(total, tickets) = ⌊total / tickets⌋', tickets > 0 ? Math.floor(total / tickets) : 0, nat(total, tickets) && tickets > 0, 'response', [total, tickets]) }
  /** UPSELL: customers upsold of the total, as a percentage. value ⌊upsold · 100 / total⌋. */
  static upsell(upsold: number, total: number): CrossFormula { return c('customer-upsell', 'upsell(upsold, total) = ⌊upsold · 100 / total⌋', total > 0 ? Math.floor((upsold * 100) / total) : 0, nat(upsold, total) && total > 0 && upsold <= total, 'upsell', [upsold, total]) }
}

for (const name of ['churn', 'csat', 'nps', 'resolution', 'response', 'retention', 'tickets', 'upsell'] as const)
  hexRegisterOf('customer', name, (CustomerFormulas[name] as (...x: unknown[]) => unknown).bind(CustomerFormulas))
