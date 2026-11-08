import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LICENSING — SOFTWARE ENTITLEMENT AS ARITHMETIC (chosen by the public-API registry, not by hand). Holding a licence is
 *  numbers: the seats a headcount needs, how much of a pool is used, renewal cost over a term, whether usage stays within
 *  the grant, total cost, the seats run over, when a term ends, and what entitlement is left. Crosses to `law` — a licence
 *  is a lawful grant, and these measures are what law is read against. A measure. */

const PROOF = 'licensing arithmetic (seats, utilization, renewal, compliance, true cost, overage, term, entitlement); a public-API registry domain; a measure crossed to law'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'licensing', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `licensing.${name}`, params })

export class LicensingFormulas {
  /** SEATS: the seats a headcount needs at a per-seat capacity. value ⌈users / perSeat⌉. */
  static seats(users: number, perSeat: number): CrossFormula { return c('licensing-seats', 'seats(users, perSeat) = ⌈users / perSeat⌉', perSeat > 0 ? Math.ceil(users / perSeat) : 0, nat(users, perSeat) && perSeat > 0, 'seats', [users, perSeat]) }
  /** UTILIZATION of a seat pool, as a percentage. value ⌊active · 100 / total⌋. */
  static utilization(active: number, total: number): CrossFormula { return c('licensing-utilization', 'utilization(active, total) = ⌊active · 100 / total⌋', total > 0 ? Math.floor((active * 100) / total) : 0, nat(active, total) && total > 0 && active <= total, 'utilization', [active, total]) }
  /** RENEWAL cost over a term of months at a monthly rate. value months · rate. */
  static renewal(months: number, rate: number): CrossFormula { return c('licensing-renewal', 'renewal(months, rate) = months · rate', months * rate, nat(months, rate), 'renewal', [months, rate]) }
  /** COMPLIANCE: 1 when usage stays within the licensed grant. value [used ≤ licensed]. */
  static compliance(licensed: number, used: number): CrossFormula { return c('licensing-compliance', 'compliance(licensed, used) = [used ≤ licensed]', used <= licensed ? 1 : 0, nat(licensed, used), 'compliance', [licensed, used]) }
  /** TRUE COST: seats at a price each. value seats · price. */
  static truecost(seats: number, price: number): CrossFormula { return c('licensing-truecost', 'truecost(seats, price) = seats · price', seats * price, nat(seats, price), 'truecost', [seats, price]) }
  /** OVERAGE: the seats used over the licensed count. value max(0, used − licensed). */
  static overage(used: number, licensed: number): CrossFormula { return c('licensing-overage', 'overage(used, licensed) = max(0, used − licensed)', Math.max(0, used - licensed), nat(used, licensed), 'overage', [used, licensed]) }
  /** TERM: the period a term ends, from a start and a length. value start + length. */
  static term(start: number, length: number): CrossFormula { return c('licensing-term', 'term(start, length) = start + length', start + length, nat(start, length), 'term', [start, length]) }
  /** ENTITLEMENT left: the grant less what is consumed. value max(0, total − consumed). */
  static entitlement(total: number, consumed: number): CrossFormula { return c('licensing-entitlement', 'entitlement(total, consumed) = max(0, total − consumed)', Math.max(0, total - consumed), nat(total, consumed), 'entitlement', [total, consumed]) }
}

for (const name of ['compliance', 'entitlement', 'overage', 'renewal', 'seats', 'term', 'truecost', 'utilization'] as const)
  hexRegisterOf('licensing', name, (LicensingFormulas[name] as (...x: unknown[]) => unknown).bind(LicensingFormulas))
