#!/usr/bin/env node
// gen-mcp-docs — THE TOOL DOCUMENTATION IS THE COMPUTATION: every tool run once, its actual answer recorded.
//
// For each catalogue tool this writes, to src/mcp-docs.generated.ts (a module, so the edge serves it with no disk):
//   name, title    — the standard verb_object name and its plain title (src/mcp-names.ts derives both)
//   effects        — what the run reaches (src/scripts/mcp-effects.ts reads the code), joined with what the example
//                    call was SEEN to do: fs writes, deletions and spawns are refused and noted, fetch is answered by
//                    a fixed stub and noted, so documenting a tool never writes, spawns or reaches the network
//   annotations    — the MCP hints, derived from the effects
//   outputSchema   — the JSON Schema of the ACTUAL answer to the example call
//   example        — the arguments and a short excerpt of that answer
//   description    — the one line tools/list carries: "Verb object. Returns X.", X read off outputSchema
// A tool whose example THROWS is not documented: it is listed in MCP_DOCS_BROKEN with its error, and this exits 1.
// A tool whose runs disagree — twice in a row, or again after the whole catalogue has run (it reads a clock, the
// machine, the network or what other calls left behind) — keeps its shape and no excerpt.
// Example arguments come from each tool's own schema (first enum member, minimum, a described hex width, a real
// theorem key, skill or file); EXAMPLES declares the few a schema cannot supply, each with its reason.
import { writeFileSync } from 'node:fs'
import { createRequire, syncBuiltinESMExports } from 'node:module'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { MCP_CATALOG, callTool, hostHardware } from '../mcp.js'
import { handleMcpRpc, edgeOwnTools } from '../mcp-http.js'
import { theorems, toUuid } from '../index.js'
import { effectReader, toolRunsOf } from './mcp-effects.js'
import { standardNames, annotationsOf, titleOf, shapeOf, wireLineOf, excerptOf, type Effects, type NameInput, type ToolDoc } from '../mcp-names.js'
import { DOOR, LIST, isDoorTool } from '../mcp-door.js'

/** THE DECLARED EXAMPLES — arguments neither a tool's schema nor a producer its schema names can supply, each with
 *  its reason. `from` names a producer whose answer fills the remaining required arguments by name. */
export const EXAMPLES: Readonly<Record<string, { args: Record<string, unknown>; from?: string; why: string }>> = {
  uuidna_aead_decrypt: { args: { key: 'ab'.repeat(32), nonce: 'ab'.repeat(12), plaintext: 'hello' }, from: 'uuidna_aead_encrypt',
    why: 'ct and tag carry no description naming their producer; they are the fields uuidna_aead_encrypt returns for the same key and nonce' },
  uuidna_fanout: { args: { host: 'qpu.uuidna.com', method: 'tools/list' },
    why: 'host must be one of the four hologram hosts; an enum on the schema would cost the catalogue ~76 bytes the shrink-only wire ratchet does not allow' },
  uuidna_predict: { args: { likelihood: 'all' },
    why: 'likelihood must be high, medium, low or all; its description says so and the schema carries no enum, for the same ratchet' },
}

type Schema = { type?: string | string[]; enum?: unknown[]; minimum?: number; default?: unknown; description?: string; items?: Schema; properties?: Record<string, Schema>; required?: string[] }
const first = theorems()[0]!
/** sampleOf(schema, name) → a value of the shape the schema describes, read from the schema, the argument's name
 *  and the ledger only */
