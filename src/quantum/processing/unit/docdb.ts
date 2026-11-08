/**
 * A DOCUMENT DATABASE WITH MONGODB SEMANTICS, ON WHATEVER STORE IT IS GIVEN.
 *
 * MongoDB's driver speaks a TCP wire protocol a Worker cannot open and Hyperdrive does not carry; what a program
 * needs from MongoDB is its data model and its query and update language. Those are implemented here in plain
 * TypeScript over a four-method store, so the same collection runs in memory, on the QPU's RAID over the STORAGE
 * (KV) and BLOBS (R2) bindings, or on anything else that can get, put, delete and list by prefix.
 *
 * Covered: filters with $eq $ne $gt $gte $lt $lte $in $nin $exists $regex/$options $not $and $or $nor $all $size
 * $elemMatch, implicit equality and array membership, dotted paths through arrays; updates with $set $unset $inc
 * $mul $min $max $push/$addToSet (with $each) $pull $pop $rename $setOnInsert $currentDate, or a replacement
 * document; upsert; sort (MongoDB's cross-type order), skip, limit, include/exclude projection; distinct; counts.
 * Not covered, and refused rather than guessed: aggregation pipelines, geo and text operators, transactions.
 */

export type DocId = string
export type Doc = { _id: DocId } & Record<string, unknown>
export type Filter = Record<string, unknown>
export type Update = Record<string, unknown>
export type SortSpec = Array<[path: string, direction: 1 | -1]>
export type FindOptions = { sort?: SortSpec; skip?: number; limit?: number; projection?: Record<string, 0 | 1 | boolean> }

/** The whole contract a store owes the database. */
export interface DocStore {
  get(key: string): Promise<unknown>
  put(key: string, value: unknown): Promise<void>
  del(key: string): Promise<void>
  keys(prefix: string): Promise<string[]>
}

/**
 * An in-memory DocStore (JSON-serialised values), for tests and Node.
 * @wing storage
 * @kind store
 */
export const memoryDocStore = (): DocStore => {
  const m = new Map<string, string>()
  return {
    get: async (k) => (m.has(k) ? JSON.parse(m.get(k)!) : undefined),
    put: async (k, v) => void m.set(k, JSON.stringify(v)),
    del: async (k) => void m.delete(k),
    keys: async (p) => [...m.keys()].filter((k) => k.startsWith(p)).sort(),
  }
}

// ---- paths -------------------------------------------------------------------------------------------------------
const isObj = (v: unknown): v is Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Every value a dotted path reaches, descending through arrays the way MongoDB does. */
const valuesAt = (v: unknown, path: string[]): unknown[] => {
  if (path.length === 0) return [v]
  const [head, ...rest] = path
  if (Array.isArray(v)) {
    const i = Number(head)
    if (Number.isInteger(i) && String(i) === head) return valuesAt(v[i], rest)
    return v.flatMap((x) => valuesAt(x, path))
  }
  if (!isObj(v) || !(head! in v)) return [undefined]
  return valuesAt(v[head!], rest)
}
const getPath = (doc: unknown, path: string): unknown => {
  let v: unknown = doc
  for (const p of path.split('.')) {
    if (Array.isArray(v)) v = v[Number(p)]
    else if (isObj(v)) v = v[p]
    else return undefined
  }
  return v
}
const setPath = (doc: Record<string, unknown>, path: string, value: unknown): void => {
  const parts = path.split('.')
  let v: Record<string, unknown> | unknown[] = doc
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i]!
    const next = Array.isArray(v) ? v[Number(p)] : v[p]
    if (next === null || typeof next !== 'object') {
      const fresh = /^\d+$/.test(parts[i + 1]!) ? [] : {}
      if (Array.isArray(v)) v[Number(p)] = fresh
      else v[p] = fresh
      v = fresh
    } else v = next as Record<string, unknown>
  }
  const last = parts[parts.length - 1]!
  if (Array.isArray(v)) v[Number(last)] = value
  else v[last] = value
}
const unsetPath = (doc: Record<string, unknown>, path: string): void => {
  const parts = path.split('.')
  const parent = parts.length === 1 ? doc : getPath(doc, parts.slice(0, -1).join('.'))
  if (Array.isArray(parent)) parent[Number(parts[parts.length - 1])] = null
  else if (isObj(parent)) delete parent[parts[parts.length - 1]!]
}

