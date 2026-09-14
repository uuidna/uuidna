// @non-harmonic: uuidnaOS research port — every free public research stream (network). Shared fetch cache with school, cern, weather, news.
//
// ONE DECLARATION PER DOOR (the captain, 2026-09-14: "there are no special cases. all researched in waves by topic and
// leaned in court"). A door is the API's facts only — its host, the base its reader fetches (the reader builds every
// request from that same constant), its access, and its reader. Every door is asked the SAME topic in the same wave;
// nothing here carries a per-source query, an override or a verdict. What a door returns is evidence, and only the
// kernel court decides what it means. The registry, the sweep and every name list are read off RESEARCH_DOORS.
import { toUuid } from '../../../address.js'
import { NIST_CONSTANTS_URL, nistConstant } from '../../../constants.js'
import { evidenceRow } from '../../../hexbit/index.js'
import { GUTENDEX_HEADERS } from '../../../books.js'
import { CERN_OD, fetchCernOpenData } from '../cern/index.js'
import { AAS_WP, fetchAasJournals } from '../aas/index.js'
import { fetchData } from '../fetch/index.js'
import { numeralValueOf } from '../../../theology/numerals/index.js'
import type { ResearchEvidence, SourceReading } from '../../../corroborate.js'

export type ResearchSource = (topic: string) => Promise<SourceReading>

export interface ResearchDoor {
  host: string
  /** the base every request of this door's reader is built from */
  base: string
  access: 'keyless' | 'mailto-polite'
  read: ResearchSource
}

const answered = (source: string, evidence: ResearchEvidence[]): SourceReading =>
  ({ source, reached: true, why: null, evidence })
const refused = (source: string, status: number): SourceReading =>
  ({ source, reached: false, why: `answered HTTP ${status}`, evidence: [] })
const unreached = (source: string, e: unknown): SourceReading =>
  ({ source, reached: false, why: e instanceof Error ? e.message : String(e), evidence: [] })
/** a decline carries the reason the host stated, exactly as fetchData read it — never a status this module invents */
const declined = (source: string, note: string): SourceReading =>
  ({ source, reached: false, why: note, evidence: [] })
const q = encodeURIComponent

const NIST = { host: 'nist.gov', base: NIST_CONSTANTS_URL }
const ZENODO = { host: 'zenodo.org', base: 'https://zenodo.org/api/records' }
const CROSSREF = { host: 'crossref.org', base: 'https://api.crossref.org/works' }
const S2 = { host: 'semanticscholar.org', base: 'https://api.semanticscholar.org/graph/v1/paper/search' }
const OPENALEX = { host: 'openalex.org', base: 'https://api.openalex.org/works' }
const ARXIV = { host: 'arxiv.org', base: 'https://export.arxiv.org/api/query' }
const MO = { host: 'mathoverflow.net', base: 'https://api.stackexchange.com/2.3' }
const WIKIPEDIA = { host: 'en.wikipedia.org', base: 'https://en.wikipedia.org/w/api.php' }
const GUTENDEX = { host: 'gutendex.com', base: 'https://gutendex.com/books/' }
const METEO = { host: 'open-meteo.com', base: 'https://geocoding-api.open-meteo.com/v1/search' }
const WIKINEWS = { host: 'en.wikinews.org', base: 'https://en.wikinews.org/w/api.php' }
const CERN = { host: 'opendata.cern.ch', base: CERN_OD }
const AAS = { host: 'journals.aas.org', base: AAS_WP }
const SEFARIA = { host: 'sefaria.org', base: 'https://www.sefaria.org/api' }
const QURAN = { host: 'api.quran.com', base: 'https://api.quran.com/api/v4' }
// THE LAW DOORS (the captain, 2026-09-14: "fuse all law apis as well so legal audit of all agent actions is in realtime"):
// each is the publisher's own keyless, documented API, asked the wave's topic like every other door
const FEDREG = { host: 'federalregister.gov', base: 'https://www.federalregister.gov/api/v1' }
const COURTLISTENER = { host: 'courtlistener.com', base: 'https://www.courtlistener.com/api/rest/v4' }
const UKLEG = { host: 'legislation.gov.uk', base: 'https://www.legislation.gov.uk' }
const EURLEX = { host: 'publications.europa.eu', base: 'https://publications.europa.eu/webapi/rdf/sparql' }

