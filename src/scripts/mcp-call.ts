#!/usr/bin/env node
// @non-harmonic: speaks JSON-RPC to the hosted door over the network (fetch, await) and reads argv — a named boundary;
// every value it prints is computed by the door's own tools, never here.
//
// mcp-call — THE DOOR, ONE COMMAND AWAY, and shorter than the bypass it replaces. The captain's laws: "only mcp use is
// allowed", "use only qpu for computations", "let mcp handle all", and (2026-09-15) "make sure it is easier not to
// bypass". Sessions had been computing with `node --input-type=module -e "import … from './dist/…'"` because the tools
// sat behind a lookup and qpu was not reachable from the shell. This is the same answer, in fewer keystrokes, through
// the door:
//
//   npm run mcp -- <tool> ['<json>' | key=value …]   tools/call on https://uuidna.com/mcp — the edge reaches qpu over
//                                                     its service binding; prints the tool's JSON, not the envelope
//   npm run mcp -- <tool> … --local                  the same callTool over dist, in-process, labelled "computed locally"
//   npm run mcp -- list [words…] [--local]           the door's search (list_tools {query}), else a keyword filter
//
// A name is tried as typed, then with the uuidna_ prefix added or removed, so the catalogue's ids and the door's
// standard names (src/mcp-names.ts) both answer, on whichever surface is live. The site serves what its last ship
// carried: a tool it does not know is said plainly, with the --local line to run instead. UUIDNA_MCP_URL (or --url=)
// points it at another door, e.g. https://qpu.uuidna.com/mcp. No runtime dependency: node's own fetch.
import { pathToFileURL } from 'node:url'

export const ENDPOINT = 'https://uuidna.com/mcp'
export const PREFIX = 'uuidna_'
/** the list door's names — standard, then catalogue id (src/mcp-door.ts LIST_NAME / LIST) */
export const LIST_DOORS = ['list_tools', 'uuidna_list_tools'] as const
/** the first call door, whose {q} is a search on surfaces that predate list_tools */
export const FIRST_DOOR = 'uuidna_call'

export const USAGE = [
  'npm run mcp -- <tool> [\'<json-arguments>\' | key=value …] [--local]',
  'npm run mcp -- list [words…] [--local]',
  '',
  '  default   tools/call on the hosted door https://uuidna.com/mcp (it reaches qpu); prints the tool\'s JSON',
  '  --local   the same callTool over dist, in-process — labelled "computed locally"',
  '  list      the door\'s own search (list_tools {query}); a keyword filter where the door predates it',
  '  names     uuidna_handle and handle both answer; a-b is read as a_b',
  '  env       UUIDNA_MCP_URL=<door> (or --url=<door>) calls another door, e.g. https://qpu.uuidna.com/mcp',
  '',
  'examples:  npm run mcp -- uuidna_address value=hello',
  '           npm run mcp -- uuidna_decide \'{"input":"2 + 2 = 4"}\'',
  '           npm run mcp -- list merkle',
].join('\n')

// ── argv ─────────────────────────────────────────────────────────────────────────────────────────────────────────
export interface Parsed { mode: 'call' | 'list' | 'help'; tool: string; args: Record<string, unknown>; words: string[]; local: boolean; url: string }

const valueOf = (s: string): unknown => { try { return JSON.parse(s) } catch { return s } }

/** argsOf(tail) → the tool's arguments: ONE JSON object, or key=value pairs (a value that parses as JSON — a number,
 *  true, an array — is that value; anything else is the text as typed) */
export function argsOf(tail: readonly string[]): Record<string, unknown> {
  if (!tail.length) return {}
  const first = tail[0]!.trim()
  if (first.startsWith('{')) {
    if (tail.length > 1) throw new Error('the arguments are ONE JSON object — quote it whole: \'{"key":"value"}\'')
    let v: unknown
    try { v = JSON.parse(first) } catch (e) { throw new Error(`the arguments are not JSON (${(e as Error).message}) — quote the object whole: '{"key":"value"}'`) }
    if (!v || typeof v !== 'object' || Array.isArray(v)) throw new Error('the arguments must be a JSON object')
    return v as Record<string, unknown>
  }
  const out: Record<string, unknown> = {}
  for (const pair of tail) {
    const at = pair.indexOf('=')
    if (at < 1) throw new Error(`"${pair}" is neither a JSON object nor key=value — pass '{"key":"value"}' or key=value`)
    out[pair.slice(0, at)] = valueOf(pair.slice(at + 1))
  }
  return out
}

