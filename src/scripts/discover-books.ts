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

export interface Found { id: number; title: string; author: string; domain: string; query: string; downloads: number }

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
