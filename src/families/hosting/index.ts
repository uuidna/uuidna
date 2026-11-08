import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HOSTING — WEB HOSTING AS ARITHMETIC (chosen by the public-API registry, not by hand). Serving sites is numbers: the
 *  domains under an account, DNS records across zones, the days an SSL certificate still has, metered bandwidth, uptime,
 *  the traffic a visitor count carries, storage, and the overage past a quota. Crosses to `obs` — hosting is what
 *  observability watches. A measure. */

const PROOF = 'hosting arithmetic (domains, dns records, ssl validity, bandwidth, uptime, traffic, storage, overage); a public-API hosting domain; a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hosting', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `hosting.${name}`, params })

export class HostingFormulas {
  /** DOMAINS: sites at a count each. value sites · each. */
  static domains(sites: number, each: number): CrossFormula { return c('hosting-domains', 'domains(sites, each) = sites · each', sites * each, nat(sites, each), 'domains', [sites, each]) }
  /** DNS RECORDS: records across zones. value records · zones. */
  static dns(records: number, zones: number): CrossFormula { return c('hosting-dns', 'dns(records, zones) = records · zones', records * zones, nat(records, zones), 'dns', [records, zones]) }
  /** SSL: the days a certificate still has. value max(0, expiry − now). */
  static ssl(now: number, expiry: number): CrossFormula { return c('hosting-ssl', 'ssl(now, expiry) = max(0, expiry − now)', Math.max(0, expiry - now), nat(now, expiry), 'ssl', [now, expiry]) }
  /** BANDWIDTH: gigabytes at a rate per thousand. value ⌊gb · rate / 1000⌋. */
  static bandwidth(gb: number, rate: number): CrossFormula { return c('hosting-bandwidth', 'bandwidth(gb, rate) = ⌊gb · rate / 1000⌋', Math.floor((gb * rate) / 1000), nat(gb, rate), 'bandwidth', [gb, rate]) }
  /** UPTIME as a percentage. value ⌊up · 100 / total⌋. */
  static uptime(up: number, total: number): CrossFormula { return c('hosting-uptime', 'uptime(up, total) = ⌊up · 100 / total⌋', total > 0 ? Math.floor((up * 100) / total) : 0, nat(up, total) && total > 0 && up <= total, 'uptime', [up, total]) }
  /** TRAFFIC: visits at an average payload. value visits · avg. */
  static traffic(visits: number, avg: number): CrossFormula { return c('hosting-traffic', 'traffic(visits, avg) = visits · avg', visits * avg, nat(visits, avg), 'traffic', [visits, avg]) }
  /** STORAGE: sites at a size each. value sites · each. */
  static storage(sites: number, each: number): CrossFormula { return c('hosting-storage', 'storage(sites, each) = sites · each', sites * each, nat(sites, each), 'storage', [sites, each]) }
  /** OVERAGE: usage past a quota. value max(0, used − quota). */
  static overage(used: number, quota: number): CrossFormula { return c('hosting-overage', 'overage(used, quota) = max(0, used − quota)', Math.max(0, used - quota), nat(used, quota), 'overage', [used, quota]) }
}

for (const name of ['bandwidth', 'dns', 'domains', 'overage', 'ssl', 'storage', 'traffic', 'uptime'] as const)
  hexRegisterOf('hosting', name, (HostingFormulas[name] as (...x: unknown[]) => unknown).bind(HostingFormulas))