// ---- ordering ----------------------------------------------------------------------------------------------------
/** MongoDB's comparison order across types: null/undefined < numbers < strings < objects < arrays < booleans. */
const rank = (v: unknown): number =>
  v === null || v === undefined ? 1 : typeof v === 'number' ? 2 : typeof v === 'string' ? 3 : Array.isArray(v) ? 5 : isObj(v) ? 4 : typeof v === 'boolean' ? 6 : 7
/**
 * MongoDB comparison order across types: null/undefined < numbers < strings < objects < arrays < booleans; arrays element-wise.
 * @wing storage
 * @kind function
 */
export const compareValues = (a: unknown, b: unknown): number => {
  const ra = rank(a)
  const rb = rank(b)
  if (ra !== rb) return ra - rb
  if (ra === 2) return (a as number) - (b as number)
  if (ra === 3) return (a as string) < (b as string) ? -1 : (a as string) > (b as string) ? 1 : 0
  if (ra === 6) return Number(a) - Number(b)
  if (ra === 5) {
    const x = a as unknown[]
    const y = b as unknown[]
    for (let i = 0; i < Math.min(x.length, y.length); i++) {
      const c = compareValues(x[i], y[i])
      if (c !== 0) return c
    }
    return x.length - y.length
  }
  if (ra === 4) return compareValues(JSON.stringify(a), JSON.stringify(b))
  return 0
}
const equal = (a: unknown, b: unknown): boolean => (a === undefined ? b === null || b === undefined : compareValues(a, b) === 0 && rank(a) === rank(b))

// ---- matching ----------------------------------------------------------------------------------------------------
const regexOf = (pattern: unknown, options?: unknown): RegExp =>
  pattern instanceof RegExp ? pattern : new RegExp(String(pattern), typeof options === 'string' ? options.replace(/[^imsu]/g, '') : '')

const opMatch = (values: unknown[], op: string, arg: unknown, spec: Record<string, unknown>): boolean => {
  // a value that is an array also matches through its elements, as MongoDB's implicit array traversal does
  const flat = values.flatMap((v) => (Array.isArray(v) ? [v, ...v] : [v]))
  switch (op) {
    case '$eq': return flat.some((v) => equal(v, arg))
    case '$ne': return !flat.some((v) => equal(v, arg))
    case '$gt': return flat.some((v) => v !== undefined && rank(v) === rank(arg) && compareValues(v, arg) > 0)
    case '$gte': return flat.some((v) => v !== undefined && rank(v) === rank(arg) && compareValues(v, arg) >= 0)
    case '$lt': return flat.some((v) => v !== undefined && rank(v) === rank(arg) && compareValues(v, arg) < 0)
    case '$lte': return flat.some((v) => v !== undefined && rank(v) === rank(arg) && compareValues(v, arg) <= 0)
    case '$in': return (arg as unknown[]).some((a) => (a instanceof RegExp ? flat.some((v) => typeof v === 'string' && a.test(v)) : flat.some((v) => equal(v, a))))
    case '$nin': return !(arg as unknown[]).some((a) => flat.some((v) => equal(v, a)))
    case '$exists': return values.some((v) => v !== undefined) === Boolean(arg)
    case '$regex': { const r = regexOf(arg, spec.$options); return flat.some((v) => typeof v === 'string' && r.test(v)) }
    case '$options': return true
    case '$not': return !valueMatch(values, arg)
    case '$all': return (arg as unknown[]).every((a) => values.some((v) => Array.isArray(v) && v.some((x) => equal(x, a))))
    case '$size': return values.some((v) => Array.isArray(v) && v.length === arg)
    case '$elemMatch': return values.some((v) => Array.isArray(v) && v.some((x) => (isObj(x) ? matches(x, arg as Filter) : valueMatch([x], arg))))
  }
  throw new Error(`docdb: unsupported query operator ${op}`)
}
const valueMatch = (values: unknown[], cond: unknown): boolean => {
  if (cond instanceof RegExp) return values.some((v) => (Array.isArray(v) ? v : [v]).some((x) => typeof x === 'string' && cond.test(x)))
  if (isObj(cond) && Object.keys(cond).length > 0 && Object.keys(cond).every((k) => k.startsWith('$')))
    return Object.entries(cond).every(([op, arg]) => opMatch(values, op, arg, cond))
  return opMatch(values, '$eq', cond, {})
}
/**
 * Whether a document matches a MongoDB filter (operators, $and/$or/$nor, dotted paths through arrays).
 * @wing storage
 * @kind function
 */
