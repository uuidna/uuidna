import { packageVersion } from '../quantum/processing/unit/version.js'
import { contentUuidOf, facesOf, hexRegisterOf, qpuHexUuidOf, mcpFuseOf, schemaMethodsOf, uuidReceiptOf, type QpuMethod } from '../quantum/processing/unit/index.js'
import { crossFormulaOf } from '../families/cross/index.js'

/** EVERY PUBLIC API IS AN ADDRESS. The APIs.guru registry lists every public API with an OpenAPI document; the unit
 *  reads the registry, reads an API's document, and derives its operations (schemaMethodsOf). A request is then a
 *  hex program of the family `api`: call(i, j, s) — the i-th API of the registry, its j-th operation, the s-th
 *  parameter choice — three 16-bit naturals in one RFC 9562 v8 UUID. Nothing names an API by hand: the registry
 *  orders them, the document orders the operations, the parameters are content-addressed. The fused door `api`
 *  lists, resolves and calls through that address. Reads only (GET): reads need no auth. */

const REGISTRY = 'https://api.apis.guru/v2/list.json'
const WINDOW = 600000
// a spec, once read, stays for the run: a local walk sets QPU_SPEC_WINDOW_MS so a family does not re-read the specs a family before it read
const SPEC_WINDOW = Number(globalThis.process?.env?.QPU_SPEC_WINDOW_MS) || WINDOW
const ua = { 'user-agent': `qpu.uuidna.com/${packageVersion} (+https://qpu.uuidna.com)` }

type Entry = { preferred?: string; versions?: Record<string, { swaggerUrl?: string; info?: { title?: string; 'x-apisguru-categories'?: string[] } }> }
type Param = { name: string; in: string; required: boolean }
export type Operation = { index: number; verb: string; path: string; operationId?: string; params: Param[]; required: string[]; takes: number; gives: number }
export type Api = { index: number; api: string; title: string; spec: string; categories: string[]; server: string; guessed?: boolean; secured?: boolean; operations: Operation[]; why?: string }

let registry: { at: number; names: string[]; entries: Record<string, Entry> } | undefined
const specs = new Map<string, { at: number; api: Promise<Api> }>()

// a read is tried twice: a moment's failure (a timeout, a dropped connection) is not the document's state
const json = async (url: string, accept = 'application/json'): Promise<unknown> => {
  for (let attempt = 0; ; attempt++) {
    try {
      const r = await fetch(url, { headers: { accept, ...ua } })
      if (!r.ok) throw new Error(`${url} answered ${r.status}`)
      return JSON.parse(await r.text())
    } catch (e) {
      if (attempt === 1 || /answered \d{3}/.test(String((e as Error).message))) throw e
    }
  }
}

/** The registry as it stands: every API name in order, read once per window. */
export const apiRegistryOf = async () => {
  if (registry && Date.now() - registry.at < WINDOW) return registry
  // the snapshot the walk wrote (scripts/receipt.mjs registry): the registry as of its date, a few hundred KB,
  // read where the live 8 MB list is more than an isolate holds; absent, the live list
  const snapshot = (await import('./registry.js').catch(() => null)) as { REGISTRY_SNAPSHOT?: Record<string, Entry> } | null
  const entries = snapshot?.REGISTRY_SNAPSHOT ?? ((await json(REGISTRY)) as Record<string, Entry>)
  return (registry = { at: Date.now(), names: Object.keys(entries).sort(), entries })
}

// the server an OpenAPI 3 or Swagger 2 document names, resolved against the document's own address
const serverOf = (doc: Record<string, unknown>, spec: string, api = ''): string => {
  const servers = doc.servers as { url?: string }[] | undefined
  if (servers?.[0]?.url) return new URL(servers[0].url.replace(/\{[^}]+\}/g, 'v1'), spec).toString().replace(/\/$/, '')
  // a document that names no host: the registry names the API by its domain, and that domain with the document's
  // base path is the one computable address — tried, and named as a guess in the reading when it is one
  const host = (doc.host as string | undefined) ?? (api.split(':')[0] || undefined)
  if (!host) return ''
  const scheme = ((doc.schemes as string[] | undefined) ?? ['https'])[0]
  return `${scheme}://${host}${((doc.basePath as string | undefined) ?? '').replace(/\/$/, '')}`
}

