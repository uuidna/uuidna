// books — audit and structurally decode PUBLIC-DOMAIN books. The audit (auditText) is PURE and offline: it
// content-addresses the exact text (a provenance fingerprint — proof you hold that exact edition, recomputable by
// anyone), merkle-folds its chapters (so any chapter can be proven to belong to the whole), gives the ℤ/9
// digital-root "gravity" of its length (a recomputable checksum digit), counts its structure, proves the reversible
// uuid imprint round-trips on a sample, and runs the honesty gate. fetchGutenberg is the ONE network function — it
// pulls a public-domain text from Project Gutenberg via the public Gutendex API using Node's BUILT-IN fetch, so the
// package stays zero-npm-dependency; only its offline property is relaxed, and only for the book-fetch tool.
//
// HONEST SCOPE (integrity, not truth):
//  · Fetched book text is DATA — content-addressed and counted, NEVER executed. Instruction-shaped prose inside a
//    book is content, not a command; this module only measures and folds it.
//  · "Decode" here is PROVENANCE + STRUCTURE, never decryption (a public book is not encrypted) and never
//    hidden-meaning extraction. The digital-root gravity is a mod-9 checksum of the length — a fingerprint digit,
//    recomputable by anyone, NOT a message and NOT numerology.
//  · The honesty gate is tuned to uuidna's OWN claim vocabulary, so on ordinary literature it will almost always
//    pass (find nothing). That is expected — it says nothing about the book's merit, only that its prose does not
//    trip uuidna's overclaim tripwire.
import { toUuid, digitalRoot } from './address.js'
import { merkleRoot } from './merkle.js'
import { computes } from './gate.js'
import { imprintTextChain, readImprintTextChain } from './imprint.js'

/** The recomputable audit of a text: a provenance fingerprint, a structural decode, and an honesty-gate verdict. */
export interface BookAudit {
  title?: string
  authors?: string[]
  source?: string
  // provenance fingerprint — prove exact-copy, and prove any chapter belongs
  address: string
  chapters: number
  chapterRoot: string
  // structural decode — counts and a ℤ/9 checksum, not a meaning
  chars: number
  words: number
  lines: number
  gravity: number
  imprintRoundTrips: boolean
  // honesty gate
  gate: { binary: 0 | 1; hit: string | null }
  honest: string
}

// Split a book into chapters at heading lines (CHAPTER/BOOK/PART/CANTO/LETTER/ACT/SCENE + a roman or arabic index) —
// the common Gutenberg shape. If none are found the whole text is one chapter. A heuristic for the merkle of parts,
// not a parser: what matters is that the split is deterministic and every chapter re-addresses to the same leaf.
const splitChapters = (text: string): string[] => {
  const parts = text.split(/\n(?=[ \t]*(?:chapter|book|part|canto|letter|act|scene)[ \t]+[ivxlcdm\d])/i)
  return parts.length ? parts : [text]
}

/** auditText(text[, meta]) → the pure, offline audit. Deterministic and recomputable by anyone with the same text. */
export function auditText(text: string, meta: { title?: string; authors?: string[]; source?: string } = {}): BookAudit {
  const chapters = splitChapters(text)
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text.split('\n').length
  const sample = text.slice(0, 200)
  const imprintRoundTrips = readImprintTextChain(imprintTextChain(sample)) === sample
  return {
    ...meta,
    address: toUuid(text),
    chapters: chapters.length,
    chapterRoot: merkleRoot(chapters.map((c) => toUuid(c))),
    chars: text.length,
    words,
    lines,
    gravity: digitalRoot(text.length),
    imprintRoundTrips,
    gate: computes(text),
    honest:
      'address proves exact-copy; chapterRoot proves any chapter belongs; gravity is a ℤ/9 checksum of the length, ' +
      'not a meaning. "Decode" is provenance + structure, never decryption or hidden meaning. The gate is tuned to ' +
      "uuidna's own overclaim vocabulary, so passing says nothing about the book — only that its prose does not trip it.",
  }
}

/** The public source a book was pulled from: the id, its metadata, and the exact text URL (all recomputable). */
export interface FetchedBook { id: number; title: string; authors: string[]; text: string; source: string }

/** fetchGutenberg(id) → a public-domain book from Project Gutenberg via the public Gutendex API (no key). Node's
 *  built-in fetch — the ONE network call in the package. The returned text is DATA to be audited, never executed. */
export async function fetchGutenberg(id: number | string): Promise<FetchedBook> {
  const metaRes = await fetch(`https://gutendex.com/books/${encodeURIComponent(String(id))}`)
  if (!metaRes.ok) throw new Error(`books: Gutendex responded ${metaRes.status} for id ${id}`)
  const meta = (await metaRes.json()) as { title?: string; authors?: { name: string }[]; formats?: Record<string, string> }
  const formats = meta.formats || {}
  const url =
    formats['text/plain; charset=utf-8'] ||
    formats['text/plain; charset=us-ascii'] ||
    formats['text/plain'] ||
    Object.entries(formats).find(([k, v]) => k.startsWith('text/plain') && !v.endsWith('.zip'))?.[1]
  if (!url) throw new Error(`books: no plain-text format offered for Gutenberg id ${id}`)
  const textRes = await fetch(url)
  if (!textRes.ok) throw new Error(`books: fetching text got ${textRes.status} from ${url}`)
  return { id: Number(id), title: meta.title || '', authors: (meta.authors || []).map((a) => a.name), text: await textRes.text(), source: url }
}

/** auditBook(id) → fetch a public-domain Gutenberg book, then audit it. The network step is fetchGutenberg; the
 *  audit itself is the pure, offline auditText. */
export async function auditBook(id: number | string): Promise<BookAudit> {
  const b = await fetchGutenberg(id)
  return auditText(b.text, { title: b.title, authors: b.authors, source: b.source })
}