export const matches = (doc: Record<string, unknown>, filter: Filter = {}): boolean =>
  Object.entries(filter).every(([key, cond]) => {
    if (key === '$and') return (cond as Filter[]).every((f) => matches(doc, f))
    if (key === '$or') return (cond as Filter[]).some((f) => matches(doc, f))
    if (key === '$nor') return !(cond as Filter[]).some((f) => matches(doc, f))
    if (key.startsWith('$')) throw new Error(`docdb: unsupported top-level operator ${key}`)
    return valueMatch(valuesAt(doc, key.split('.')), cond)
  })

// ---- updates -----------------------------------------------------------------------------------------------------
const clone = <T>(v: T): T => (v === undefined ? v : JSON.parse(JSON.stringify(v)))
/**
 * Apply a MongoDB update document (operators or a replacement) to a copy of a document; inserting enables $setOnInsert.
 * @wing storage
 * @kind function
 */
export const applyUpdate = (doc: Doc, update: Update, inserting = false): Doc => {
  const ops = Object.keys(update)
  if (ops.length > 0 && ops.every((k) => !k.startsWith('$'))) return { ...clone(update), _id: doc._id } as Doc
  const out = clone(doc)
  for (const [op, fields] of Object.entries(update)) {
    for (const [path, arg] of Object.entries(fields as Record<string, unknown>)) {
      const cur = getPath(out, path)
      const each = isObj(arg) && Array.isArray(arg.$each) ? (arg.$each as unknown[]) : [arg]
      switch (op) {
        case '$set': setPath(out, path, clone(arg)); break
        case '$setOnInsert': if (inserting) setPath(out, path, clone(arg)); break
        case '$unset': unsetPath(out, path); break
        case '$inc': setPath(out, path, (typeof cur === 'number' ? cur : 0) + (arg as number)); break
        case '$mul': setPath(out, path, (typeof cur === 'number' ? cur : 0) * (arg as number)); break
        case '$min': if (cur === undefined || compareValues(arg, cur) < 0) setPath(out, path, clone(arg)); break
        case '$max': if (cur === undefined || compareValues(arg, cur) > 0) setPath(out, path, clone(arg)); break
        case '$push': setPath(out, path, [...(Array.isArray(cur) ? cur : []), ...clone(each)]); break
        case '$addToSet': {
          const list = Array.isArray(cur) ? [...cur] : []
          for (const x of each) if (!list.some((y) => equal(y, x))) list.push(clone(x))
          setPath(out, path, list)
          break
        }
        case '$pull': if (Array.isArray(cur)) setPath(out, path, cur.filter((x) => !(isObj(arg) && isObj(x) ? matches(x, arg) : valueMatch([x], arg)))); break
        case '$pop': if (Array.isArray(cur)) setPath(out, path, (arg as number) === -1 ? cur.slice(1) : cur.slice(0, -1)); break
        case '$rename': if (cur !== undefined) { unsetPath(out, path); setPath(out, arg as string, cur) } break
        case '$currentDate': setPath(out, path, new Date().toISOString()); break
        default: throw new Error(`docdb: unsupported update operator ${op}`)
      }
    }
  }
  out._id = doc._id
  return out
}

// ---- projection, sort --------------------------------------------------------------------------------------------
/**
 * Apply an include or exclude projection to a document.
 * @wing storage
 * @kind function
 */
export const project = (doc: Doc, projection?: Record<string, 0 | 1 | boolean>): Record<string, unknown> => {
  if (!projection || Object.keys(projection).length === 0) return doc
  const include = Object.entries(projection).filter(([k, v]) => k !== '_id' && v).map(([k]) => k)
  if (include.length > 0) {
    const out: Record<string, unknown> = projection._id === 0 || projection._id === false ? {} : { _id: doc._id }
    for (const p of include) { const v = getPath(doc, p); if (v !== undefined) setPath(out, p, clone(v)) }
    return out
  }
  const out = clone(doc) as Record<string, unknown>
  for (const [k, v] of Object.entries(projection)) if (!v) unsetPath(out, k)
  return out
}
const sortDocs = (docs: Doc[], sort?: SortSpec): Doc[] =>
  !sort || sort.length === 0
    ? docs
    : [...docs].sort((a, b) => {
        for (const [p, d] of sort) {
          const c = compareValues(getPath(a, p), getPath(b, p))
          if (c !== 0) return c * d
        }
        return 0
      })