const operationsOf = (doc: Record<string, unknown>, methods: QpuMethod[]): Operation[] => {
  const paths = (doc.paths ?? {}) as Record<string, Record<string, { parameters?: Param[] }> & { parameters?: Param[] }>
  return methods.map((m, index) => {
    const item = paths[m.path] ?? {}
    const op = item[m.verb] ?? {}
    const params = [...(item.parameters ?? []), ...(op.parameters ?? [])].filter((p) => typeof p?.name === 'string').map((p) => ({ name: p.name, in: String(p.in ?? 'query'), required: p.required === true || p.in === 'path' }))
    return { index, verb: m.verb, path: m.path, ...(m.operationId ? { operationId: m.operationId } : {}), params, required: params.filter((p) => p.required).map((p) => p.name), takes: m.takes.length, gives: m.gives.length }
  })
}

/** One API of the registry, by index or name: its document read, its operations derived in the document's order. */
export const apiOf = async (which: number | string): Promise<Api> => {
  const reg = await apiRegistryOf()
  const index = typeof which === 'number' ? which : reg.names.indexOf(which)
  const api = reg.names[index]
  if (api === undefined) throw new Error(`no API ${which} in the registry of ${reg.names.length}`)
  const hit = specs.get(api)
  if (hit && Date.now() - hit.at < SPEC_WINDOW) return hit.api
  const promise = (async (): Promise<Api> => {
    const entry = reg.entries[api] ?? {}
    const version = entry.versions?.[entry.preferred ?? ''] ?? {}
    const base = { index, api, title: version.info?.title ?? api, spec: version.swaggerUrl ?? '', categories: version.info?.['x-apisguru-categories'] ?? [], server: '', operations: [] as Operation[] }
    if (!base.spec) return { ...base, why: 'no spec url' }
    try {
      const doc = (await json(base.spec)) as Record<string, unknown>
      // secured: the document asks a credential of every request (a global security requirement, or schemes it declares)
      const schemes = Object.keys(((doc.components as { securitySchemes?: object } | undefined)?.securitySchemes ?? (doc.securityDefinitions as object | undefined) ?? {}))
      const secured = (Array.isArray(doc.security) && doc.security.length > 0) || schemes.length > 0
      return { ...base, server: serverOf(doc, base.spec, api), ...(doc.servers || doc.host ? {} : { guessed: true }), secured, operations: operationsOf(doc, schemaMethodsOf(api, doc)) }
    } catch (e) {
      return { ...base, why: (e as Error).name === 'TimeoutError' ? 'timeout' : (e as Error).message }
    }
  })()
  specs.set(api, { at: Date.now(), api: promise })
  return promise
}

/** The address of a request: the s-th parameter choice is the content address of the parameters, folded to 16 bits. */
export const apiSeedOf = (params: Record<string, unknown>): number => (Object.keys(params).length ? parseInt(contentUuidOf(params).slice(0, 4), 16) : 0)

// the request an operation makes with these parameters: path parameters templated, the rest as the query
const urlOf = (api: Api, op: Operation, params: Record<string, unknown>): string => {
  let path = op.path
  const query = new URLSearchParams()
  for (const p of op.params) {
    const v = params[p.name]
    if (v === undefined) continue
    if (p.in === 'path') path = path.replace(`{${p.name}}`, encodeURIComponent(String(v)))
    else if (p.in === 'query') query.set(p.name, String(v))
  }
  const q = query.toString()
  return `${api.server}${path}${q ? `?${q}` : ''}`
}

