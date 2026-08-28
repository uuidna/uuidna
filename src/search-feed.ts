// search-feed — MOST-SEARCHED ONLINE FEEDS LEAN LEADS, WHICH FEED ONLINE RESULTS.
//
// The loop is one mill: a DECLARED corpus of what the public actually types (sourced, like mine-books CORPUS —
// no frozen traffic counts) PLUS the wired public-API probes (research streams, EU education portals, unanswered
// math as a named door) rings the sealed ledger (reflects: rare words loud). Loud theorems become ONLINE
// DOORS (`/theorem/<key>`). Silent queries and harvest that decide() confirms but the ledger does not yet seal
// become LEADS (desk proposes; captain disposes — never auto-seal, never auto-held in lean/leads.json).
//
// HONEST SCOPE: this does not scrape Google. The queries are declared from public trend reports and from
// publicApiRegistry / SCHOOL_APIS probes. Live titles (MathOverflow unanswered, catalogue hits) arrive through
// searchFeedOnline. Meaning is null. A silent query is a notice, not a refute. Integrity.
import { aspectCensus } from './aspects.js'
import { mintLeadsFromText, type MintLead } from './harvest.js'
import { hexbitDoorOf, type HexbitDoor } from './hexbit/index.js'
import { merkleFold, toUuid } from './address.js'
import { EXTENDED_RESEARCH_PROBES } from './research-sources.js'
import { SCHOOL_APIS } from './school-apis.js'

export const SEARCH_FEED_PATH = 'lean/search-feed.json'

/** What people typed, and where that fact was read. `ore` is optional arithmetic to harvest — it is NOT stuffed
 *  into the reflection query (that was the substring accident). */
export interface SearchQuery {
  id: string
  query: string
  source: string
  ore?: string
}

/** Declared corpus — Similarweb global volume Aug 2026, Google Year in Search 2025, the desk's own subject.
 *  Add a line to add a feed; there are no ranks copied here (a rank is a measurement that moves). */
export const MOST_SEARCHED: readonly SearchQuery[] = [
  { id: 'maps', query: 'maps', source: 'Similarweb global traffic-share leader, Aug 2026' },
  { id: 'weather', query: 'weather', source: 'Similarweb global volume, Aug 2026' },
  { id: 'world-cup', query: 'fifa world cup', source: 'Similarweb global volume, FIFA World Cup 2026 knockout phase' },
  { id: 'gemini', query: 'gemini', source: 'Similarweb US #1 term Aug 2026; Google Year in Search 2025 global #1' },
  { id: 'deepseek', query: 'deepseek', source: 'Google Year in Search 2025 global trending' },
  { id: 'iphone', query: 'iphone', source: 'Google Year in Search 2025 global trending' },
  { id: 'ufc', query: 'ufc', source: 'Similarweb global volume, Aug 2026' },
  { id: 'f1', query: 'f1', source: 'Similarweb global volume, Aug 2026' },
  { id: 'cricket', query: 'cricket', source: 'Similarweb ind vs eng / Year in Search 2025 cricket spike' },
  { id: 'uuid', query: 'uuid', source: 'this ledger\'s own subject' },
  { id: 'quantum-advantage', query: 'quantum advantage', source: 'desk 2026-08-28; IBM/UChicago arXiv 2607.25941',
    ore: '128 - 70 = 58. 70 < 128.' },
]

/** portalQueries() → the wired APIs' own known-good asks: research streams + EU education portals that carry a
 *  phrase probe (ESCO chemistry, data.europa education, CORDIS quantum, MathOverflow prime, …). Coordinates and
 *  dataset codes stay out — those are not search strings. Pure. */
export function portalQueries(): SearchQuery[] {
  const out: SearchQuery[] = []
  for (const p of EXTENDED_RESEARCH_PROBES)
    out.push({ id: `api-${p.id}`, query: p.query, source: p.id })
  for (const s of SCHOOL_APIS) {
    const text = s.probe?.text?.trim() ?? ''
    if (text.length < 3) continue
    out.push({ id: `api-${s.id}`, query: text, source: `${s.id} — ${s.name}` })
  }
  return out
}

const PREFIX = /^(MO (answered|open)|arXiv \S+:|Wikipedia:|Wikinews:|Gutenberg \d+:|Open-Meteo place)\s*/i

/** titleOf(note) → the searchable phrase inside an API evidence note. Pure. */
export function titleOf(note: string): string {
  return note.replace(PREFIX, '').split('\n')[0]!.trim().slice(0, 120)
}

