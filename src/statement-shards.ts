// statement-shards — FROM A STATEMENT TO ITS KEY, WITHOUT THE LEDGER. Two doors ask "is this statement sealed?": the
// calculator (decide.ts, its own spelling) and the statement verifier (verify-statement.ts, byte-exact and
// normaliseProposition). Both built a statement → key index over every row, and at the edge that walk refused
// uuidna_decide, uuidna_trial and uuidna_audit_details on every call (measured at uuidna.com/mcp, 2026-11-08).
//
// THE INDEX IS SHARDED BY A FORM COARSER THAN EITHER RULE. bucketForm folds what both rules fold — the calculator's
// operator spellings and all whitespace, and the merge key's `==`/`=` — so two statements equal under EITHER rule share
// one bucket form, and therefore one shard. A door reads the one shard its statement falls in and compares under its
// own rule inside it; nothing about either rule changes. The site build writes the shards beside the ledger pieces
// (copy-lean-to-site), and at the edge a shard the call has not read is asked for (RowsNeeded), fetched and the door run
// again. Every entry is checked on arrival against the baked root — key and statement must recompute the sealed
// address — so a shard can only ever narrow a lookup to rows the ledger seals.
import { toUuid } from './address.js'
import { handleOf, HANDLE_HEXBITS } from './handle.js'
import { RowsNeeded, ledgerResident, sealedAddressOf, type Theorem } from './theorems/index.js'

export type ShardEntry = readonly [key: string, statement: string]

/** bucketForm(s) → the form both lookup rules agree under: NFC, the calculator's operator spellings, no whitespace,
 *  `==` folded to `=`. Coarser than each rule, so equality under either implies equality here. */
export const bucketForm = (s: string): string => String(s).normalize('NFC')
  .replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/≠/g, '!=').replace(/∧/g, '&&').replace(/¬/g, '!')
  .replace(/·/g, '*').replace(/−/g, '-').replace(/\s+/g, '').replace(/==/g, '=')

/** the shard a statement falls in: the first two hex of its bucket form's address — 256 shards over the ledger */
export const shardOf = (s: string): string => toUuid(bucketForm(s)).slice(0, 2)

/** statementShardsOf(rows) → every shard's entries, for the site build. Pure. */
export const statementShardsOf = (rows: readonly Pick<Theorem, 'key' | 'statement'>[]): Record<string, ShardEntry[]> => {
  const out: Record<string, ShardEntry[]> = {}
  for (const t of rows) (out[shardOf(t.statement)] ??= []).push([t.key, t.statement])
  return out
}

const held = new Map<string, ShardEntry[]>()

/** holdShard(id, entries) → keep a fetched shard, every entry verified against the baked root first; an entry whose key
 *  and statement do not recompute its sealed address is dropped and counted, never held. */
export const holdShard = (id: string, entries: readonly unknown[]): { held: number; refused: number } => {
  const ok: ShardEntry[] = []
  let refused = 0
  for (const e of entries) {
    const [key, statement] = Array.isArray(e) ? e : []
    if (typeof key === 'string' && typeof statement === 'string' && sealedAddressOf(key) === toUuid(key + ':' + statement)) ok.push([key, statement])
    else refused++
  }
  held.set(id, ok)
  return { held: ok.length, refused }
}

/** shardEntries(s) → the entries of the shard `s` falls in. Only meaningful where the ledger is NOT resident (a host
 *  answers from its own index); at the edge a shard this call has not read is asked for, by id. */
export const shardEntries = (s: string): readonly ShardEntry[] => {
  const id = shardOf(s)
  const entries = held.get(id)
  if (!entries) throw new RowsNeeded([], { shards: [id] })
  return entries
}

/** whether lookups must go through the shards here — true exactly where the whole ledger is not resident */
export const viaShards = (): boolean => !ledgerResident()

// THE STATION INDEX, SHARDED THE SAME WAY. The trial's involution reads the theorems seated at one lattice station, and the
// lattice built that answer as an index over every row — at the edge the walk refused uuidna_trial {statement} on every
// call (measured in a wrangler-shaped bundle, 2026-11-09). A station's seat is a property of the key alone: its sealed
// address names its station. So a station shard carries keys only, every one checked on arrival against the baked root
// (its sealed address must name a station in this shard), and the rows themselves arrive through the key path.

/** a station's shard: the first two hex of the four-hex station — 256 shards over the 2^16 stations */
export const stationShardOf = (station: string): string => String(station).toLowerCase().slice(0, 2)
/** a sealed address's station: its handle's first half (lattice.ts stationOfAddress, the same rule) */
const stationOf = (address: string): string => handleOf(address).slice(0, HANDLE_HEXBITS / 2)

/** stationShardsOf(rows) → every station shard's keys, grouped by station, for the site build. Pure. */
export const stationShardsOf = (rows: readonly Pick<Theorem, 'key' | 'address'>[]): Record<string, Record<string, string[]>> => {
  const out: Record<string, Record<string, string[]>> = {}
  for (const t of rows) {
    const st = stationOf(t.address)
    ;((out[stationShardOf(st)] ??= {})[st] ??= []).push(t.key)
  }
  return out
}

const heldStations = new Map<string, Map<string, string[]>>()

/** holdStationShard(id, seats) → keep a fetched station shard; a key whose sealed address does not name the station it
 *  is filed under (or names no sealed row at all) is dropped and counted, never held. */
export const holdStationShard = (id: string, seats: unknown): { held: number; refused: number } => {
  const ok = new Map<string, string[]>()
  let held = 0, refused = 0
  for (const [st, keys] of Object.entries(seats && typeof seats === 'object' ? seats as Record<string, unknown> : {})) {
    if (stationShardOf(st) !== id || !Array.isArray(keys)) { refused += Array.isArray(keys) ? keys.length : 1; continue }
    const kept: string[] = []
    for (const k of keys) {
      const a = typeof k === 'string' ? sealedAddressOf(k) : null
      if (a && stationOf(a) === st) { kept.push(k as string); held++ } else refused++
    }
    ok.set(st, kept)
  }
  heldStations.set(id, ok)
  return { held, refused }
}

/** stationKeys(station) → the sealed keys seated at a station, from its held shard; a shard this call has not read is
 *  asked for, by id. Only meaningful where the ledger is NOT resident (a host answers from its own index). */
export const stationKeys = (station: string): readonly string[] => {
  const id = stationShardOf(station)
  const shard = heldStations.get(id)
  if (!shard) throw new RowsNeeded([], { stations: [id] })
  return shard.get(String(station).toLowerCase()) ?? []
}
