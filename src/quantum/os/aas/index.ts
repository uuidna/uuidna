// @non-harmonic: uuidnaOS aas port — journals.aas.org answers on its own uptime; fetch is the reading, the fold is ours.
// aas — THE AAS JOURNALS DOOR (journals.aas.org). One fetcher for the research sweep, uuidna_aas on the wire, and
// the pre-submission checklist the editorial surface reads.
//
// WHAT THIS DOOR IS. journals.aas.org is the American Astronomical Society's journals site — scope statements,
// policy, author instructions, the publication timeline. It runs WordPress, so it carries the keyless WP REST API
// at /wp-json/wp/v2: `search` across every public post type, and `pages` by slug. That is the whole door.
//
// WHAT THIS DOOR IS NOT. It is not the article corpus. AAS research articles are published by IOP under the DOI
// prefix 10.3847 and served from iopscience.iop.org; nothing here fetches an article, an abstract, or a citation
// graph. A query that finds "The AJ becomes a Gold Open Access journal" has found AAS's own timeline entry about a
// journal, not a paper in it. The distinction is the honest scope, and the crossref door (prefix 10.3847) is where
// the corpus is asked — this one answers about the JOURNALS, not their contents.
//
// COURTESY. https://journals.aas.org/robots.txt allows every path (`User-agent: *` with an empty `Disallow:`) and
// asks `Crawl-delay: 10`. Each call here is a single REST request for a single query, and the OS fetch cache makes
// a repeated URL free for the rest of the process, so a sweep costs one request to this host — inside the courtesy
// the host asks for without needing a scheduler to enforce it.
import { handleOf } from '../../../handle.js'
import { toUuid } from '../../../address.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { fetchData } from '../fetch/index.js'

export const AAS_HOST = 'journals.aas.org'
export const AAS_WP = 'https://journals.aas.org/wp-json/wp/v2'
export const AAS_PROBE_QUERY = 'open access'
/** the page the checklist is read from — a slug, so the door is the same one a reader's browser opens */
export const AAS_CHECKLIST_SLUG = 'pre-submission-checklist-for-aas-journal-authors'
/** AAS articles carry this Crossref DOI prefix — the corpus this door deliberately does NOT serve */
export const AAS_DOI_PREFIX = '10.3847'

export interface AasHit {
  id: string
  title: string
  url: string
  /** the WP post type the hit came from: page, timeline-event, … — kept because it says what KIND of thing answered */
  subtype: string
  address: string
}

export interface AasFetchResult {
  query: string
  url: string
  hits: AasHit[]
  declined: boolean
  note: string
  status?: number
}

export interface AasPage {
  slug: string
  id: string
  title: string
  url: string
  /** the page's own last-modified stamp, as the site reports it — read, never minted here */
  modified: string
  /** every list item on the page, flattened to text — the checklist's own numbering, not ours */
  items: string[]
  bytes: number
  address: string
}

export interface AasPageResult {
  slug: string
  page: AasPage | null
  url: string
  declined: boolean
  note: string
}

export interface AasPortResult {
  definition: 'uuidnaOS·aas·journals'
  query: string
  count: number
  hits: AasHit[]
  declined: boolean
  note: string
  scope: string
  receipt: string
  handle: string
  hexbits: number[]
  door: string
}

export interface AasChecklistResult {
  definition: 'uuidnaOS·aas·checklist'
  source: string
  title: string
  modified: string
  count: number
  items: { n: number; text: string; address: string; handle: string }[]
  declined: boolean
  note: string
  honest: string
  receipt: string
  handle: string
  hexbits: number[]
  door: string
}

const ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”',
}

/** decodeEntities(s) → named and numeric HTML entities as characters. Pure. */
export function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(Number.parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, name: string) => ENTITIES[name.toLowerCase()] ?? m)
}

/** Inline markup does not break a word; block markup does. Dropping an inline tag outright is why
 *  `guidelines</a>.` reads as "guidelines." and not "guidelines ." — a space that would put a gap before every
 *  period that followed a link, in text this tree then content-addresses. */
const INLINE = /<\/?(?:a|abbr|b|br|cite|code|em|i|q|s|small|span|strong|sub|sup|u|var)\b[^>]*>/gi

