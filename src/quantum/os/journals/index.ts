// @non-harmonic: uuidnaOS journals port — eleven scholarly doors, each answering on its own uptime.
// journals — EVERY KEYLESS SCHOLARLY DOOR THIS TREE CAN ASK, AND WHAT EACH ONE ACTUALLY COVERS.
//
// THE TWO LEVELS, KEPT APART. "Journal API" means two different things and conflating them is the whole trap.
// A JOURNAL-level door answers WHICH JOURNALS EXIST — DOAJ's index, Crossref's /journals, OpenAlex's /sources —
// so a query returns titles, ISSNs and publishers. An ARTICLE-level door answers WHAT WAS PUBLISHED — Europe PMC,
// PubMed, DBLP, INSPIRE-HEP, HAL, PLOS, DataCite — so a query returns papers. A census that mixed them would
// report "3000 journals" when it had counted articles, so every door declares its level and the sweep reports the
// two separately.
//
// SUBJECT SCOPE IS THE PUBLISHER'S OWN CLAIM, NOT OURS. Each door carries the scope its operator publishes:
// 'all' for the indexes that take every subject, a named field for the specialists. That is DATA — DOAJ says it
// indexes all subjects, PubMed says biomedicine — and it is what journalCoverage() computes breadth from. What is
// EDITORIAL, and marked so, is the depth map: which of this tree's own skills a specialist door is the right one
// to ask. Nobody at DBLP said it covers `hexbit`; that judgement is ours, and it is labelled rather than folded
// into the breadth claim.
//
// KEYLESS AND POLITE. Every door here answered without a key, in under a second on measurement, except bioRxiv's
// detail lookup. Crossref and OpenAlex are asked with a mailto as their own documentation requests. Doors that
// need a key (NASA ADS, CORE) and doors whose payload this port declines to guess at (OpenAIRE) are DECLARED
// absent with the reason, so the census scores 11 wired + 4 named = 15 doors known, all accounted for.
import { handleOf } from '../../../handle.js'
import { toUuid } from '../../../address.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { theorems } from '../../../theorems/index.js'
import { fetchData } from '../fetch/index.js'

/** the polite contact Crossref and OpenAlex ask callers to send — the same one the research sweep already sends */
export const JOURNALS_MAILTO = 'ceccec@psg.bg'

export type JournalLevel = 'journal' | 'article' | 'lookup'

export interface JournalDoor {
  id: string
  host: string
  base: string
  level: JournalLevel
  /** the operator's OWN published scope: 'all' subjects, or the fields it names */
  subjects: 'all' | readonly string[]
  access: 'keyless' | 'mailto-polite'
  honest: string
}

export interface JournalRow {
  door: string
  id: string
  title: string
  url: string
  /** the journal or venue the row belongs to — empty when the door IS the journal level */
  venue: string
  /** the row's registered DOI, EMPTY when it carries none. A journal-level row has no DOI because a journal is
   *  not a publication; an article-level door that mints no DOI leaves it empty rather than deriving a fake one. */
  doi: string
  address: string
}

export interface JournalReading {
  door: string
  level: JournalLevel
  url: string
  /** what the door says MATCHES, which is larger than the page it returned */
  total: number
  rows: JournalRow[]
  declined: boolean
  note: string
}

export interface JournalSweep {
  definition: 'uuidnaOS·journals·sweep'
  query: string
  asked: number
  answering: number
  declined: string[]
  journalLevel: JournalReading[]
  articleLevel: JournalReading[]
  rows: number
  /** the fan-out's arithmetic: every door was asked at once, so the wait is ONE deadline, not `asked` of them */
  concurrency: { doorsAskedAtOnce: number; deadlinesSerial: number; deadlinesConcurrent: 1; magnitude: number }
  receipt: string
  handle: string
  hexbits: number[]
  doorUrl: string
  honest: string
}

/** Doors that exist and stay unwired, each with the reason and what to use instead — 4 declared, so the count of
 *  scholarly doors this tree knows about is 11 wired plus 4 named, and every one of the 15 is accounted for. */
export const JOURNAL_DOORS_ABSENT: readonly { id: string; why: string }[] = [
  { id: 'api.adsabs.harvard.edu', why: 'NASA ADS is the right door for astrophysics literature and requires a bearer token — keyed, so outside this keyless port' },
  { id: 'api.core.ac.uk', why: 'CORE aggregates open-access full text and requires a registered API key' },
  { id: 'api.openaire.eu', why: 'OpenAIRE answers keyless, but every field arrives wrapped under $ and @ keys whose shape this port would have to guess at — unwired deliberately, not unreachable' },
  { id: 'scholar.google.com', why: 'no public API, and its terms forbid automated access — refused rather than scraped' },
]