export type Reading = { api: string; index: number; operation: number; verb: string; url: string; status: number; type: string; bytes: number; excerpt: unknown; receipt: string; hex?: string; why?: string }

/** The request, made: a GET through the address, its answer read (an excerpt), minted into a receipt. Other verbs
 *  are resolved to their URL but not made: reads need no auth, writes are not the unit's to make. */
export const apiCallOf = async (which: number | string, operation: number, params: Record<string, unknown> = {}, readOnly = false): Promise<Reading> => {
  const api = await apiOf(which)
  const op = api.operations[operation]
  const seed = apiSeedOf(params)
  const hex = (() => { try { return qpuHexUuidOf({ family: 'api', program: ['call'], params: [api.index, operation, seed] }) } catch { return undefined } })()
  const base = { api: api.api, index: api.index, operation, verb: op?.verb ?? '', url: '', status: 0, type: '', bytes: 0, excerpt: null as unknown, ...(hex ? { hex } : {}) }
  const sealed = (r: Omit<Reading, 'receipt'>): Reading => ({ ...r, receipt: uuidReceiptOf(`api ${r.api}`, contentUuidOf({ url: r.url, status: r.status, excerpt: r.excerpt }), { status: r.status }, r.url).uuid })
  if (!op) return sealed({ ...base, why: api.why ?? `no operation ${operation} of ${api.operations.length}` })
  if (!api.server) return sealed({ ...base, why: 'the document names no server: resolved to a path, not an address' })
  const url = urlOf(api, op, params)
  const missing = op.required.filter((name) => params[name] === undefined)
  if (missing.length) return sealed({ ...base, url, why: `required: ${missing.join(', ')}` })
  // ALL CRUD, SECURELY. A GET is a read, always made. A write (post/put/patch/delete/…) is made ONLY with the caller's
  // OWN credential in { authorization } — QPU adds none of its own, targets only the spec's resolved URL (api.server +
  // path, no host injection), bounds by the deadline, and never receipts the credential (the receipt folds url/status/
  // excerpt only). Without it a write is resolved, not made — so the pure api.call(i, j, s) formula, which passes no
  // credential, stays a read and stays reproducible. The write is the caller's, authorised by the caller, proxied once.
  // PIN THE CREDENTIAL TO THE API'S OWN HOST (Wave XIII). serverOf trusts the URL the fetched spec names, so a spec
  // could point the server at another host and the caller's authorization would follow it. The credential is sent ONLY
  // when the resolved URL's host is the API's own registered domain (or a subdomain of it); otherwise it is withheld and
  // the reading says so — the call still goes (likely 401), the token never leaks to a host the API did not claim.
  const expectedHost = api.api.split('/')[0]!.split(':')[0]!.toLowerCase()
  const urlHost = (() => { try { return new URL(url).host.toLowerCase() } catch { return '' } })()
  const sameHost = urlHost !== '' && (urlHost === expectedHost || urlHost.endsWith('.' + expectedHost))
  const offered = typeof params.authorization === 'string' ? params.authorization : ''
  const credential = sameHost ? offered : ''
  const credentialWithheld = offered && !sameHost ? { credentialWithheld: urlHost, expected: expectedHost } : {}
  const body = op.verb === 'get' || params.body === undefined ? undefined : typeof params.body === 'string' ? params.body : JSON.stringify(params.body)
  // Every verb the caller names is MADE. The only path that does not is the pure api.call(i, j, s) FORMULA (readOnly):
  // a content-addressed computation stays reproducible by construction — on replay it fires no external write, or the
  // receipt model breaks (determinism). The tool fires any verb. QPU sends only the caller's own { authorization } (none of its own secrets),
  // to the spec's resolved server+path (no host injection), within the deadline; the credential is never receipted.
  if (op.verb !== 'get' && readOnly) return sealed({ ...base, url, why: `${op.verb} is a write: not made from the reproducible api.call(i, j, s) formula — call the api tool { api, operation, params } to make it` })
  const headers: Record<string, string> = { accept: 'application/json, */*;q=0.5', ...ua, ...(credential ? { authorization: credential } : {}), ...(body !== undefined ? { 'content-type': 'application/json' } : {}) }
  const once = () => fetch(url, { method: op.verb.toUpperCase(), headers, ...(body !== undefined ? { body } : {}) })
  try {
    const r = await once().catch(once)
    const type = r.headers.get('content-type') ?? ''
    // the whole body is read: no size or time cap truncates what the API answers
    const text = await r.text()
    let excerpt: unknown = text
    if (/json/.test(type)) { try { excerpt = JSON.parse(text) } catch { /* the text stands */ } }
    return sealed({ ...base, url, status: r.status, type, bytes: text.length, excerpt, ...credentialWithheld })
  } catch (e) {
    return sealed({ ...base, url, why: (e as Error).name === 'TimeoutError' ? 'timeout' : (e as Error).message })
  }
}