// ---- collections -------------------------------------------------------------------------------------------------
/** A value short and scalar enough to be part of an address: strings up to 256 characters, finite numbers, booleans. */
const indexable = (v: unknown): boolean => (typeof v === 'string' && v.length <= 256) || (typeof v === 'number' && Number.isFinite(v)) || typeof v === 'boolean'
/** The first top-level equality a filter requires (directly, as $eq, or inside $and): the address a find can start from. */
const equalityOf = (filter: Filter): [string, unknown] | undefined => {
  for (const [k, v] of Object.entries(filter)) {
    if (k === '$and' && Array.isArray(v)) for (const part of v) { const eq = equalityOf(part as Filter); if (eq) return eq }
    if (k.startsWith('$') || k.includes('.') || k === '_id') continue
    if (indexable(v)) return [k, v]
    if (isObj(v) && Object.keys(v).length === 1 && indexable((v as Record<string, unknown>).$eq)) return [k, (v as Record<string, unknown>).$eq]
  }
  return undefined
}

export type DocWriteHook = (event: { op: 'insert' | 'update' | 'delete'; collection: string; doc: Doc }) => void

/**
 * One collection over a DocStore: insert, find with sort/skip/limit/projection, count, distinct, update (with upsert), replace and delete.
 * @wing storage
 * @kind class
 */
