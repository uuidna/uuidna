// @non-harmonic: LHC open-data catalogue on uuidnaOS — network boundary; evidence only, never seals.
// cern — THE CERN OPEN-DATA PORT. One fetcher for research sweep, school APIs, and uuidna_cern on the wire.
import { handleOf } from '../../../handle.js'
import { toUuid } from '../../../address.js'
import { hexbitDoorOf } from '../../../hexbit/index.js'
import { merkleGravity } from '../../../gravity/index.js'
import { fetchData } from '../fetch/index.js'
import { contentWords, related } from '../../../adjudicate.js'

export const CERN_OD = 'https://opendata.cern.ch/api/records'
export const CERN_PROBE_QUERY = 'CMS Higgs'

export interface CernRecord {
  id: string
  title: string
  experiment: string
  address: string
}

export interface CernFetchResult {
  query: string
  url: string
  records: CernRecord[]
  total: number
  declined: boolean
  note: string
  status?: number
}

export interface CernPortResult {
  definition: 'uuidnaOS·cern·opendata'
  query: string
  count: number
  /** how many hits share a content word with the query — the rest answered the catalogue's search, not the topic */
  topical: number
  hits: (CernRecord & { topical: boolean })[]
  declined: boolean
  note: string
  receipt: string
  handle: string
  hexbits: number[]
  door: string
}

type CernPayload = {
  hits?: { total?: number; hits?: { id?: number; metadata?: { recid?: number; title?: string; experiment?: string[] } }[] }
}

const rowsOf = (data: CernPayload): CernRecord[] =>
  (data.hits?.hits ?? []).flatMap((h) => {
    const id = String(h.metadata?.recid ?? h.id ?? '')
    if (!id) return []
    return [{
      id,
      title: (h.metadata?.title ?? '').slice(0, 240),
      experiment: (h.metadata?.experiment ?? []).join('+') || 'CERN',
      address: toUuid('cern-od:' + id),
    }]
  })

/** fetchCernOpenData(text, limit) → raw catalogue rows from opendata.cern.ch. One network call (OS fetch cache). */
export async function fetchCernOpenData(text: string, limit = 8): Promise<CernFetchResult> {
  const url = `${CERN_OD}/?q=${encodeURIComponent(text)}&size=${limit}`
  try {
    const got = await fetchData<CernPayload>(url, 'json', { headers: { accept: 'application/json' } })
    if (got.data === null) {
      const status = /responded (\d+)/.exec(got.note)?.[1]
      return { query: text, url, records: [], total: 0, declined: true, note: got.note, status: status ? Number(status) : undefined }
    }
    const records = rowsOf(got.data)
    return {
      query: text,
      url,
      records,
      total: Number(got.data.hits?.total ?? records.length),
      declined: false,
      note: 'ok',
    }
  } catch (e) {
    return { query: text, url, records: [], total: 0, declined: true, note: String((e as Error).message).slice(0, 120) }
  }
}

/** topicalTo(query, title) → does the record's title share a content word with the query (adjudicate.ts related, the
 *  same floor a citation must clear)? The catalogue's search matches on fields a reader never sees, so a query about
 *  dimensional analysis returned three OPERA neutrino datasets shaped exactly like a topical answer (measured
 *  2026-11-09, recids 13155, 13100, 10000). Reported per hit, never filtered: the hit is evidence of what the archive
 *  answered, and the mark says whether it answered the topic. Pure. */
export const topicalTo = (query: string, title: string): boolean => {
  const q = contentWords(query), t = contentWords(title)
  return q.some((w) => t.some((v) => related(w, v)))
}

/** cernPortSearch(text, limit) → uuidnaOS port view of one CERN open-data query, receipt-closed. */
export async function cernPortSearch(text: string, limit = 8): Promise<CernPortResult> {
  const got = await fetchCernOpenData(text, limit)
  const hits = got.records.map((r) => ({ ...r, topical: topicalTo(text, r.title) }))
  const topical = hits.filter((h) => h.topical).length
  const receipt = merkleGravity([toUuid('cern-port|' + text), ...got.records.map((r) => r.address)])
  const door = hexbitDoorOf(receipt)
  return {
    definition: 'uuidnaOS·cern·opendata',
    query: text,
    count: got.records.length,
    topical,
    hits,
    declined: got.declined,
    note: got.declined || !hits.length || topical ? got.note
      : `no topical match: ${hits.length} record(s) answered the catalogue's search, none shares a word with the query — not corroboration`,
    receipt,
    ...door,
  }
}

/** renderCernPort(r) → CLI / exec / MCP summary lines. Pure. */
export function renderCernPort(r: CernPortResult): string {
  const status = r.declined ? 'DECLINED' : !r.count ? 'EMPTY' : r.topical ? 'ANSWERING' : 'NO TOPICAL MATCH'
  return [
    `${status} cern-opendata · ${r.count} records (${r.topical} topical) · query "${r.query}"`,
    ...(r.declined || (r.count && !r.topical) ? [`  note: ${r.note}`] : []),
    ...r.hits.slice(0, 8).map((h) => `  ${h.topical ? ' ' : '?'} ${h.experiment} ${h.id}: ${h.title.slice(0, 72)}`),
    `  receipt ${handleOf(r.receipt)}… · door ${r.door}`,
  ].join('\n')
}
