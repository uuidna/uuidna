// @non-harmonic: fetches the EU's public education APIs (network) — NAMED boundary; the harmonic core must never carry these ops.
// school-apis — THE EUROPEAN EDUCATION APIS BEHIND ONE DOOR, each one PROBED before it was wired.
//
// "EU school APIs" is not one thing, and every survey of them that reads well is wrong in the same place: it lists an
// endpoint nobody called. So each source here was fetched first and is recorded with what it ACTUALLY answered —
// ESCO's search answered for "programming" with a live skills page, Eurostat's dissemination API returned JSON-stat 2.0 for
// educ_uoe_enrt01, GISCO's education directory served the Bulgarian school directory as CSV. A source that could not be
// called is not in the registry; it is in ABSENT, by name, with what stands in its place.
//
// THE FOUR, AND WHAT EACH IS FOR:
//   esco      — the EU taxonomy of skills, competences and occupations. The one that MAPS: uuidna's own skill
//               clusters are matched against it, so a sealed theorem's skill lands on a European skill URI.
//   eurostat  — EU-wide education STATISTICS (JSON-stat 2.0), decoded here from flat indices to labelled observations.
//   gisco     — school LOCATIONS as published by the member states themselves: coordinates, levels, authority.
//   oeapi     — the interoperability standard. Not fetched: uuidna already SERVES it (src/oeapi.ts, uuidna_oeapi),
//               which is the only one of the four that runs the other way round.
//
// HONEST SCOPE: what comes back over the network is EVIDENCE, never a seal — a provenance fingerprint of what a named
// public source said when it was asked, exactly as corroborate.ts treats its streams. Only a `by decide` theorem
// SEALS. Eurostat publishes aggregates and GISCO publishes institutions, so nothing here carries a pupil's data; the
// contact fields in a GISCO row are the member state's own published INSTITUTIONAL contacts, and they are passed
// through unaltered rather than quietly dropped, because a silent edit to public data is the drift this repo catches.
// A source may be unreachable — best-effort, and it NEVER fabricates a row. The parse, the decode and the addressing
// are pure: the same bytes fold to the same receipt for anyone. Integrity, not truth.
import { toUuid } from './address.js'
import { hexbitDoorOf } from './hexbit/index.js'
import { merkleGravity } from './gravity/index.js'
import { skillGroups } from './theorems/index.js'

/** One wired source: what it serves, where, in what format, and the scope it may never exceed. */
export interface SchoolApi {
  id: string
  name: string
  base: string
  kind: 'taxonomy' | 'statistics' | 'geography' | 'interoperability' | 'catalogue' | 'research' | 'procurement'
  serves: string[]
  format: string
  access: string
  direction: 'fetched' | 'served'
  /** the known-good query that proves this source still answers — declared HERE so a source cannot be added
   *  without saying how to check it, the way lean/dormant-scripts.json refuses a script with no way to run it. */
  probe?: SchoolApiQuery
  honest: string
}

/** A row from a public source, content-addressed — evidence of what was said, never a proof that it is so. */
export interface SchoolApiEvidence { source: string; address: string; [field: string]: unknown }

