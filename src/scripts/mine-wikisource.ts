#!/usr/bin/env node
// @non-harmonic: reads the Wikisource API over the network — a NAMED boundary, like books.ts and decode-book.ts.
//
// mine-wikisource — A LIBRARY THAT INVITES MACHINES, DECODED AT SCALE.
//
// The corpus needed a source that is open to automated reading rather than merely available. Wikisource is that:
// a real MediaWiki API, texts that are public domain or CC BY-SA, and a robots policy that closes only the
// Special: namespace. Nothing here works around a restriction — the API is the front door.
//
// TEXT IS KEPT HERE, AND THAT IS THE POINT. An earlier version of this decoded to counts and dropped the text,
// which was the wrong rule for the wrong reason: Wikisource carries public-domain and CC BY-SA works, so the text
// may be read, retained and quoted with attribution. Refusing to hold it did not protect anything — it only made
// the deeper decoding impossible, because claims, relations and numerals in context cannot be recovered from a
// word count. The licence gate belongs on IN-COPYRIGHT sources, where sealing verbatim text into a permanent
// citable deposit would be real exposure. It does not belong here.
//
// COUNTS AND TEXT BOTH. Every page is decoded to integers — characters, words, sentences, distinct
// vocabulary, frequency ranks, letter order, the numerals census — AND the text is returned alongside them, so a
// later pass can mine claims the counts cannot see. A count is falsifiable and
// recomputable by anyone holding the same revision, while an excerpt is neither. The revision id is recorded
// with every reading, because a wiki page is not frozen the way a Gutenberg file is: counts without the
// revision they were taken from are an assertion, and with it they are a receipt.
//
// SCALE IS BATCHED, NOT HAMMERED. The API accepts many titles per request, so a category of fifty works costs a
// handful of calls rather than fifty. Requests are sequential and the batch size is bounded — the point is to
// read a library thoroughly, not to make a nuisance of the reading.
//
// The decoder is script-agnostic (Unicode property escapes), so this works on any Wikisource language. The
// numerals table in decode-book.ts is the only per-language part, and it currently carries English and Bulgarian.
//
//   node dist/scripts/mine-wikisource.js <lang> --search "<term>" [--limit N]
//   node dist/scripts/mine-wikisource.js <lang> --category "<Category name>" [--limit N]
import { decode, candidates, type Decoding } from './decode-book.js'

const BATCH = 20
const UA = 'uuidna-research/0.2.7 (https://uuidna.com; content-addressed ledger; decodes public-domain and CC BY-SA text to counts and claims)'

export interface Page { pageid: number; title: string }
export interface Reading extends Decoding { pageid: number; title: string; revid: number; lang: string; text: string }

/** wikitext carries templates, refs and link syntax that are apparatus, not the work. Strip them so the counts
 *  describe what was written rather than how the wiki stores it. */