const sampleOf = (s: Schema | undefined, name = ''): unknown => {
  if (!s) return 'theorem'
  if (s.default !== undefined) return s.default
  if (s.enum?.length) return s.enum[0]
  const d = (s.description ?? '').toLowerCase() + (/key$/i.test(name) && !/hex/.test(s.description ?? '') ? ' theorem key' : '')
  const type = Array.isArray(s.type) ? s.type[0] : s.type
  switch (type) {
    case 'string': {
      const bytes = /(\d+)-byte hex/.exec(d)
      if (bytes) return 'ab'.repeat(Number(bytes[1]))
      if (/\bhex\b/.test(d)) return 'ab'.repeat(32)
      if (/\buuid\b|\baddress\b/.test(d)) return toUuid('theorem')
      if (/skill/.test(d)) return first.skill
      if (/wing|\.lean|file/.test(d)) return first.file
      if (/theorem|\bkey\b/.test(d)) return first.key
      return 'theorem'
    }
    case 'number': case 'integer': return typeof s.minimum === 'number' ? s.minimum : 1
    case 'boolean': return false
    case 'array': return [sampleOf(s.items)]
    case 'object': return Object.fromEntries(Object.entries(s.properties ?? {}).map(([k, v]) => [k, sampleOf(v)]))
    default: return 'theorem'
  }
}
/** the context the stdio server hands every call: the host's own hardware reader (uuidna_quantum_message binds it) */
const CTX = { hardware: hostHardware }
const schemaOf = (name: string): Schema => (MCP_CATALOG.find((t) => t.name === name)?.inputSchema ?? {}) as Schema
/** producersOf(s) → the tools an argument's description names as its source ("uuidna_encrypt output"). Descriptions
 *  are served clipped, so a clipped token names every tool it prefixes, tried in catalogue order. */
const producersOf = (s: Schema | undefined): string[] => {
  const token = /\b(uuidna_[a-z0-9_]+)/.exec(s?.description ?? '')?.[1]
  return token ? MCP_CATALOG.filter((t) => t.name.startsWith(token) && t.name !== DOOR).map((t) => t.name) : []
}
const productOf = async (producer: string, siblings: Record<string, unknown>): Promise<unknown> => {
  const s = schemaOf(producer)
  const args: Record<string, unknown> = Object.fromEntries((s.required ?? []).map((k) => [k, sampleOf(s.properties?.[k], k)]))
  for (const k of Object.keys(s.properties ?? {})) if (k in siblings) args[k] = siblings[k]
  try { return await settle(callTool(producer, args, CTX)) } catch { return undefined }
}
/** the field of a product an argument takes: the field of its own name, else the whole product when the shapes agree */
const takeFrom = (product: unknown, key: string, want: Schema | undefined): unknown => {
  if (product && typeof product === 'object' && !Array.isArray(product) && key in product) return (product as Record<string, unknown>)[key]
  const type = Array.isArray(want?.type) ? want?.type[0] : want?.type
  if (type === 'array' && Array.isArray(product)) return product
  if (type === 'object' && product && typeof product === 'object' && !Array.isArray(product)) return product
  return undefined
}
/** exampleArgs(name, schema) → the example call: declared arguments first, then plain synthesized ones, then the
 *  products of the producers the schema names, computed with the plain arguments as siblings (a chain opened with a
 *  passphrase is sealed with the same passphrase), exactly as two real calls would agree */
const exampleArgs = async (name: string, schema: Schema): Promise<Record<string, unknown>> => {
  const declared = EXAMPLES[name]
  const required = schema.required ?? []
  const args: Record<string, unknown> = { ...(declared?.args ?? {}) }
  // a declared producer fills first, so the fields it returns are never shadowed by a synthesized stand-in
  if (declared?.from) {
    const product = await productOf(declared.from, args)
    for (const k of required) if (!(k in args)) { const v = takeFrom(product, k, schema.properties?.[k]); if (v !== undefined) args[k] = v }
  }
  for (const k of required) if (!(k in args) && !producersOf(schema.properties?.[k]).length) args[k] = sampleOf(schema.properties?.[k], k)
  for (const k of required) {
    if (k in args) continue
    for (const p of producersOf(schema.properties?.[k])) {
      const v = takeFrom(await productOf(p, args), k, schema.properties?.[k])
      if (v !== undefined) { args[k] = v; break }
    }
    if (!(k in args)) args[k] = sampleOf(schema.properties?.[k], k)
  }
  // a declared producer's own inputs that the tool does not take are not part of the call
  for (const k of Object.keys(args)) if (!(k in (schema.properties ?? {}))) delete args[k]
  return args
}