/** parseArgv(argv, env) → what was asked: a call, a list, or the usage */
export function parseArgv(argv: readonly string[], env: Readonly<Record<string, string | undefined>> = {}): Parsed {
  const local = argv.includes('--local')
  const urlFlag = argv.find((a) => a.startsWith('--url='))
  const url = urlFlag ? urlFlag.slice('--url='.length) : env.UUIDNA_MCP_URL || ENDPOINT
  const [head, ...tail] = argv.filter((a) => a !== '--local' && !a.startsWith('--url='))
  const base = { tool: '', args: {}, words: [] as string[], local, url }
  if (!head || head === 'help' || head === '--help' || head === '-h') return { ...base, mode: 'help' }
  if (head === 'list' || head === '--list') return { ...base, mode: 'list', words: tail }
  return { ...base, mode: 'call', tool: head, args: argsOf(tail) }
}

/** candidatesOf(name) → the names to try, in order: as typed (a-b read as a_b), then with the uuidna_ prefix added or
 *  removed — the catalogue's ids and the door's standard names both resolve */
export function candidatesOf(name: string): string[] {
  const n = name.trim().replace(/-/g, '_')
  const other = n.startsWith(PREFIX) ? n.slice(PREFIX.length) : PREFIX + n
  return [...new Set([n, other].filter(Boolean))]
}
/** bare(name) → the name without the catalogue prefix, lower-cased — what a word is matched against */
export const bare = (n: string): string => n.toLowerCase().replace(/^uuidna_/, '')

// ── the wire ─────────────────────────────────────────────────────────────────────────────────────────────────────
/** how a door call failed: an unknown name, a JSON-RPC error, the tool's own refusal, or no network */
export class DoorError extends Error {
  kind: 'unknown' | 'rpc' | 'tool' | 'net'
  tried: string[]
  constructor(message: string, kind: DoorError['kind'], tried: string[] = []) { super(message); this.kind = kind; this.tried = tried }
}
export interface RpcReply { result?: unknown; error?: { code?: number; message?: string } }
export interface RpcRequest { jsonrpc: '2.0'; id: number; method: string; params?: Record<string, unknown> }
/** a transport carries one JSON-RPC request to a door and returns its reply — injected in tests, fetch in use */
export type Transport = (request: RpcRequest) => Promise<RpcReply>

const UNKNOWN = /unknown tool/i

/** replyOf(text, status) → the JSON-RPC reply in an HTTP body, plain JSON or the Streamable-HTTP event stream */
export function replyOf(text: string, status: number): RpcReply {
  const body = /^\s*(event|data):/.test(text) ? (text.split('\n').filter((l) => l.startsWith('data:')).pop() ?? '').slice(5) : text
  try { return JSON.parse(body) as RpcReply } catch { return { error: { code: status, message: `HTTP ${status}, not JSON-RPC: ${text.slice(0, 160)}` } } }
}

/** httpTransport(url) → the hosted door over MCP's Streamable HTTP transport */
export const httpTransport = (url: string): Transport => async (request) => {
  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(90_000),
    })
  } catch (e) { throw new DoorError(`could not reach ${url}: ${(e as Error).message}`, 'net') }
  return replyOf(await res.text(), res.status)
}

/** one answer: the name that answered, the tool's own value, and the door's ledger line when it sends one */
export interface Answer { name: string; value: unknown; line?: string }
const jsonOr = (text: string): unknown => { try { return JSON.parse(text) } catch { return text } }

