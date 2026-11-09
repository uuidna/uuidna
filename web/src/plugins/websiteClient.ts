// The website's own routes are the interface. MCP, the LLMs, and the connectors call these
// paths. A find answer is the same route again, one call per document, plus any qpu block the
// document already holds. SEO is read from the instance, including its lexical text. Media
// continues as the file the upload names, then the sizes that file names. A related
// document is that route again, and its SEO is read once.

export const WEBSITE_ORIGIN = 'https://qpu.uuidna.com'
/** The Payload MCP plugin, a client of the routes below. It adds no catalogue of its own. */
export const WEBSITE_CLIENT = `${WEBSITE_ORIGIN}/api/mcp`
/** The one connector. Every name below fetches this plugin. */
export const QPU_CONNECTOR = { name: 'qpu' as const, plugin: 'qpuMcpPlugin' as const, api: WEBSITE_CLIENT, via: 'payload-api' as const }
/** Cursor, Claude, and every other connector. Each one is QPU_CONNECTOR. */
export const ADAPTED_CONNECTORS = ['cursor', 'claude', 'gemini', 'cirq-google', 'cloudflare', 'registry', 'oauth', 'drive', 'gmail', 'calendar'] as const

/** Next opens only through qpuMcpPlugin with a payload-mcp-api-keys Bearer. Values never travel in the tree. */
export const MCP_API_KEY = {
  collection: 'payload-mcp-api-keys' as const,
  header: 'Authorization' as const,
  scheme: 'Bearer' as const,
  named: 'QPU_MCP_API_KEY' as const,
  plugin: 'qpuMcpPlugin' as const,
  law: 'next only via qpuMcpPlugin with payload-mcp-api-keys' as const,
} as const

/** Bearer headers for /api/mcp. Empty or missing key → null (next refused). */
const payloadMcpAuth = (apiKey?: string) => {
  if (typeof apiKey !== 'string' || apiKey.length === 0) return null
  return { [MCP_API_KEY.header]: `${MCP_API_KEY.scheme} ${apiKey}` } as const
}

/** tools/list on the Payload API. The client fetches it. src is not the door. */
export const payloadMcpRequest = (origin = WEBSITE_ORIGIN) => {
  const api = `${origin.replace(/\/$/, '')}/api/mcp`
  return {
    plugin: 'qpuMcpPlugin' as const,
    api,
    method: 'POST' as const,
    src: false as const,
    fetched: false as const,
    body: { jsonrpc: '2.0' as const, id: 1, method: 'tools/list' as const, params: {} },
  }
}

const namedTools = (value: unknown): { name: string; description: string }[] | null => {
  if (!Array.isArray(value)) return null
  const doors: { name: string; description: string }[] = []
  const seen = new Set<string>()
  for (const row of value) {
    if (!row || typeof row !== 'object') continue
    const name = (row as { name?: unknown }).name
    if (typeof name !== 'string' || name.length === 0 || seen.has(name)) continue
    seen.add(name)
    const description = (row as { description?: unknown }).description
    doors.push({ name, description: typeof description === 'string' ? description : '' })
  }
  return doors
}

const toolsOf = (value: unknown): { name: string; description: string }[] | null => {
  if (!value || typeof value !== 'object') return null
  const row = value as { tools?: unknown; result?: unknown; structuredContent?: unknown; text?: unknown }
  const direct = namedTools(row.tools)
  if (direct) return direct
  if (row.result && typeof row.result === 'object') {
    const nested = toolsOf(row.result)
    if (nested) return nested
  }
  if (row.structuredContent && typeof row.structuredContent === 'object') {
    const nested = toolsOf(row.structuredContent)
    if (nested) return nested
  }
  if (typeof row.text === 'string') {
    try { return toolsOf(JSON.parse(row.text) as unknown) } catch { return null }
  }
  return null
}

/** Doors from a Payload API tools/list the client already fetched. Nothing is read from src. */
export const readPayloadMcp = (raw: unknown, origin = WEBSITE_ORIGIN) => {
  const request = payloadMcpRequest(origin)
  if (raw === undefined || raw === null || raw === false || raw === true) return { ...request, doors: [] as { name: string; description: string }[], refused: false }
  let value: unknown = raw
  if (typeof raw === 'string') {
    try { value = JSON.parse(raw) } catch { return { ...request, fetched: true as const, doors: [], refused: true } }
  }
  const doors = toolsOf(value)
  if (!doors) return { ...request, fetched: true as const, doors: [], refused: true }
  return { ...request, fetched: true as const, doors, refused: false }
}