// ── THE SANDBOX: the example call may not write, delete, spawn or reach the network; each attempt is noted ──
const require = createRequire(import.meta.url)
const fs = require('node:fs') as Record<string, unknown> & { promises: Record<string, unknown> }
const cp = require('node:child_process') as Record<string, unknown>
const REFUSED = 'gen-mcp-docs sandbox:'
let current = ''
const observed = new Map<string, Set<keyof Effects>>()
const note = (k: keyof Effects): void => { if (current) { const s = observed.get(current) ?? new Set(); s.add(k); observed.set(current, s) } }
const patched: [Record<string, unknown>, string, unknown][] = []
const patch = (obj: Record<string, unknown>, names: string[], kind: keyof Effects): void => {
  for (const n of names) {
    if (typeof obj[n] !== 'function') continue
    patched.push([obj, n, obj[n]])
    obj[n] = (...a: unknown[]) => { note(kind); throw new Error(`${REFUSED} ${n} refused while documenting (${String(a[0]).slice(0, 80)})`) }
  }
}
// the far side of every network call answers 503 with an empty object: the tool's own unreached path is what gets
// documented, the same on every run, and a tool that crashes on an unreachable host is reported as broken
const STUB = '{}'
const realFetch = globalThis.fetch
/** openSync opens for reading too; only a write, append or read-write flag is a write */
const openForWrite = (flags: unknown): boolean =>
  typeof flags === 'string' ? /[wa+]/.test(flags) : typeof flags === 'number' ? (flags & 3) !== 0 : false
const sandbox = (): void => {
  const realOpen = fs.openSync as (...a: unknown[]) => unknown
  patched.push([fs, 'openSync', realOpen])
  fs.openSync = (...a: unknown[]) => {
    if (!openForWrite(a[1])) return realOpen(...a)
    note('writes'); throw new Error(`${REFUSED} openSync for write refused while documenting (${String(a[0]).slice(0, 80)})`)
  }
  patch(fs, ['writeFileSync', 'appendFileSync', 'mkdirSync', 'mkdtempSync', 'renameSync', 'copyFileSync', 'writeFile', 'appendFile', 'createWriteStream'], 'writes')
  patch(fs.promises, ['writeFile', 'appendFile', 'mkdir', 'rename', 'copyFile'], 'writes')
  patch(fs, ['rmSync', 'unlinkSync', 'rmdirSync', 'rm', 'unlink'], 'deletes')
  patch(fs.promises, ['rm', 'unlink', 'rmdir'], 'deletes')
  patch(cp, ['spawnSync', 'execSync', 'execFileSync', 'spawn', 'exec', 'execFile', 'fork'], 'spawns')
  globalThis.fetch = (async () => { note('network'); return new Response(STUB, { status: 503, headers: { 'content-type': 'application/json' } }) }) as typeof fetch
  syncBuiltinESMExports()
}
const unsandbox = (): void => {
  for (const [obj, n, f] of patched) obj[n] = f
  globalThis.fetch = realFetch
  syncBuiltinESMExports()
}

const settle = async (v: unknown): Promise<unknown> => {
  if (!v || typeof (v as { then?: unknown }).then !== 'function') return v
  let timer: ReturnType<typeof setTimeout> | undefined
  const cap = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('the example did not settle in 30 s')), 30_000) })
  try { return await Promise.race([v, cap]) } finally { clearTimeout(timer) }
}
const canon = (v: unknown): string => { try { return JSON.stringify(v) ?? String(v) } catch { return String(v) } }
/** the edge's answer to one call, parsed back from its first content block */
const edgeAnswer = async (name: string, args: Record<string, unknown>): Promise<unknown> => {
  const r = await settle(handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } })) as
    { result?: { content?: { text: string }[]; isError?: boolean }; error?: { message: string } }
  const text = r?.result?.content?.[0]?.text ?? ''
  if (r?.error) throw new Error(r.error.message)
  if (r?.result?.isError && text.startsWith('error: ')) throw new Error(text.slice(7))
  try { return JSON.parse(text) } catch { return text }
}

const SRC = join(ROOT, 'src')
const reader = effectReader(SRC)
const runs = new Map(toolRunsOf(SRC).map((r) => [r.old, r.run]))
const staticOf = new Map(MCP_CATALOG.map((t) => [t.name, reader.effectsOfRun(runs.get(t.name) ?? '', join(SRC, 'mcp.ts'))]))
/** the edge's own implementations, each with ITS schema: uuidna_address takes {value} there and {text} on stdio */
const edgeOwn = new Map(edgeOwnTools().map((t) => [t.name, t.inputSchema as Schema]))