/** callOnce(t, name, args) → one tools/call: the tool's value (the envelope's first text), or a DoorError */
export async function callOnce(t: Transport, name: string, args: Record<string, unknown>): Promise<Answer> {
  const reply = await t({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } })
  if (reply.error) {
    const msg = reply.error.message ?? `JSON-RPC error ${reply.error.code ?? ''}`
    throw new DoorError(msg, UNKNOWN.test(msg) ? 'unknown' : 'rpc')
  }
  const r = (reply.result ?? {}) as { content?: { type?: string; text?: string }[]; isError?: boolean; structuredContent?: unknown }
  const texts = (r.content ?? []).filter((c) => c.type === 'text').map((c) => c.text ?? '')
  if (r.isError) {
    const msg = [(texts[0] ?? 'the tool refused').replace(/^error:\s*/, ''), ...texts.slice(1)].join('\n')
    throw new DoorError(msg, UNKNOWN.test(texts[0] ?? '') ? 'unknown' : 'tool')
  }
  return { name, value: r.structuredContent ?? jsonOr(texts[0] ?? ''), ...(texts[1] ? { line: texts[1] } : {}) }
}

/** localCall(callTool) → the same call shape over an in-process callTool (dist/mcp.js) */
export const localCall = (callTool: (n: string, a: Record<string, unknown>) => unknown) =>
  async (name: string, args: Record<string, unknown>): Promise<Answer> => {
    try { return { name, value: await Promise.resolve(callTool(name, args)) } } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      throw new DoorError(msg, UNKNOWN.test(msg) ? 'unknown' : 'tool')
    }
  }

type Call = (name: string, args: Record<string, unknown>) => Promise<Answer>

/** callNamed(call, name, args) → the answer under the first candidate name the surface knows */
export async function callNamed(call: Call, name: string, args: Record<string, unknown>): Promise<Answer> {
  const tried: string[] = []
  for (const c of candidatesOf(name)) {
    tried.push(c)
    try { return await call(c, args) } catch (e) { if (!(e instanceof DoorError) || e.kind !== 'unknown') throw e }
  }
  throw new DoorError(`unknown tool: ${name}`, 'unknown', tried)
}

// ── the door: a surface to call and search ───────────────────────────────────────────────────────────────────────
export interface ToolRow { name: string; title?: string; description: string; inputSchema?: unknown }
export interface Door { where: string; call: Call; catalogue: () => Promise<ToolRow[]> }

const rowsIn = (v: unknown): ToolRow[] | null => { const t = (v as { tools?: unknown } | null)?.tools; return Array.isArray(t) ? (t as ToolRow[]) : null }
const unknownOnly = (e: unknown): void => { if (!(e instanceof DoorError) || e.kind !== 'unknown') throw e }

/** hostedDoor(t, where) → the door on the wire */
export const hostedDoor = (t: Transport, where: string): Door => ({
  where,
  call: (name, args) => callOnce(t, name, args),
  catalogue: async () => {
    const r = await t({ jsonrpc: '2.0', id: 1, method: 'tools/list' })
    if (r.error) throw new DoorError(r.error.message ?? 'tools/list failed', 'rpc')
    return rowsIn(r.result) ?? []
  },
})

/** localDoor() → the same catalogue in-process: dist/mcp.js callTool, its catalogue for the keyword filter */
export async function localDoor(): Promise<Door> {
  const mod = await import('../mcp.js')
  return {
    where: 'dist (in-process callTool)',
    call: localCall(mod.callTool),
    catalogue: async () => mod.MCP_CATALOG.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })),
  }
}

/** keywordFilter(rows, words) → the rows matching every word in their name, title or description */
export function keywordFilter(rows: readonly ToolRow[], words: readonly string[]): ToolRow[] {
  const ws = words.map((w) => w.toLowerCase()).filter(Boolean)
  return rows.filter((r) => { const hay = [r.name, r.title ?? '', r.description].join(' ').toLowerCase(); return ws.every((w) => hay.includes(w)) })
}

/** search(door, words) → the door's own search: list_tools {query}; the first door's {q} where list_tools is absent;
 *  a keyword filter over the catalogue where both are */