export const JOURNAL_DOORS: readonly JournalDoor[] = [
  { id: 'doaj', host: 'doaj.org', base: 'https://doaj.org/api/v2/search/journals', level: 'journal', subjects: 'all', access: 'keyless',
    honest: 'The Directory of Open Access Journals — the journal-level index of peer-reviewed open access across every subject, each entry carrying its own LCC subject terms.' },
  { id: 'crossref-journals', host: 'api.crossref.org', base: 'https://api.crossref.org/journals', level: 'journal', subjects: 'all', access: 'mailto-polite',
    honest: 'Crossref at the JOURNAL level: titles, ISSNs and publishers for anything with a registered DOI prefix. The article half of this API is already in the research sweep.' },
  { id: 'openalex-sources', host: 'api.openalex.org', base: 'https://api.openalex.org/sources', level: 'journal', subjects: 'all', access: 'mailto-polite',
    honest: 'OpenAlex /sources — journals, conference series and repositories as first-class records with ISSN-L. The works half is already in the research sweep.' },
  { id: 'datacite', host: 'api.datacite.org', base: 'https://api.datacite.org/dois', level: 'article', subjects: 'all', access: 'keyless',
    honest: 'DataCite DOIs — datasets, software and preprints across every subject. A DOI is provenance; nothing here is peer review.' },
  { id: 'hal', host: 'api.archives-ouvertes.fr', base: 'https://api.archives-ouvertes.fr/search/', level: 'article', subjects: 'all', access: 'keyless',
    honest: 'HAL, the French national open archive — every discipline including the humanities most science indexes omit.' },
  { id: 'europepmc', host: 'www.ebi.ac.uk', base: 'https://www.ebi.ac.uk/europepmc/webservices/rest/search', level: 'article',
    subjects: ['life sciences', 'biomedicine'], access: 'keyless',
    honest: 'Europe PMC — life-science literature including preprints, with full-text links where the licence allows.' },
  { id: 'pubmed', host: 'eutils.ncbi.nlm.nih.gov', base: 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi', level: 'article',
    subjects: ['biomedicine'], access: 'keyless',
    honest: 'NCBI E-utilities against PubMed. esearch returns PMIDs and a total — identifiers, deliberately, so a citation pins the record rather than a summary of it.' },
  { id: 'dblp', host: 'dblp.org', base: 'https://dblp.org/search/publ/api', level: 'article', subjects: ['computer science'], access: 'keyless',
    honest: 'DBLP — computer-science bibliography with venues, the door for anything about codes, systems or cryptography.' },
  { id: 'inspirehep', host: 'inspirehep.net', base: 'https://inspirehep.net/api/literature', level: 'article',
    subjects: ['high-energy physics', 'astrophysics', 'gravitation'], access: 'keyless',
    honest: 'INSPIRE-HEP — the high-energy physics literature database, and the door that reaches theory papers arXiv alone does not index by subject.' },
  { id: 'plos', host: 'api.plos.org', base: 'https://api.plos.org/search', level: 'article', subjects: ['science', 'medicine'], access: 'keyless',
    honest: 'PLOS Solr search — every PLOS article, fully open access, with abstracts served directly.' },
  { id: 'biorxiv', host: 'api.biorxiv.org', base: 'https://api.biorxiv.org/details/biorxiv', level: 'lookup',
    subjects: ['life sciences'], access: 'keyless',
    honest: 'bioRxiv detail LOOKUP by DOI — a resolver, not a search door: it answers about a preprint you already name.' },
]