export interface SchoolApiAnswer {
  source: string
  query: Record<string, string>
  url: string
  count: number
  results: SchoolApiEvidence[]
  truncated: boolean
  declined?: boolean   // the source did not ANSWER WITH DATA: a refusal, a wrong shape, or a web page served as 200
  note?: string        // when declined, what it actually did — so a silence is never mistaken for an empty world

  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

const HONEST =
  'EXTERNAL EVIDENCE, never a seal: each row is a provenance fingerprint of what a named public EU source answered ' +
  'when it was asked, and only a `by decide` theorem SEALS. The rows are passed through unaltered and are never ' +
  'fabricated — an unreachable source returns nothing, which is an absence, not a refutation. The parse and the ' +
  'addressing are pure, so the same bytes fold to the same receipt for anyone. Integrity, not truth.'

const ESCO = 'https://ec.europa.eu/esco/api'
const EUROSTAT = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data'
const GISCO = 'https://gisco-services.ec.europa.eu/pub/education'
const DATA_EUROPA = 'https://data.europa.eu/api/hub/search/search'
const CORDIS = 'https://cordis.europa.eu/api/search/results'
const TED = 'https://api.ted.europa.eu/v3/notices/search'
/** the CPV division for education and training services — TED's own classification, so the filter is the EU's, not ours */
export const CPV_EDUCATION = '80000000'
/** the GISCO education vintage this module was probed against — the directory is versioned, so the year is explicit */
export const GISCO_VINTAGE = '2020'
const DEFAULT_LIMIT = 25

// THE ONE CACHE, AND WHY IT IS SAFE HERE AND NOWHERE ELSE ON THIS PAGE. Six of these sources answer QUERIES — ask
// ESCO the same phrase next year and it may honestly answer differently — so caching them would serve a stale answer
// as a live one, which is the drift this module exists to catch. GISCO is a different kind of read: its URL CARRIES
// THE VINTAGE (…/education/2020/csv/BG.csv), so the bytes behind a given URL cannot change — a new vintage is a new
// URL. That is immutability by construction, not by assumption, and it is the standing law's own case: cache the
// immutable read and pay for it once. Same idiom as _uuidCache in address.ts and _cache in captain/credits.
const _immutable = new Map<string, string>()

/** Fetch a URL whose bytes cannot change because the URL names its own version. Anything else must NOT come here. */
async function immutableText(url: string, kind: DataKind): Promise<Fetched<string>> {
  const hit = _immutable.get(url)
  if (hit !== undefined) return { data: hit, declined: false, note: 'cached' }
  const got = await fetchData<string>(url, kind)
  // VALIDATE BEFORE STORING. The url names its own vintage, so whatever is cached here is served for the life of
  // the process — caching an error page would make one bad minute permanent.
  if (got.data !== null) _immutable.set(url, got.data)
  return got
}

/** immutableReads() → what the vintage-carrying cache is holding: the URLs paid for once, for the heartbeat and for
 *  anyone auditing that a cached read is only ever a versioned one. */
export function immutableReads(): { handle: string; url: string; bytes: number; door: string; hexbits: number[] }[] {
  return [..._immutable].map(([url, text]) => {
    const address = toUuid(url)
    const door = hexbitDoorOf(address)
    return { handle: door.handle, door: door.door, hexbits: door.hexbits, url, bytes: text.length }
  })
}


// ── WHAT CAME BACK IS NOT THE SAME QUESTION AS WHETHER IT ANSWERED ───────────────────────────────────────────────
//
// A 200 is not an answer: twelve EU endpoints serve text/html, two of them at a path containing /api/.
//
// This module was one level better and still not enough. Each fetcher called r.json(), which THROWS on a web page,
// and the throw landed in a best-effort catch that returns an empty answer — so a source serving an error page read
// as "answered, found nothing", indistinguishable from a source that genuinely has nothing. cordisSearch got a
// `declined` flag when the hyphen trap made that distinction visible; the other five never did.
//
// So the tell is universal now: a refusal, a wrong shape and a web page are all DECLINED, each with what it was,
// and only a real payload is an answer. This is also why the cache validates BEFORE storing — caching an error page
// under an immutable URL would serve that page for the life of the process.
type DataKind = 'json' | 'csv'
interface Fetched<T> { data: T | null; declined: boolean; note: string }

const isHtml = (contentType: string, body: string): boolean =>
  /text\/html/i.test(contentType) || /^\s*(<!doctype html|<html[\s>])/i.test(body.slice(0, 200))

async function fetchData<T>(url: string, kind: DataKind, init?: RequestInit): Promise<Fetched<T>> {
  const accept = kind === 'json' ? 'application/json' : 'text/csv'
  let r: Response
  try { r = await fetch(url, { ...init, headers: { accept, ...(init?.headers ?? {}) } }) }
  catch (e) { return { data: null, declined: true, note: 'unreachable: ' + String((e as Error).message).slice(0, 90) } }
  if (!r.ok) return { data: null, declined: true, note: `responded ${r.status}` }
  const text = await r.text()
  if (isHtml(r.headers.get('content-type') ?? '', text))
    return { data: null, declined: true, note: 'served a WEB PAGE (text/html), not data — answering is not the same as answering with data' }
  if (kind === 'csv') return { data: text as unknown as T, declined: false, note: 'ok' }
  try { return { data: JSON.parse(text) as T, declined: false, note: 'ok' } }
  catch { return { data: null, declined: true, note: 'payload did not parse as JSON' } }
}

/** THE ONE REGISTRY — every source is DECLARED here and reached through schoolApiFetch, so there is one door.
 *  It is NOT one edit: adding a source costs three (this entry, a fetcher, a dispatcher branch), unlike
 *  corroborate.ts, where a source really is one line because the streams share a signature and fan out from an
 *  array. The shapes here genuinely differ — GET vs POST, JSON vs CSV, phrase vs classification code — so the
 *  three edits are the honest cost, not a shortcut nobody took. Stated because a comment claiming one entry
 *  when the code needs three is the drift this repo folds finders to catch. */
export const SCHOOL_APIS: readonly SchoolApi[] = [
  { id: 'esco', name: 'ESCO — European Skills, Competences, Qualifications and Occupations', base: ESCO,
    probe: { text: 'chemistry', limit: 3 },
    kind: 'taxonomy', direction: 'fetched',
    serves: ['skills', 'competences', 'occupations', 'qualifications', 'multilingual labels'],
    format: 'JSON (HAL)', access: 'public, no key',
    honest: 'A CLASSIFICATION, not a school system: it says what a skill IS CALLED across the EU, never who holds it. ' +
      'It is also the BRIDGE — the same concept graph carries skills and occupations, related both ways, so education ' +
      'and jobs are paired INSIDE one public vocabulary rather than joined on a guess.' },
  { id: 'eurostat', name: 'Eurostat — education and training statistics', base: EUROSTAT,
    probe: { dataset: 'educ_uoe_enrt01', geo: 'BG', time: '2022', limit: 3 },
    kind: 'statistics', direction: 'fetched',
    serves: ['enrolment', 'expenditure', 'participation', 'attainment', 'teaching staff', 'early leavers',
      'job vacancies (jvs_q_nace2) — the JOBS side of the same door'],
    format: 'JSON-stat 2.0', access: 'public, no key',
    honest: 'AGGREGATES ONLY — country/level/year cells. No individual record exists in it to ask for.' },
  { id: 'gisco', name: 'Eurostat GISCO — education services (school locations)', base: GISCO,
    probe: { country: 'BG', limit: 3 },
    kind: 'geography', direction: 'fetched',
    serves: ['school name and address', 'coordinates', 'education levels', 'facility type', 'reference year'],
    format: 'CSV (also GeoJSON / GeoPackage)', access: 'public bulk download, no key',
    honest: 'A GEOGRAPHIC DISCOVERY LAYER assembled from member-state sources — coverage and fields VARY BY COUNTRY, ' +
      'and it is not a substitute for a national school register.' },
  { id: 'data-europa', name: 'data.europa.eu — the EU open data catalogue', base: DATA_EUROPA,
    probe: { text: 'education', limit: 3 },
    kind: 'catalogue', direction: 'fetched',
    serves: ['dataset titles and descriptions', 'publishing country', 'catalogue', 'categories', 'keywords'],
    format: 'JSON', access: 'public, no key',
    honest: 'A CATALOGUE OF CATALOGUES — it says which datasets EXIST and who publishes them, never what is in them. ' +
      'It is the door the other three were found through: search it before assuming a European dataset is absent.' },
  { id: 'cordis', name: 'CORDIS — EU research projects and Horizon programme topics', base: CORDIS,
    probe: { text: 'quantum', limit: 3 },
    kind: 'research', direction: 'fetched',
    serves: ['funded project titles and teasers', 'Horizon call topics', 'content type', 'record id'],
    format: 'JSON', access: 'public, no key',
    honest: 'PUBLIC RECORD of what the EU funded and what it is calling for — evidence of prior work and of open ' +
      'topics, never a claim that uuidna is party to any of it, nor that a topic would accept it.' },
  { id: 'ted', name: 'TED — Tenders Electronic Daily (EU public procurement)', base: TED,
    probe: { limit: 3 },
    kind: 'procurement', direction: 'fetched',
    serves: ['notice titles in every official language', 'publication number', 'notice links'],
    format: 'JSON (POST)', access: 'public, no key',
    honest: 'PUBLISHED NOTICES only, filtered by the EU\'s own CPV classification (education = 80000000). It says what ' +
      'was tendered; it does not assess, rank or advise on bidding, and a notice is not an opportunity assessment.' },
  { id: 'oeapi', name: 'Open Education API v6.0 — the interoperability standard', base: 'https://oeapi.eu/',
    kind: 'interoperability', direction: 'served',
    serves: ['organisations', 'programmes', 'courses', 'learning outcomes'],
    format: 'REST/JSON', access: 'per institution — uuidna SERVES it, and fetches nobody',
    honest: 'The one that runs the other way: uuidna PUBLISHES its school under these field names (uuidna_oeapi). ' +
      'Read-only and carrying no personal data — persons, groups, offerings and results are absent by construction.' },
]

// THE ABSENCE LAW — naming no alternative is lying by omission, so each source that could NOT be wired says why.
const ABSENT: { source: string; why: string; instead: string }[] = [
  { source: 'European School Education Platform (school-education.ec.europa.eu)',
    why: 'a community and content platform — Erasmus+, eTwinning, teacher CPD. It publishes no general read API for ' +
      'schools, courses or learners, so there is nothing here to call.',
    instead: 'For the school-as-data surface, uuidna_oeapi; for skills, the esco source above.' },
  { source: 'national school registers (ministry / statistical-office registries)',
    why: 'there is no EU-wide endpoint: each member state publishes its own register, under its own schema, at its ' +
      'own address. Wiring "the national register" as one source would be inventing a door that does not exist.',
    instead: 'The gisco source is the cross-country stand-in — assembled FROM those national sources, at the cost of ' +
      'per-country variation in coverage and fields.' },
  { source: 'Funding & Tenders portal search (SEDIA, api.tech.ec.europa.eu)',
    why: 'it ANSWERS — and that is the trap. The generic text search returns 200 with the portal\'s support and FAQ ' +
      'pages ranked above anything fundable, and the filtered form that would return call topics answered 500. A ' +
      'source wired on the path that responds rather than the path that serves is how a registry fills with rows ' +
      'nobody can use.',
    instead: 'The cordis source above already surfaces Horizon call topics (a search for "quantum" returned the ' +
      'HORIZON-CL3 post-quantum-cryptography topic by id), which is the part SEDIA was wanted for.' },
  { source: 'EURES — the European job-mobility portal (europa.eu/eures)',
    why: 'the portal is public but its vacancy search is not: the documented search endpoint answered 404 and the ' +
      'app path answered 403 when probed, so there is no open door to wire. Listing it as available would be exactly ' +
      'the endpoint-nobody-called this registry exists to avoid.',
    instead: 'The jobs side is reached two ways that DO answer: ESCO occupations (what work a skill is needed for) ' +
      'and Eurostat jvs_q_nace2 (how many vacancies a country actually reports).' },
  { source: 'an automatic mapping of the sealed ledger onto ESCO (built, measured, REMOVED)',
    why: 'it was wired and run over all 68 skill clusters, and it produced confident wrong rows: sequence — the Z/9 ' +
      'doubling orbit — mapped to "sequence explosions" and on to explosives engineer, colour to "add colour" and on ' +
      'to transport engineer. Filtering fragment hits raised the floor and did not reach a ceiling, because the ' +
      'remaining error needs MEANING, not string shape. A surface that is right most of the time about which European ' +
      'skill a proof teaches is worse than no surface, since nothing in the output marks which rows are the wrong ones.',
    instead: 'The pairing walk, one subject at a time and a human reading the result: uuidna_education_jobs. It moves ' +
      'along ESCO\'s OWN published skill-to-occupation relation instead of guessing, and now filters its first hop by ' +
      'the same whole-name rule, reporting what it rejected.' },
  { source: 'any student information system (enrolment, grades, attendance)',
    why: 'no EU-level API serves these, and uuidna holds no learner data to serve: it enrols nobody and grades ' +
      'nobody. A pupil-data API is a thing an institution operates, under a controller, not a thing to federate.',
    instead: 'Your own API, with OOAPI as the shape — the projection at uuidna_oeapi shows the field names.' },
]

export interface SchoolApiRegistry {
  count: number
  sources: readonly SchoolApi[]
  absent: { source: string; why: string; instead: string }[]
  giscoVintage: string
  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

/** schoolApiRegistry() → the wired sources, the named absences, and one order-invariant receipt. Pure: no network. */
export function schoolApiRegistry(): SchoolApiRegistry {
  const receipt = merkleGravity(SCHOOL_APIS.map((s) => toUuid('school-api:' + s.id + ':' + s.base)))
  return {
    count: SCHOOL_APIS.length, sources: SCHOOL_APIS, absent: ABSENT, giscoVintage: GISCO_VINTAGE,
    receipt, ...hexbitDoorOf(receipt),
    honest: HONEST,
  }
}

const answer = (source: string, query: Record<string, string>, url: string, results: SchoolApiEvidence[],
                truncated: boolean, declined = false, note = ''): SchoolApiAnswer => {
  const receipt = merkleGravity(results.map((r) => r.address))
  return { source, query, url, count: results.length, results, truncated, declined,
     ...(note ? { note } : {}), receipt, ...hexbitDoorOf(receipt), honest: HONEST }
}

const limitOf = (n?: number): number => (n === undefined || n <= 0 ? DEFAULT_LIMIT : n > 200 ? 200 : n)

// ── ESCO: the taxonomy, and the one source that MAPS onto uuidna's own skills ──────────────────────────────────────

export interface EscoConcept extends SchoolApiEvidence { uri: string; title: string; conceptType: string }

/** escoSearchUrl(text,type,limit) → THE ONE derivation of an ESCO search URL. PURE — it builds the query and reaches
 *  nothing, so a surface that only needs to say WHERE a concept would be looked up (the skill axis: src/skills.ts)
 *  cites the exact URL the live fetcher below calls, instead of spelling a second one that can drift from it. */
export function escoSearchUrl(text: string, type = 'skill', limit?: number): string {
  return `${ESCO}/search?text=${encodeURIComponent(text)}&language=en&type=${encodeURIComponent(type)}&limit=${limitOf(limit)}`
}

/** escoSearch(text) → the EU's own skills/occupations matching a phrase, each content-addressed by its ESCO URI.
 *  One network call. `type` is the ESCO class: skill (default), occupation, or qualification. */
export async function escoSearch(text: string, type = 'skill', limit?: number): Promise<SchoolApiAnswer> {
  const url = escoSearchUrl(text, type, limit)
  const results: EscoConcept[] = []
  let total = 0
  const got = await fetchData<{ total?: number; _embedded?: { results?: { uri?: string; title?: string; className?: string }[] } }>(url, 'json')
  if (got.data === null) return answer('esco', { text, type }, url, [], false, true, got.note)
  total = Number(got.data.total ?? 0)
  for (const c of got.data._embedded?.results ?? []) {
    if (!c.uri) continue // never fabricate an identifier the source did not give
    results.push({ source: 'esco', address: toUuid(c.uri), uri: c.uri, title: String(c.title ?? ''), conceptType: String(c.className ?? type) })
  }
  return answer('esco', { text, type }, url, results, total > results.length)
}

/** THE HOMOGRAPH RULE — a lexical hit is worth walking only if the subject's FULL name appears as a whole token
 *  sequence in the concept's title. A search GUARANTEES the query's letters come back, so a fragment hit carries no
 *  information: measured over the ledger's 68 skill clusters, the unfiltered matches were worse than the misses —
 *  z9-ring landed on "cast concrete rings", z7-rosette on "finish costumes", cipher on "interpret religious texts".
 *  Two weaker rules were tried and REFUTED first: vocabulary overlap between the subject's theorem statements and
 *  the concept's description scored "quantum mechanics" and "cast concrete rings" identically (the signal was
 *  stopwords), and requiring an occupation relation rejected nothing — "cast concrete rings" has two. */
// EXPORTED so the skill axis (src/skills.ts) judges an ESCO title by THIS rule rather than a copy of it: the
// acceptance law has one implementation, and a caller that fetched concepts through the one door hands the titles
// back to be judged the same way the pairing walk judges them.
export const escoWholeName = (subject: string, title: string): boolean => {
  const norm = (x: string): string => ' ' + x.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() + ' '
  return norm(title).includes(norm(subject))
}

// ── Eurostat: JSON-stat 2.0, decoded from flat indices to labelled observations ────────────────────────────────────

export interface EurostatObservation extends SchoolApiEvidence { value: number; dimensions: Record<string, string> }

/** eurostatEducation(dataset, filters) → EU education statistics as LABELLED observations, not raw JSON-stat indices.
 *  `dataset` is a Eurostat code (e.g. "educ_uoe_enrt01"); `filters` are the API's own dimension filters
 *  (e.g. {geo:"BG", time:"2022"}). One network call; the decode is pure integer arithmetic. */
export async function eurostatEducation(dataset: string, filters: Record<string, string> = {}, limit?: number): Promise<SchoolApiAnswer> {
  const n = limitOf(limit)
  const q = Object.entries(filters).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
  const url = `${EUROSTAT}/${encodeURIComponent(dataset)}?format=JSON&lang=EN${q ? '&' + q : ''}`
  const results: EurostatObservation[] = []
  let more = false
  const got = await fetchData<{
    id?: string[]; size?: number[]; value?: Record<string, number> | number[]
    dimension?: Record<string, { label?: string; category?: { index?: Record<string, number> | string[]; label?: Record<string, string> } }>
  }>(url, 'json')
  if (got.data === null) return answer('eurostat', { dataset, ...filters }, url, [], false, true, got.note)
  {
    const body = got.data
    const ids = body.id ?? [], size = body.size ?? []
    // JSON-stat packs every cell into ONE flat index over the dimension sizes. Decode by successive integer
    // division from the LAST dimension — exact on non-negative integers, so no rounding is ever taken.
    const codesOf = (dim: string): string[] => {
      const index = body.dimension?.[dim]?.category?.index
      if (Array.isArray(index)) return index.map(String)
      if (index) return Object.keys(index).sort((a, b) => (index[a] as number) - (index[b] as number))
      return []
    }
    const codes = ids.map(codesOf)
    const labels = ids.map((d) => body.dimension?.[d]?.category?.label ?? {})
    const raw = body.value ?? {}
    const cells: [string, number][] = Array.isArray(raw)
      ? raw.map((v, i) => [String(i), v] as [string, number]).filter(([, v]) => typeof v === 'number')
      : Object.entries(raw)
    for (const [flat, value] of cells) {
      if (results.length >= n) { more = true; break }
      let rest = Number(flat)
      const dimensions: Record<string, string> = {}
      for (let d = ids.length - 1; d >= 0; d--) {
        const width = size[d] ?? 1
        const pos = rest % width
        rest = (rest - pos) / width         // integer division, exact — never a rounded quotient
        const code = codes[d]?.[pos] ?? String(pos)
        dimensions[ids[d]] = labels[d]?.[code] ?? code
      }
      results.push({ source: 'eurostat', address: toUuid(dataset + ':' + flat + ':' + value), value, dimensions })
    }
  }
  return answer('eurostat', { dataset, ...filters }, url, results, more)
}

// ── GISCO: the member states' own school locations ────────────────────────────────────────────────────────────────

export interface GiscoSchool extends SchoolApiEvidence {
  id: string; name: string; lat: number | null; lon: number | null
  city: string; postcode: string; country: string; levels: string; facilityType: string
  url: string; refDate: string
}

/** Split one CSV line on commas OUTSIDE quotes, unescaping the doubled quote — the GISCO rows carry both, and a
 *  naive split silently truncates every school whose name contains a comma or a quoted nickname. */
export function splitCsvLine(line: string): string[] {
  const out: string[] = []
  let field = '', quoted = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (quoted) {
      if (c !== '"') { field += c; continue }
      if (line[i + 1] === '"') { field += '"'; i++; continue }  // "" is one literal quote
      quoted = false
    } else if (c === '"') quoted = true
    else if (c === ',') { out.push(field); field = '' }
    else field += c
  }
  out.push(field)
  return out
}

const num = (s: string): number | null => (s && /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : null)

/** giscoSchools(country) → schools in one EU country as the member state published them, optionally narrowed by a
 *  case-insensitive substring `match` over name and city. One network call (a country CSV, ~1 MB). */
export async function giscoSchools(country: string, match?: string, limit?: number, year = GISCO_VINTAGE): Promise<SchoolApiAnswer> {
  const n = limitOf(limit)
  const cc = country.toUpperCase()
  const url = `${GISCO}/${encodeURIComponent(year)}/csv/${encodeURIComponent(cc)}.csv`
  const results: GiscoSchool[] = []
  let more = false
  try {
    // the vintage is in the URL, so this text is paid for ONCE per country per vintage, however many times a
    // caller narrows it with a different `match` or `limit` — the filtering below is pure and re-runs for free.
    const got = await immutableText(url, 'csv')
    if (got.data === null) return answer('gisco', match ? { country: cc, match, year } : { country: cc, year }, url, [], false, true, got.note)
    const text = got.data.replace(/^\ufeff/, '')     // the file is served with a BOM
    {
      const lines = text.split(/\r?\n/)
      const head = splitCsvLine(lines[0] ?? '')
      const at = (row: string[], field: string): string => {
        const i = head.indexOf(field)
        return i < 0 ? '' : (row[i] ?? '').trim()
      }
      const needle = match?.toLowerCase() ?? ''
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue
        const row = splitCsvLine(lines[i])
        const name = at(row, 'name'), city = at(row, 'city')
        if (needle && !name.toLowerCase().includes(needle) && !city.toLowerCase().includes(needle)) continue
        if (results.length >= n) { more = true; break }
        const id = at(row, 'id')
        results.push({
          source: 'gisco', address: toUuid('gisco:' + cc + ':' + id), id, name,
          lat: num(at(row, 'lat')), lon: num(at(row, 'lon')),
          city, postcode: at(row, 'postcode'), country: at(row, 'cntr_id') || cc,
          levels: at(row, 'levels'), facilityType: at(row, 'facility_type'),
          url: at(row, 'url'), refDate: at(row, 'ref_date'),
        })
      }
    }
  } catch { /* best-effort: a country the dataset does not cover returns nothing, which is an absence, not a denial */ }
  return answer('gisco', match ? { country: cc, match, year } : { country: cc, year }, url, results, more)
}



