// @non-harmonic: extended public API streams for the research sweep — arXiv, Stack Exchange, Wikipedia,
// Gutendex, Open-Meteo geocoding, Wikinews. Each is keyless and probed before wiring; answers are evidence,
// never seals. Passed the same answered/refused/unreached helpers as corroborate.ts so the reach semantics stay one.
import { toUuid } from './address.js'
import { evidenceRow } from './hexbit/index.js'
import { GUTENDEX_HEADERS } from './books.js'
import type { ResearchEvidence, SourceReading } from './corroborate.js'

type Io = {
  answered: (source: string, evidence: ResearchEvidence[]) => SourceReading
  refused: (source: string, status: number) => SourceReading
  unreached: (source: string, e: unknown) => SourceReading
}

export type ExtendedResearchSource = (query: string) => Promise<SourceReading>

/** arxiv.org — preprint search via the Atom export API (keyless). */
const arxivSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://export.arxiv.org/api/query?search_query=all:' + encodeURIComponent(query) + '&start=0&max_results=8'
    const res = await fetch(url)
    if (!res.ok) return io.refused('arxiv.org', res.status)
    const xml = await res.text()
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    const evidence: ResearchEvidence[] = entries.map((m) => {
      const block = m[1]!
      const id = (block.match(/<id>([^<]+)<\/id>/)?.[1] ?? '').replace(/^.*\//, '')
      const title = (block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').replace(/\s+/g, ' ').trim()
      return evidenceRow('arxiv.org', toUuid('arxiv:' + id), `arXiv ${id}: ${title.slice(0, 80)}`)
    })
    return io.answered('arxiv.org', evidence)
  } catch (e) { return io.unreached('arxiv.org', e) }
}

/** The unanswered-math door — MathOverflow questions with no accepted answer (api.stackexchange.com). */
export const UNANSWERED_MATH_URL =
  'https://api.stackexchange.com/2.3/questions/unanswered?order=desc&sort=votes&site=mathoverflow&pagesize=8'

/** unansweredMath() → open MathOverflow titles as evidence. Network. Never fabricates a row. */
export async function unansweredMath(): Promise<ResearchEvidence[]> {
  try {
    const res = await fetch(UNANSWERED_MATH_URL)
    if (!res.ok) return []
    const data = await res.json() as { items?: { question_id?: number; title?: string; is_answered?: boolean }[] }
    return (data.items ?? [])
      .filter((q) => q.is_answered !== true)
      .map((q) => evidenceRow('mathoverflow.net', toUuid('mo-unanswered:' + q.question_id),
        `MO open: ${(q.title ?? '').slice(0, 80)}`))
  } catch {
    return []
  }
}

/** mathoverflow.net — unanswered and answered questions via api.stackexchange.com (the door lean/leads.json names). */
const mathOverflowSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://api.stackexchange.com/2.3/search?order=desc&sort=votes&intitle='
      + encodeURIComponent(query) + '&site=mathoverflow&pagesize=8'
    const res = await fetch(url)
    if (!res.ok) return io.refused('mathoverflow.net', res.status)
    const data = await res.json() as { items?: { question_id?: number; title?: string; is_answered?: boolean }[] }
    const evidence = (data.items ?? []).map((q) => evidenceRow('mathoverflow.net', toUuid('mo:' + q.question_id),
      `MO ${q.is_answered ? 'answered' : 'open'}: ${(q.title ?? '').slice(0, 80)}`))
    return io.answered('mathoverflow.net', evidence)
  } catch (e) { return io.unreached('mathoverflow.net', e) }
}

/** en.wikipedia.org — article search (MediaWiki API, keyless). */
const wikipediaSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=8&srsearch='
      + encodeURIComponent(query)
    const res = await fetch(url)
    if (!res.ok) return io.refused('en.wikipedia.org', res.status)
    const data = await res.json() as { query?: { search?: { pageid?: number; title?: string }[] } }
    const evidence = (data.query?.search ?? []).map((p) => evidenceRow('en.wikipedia.org', toUuid('wikipedia:' + p.pageid),
      `Wikipedia: ${(p.title ?? '').slice(0, 80)}`))
    return io.answered('en.wikipedia.org', evidence)
  } catch (e) { return io.unreached('en.wikipedia.org', e) }
}