// THE EDITORIAL HALF, LABELLED. A specialist door's subject scope is its operator's claim; which of THIS tree's
// skills it is the right door for is a judgement made here. It is kept in one table, marked editorial, and never
// mixed into the breadth computation — breadth rests only on the doors that declare 'all'.
const DEPTH: readonly { door: string; skills: readonly string[] }[] = [
  { door: 'inspirehep', skills: ['quantum', 'relativity', 'electromagnetism', 'spectrum', 'spectrum-hex', 'optics', 'astronomy', 'orbits', 'ephemeris', 'universe', 'singularity', 'phase', 'wave', 'waves', 'thermodynamics', 'propulsion', 'tesla'] },
  { door: 'dblp', skills: ['software', 'os', 'codes', 'hexbit', 'hamming', 'cipher', 'crypt-salt', 'security', 'exploits', 'identifiers', 'boolean', 'byte', 'matching', 'optimisation', 'sequence', 'strings', 'compare', 'sanitize', 'memory', 'models', 'reasoning', 'grid'] },
  { door: 'europepmc', skills: ['neuro', 'psychology', 'molecular', 'chemistry', 'acoustics', 'diving', 'martial-arts'] },
  { door: 'pubmed', skills: ['neuro', 'psychology', 'molecular', 'chemistry'] },
  { door: 'biorxiv', skills: ['neuro', 'molecular'] },
  { door: 'plos', skills: ['neuro', 'molecular', 'chemistry', 'psychology'] },
]

type Extract = (data: unknown, limit: number) => { total: number; rows: Omit<JournalRow, 'door' | 'address'>[] }

const str = (v: unknown): string => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : '')
const at = (o: unknown, k: string): unknown => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined)
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : [])
const num = (v: unknown): number => (typeof v === 'number' ? v : typeof v === 'string' && /^\d+$/.test(v) ? Number(v) : 0)

/** Per-door URL and reader. Every reader is TOTAL over a malformed payload: a shape it does not recognise yields
 *  zero rows and a zero total, which the sweep reports as EMPTY: the reader is total, so its output for any input
 *  is a row count between 0 and the limit. */