export async function search(door: Door, words: readonly string[]): Promise<{ via: string; tools: ToolRow[] }> {
  const query = words.join(' ').trim()
  for (const n of LIST_DOORS) {
    try { const rows = rowsIn((await door.call(n, query ? { query } : {})).value); if (rows) return { via: `${n}${query ? ' {query}' : ''}`, tools: rows } } catch (e) { unknownOnly(e) }
  }
  try { const rows = rowsIn((await door.call(FIRST_DOOR, query ? { q: query } : {})).value); if (rows) return { via: `${FIRST_DOOR}${query ? ' {q}' : ''}`, tools: rows } } catch (e) { unknownOnly(e) }
  return { via: 'keyword filter over the catalogue', tools: keywordFilter(await door.catalogue(), words) }
}

/** contractOf(door, name) → the tool's input schema: list_tools {name} where the door has it, else the catalogue row */
export async function contractOf(door: Door, name: string): Promise<unknown> {
  for (const n of LIST_DOORS) {
    try { const v = (await door.call(n, { name })).value as { inputSchema?: unknown } | null; if (v && typeof v === 'object' && 'inputSchema' in v) return v.inputSchema } catch (e) { if (!(e instanceof DoorError)) return undefined }
  }
  const names = candidatesOf(name)
  return (await door.catalogue()).find((r) => names.includes(r.name))?.inputSchema
}

const PLACEHOLDER: Readonly<Record<string, unknown>> = { integer: 0, number: 0, boolean: false, array: [], object: {} }
/** skeletonOf(schema) → the arguments to fill in: every required key (else the first declared one), each holding a
 *  placeholder of its declared type — `<key>` for text */