/** gutendex.com — Project Gutenberg catalogue search (keyless). */
const gutendexSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const res = await fetch('https://gutendex.com/books/?search=' + encodeURIComponent(query), { headers: GUTENDEX_HEADERS })
    if (!res.ok) return io.refused('gutendex.com', res.status)
    const data = await res.json() as { results?: { id?: number; title?: string; authors?: { name?: string }[] }[] }
    const evidence = (data.results ?? []).slice(0, 8).map((b) => evidenceRow('gutendex.com', toUuid('gutendex:' + b.id),
      `Gutenberg ${b.id}: ${(b.title ?? '').slice(0, 60)}${b.authors?.[0]?.name ? ' — ' + b.authors[0].name.slice(0, 30) : ''}`))
    return io.answered('gutendex.com', evidence)
  } catch (e) { return io.unreached('gutendex.com', e) }
}

/** open-meteo.com — geocoding search: place names in a query fold to coordinates (keyless). */
const openMeteoSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const res = await fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(query) + '&count=8')
    if (!res.ok) return io.refused('open-meteo.com', res.status)
    const data = await res.json() as { results?: { id?: number; name?: string; country?: string; latitude?: number; longitude?: number }[] }
    const evidence = (data.results ?? []).map((r) => evidenceRow('open-meteo.com', toUuid(`meteo:${r.id}:${r.latitude}:${r.longitude}`),
      `Open-Meteo place ${(r.name ?? '').slice(0, 40)}${r.country ? ', ' + r.country : ''} (${r.latitude}, ${r.longitude})`))
    return io.answered('open-meteo.com', evidence)
  } catch (e) { return io.unreached('open-meteo.com', e) }
}

/** en.wikinews.org — news article search (MediaWiki API, keyless). */
const wikinewsSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://en.wikinews.org/w/api.php?action=query&list=search&format=json&srlimit=8&srsearch='
      + encodeURIComponent(query)
    const res = await fetch(url)
    if (!res.ok) return io.refused('en.wikinews.org', res.status)
    const data = await res.json() as { query?: { search?: { pageid?: number; title?: string }[] } }
    const evidence = (data.query?.search ?? []).map((p) => evidenceRow('en.wikinews.org', toUuid('wikinews:' + p.pageid),
      `Wikinews: ${(p.title ?? '').slice(0, 80)}`))
    return io.answered('en.wikinews.org', evidence)
  } catch (e) { return io.unreached('en.wikinews.org', e) }
}

export const EXTENDED_RESEARCH_SOURCE_NAMES: readonly string[] = [
  'arxiv.org', 'mathoverflow.net', 'en.wikipedia.org', 'gutendex.com', 'open-meteo.com', 'en.wikinews.org',
]

/** extendedResearchSources(io) → the six streams beyond the original five academic archives. */
export function extendedResearchSources(io: Io): ExtendedResearchSource[] {
  return [arxivSource(io), mathOverflowSource(io), wikipediaSource(io), gutendexSource(io), openMeteoSource(io), wikinewsSource(io)]
}

/** probe query each extended source accepts — the heartbeat's known-good ask. */
export const EXTENDED_RESEARCH_PROBES: readonly { id: string; query: string }[] = [
  { id: 'arxiv.org', query: 'quantum' },
  { id: 'mathoverflow.net', query: 'prime' },
  { id: 'en.wikipedia.org', query: 'mathematics' },
  { id: 'gutendex.com', query: 'Euclid' },
  { id: 'open-meteo.com', query: 'Sofia' },
  { id: 'en.wikinews.org', query: 'science' },
]
