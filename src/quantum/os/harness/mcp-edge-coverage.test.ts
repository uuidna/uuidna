// mcp-edge-coverage — every catalogue tool not declared EDGE_ABSENT dispatches through handleMcpRpc.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MCP_CATALOG, callTool } from '../../../mcp.js'
import { handleMcpRpc, mcpHttpToolNames, edgeAbsentNames } from '../../../mcp-http.js'
import { hexbitDoorOf } from '../index.js'
import { coverage } from '../../../publish.js'
import { theorems } from '../../../index.js'
import { toUuid } from '../../../address.js'
import { ROOT } from '../../../scripts/api.js'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

test('every edge-served tool dispatches through handleMcpRpc', () => {
  const absent = new Set(edgeAbsentNames())
  const served = new Set(mcpHttpToolNames())
  for (const t of MCP_CATALOG) {
    if (absent.has(t.name)) continue
    assert.ok(served.has(t.name), `${t.name} is not EDGE_ABSENT and must be served at /mcp`)
    try {
      const r = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: t.name, arguments: {} } })
      if (r && typeof (r as { then?: unknown }).then === 'function') (r as Promise<unknown>).catch(() => {})
    } catch (e) {
      assert.doesNotMatch(String((e as Error).message), /unknown tool/, `edge dispatchable: ${t.name}`)
    }
  }
})

// THE WORKER HAS NO `process`, AND NO LOCAL TEST EVER RAN WITHOUT ONE. Three edge tools (refusals, rosetta_legs,
// security_plan) loaded fine at uuidna.com/mcp and threw `process is not defined` on their first call, because
// their disk reads resolve node builtins lazily through process.getBuiltinModule — invisible to every test on
// Node, where process is always there. This runs each zero-argument edge tool with process REMOVED from the
// global, the way the Worker sees it. Required arguments are SYNTHESIZED from each tool's own schema (the first
// enum member, an N-byte hex, a uuid, a real theorem key, skill or wing from the ledger, the minimum number).
// A probe that only tripped validation would pass while proving nothing, so the required-argument calls are
// PARTITIONED rather than held to a chosen floor: reached, refused on a described argument (fails by name),
// refused on a schema-silent argument (the schema's own gap, reported), crashed (filed by name), async. The
// first cut used a hand-picked floor of 50; the captain asked why the manual cap, and the partition is the
// answer — nothing here is a magnitude anyone chose. A thenable run is not awaited while process is hidden,
// so an async failure is not attributed: a named limit, not coverage.
const PROCESS_MISSING = /process is not defined|reading 'getBuiltinModule'|Cannot read properties of undefined \(reading '(?:env|platform|argv|cwd|getuid|hrtime|nextTick|versions|memoryUsage)'\)/
const withoutProcess = <T>(run: () => T): T => {
  const saved = (globalThis as { process?: unknown }).process
  Object.defineProperty(globalThis, 'process', { value: undefined, configurable: true, writable: true })
  try { return run() } finally { Object.defineProperty(globalThis, 'process', { value: saved, configurable: true, writable: true }) }
}
interface Schema { type?: string; enum?: unknown[]; minimum?: number; pattern?: string; description?: string; items?: Schema; properties?: Record<string, Schema>; required?: string[] }
// THE SYNTHESIZER READS THE SCHEMA, NOTHING ELSE: a described shape (N-byte hex, a uuid, a theorem key, a skill,
// a wing) is produced from the ledger the tool itself serves, so a refusal of a DESCRIBED argument means the
// description and the handler disagree — a finding, never a tolerance.
const first = theorems()[0]!
const HEX = (bytes: number): string => 'ab'.repeat(bytes)
// AN ARGUMENT THAT IS ANOTHER TOOL'S PRODUCT ("the uuid chain from uuidna_seal_channel") is composed by calling that
// producer with its own synthesized arguments and taking the field of the same name — read off the description,
// which names the producer; no hand-kept list of which tool feeds which.
// The consumer's OTHER arguments ride along to the producer by name (a chain opened with a passphrase must have
// been sealed with that passphrase), so producer and consumer agree the way two real calls would.
const produced = new Map<string, Record<string, unknown>>()
const productOf = (producer: string, name: string, siblings: Record<string, unknown>): unknown => {
  const tool = MCP_CATALOG.find((t) => t.name === producer)
  if (!tool) return undefined
  const schema = tool.inputSchema as Schema
  const args = Object.fromEntries((schema.required ?? []).map((k) => [k, sampleOf(schema.properties?.[k], k)]))
  for (const k of Object.keys(schema.properties ?? {})) if (k in siblings) args[k] = siblings[k]
  const key = producer + JSON.stringify(args)
  if (!produced.has(key)) {
    const r = handleMcpRpc({ jsonrpc: '2.0', id: 0, method: 'tools/call', params: { name: producer, arguments: args } }) as { result?: { content?: { text: string }[] } }
    let out: Record<string, unknown> = {}
    try { out = JSON.parse(r.result?.content?.[0]?.text ?? '{}') as Record<string, unknown> } catch { /* not JSON: no product */ }
    produced.set(key, out)
  }
  return produced.get(key)![name]
}
// descriptions are served truncated ("uuid chain from uuidna_seal_cha…"), so the producer token may prefix
// SEVERAL catalogue names (seal_chain, seal_channel): every candidate is tried and the first whose product carries
// a field of the argument's name wins — the same disambiguation an agent reading that schema would have to do
const producersOf = (s: Schema | undefined): string[] => {
  const token = /\b(uuidna_[a-z0-9_]+)/.exec((s?.description ?? '').toLowerCase())?.[1]
  return token ? MCP_CATALOG.filter((t) => t.name.startsWith(token)).map((t) => t.name) : []
}
/** synthesize every required argument: plain shapes first, then the products of named producers with the plain ones as siblings */
const argsFor = (schema: Schema): Record<string, unknown> => {
  const required = schema.required ?? []
  const args: Record<string, unknown> = {}
  for (const k of required) if (!producersOf(schema.properties?.[k]).length) args[k] = sampleOf(schema.properties?.[k], k)
  for (const k of required) {
    const candidates = producersOf(schema.properties?.[k])
    if (!candidates.length) continue
    let v: unknown
    for (const c of candidates) { v = productOf(c, k, args); if (v !== undefined) break }
    args[k] = v ?? sampleOf(schema.properties?.[k], k)
  }
  return args
}
const sampleOf = (s: Schema | undefined, _name = ''): unknown => {
  if (!s) return 'x'
  if (s.enum?.length) return s.enum[0]
  const d = (s.description ?? '').toLowerCase()
  switch (s.type) {
    case 'string': {
      const bytes = /(\d+)-byte hex/.exec(d)
      if (bytes) return HEX(Number(bytes[1]))
      if (/\bhex\b/.test(d)) return HEX(32)
      if (/\buuid\b|\baddress\b/.test(d)) return toUuid('theorem')
      if (/skill/.test(d)) return first.skill
      if (/wing|\.lean|file/.test(d)) return first.file
      if (/theorem|\bkey\b/.test(d)) return first.key
      return 'theorem'
    }
    case 'number': case 'integer': return typeof s.minimum === 'number' ? s.minimum : 1
    case 'boolean': return true
    case 'array': return [/\buuid\b|\bchain\b|\baddress\b/.test(d) ? toUuid('theorem') : sampleOf(s.items)]
    case 'object': return Object.fromEntries(Object.entries(s.properties ?? {}).map(([k, v]) => [k, sampleOf(v)]))
    default: return 'x'
  }
}
/** an argument the schema says NOTHING about — no description, no pattern, no enum — gave the synthesizer nothing */
const silent = (s: Schema | undefined): boolean => !s || (!s.description && !s.pattern && !s.enum)
/** a JS TypeError in a refusal is a CRASH on malformed input, not a refusal — reported by name, filed separately */
const CRASH = /Cannot read properties of|Cannot convert undefined or null|is not a function|is not iterable/
const declaredDivergence = new Set((JSON.parse(readFileSync(join(ROOT, 'lean', 'mcp-surface-divergence.json'), 'utf8')) as
  { argumentDivergence: { tool: string }[] }).argumentDivergence.map((d) => d.tool))

