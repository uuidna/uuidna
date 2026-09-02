// @non-harmonic: uuidnaOS research port — every free public research stream (network). Shared fetch cache with school, cern, weather, news.
import { toUuid } from '../../../address.js'
import { nistConstant } from '../../../constants.js'
import { evidenceRow } from '../../../hexbit/index.js'
import { GUTENDEX_HEADERS } from '../../../books.js'
import { fetchCernOpenData } from '../cern/index.js'
import { fetchAasJournals } from '../aas/index.js'
import { fetchData } from '../fetch/index.js'
import type { ResearchEvidence, SourceReading } from '../../../corroborate.js'

type Io = {
  answered: (source: string, evidence: ResearchEvidence[]) => SourceReading
  refused: (source: string, status: number) => SourceReading
  unreached: (source: string, e: unknown) => SourceReading
}

export type ResearchSource = (query: string) => Promise<SourceReading>
export type ExtendedResearchSource = ResearchSource

const answered = (source: string, evidence: ResearchEvidence[]): SourceReading =>
  ({ source, reached: true, why: null, evidence })
const refused = (source: string, status: number): SourceReading =>
  ({ source, reached: false, why: `answered HTTP ${status}`, evidence: [] })
const unreached = (source: string, e: unknown): SourceReading =>
  ({ source, reached: false, why: e instanceof Error ? e.message : String(e), evidence: [] })

const io: Io = { answered, refused, unreached }