export class DocCollection {
  constructor(
    private readonly store: DocStore,
    readonly name: string,
    private readonly idOf: (doc: Record<string, unknown>) => DocId,
    private readonly onWrite: DocWriteHook = () => {},
  ) {}
  // HEXBIT STORAGE: shard every key by the leading hex nibble of the id, so a collection spreads across a 16-way tree
  // (${name}/<nibble>/<id>) and no single prefix ever nears the scan bound — the full UUID space stays reachable, the
  // shard is a pure function of the id (near-zero temp, no recompute), and the shards read in parallel. A handle lower
  // than a byte (one hexbit = 4 bits) is the coordination key; deeper collections nest more nibbles. One scheme only:
  // a store that predates it is rebuilt (re-seeded by the families), never migrated through a slower read path.
  private shardOf = (id: DocId) => (id.match(/[0-9a-fA-F]/)?.[0] ?? '0').toLowerCase()
  private keyOf = (id: DocId) => `${this.name}/${this.shardOf(id)}/${encodeURIComponent(id)}`
  private readDoc = (id: DocId): Promise<unknown> => this.store.get(this.keyOf(id))
  /* EVERY SCALAR FIELD VALUE IS AN ADDRESS: <collection>#<field>=<value>/<nibble>/<id>, one key per document and value,
   * written with the document and sharded by the same hexbit so a value shared by many documents spreads across 16
   * bounded sub-prefixes. An equality is then a bounded prefix listing and the matching documents, never a scan of the
   * whole collection; there is no shared index document, so concurrent writers never read-modify-write the same key. */
  private addressOf = (field: string, value: unknown) => `${this.name}#${field}=${encodeURIComponent(JSON.stringify(value))}/`
  private addressKeyOf = (field: string, value: unknown, id: DocId) => `${this.addressOf(field, value)}${this.shardOf(id)}/${encodeURIComponent(id)}`
  private addressFieldsOf = (doc: Doc): Array<[string, unknown]> => Object.entries(doc).filter(([k, v]) => k !== '_id' && indexable(v))
  private async readdress(before: Doc | undefined, after: Doc | undefined): Promise<void> {
    const id = (after ?? before)?._id
    if (id === undefined) return
    const keyAt = (e: [string, unknown]) => this.addressKeyOf(e[0], e[1], id)
    const old = before ? this.addressFieldsOf(before) : []
    const now = after ? this.addressFieldsOf(after) : []
    const nowKeys = new Set(now.map(keyAt))
    const oldKeys = new Set(old.map(keyAt))
    await Promise.all([
      ...old.filter((e) => !nowKeys.has(keyAt(e))).map((e) => this.store.del(keyAt(e))),
      ...now.filter((e) => !oldKeys.has(keyAt(e))).map((e) => this.store.put(keyAt(e), 1)),
    ])
  }
  private async addressed(field: string, value: unknown): Promise<Doc[]> {
    const base = this.addressOf(field, value)
    // list each hexbit shard of the value-prefix separately so no sub-prefix nears the scan bound; the id is the final
    // '/'-separated segment (ids are percent-encoded, so they never contain a literal '/').
    const shards = '0123456789abcdef'.split('').map((nb) => `${base}${nb}/`)
    const lists = await Promise.all(shards.map((p) => this.store.keys(p)))
    const ids = [...new Set(lists.flat().map((k) => decodeURIComponent(k.slice(k.lastIndexOf('/') + 1))))]
    return (await Promise.all(ids.map((id) => this.readDoc(id)))).filter((d): d is Doc => isObj(d) && typeof d._id === 'string')
  }
  private async all(): Promise<Doc[]> {
    // list each hexbit shard separately so every prefix stays under the scan bound
    const shards = '0123456789abcdef'.split('').map((nb) => `${this.name}/${nb}/`)
    const lists = await Promise.all(shards.map((p) => this.store.keys(p)))
    const docs = await Promise.all(lists.flat().map((k) => this.store.get(k)))
    return docs.filter((d): d is Doc => isObj(d) && typeof d._id === 'string')
  }
  async insertOne(doc: Record<string, unknown>): Promise<Doc> {
    const _id = typeof doc._id === 'string' ? doc._id : this.idOf(doc)
    if ((await this.readDoc(_id)) !== undefined) throw new Error(`docdb: duplicate _id ${_id} in ${this.name}`)
    const stored = { ...clone(doc), _id } as Doc
    await Promise.all([this.store.put(this.keyOf(_id), stored), this.readdress(undefined, stored)])
    this.onWrite({ op: 'insert', collection: this.name, doc: stored })
    return stored
  }
  async insertMany(docs: Record<string, unknown>[]): Promise<Doc[]> {
    const out: Doc[] = []
    for (const d of docs) out.push(await this.insertOne(d))
    return out
  }
  // the matching documents for a filter (unsorted): by _id, by an indexed equality (addressed), else every doc —
  // the one store scan that find, countDocuments and findAndCount all build on, so none of them re-reads the shard set.
  private async matchingOf(filter: Filter): Promise<Doc[]> {
    const id = filter._id
    const eq = equalityOf(filter)
    const pool = typeof id === 'string' ? ([(await this.readDoc(id)) as Doc].filter(isObj) as Doc[]) : eq ? await this.addressed(...eq) : await this.all()
    return pool.filter((d) => matches(d, filter))
  }
  private pageOf(hit: Doc[], options: FindOptions): Record<string, unknown>[] {
    const sorted = sortDocs(hit, options.sort)
    const from = options.skip ?? 0
    const page = options.limit && options.limit > 0 ? sorted.slice(from, from + options.limit) : sorted.slice(from)
    return page.map((d) => project(d, options.projection))
  }
  async find(filter: Filter = {}, options: FindOptions = {}): Promise<Record<string, unknown>[]> {
    return this.pageOf(await this.matchingOf(filter), options)
  }
  async findOne(filter: Filter = {}, options: FindOptions = {}): Promise<Record<string, unknown> | null> {
    return (await this.find(filter, { ...options, limit: 1 }))[0] ?? null
  }
  // count the matches only — no sort, no projection, no slice (it used to re-run find(), sorting and projecting the whole
  // set just to take .length).
  async countDocuments(filter: Filter = {}): Promise<number> {
    return (await this.matchingOf(filter)).length
  }
  // a page AND its total from ONE scan, so a paginated read does not materialise the matching set twice (the page via
  // find plus the count via countDocuments were two independent shard scans).
  async findAndCount(filter: Filter = {}, options: FindOptions = {}): Promise<{ docs: Record<string, unknown>[]; total: number }> {
    const hit = await this.matchingOf(filter)
    return { docs: this.pageOf(hit, options), total: hit.length }
  }
  async distinct(path: string, filter: Filter = {}): Promise<unknown[]> {
    const out: unknown[] = []
    for (const d of await this.find(filter)) for (const v of valuesAt(d, path.split('.')).flatMap((x) => (Array.isArray(x) ? x : [x])))
      if (v !== undefined && !out.some((y) => equal(y, v))) out.push(v)
    return out.sort(compareValues)
  }
  private async write(before: Doc, doc: Doc): Promise<Doc> {
    await Promise.all([this.store.put(this.keyOf(doc._id), doc), this.readdress(before, doc)])
    this.onWrite({ op: 'update', collection: this.name, doc })
    return doc
  }
  async updateOne(filter: Filter, update: Update, options: { upsert?: boolean; sort?: SortSpec } = {}): Promise<{ matched: number; modified: number; upserted?: Doc; doc?: Doc }> {
    const found = (await this.find(filter, { sort: options.sort, limit: 1 }))[0] as Doc | undefined
    if (found) {
      const doc = await this.write(found, applyUpdate(found, update))
      return { matched: 1, modified: 1, doc }
    }
    if (!options.upsert) return { matched: 0, modified: 0 }
    const seed = Object.fromEntries(Object.entries(filter).filter(([k, v]) => !k.startsWith('$') && !(isObj(v) && Object.keys(v).some((x) => x.startsWith('$')))))
    const base = { ...seed, _id: typeof seed._id === 'string' ? seed._id : this.idOf(seed) } as Doc
    const upserted = await this.insertOne(applyUpdate(base, update, true))
    return { matched: 0, modified: 0, upserted, doc: upserted }
  }
  async updateMany(filter: Filter, update: Update, options: { sort?: SortSpec; limit?: number } = {}): Promise<Doc[]> {
    const hit = (await this.find(filter, { sort: options.sort, limit: options.limit })) as Doc[]
    const out: Doc[] = []
    for (const d of hit) out.push(await this.write(d, applyUpdate(d, update)))
    return out
  }
  async replaceOne(filter: Filter, replacement: Record<string, unknown>, options: { upsert?: boolean } = {}) {
    const { _id: _ignored, ...rest } = replacement
    return this.updateOne(filter, rest, options)
  }
  async deleteOne(filter: Filter): Promise<Doc | null> {
    const found = (await this.find(filter, { limit: 1 }))[0] as Doc | undefined
    if (!found) return null
    await Promise.all([this.store.del(this.keyOf(found._id)), this.readdress(found, undefined)])
    this.onWrite({ op: 'delete', collection: this.name, doc: found })
    return found
  }
  async deleteMany(filter: Filter): Promise<number> {
    const hit = (await this.find(filter)) as Doc[]
    for (const d of hit) {
      await Promise.all([this.store.del(this.keyOf(d._id)), this.readdress(d, undefined)])
      this.onWrite({ op: 'delete', collection: this.name, doc: d })
    }
    return hit.length
  }
}

