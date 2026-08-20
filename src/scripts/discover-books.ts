#!/usr/bin/env node
// @non-harmonic: queries the Gutendex catalogue over the network — a NAMED boundary, like books.ts and await-live.ts.
//
// discover-books — THE CORPUS IS COMPUTED FROM SUBJECTS, NOT TYPED AS IDs.
//
// mine-books.ts carried a hand-written CORPUS: a literal list of Gutenberg ids with a note beside each. Every one
// had to be found by hand and pasted in, which is the manual step that always loses — a typed list can only ever
// lag the catalogue, it cannot notice a better edition, and nobody can tell WHY an id is in it once the note rots.
//
// So the declaration moves up one level. What is declared here is the SUBJECT — what the ledger wants to be able to
// reason about — and the ids are resolved from it. `auditing` is a standing interest; id 40781 is merely what the
// catalogue currently answers with. Re-run it and the corpus re-derives; the reason each book is present is the
// subject that found it, which cannot go stale the way a pasted note does.
//
// WHY SUBJECTS AND NOT ONE BIG SEARCH. Each subject is a separate query whose results are attributed to it, so the
// corpus records provenance per book: this text is here because the ledger asked about cross-examination. That is
// the same discipline the theorems use — a claim carries the source that settles it, not a vague gesture at one.
//
// The catalogue is queried; the BOOKS are fetched and decoded by mine-books.ts, which reads what this writes.
//
//   node dist/scripts/discover-books.js [--write] [--subject "<one subject>"]
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

/** What the ledger wants to reason about. Grouped, because a domain is a standing interest and not a single query.
 *  Adding a line here adds books; there are no ids to find by hand. */
export const SUBJECTS: { domain: string; queries: readonly string[] }[] = [
  { domain: 'investigation', queries: ['forensic', 'criminal investigation', 'detective methods', 'medical jurisprudence'] },
  { domain: 'advocacy', queries: ['cross-examination', 'evidence law', 'trial practice', 'rhetoric argument'] },
  { domain: 'deception', queries: ['pathology of lying', 'swindling', 'fraud', 'forensic psychiatry'] },
  { domain: 'method', queries: ['scientific method', 'novum organum', 'logic', 'induction reasoning'] },
  { domain: 'measurement', queries: ['experimental research', 'metrology', 'weights and measures'] },
  { domain: 'engines', queries: ['gas engine', 'oil engine', 'steam engine', 'producer gas'] },
  { domain: 'navigation', queries: ['yacht sailing', 'navigation', 'seamanship'] },
]

export interface Found { id: number; title: string; author: string; domain: string; query: string; downloads: number; library?: string; ref?: string }

// SIX LIBRARIES, NOT ONE. This resolved Gutenberg ids only, which scoped the corpus to public-domain text that is
// overwhelmingly pre-1929 and English. That library answered the sailing question and the engine question, and it
// structurally CANNOT answer any modern one — every `secondary` and `unread` entry in lean/research-ledger.json is
// a paper Gutenberg could never hold. A corpus built around the one collection that cannot reach the open questions
// is a corpus aimed away from them.
//
// Each of these exposes a search over a collection, so the discovery shape is the same and only the response
// differs. The library is recorded per finding, because WHERE a claim came from is half of what makes it checkable.
export interface Library { name: string; search: (q: string, take: number) => Promise<Found[]> }

const UA = { 'user-agent': 'uuidna-research/0.2.7 (https://uuidna.com)', accept: 'application/json' }
const get = async (url: string): Promise<unknown> => {
  const r = await fetch(url, { headers: UA })
  if (!r.ok) throw new Error(`${new URL(url).host} answered ${r.status}`)
  return r.json()
}
const mk = (title: string, author: string, ref: string, library: string, i: number): Found =>
  ({ id: i, title: (title ?? '').replace(/\s+/g, ' ').trim().slice(0, 120), author, domain: '', query: '', downloads: 0, library, ref })

/** Crossref — DOI metadata for essentially every modern paper. Answers what Gutenberg cannot. */
export const crossref: Library = { name: 'crossref', search: async (q, take) => {
  const b = await get(`https://api.crossref.org/works?rows=${take}&query=${encodeURIComponent(q)}`) as { message?: { items?: { title?: string[]; author?: { family?: string }[]; DOI?: string }[] } }
  return (b.message?.items ?? []).map((it, i) => mk(it.title?.[0] ?? '', it.author?.[0]?.family ?? '', it.DOI ?? '', 'crossref', i))
} }

/** Europe PMC — OPEN-ACCESS full text. The wastewater and fuel-cell literature lives here, not behind a publisher. */
export const europepmc: Library = { name: 'europepmc', search: async (q, take) => {
  const b = await get(`https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=${take}&query=${encodeURIComponent(q)}`) as { resultList?: { result?: { title?: string; authorString?: string; doi?: string; id?: string }[] } }
  return (b.resultList?.result ?? []).map((it, i) => mk(it.title ?? '', (it.authorString ?? '').split(',')[0], it.doi ?? it.id ?? '', 'europepmc', i))
} }

/** Internet Archive — scanned technical reports, which is the class that 403s at its publisher. */
export const archive: Library = { name: 'archive', search: async (q, take) => {
  const b = await get(`https://archive.org/advancedsearch.php?output=json&rows=${take}&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=creator&q=${encodeURIComponent(q)}`) as { response?: { docs?: { identifier?: string; title?: string; creator?: string }[] } }
  return (b.response?.docs ?? []).map((it, i) => mk(String(it.title ?? ''), String(it.creator ?? ''), it.identifier ?? '', 'archive', i))
} }