type Outcome = { ok: true; value: unknown; edge?: unknown; varies: boolean } | { ok: false; error: string }
const outcomes = new Map<string, Outcome>()
const argsOf = new Map<string, Record<string, unknown>>()

sandbox()
try {
  for (const t of MCP_CATALOG) {
    if (isDoorTool(t.name)) continue   // the doors answer from this catalogue; they are documented from the others below
    current = t.name
    const args = await exampleArgs(t.name, t.inputSchema as Schema)
    argsOf.set(t.name, args)
    try {
      const a = await settle(callTool(t.name, structuredClone(args), CTX))
      const b = await settle(callTool(t.name, structuredClone(args), CTX))
      const edgeSchema = edgeOwn.get(t.name)
      let edge: unknown
      if (edgeSchema) {
        try { edge = await edgeAnswer(t.name, await exampleArgs(t.name, edgeSchema)) }
        catch (e) { throw new Error(`the edge's own implementation threw: ${String((e as Error)?.message ?? e)}`) }
      }
      outcomes.set(t.name, { ok: true, value: a, edge, varies: canon(a) !== canon(b) })
    } catch (e) {
      outcomes.set(t.name, { ok: false, error: String((e as Error)?.message ?? e).slice(0, 300) })
    } finally { current = '' }
  }
  // THE LATE PASS: two back-to-back calls agree on a tool that reads what OTHER calls leave behind (the payments the
  // session has recorded, the laws' live state), so every example runs once more after the whole catalogue and every
  // edge call has — a tool whose answer moved in between reads session state, and keeps its shape without an excerpt
  for (const t of MCP_CATALOG) {
    const o = outcomes.get(t.name)
    if (!o || !o.ok || o.varies) continue
    current = t.name
    try {
      const late = await settle(callTool(t.name, structuredClone(argsOf.get(t.name) ?? {}), CTX))
      if (canon(late) !== canon(o.value)) outcomes.set(t.name, { ...o, varies: true })
    } catch { outcomes.set(t.name, { ...o, varies: true }) } finally { current = '' }
  }
} finally { unsandbox() }


// effects: the code's reading joined with what the example was seen to do
const effectsOf = (name: string): Effects => {
  const s = staticOf.get(name)?.effects ?? { network: false, writes: false, deletes: false, spawns: false }
  const o = observed.get(name) ?? new Set()
  return { network: s.network || o.has('network'), writes: s.writes || o.has('writes'), deletes: s.deletes || o.has('deletes'), spawns: s.spawns || o.has('spawns') }
}
// the door reaches whatever the tool it opens reaches, so its effects are the union of the catalogue's
const union = MCP_CATALOG.filter((t) => t.name !== DOOR).map((t) => effectsOf(t.name))
const doorEffects: Effects = { network: union.some((e) => e.network), writes: union.some((e) => e.writes), deletes: union.some((e) => e.deletes), spawns: union.some((e) => e.spawns) }
const effectsFor = (name: string): Effects => (name === DOOR ? doorEffects : effectsOf(name))

const inputs: NameInput[] = MCP_CATALOG.map((t) => ({
  old: t.name, targets: staticOf.get(t.name)?.targets ?? [], effects: effectsFor(t.name), required: ((t.inputSchema as Schema).required ?? []).length,
}))
const names = standardNames(inputs)