/** atomEntries(xml) → each Atom entry's id and title, the shape arXiv and legislation.gov.uk both answer in */
const atomEntries = (xml: string): { id: string; title: string }[] =>
  [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => ({
    id: (m[1]!.match(/<id>([^<]+)<\/id>/)?.[1] ?? '').trim(),
    title: (m[1]!.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '').replace(/\s+/g, ' ').trim(),
  }))

/** a door whose API answers JSON: fetch the url, pick the rows, turn each into evidence — or say why it could not */
const jsonDoor = <T, R>(d: { host: string }, url: (topic: string) => string, rows: (data: T) => R[], row: (r: R) => ResearchEvidence, init?: RequestInit): ResearchSource =>
  async (topic) => {
    try {
      const got = await fetchData<T>(url(topic), 'json', init)
      if (got.data === null) return declined(d.host, got.note)
      return answered(d.host, rows(got.data).slice(0, 8).map(row))
    } catch (e) { return unreached(d.host, e) }
  }

export const RESEARCH_DOORS: readonly ResearchDoor[] = [
  { ...NIST, access: 'keyless', read: async (topic) => {
    try {
      const nist = await nistConstant(topic)
      return answered(NIST.host, nist.matches.slice(0, 8).map((m) =>
        evidenceRow(nist.source, toUuid(JSON.stringify(m)), JSON.stringify(m).replace(/[{}"]/g, '').slice(0, 100))))
    } catch (e) { return unreached(NIST.host, e) }
  } },
  { ...ZENODO, access: 'keyless', read: jsonDoor<{ hits?: { hits?: { id: number; metadata?: { title?: string } }[] } }, { id: number; metadata?: { title?: string } }>(
    ZENODO, (t) => `${ZENODO.base}?size=8&q=${q(t)}`, (d) => d.hits?.hits ?? [],
    (h) => evidenceRow(ZENODO.host, toUuid('zenodo:' + h.id), `zenodo record ${h.id}: ${(h.metadata?.title ?? '').slice(0, 80)}`)) },
  { ...CROSSREF, access: 'mailto-polite', read: jsonDoor<{ message?: { items?: { DOI?: string; title?: string[] }[] } }, { DOI?: string; title?: string[] }>(
    CROSSREF, (t) => `${CROSSREF.base}?rows=8&mailto=ceccec@psg.bg&query=${q(t)}`, (d) => d.message?.items ?? [],
    (it) => evidenceRow(CROSSREF.host, toUuid('crossref:' + (it.DOI ?? '')), `DOI ${it.DOI ?? ''}: ${(it.title?.[0] ?? '').slice(0, 80)}`)) },
  { ...S2, access: 'keyless', read: jsonDoor<{ data?: { paperId?: string; title?: string; tldr?: { text?: string } }[] }, { paperId?: string; title?: string; tldr?: { text?: string } }>(
    S2, (t) => `${S2.base}?limit=8&fields=title,tldr,externalIds&query=${q(t)}`, (d) => d.data ?? [],
    (p) => evidenceRow(S2.host, toUuid('s2:' + (p.paperId ?? '')), `S2 ${(p.title ?? '').slice(0, 60)}${p.tldr?.text ? ' — AI tldr: ' + p.tldr.text.slice(0, 90) : ''}`)) },
  { ...OPENALEX, access: 'mailto-polite', read: jsonDoor<{ results?: { id?: string; display_name?: string; primary_topic?: { display_name?: string } }[] }, { id?: string; display_name?: string; primary_topic?: { display_name?: string } }>(
    OPENALEX, (t) => `${OPENALEX.base}?per-page=8&mailto=ceccec@psg.bg&search=${q(t)}`, (d) => d.results ?? [],
    (w) => evidenceRow(OPENALEX.host, toUuid('openalex:' + (w.id ?? '')), `OpenAlex ${(w.display_name ?? '').slice(0, 70)}${w.primary_topic?.display_name ? ' [' + w.primary_topic.display_name.slice(0, 30) + ']' : ''}`)) },
  { ...ARXIV, access: 'keyless', read: async (topic) => {
    try {
      const got = await fetchData<string>(`${ARXIV.base}?search_query=all:${q(topic)}&start=0&max_results=8`, 'text')
      if (got.data === null) return declined(ARXIV.host, got.note)
      return answered(ARXIV.host, atomEntries(got.data).map((e) => {
        const id = e.id.replace(/^.*\//, '')
        return evidenceRow(ARXIV.host, toUuid('arxiv:' + id), `arXiv ${id}: ${e.title.slice(0, 80)}`)
      }))
    } catch (e) { return unreached(ARXIV.host, e) }
  } },
  { ...MO, access: 'keyless', read: jsonDoor<{ items?: { question_id?: number; title?: string; is_answered?: boolean }[] }, { question_id?: number; title?: string; is_answered?: boolean }>(
    MO, (t) => `${MO.base}/search?order=desc&sort=votes&intitle=${q(t)}&site=mathoverflow&pagesize=8`, (d) => d.items ?? [],
    (x) => evidenceRow(MO.host, toUuid('mo:' + x.question_id), `MO ${x.is_answered ? 'answered' : 'open'}: ${(x.title ?? '').slice(0, 80)}`)) },
  { ...WIKIPEDIA, access: 'keyless', read: jsonDoor<{ query?: { search?: { pageid?: number; title?: string }[] } }, { pageid?: number; title?: string }>(
    WIKIPEDIA, (t) => `${WIKIPEDIA.base}?action=query&list=search&format=json&srlimit=8&srsearch=${q(t)}`, (d) => d.query?.search ?? [],
    (p) => evidenceRow(WIKIPEDIA.host, toUuid('wikipedia:' + p.pageid), `Wikipedia: ${(p.title ?? '').slice(0, 80)}`)) },
  { ...GUTENDEX, access: 'keyless', read: jsonDoor<{ results?: { id?: number; title?: string; authors?: { name?: string }[] }[] }, { id?: number; title?: string; authors?: { name?: string }[] }>(
    GUTENDEX, (t) => `${GUTENDEX.base}?search=${q(t)}`, (d) => d.results ?? [],
    (b) => evidenceRow(GUTENDEX.host, toUuid('gutendex:' + b.id), `Gutenberg ${b.id}: ${(b.title ?? '').slice(0, 60)}${b.authors?.[0]?.name ? ' — ' + b.authors[0].name.slice(0, 30) : ''}`),
    { headers: GUTENDEX_HEADERS }) },
  { ...METEO, access: 'keyless', read: jsonDoor<{ results?: { id?: number; name?: string; country?: string; latitude?: number; longitude?: number }[] }, { id?: number; name?: string; country?: string; latitude?: number; longitude?: number }>(
    METEO, (t) => `${METEO.base}?name=${q(t)}&count=8`, (d) => d.results ?? [],
    (r) => evidenceRow(METEO.host, toUuid(`meteo:${r.id}:${r.latitude}:${r.longitude}`), `Open-Meteo place ${(r.name ?? '').slice(0, 40)}${r.country ? ', ' + r.country : ''} (${r.latitude}, ${r.longitude})`)) },
  { ...WIKINEWS, access: 'keyless', read: jsonDoor<{ query?: { search?: { pageid?: number; title?: string }[] } }, { pageid?: number; title?: string }>(
    WIKINEWS, (t) => `${WIKINEWS.base}?action=query&list=search&format=json&srlimit=8&srsearch=${q(t)}`, (d) => d.query?.search ?? [],
    (p) => evidenceRow(WIKINEWS.host, toUuid('wikinews:' + p.pageid), `Wikinews: ${(p.title ?? '').slice(0, 80)}`)) },
  { ...CERN, access: 'keyless', read: async (topic) => {
    try {
      const got = await fetchCernOpenData(topic, 8)
      if (got.declined) return refused(CERN.host, got.status ?? 503)
      return answered(CERN.host, got.records.map((r) => evidenceRow(CERN.host, r.address, `CERN OD ${r.experiment} ${r.id}: ${r.title.slice(0, 80)}`)))
    } catch (e) { return unreached(CERN.host, e) }
  } },
  { ...AAS, access: 'keyless', read: async (topic) => {
    try {
      const got = await fetchAasJournals(topic, 8)
      if (got.declined) return refused(AAS.host, got.status ?? 503)
      return answered(AAS.host, got.hits.map((h) => evidenceRow(AAS.host, h.address, `AAS ${h.subtype} ${h.id}: ${h.title.slice(0, 80)}`)))
    } catch (e) { return unreached(AAS.host, e) }
  } },
  // the scriptures: each verse carries its numeral value from theology/numerals (the rank rule, no table typed) —
  // arithmetic over the letters and nothing more; gematria_forces_collisions makes shared values the expected case
  { ...SEFARIA, access: 'keyless', read: async (topic) => {
    try {
      const name = await fetchData<{ is_ref?: boolean; ref?: string; completions?: string[] }>(`${SEFARIA.base}/name/${q(topic)}?limit=8`, 'json')
      if (name.data === null) return declined(SEFARIA.host, name.note)
      if (name.data.is_ref && name.data.ref) {
        const ref = name.data.ref
        const got = await fetchData<{ versions?: { text?: unknown }[] }>(`${SEFARIA.base}/v3/texts/${q(ref)}?version=hebrew&return_format=text_only`, 'json')
        const raw = got.data?.versions?.[0]?.text
        const text = typeof raw === 'string' ? raw : Array.isArray(raw) ? (raw as unknown[]).flat(4).filter((x): x is string => typeof x === 'string').join(' ') : ''
        if (text === '') return declined(SEFARIA.host, got.data === null ? got.note : `${ref} answered with no Hebrew text`)
        return answered(SEFARIA.host, [evidenceRow(SEFARIA.host, toUuid('sefaria:' + ref + ':' + text), `Sefaria ${ref}: gematria ${numeralValueOf(text, 'hebrew')}`)])
      }
      return answered(SEFARIA.host, (name.data.completions ?? []).slice(0, 8).map((c) => evidenceRow(SEFARIA.host, toUuid('sefaria:' + c), `Sefaria: ${c.slice(0, 80)}`)))
    } catch (e) { return unreached(SEFARIA.host, e) }
  } },
  { ...QURAN, access: 'keyless', read: jsonDoor<{ search?: { results?: { verse_key?: string; text?: string }[] } }, { verse_key?: string; text?: string }>(
    QURAN, (t) => `${QURAN.base}/search?size=8&q=${q(t)}`, (d) => d.search?.results ?? [],
    (r) => evidenceRow(QURAN.host, toUuid('quran:' + r.verse_key + ':' + (r.text ?? '')), `Quran ${r.verse_key}: abjad ${numeralValueOf(r.text ?? '', 'arabic')}`)) },
  { ...FEDREG, access: 'keyless', read: jsonDoor<{ results?: { document_number?: string; title?: string; type?: string; publication_date?: string }[] }, { document_number?: string; title?: string; type?: string; publication_date?: string }>(
    FEDREG, (t) => `${FEDREG.base}/documents.json?per_page=8&conditions[term]=${q(t)}`, (d) => d.results ?? [],
    (r) => evidenceRow(FEDREG.host, toUuid('fedreg:' + (r.document_number ?? '')), `Federal Register ${r.document_number ?? ''} (${r.type ?? ''}, ${r.publication_date ?? ''}): ${(r.title ?? '').slice(0, 80)}`)) },
  { ...COURTLISTENER, access: 'keyless', read: jsonDoor<{ results?: { cluster_id?: number; caseName?: string; court?: string; dateFiled?: string }[] }, { cluster_id?: number; caseName?: string; court?: string; dateFiled?: string }>(
    COURTLISTENER, (t) => `${COURTLISTENER.base}/search/?q=${q(t)}`, (d) => d.results ?? [],
    (r) => evidenceRow(COURTLISTENER.host, toUuid('courtlistener:' + (r.cluster_id ?? '')), `CourtListener ${(r.caseName ?? '').slice(0, 70)} (${r.court ?? ''}, ${r.dateFiled ?? ''})`)) },
  { ...UKLEG, access: 'keyless', read: async (topic) => {
    try {
      const got = await fetchData<string>(`${UKLEG.base}/all/data.feed?title=${q(topic)}`, 'text')
      if (got.data === null) return declined(UKLEG.host, got.note)
      return answered(UKLEG.host, atomEntries(got.data).slice(0, 8).map((e) =>
        evidenceRow(UKLEG.host, toUuid('ukleg:' + e.id), `UK legislation ${e.id.replace(/^https?:\/\/[^/]+\//, '')}: ${e.title.slice(0, 80)}`)))
    } catch (e) { return unreached(UKLEG.host, e) }
  } },
  { ...EURLEX, access: 'keyless', read: jsonDoor<{ results?: { bindings?: { work?: { value?: string }; title?: { value?: string } }[] } }, { work?: { value?: string }; title?: { value?: string } }>(
    EURLEX, (t) => {
      const term = t.toLowerCase().replace(/["\\]/g, '')
      const sparql = 'PREFIX cdm: <http://publications.europa.eu/ontology/cdm#> SELECT DISTINCT ?work ?title WHERE { '
        + '?expr cdm:expression_belongs_to_work ?work ; cdm:expression_title ?title ; '
        + 'cdm:expression_uses_language <http://publications.europa.eu/resource/authority/language/ENG> . '
        + `FILTER(CONTAINS(LCASE(STR(?title)), "${term}")) } LIMIT 8`
      return `${EURLEX.base}?query=${q(sparql)}&format=${q('application/sparql-results+json')}`
    }, (d) => d.results?.bindings ?? [],
    (b) => evidenceRow(EURLEX.host, toUuid('eurlex:' + (b.work?.value ?? '')), `EUR-Lex ${(b.work?.value ?? '').replace(/^.*\//, '')}: ${(b.title?.value ?? '').slice(0, 80)}`),
    // the SPARQL protocol's own JSON media type — the endpoint answers 406 to a plain application/json
    { headers: { accept: 'application/sparql-results+json' } }) },
]

/** every wired research stream by host, in door order */
export const RESEARCH_SOURCE_NAMES: readonly string[] = RESEARCH_DOORS.map((d) => d.host)

/** The unanswered-math door — MathOverflow questions with no accepted answer, from the same base as the MO door. */
export const UNANSWERED_MATH_URL = `${MO.base}/questions/unanswered?order=desc&sort=votes&site=mathoverflow&pagesize=8`

/** unansweredMath() → open MathOverflow titles as evidence. Network. Never fabricates a row. */
export async function unansweredMath(): Promise<ResearchEvidence[]> {
  try {
    const got = await fetchData<{ items?: { question_id?: number; title?: string; is_answered?: boolean }[] }>(UNANSWERED_MATH_URL, 'json')
    if (got.data === null) return []
    return (got.data.items ?? [])
      .filter((x) => x.is_answered !== true)
      .map((x) => evidenceRow(MO.host, toUuid('mo-unanswered:' + x.question_id), `MO open: ${(x.title ?? '').slice(0, 80)}`))
  } catch {
    return []
  }
}

/** researchSweep(topic) → the wave: every door asked the same topic at once; each reading says whether it spoke. Network. */
export async function researchSweep(topic: string): Promise<SourceReading[]> {
  return await Promise.all(RESEARCH_DOORS.map((d) => d.read(topic)))
}

/** researchEvidence(topic) → flat evidence rows from the sweep (consumers that only want rows). */
export async function researchEvidence(topic: string): Promise<ResearchEvidence[]> {
  return (await researchSweep(topic)).flatMap((r) => r.evidence)
}