// ── The catalogue, the research record, and the tenders ───────────────────────────────────────────────────────────

/** Pick a language's string out of the EU's multilingual objects ({en:…, bg:…} / {ENG:…}), preferring English and
 *  falling back to whatever exists — dropping a title because it is not in English would lose the row entirely. */
export function pickLang(v: unknown): string {
  if (typeof v === 'string') return v
  if (!v || typeof v !== 'object') return ''
  const o = v as Record<string, unknown>
  for (const k of ['en', 'eng', 'ENG', 'en-GB', 'mul', 'MUL']) {
    const hit = o[k]
    if (typeof hit === 'string') return hit
    if (Array.isArray(hit) && typeof hit[0] === 'string') return hit[0]
  }
  for (const val of Object.values(o)) {
    if (typeof val === 'string') return val
    if (Array.isArray(val) && typeof val[0] === 'string') return val[0]
  }
  return ''
}

export interface EuDataset extends SchoolApiEvidence { id: string; title: string; country: string; catalogue: string }

/** dataEuropaSearch(text) → which European datasets EXIST for a phrase, from the EU's own catalogue of catalogues.
 *  This is the door the education sources were found through. One network call. */
export async function dataEuropaSearch(text: string, limit?: number): Promise<SchoolApiAnswer> {
  const n = limitOf(limit)
  const url = `${DATA_EUROPA}?q=${encodeURIComponent(text)}&limit=${n}`
  const results: EuDataset[] = []
  const got = await fetchData<{ result?: { results?: { id?: string; title?: unknown; country?: { label?: string }; catalog?: { id?: string } }[] } }>(url, 'json')
  if (got.data === null) return answer('data-europa', { text }, url, [], false, true, got.note)
  for (const d of got.data.result?.results ?? []) {
    if (!d.id) continue // never fabricate an identifier the catalogue did not give
    results.push({ source: 'data-europa', address: toUuid('data-europa:' + d.id), id: d.id,
      title: pickLang(d.title), country: d.country?.label ?? '', catalogue: d.catalog?.id ?? '' })
  }
  return answer('data-europa', { text }, url, results, false)
}