type PageCall = { name: string; arguments: Record<string, unknown>; method: 'GET' | null; url: string | null; src: false; fetched: false }

const docsOf = (value: unknown): Record<string, unknown>[] | null => {
  if (Array.isArray(value)) return value.every((row) => !!row && typeof row === 'object') ? value as Record<string, unknown>[] : null
  if (!value || typeof value !== 'object') return null
  const row = value as { docs?: unknown; doc?: unknown; result?: unknown; structuredContent?: unknown; text?: unknown; id?: unknown }
  if (Array.isArray(row.docs)) return row.docs.filter((doc): doc is Record<string, unknown> => !!doc && typeof doc === 'object')
  if (row.doc && typeof row.doc === 'object') return [row.doc as Record<string, unknown>]
  if (row.result && typeof row.result === 'object') return docsOf(row.result)
  if (row.structuredContent && typeof row.structuredContent === 'object') return docsOf(row.structuredContent)
  if (typeof row.text === 'string') {
    try { return docsOf(JSON.parse(row.text) as unknown) } catch { return null }
  }
  if (idOf(row.id)) return [row as Record<string, unknown>]
  return null
}

const followIndex = (raw: unknown): ReadonlyMap<string, Record<string, unknown>> => {
  const index = new Map<string, Record<string, unknown>>()
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return index
  const row = raw as Record<string, unknown>
  for (const collection of ['media', 'pages', 'posts', 'case-studies'] as const) {
    const docs = docsOf(row[collection])
    if (!docs) continue
    for (const doc of docs) {
      const id = idOf(doc.id)
      if (id) index.set(`${collection}:${id}`, doc)
    }
  }
  return index
}

const pageCall = (call: { name: string; arguments: Record<string, unknown> }, collectionUrl: string, findName: string): PageCall => {
  if (call.name !== findName) return { name: call.name, arguments: call.arguments, method: null, url: null, src: false, fetched: false }
  const where = call.arguments.where
  const id = where && typeof where === 'object' && where !== null && 'id' in where ? (where as { id?: { equals?: unknown } }).id?.equals : undefined
  const url = typeof id === 'string' && id.length > 0 ? `${collectionUrl}?where[id][equals]=${encodeURIComponent(id)}` : collectionUrl
  return { name: call.name, arguments: call.arguments, method: 'GET', url, src: false, fetched: false }
}

/** The call after GET /api/pages. Each document is that route again, plus any qpu block it already holds. src is not a door. */
const payloadPagesNext = (raw: unknown = undefined, origin = WEBSITE_ORIGIN, collection = 'pages') => {
  const root = origin.replace(/\/$/, '')
  const route = WEBSITE_ROUTES.find((row) => row.collection === collection)
  const url = `${root}${route?.path ?? `/api/${collection}`}`
  const findName = route?.name ?? `find_${collection.replace(/-/g, '_')}`
  const base = { phase: 'next' as const, via: 'payload-api' as const, plugin: 'qpuMcpPlugin' as const, src: false as const, fetched: false as const, method: 'GET' as const, url, collection }
  if (raw === undefined || raw === null || raw === false || raw === true) {
    return { ...base, calls: [] as PageCall[], refused: false as const, says: `Next is GET ${url}. The client hands the documents back. Each document is that route again, plus any qpu block it already holds. SEO is read from that instance, and each relation is the following find. src is not a door. Nothing is fetched.` }
  }
  let value: unknown = raw
  if (typeof raw === 'string') {
    try { value = JSON.parse(raw) } catch { return { ...base, calls: [] as PageCall[], refused: true as const, says: 'The pages answer is not JSON. Nothing is fetched.' } }
  }
  const docs = docsOf(value)
  if (!docs) return { ...base, calls: [] as PageCall[], refused: true as const, says: 'The pages answer has no documents. Nothing is fetched.' }
  const follows = followIndex(value)
  const calls = docs.flatMap((doc) => executableCalls(collection, doc).map((call) => {
    const named = pageCall(call, url, findName)
    return { ...named, next: named.name === findName ? payloadSeoNext(doc, origin, follows) : null }
  }))
  return { ...base, calls, refused: false as const, says: `${docs.length} document(s). Each is GET ${url} again, plus any qpu block it already holds. SEO is read from that instance. src is not a door. Nothing is fetched.` }
}