// the family `api`: operations(i) counts an API's operations; call(i, j, s) makes its j-th operation's request
hexRegisterOf('api', 'operations', (async (i: number) => {
  const api = await apiOf(i)
  return crossFormulaOf({ id: 'api-operations', src: 'api', dst: 'fusion', formula: 'operations(i) = |paths × verbs| of the i-th API', value: api.operations.length, proof: api.spec || REGISTRY }, api.why === undefined, { name: 'api.operations', params: [i] })
}) as (...x: unknown[]) => unknown)
hexRegisterOf('api', 'call', (async (i: number, j: number, s: number) => {
  const r = await apiCallOf(i, j, s === 0 ? {} : { seed: s }, true)
  return crossFormulaOf({ id: 'api-call', src: 'api', dst: 'fusion', formula: 'call(i, j, s): the s-th request of the j-th operation of the i-th API; value its HTTP status', value: r.status, proof: r.url || REGISTRY }, r.why === undefined, { name: 'api.call', params: [i, j, s] })
}) as (...x: unknown[]) => unknown)

/** Every API of the registry walked: fused when its document was read and its operations derived, used when its first
 *  read operation that needs no parameter was called and answered. { from, take } slices the walk. */
export const apiWalkOf = async (from = 0, take = Infinity, concurrency = 8) => {
  const reg = await apiRegistryOf()
  const names = reg.names.slice(from, from + take)
  const rows: { api: string; index: number; fused: boolean; operations: number; used: boolean; status: number; operation?: number; url?: string; why?: string }[] = new Array(names.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(concurrency, names.length) }, async () => {
    for (;;) {
      const k = next++
      if (k >= names.length) return
      const api = await apiOf(from + k)
      const free = api.operations.find((op) => op.verb === 'get' && op.required.length === 0)
      if (!free || api.why) { rows[k] = { api: api.api, index: api.index, fused: api.why === undefined, operations: api.operations.length, used: false, status: 0, why: api.why ?? 'no read without parameters' }; continue }
      const r = await apiCallOf(from + k, free.index)
      rows[k] = { api: api.api, index: api.index, fused: true, operations: api.operations.length, used: r.status > 0, status: r.status, operation: free.index, url: r.url, ...(r.why ? { why: r.why } : {}) }
    }
  }))
  return { kind: 'api-walk' as const, registry: REGISTRY, listed: reg.names.length, from, take: names.length, next: from + names.length < reg.names.length ? from + names.length : null, fused: rows.filter((r) => r.fused).length, used: rows.filter((r) => r.used).length, rows }
}

/** The registry searched: every API whose name, title or category holds a word, and — for the first `take` of them,
 *  their documents read — the operations whose path or operationId holds a word. The words are not listed here: a
 *  family's formula names are the words a human request carries (sun, design, kin, lunar, hexagram…). */