const nistSource: ResearchSource = async (query) => {
  try {
    const nist = await nistConstant(query)
    return answered('nist.gov', nist.matches.slice(0, 8).map((m) =>
      evidenceRow(nist.source, toUuid(JSON.stringify(m)), JSON.stringify(m).replace(/[{}"]/g, '').slice(0, 100))))
  } catch (e) { return unreached('nist.gov', e) }
}

const zenodoSource: ResearchSource = async (query) => {
  try {
    const url = 'https://zenodo.org/api/records?size=8&q=' + encodeURIComponent(query)
    const got = await fetchData<{ hits?: { hits?: { id: number; metadata?: { title?: string } }[] } }>(url, 'json')
    if (got.data === null) return refused('zenodo.org', 503)
    const hits = got.data.hits?.hits ?? []
    return answered('zenodo.org', hits.map((h) =>
      evidenceRow('zenodo.org', toUuid('zenodo:' + h.id), `zenodo record ${h.id}: ${(h.metadata?.title ?? '').slice(0, 80)}`)))
  } catch (e) { return unreached('zenodo.org', e) }
}

const crossrefSource: ResearchSource = async (query) => {
  try {
    const url = 'https://api.crossref.org/works?rows=8&mailto=ceccec@psg.bg&query=' + encodeURIComponent(query)
    const got = await fetchData<{ message?: { items?: { DOI?: string; title?: string[] }[] } }>(url, 'json')
    if (got.data === null) return refused('crossref.org', 503)
    const items = got.data.message?.items ?? []
    return answered('crossref.org', items.map((it) =>
      evidenceRow('crossref.org', toUuid('crossref:' + (it.DOI ?? '')), `DOI ${it.DOI ?? ''}: ${(it.title?.[0] ?? '').slice(0, 80)}`)))
  } catch (e) { return unreached('crossref.org', e) }
}

const semanticScholarSource: ResearchSource = async (query) => {
  try {
    const url = 'https://api.semanticscholar.org/graph/v1/paper/search?limit=8&fields=title,tldr,externalIds&query='
      + encodeURIComponent(query)
    const got = await fetchData<{ data?: { paperId?: string; title?: string; tldr?: { text?: string } }[] }>(url, 'json')
    if (got.data === null) return refused('semanticscholar.org', 503)
    const papers = got.data.data ?? []
    return answered('semanticscholar.org', papers.map((p) =>
      evidenceRow('semanticscholar.org', toUuid('s2:' + (p.paperId ?? '')),
        `S2 ${(p.title ?? '').slice(0, 60)}${p.tldr?.text ? ' — AI tldr: ' + p.tldr.text.slice(0, 90) : ''}`)))
  } catch (e) { return unreached('semanticscholar.org', e) }
}

const openAlexSource: ResearchSource = async (query) => {
  try {
    const url = 'https://api.openalex.org/works?per-page=8&mailto=ceccec@psg.bg&search=' + encodeURIComponent(query)
    const got = await fetchData<{ results?: { id?: string; display_name?: string; primary_topic?: { display_name?: string } }[] }>(url, 'json')
    if (got.data === null) return refused('openalex.org', 503)
    const works = got.data.results ?? []
    return answered('openalex.org', works.map((w) =>
      evidenceRow('openalex.org', toUuid('openalex:' + (w.id ?? '')),
        `OpenAlex ${(w.display_name ?? '').slice(0, 70)}${w.primary_topic?.display_name ? ' [' + w.primary_topic.display_name.slice(0, 30) + ']' : ''}`)))
  } catch (e) { return unreached('openalex.org', e) }
}

export const CORE_RESEARCH_SOURCE_NAMES: readonly string[] =
  ['nist.gov', 'zenodo.org', 'crossref.org', 'semanticscholar.org', 'openalex.org']

/** coreResearchSources() → the five original academic archives (NIST + Zenodo + Crossref + S2 + OpenAlex). */
export function coreResearchSources(): ResearchSource[] {
  return [nistSource, zenodoSource, crossrefSource, semanticScholarSource, openAlexSource]
}

/** arxiv.org — preprint search via the Atom export API (keyless). */
const arxivSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://export.arxiv.org/api/query?search_query=all:' + encodeURIComponent(query) + '&start=0&max_results=8'
    const got = await fetchData<string>(url, 'text')
    if (got.data === null) return io.refused('arxiv.org', got.declined ? 503 : 404)
    const entries = [...got.data.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
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
    const got = await fetchData<{ items?: { question_id?: number; title?: string; is_answered?: boolean }[] }>(UNANSWERED_MATH_URL, 'json')
    if (got.data === null) return []
    return (got.data.items ?? [])
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
    const got = await fetchData<{ items?: { question_id?: number; title?: string; is_answered?: boolean }[] }>(url, 'json')
    if (got.data === null) return io.refused('mathoverflow.net', 503)
    const evidence = (got.data.items ?? []).map((q) => evidenceRow('mathoverflow.net', toUuid('mo:' + q.question_id),
      `MO ${q.is_answered ? 'answered' : 'open'}: ${(q.title ?? '').slice(0, 80)}`))
    return io.answered('mathoverflow.net', evidence)
  } catch (e) { return io.unreached('mathoverflow.net', e) }
}

/** en.wikipedia.org — article search (MediaWiki API, keyless). */
const wikipediaSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=8&srsearch='
      + encodeURIComponent(query)
    const got = await fetchData<{ query?: { search?: { pageid?: number; title?: string }[] } }>(url, 'json')
    if (got.data === null) return io.refused('en.wikipedia.org', 503)
    const evidence = (got.data.query?.search ?? []).map((p) => evidenceRow('en.wikipedia.org', toUuid('wikipedia:' + p.pageid),
      `Wikipedia: ${(p.title ?? '').slice(0, 80)}`))
    return io.answered('en.wikipedia.org', evidence)
  } catch (e) { return io.unreached('en.wikipedia.org', e) }
}

/** gutendex.com — Project Gutenberg catalogue search (keyless). */
const gutendexSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://gutendex.com/books/?search=' + encodeURIComponent(query)
    const got = await fetchData<{ results?: { id?: number; title?: string; authors?: { name?: string }[] }[] }>(
      url, 'json', { headers: GUTENDEX_HEADERS })
    if (got.data === null) return io.refused('gutendex.com', 503)
    const evidence = (got.data.results ?? []).slice(0, 8).map((b) => evidenceRow('gutendex.com', toUuid('gutendex:' + b.id),
      `Gutenberg ${b.id}: ${(b.title ?? '').slice(0, 60)}${b.authors?.[0]?.name ? ' — ' + b.authors[0].name.slice(0, 30) : ''}`))
    return io.answered('gutendex.com', evidence)
  } catch (e) { return io.unreached('gutendex.com', e) }
}

/** open-meteo.com — geocoding search: place names in a query fold to coordinates (keyless). */
const openMeteoSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(query) + '&count=8'
    const got = await fetchData<{ results?: { id?: number; name?: string; country?: string; latitude?: number; longitude?: number }[] }>(url, 'json')
    if (got.data === null) return io.refused('open-meteo.com', 503)
    const evidence = (got.data.results ?? []).map((r) => evidenceRow('open-meteo.com', toUuid(`meteo:${r.id}:${r.latitude}:${r.longitude}`),
      `Open-Meteo place ${(r.name ?? '').slice(0, 40)}${r.country ? ', ' + r.country : ''} (${r.latitude}, ${r.longitude})`))
    return io.answered('open-meteo.com', evidence)
  } catch (e) { return io.unreached('open-meteo.com', e) }
}