/** stripHtml(html) → the readable text of a fragment, whitespace collapsed. Pure. */
export function stripHtml(html: string): string {
  return decodeEntities(html.replace(INLINE, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
}

/** listItemsOf(html) → one string per <li>, in document order. Pure — this is the half of the checklist reader
 *  that needs no network, so the parse is testable against a fixture and only the fetch is unrepeatable. */
export function listItemsOf(html: string): string[] {
  return [...html.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)]
    .map((m) => stripHtml(m[1]!))
    .filter((t) => t.length > 0)
}

type SearchRow = { id?: number; title?: string; url?: string; subtype?: string; type?: string }
type PageRow = { id?: number; slug?: string; link?: string; modified?: string;
                 title?: { rendered?: string }; content?: { rendered?: string } }

const rowsOf = (data: SearchRow[]): AasHit[] =>
  data.flatMap((r) => {
    const id = String(r.id ?? '')
    if (!id) return []
    return [{
      id,
      title: stripHtml(r.title ?? '').slice(0, 240),
      url: r.url ?? '',
      subtype: r.subtype ?? r.type ?? 'post',
      address: toUuid('aas:' + id),
    }]
  })

/** fetchAasJournals(text, limit) → search rows from the AAS journals site. One network call (OS fetch cache). */
export async function fetchAasJournals(text: string, limit = 8): Promise<AasFetchResult> {
  const url = `${AAS_WP}/search?per_page=${limit}&search=${encodeURIComponent(text)}`
  try {
    const got = await fetchData<SearchRow[]>(url, 'json')
    if (got.data === null) {
      const status = /responded (\d+)/.exec(got.note)?.[1]
      return { query: text, url, hits: [], declined: true, note: got.note, ...(status ? { status: Number(status) } : {}) }
    }
    return { query: text, url, hits: rowsOf(Array.isArray(got.data) ? got.data : []), declined: false, note: 'ok' }
  } catch (e) { return { query: text, url, hits: [], declined: true, note: String((e as Error).message).slice(0, 120) } }
}

/** fetchAasPage(slug) → one published page, addressed, with its list items already flattened. Network. */
export async function fetchAasPage(slug: string): Promise<AasPageResult> {
  const url = `${AAS_WP}/pages?slug=${encodeURIComponent(slug)}`
  try {
    const got = await fetchData<PageRow[]>(url, 'json')
    if (got.data === null) return { slug, page: null, url, declined: true, note: got.note }
    const row = (Array.isArray(got.data) ? got.data : [])[0]
    if (!row) return { slug, page: null, url, declined: true, note: `no published page carries the slug "${slug}"` }
    const html = row.content?.rendered ?? ''
    return {
      slug,
      url,
      declined: false,
      note: 'ok',
      page: {
        slug: row.slug ?? slug,
        id: String(row.id ?? ''),
        title: stripHtml(row.title?.rendered ?? ''),
        url: row.link ?? '',
        modified: row.modified ?? '',
        items: listItemsOf(html),
        bytes: html.length,
        address: toUuid('aas-page:' + html),
      },
    }
  } catch (e) { return { slug, page: null, url, declined: true, note: String((e as Error).message).slice(0, 120) } }
}

const AAS_SCOPE =
  `journals.aas.org serves the AAS journals' own pages — scope, policy, author instructions, timeline. The ARTICLES `
  + `are published by IOP under DOI prefix ${AAS_DOI_PREFIX}; no hit here is a paper, and none is a seal.`

/** aasPortSearch(text, limit) → uuidnaOS port view of one AAS journals query, receipt-closed. */
export async function aasPortSearch(text: string, limit = 8): Promise<AasPortResult> {
  const got = await fetchAasJournals(text, limit)
  const receipt = merkleGravity([toUuid('aas-port|' + text), ...got.hits.map((h) => h.address)])
  return {
    definition: 'uuidnaOS·aas·journals',
    query: text,
    count: got.hits.length,
    hits: got.hits,
    declined: got.declined,
    note: got.note,
    scope: AAS_SCOPE,
    receipt,
    ...hexbitDoorOf(receipt),
  }
}

/** aasChecklist() → the AAS pre-submission checklist, each item content-addressed, receipt-closed.
 *  The items are AAS'S OWN TEXT and the count is the count of what the page publishes today: this reports the
 *  checklist, it does not decide whether any manuscript satisfies it, and a page that could not be read declines
 *  rather than returning an empty checklist — an unread requirement and no requirement are different facts. */
export async function aasChecklist(slug = AAS_CHECKLIST_SLUG): Promise<AasChecklistResult> {
  const got = await fetchAasPage(slug)
  const items = (got.page?.items ?? []).map((text, i) => {
    const address = toUuid('aas-checklist:' + text)
    return { n: i + 1, text, address, handle: handleOf(address) }
  })
  const receipt = merkleGravity([toUuid('aas-checklist|' + slug), ...items.map((i) => i.address)])
  return {
    definition: 'uuidnaOS·aas·checklist',
    source: got.page?.url || `https://${AAS_HOST}/${slug}/`,
    title: got.page?.title ?? '',
    modified: got.page?.modified ?? '',
    count: items.length,
    items,
    declined: got.declined,
    note: got.note,
    honest: 'AAS’s published requirements, read and addressed. uuidna does not judge a manuscript against them '
      + 'and does not host one; a checklist that could not be read DECLINES rather than reporting zero requirements.',
    receipt,
    ...hexbitDoorOf(receipt),
  }
}

/** renderAasPort(r) → CLI / exec / MCP summary lines. Pure. */
export function renderAasPort(r: AasPortResult): string {
  const status = r.declined ? 'DECLINED' : r.count ? 'ANSWERING' : 'EMPTY'
  return [
    `${status} aas-journals · ${r.count} hits · query "${r.query}"`,
    ...(r.declined ? [`  note: ${r.note}`] : []),
    ...r.hits.slice(0, 8).map((h) => `  ${h.subtype} ${h.id}: ${h.title.slice(0, 72)}`),
    `  receipt ${handleOf(r.receipt)}… · door ${r.door}`,
  ].join('\n')
}

/** renderAasChecklist(r) → CLI / exec / MCP summary lines. Pure. */
export function renderAasChecklist(r: AasChecklistResult): string {
  const status = r.declined ? 'DECLINED' : r.count ? 'READ' : 'EMPTY'
  return [
    `${status} aas-checklist · ${r.count} items · ${r.title || r.source}${r.modified ? ` · modified ${r.modified}` : ''}`,
    ...(r.declined ? [`  note: ${r.note}`] : []),
    ...r.items.slice(0, 25).map((i) => `  ${String(i.n).padStart(2)}. ${i.text.slice(0, 96)}`),
    `  receipt ${handleOf(r.receipt)}… · door ${r.door}`,
  ].join('\n')
}