export const apiSearchOf = async (words: string[], take = 14, from = 0) => {
  const reg = await apiRegistryOf()
  const terms = words.map((w) => w.toLowerCase()).filter((w) => w.length > 2)
  const hit = (s: string) => terms.some((w) => s.toLowerCase().includes(w))
  const named = reg.names.map((api, index) => ({ api, index, entry: reg.entries[api] ?? {} })).filter(({ api, entry }) => {
    const v = entry.versions?.[entry.preferred ?? ''] ?? {}
    return hit(api) || hit(v.info?.title ?? '') || (v.info?.['x-apisguru-categories'] ?? []).some(hit)
  })
  // `take` APIs that can be read without a parameter, found among the matches a slice at a time: a name is not a read
  const read: { api: string; index: number; title: string; categories: string[]; server: string; operations: { index: number; verb: string; path: string; required: string[] }[]; free?: number }[] = []
  let scanned = from
  // one slice of documents per call from `from` (an isolate reads fourteen, not fifty-six); `more` names the matches
  // not yet read and `next` where the following call starts, so a caller scans the whole registry slice by slice
  while (read.filter((x) => x.free !== undefined).length < take && scanned < named.length && scanned < from + take) {
    const batch = await Promise.all(named.slice(scanned, scanned + take).map(async ({ index }) => {
      const api = await apiOf(index)
      return { api: api.api, index, title: api.title, categories: api.categories, server: api.server, operations: api.operations.filter((op) => hit(op.path) || hit(op.operationId ?? '')).map((op) => ({ index: op.index, verb: op.verb, path: op.path, required: op.required })), free: api.server ? api.operations.find((op) => op.verb === 'get' && op.required.length === 0)?.index : undefined }
    }))
    read.push(...batch)
    scanned += take
  }
  return { kind: 'api-search' as const, words: terms, matched: named.length, from, scanned, read: read.length, readable: read.filter((x) => x.free !== undefined).length, apis: read, more: named.slice(scanned).map((x) => x.api), ...(scanned < named.length ? { next: scanned } : {}) }
}

mcpFuseOf('api', {
  description: "Every public API as an address: {} the registry and how to address it; { api } (name or index) its operations; { api, operation, params } makes that read through api.call(i, j, s) and returns the reading with its hex address; { walk: true, from, take } walks a slice of the registry (fused: document read; used: a read made); { search } finds APIs by words in their names, titles, categories and operations.",
  inputSchema: { type: 'object', properties: { api: { type: ['string', 'integer'] }, operation: { type: 'integer' }, params: { type: 'object' }, walk: { type: 'boolean' }, from: { type: 'integer' }, take: { type: 'integer' }, search: { type: ['string', 'array'], items: { type: 'string' } } } },
  run: async (a) => {
    // unlocked: with no `take` the whole registry is walked or searched, not a slice of faces; from/take still slice when asked
    if (a.search !== undefined) return apiSearchOf(Array.isArray(a.search) ? a.search.map(String) : String(a.search).split(/[\s,]+/), typeof a.take === 'number' ? a.take : Infinity, typeof a.from === 'number' ? a.from : 0)
    if (a.walk === true) return apiWalkOf(typeof a.from === 'number' ? a.from : 0, typeof a.take === 'number' ? a.take : Infinity)
    if (a.api === undefined) {
      const reg = await apiRegistryOf()
      return { kind: 'api' as const, registry: REGISTRY, listed: reg.names.length, address: 'api.call(i, j, s): the i-th API of the registry, its j-th operation, the s-th parameter choice — one hex-program UUID', first: reg.names.slice(0, facesOf().faces), holds: reg.names.length > 0 }
    }
    const which = typeof a.api === 'number' ? a.api : String(a.api)
    if (typeof a.operation !== 'number') {
      const api = await apiOf(which)
      return { kind: 'api' as const, ...api, holds: api.why === undefined }
    }
    const r = await apiCallOf(which, a.operation, typeof a.params === 'object' && a.params !== null ? (a.params as Record<string, unknown>) : {})
    return { kind: 'api' as const, ...r, holds: r.status >= 200 && r.status < 300 }
  },
})
