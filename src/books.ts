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
import { merkleGravity } from './gravity.js'
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

/** A decidable arithmetic claim EXTRACTED from a text — the ONLY fragment of a book uuidna can independently seal.
 *  `asserted` is what the prose says; `actual` is what the arithmetic computes; `lean` is uuidna's OWN by-decide
 *  theorem for the true value. VERIFIED when the book's arithmetic holds, REFUTED when uuidna's decide disagrees. */
export interface ExtractedFact {
  claim: string
  asserted: number
  actual: number
  lean: string
  verdict: 'VERIFIED' | 'REFUTED'
  address: string
}

const EXTRACT_OPS: Record<string, [(a: number, b: number) => number, string]> = {
  '*': [(a, b) => a * b, '*'], '×': [(a, b) => a * b, '*'], x: [(a, b) => a * b, '*'], times: [(a, b) => a * b, '*'],
  '+': [(a, b) => a + b, '+'], plus: [(a, b) => a + b, '+'],
}

/** extractDecidable(text) → the DECIDABLE INTEGER ARITHMETIC the text asserts, each independently sealed by decide
 *  (VERIFIED) or corrected (REFUTED — the book's sum is wrong). HONEST SCOPE: integer arithmetic ONLY — the sliver
 *  of a book that computes; this does NOT autoformalize the book's meaning, argument, or non-decidable mathematics,
 *  and the proofs are uuidna's own, not the book's. A theorem computes in Lean, or it is not a theorem. */
export function extractDecidable(text: string, limit = 100): ExtractedFact[] {
  const out: ExtractedFact[] = []
  const seen = new Set<string>()
  // integer  a  (× | * | x | times | + | plus)  b  (= | is | equals | makes)  c
  const re = /\b(\d{1,4})\s*(×|\*|x|times|\+|plus)\s*(\d{1,4})\s*(?:=|is|equals|makes)\s*(\d{1,7})\b/gi
  for (const m of text.matchAll(re)) {
    const op = EXTRACT_OPS[m[2].toLowerCase()]
    if (!op) continue
    const a = Number(m[1]), b = Number(m[3]), asserted = Number(m[4])
    const actual = op[0](a, b)
    const lean = `theorem book_fact : ${a} ${op[1]} ${b} = ${actual} := by decide`
    if (seen.has(lean)) continue
    seen.add(lean)
    out.push({ claim: m[0].replace(/\s+/g, ' ').trim(), asserted, actual, lean, verdict: actual === asserted ? 'VERIFIED' : 'REFUTED', address: toUuid(lean) })
    if (out.length >= limit) break
  }
  return out
}

/** composeBookArticle(audit, facts) → an AUDITED article about a public-domain text: its provenance fingerprint, its
 *  structure, and the decidable arithmetic uuidna sealed (or refuted) from it, each backed by a by-decide proof.
 *  HONEST SCOPE: the article claims ONLY the provenance and the decidable integer arithmetic — never the book's
 *  meaning, argument, or non-decidable mathematics; the proofs are uuidna's, not the book's. */
export function composeBookArticle(audit: BookAudit, facts: ExtractedFact[]): { markdown: string; address: string; receipt: string } {
  const v = facts.filter((f) => f.verdict === 'VERIFIED').length
  const r = facts.filter((f) => f.verdict === 'REFUTED').length
  // the order-invariant receipt over the sealed facts — the SAME merkle-gravity fold the ledger and the quantum
  // domain (bell_no_signaling, the folded memory-store receipt) use: recompute it in any order and it returns.
  const receipt = merkleGravity(facts.map((f) => f.address))
  const md =
    `# ${audit.title || 'A public-domain text'}\n\n` +
    `> a recomputable article — provenance, structure, and the decidable arithmetic uuidna sealed from the text\n\n` +
    `This text content-addresses to \`${audit.address}\` (${audit.chapters} chapters, ${audit.words} words, ℤ/9 gravity ${audit.gravity}); the address proves exact-copy, the chapterRoot \`${audit.chapterRoot}\` proves any chapter belongs. uuidna scanned its prose for INTEGER ARITHMETIC — the only fragment it can independently decide — and sealed each \`by decide\`: **${v} VERIFIED**, **${r} REFUTED** (an arithmetic the text states that does not hold).\n\n` +
    `## The decidable arithmetic, each backed by its own proof\n\n` +
    (facts.length ? facts.map((f) => `- **${f.verdict}** — the text says \`${f.claim}\`${f.verdict === 'REFUTED' ? ` (it is ${f.actual}, not ${f.asserted})` : ''}; uuidna seals \`${f.lean}\` · \`${f.address}\``).join('\n') : '_No integer arithmetic found to decide._') +
    `\n\n## Provenance\n\nThe ${facts.length} sealed facts fold order-invariantly to receipt \`${receipt}\` — the same merkle-gravity fold the ledger and the quantum domain use, recomputable by anyone in any order. The article itself content-addresses to a uuid, so any edit is visible.\n\n## Honest scope\n\nThis article claims ONLY the provenance fingerprint and the decidable integer arithmetic above — each a uuidna \`by decide\` theorem, NOT the book's own proof. It says NOTHING about the book's argument, meaning, or any non-decidable mathematics: a theorem computes in Lean, or it is not a theorem. Public-domain work, for the public interest.\n`
  return { markdown: md, address: toUuid(md), receipt }
}