/** The call after tools/list. Each door is tools/call on the same Payload API with a payload-mcp-api-keys Bearer. Without that key, next is refused. findDocuments continues as GET /api/pages, then one call per document. src is not a door. */
export const payloadMcpNext = (doors: readonly { name: string }[] = [], origin = WEBSITE_ORIGIN, pages?: unknown, apiKey?: string) => {
  const api = `${origin.replace(/\/$/, '')}/api/mcp`
  const root = origin.replace(/\/$/, '')
  const headers = payloadMcpAuth(apiKey)
  const base = {
    phase: 'next' as const,
    via: 'payload-api' as const,
    plugin: MCP_API_KEY.plugin,
    api,
    src: false as const,
    fetched: false as const,
    auth: MCP_API_KEY,
    law: MCP_API_KEY.law,
  }
  // a refusal is an involution, never a stop: without a key the plan still names every call, its header the binding the key comes from
  // (QPU_MCP_API_KEY, never a value), and stays refused and unkeyed until the binding holds one
  const keyed = headers !== null
  const sent: Record<string, string> = headers ?? { [MCP_API_KEY.header]: `${MCP_API_KEY.scheme} <${MCP_API_KEY.named}>` }
  const state = keyed ? { keyed: true as const, refused: false as const } : { keyed: false as const, refused: true as const }
  const bearer = keyed ? 'with a payload-mcp-api-keys Bearer' : `refused until ${MCP_API_KEY.named} names a payload-mcp-api-keys Bearer, then run as named`
  if (doors.length === 0) {
    const list = payloadMcpRequest(origin)
    return {
      ...base,
      ...state,
      calls: [{ name: 'tools/list' as const, method: list.method, url: list.api, headers: sent, body: list.body, route: null, next: null, src: false as const, fetched: false as const, plugin: MCP_API_KEY.plugin, api }],
      says: `Next is tools/list on the Payload API, ${bearer}. src is not a door. Nothing is fetched.`,
    }
  }
  const calls = doors.map((door) => {
    const find = door.name === 'findDocuments'
    return {
      name: door.name, plugin: MCP_API_KEY.plugin, api, method: 'POST' as const, headers: sent, src: false as const, fetched: false as const,
      body: { jsonrpc: '2.0' as const, id: 1, method: 'tools/call' as const, params: { name: door.name, arguments: find ? { slug: 'pages' } : {} } },
      route: find ? { method: 'GET' as const, url: `${root}/api/pages`, src: false as const, fetched: false as const } : null,
      next: find ? payloadPagesNext(pages, origin) : null,
    }
  })
  return {
    ...base,
    ...state,
    calls,
    says: `${calls.length} tools/call requests on the Payload API, ${bearer}. findDocuments continues as GET /api/pages, and each document is that route again. SEO is read from that instance. Media continues as the file the upload names. src is not a door. Nothing is fetched.`,
  }
}

export const WEBSITE_ROUTES = [
  { name: 'find_pages', method: 'GET' as const, path: '/api/pages', collection: 'pages', description: 'Find pages. meta.title and meta.description are the page, including its lexical text.' },
  { name: 'find_posts', method: 'GET' as const, path: '/api/posts', collection: 'posts', description: 'Find posts. meta is the post, including its lexical text.' },
  { name: 'find_case_studies', method: 'GET' as const, path: '/api/case-studies', collection: 'case-studies', description: 'Find case studies. meta is the study, including its lexical text.' },
  { name: 'find_media', method: 'GET' as const, path: '/api/media', collection: 'media', description: 'Find media uploads.' },
] as const

/**
 * One SEO surface for nested pages (plugin-seo + nested-docs). Do not redefine crumb / meta / path
 * in toolboxes — duplicate logic there scatters Search Console quality.
 */
export type Crumb = { doc: string; page: string; url: string; label: string }
export const crumb = (url: string, label: string, doc?: string): Crumb => {
  const id = doc ?? url.split('/').filter(Boolean).pop() ?? 'page'
  return { doc: id, page: id, url, label }
}

const RELATION_TO = ['pages', 'posts', 'case-studies'] as const
const IMAGE_KEYS = new Set(['image', 'media', 'featuredImage', 'thumbnail'])

const idOf = (value: unknown): string | null => {
  if (typeof value === 'string' && value.length > 0) return value
  if (typeof value === 'number') return String(value)
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    if (typeof id === 'string' && id.length > 0) return id
    if (typeof id === 'number') return String(id)
  }
  return null
}