/** opendata.cern.ch — LHC open-data catalogue (uuidnaOS cern port, keyless). */
const cernOpenDataSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const got = await fetchCernOpenData(query, 8)
    if (got.declined) return io.refused('opendata.cern.ch', got.status ?? 503)
    const evidence = got.records.map((r) =>
      evidenceRow('opendata.cern.ch', r.address, `CERN OD ${r.experiment} ${r.id}: ${r.title.slice(0, 80)}`))
    return io.answered('opendata.cern.ch', evidence)
  } catch (e) { return io.unreached('opendata.cern.ch', e) }
}

/** journals.aas.org — the AAS journals' own pages via the keyless WordPress REST API (uuidnaOS aas port).
 *  Corroborates AAS POLICY and TIMELINE, never a paper: the articles are IOP's, under DOI prefix 10.3847. */
const aasJournalsSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const got = await fetchAasJournals(query, 8)
    if (got.declined) return io.refused('journals.aas.org', got.status ?? 503)
    const evidence = got.hits.map((h) =>
      evidenceRow('journals.aas.org', h.address, `AAS ${h.subtype} ${h.id}: ${h.title.slice(0, 80)}`))
    return io.answered('journals.aas.org', evidence)
  } catch (e) { return io.unreached('journals.aas.org', e) }
}

/** en.wikinews.org — news article search (MediaWiki API, keyless). */
const wikinewsSource = (io: Io): ExtendedResearchSource => async (query) => {
  try {
    const url = 'https://en.wikinews.org/w/api.php?action=query&list=search&format=json&srlimit=8&srsearch='
      + encodeURIComponent(query)
    const got = await fetchData<{ query?: { search?: { pageid?: number; title?: string }[] } }>(url, 'json')
    if (got.data === null) return io.refused('en.wikinews.org', 503)
    const evidence = (got.data.query?.search ?? []).map((p) => evidenceRow('en.wikinews.org', toUuid('wikinews:' + p.pageid),
      `Wikinews: ${(p.title ?? '').slice(0, 80)}`))
    return io.answered('en.wikinews.org', evidence)
  } catch (e) { return io.unreached('en.wikinews.org', e) }
}

export const EXTENDED_RESEARCH_SOURCE_NAMES: readonly string[] = [
  'arxiv.org', 'mathoverflow.net', 'en.wikipedia.org', 'gutendex.com', 'open-meteo.com', 'en.wikinews.org', 'opendata.cern.ch',
  'journals.aas.org',
]

/** extendedResearchSources(io) → the eight streams beyond the original five academic archives. */
export function extendedResearchSources(io: Io): ExtendedResearchSource[] {
  return [arxivSource(io), mathOverflowSource(io), wikipediaSource(io), gutendexSource(io), openMeteoSource(io), wikinewsSource(io), cernOpenDataSource(io), aasJournalsSource(io)]
}

/** probe query each extended source accepts — the heartbeat's known-good ask. */
export const EXTENDED_RESEARCH_PROBES: readonly { id: string; query: string }[] = [
  { id: 'arxiv.org', query: 'quantum' },
  { id: 'mathoverflow.net', query: 'prime' },
  { id: 'en.wikipedia.org', query: 'mathematics' },
  { id: 'gutendex.com', query: 'Euclid' },
  { id: 'open-meteo.com', query: 'Sofia' },
  { id: 'en.wikinews.org', query: 'science' },
  { id: 'opendata.cern.ch', query: 'CMS Higgs' },
  { id: 'journals.aas.org', query: 'open access' },
]

/** every wired research stream by name — core five plus extended seven. */
export const RESEARCH_SOURCE_NAMES: readonly string[] = [
  ...CORE_RESEARCH_SOURCE_NAMES,
  ...EXTENDED_RESEARCH_SOURCE_NAMES,
]

const ALL_RESEARCH_SOURCES: ResearchSource[] = [
  ...coreResearchSources(),
  ...extendedResearchSources(io),
]

/** researchSweep(query) → parallel fan-out over every archive; each reading says whether it spoke. Network. */
export async function researchSweep(query: string): Promise<SourceReading[]> {
  return await Promise.all(ALL_RESEARCH_SOURCES.map((s) => s(query)))
}

/** researchEvidence(query) → flat evidence rows from the sweep (consumers that only want rows). */
export async function researchEvidence(query: string): Promise<ResearchEvidence[]> {
  return (await researchSweep(query)).flatMap((r) => r.evidence)
}