/** Wikisource — public-domain and CC BY-SA text that INVITES machines, in any language. */
export const wikisource = (lang = 'en'): Library => ({ name: `wikisource:${lang}`, search: async (q, take) => {
  const b = await get(`https://${lang}.wikisource.org/w/api.php?action=query&list=search&format=json&formatversion=2&srnamespace=0&srlimit=${take}&srsearch=${encodeURIComponent(q)}`) as { query?: { search?: { title?: string; pageid?: number }[] } }
  return (b.query?.search ?? []).map((it, i) => mk(it.title ?? '', '', String(it.pageid ?? ''), `wikisource:${lang}`, i))
} })

/** Gutenberg, behind the same interface as the rest — it is one library among several, not the default. */
export const gutenberg: Library = { name: 'gutenberg', search: async (q, take) => {
  const b = await get('https://gutendex.com/books?search=' + encodeURIComponent(q)) as { results?: { id: number; title: string; authors: { name: string }[]; download_count?: number }[] }
  return (b.results ?? []).slice(0, take).map((it, i) => ({ ...mk(it.title, it.authors?.[0]?.name ?? '', String(it.id), 'gutenberg', i), downloads: it.download_count ?? 0 }))
} }

export const LIBRARIES: readonly Library[] = [gutenberg, crossref, europepmc, archive, wikisource('en'), wikisource('bg')]

/** ONE SEARCH OVER EVERY COLLECTION.
 *
 *  Six libraries behind one interface is still six calls at the call site, and a caller that must know which
 *  library holds an answer is a caller that will ask the wrong one — which is exactly how the corpus ended up
 *  aimed at the single collection that could not reach any open question. This fans out across all of them and
 *  returns one list.
 *
 *  A library that FAILS is reported, never silently dropped. Today a single unfollowed 301 was read as a total
 *  network outage and repeated as fact; a fan-out that hides which leg failed makes that error routine. Results
 *  carry their library, so a finding always knows where it came from. */
export async function searchAll(query: string, take = 4, libs: readonly Library[] = LIBRARIES):
  Promise<{ found: Found[]; failed: { library: string; why: string }[] }> {
  const settled = await Promise.all(libs.map(async (L) => {
    try { return { library: L.name, hits: (await L.search(query, take)).map((f) => ({ ...f, query })) } }
    catch (e) { return { library: L.name, hits: [] as Found[], why: (e as Error).message } }
  }))
  const seen = new Set<string>()
  const found: Found[] = []
  for (const r of settled) for (const h of r.hits) {
    const k = `${h.library}:${h.ref}`
    if (!seen.has(k)) { seen.add(k); found.push(h) }
  }
  return { found, failed: settled.filter((r) => r.why).map((r) => ({ library: r.library, why: r.why! })) }
}

/** one catalogue query, attributed to the subject that asked it. */
export async function search(domain: string, query: string, take: number): Promise<Found[]> {
  const res = await fetch('https://gutendex.com/books?search=' + encodeURIComponent(query), {
    headers: { accept: 'application/json' },
  })
  if (!res.ok) return []
  const body = (await res.json()) as { results?: { id: number; title: string; authors: { name: string }[]; download_count?: number }[] }
  return (body.results ?? []).slice(0, take).map((b) => ({
    id: b.id,
    title: (b.title ?? '').replace(/\s+/g, ' ').trim(),
    author: b.authors?.[0]?.name ?? '',
    domain,
    query,
    downloads: b.download_count ?? 0,
  }))
}

/** Resolve every declared subject into books, keeping the FIRST attribution for a book found by two queries — the
 *  corpus records why a text is present, and a book cannot be present for two contradictory reasons. */
export async function discover(
  subjects: readonly { domain: string; queries: readonly string[] }[],
  take: number,
  run: (d: string, q: string, n: number) => Promise<Found[]> = search,
): Promise<Found[]> {
  const byId = new Map<number, Found>()
  for (const s of subjects) {
    for (const q of s.queries) {
      for (const f of await run(s.domain, q, take)) if (!byId.has(f.id)) byId.set(f.id, f)
    }
  }
  return [...byId.values()].sort((a, b) => (a.domain === b.domain ? b.downloads - a.downloads : a.domain < b.domain ? -1 : 1))
}

if (process.argv[1] && /discover-books\.(js|ts)$/.test(process.argv[1])) {
  const one = process.argv.includes('--subject') ? process.argv[process.argv.indexOf('--subject') + 1] : null
  const subjects = one ? SUBJECTS.filter((s) => s.domain === one) : SUBJECTS
  if (!subjects.length) {
    console.error(`discover-books — no such subject '${one}'. Declared: ${SUBJECTS.map((s) => s.domain).join(', ')}`)
    process.exit(1)
  }

  const found = await discover(subjects, 4)
  let domain = ''
  for (const f of found) {
    if (f.domain !== domain) { domain = f.domain; console.log(`\n${domain}`) }
    console.log(`  ${String(f.id).padEnd(7)} ${f.title.slice(0, 58).padEnd(58)} ${f.author.slice(0, 24).padEnd(24)} ← ${f.query}`)
  }
  console.log(`\n${found.length} book(s) across ${subjects.length} subject(s), resolved from the catalogue — no id typed by hand.`)

  if (process.argv.includes('--write')) {
    const out = join(ROOT, 'lean', 'book-corpus.json')
    writeFileSync(out, JSON.stringify({
      why: 'The reading corpus, RESOLVED from the subjects declared in src/scripts/discover-books.ts rather than typed as ids. Each entry records the subject and query that found it, so the reason a text is present cannot go stale. Regenerate with: node dist/scripts/discover-books.js --write',
      subjects: subjects.map((s) => s.domain),
      count: found.length,
      books: found,
    }, null, 2) + '\n')
    console.log(`wrote lean/book-corpus.json — ${found.length} books`)
  }
}