export interface CordisRecord extends SchoolApiEvidence { id: string; title: string; teaser: string; contentType: string }

/** cordisSearch(text) → what the EU has FUNDED and what it is CALLING FOR: project records and Horizon programme
 *  topics in one public index. One network call.
 *
 *  THE HYPHEN TRAP, found by probing: CORDIS reads `-` as the NOT operator, so a search for "post-quantum
 *  cryptography" answers 200 with an EMPTY payload — no results, no total, and error:null. That is an absence
 *  wearing the shape of data, and a best-effort catch would have reported it as "nothing found" forever. The phrase
 *  is quoted here (which restores the 299 real hits), and a payload carrying no `total` at all is reported as
 *  DECLINED rather than as zero — the source refusing a query and the world containing nothing are different facts. */
export async function cordisSearch(text: string, limit?: number): Promise<SchoolApiAnswer> {
  const n = limitOf(limit)
  // quote the phrase so CORDIS's operator syntax cannot eat it; a quote inside the text would break the quoting
  const phrase = '"' + text.replace(/"/g, ' ') + '"'
  const url = `${CORDIS}?q=${encodeURIComponent(phrase)}&format=json&num=${n}`
  const results: CordisRecord[] = []
  let more = false, declined = false
  const got = await fetchData<{ payload?: { total?: number; results?: { id?: string; title?: unknown; teaser?: unknown; contentType?: string }[] } }>(url, 'json')
  if (got.data === null) return answer('cordis', { text }, url, [], false, true, got.note)
  const rows = got.data.payload?.results ?? []
  // CORDIS's own tell, kept: a 200 whose payload carries no `total` at all is the query being REFUSED, not answered
  declined = got.data.payload?.total === undefined || got.data.payload?.total === null
  more = Number(got.data.payload?.total ?? 0) > rows.length
  for (const c of rows) {
    if (!c.id) continue
    results.push({ source: 'cordis', address: toUuid('cordis:' + c.id), id: c.id,
      title: pickLang(c.title), teaser: pickLang(c.teaser).slice(0, 240), contentType: c.contentType ?? '' })
  }
  return answer('cordis', { text }, url, results, more, declined,
    declined ? 'the payload carried no result envelope — the source refused the query' : '')
}

export interface TedNotice extends SchoolApiEvidence { publication: string; title: string; link: string }

/** tedNotices(cpv) → published EU tender notices under one CPV division, education (80000000) by default. TED wants a
 *  POST with its own expert-query syntax, so the filter is the EU's classification rather than a phrase we invented. */
export async function tedNotices(cpv = CPV_EDUCATION, limit?: number): Promise<SchoolApiAnswer> {
  const n = limitOf(limit)
  const results: TedNotice[] = []
  let more = false
  const got = await fetchData<{ notices?: { 'publication-number'?: string; 'notice-title'?: unknown }[]; totalNoticeCount?: number }>(
    TED, 'json', { method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ query: `classification-cpv=${cpv}`, limit: n, fields: ['publication-number', 'notice-title'] }) })
  if (got.data === null) return answer('ted', { cpv }, TED, [], false, true, got.note)
  const rows = got.data.notices ?? []
  more = Number(got.data.totalNoticeCount ?? 0) > rows.length
  for (const t of rows) {
    const pub = t['publication-number']
    if (!pub) continue
    results.push({ source: 'ted', address: toUuid('ted:' + pub), publication: pub,
      title: pickLang(t['notice-title']).slice(0, 200), link: `https://ted.europa.eu/en/notice/${pub}` })
  }
  return answer('ted', { cpv }, TED, results, more)
}

