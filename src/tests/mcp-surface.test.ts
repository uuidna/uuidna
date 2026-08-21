// mcp-surface — THE TWO SERVED SURFACES, HELD TOGETHER.
//
// src/mcp.ts is the stdio catalogue; src/mcp-http.ts is the Cloudflare Workers edge behind https://uuidna.com/mcp.
// Nothing computes one from the other, so they drift — the edge advertised 0.1.1 for eleven releases while the
// package reached 0.2.5, and mcp-version.test.ts now holds that one constant. This holds the rest: an argument
// contract that differs between the surfaces, and a name the edge serves that the catalogue does not. Both classes
// are real today, so they are DECLARED in lean/mcp-surface-divergence.json — a list that may only SHRINK. A new
// divergence fails here by name; a repaired one must be deleted, because a stale excuse is drift with paperwork.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { MCP_CATALOG, callTool } from '../mcp.js'
import { handleMcpRpc, mcpHttpToolNames, edgeAbsentNames } from '../mcp-http.js'

interface Declared {
  argumentDivergence: { tool: string; stdio: string[]; edge: string[]; note: string }[]
  edgeOnlyNames: { tool: string; note: string }[]
}
const declared = JSON.parse(readFileSync(join(ROOT, 'lean', 'mcp-surface-divergence.json'), 'utf8')) as Declared

const edgeTools = (): { name: string; description: string; inputSchema: { required?: string[] } }[] =>
  (handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as { result: { tools: { name: string; description: string; inputSchema: { required?: string[] } }[] } }).result.tools
const required = (s?: { required?: string[] }): string[] => [...(s?.required ?? [])].sort()
const localSchemas = new Map(MCP_CATALOG.map((t) => [t.name, required(t.inputSchema)]))

test('every edge tool is either in the stdio catalogue or a DECLARED edge-only name', () => {
  const declaredNames = new Set(declared.edgeOnlyNames.map((d) => d.tool))
  const undeclared = edgeTools().map((t) => t.name).filter((n) => !localSchemas.has(n) && !declaredNames.has(n))
  assert.deepEqual(undeclared, [],
    'the hosted endpoint serves a tool the stdio catalogue does not — register it in src/mcp.ts, or declare the divergence in lean/mcp-surface-divergence.json with the reason')
  // MAY ONLY SHRINK: a declared name that no longer diverges must be deleted, or the list becomes a place to hide
  for (const d of declared.edgeOnlyNames)
    assert.ok(edgeTools().some((t) => t.name === d.tool) && !localSchemas.has(d.tool),
      `${d.tool} no longer diverges — delete its entry from lean/mcp-surface-divergence.json`)
})

test('a tool served by BOTH surfaces takes the same required arguments, or the difference is declared', () => {
  const declaredArgs = new Map(declared.argumentDivergence.map((d) => [d.tool, d]))
  const found: string[] = []
  for (const t of edgeTools()) {
    const local = localSchemas.get(t.name)
    if (!local) continue
    const edge = required(t.inputSchema)
    if (JSON.stringify(local) === JSON.stringify(edge)) continue
    found.push(t.name)
    const d = declaredArgs.get(t.name)
    assert.ok(d, `${t.name} takes ${JSON.stringify(local)} over stdio and ${JSON.stringify(edge)} at the edge — an agent that learned it on one surface gets an error on the other. Fix one surface, or declare it in lean/mcp-surface-divergence.json`)
    assert.deepEqual([[...d.stdio].sort(), [...d.edge].sort()], [local, edge],
      `${t.name} diverges differently than lean/mcp-surface-divergence.json records — update the entry to the arguments actually served`)
  }
  // MAY ONLY SHRINK: every declared divergence must still be real
  for (const d of declared.argumentDivergence)
    assert.ok(found.includes(d.tool), `${d.tool} no longer diverges — delete its entry from lean/mcp-surface-divergence.json`)
})

test('the research surface is served by BOTH, with identical argument contracts', () => {
  const names = mcpHttpToolNames()
  for (const tool of ['uuidna_research', 'uuidna_research_ledger', 'uuidna_rosetta_legs']) {
    assert.ok(localSchemas.has(tool), `${tool} must be in the stdio catalogue`)
    assert.ok(names.includes(tool), `${tool} must be served by the hosted edge — registering it in src/mcp.ts alone leaves uuidna.com/mcp without it`)
    const edge = edgeTools().find((t) => t.name === tool)!
    assert.deepEqual(required(edge.inputSchema), localSchemas.get(tool), `${tool} must take the same required arguments on both surfaces`)
    assert.ok(edge.description.length > 0)
  }
})