const DOORS: Record<string, { url: (q: string, limit: number) => string; read: Extract }> = {
  doaj: {
    url: (q, n) => `https://doaj.org/api/v2/search/journals/${encodeURIComponent(q)}?pageSize=${n}`,
    read: (d, n) => ({
      total: num(at(d, 'total')),
      rows: arr(at(d, 'results')).slice(0, n).map((r) => {
        const bib = at(r, 'bibjson')
        return { id: str(at(r, 'id')), title: str(at(bib, 'title')), url: `https://doaj.org/toc/${str(at(r, 'id'))}`,
                 venue: arr(at(bib, 'subject')).map((s) => str(at(s, 'term'))).filter(Boolean).slice(0, 2).join('; '),
                 doi: '' }
      }),
    }),
  },
  'crossref-journals': {
    url: (q, n) => `https://api.crossref.org/journals?rows=${n}&mailto=${JOURNALS_MAILTO}&query=${encodeURIComponent(q)}`,
    read: (d, n) => {
      const m = at(d, 'message')
      return {
        total: num(at(m, 'total-results')),
        rows: arr(at(m, 'items')).slice(0, n).map((r) => {
          const issn = arr(at(r, 'ISSN')).map(str).filter(Boolean)
          return { id: issn[0] ?? str(at(r, 'title')), title: str(at(r, 'title')),
                   url: issn[0] ? `https://portal.issn.org/resource/ISSN/${issn[0]}` : '',
                   venue: str(at(r, 'publisher')), doi: '' }
        }),
      }
    },
  },
  'openalex-sources': {
    url: (q, n) => `https://api.openalex.org/sources?per-page=${n}&mailto=${JOURNALS_MAILTO}&search=${encodeURIComponent(q)}`,
    read: (d, n) => ({
      total: num(at(at(d, 'meta'), 'count')),
      rows: arr(at(d, 'results')).slice(0, n).map((r) => ({
        id: str(at(r, 'id')).replace(/^.*\//, ''), title: str(at(r, 'display_name')),
        url: str(at(r, 'id')), venue: [str(at(r, 'type')), str(at(r, 'issn_l'))].filter(Boolean).join(' '),
        doi: '',
      })),
    }),
  },
  datacite: {
    url: (q, n) => `https://api.datacite.org/dois?page%5Bsize%5D=${n}&query=${encodeURIComponent(q)}`,
    read: (d, n) => ({
      total: num(at(at(d, 'meta'), 'total')),
      rows: arr(at(d, 'data')).slice(0, n).map((r) => {
        const a = at(r, 'attributes')
        return { id: str(at(r, 'id')), title: str(at(arr(at(a, 'titles'))[0], 'title')),
                 url: `https://doi.org/${str(at(r, 'id'))}`, venue: str(at(a, 'publisher')),
                 doi: str(at(r, 'id')) }   // a DataCite row IS a DOI
      }),
    }),
  },
  hal: {
    url: (q, n) => `https://api.archives-ouvertes.fr/search/?rows=${n}&wt=json&fl=docid,label_s,uri_s,journalTitle_s,doiId_s&q=${encodeURIComponent(q)}`,
    read: (d, n) => {
      const r = at(d, 'response')
      return {
        total: num(at(r, 'numFound')),
        rows: arr(at(r, 'docs')).slice(0, n).map((x) => ({
          id: str(at(x, 'docid')), title: str(at(x, 'label_s')).slice(0, 240),
          url: str(at(x, 'uri_s')), venue: str(at(x, 'journalTitle_s')), doi: str(at(x, 'doiId_s')),
        })),
      }
    },
  },
  europepmc: {
    url: (q, n) => `https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=${n}&query=${encodeURIComponent(q)}`,
    read: (d, n) => ({
      total: num(at(d, 'hitCount')),
      rows: arr(at(at(d, 'resultList'), 'result')).slice(0, n).map((r) => ({
        id: str(at(r, 'id')), title: str(at(r, 'title')),
        url: str(at(r, 'doi')) ? `https://doi.org/${str(at(r, 'doi'))}` : `https://europepmc.org/article/MED/${str(at(r, 'id'))}`,
        venue: str(at(r, 'journalTitle')), doi: str(at(r, 'doi')),
      })),
    }),
  },
  pubmed: {
    url: (q, n) => `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=${n}&term=${encodeURIComponent(q)}`,
    read: (d, n) => {
      const e = at(d, 'esearchresult')
      return {
        total: num(at(e, 'count')),
        // esearch answers with IDENTIFIERS and a count, by design: the title needs a second call (esummary), and
        // an identifier is the citable thing. A PMID with no title is honest; a guessed title would not be.
        rows: arr(at(e, 'idlist')).slice(0, n).map((id) => ({
          // esearch returns no DOI; the PMID is the identifier, and a DOI is not derivable from it
          id: str(id), title: `PMID ${str(id)}`, url: `https://pubmed.ncbi.nlm.nih.gov/${str(id)}/`, venue: 'PubMed', doi: '',
        })),
      }
    },
  },
  dblp: {
    url: (q, n) => `https://dblp.org/search/publ/api?format=json&h=${n}&q=${encodeURIComponent(q)}`,
    read: (d, n) => {
      const hits = at(at(at(d, 'result'), 'hits'), 'hit')
      return {
        total: num(at(at(at(d, 'result'), 'hits'), '@total')),
        rows: arr(hits).slice(0, n).map((h) => {
          const info = at(h, 'info')
          const venue = at(info, 'venue')
          return { id: str(at(h, '@id')), title: str(at(info, 'title')), url: str(at(info, 'url')),
                   venue: Array.isArray(venue) ? venue.map(str).filter(Boolean)[0] ?? '' : str(venue),
                   doi: str(at(info, 'doi')) }
        }),
      }
    },
  },
  inspirehep: {
    url: (q, n) => `https://inspirehep.net/api/literature?size=${n}&fields=titles,dois,publication_info&q=${encodeURIComponent(q)}`,
    read: (d, n) => {
      const hits = at(d, 'hits')
      return {
        total: num(at(hits, 'total')),
        rows: arr(at(hits, 'hits')).slice(0, n).map((h) => {
          const meta = at(h, 'metadata')
          return { id: str(at(h, 'id')), title: str(at(arr(at(meta, 'titles'))[0], 'title')),
                   url: `https://inspirehep.net/literature/${str(at(h, 'id'))}`,
                   venue: str(at(arr(at(meta, 'publication_info'))[0], 'journal_title')),
                   doi: str(at(arr(at(meta, 'dois'))[0], 'value')) }
        }),
      }
    },
  },
  plos: {
    url: (q, n) => `https://api.plos.org/search?wt=json&rows=${n}&fl=id,title_display,journal&q=${encodeURIComponent(q)}`,
    read: (d, n) => {
      const r = at(d, 'response')
      return {
        total: num(at(r, 'numFound')),
        rows: arr(at(r, 'docs')).slice(0, n).map((x) => ({
          id: str(at(x, 'id')), title: str(at(x, 'title_display')),
          url: `https://doi.org/${str(at(x, 'id'))}`, venue: str(at(x, 'journal')),
          doi: str(at(x, 'id')),   // a PLOS article id IS its DOI
        })),
      }
    },
  },
  biorxiv: {
    // a RESOLVER: the query is a DOI, not a phrase. Asked with anything else it answers "no posts found", which
    // this reader reports as an empty page rather than dressing up as a search miss.
    url: (q) => `https://api.biorxiv.org/details/biorxiv/${q.replace(/^https?:\/\/doi\.org\//, '')}`,
    read: (d, n) => ({
      total: arr(at(d, 'collection')).length,
      rows: arr(at(d, 'collection')).slice(0, n).map((r) => ({
        id: str(at(r, 'doi')), title: str(at(r, 'title')), url: `https://doi.org/${str(at(r, 'doi'))}`,
        venue: str(at(r, 'server')) || 'bioRxiv', doi: str(at(r, 'doi')),
      })),
    }),
  },
}

/** doorById(id) → the declared door, or null. Pure. */
export const doorById = (id: string): JournalDoor | null => JOURNAL_DOORS.find((d) => d.id === id) ?? null

/** journalSearch(id, query, limit) → one door's reading, addressed. Network (OS fetch cache + one deadline). */
export async function journalSearch(id: string, query: string, limit = 5): Promise<JournalReading> {
  const door = doorById(id)
  const impl = DOORS[id]
  if (!door || !impl)
    return { door: id, level: 'article', url: '', total: 0, rows: [], declined: true, note: `no declared door "${id}"` }
  const url = impl.url(query, limit)
  const empty = (note: string): JournalReading => ({ door: id, level: door.level, url, total: 0, rows: [], declined: true, note })
  try {
    const got = await fetchData<unknown>(url, 'json')
    if (got.data === null) return empty(got.note)
    const read = impl.read(got.data, limit)
    return {
      door: id,
      level: door.level,
      url,
      total: read.total,
      rows: read.rows
        .filter((r) => r.id.length > 0)
        .map((r) => ({ door: id, ...r, address: toUuid(`journal:${id}:${r.id}`) })),
      declined: false,
      note: 'ok',
    }
  } catch (e) { return empty(String((e as Error).message).slice(0, 120)) }
}

/** journalSweep(query, opts) → every search-level door asked AT ONCE, split by level, receipt-closed.
 *  The fan-out is the speed claim and it is arithmetic, not a stopwatch: n doors asked concurrently wait ONE
 *  deadline where n sequential asks would wait n of them, so the worst case improves by the fan-out width. */
export async function journalSweep(
  query: string,
  opts: { limit?: number; ids?: readonly string[]; includeLookup?: boolean } = {},
): Promise<JournalSweep> {
  const limit = opts.limit ?? 5
  const asked = JOURNAL_DOORS
    .filter((d) => (opts.ids ? opts.ids.includes(d.id) : opts.includeLookup === true || d.level !== 'lookup'))
    .map((d) => d.id)
  const readings = await Promise.all(asked.map((id) => journalSearch(id, query, limit)))
  const rows = readings.flatMap((r) => r.rows)
  const receipt = merkleGravity([toUuid('journal-sweep|' + query), ...rows.map((r) => r.address)])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·journals·sweep',
    query,
    asked: asked.length,
    answering: readings.filter((r) => !r.declined).length,
    declined: readings.filter((r) => r.declined).map((r) => `${r.door}: ${r.note}`),
    journalLevel: readings.filter((r) => r.level === 'journal'),
    articleLevel: readings.filter((r) => r.level !== 'journal'),
    rows: rows.length,
    concurrency: {
      doorsAskedAtOnce: asked.length,
      deadlinesSerial: asked.length,
      deadlinesConcurrent: 1,
      magnitude: asked.length,
    },
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    doorUrl: door.door,
    honest: 'Journal-level rows are JOURNALS; article-level rows are PAPERS, and the two are asked with different '
      + 'kinds of query: a journal-level door given an article phrase ("quantum entanglement") correctly answers '
      + 'nothing, because no journal is TITLED that — an empty journal-level page beside a full article-level one '
      + 'is the levels working, not a door failing. Both are provenance: a hit is evidence that someone published, '
      + 'never that the claim inside it is true, and only a by-decide theorem seals.',
  }
}