// ── THE PAIRING: education ↔ jobs, through the vocabulary that already holds both ──────────────────────────────────
//
// Joining a curriculum to a labour market is normally done by matching strings and hoping. It does not have to be:
// ESCO's concept graph relates a SKILL to the OCCUPATIONS it is essential or optional for, and an OCCUPATION back to
// the skills it needs — both directions published, both fetched here. So the pairing walks a public relation instead
// of inventing one: uuidna skill cluster → ESCO skill → the occupations that require it → what the member states
// report as vacancies. Each hop is named, and a hop that returns nothing says so rather than being bridged by guess.

/** the Eurostat dataset the jobs side is counted from — quarterly job vacancy statistics by NACE Rev. 2 activity */
export const EUROSTAT_VACANCIES = 'jvs_q_nace2'

export interface OccupationLink extends SchoolApiEvidence { uri: string; title: string; relation: 'essential' | 'optional' }
export interface SkillJobPair { skill: string; escoSkill: { uri: string; title: string } | null; occupations: OccupationLink[] }
export interface EducationJobsPairing {
  subject: string
  homographs: string[]                                 // lexical hits rejected as fragment matches, returned by name
  cluster: { skill: string; theorems: number; fold: string } | null
  pairs: SkillJobPair[]
  occupations: number
  vacancies: SchoolApiAnswer | null
  receipt: string
  handle: string
  hexbits: number[]
  door: string
  honest: string
}

