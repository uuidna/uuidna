// public-apis — ONE CATALOG of every keyless public door uuidnaOS names, probes, or sweeps. Pure registry.
import { merkleGravity } from '../../../gravity/index.js'
import { toUuid } from '../../../address.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { RESEARCH_SOURCE_NAMES } from '../research/index.js'
import { EXTENDED_RESEARCH_PROBES } from '../research/index.js'
import { SCHOOL_APIS, schoolApiRegistry } from '../school/index.js'

export type PublicApiKind =
  | 'research' | 'eu-education' | 'corpus' | 'weather' | 'news' | 'market' | 'registry' | 'metadata' | 'served'

export interface PublicApiEntry {
  id: string
  host: string
  base: string
  kind: PublicApiKind
  access: 'keyless' | 'mailto-polite' | 'post' | 'served-not-fetched' | 'metadata-only'
  direction: 'fetched' | 'served' | 'metadata-only'
  sweep: boolean
  heartbeat: boolean
  probe?: { query: string }
  honest: string
}

const WEATHER_APIS: PublicApiEntry[] = [
  { id: 'open-meteo-forecast', host: 'api.open-meteo.com', base: 'https://api.open-meteo.com/v1/forecast',
    kind: 'weather', access: 'keyless', direction: 'fetched', sweep: false, heartbeat: true,
    probe: { query: '42.6977,23.3219' },
    honest: 'DECIDABLE weather facts (temperature, wind, pressure) — evidence for sailing correlation, never a forecast guarantee.' },
  { id: 'noaa-tides', host: 'api.tidesandcurrents.noaa.gov', base: 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter',
    kind: 'weather', access: 'keyless', direction: 'fetched', sweep: false, heartbeat: true,
    probe: { query: '9414290' },
    honest: 'U.S. tide predictions — decidable heights and times, not navigation advice.' },
  { id: 'open-meteo-geocoding', host: 'geocoding-api.open-meteo.com', base: 'https://geocoding-api.open-meteo.com/v1/search',
    kind: 'weather', access: 'keyless', direction: 'fetched', sweep: false, heartbeat: false,
    honest: 'Place-name geocoding for the forecast door — evidence of a coordinate, not a claim about the place.' },
]

const NEWS_APIS: PublicApiEntry[] = [
  { id: 'wikinews-rss', host: 'en.wikinews.org', base: 'https://en.wikinews.org/w/api.php?action=feedrecentchanges&feedformat=rss',
    kind: 'news', access: 'keyless', direction: 'fetched', sweep: false, heartbeat: true,
    honest: 'Featured RSS feed — articles are AUDITED by the news portal, not auto-sealed.' },
]

const OTHER_APIS: PublicApiEntry[] = [
  { id: 'stooq', host: 'stooq.com', base: 'https://stooq.com/q/d/l/', kind: 'market', access: 'keyless',
    direction: 'fetched', sweep: false, heartbeat: false,
    honest: 'Historic series — fetch-once mirror in market.ts; reproducibility, not prophecy.' },
  { id: 'beacon-nist', host: 'beacon.nist.gov', base: 'https://beacon.nist.gov/beacon/2.0/pulse/last',
    kind: 'metadata', access: 'keyless', direction: 'fetched', sweep: false, heartbeat: false,
    honest: 'Temporal anchor — NOT-BEFORE bound on a handle, not corroboration of a claim.' },
  { id: 'nvd', host: 'services.nvd.nist.gov', base: 'https://services.nvd.nist.gov/rest/json/cves/2.0',
    kind: 'registry', access: 'keyless', direction: 'fetched', sweep: false, heartbeat: false,
    honest: 'CVE metadata — security evidence, not theorem seals.' },
  { id: 'uuidna-site', host: 'uuidna.com', base: 'https://uuidna.com',
    kind: 'served', access: 'served-not-fetched', direction: 'served', sweep: false, heartbeat: false,
    honest: 'This repository SERVES uuidna.com — the hosted MCP, theorem pages, and trial POST. Not an external API.' },
]

/** publicApiRegistry() → every named public API, grouped by kind, with one order-invariant receipt. Pure. */
export function publicApiRegistry(): {
  research: PublicApiEntry[]
  euEducation: PublicApiEntry[]
  weather: PublicApiEntry[]
  news: PublicApiEntry[]
  other: PublicApiEntry[]
  count: number
  sweepCount: number
  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
} {
  const research: PublicApiEntry[] = RESEARCH_SOURCE_NAMES.map((host) => {
    const ext = EXTENDED_RESEARCH_PROBES.find((p) => p.id === host)
    return {
      id: host.replace(/\./g, '-'),
      host,
      base: host === 'mathoverflow.net' || host === 'api.stackexchange.com' || host.endsWith('.stackexchange.com')
        ? 'https://api.stackexchange.com' : `https://${host}`,
      kind: 'research' as const,
      access: host === 'crossref.org' || host === 'openalex.org' ? 'mailto-polite' as const : 'keyless' as const,
      direction: 'fetched' as const,
      sweep: true,
      heartbeat: true,
      ...(ext ? { probe: { query: ext.query } } : { probe: { query: 'quantum' } }),
      honest: 'External research CORROBORATES — provenance fingerprint only; only a by-decide theorem SEALS.',
    }
  })

  const euEducation: PublicApiEntry[] = SCHOOL_APIS.map((s) => ({
    id: s.id,
    host: new URL(s.base).host,
    base: s.base,
    kind: 'eu-education' as const,
    access: s.access.includes('no key') ? 'keyless' as const : 'keyless' as const,
    direction: s.direction,
    sweep: false,
    heartbeat: s.direction === 'fetched',
    ...(s.probe ? { probe: { query: JSON.stringify(s.probe) } } : {}),
    honest: s.honest,
  }))

  const all = [...research, ...euEducation, ...WEATHER_APIS, ...NEWS_APIS, ...OTHER_APIS]
  const receipt = merkleGravity(all.map((a) => toUuid(`${a.id}:${a.host}:${a.base}`)))
  return {
    research,
    euEducation,
    weather: WEATHER_APIS,
    news: NEWS_APIS,
    other: OTHER_APIS,
    count: all.length,
    sweepCount: research.length,
    receipt,
    ...hexbitDoorOf(receipt),
    honest: schoolApiRegistry().honest,
  }
}

export { RESEARCH_SOURCE_NAMES } from '../research/index.js'
