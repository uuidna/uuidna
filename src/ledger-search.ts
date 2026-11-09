// ledger-search — filter the sealed keys and fold the hit list to one receipt.
// A leaf: theorems + address + hexbit door. Not the editorial harvest, not TTS, not the package barrel.
//
// AT THE EDGE THE LEDGER IS NOT HELD (40 MB of rows against a 128 MB isolate), so the same filter runs over the searchable
// text the site build bakes beside the pieces, in ledger order, in chunks the isolate parses one at a time
// (/ledger/search/<n>.json): the first call asks for its query (RowsNeeded search), the surface scans every chunk keeping
// only the hits, and the call runs again over them. One row text, one order, so the edge answers with the host's receipt.
import { theorems, ledgerResident, sealedCount, sealedAddressOf, RowsNeeded } from './theorems/index.js'
import { toUuid } from './address.js'
import { hexbitDoorOf } from './hexbit/index.js'

export interface LedgerSearch {
  q: string; count: number; total: number; receipt: string
  handle: string; hexbits: number[]; door: string
  matches: Array<{ key: string; name: string; principle: string; skill: string }>
}
type Hit = LedgerSearch['matches'][number]

/** the text a query is matched against — the same for every surface, so every surface finds the same rows */
const rowText = (key: string, name: string, statement: string, principle: string, skill: string): string =>
  `${key} ${name} ${statement} ${principle} ${skill}`.toLowerCase()

/** a baked search chunk: rows in ledger order, each wing's (principle, skill) once per chunk */
export interface SearchChunk { wings: [principle: string, skill: string][]; rows: [key: string, name: string, statement: string, wing: number][] }

/** searchChunksOf(rows, maxBytes) → the searchable text of every row, in ledger order, cut into chunks under maxBytes */
export const searchChunksOf = (rows: readonly { key: string; name: string; statement: string; principle: string; skill: string }[], maxBytes: number): SearchChunk[] => {
  const chunks: SearchChunk[] = []
  let cur: SearchChunk = { wings: [], rows: [] }, at = new Map<string, number>(), bytes = 0
  for (const t of rows) {
    const size = t.key.length + t.name.length + t.statement.length + 16
    if (cur.rows.length && bytes + size > maxBytes) { chunks.push(cur); cur = { wings: [], rows: [] }; at = new Map(); bytes = 0 }
    const w = `${t.principle}\u0000${t.skill}`
    if (!at.has(w)) { at.set(w, cur.wings.length); cur.wings.push([t.principle, t.skill]); bytes += w.length }
    cur.rows.push([t.key, t.name, t.statement, at.get(w)!]); bytes += size
  }
  if (cur.rows.length) chunks.push(cur)
  return chunks
}

/** scanChunk(chunk, s) → the rows of one chunk whose text holds s, in order; a key the baked root does not seal is skipped */
export const scanChunk = (c: SearchChunk, s: string): Hit[] =>
  c.rows.flatMap(([key, name, statement, w]) => {
    const [principle, skill] = c.wings[w] ?? ['', '']
    return sealedAddressOf(key) !== undefined && rowText(key, name, statement, principle, skill).includes(s) ? [{ key, name, principle, skill }] : []
  })

const held = new Map<string, Hit[]>()
/** holdSearch(s, hits) → the hits a full scan found for one query, held for the call that asked */
export const holdSearch = (s: string, hits: Hit[]): void => { held.set(s, hits) }

export function searchLedger(q: string, limit = 60): LedgerSearch {
  const s = q.trim().toLowerCase()
  let hit: Hit[], total: number
  if (ledgerResident()) {
    const T = theorems()
    total = T.length
    hit = s ? T.filter((t) => rowText(t.key, t.name, t.statement, t.principle, t.skill).includes(s)).map((t) => ({ key: t.key, name: t.name, principle: t.principle, skill: t.skill })) : []
  } else {
    total = sealedCount()
    const h = s ? held.get(s) : []
    if (!h) throw new RowsNeeded([], { search: [s] })
    hit = h
  }
  const receipt = toUuid(hit.map((t) => t.key).join('\n'))
  return {
    q, count: hit.length, total,
    receipt,
    ...hexbitDoorOf(receipt),
    matches: hit.slice(0, limit),
  }
}