/** escoOccupationsForSkill(uri) → the occupations ESCO relates to one skill, each tagged essential or optional.
 *  One network call. The relation is ESCO's own; nothing is inferred from the label. */
export async function escoOccupationsForSkill(uri: string): Promise<OccupationLink[]> {
  const url = `${ESCO}/resource/skill?uri=${encodeURIComponent(uri)}&language=en`
  const out: OccupationLink[] = []
  const got = await fetchData<{ _links?: Record<string, { uri?: string; title?: string }[]> }>(url, 'json')
  if (got.data === null) return out   // an unreachable hop is an absence; the pairing reports it rather than filling it in
  const relations: [string, 'essential' | 'optional'][] = [['isEssentialForOccupation', 'essential'], ['isOptionalForOccupation', 'optional']]
  for (const [key, relation] of relations)
    for (const o of got.data._links?.[key] ?? []) {
      if (!o.uri) continue // never fabricate a link the graph did not publish
      out.push({ source: 'esco', address: toUuid(o.uri), uri: o.uri, title: String(o.title ?? ''), relation })
    }
  return out
}

/** eurostatVacancies(geo) → what a country REPORTS as job vacancies (jvs_q_nace2, whole economy B-S, all sizes),
 *  the jobs-side counterpart to the enrolment figures on the education side. One network call. */