export function skeletonOf(schema: unknown): Record<string, unknown> {
  const s = (schema ?? {}) as { properties?: Record<string, { type?: unknown }>; required?: unknown }
  const props = s.properties ?? {}
  const required = Array.isArray(s.required) ? s.required.map(String) : []
  const out: Record<string, unknown> = {}
  for (const k of required.length ? required : Object.keys(props).slice(0, 1)) {
    const t = props[k]?.type
    const first = Array.isArray(t) ? t[0] : t
    out[k] = typeof first === 'string' && first in PLACEHOLDER ? PLACEHOLDER[first] : `<${k}>`
  }
  return out
}
export const shellQuote = (s: string): string => `'${s.replace(/'/g, `'\\''`)}'`
/** commandFor(name, schema) → the exact command that calls the tool, its arguments sketched from its schema */
export const commandFor = (name: string, schema: unknown, args: Record<string, unknown> = skeletonOf(schema)): string =>
  `npm run mcp -- ${name}${Object.keys(args).length ? ' ' + shellQuote(JSON.stringify(args)) : ''}`

export interface Suggestion { name: string; score: number; command: string }
/** A word that matches this many descriptions or more discriminates nothing; only a NAME hit counts for it. */
export const BROAD = 25
/** suggestTools(door, words, named) → the best-matching tools, asked of the door's search a word at a time: a word
 *  in the tool's name scores 3, in its description 1 (unless the word is BROAD); a tool the code names outright
 *  (callTool('uuidna_handle', …)) leads. Each comes with its exact command. */
export async function suggestTools(door: Door, words: readonly string[], named: readonly string[] = [], top = 3): Promise<{ via: string; suggestions: Suggestion[] }> {
  const score = new Map<string, number>()
  let via = ''
  for (const n of new Set(named)) {
    const hit = await search(door, [bare(n)])
    via = hit.via
    const row = hit.tools.find((r) => candidatesOf(n).includes(r.name) || r.name === n)
    if (row) score.set(row.name, 1000)
  }
  for (const w of new Set(words.map((x) => x.toLowerCase()))) {
    const hit = await search(door, [w])
    via = hit.via
    const broad = hit.tools.length >= BROAD
    for (const r of hit.tools) {
      const add = bare(r.name).includes(w) ? 3 : broad ? 0 : 1
      if (add) score.set(r.name, (score.get(r.name) ?? 0) + add)
    }
  }
  const ranked = [...score].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length || (a[0] < b[0] ? -1 : 1)).slice(0, top)
  const suggestions: Suggestion[] = []
  for (const [name, s] of ranked) suggestions.push({ name, score: s, command: commandFor(name, await contractOf(door, name)) })
  return { via: via || 'no search asked (no words)', suggestions }
}

// ── the command ──────────────────────────────────────────────────────────────────────────────────────────────────
export const compact = (v: unknown): string => (typeof v === 'string' ? v : JSON.stringify(v))
const hostOf = (url: string): string => url.replace(/^https?:\/\//, '')

export interface Io { out: (s: string) => void; err: (s: string) => void }

/** run(argv, env, io, doorOf) → the exit code. doorOf is injected so tests reach no network. */
export async function run(argv: readonly string[], env: Readonly<Record<string, string | undefined>>, io: Io,
  doorOf: (p: Parsed) => Promise<Door> = async (p) => (p.local ? localDoor() : hostedDoor(httpTransport(p.url), hostOf(p.url)))): Promise<number> {
  let p: Parsed
  try { p = parseArgv(argv, env) } catch (e) { io.err(`mcp — ${(e as Error).message}\n\n${USAGE}`); return 2 }
  if (p.mode === 'help') { io.out(USAGE); return 0 }
  let door: Door
  try { door = await doorOf(p) } catch (e) { io.err(`mcp — dist does not load (${(e as Error).message}); build it: npm run build`); return 3 }
  try {
    if (p.mode === 'list') {
      const { via, tools } = await search(door, p.words)
      io.out(`${tools.length} tool${tools.length === 1 ? '' : 's'}${p.words.length ? ` match "${p.words.join(' ')}"` : ''} on ${door.where} (${via}):`)
      const width = tools.reduce((w, r) => (r.name.length > w ? r.name.length : w), 8) > 30 ? 30 : tools.reduce((w, r) => (r.name.length > w ? r.name.length : w), 8)
      for (const r of tools) io.out(r.inputSchema ? `  ${commandFor(r.name, r.inputSchema)}` : `  ${r.name.padEnd(width)}  ${(r.title ?? r.description).slice(0, 110)}`)
      io.out(`call one: npm run mcp -- <tool> '<json-arguments>'${p.local ? ' --local' : ''}`)
      return tools.length ? 0 : 1
    }
    const a = await callNamed(door.call, p.tool, p.args)
    io.out(compact(a.value))
    io.err(p.local
      ? `computed locally — ${a.name} by in-process callTool over dist, not through the hosted door (no gate, no deposit)`
      : `via ${door.where} → ${a.name}${a.line ? ` · ${a.line}` : ''}`)
    return 0
  } catch (e) {
    if (!(e instanceof DoorError)) { io.err(`mcp — ${e instanceof Error ? e.message : String(e)}`); return 1 }
    const retry = `npm run mcp -- ${p.tool}${Object.keys(p.args).length ? ' ' + shellQuote(JSON.stringify(p.args)) : ''}`
    if (e.kind === 'unknown' && p.local) { io.err(`mcp — dist's catalogue has no tool "${p.tool}" (tried ${e.tried.join(', ')}); find it: npm run mcp -- list <word> --local`); return 2 }
    if (e.kind === 'unknown') {
      io.err(`mcp — ${door.where} does not serve "${p.tool}" (tried ${e.tried.join(', ')}). The live site carries what its last ship carried, so a newer tool arrives with the next ship, and fs/process tools are local-only.\n` +
        `  compute it in-process now:  ${retry} --local\n  find the served name:       npm run mcp -- list ${bare(p.tool).split('_')[0]}`)
      return 2
    }
    if (e.kind === 'net') { io.err(`mcp — ${e.message}. Compute it in-process instead: ${retry} --local`); return 3 }
    if (e.kind === 'rpc') { io.err(`mcp — JSON-RPC error from ${door.where}: ${e.message}`); return 2 }
    io.err(`mcp — ${p.tool} refused: ${e.message}`)
    return 1
  }
}

const isMain = (): boolean => {
  const a = process.argv[1]
  if (!a) return false
  try { return import.meta.url === pathToFileURL(a).href } catch { return false }
}
if (isMain()) {
  run(process.argv.slice(2), process.env, { out: (s) => process.stdout.write(s + '\n'), err: (s) => process.stderr.write(s + '\n') })
    .then((code) => { process.exitCode = code })
}