test('every edge tool runs with the host process hidden, as the Worker has it hidden', (t) => {
  // NEGATIVE CONTROL FIRST: the finder must be able to fire. A function that reaches process must throw under it.
  assert.throws(() => withoutProcess(() => (globalThis as { process?: { platform: string } }).process!.platform), /Cannot read properties of undefined/,
    'the control did not fire — the probe is not hiding process, and every pass below would be vacuous')
  const served = new Set(mcpHttpToolNames())
  const failed: string[] = []
  const refusedDescribed: string[] = [], refusedSilent: string[] = [], crashed: string[] = []
  let withArgs = 0, reached = 0, asyncArgs = 0
  for (const tool of MCP_CATALOG) {
    if (!served.has(tool.name)) continue
    const schema = tool.inputSchema as Schema
    const required = schema.required ?? []
    const args = argsFor(schema)
    if (required.length) withArgs++
    let text = '', refused = false
    try {
      const r = withoutProcess(() => handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: tool.name, arguments: args } })) as
        { result?: { content?: { text: string }[]; isError?: boolean }; error?: { message: string } } | Promise<unknown>
      if (r && typeof (r as { then?: unknown }).then === 'function') { (r as Promise<unknown>).catch(() => {}); if (required.length) asyncArgs++; continue }
      const rr = r as { result?: { content?: { text: string }[]; isError?: boolean }; error?: { message: string } }
      text = rr.result?.content?.[0]?.text ?? rr.error?.message ?? ''
      // a HANDLER refusal is the `error: ` shape mcp-http's fail() emits; a result the GATE marked isError still
      // reached its handler (the verdict object is the handler's own output), so it is not a refusal of the argument
      refused = text.startsWith('error: ') || !!rr.error
    } catch (e) { text = String((e as Error).message); refused = true }
    if (PROCESS_MISSING.test(text)) { failed.push(`${tool.name}: ${text.slice(0, 90)}`); continue }
    if (!required.length) continue
    if (!refused) { reached++; continue }
    if (declaredDivergence.has(tool.name)) { reached++; continue }   // refused on the DECLARED name difference, not on shape
    if (CRASH.test(text)) crashed.push(`${tool.name}: ${text.slice(0, 70)}`)
    else if (required.some((k) => silent(schema.properties?.[k]))) refusedSilent.push(`${tool.name} (${required.filter((k) => silent(schema.properties?.[k])).join(',')})`)
    else refusedDescribed.push(`${tool.name}: ${text.slice(0, 80)}`)
  }
  assert.deepEqual(failed, [], 'these edge-served tools reach the host process — bake their data into a module (gen-refusals), answer from a shipped mirror (rosetta_legs), or declare them EDGE_ABSENT with the capability named:\n  ' + failed.join('\n  '))
  // THE DEPTH CONTROL, DERIVED RATHER THAN CHOSEN: the ledger is partitioned — every required-argument call either
  // reached its handler, refused on an argument its own schema describes (a disagreement between the description
  // and the handler: fails here by name), refused on an argument the schema is SILENT about (the schema's gap,
  // reported as a diagnostic — an agent reading that schema gets the same refusal), or crashed (filed by name).
  assert.equal(reached + refusedDescribed.length + refusedSilent.length + crashed.length + asyncArgs, withArgs, 'the partition must be total')
  assert.deepEqual(refusedDescribed, [], 'these tools refuse an argument their own schema describes — the description and the handler disagree, or the synthesizer misread the description:\n  ' + refusedDescribed.join('\n  '))
  t.diagnostic(`edge probe: ${reached} reached · ${refusedSilent.length} refused on schema-silent arguments · ${crashed.length} crashed · ${asyncArgs} async, of ${withArgs} required-argument tools`)
  if (refusedSilent.length) t.diagnostic('schema-silent refusals: ' + refusedSilent.join('; '))
  if (crashed.length) t.diagnostic('crashes on malformed input: ' + crashed.join('; '))
})