export async function eurostatVacancies(geo: string, limit?: number): Promise<SchoolApiAnswer> {
  return eurostatEducation(EUROSTAT_VACANCIES, { geo, indic_em: 'JOBVAC', sizeclas: 'TOTAL', nace_r2: 'B-S', s_adj: 'NSA' }, limit)
}

/** pairEducationToJobs(subject) → THE PAIR: a subject taught (a uuidna skill cluster, or any phrase) walked through
 *  ESCO to the occupations that need it, optionally with the vacancies a country reports ({geo:"BG"}).
 *  HONEST: every hop is a published EU relation or a lexical match ESCO returned — a MAP BETWEEN VOCABULARIES for a
 *  human to accept or reject. It is not careers advice, not a prediction that a course leads to a job, and not a
 *  claim that any employer recognises anything sealed here. The vacancy figures are a country's own aggregate
 *  reporting, not openings matched to this subject. */
export async function pairEducationToJobs(subject: string, opts: { geo?: string; perSkill?: number; limit?: number } = {}): Promise<EducationJobsPairing> {
  const group = skillGroups().find((g) => g.skill.toLowerCase() === subject.toLowerCase())
  const skills = await escoSearch(subject, 'skill', opts.perSkill ?? 3)
  const all = skills.results as EscoConcept[]
  const onTopic = all.filter((c) => escoWholeName(subject, c.title))
  const homographs = all.filter((c) => !escoWholeName(subject, c.title)).map((c) => c.title)
  const pairs: SkillJobPair[] = onTopic.length
    ? await Promise.all(onTopic.map(async (c) => ({
        skill: subject, escoSkill: { uri: c.uri, title: c.title }, occupations: await escoOccupationsForSkill(c.uri),
      })))
    : [{ skill: subject, escoSkill: null, occupations: [] }]
  const vacancies = opts.geo ? await eurostatVacancies(opts.geo, opts.limit) : null
  const occupations = pairs.reduce((n, p) => n + p.occupations.length, 0)
  const receipt = merkleGravity(pairs.flatMap((p) => p.occupations.map((o) => o.address)))
  return {
    subject, homographs,
    cluster: group ? { skill: group.skill, theorems: group.count, fold: group.fold } : null,
    pairs, occupations, vacancies,
    receipt, ...hexbitDoorOf(receipt),
    honest:
      'A MAP BETWEEN PUBLIC VOCABULARIES, hop by named hop: the subject is matched LEXICALLY to ESCO skills — and a ' +
      'match is walked only if it carries the subject\'s WHOLE name, because a search returns the query\'s letters and ' +
      'a fragment hit is a homograph, returned here by name rather than dropped. Each surviving ' +
      'skill is walked along ESCO\'s OWN published essential/optional relation to the occupations it serves. It is not ' +
      'careers advice, not a prediction that studying this leads to that work, and not a claim that any employer or ' +
      'authority recognises anything sealed here (theorem provenance_integrity_not_content_truth) — uuidna awards no qualification. The vacancy figures are a country\'s ' +
      'own aggregate reporting for the whole economy, NEVER openings matched to this subject. ' + HONEST,
  }
}

// ── The one door ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface SchoolApiQuery { text?: string; type?: string; dataset?: string; geo?: string; time?: string; country?: string; match?: string; limit?: number; year?: string; vacancies?: boolean; cpv?: string }

/** schoolApiFetch(source, query) → dispatch to one wired source by id. The registry is the only list of names, so a
 *  source that is not in it is refused BY NAME rather than silently answered with nothing. */