/**
 * A database: named collections over one store, one id function and one write hook.
 * @wing storage
 * @kind builder
 */
export const docDbOf = (store: DocStore, name: string, idOf: (collection: string, doc: Record<string, unknown>) => DocId, onWrite?: DocWriteHook) => {
  const cache = new Map<string, DocCollection>()
  return {
    name,
    collection: (c: string): DocCollection =>
      cache.get(c) ?? cache.set(c, new DocCollection(store, `${name}/${c}`, (doc) => idOf(c, doc), onWrite)).get(c)!,
  }
}

/** The part of a D1 binding a document store needs: prepared statements with bound parameters. */
export type D1Like = {
  prepare(sql: string): { bind(...values: unknown[]): { first<T = Record<string, unknown>>(): Promise<T | null>; run(): Promise<unknown>; all<T = Record<string, unknown>>(): Promise<{ results: T[] }> } }
}

/**
 * A document store on a D1 binding: one key/value table, prefix listing by range, so it never scans past its prefix.
 * @wing storage
 * @kind store
 */
export const d1DocStore = (d1: D1Like, table = 'docs'): DocStore => {
  let ready: Promise<unknown> | undefined
  const init = () => (ready ??= d1.prepare(`CREATE TABLE IF NOT EXISTS ${table} (k TEXT PRIMARY KEY, v TEXT NOT NULL)`).bind().run())
  return {
    get: async (k) => {
      await init()
      const row = await d1.prepare(`SELECT v FROM ${table} WHERE k = ?`).bind(k).first<{ v: string }>()
      return row ? JSON.parse(row.v) : undefined
    },
    put: async (k, v) => {
      await init()
      await d1.prepare(`INSERT INTO ${table} (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v`).bind(k, JSON.stringify(v)).run()
    },
    del: async (k) => {
      await init()
      await d1.prepare(`DELETE FROM ${table} WHERE k = ?`).bind(k).run()
    },
    keys: async (p) => {
      await init()
      const { results } = await d1.prepare(`SELECT k FROM ${table} WHERE k >= ? AND k < ? ORDER BY k`).bind(p, `${p}￿`).all<{ k: string }>()
      return results.map((r) => r.k)
    },
  }
}