export interface JournalCoverage {
  definition: 'uuidnaOS·journals·coverage'
  doors: number
  journalLevelDoors: string[]
  articleLevelDoors: string[]
  lookupDoors: string[]
  /** doors whose OPERATOR declares every subject — breadth rests on these alone */
  allSubjectDoors: string[]
  skills: number
  /** skills an editorially-mapped specialist door reaches, beside the all-subject breadth */
  withSpecialistDoor: { skill: string; doors: string[] }[]
  /** skills reached by the all-subject doors alone: breadth 5/5 doors, depth 0 specialist doors named yet */
  breadthOnly: string[]
  absent: readonly { id: string; why: string }[]
  receipt: string
  handle: string
  hexbits: number[]
  doorUrl: string
  honest: string
}

/** journalCoverage() → which doors cover what, over this tree's OWN skills. PURE: no network, no opinion about
 *  breadth (that is each operator's published scope), and the depth map is labelled editorial where it is used. */
export function journalCoverage(): JournalCoverage {
  const skills = [...new Set(theorems().map((t) => t.skill))].sort()
  const byDoor = new Map<string, string[]>()
  for (const d of DEPTH) for (const s of d.skills) byDoor.set(s, [...(byDoor.get(s) ?? []), d.door].sort())
  const withSpecialistDoor = skills
    .filter((s) => byDoor.has(s))
    .map((skill) => ({ skill, doors: byDoor.get(skill)! }))
  const allSubjectDoors = JOURNAL_DOORS.filter((d) => d.subjects === 'all').map((d) => d.id)
  const receipt = merkleGravity([
    toUuid('journal-coverage'),
    ...JOURNAL_DOORS.map((d) => toUuid(`journal-door:${d.id}|${d.base}|${d.level}`)),
  ])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·journals·coverage',
    doors: JOURNAL_DOORS.length,
    journalLevelDoors: JOURNAL_DOORS.filter((d) => d.level === 'journal').map((d) => d.id),
    articleLevelDoors: JOURNAL_DOORS.filter((d) => d.level === 'article').map((d) => d.id),
    lookupDoors: JOURNAL_DOORS.filter((d) => d.level === 'lookup').map((d) => d.id),
    allSubjectDoors,
    skills: skills.length,
    withSpecialistDoor,
    breadthOnly: skills.filter((s) => !byDoor.has(s)),
    absent: JOURNAL_DOORS_ABSENT,
    receipt,
    handle: door.handle,
    hexbits: door.hexbits,
    doorUrl: door.door,
    honest: `Breadth is the operators' own published scope: ${allSubjectDoors.length} of ${JOURNAL_DOORS.length} `
      + 'doors declare every subject, so every skill has a door to ask. DEPTH — which specialist door is the right '
      + 'one for a given skill — is EDITORIAL, decided here and labelled, never folded into the breadth claim. '
      + 'A skill listed as breadth-only is not uncovered; it has no specialist door named for it yet.',
  }
}