/** queriesFromEvidence(rows) → live API notes as mill queries. The title rings the ledger; the full note is ore
 *  for harvest. Pure — the fetch lives in searchFeedOnline. */
export function queriesFromEvidence(rows: readonly { source: string; address: string; text: string }[]): SearchQuery[] {
  const out: SearchQuery[] = []
  const seen = new Set<string>()
  for (const r of rows) {
    const query = titleOf(r.text)
    if (query.length < 8) continue
    const id = 'live-' + r.address.replace(/-/g, '').slice(0, 8)
    if (seen.has(id)) continue
    seen.add(id)
    out.push({ id, query, source: r.source, ore: r.text })
  }
  return out
}

/** uniqueQueries(queries) → first spelling of each query string wins. Pure. */
export function uniqueQueries(queries: readonly SearchQuery[]): SearchQuery[] {
  const seen = new Set<string>()
  const out: SearchQuery[] = []
  for (const q of queries) {
    const k = q.query.toLowerCase()
    if (seen.has(k)) continue
    seen.add(k)
    out.push(q)
  }
  return out
}

/** Declared mill input: most-searched strings plus the wired portal probes, first spelling of each query wins. */
export const FEED_QUERIES: readonly SearchQuery[] = uniqueQueries([...MOST_SEARCHED, ...portalQueries()])

export interface FeedDoor {
  query: string
  source: string
  key: string
  principle: string
  skill: string
  resonance: number
  concepts: string[]
}

export interface FeedLead {
  query: string
  source: string
  what: string
  owes: string
  harvest?: MintLead
}

export interface SearchFeed extends HexbitDoor {
  meaning: null
  results: FeedDoor[]
  leads: FeedLead[]
  silent: string[]
  receipt: string
  honest: string
}

/** searchFeed() → most-searched queries and wired-API probes ring Lean; loud keys are online doors; the rest are leads. Pure. */
export function searchFeed(queries: readonly SearchQuery[] = FEED_QUERIES): SearchFeed {
  const census = aspectCensus(queries.map((q) => ({ id: q.id, text: q.query })))
  const byId = new Map(census.aspects.map((row) => [row.id, row]))
  const results: FeedDoor[] = []
  const leads: FeedLead[] = []
  for (const q of queries) {
    const row = byId.get(q.id)
    if (!row) continue
    const seen = new Set(row.harvest.map((h) => h.key))
    const extra = q.ore ? mintLeadsFromText(q.id, row.receipt, q.ore).filter((h) => !seen.has(h.key)) : []
    const harvest = [...row.harvest, ...extra]
    if (row.loud.length === 0) {
      leads.push({
        query: q.query,
        source: q.source,
        what: `most-searched query ${JSON.stringify(q.query)} rings no sealed theorem`,
        owes: 'a `by decide` wing whose key or gloss names that query, or a named boundary in lean/leads.json refused[] that declines the subject',
      })
    } else {
      for (const m of row.loud) {
        results.push({
          query: q.query,
          source: q.source,
          key: m.key,
          principle: m.principle,
          skill: m.skill,
          resonance: m.resonance,
          concepts: m.concepts,
        })
      }
    }
    for (const h of harvest) {
      leads.push({
        query: q.query,
        source: q.source,
        what: `harvest ${h.fragment} from ${JSON.stringify(q.query)} decides TRUE and is unsealed`,
        owes: 'captain dispose: wave-deposit the mint candidate, or refuse it at a named boundary — never auto-seal',
        harvest: h,
      })
    }
  }
  results.sort((a, b) => b.resonance - a.resonance || (a.key < b.key ? -1 : 1) || (a.query < b.query ? -1 : 1))
  const silent = census.silent
  const receipt = merkleFold([
    census.receipt,
    ...results.map((d) => toUuid(`door:${d.query}:${d.key}`)),
    ...leads.map((l) => toUuid(`lead:${l.what}`)),
  ])
  return {
    meaning: null,
    results,
    leads,
    silent,
    receipt,
    ...hexbitDoorOf(receipt),
    honest:
      'Most-searched queries and the wired public APIs (research streams, EU education portals, unanswered math) ' +
      'ring the sealed ledger by resonance. Loud theorems are the ONLINE RESULTS — /theorem/<key> doors. Silent ' +
      'queries and decided-unsealed harvest are LEADS the desk proposes; only the kernel seals, only the captain ' +
      'holds or refuses. Meaning is null. This does not scrape Google. Recomputable. Integrity.',
  }
}