test('a judged edge call fuses hexbitDoorOf into _meta.messaging', () => {
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'uuidna_coins', arguments: {} } }) as {
    result: { _meta: { messaging: { gate: { receipt: string }; door: string; hexbits: number[]; witness: { theoremKey: string } } } }
  }
  const m = r.result._meta.messaging
  const door = hexbitDoorOf(m.gate.receipt)
  assert.equal(m.door, door.door)
  assert.deepEqual(m.hexbits, door.hexbits)
  assert.equal(m.witness.theoremKey, 'crew_verifies_instantly')
})

test('coverage().ready means every sealed theorem is in a monograph — 100% is a finding', () => {
  const c = coverage()
  assert.equal(c.total, theorems().length)
  assert.equal(c.covered + c.uncovered.length, c.total)
  if (!c.ready) {
    assert.ok(c.uncoveredFiles.length > 0, 'not-ready coverage must name uncovered files')
  } else {
    assert.equal(c.uncovered.length, 0)
    assert.equal(c.uncoveredFiles.length, 0)
  }
})

test('stdio and edge agree on empty uuidna_api_mint', async () => {
  const stdio = await Promise.resolve(callTool('uuidna_api_mint', {})) as { receipt: string; count: number }
  const rpc = await Promise.resolve(handleMcpRpc({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'uuidna_api_mint', arguments: {} } })) as { result: { content: { text: string }[] } }
  const edge = JSON.parse(rpc.result.content[0]!.text) as { receipt: string; count: number }
  assert.equal(edge.receipt, stdio.receipt)
  assert.equal(edge.count, stdio.count)
})

test('uuidna_school_apis stays named EDGE_ABSENT; in-memory search now serves at the edge', () => {
  const absent = new Set(edgeAbsentNames())
  assert.ok(absent.has('uuidna_school_apis'), 'school APIs stay listed, not dropped')
  assert.ok(!absent.has('uuidna_search'), 'uuidna_search is in-memory — shrink EDGE_ABSENT')
  assert.ok(!absent.has('uuidna_search_feed'), 'search-feed is pure — the mill serves at the edge')
  assert.ok(mcpHttpToolNames().includes('uuidna_search'))
  assert.ok(mcpHttpToolNames().includes('uuidna_search_feed'))
  assert.ok(mcpHttpToolNames().includes('uuidna_unify'))
})