test('the hosted edge REFUSES a missing required argument instead of computing over "undefined"', () => {
  const call = (name: string, args: Record<string, unknown>) =>
    handleMcpRpc({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name, arguments: args } }) as { result: { content: { text: string }[]; isError?: boolean } }
  const r = call('uuidna_research', {})
  assert.equal(r.result.isError, true)
  assert.match(r.result.content[0].text, /missing required argument: text/)
  assert.doesNotMatch(r.result.content[0].text, /"address"/, 'nothing may be computed when a required argument is absent')
  // EVERY required-argument tool at the edge
  for (const t of edgeTools()) {
    if (!(t.inputSchema.required ?? []).length) continue
    const out = call(t.name, {})
    assert.equal(out.result.isError, true, `${t.name} must refuse an empty call`)
    assert.match(out.result.content[0].text, /missing required argument/, `${t.name} must say WHICH argument is missing`)
  }
  // NEGATIVE CONTROL: a tool with no required arguments must still RUN on an empty call
  const zero = call('uuidna_coins', {})
  assert.notEqual(zero.result.isError, true)
  assert.deepEqual(JSON.parse(zero.result.content[0].text), { coins: 2 })
})

test('the same call to both surfaces returns the same research answer', () => {
  const text = 'the Betz ceiling is sixteen twenty-sevenths of the kinetic energy in the wind'
  const stdio = callTool('uuidna_research', { text }) as { address: string; entangledReceipt: string; novel: boolean }
  const rpc = handleMcpRpc({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'uuidna_research', arguments: { text } } }) as { result: { content: { text: string }[] } }
  const edge = JSON.parse(rpc.result.content[0].text) as { address: string; entangledReceipt: string; novel: boolean }
  assert.equal(edge.address, stdio.address)
  assert.equal(edge.entangledReceipt, stdio.entangledReceipt)
  // NEGATIVE CONTROL: a DIFFERENT text must not land on the same address, or the comparison proves nothing
  const other = callTool('uuidna_research', { text: text + '.' }) as { address: string }
  assert.notEqual(other.address, stdio.address)
  // and the research ledger folds to one identity across both surfaces
  const ledgerLocal = callTool('uuidna_research_ledger', {}) as { receipt: string }
  const ledgerEdge = JSON.parse((handleMcpRpc({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'uuidna_research_ledger', arguments: {} } }) as { result: { content: { text: string }[] } }).result.content[0].text) as { receipt: string }
  assert.equal(ledgerEdge.receipt, ledgerLocal.receipt)
})

// ── THE GAP THAT WAS NEVER DECLARED. The edge kept a SECOND hand-written list and called itself "the Workers-safe
// subset", which reads as a safety boundary. Measured on 2026-08-20: it served 19 of 191 tools, and of the 172
// missing, exactly ONE actually touched the filesystem, network or a process. The other 171 were pure arithmetic
// absent for no stated reason, and lean/mcp-surface-divergence.json — the file whose job is to declare divergence
// and which may only shrink — listed 4 argument divergences and 2 edge-only names, saying nothing about any of it.
// The edge now INHERITS the one catalogue and subtracts only what it names. This holds that shape.
test('the edge serves the whole catalogue except what it DECLARES it cannot', () => {
  const served = new Set(mcpHttpToolNames())
  const absent = new Set(edgeAbsentNames())
  const catalogue = MCP_CATALOG.map((t) => t.name)
  const undeclared = catalogue.filter((n) => !served.has(n) && !absent.has(n))
  assert.deepEqual(undeclared, [], 'these tools are missing from the edge with NO declared reason — the drift this test exists to stop')
})

test('every declared absence is a real tool — a stale excuse is drift with paperwork', () => {
  const catalogue = new Set(MCP_CATALOG.map((t) => t.name))
  const ghosts = edgeAbsentNames().filter((n) => !catalogue.has(n))
  assert.deepEqual(ghosts, [], 'these are declared absent but do not exist in the catalogue at all')
  const contradictions = edgeAbsentNames().filter((n) => mcpHttpToolNames().includes(n))
  assert.deepEqual(contradictions, [], 'declared absent AND served — the declaration and the code disagree')
})

test('an inherited tool answers with the SAME dispatch the stdio surface uses', () => {
  const viaEdge = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call',
    params: { name: 'uuidna_theorem', arguments: { key: 'two_coins' } } }) as { result: { content: { text: string }[] } }
  const edgeBody = JSON.parse(viaEdge.result.content[0].text) as { key: string }
  const stdioBody = callTool('uuidna_theorem', { key: 'two_coins' }) as { key: string }
  assert.equal(edgeBody.key, stdioBody.key, 'one door, one answer — two dispatches would be the next drift')
})