const clip = (text: string): string => {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= 160) return clean
  const cut = clean
  const space = cut.lastIndexOf(' ')
  return (space > 80 ? cut.slice(0, space) : cut).trim()
}

const textsOf = (node: unknown, into: string[]) => {
  if (!node || typeof node !== 'object') return
  const children = (node as { children?: unknown }).children
  if (typeof (node as { text?: unknown }).text === 'string') into.push((node as { text: string }).text)
  if (Array.isArray(children)) children.forEach((child) => textsOf(child, into))
}

/** Title, description, image, and document relations read from one instance. Lexical text is part of the instance. */
export const seoFrom = (doc: Record<string, unknown>) => {
  const texts: string[] = []
  let heading = ''
  let image: string | null = null
  const relations: { relationTo: (typeof RELATION_TO)[number]; value: string }[] = []
  const seen = new Set<string>()
  const seenObjects = new WeakSet<object>()
  const addRelation = (relationTo: unknown, value: unknown) => {
    if (typeof relationTo !== 'string' || !(RELATION_TO as readonly string[]).includes(relationTo)) return
    const id = idOf(value)
    if (!id) return
    const key = `${relationTo}:${id}`
    if (seen.has(key)) return
    seen.add(key)
    relations.push({ relationTo: relationTo as (typeof RELATION_TO)[number], value: id })
  }
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    if (seenObjects.has(node)) return
    seenObjects.add(node)
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    const record = node as Record<string, unknown>
    if (record.type === 'text' && typeof record.text === 'string') texts.push(record.text)
    if (record.type === 'heading' && !heading) {
      const parts: string[] = []
      textsOf(record, parts)
      heading = parts.join('').trim()
    }
    if ((record.type === 'upload' || (record.type === 'relationship' && record.relationTo === 'media')) && !image) {
      image = idOf(record.value)
    }
    if ('relationTo' in record && 'value' in record) addRelation(record.relationTo, record.value)
    for (const [key, value] of Object.entries(record)) {
      if (key === 'meta' || key === 'createdAt' || key === 'updatedAt') continue
      if (IMAGE_KEYS.has(key) && !image) image = idOf(value)
      if (value && typeof value === 'object') walk(value)
    }
  }
  walk(doc)
  const title = typeof doc.title === 'string' && doc.title.trim() ? doc.title.trim() : heading
  return { title, description: clip(texts.join(' ')), image, relations }
}

/** SEO stored on the instance, or read from its lexical text when meta is empty. */
const instanceSeo = (doc: Record<string, unknown>) => {
  const computed = seoFrom(doc)
  const meta = doc.meta && typeof doc.meta === 'object' && !Array.isArray(doc.meta) ? doc.meta as Record<string, unknown> : {}
  const title = typeof meta.title === 'string' && meta.title.trim() ? meta.title.trim() : computed.title
  const description = typeof meta.description === 'string' && meta.description.trim() ? meta.description.trim() : computed.description
  const image = idOf(meta.image) ?? computed.image
  const relations = [...computed.relations]
  const seen = new Set(relations.map((relation) => `${relation.relationTo}:${relation.value}`))
  if (Array.isArray(meta.relations)) {
    for (const row of meta.relations) {
      if (!row || typeof row !== 'object') continue
      const relationTo = (row as { relationTo?: unknown }).relationTo
      const value = idOf((row as { value?: unknown }).value)
      if (typeof relationTo !== 'string' || !(RELATION_TO as readonly string[]).includes(relationTo) || !value) continue
      const key = `${relationTo}:${value}`
      if (seen.has(key)) continue
      seen.add(key)
      relations.push({ relationTo: relationTo as (typeof RELATION_TO)[number], value })
    }
  }
  return { title, description, image, relations }
}

const fileUrl = (rawUrl: string | null, filename: string | null, root: string): string | null => {
  if (rawUrl) {
    if (rawUrl.startsWith('https://') || rawUrl.startsWith('http://')) return rawUrl
    if (rawUrl.startsWith('/') && !rawUrl.startsWith('//')) return `${root}${rawUrl}`
    return null
  }
  if (filename && !filename.includes('/') && !filename.includes('\\') && filename !== '.' && filename !== '..') return `${root}/api/media/file/${encodeURIComponent(filename)}`
  return null
}