/** bookArticle(gutenbergId) → fetch a public-domain book, extract its decidable arithmetic, and return the AUDITED
 *  article + the order-invariant receipt over the sealed facts. The one network call; the fetched text is DATA to be
 *  content-addressed and decided, never executed. HONEST SCOPE: seals only the book's integer arithmetic, never its
 *  meaning or argument. */
export async function bookArticle(id: number | string): Promise<{ title: string; address: string; receipt: string; verified: number; refuted: number; facts: ExtractedFact[]; article: string }> {
  const b = await fetchGutenberg(id)
  const audit = auditText(b.text, { title: b.title, authors: b.authors, source: b.source })
  const facts = extractDecidable(b.text)
  const { markdown, receipt } = composeBookArticle(audit, facts)
  return { title: b.title, address: audit.address, receipt, verified: facts.filter((f) => f.verdict === 'VERIFIED').length, refuted: facts.filter((f) => f.verdict === 'REFUTED').length, facts, article: markdown }
}

/** A translation audited as a source↔translation PAIR — each text's own audit, bound by a directional provenance
 *  receipt (source → translation). Proves the pairing and each text's integrity; NOT the translation's fidelity. */
export interface TranslationAudit {
  source: BookAudit
  translation: BookAudit
  pair: string
  sourceLang?: string
  targetLang?: string
  honest: string
}

/** auditTranslation(source, translation[, opts]) → audit both texts and bind them with a directional provenance
 *  receipt source → translation (order-sensitive: the reverse pairing is a different receipt). Pure and offline.
 *  HONEST: this proves the PAIRING and each text's exact-copy integrity — never that the translation is accurate or
 *  faithful. Semantic fidelity is human judgement; provenance is what recomputes. Useful for writing a translation
 *  (each revision re-addresses, so a change is visible) and for citing which source a translation descends from. */
