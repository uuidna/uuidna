// quantum/os/dbapi — ONE QUERY API OVER THE PORTED ALPINE DATABASE SURFACE.
//
// Alpine publishes 438 database packages across 325 origins: sqlite, postgres, mariadb, redis, lmdb, rocksdb,
// duckdb, and the bindings each of them needs in every language. They disagree about storage engines, query
// languages, transaction models and durability — and every one of them exists to answer one shape of question:
// GIVEN A KEY OR A PREDICATE, WHICH RECORDS?
//
// uuidna already answers that shape, over its own records, and it answers it without a storage engine because
// its records are CONTENT-ADDRESSED: the address IS the key, so a lookup is a map hit rather than a scan, and
// there is no index to keep in sync because the identity of a row is computed from the row. That is the only
// database-shaped claim this module makes, and it is a real one.
//
// SAY WHAT IT IS NOT, in the language the 438 would use. There is no storage engine, no transaction, no ACID, no
// isolation level, no SQL, no write path at all — the catalogue is an immutable committed mirror and nothing here
// can insert, update or delete a row. It is a READ surface over sealed data. A database that cannot write is not
// a database, and calling this one would be the overreach; what it is, is the query half, made exact.
//
// WHY ONE API RATHER THAN THREE FUNCTIONS. cataloguePackage, catalogueSearch and catalogueRdepends already
// existed and were reached separately, each with its own limit convention and its own idea of what "not found"
// means. One door with one result shape makes the ABSENT case uniform — every query says how many matched and
// how many it returned, so a truncated answer can never read as a complete one.
import { catalogue, cataloguePackage, catalogueSearch, catalogueRdepends, catalogueState, type CataloguePackage } from '../catalogue/index.js'
import { domainCensus, type DomainCensus } from '../domains/index.js'
import { toUuid } from '../../../address.js'

export const DB_DOMAIN = 'database' as const

export function dbCensus(): DomainCensus {
  const c = domainCensus(DB_DOMAIN)
  if (!c) throw new Error(`dbapi: DOMAIN_PATTERNS carries no "${DB_DOMAIN}" domain`)
  return c
}

export type DbQuery =
  | { by: 'key'; key: string }
  | { by: 'text'; text: string; limit?: number; repo?: 'main' | 'community' }
  | { by: 'dependents'; key: string; limit?: number }

export interface DbResult {
  query: DbQuery
  /** the rows returned — never truncated silently, see `total` */
  rows: readonly { name: string; version: string; repo: string; desc: string; address: string }[]
  /** how many matched in total; rows.length may be smaller, and the difference is stated, never implied */
  total: number
  /** true when rows.length < total — a caller that ignores this is reading a partial answer as a whole one */
  truncated: boolean
  /** the catalogue is absent (no mirror) rather than the query having no matches — different facts */
  absent: boolean
  address: string
  honest: string
}

const row = (p: CataloguePackage): { name: string; version: string; repo: string; desc: string; address: string } => ({
  name: p.name, version: p.version, repo: p.repo, desc: p.desc,
  // the address IS the key — computed from the row, so no index can fall out of sync with what it indexes
  address: toUuid(`pkg:${p.repo}:${p.name}:${p.version}:${p.checksum}`),
})

const HONEST =
  'A READ surface over an immutable committed mirror: no storage engine, no transaction, no SQL, and no write ' +
  'path — nothing here inserts, updates or deletes. The address is computed from the row, so a lookup needs no ' +
  'index and no index can go stale. Every result states total and truncated, so a partial answer never reads as a whole one.'

/** dbQuery — the ONE door. Same result shape for every query kind, so "absent" and "no match" stay distinct. */
export function dbQuery(q: DbQuery): DbResult {
  const st = catalogueState()
  const base = { query: q, address: toUuid(`dbq:${JSON.stringify(q)}`), honest: HONEST }
  // ABSENT IS NOT EMPTY, and this is the distinction the whole result shape exists to keep. A missing mirror
  // answering "0 rows" is indistinguishable from a query that genuinely matched nothing — the same green-over-
  // absent shape, in query clothing. The flag separates them before any caller can conflate them.
  if (!st.present) return { ...base, rows: [], total: 0, truncated: false, absent: true }

  if (q.by === 'key') {
    const p = cataloguePackage(q.key)
    return { ...base, rows: p ? [row(p)] : [], total: p ? 1 : 0, truncated: false, absent: false }
  }
  if (q.by === 'text') {
    const limit = q.limit ?? 40
    const r = catalogueSearch(q.text, limit, q.repo)
    return { ...base, rows: r.hits.map(row), total: r.total, truncated: r.hits.length < r.total, absent: false }
  }
  const limit = q.limit ?? 40
  const r = catalogueRdepends(q.key, limit)
  const rows = r.hits.map((n) => cataloguePackage(n)).filter((p): p is CataloguePackage => p !== null).map(row)
  return { ...base, rows, total: r.total, truncated: rows.length < r.total, absent: false }
}

export interface DbApiCensus {
  definition: 'alpine-database-port·one-query-api'
  ported: { packages: number; origins: number }
  /** the rows this API can answer over — the whole committed mirror, not just the database domain */
  records: number
  api: readonly string[]
  receipt: string
  honest: string
}

export function dbApi(): DbApiCensus {
  const c = dbCensus()
  return {
    definition: 'alpine-database-port·one-query-api',
    ported: { packages: c.packages, origins: c.origins },
    records: catalogueState().count,
    api: ['dbQuery', 'dbCensus'],
    receipt: toUuid(`dbapi|${c.packages}|${c.origins}|${catalogueState().count}`),
    honest: HONEST,
  }
}