/** renderJournalSweep(s) → CLI / exec / MCP summary lines. Pure. */
export function renderJournalSweep(s: JournalSweep): string {
  const line = (r: JournalReading): string[] => [
    `  ${r.declined ? '·' : '✓'} ${r.door.padEnd(18)} ${String(r.rows.length).padStart(2)} of ${r.total} ${r.declined ? `— ${r.note}` : ''}`,
    ...r.rows.slice(0, 3).map((x) => `      ${x.title.slice(0, 84)}${x.venue ? ` [${x.venue.slice(0, 40)}]` : ''}`),
  ]
  return [
    `JOURNALS ${s.answering}/${s.asked} answering · ${s.rows} rows · query "${s.query}"`,
    `  fan-out ${s.concurrency.doorsAskedAtOnce} doors at once — one deadline, not ${s.concurrency.deadlinesSerial} (×${s.concurrency.magnitude})`,
    '  — journal level (which journals exist) —',
    ...s.journalLevel.flatMap(line),
    '  — article level (what was published) —',
    ...s.articleLevel.flatMap(line),
    `  receipt ${handleOf(s.receipt)}… · door ${s.doorUrl}`,
  ].join('\n')
}

/** renderJournalCoverage(c) → CLI / exec / MCP summary lines. Pure. */
export function renderJournalCoverage(c: JournalCoverage): string {
  return [
    `JOURNAL DOORS ${c.doors} · journal-level ${c.journalLevelDoors.length} · article-level ${c.articleLevelDoors.length} · lookup ${c.lookupDoors.length}`,
    `  all-subject (breadth): ${c.allSubjectDoors.join(', ')}`,
    `  skills ${c.skills} · with a specialist door ${c.withSpecialistDoor.length} · breadth only ${c.breadthOnly.length}`,
    ...c.withSpecialistDoor.slice(0, 12).map((s) => `    ${s.skill.padEnd(18)} ${s.doors.join(', ')}`),
    `  declared absent: ${c.absent.map((a) => a.id).join(', ')}`,
    `  receipt ${handleOf(c.receipt)}… · door ${c.doorUrl}`,
  ].join('\n')
}