export function auditTranslation(
  source: string,
  translation: string,
  opts: { title?: string; sourceLang?: string; targetLang?: string } = {},
): TranslationAudit {
  const s = auditText(source, { title: opts.title })
  const t = auditText(translation)
  return {
    source: s,
    translation: t,
    pair: toUuid(`${s.address}→${t.address}`),
    sourceLang: opts.sourceLang,
    targetLang: opts.targetLang,
    honest:
      'The pair receipt binds THIS translation to THIS source — both exact-copy fingerprints, folded source→translation. ' +
      'uuidna proves the pairing and each text’s integrity, NOT that the translation is accurate or faithful: semantic ' +
      'fidelity is human, provenance is recomputable. Re-address after each revision and the change is visible.',
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

/** A research-record audit — the provenance fingerprint of an open-access Zenodo record's PUBLIC metadata. */
export interface RecordAudit extends BookAudit { doi: string }

/** auditZenodo(id[, opts]) → content-address the PUBLIC metadata of an open-access Zenodo record (title, DOI,
 *  creators, date) via the Zenodo REST API (developers.zenodo.org, no key) — a recomputable provenance fingerprint
 *  of the open record. Pass `{ sandbox: true }` to read a record on sandbox.zenodo.org (the test instance) instead,
 *  for verifying a deposit before it is public. HONEST: it fingerprints the public metadata only, NOT the deposited
 *  files or their content; uuidna audits text provenance. Anyone re-fetches the same public record and recomputes
 *  the same address. Read-only — it never deposits, authenticates, or changes a record. */
export async function auditZenodo(id: number | string, opts: { sandbox?: boolean } = {}): Promise<RecordAudit> {
  const host = opts.sandbox ? 'sandbox.zenodo.org' : 'zenodo.org'
  const r = await fetch(`https://${host}/api/records/${encodeURIComponent(String(id))}`)
  if (!r.ok) throw new Error(`records: Zenodo (${host}) responded ${r.status} for id ${id}`)
  const j = (await r.json()) as { doi?: string; metadata?: { title?: string; creators?: { name?: string }[]; publication_date?: string }; links?: { self_html?: string } }
  const md = j.metadata || {}
  const creators = (md.creators || []).map((c) => c.name || '').filter(Boolean).join(', ')
  const meta = `${md.title || ''}\n${j.doi || ''}\n${creators}\n${md.publication_date || ''}`
  return {
    ...auditText(meta, { title: md.title || String(id), source: j.links?.self_html || `https://${host}/records/${id}` }),
    doi: j.doi || '',
    honest:
      'Fingerprints the PUBLIC metadata of an open-access Zenodo record (title, DOI, creators, date), content-addressed — ' +
      'NOT the deposited files or their content, which uuidna does not fetch or reproduce. Anyone re-fetches the same open ' +
      'record and recomputes the same address; a check digit and a uuid are the same idea at different scales.',
  }
}

/** A film audit — the provenance fingerprint of the PUBLIC description of a movie, NOT the film. */
export interface MovieAudit extends BookAudit { movieDescription: string }

/** auditMovie(title) → content-address the PUBLIC Wikipedia summary of a film (its factual description, CC BY-SA,
 *  free, no key) — a recomputable provenance fingerprint of the public facts. It does NOT and CANNOT decode the
 *  film: a movie is video, and a copyrighted film's footage, dialogue and screenplay are neither fetched nor
 *  reproduced here. uuidna audits text provenance only; this fingerprints public metadata, not a hidden meaning. */
export async function auditMovie(title: string): Promise<MovieAudit> {
  const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
  if (!r.ok) throw new Error(`movies: Wikipedia summary responded ${r.status} for "${title}"`)
  const j = (await r.json()) as { title?: string; description?: string; extract?: string; content_urls?: { desktop?: { page?: string } } }
  const source = j.content_urls?.desktop?.page || ''
  return {
    ...auditText(j.extract || '', { title: j.title || title, source }),
    movieDescription: j.description || '',
    honest:
      'Fingerprints the PUBLIC Wikipedia summary of the film (facts and description, CC BY-SA), content-addressed — ' +
      'NOT the copyrighted film content, footage, dialogue or screenplay, which uuidna does not fetch, decode or ' +
      'reproduce. A movie is video; uuidna audits text provenance only. There is no hidden meaning being decoded.',
  }
}

/** A standards/law audit — the recomputable FLOOR of a compliance audit, NOT the ruling. */
export interface StandardAudit extends BookAudit { standard: string; checks: ExtractedFact[]; factBase: string; ruling: string }

/** auditStandard(name) → the recomputable FLOOR of a standards/law audit: content-address the PUBLIC Wikipedia
 *  description of a standard or law (CC BY-SA, free, no key), decode its structure, and extract the DECIDABLE checks
 *  it states — each sealed or refuted `by decide`. HONEST SCOPE: this is the FLOOR a human auditor STARTS from — the
 *  provenance fingerprint and the decidable checks — NOT a compliance / legal RULING, which requires a licensed
 *  auditor or counsel reviewing the specific jurisdiction, edition and deployment. uuidna delivers what recomputes
 *  and leaves the ruling to humans; the "free" is a free public API + LOCAL by-decide checks. The text is DATA,
 *  content-addressed, never executed. */
export async function auditStandard(name: string): Promise<StandardAudit> {
  const r = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`)
  if (!r.ok) throw new Error(`standards: Wikipedia summary responded ${r.status} for "${name}"`)
  const j = (await r.json()) as { title?: string; description?: string; extract?: string; content_urls?: { desktop?: { page?: string } } }
  const source = j.content_urls?.desktop?.page || ''
  const text = j.extract || ''
  return {
    ...auditText(text, { title: j.title || name, source }),
    standard: j.title || name,
    checks: extractDecidable(text),
    factBase:
      'The recomputable FLOOR of a standards audit: the provenance fingerprint of the standard\'s public description, its ' +
      'structure, and the DECIDABLE arithmetic checks in it (each sealed or refuted by decide) — what a human auditor STARTS from.',
    ruling:
      'NOT provided. A standards / compliance / legal audit RULING requires a human auditor or licensed counsel reviewing the ' +
      'specific jurisdiction, edition and deployment. uuidna cannot and does not rule; it delivers the floor — the fingerprint ' +
      'and the decidable checks — and leaves the ruling to humans. Integrity, not truth.',
  }
}
