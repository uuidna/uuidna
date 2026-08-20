// @non-harmonic: fetches the EU's public education APIs (network) — NAMED boundary; the harmonic core must never carry these ops.
// school-apis — THE EUROPEAN EDUCATION APIS BEHIND ONE DOOR, each one PROBED before it was wired.
//
// "EU school APIs" is not one thing, and every survey of them that reads well is wrong in the same place: it lists an
// endpoint nobody called. So each source here was fetched first and is recorded with what it ACTUALLY answered —
// ESCO's search returned 277 skills for "programming", Eurostat's dissemination API returned JSON-stat 2.0 for
// educ_uoe_enrt01, GISCO's education directory served 3843 Bulgarian schools as CSV. A source that could not be
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
import { merkleGravity } from './gravity.js'
import { skillGroups } from './theorems/index.js'

/** One wired source: what it serves, where, in what format, and the scope it may never exceed. */
export interface SchoolApi {
  id: string
  name: string
  base: string
  kind: 'taxonomy' | 'statistics' | 'geography' | 'interoperability'
  serves: string[]
  format: string
  access: string
  direction: 'fetched' | 'served'
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
  receipt: string
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
/** the GISCO education vintage this module was probed against — the directory is versioned, so the year is explicit */
export const GISCO_VINTAGE = '2020'
const DEFAULT_LIMIT = 25

/** THE ONE REGISTRY — every source is reached through this table, so adding one is a single entry, never a new door. */
export const SCHOOL_APIS: readonly SchoolApi[] = [
  { id: 'esco', name: 'ESCO — European Skills, Competences, Qualifications and Occupations', base: ESCO,
    kind: 'taxonomy', direction: 'fetched',
    serves: ['skills', 'competences', 'occupations', 'qualifications', 'multilingual labels'],
    format: 'JSON (HAL)', access: 'public, no key',
    honest: 'A CLASSIFICATION, not a school system: it says what a skill IS CALLED across the EU, never who holds it.' },
  { id: 'eurostat', name: 'Eurostat — education and training statistics', base: EUROSTAT,
    kind: 'statistics', direction: 'fetched',
    serves: ['enrolment', 'expenditure', 'participation', 'attainment', 'teaching staff', 'early leavers'],
    format: 'JSON-stat 2.0', access: 'public, no key',
    honest: 'AGGREGATES ONLY — country/level/year cells. No individual record exists in it to ask for.' },
  { id: 'gisco', name: 'Eurostat GISCO — education services (school locations)', base: GISCO,
    kind: 'geography', direction: 'fetched',
    serves: ['school name and address', 'coordinates', 'education levels', 'facility type', 'reference year'],
    format: 'CSV (also GeoJSON / GeoPackage)', access: 'public bulk download, no key',
    honest: 'A GEOGRAPHIC DISCOVERY LAYER assembled from member-state sources — coverage and fields VARY BY COUNTRY, ' +
      'and it is not a substitute for a national school register.' },
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
  honest: string
}

/** schoolApiRegistry() → the wired sources, the named absences, and one order-invariant receipt. Pure: no network. */
export function schoolApiRegistry(): SchoolApiRegistry {
  return {
    count: SCHOOL_APIS.length, sources: SCHOOL_APIS, absent: ABSENT, giscoVintage: GISCO_VINTAGE,
    receipt: merkleGravity(SCHOOL_APIS.map((s) => toUuid('school-api:' + s.id + ':' + s.base))),
    honest: HONEST,
  }
}

const answer = (source: string, query: Record<string, string>, url: string, results: SchoolApiEvidence[], truncated: boolean): SchoolApiAnswer =>
  ({ source, query, url, count: results.length, results, truncated, receipt: merkleGravity(results.map((r) => r.address)), honest: HONEST })

const limitOf = (n?: number): number => (n === undefined || n <= 0 ? DEFAULT_LIMIT : n > 200 ? 200 : n)

// ── ESCO: the taxonomy, and the one source that MAPS onto uuidna's own skills ──────────────────────────────────────

export interface EscoConcept extends SchoolApiEvidence { uri: string; title: string; conceptType: string }

/** escoSearch(text) → the EU's own skills/occupations matching a phrase, each content-addressed by its ESCO URI.
 *  One network call. `type` is the ESCO class: skill (default), occupation, or qualification. */
export async function escoSearch(text: string, type = 'skill', limit?: number): Promise<SchoolApiAnswer> {
  const n = limitOf(limit)
  const url = `${ESCO}/search?text=${encodeURIComponent(text)}&language=en&type=${encodeURIComponent(type)}&limit=${n}`
  const results: EscoConcept[] = []
  let total = 0
  try {
    const r = await fetch(url, { headers: { accept: 'application/json' } })
    if (r.ok) {
      const body = await r.json() as { total?: number; _embedded?: { results?: { uri?: string; title?: string; className?: string }[] } }
      total = Number(body.total ?? 0)
      for (const c of body._embedded?.results ?? []) {
        if (!c.uri) continue // never fabricate an identifier the source did not give
        results.push({ source: 'esco', address: toUuid(c.uri), uri: c.uri, title: String(c.title ?? ''), conceptType: String(c.className ?? type) })
      }
    }
  } catch { /* a free public API may be unreachable — best-effort, and it NEVER fabricates a row */ }
  return answer('esco', { text, type }, url, results, total > results.length)
}

export interface EscoSkillMapping { skill: string; theorems: number; fold: string; esco: EscoConcept[] }
export interface EscoMap {
  mapped: number; unmatched: string[]; mappings: EscoSkillMapping[]; receipt: string; honest: string
}

/** mapSkillsToEsco() → THE MAPPING: every uuidna skill cluster matched against the European skill taxonomy, so a
 *  sealed theorem's skill carries a European URI a curriculum can read. One network call per cluster, in parallel.
 *  HONEST: a match is a LEXICAL match ESCO returned for the cluster's name — a pointer for a human to accept or
 *  reject, NEVER a claim that uuidna's cluster and the European skill are the same thing, and never a certification. */
export async function mapSkillsToEsco(perSkill = 3): Promise<EscoMap> {
  const groups = skillGroups()
  const found = await Promise.all(groups.map((g) => escoSearch(g.skill, 'skill', perSkill)))
  const mappings: EscoSkillMapping[] = groups.map((g, i) => ({
    skill: g.skill, theorems: g.count, fold: g.fold, esco: found[i].results as EscoConcept[],
  }))
  const unmatched = mappings.filter((m) => !m.esco.length).map((m) => m.skill)
  return {
    mapped: mappings.length - unmatched.length, unmatched, mappings,
    receipt: merkleGravity(mappings.flatMap((m) => m.esco.map((e) => e.address))),
    honest: 'A LEXICAL correspondence offered for a human to accept or reject: ESCO answered these concepts for the ' +
      'cluster\'s NAME. It is a pointer between vocabularies, never a claim that the two mean the same thing, never ' +
      'an endorsement by the European Commission, and never a qualification — uuidna awards none. ' + HONEST,
  }
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
  try {
    const r = await fetch(url, { headers: { accept: 'application/json' } })
    if (r.ok) {
      const body = await r.json() as {
        id?: string[]; size?: number[]; value?: Record<string, number> | number[]
        dimension?: Record<string, { label?: string; category?: { index?: Record<string, number> | string[]; label?: Record<string, string> } }>
      }
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
  } catch { /* best-effort: an unreachable source returns nothing, and never a fabricated observation */ }
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
    const r = await fetch(url, { headers: { accept: 'text/csv' } })
    if (r.ok) {
      const text = (await r.text()).replace(/^﻿/, '')     // the file is served with a BOM
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

// ── The one door ──────────────────────────────────────────────────────────────────────────────────────────────────

export interface SchoolApiQuery { text?: string; type?: string; dataset?: string; geo?: string; time?: string; country?: string; match?: string; limit?: number; year?: string }

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
    if (!query.dataset) throw new Error('school-apis: eurostat needs {dataset} — a Eurostat code, e.g. "educ_uoe_enrt01"')
    const filters: Record<string, string> = {}
    if (query.geo) filters.geo = query.geo
    if (query.time) filters.time = query.time
    return eurostatEducation(query.dataset, filters, query.limit)
  }
  if (source === 'gisco') {
    if (!query.country) throw new Error('school-apis: gisco needs {country} — a two-letter code, e.g. "BG"')
    return giscoSchools(query.country, query.match, query.limit, query.year ?? GISCO_VINTAGE)
  }
  throw new Error('school-apis: oeapi is SERVED, not fetched — uuidna publishes it; call uuidna_oeapi instead')
}