/** The call after GET /api/media. The upload continues as the file it names. src is not a door. */
const payloadMediaNext = (doc: Record<string, unknown> | undefined, origin = WEBSITE_ORIGIN, id = '') => {
  const root = origin.replace(/\/$/, '')
  const base = { phase: 'next' as const, via: 'payload-api' as const, plugin: 'qpuMcpPlugin' as const, collection: 'media' as const, src: false as const, fetched: false as const }
  if (!doc) return { ...base, file: null, calls: [] as { name: 'media-file'; method: 'GET'; url: string; src: false; fetched: false }[], refused: false as const, says: `Next is the file media ${id} names. The client hands the upload back. Nothing is fetched.` }
  const filename = typeof doc.filename === 'string' && doc.filename.length > 0 ? doc.filename : null
  const mimeType = typeof doc.mimeType === 'string' && doc.mimeType.length > 0 ? doc.mimeType : null
  const rawUrl = typeof doc.url === 'string' && doc.url.length > 0 ? doc.url : null
  const url = fileUrl(rawUrl, filename, root)
  const file = { filename, mimeType, url }
  if (!url) return { ...base, file, calls: [] as { name: 'media-file'; method: 'GET'; url: string; src: false; fetched: false; next: null }[], refused: true as const, says: 'The upload names no file. Nothing is fetched.' }
  return { ...base, file, calls: [{ name: 'media-file' as const, method: 'GET' as const, url, src: false as const, fetched: false as const, next: payloadFileNext(doc, origin, url) }], refused: false as const, says: `Next is GET ${url}. The sizes that file names follow. src is not a door. Nothing is fetched.` }
}

/** The call after the file. Each size the upload names is another file GET. src is not a door. */
const payloadFileNext = (doc: Record<string, unknown>, origin: string, current: string) => {
  const root = origin.replace(/\/$/, '')
  const alt = typeof doc.alt === 'string' && doc.alt.trim() ? doc.alt.trim() : null
  const seen = new Set<string>([current])
  const calls: { name: 'media-file'; method: 'GET'; url: string; src: false; fetched: false }[] = []
  const push = (rawUrl: string | null, filename: string | null) => {
    const url = fileUrl(rawUrl, filename, root)
    if (!url || seen.has(url)) return
    seen.add(url)
    calls.push({ name: 'media-file', method: 'GET', url, src: false, fetched: false })
  }
  const sizes = doc.sizes
  if (sizes && typeof sizes === 'object' && !Array.isArray(sizes)) {
    for (const value of Object.values(sizes)) {
      if (!value || typeof value !== 'object') continue
      const row = value as { url?: unknown; filename?: unknown }
      push(typeof row.url === 'string' ? row.url : null, typeof row.filename === 'string' ? row.filename : null)
    }
  }
  if (typeof doc.thumbnailURL === 'string') push(doc.thumbnailURL, null)
  return {
    phase: 'next' as const, via: 'payload-api' as const, plugin: 'qpuMcpPlugin' as const, src: false as const, fetched: false as const, alt, calls,
    says: calls.length > 0 ? `${calls.length} size(s) the upload names. src is not a door. Nothing is fetched.` : 'The upload names no further size. src is not a door. Nothing is fetched.',
  }
}

/** The call after a related document find. That document is its route again, plus any qpu block it already holds. Its SEO is read once. src is not a door. */
const payloadDocumentNext = (collection: string, doc: Record<string, unknown> | undefined, origin: string, id: string, follows: ReadonlyMap<string, Record<string, unknown>> = new Map(), depth = 0) => {
  const root = origin.replace(/\/$/, '')
  const route = WEBSITE_ROUTES.find((row) => row.collection === collection)
  const url = `${root}${route?.path ?? `/api/${collection}`}`
  const findName = route?.name ?? `find_${collection.replace(/-/g, '_')}`
  const base = { phase: 'next' as const, via: 'payload-api' as const, plugin: 'qpuMcpPlugin' as const, collection, src: false as const, fetched: false as const, method: 'GET' as const, url }
  if (!doc) return { ...base, calls: [] as (ReturnType<typeof pageCall> & { next: null })[], refused: false as const, says: `Next is GET ${url}. The client hands ${id} back. That document is the route again. Nothing is fetched.` }
  const calls = executableCalls(collection, doc).map((call) => {
    const named = pageCall(call, url, findName)
    const seo = named.name === findName && depth === 0 ? payloadSeoNext(doc, origin, follows, depth + 1) : null
    return { ...named, next: seo }
  })
  return { ...base, calls, refused: false as const, says: `${calls.length} call(s). The document is GET ${url} again, plus any qpu block it already holds. SEO is read once. src is not a door. Nothing is fetched.` }
}

