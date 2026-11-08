import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PARTNER — THE PARTNERS/PARTNERFILTERS USE CASE FROM payloadcms/website, AS ARITHMETIC. A partner directory with
 *  filters is numbers: the directory size, the share a filter matches, the partners in a tier, commission on revenue,
 *  the close rate on referred leads, an average rating, partners per region, and the share of a listing that is active.
 *  Crosses to `frontend` — a partner directory is what the frontend renders. A measure. */

const PROOF = 'partner arithmetic (directory, filter share, tier, commission, lead close rate, rating, regions, active listing); the payloadcms/website Partners/PartnerFilters use case; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'partner', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `partner.${name}`, params })

export class PartnerFormulas {
  /** THE DIRECTORY: the partners listed. value count. */
  static directory(count: number): CrossFormula { return c('partner-directory', 'directory(count) = count', count, nat(count), 'directory', [count]) }
  /** A FILTER: the share of the directory it matches, as a percentage. value ⌊matched · 100 / total⌋. */
  static filter(matched: number, total: number): CrossFormula { return c('partner-filter', 'filter(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'filter', [matched, total]) }
  /** A TIER: the partners in each tier. value ⌊partners / tiers⌋. */
  static tier(partners: number, tiers: number): CrossFormula { return c('partner-tier', 'tier(partners, tiers) = ⌊partners / tiers⌋', tiers > 0 ? Math.floor(partners / tiers) : 0, nat(partners, tiers) && tiers > 0, 'tier', [partners, tiers]) }
  /** COMMISSION: a percentage of revenue. value ⌊revenue · pct / 100⌋. */
  static commission(revenue: number, pct: number): CrossFormula { return c('partner-commission', 'commission(revenue, pct) = ⌊revenue · pct / 100⌋', Math.floor((revenue * pct) / 100), nat(revenue, pct), 'commission', [revenue, pct]) }
  /** LEADS: the close rate on referred leads, as a percentage. value ⌊closed · 100 / referred⌋. */
  static leads(closed: number, referred: number): CrossFormula { return c('partner-leads', 'leads(closed, referred) = ⌊closed · 100 / referred⌋', referred > 0 ? Math.floor((closed * 100) / referred) : 0, nat(closed, referred) && referred > 0 && closed <= referred, 'leads', [closed, referred]) }
  /** RATING: the average rating, to a tenth. value ⌊sum · 10 / votes⌋. */
  static rating(sum: number, votes: number): CrossFormula { return c('partner-rating', 'rating(sum, votes) = ⌊sum · 10 / votes⌋', votes > 0 ? Math.floor((sum * 10) / votes) : 0, nat(sum, votes) && votes > 0, 'rating', [sum, votes]) }
  /** REGIONS: the partners in each region. value ⌊partners / regions⌋. */
  static regions(partners: number, regions: number): CrossFormula { return c('partner-regions', 'regions(partners, regions) = ⌊partners / regions⌋', regions > 0 ? Math.floor(partners / regions) : 0, nat(partners, regions) && regions > 0, 'regions', [partners, regions]) }
  /** A LISTING: the share of it that is active, as a percentage. value ⌊active · 100 / total⌋. */
  static listing(active: number, total: number): CrossFormula { return c('partner-listing', 'listing(active, total) = ⌊active · 100 / total⌋', total > 0 ? Math.floor((active * 100) / total) : 0, nat(active, total) && total > 0 && active <= total, 'listing', [active, total]) }
}

for (const name of ['commission', 'directory', 'filter', 'leads', 'listing', 'rating', 'regions', 'tier'] as const)
  hexRegisterOf('partner', name, (PartnerFormulas[name] as (...x: unknown[]) => unknown).bind(PartnerFormulas))