const docs: Record<string, ToolDoc> = {}
const broken: { old: string; name: string; error: string }[] = []
for (const t of MCP_CATALOG) {
  const name = names[t.name]!
  const effects = effectsFor(t.name)
  const why = staticOf.get(t.name)?.why ?? {}
  const seen = [...(observed.get(t.name) ?? [])].sort()
  const o = outcomes.get(t.name)
  const base = { name, title: titleOf(name), annotations: annotationsOf(effects), effects, ...(Object.keys(why).length ? { why } : {}), ...(seen.length ? { observed: seen } : {}) }
  if (t.name === DOOR) {
    const shape = { type: 'object', properties: { count: { type: 'integer' }, tools: { type: 'array', items: { type: 'object' } } } }
    docs[t.name] = { ...base, description: wireLineOf(name, shape), outputSchema: shape, status: 'documented' }
    continue
  }
  // list_tools answers with the catalogue's own rows, which this run is rewriting — its SHAPE is read off a real
  // answer, and no excerpt is kept, since an excerpt of rows still being generated could never reproduce
  if (t.name === LIST) {
    const shape = shapeOf(await settle(callTool(LIST, {}, CTX)))
    docs[t.name] = { ...base, description: wireLineOf(name, shape), outputSchema: shape, status: 'documented' }
    continue
  }
  if (!o || !o.ok) {
    const error = o && !o.ok ? o.error : 'not run'
    // a call the sandbox refused did what its effects say (write, spawn, delete) — documented as such, not broken
    if (error.includes(REFUSED)) { docs[t.name] = { ...base, description: `${titleOf(name)}. Returns a result.`, status: 'sandboxed', example: { args: argsOf.get(t.name) ?? {}, excerpt: error } }; continue }
    // a call that reached the network, was answered 503 by the stub and refused by name took its unreached path —
    // the far side was absent, which is what the stub is for; a TypeError there is still a crash, and broken
    if (seen.includes('network') && !/TypeError|is not a function|Cannot read properties|is not iterable/.test(error)) {
      docs[t.name] = { ...base, description: `${titleOf(name)}. Returns a result.`, status: 'unreached', example: { args: argsOf.get(t.name) ?? {}, excerpt: error } }
      continue
    }
    broken.push({ old: t.name, name, error })
    docs[t.name] = { ...base, description: `${titleOf(name)}. Returns a result.`, status: 'broken', example: { args: argsOf.get(t.name) ?? {}, excerpt: error } }
    continue
  }
  const shape = shapeOf(o.value)
  const edgeShape = o.edge === undefined ? undefined : shapeOf(o.edge)
  const differs = edgeShape && canon(edgeShape) !== canon(shape)
  docs[t.name] = {
    ...base, description: wireLineOf(name, shape), outputSchema: shape,
    ...(differs ? { edge: { description: wireLineOf(name, edgeShape), outputSchema: edgeShape! } } : {}),
    status: o.varies ? 'varies' : 'documented',
    // AN EMPTY ANSWER IS NOT AN EXAMPLE. A tool that answers nothing under this sandbox — uuidna_render did, twice,
    // while answering 1463 characters outside it — was recorded as `documented` with excerpt '', and the gate then
    // compared a real answer against nothing and could never pass again. The shape and the wire line are still
    // documented, because those were read; the example is simply not recorded, which is what the gate skips on
    // (2026-09-18). Recording a non-answer as the answer is the defect, not the tool.
    example: { args: argsOf.get(t.name) ?? {}, excerpt: o.varies ? '(varies between calls: the answer reads a clock, the machine or the network)' : excerptOf(o.value) },
  }
}

const count = (s: ToolDoc['status']): number => Object.values(docs).filter((d) => d.status === s).length
const body = `// src/mcp-docs.generated.ts — GENERATED by scripts/gen-mcp-docs from every tool's own answer. Do not edit.
// Each row: the standard name and title (src/mcp-names.ts), what the run reaches and the MCP annotations derived from
// it, the shape of the ACTUAL answer to the example call, and the one line tools/list carries. Regenerate with
// \`npm run x -- gen-mcp-docs\`; the generate chain runs it before gen-mcp renders docs/mcp.md from it.
import type { ToolDoc } from './mcp-names.js'

/** old tool name → its computed documentation */
export const MCP_DOCS: Readonly<Record<string, ToolDoc>> = ${JSON.stringify(docs, null, 1)}

/** the tools whose example call threw — reported, never documented */
export const MCP_DOCS_BROKEN: readonly { old: string; name: string; error: string }[] = ${JSON.stringify(broken, null, 1)}
`
writeFileSync(join(SRC, 'mcp-docs.generated.ts'), body)
console.log(`✓ gen-mcp-docs — ${MCP_CATALOG.length} tools: ${count('documented')} documented, ${count('varies')} varying (shape only), ${count('sandboxed')} sandboxed (write/spawn refused), ${count('unreached')} unreached (network stubbed 503), ${broken.length} broken → src/mcp-docs.generated.ts`)
if (broken.length) {
  console.error(`✗ gen-mcp-docs — ${broken.length} tool(s) threw on their example and are reported, not documented:`)
  for (const b of broken) console.error(`  ${b.old} (${b.name}): ${b.error}`)
  process.exitCode = 1
}