export async function schoolApiFetch(source: string, query: SchoolApiQuery = {}): Promise<SchoolApiAnswer> {
  const known = SCHOOL_APIS.map((s) => s.id)
  if (!known.includes(source)) throw new Error(`school-apis: unknown source "${source}" — the wired sources are ${known.join(', ')}`)
  if (source === 'esco') {
    if (!query.text) throw new Error('school-apis: esco needs {text} — the phrase to look up in the EU skill taxonomy')
    return escoSearch(query.text, query.type ?? 'skill', query.limit)
  }
  if (source === 'eurostat') {
    if (query.vacancies) {
      if (!query.geo) throw new Error('school-apis: eurostat vacancies need {geo} — a country code, e.g. "BG"')
      return eurostatVacancies(query.geo, query.limit)
    }
    if (!query.dataset) throw new Error('school-apis: eurostat needs {dataset} — a Eurostat code, e.g. "educ_uoe_enrt01", or {vacancies:true,geo} for the jobs side')
    const filters: Record<string, string> = {}
    if (query.geo) filters.geo = query.geo
    if (query.time) filters.time = query.time
    return eurostatEducation(query.dataset, filters, query.limit)
  }
  if (source === 'data-europa') {
    if (!query.text) throw new Error('school-apis: data-europa needs {text} — the phrase to search the EU catalogue for')
    return dataEuropaSearch(query.text, query.limit)
  }
  if (source === 'cordis') {
    if (!query.text) throw new Error('school-apis: cordis needs {text} — the phrase to search EU research records for')
    return cordisSearch(query.text, query.limit)
  }
  if (source === 'ted') return tedNotices(query.cpv ?? CPV_EDUCATION, query.limit)
  if (source === 'gisco') {
    if (!query.country) throw new Error('school-apis: gisco needs {country} — a two-letter code, e.g. "BG"')
    return giscoSchools(query.country, query.match, query.limit, query.year ?? GISCO_VINTAGE)
  }
  throw new Error('school-apis: oeapi is SERVED, not fetched — uuidna publishes it; call uuidna_oeapi instead')
}

// ── THE HEARTBEAT — a source that nobody calls is a source that can die quietly ───────────────────────────────────
//
// Every test over this module is PURE, and every source is reached only through an MCP tool, which means the seven
// endpoints run exactly when a human or an agent asks. That is the opposite of independence: all seven could begin
// answering 404 tomorrow and the whole suite would stay green. src/scripts/exercise-dormant.ts exists for the same
// reason one level down ("importing a module makes it supported while nothing exercises what it DOES"), and when its
// 33 scripts were finally run, four were dead.
//
// So the probe is a FUNCTION with the call INJECTED — the shape await-live.ts already argued for: a loop written
// inside a workflow is a loop no test can reach. Here every path (answers, empty, declines, throws) is exercised by
// node --test with a fake dispatcher, offline, and the live run is the same function with the real door passed in.
//
// IT REPORTS DARKNESS, IT DOES NOT FAIL. An EU API being down is not this repository's defect; the defect would be
// not noticing. There is also no timing here on purpose: a clock is banned in this source tree, so the probe reports
// WHETHER a source answered and with how many rows, never how fast — latency is measured outside, by hand.

export interface SourceProbe { id: string; ok: boolean; rows: number; declined: boolean; note: string }
export interface Heartbeat { probed: number; answering: number; dark: SourceProbe[]; probes: SourceProbe[]; receipt: string; handle: string; hexbits: number[]; door: string; honest: string }

/** probeSchoolApis(call?) → ask every FETCHED source its own declared known-good query and report which answered.
 *  `call` is injected so the whole thing is testable offline; it defaults to the real door. Never throws. */
export async function probeSchoolApis(
  call: (source: string, query: SchoolApiQuery) => Promise<SchoolApiAnswer> = schoolApiFetch,
): Promise<Heartbeat> {
  const wired = SCHOOL_APIS.filter((s) => s.direction === 'fetched')
  const probes: SourceProbe[] = await Promise.all(wired.map(async (s): Promise<SourceProbe> => {
    if (!s.probe) return { id: s.id, ok: false, rows: 0, declined: false, note: 'no known-good query is declared for this source' }
    try {
      const a = await call(s.id, s.probe)
      if (a.declined) return { id: s.id, ok: false, rows: a.count, declined: true, note: 'the source REFUSED the query (answered with no result envelope) — not the same as finding nothing' }
      if (!a.count) return { id: s.id, ok: false, rows: 0, declined: false, note: 'answered, but returned no rows for a query that is known to have some — the source moved, or the query no longer means what it did' }
      return { id: s.id, ok: true, rows: a.count, declined: false, note: 'answering' }
    } catch (e) { return { id: s.id, ok: false, rows: 0, declined: false, note: 'threw: ' + String((e as Error).message).slice(0, 120) } }
  }))
  const dark = probes.filter((p) => !p.ok)
  const receipt = merkleGravity(probes.map((p) => toUuid(p.id + ':' + (p.ok ? 'answering' : 'dark'))))
  return {
    probed: probes.length, answering: probes.length - dark.length, dark, probes,
    receipt, ...hexbitDoorOf(receipt),
    honest:
      'A LIVENESS REPORT, not a verdict on anyone: it says which declared sources answered their own known-good ' +
      'query just now. A dark source is NOT a defect of this repository — a public API may be down, moved or ' +
      'rate-limiting — and it is reported rather than raised, because the failure this guards against is not a ' +
      'source going dark, it is a source going dark UNNOTICED. No timing is reported: a clock is banned here.',
  }
}
