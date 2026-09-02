// public-apis — ONE CATALOG of every keyless public door uuidnaOS names, probes, or sweeps. Pure registry.
import { merkleGravity } from '../../../gravity/index.js'
import { toUuid } from '../../../address.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { RESEARCH_SOURCE_NAMES } from '../research/index.js'
import { EXTENDED_RESEARCH_PROBES } from '../research/index.js'
import { SCHOOL_APIS, schoolApiRegistry } from '../school/index.js'
import { JOURNAL_DOORS } from '../journals/index.js'

export type PublicApiKind =
  | 'research' | 'eu-education' | 'corpus' | 'weather' | 'news' | 'market' | 'registry' | 'metadata' | 'served' | 'journal'

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

/** Doors whose REST base is not the host root, or whose scope must be said in its own words rather than the
 *  generic research line. Keyed by host, so a door is described once and the sweep list stays a list of names. */
const RESEARCH_DOOR_OVERRIDES: Record<string, { base?: string; honest?: string }> = {
  'journals.aas.org': {
    base: 'https://journals.aas.org/wp-json/wp/v2',
    honest: 'AAS’s OWN journal pages — scope, policy, author instructions, the pre-submission checklist — through '
      + 'the keyless WordPress REST API. The ARTICLES are IOP’s, under DOI prefix 10.3847: this door serves none of '
      + 'them, and a hit here is AAS writing about a journal, never a paper in it.',
  },
}

const OTHER_APIS: PublicApiEntry[] = [
  { id: 'zenodo-communities', host: 'zenodo.org', base: 'https://zenodo.org/api/communities',
    kind: 'registry', access: 'keyless', direction: 'fetched', sweep: false, heartbeat: true,
    probe: { query: 'astronomy' },
    honest: 'The OTHER half of the Zenodo API: who curates what. A community listing is the RECEIPT for a deposit’s '
      + 'own membership CLAIM — provenance, never peer review, and never a seal.' },
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

/** The scholarly doors, READ OFF the journals port rather than retyped — one catalogue, one source of truth, so
 *  so a door added there is present here by construction. */
const JOURNAL_APIS: PublicApiEntry[] = JOURNAL_DOORS.map((d) => ({
  id: d.id,
  host: d.host,
  base: d.base,
  kind: 'journal' as const,
  access: d.access,
  direction: 'fetched' as const,
  sweep: false,
  heartbeat: d.level !== 'lookup',
  probe: { query: d.level === 'lookup' ? '10.1101/339747' : 'quantum' },
  honest: d.honest,
}))

/** publicApiRegistry() → every named public API, grouped by kind, with one order-invariant receipt. Pure. */
export function publicApiRegistry(): {
  research: PublicApiEntry[]
  euEducation: PublicApiEntry[]
  weather: PublicApiEntry[]
  news: PublicApiEntry[]
  journals: PublicApiEntry[]
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
      base: RESEARCH_DOOR_OVERRIDES[host]?.base
        ?? (host === 'mathoverflow.net' || host === 'api.stackexchange.com' || host.endsWith('.stackexchange.com')
          ? 'https://api.stackexchange.com' : `https://${host}`),
      kind: 'research' as const,
      access: host === 'crossref.org' || host === 'openalex.org' ? 'mailto-polite' as const : 'keyless' as const,
      direction: 'fetched' as const,
      sweep: true,
      heartbeat: true,
      ...(ext ? { probe: { query: ext.query } } : { probe: { query: 'quantum' } }),
      honest: RESEARCH_DOOR_OVERRIDES[host]?.honest
        ?? 'External research CORROBORATES — provenance fingerprint only; only a by-decide theorem SEALS.',
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

  const all = [...research, ...euEducation, ...WEATHER_APIS, ...NEWS_APIS, ...JOURNAL_APIS, ...OTHER_APIS]
  const receipt = merkleGravity(all.map((a) => toUuid(`${a.id}:${a.host}:${a.base}`)))
  return {
    research,
    euEducation,
    weather: WEATHER_APIS,
    news: NEWS_APIS,
    journals: JOURNAL_APIS,
    other: OTHER_APIS,
    count: all.length,
    sweepCount: research.length,
    receipt,
    ...hexbitDoorOf(receipt),
    honest: schoolApiRegistry().honest,
  }
}

export { RESEARCH_SOURCE_NAMES } from '../research/index.js'