/** The call after one document. SEO is the instance. An image is GET /api/media. A relation is that collection again. src is not a door. */
const payloadSeoNext = (doc: Record<string, unknown>, origin = WEBSITE_ORIGIN, follows: ReadonlyMap<string, Record<string, unknown>> = new Map(), depth = 0) => {
  const root = origin.replace(/\/$/, '')
  const seo = instanceSeo(doc)
  const calls: { name: string; method: 'GET'; url: string; src: false; fetched: false; next: ReturnType<typeof payloadMediaNext> | ReturnType<typeof payloadDocumentNext> }[] = []
  const push = (collection: string, id: string) => {
    const route = WEBSITE_ROUTES.find((row) => row.collection === collection)
    const path = route?.path ?? `/api/${collection}`
    const name = route?.name ?? `find_${collection.replace(/-/g, '_')}`
    const handed = follows.get(`${collection}:${id}`)
    const next = collection === 'media' ? payloadMediaNext(handed, origin, id) : payloadDocumentNext(collection, handed, origin, id, follows, depth)
    calls.push({ name, method: 'GET', url: `${root}${path}?where[id][equals]=${encodeURIComponent(id)}`, src: false, fetched: false, next })
  }
  if (seo.image) push('media', seo.image)
  for (const relation of seo.relations) push(relation.relationTo, relation.value)
  return {
    phase: 'next' as const, via: 'payload-api' as const, plugin: 'qpuMcpPlugin' as const, src: false as const, fetched: false as const,
    seo: { title: seo.title, description: seo.description, image: seo.image },
    calls,
    says: calls.length > 0 ? `${calls.length} find(s) read from the instance. Media continues as the file the upload names, then its sizes. A related document is that route again, and its SEO is read once. src is not a door. Nothing is fetched.` : 'SEO is read from the instance. No relation and no image name a further find. src is not a door. Nothing is fetched.',
  }
}

/** One document as route calls: each qpu block, then the website route that finds the document. */
const executableCalls = (collection: string, doc: Record<string, unknown>) => {
  const calls: { name: string; arguments: Record<string, unknown> }[] = []
  const seen = new WeakSet<object>()
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object' || seen.has(node)) return
    seen.add(node)
    if (Array.isArray(node)) {
      node.forEach(walk)
      return
    }
    const record = node as { blockType?: unknown; tool?: unknown; arguments?: unknown }
    if (record.blockType === 'qpu' && typeof record.tool === 'string') {
      const args = record.arguments && typeof record.arguments === 'object' && !Array.isArray(record.arguments) ? record.arguments as Record<string, unknown> : {}
      calls.push({ name: record.tool, arguments: args })
    }
    for (const value of Object.values(record)) if (value && typeof value === 'object') walk(value)
  }
  walk(doc.layout)
  const name = WEBSITE_ROUTES.find((route) => route.collection === collection)?.name ?? `find_${collection.replace(/-/g, '_')}`
  const id = idOf(doc.id) ?? idOf(doc)
  calls.push({ name, arguments: id ? { where: { id: { equals: id } } } : {} })
  return calls
}

type FindResponse = { content: { type: 'text'; text: string }[]; doc?: unknown; isError?: boolean; structuredContent?: unknown }

/** A find answer as the website route and one call per document. */
export const executableFind = (response: FindResponse, doc: Record<string, unknown>, input?: unknown): FindResponse => {
  if (response.isError) return response
  const slug = input && typeof input === 'object' && input !== null && 'slug' in input ? String((input as { slug?: unknown }).slug ?? '') : ''
  const many = doc.docs
  const docs = Array.isArray(many) ? many.filter((row): row is Record<string, unknown> => !!row && typeof row === 'object') : idOf(doc.id) ? [doc] : []
  const calls = docs.flatMap((row) => executableCalls(slug, row))
  // href is the website collection path; afterToolCall fuses `route` as the UUID program (dictionary entropy, then verified)
  const body = { href: slug ? `/api/${slug}` : null, calls }
  return { ...response, content: [{ type: 'text', text: JSON.stringify(body) }], structuredContent: body }
}

/** Function tools an LLM sends. Each one is a website route. */
export const llmTools = () => WEBSITE_ROUTES.map((route) => ({
  name: route.name,
  description: `${route.method} ${route.path}. ${route.description}`,
  input_schema: { type: 'object' as const, properties: { where: { type: 'object' }, limit: { type: 'integer' } } },
}))