export function stripMarkup(wt: string): string {
  return wt
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, ' ').replace(/<ref[^>]*\/>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    // entities survived the tag strip and were counted as VOCABULARY — 'nbsp' ranked third in a Ботев letter,
    // which is apparatus masquerading as the writer's word. Decode them before anything counts them.
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&(amp|lt|gt|quot|apos|mdash|ndash|laquo|raquo);/g, ' ')
    .replace(/&#\d+;/g, ' ')
    .replace(/\{\{[^{}]*\}\}/g, ' ').replace(/\{\{[^{}]*\}\}/g, ' ')
    .replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'{2,}/g, '')
    .replace(/^[=*#:;]+/gm, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

async function api(lang: string, params: Record<string, string>): Promise<Record<string, unknown>> {
  const q = new URLSearchParams({ format: 'json', formatversion: '2', ...params })
  const res = await fetch(`https://${lang}.wikisource.org/w/api.php?${q}`, { headers: { 'user-agent': UA, accept: 'application/json' } })
  if (!res.ok) throw new Error(`wikisource ${lang} answered ${res.status}`)
  return (await res.json()) as Record<string, unknown>
}

/** find pages by free search — the reliable way in, since a guessed title silently returns an empty extract. */
export async function search(lang: string, term: string, limit: number): Promise<Page[]> {
  const j = await api(lang, { action: 'query', list: 'search', srsearch: term, srlimit: String(limit), srnamespace: '0' })
  const r = (j.query as { search?: Page[] } | undefined)?.search ?? []
  return r.map((p) => ({ pageid: p.pageid, title: p.title }))
}

/** or enumerate a category, which is how a wiki actually organises a body of work. */
export async function category(lang: string, name: string, limit: number): Promise<Page[]> {
  const title = /^(Category|Категория):/i.test(name) ? name : `Category:${name}`
  const j = await api(lang, { action: 'query', list: 'categorymembers', cmtitle: title, cmlimit: String(limit), cmnamespace: '0' })
  const r = (j.query as { categorymembers?: Page[] } | undefined)?.categorymembers ?? []
  return r.map((p) => ({ pageid: p.pageid, title: p.title }))
}

/** Decode a batch. The extract is read, counted, and dropped — only integers survive the call. */
export async function readBatch(lang: string, pages: readonly Page[], top: number): Promise<Reading[]> {
  if (!pages.length) return []
  const j = await api(lang, {
    // NOT prop=extracts: Wikisource builds pages by transclusion, so TextExtracts returned an empty body for
    // eleven of twelve Ботев pages — a silent miss that read like a library of empty books. The raw wikitext of
    // the main slot is what actually carries the work.
    action: 'query', prop: 'revisions', rvprop: 'ids|content', rvslots: 'main',
    pageids: pages.map((p) => p.pageid).join('|'),
  })
  const got = (j.query as { pages?: { pageid: number; title: string; revisions?: { revid: number; slots?: { main?: { content?: string } } }[] }[] } | undefined)?.pages ?? []
  const out: Reading[] = []
  for (const p of got) {
    const text = stripMarkup(p.revisions?.[0]?.slots?.main?.content ?? '')
    if (!text.trim()) continue // an empty extract is a miss, not a short work — never report it as zero words
    out.push({ ...decode(text, top), pageid: p.pageid, title: p.title, revid: p.revisions?.[0]?.revid ?? 0, lang, text })
  }
  return out
}

/** read many pages in bounded batches. */
export async function mine(lang: string, pages: readonly Page[], top = 8): Promise<Reading[]> {
  const out: Reading[] = []
  for (let i = 0; i < pages.length; i += BATCH) out.push(...await readBatch(lang, pages.slice(i, i + BATCH), top))
  return out
}

if (process.argv[1] && /mine-wikisource\.(js|ts)$/.test(process.argv[1])) {
  const argv = process.argv.slice(2)
  const lang = argv[0] && !argv[0].startsWith('--') ? argv[0] : 'bg'
  const flag = (n: string) => (argv.indexOf(n) >= 0 ? argv[argv.indexOf(n) + 1] : null)
  const limit = Number(flag('--limit') ?? 20) || 20
  const term = flag('--search')
  const cat = flag('--category')
  if (!term && !cat) { console.error('mine-wikisource — usage: mine-wikisource.js <lang> --search "<term>" | --category "<name>" [--limit N]'); process.exit(1) }

  const pages = term ? await search(lang, term, limit) : await category(lang, cat!, limit)
  console.log(`mine-wikisource ${lang} — ${pages.length} page(s) found; reading wikitext and decoding …\n`)
  const readings = await mine(lang, pages)

  let words = 0, chars = 0, numerals = 0
  for (const r of readings) {
    words += r.words; chars += r.chars
    numerals += r.numerals.reduce((n, x) => n + x.count, 0)
    console.log(`  ${String(r.words).padStart(7)}w ${String(r.distinct).padStart(6)}d  rev ${String(r.revid).padStart(9)}  ${r.title.slice(0, 44).padEnd(44)} ${r.ranks.slice(0, 3).map((x) => x.word + '=' + x.count).join(' ')}`)
  }
  const missing = pages.length - readings.length
  console.log(`\n  ${readings.length} decoded${missing > 0 ? `, ${missing} with no extract (reported as misses, never as zero)` : ''}`)
  console.log(`  ${chars} characters · ${words} words · ${numerals} numerals written as words`)
  if (readings.length) {
    const biggest = readings.reduce((a, b) => (b.words > a.words ? b : a))
    console.log(`\n  candidate sealable facts from the largest (${biggest.title.slice(0, 50)}):`)
    for (const c of candidates(biggest)) console.log(`    ${c.holds ? '✓' : '✗'} ${c.claim}`)
  }
}
