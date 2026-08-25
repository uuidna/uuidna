// tool-scope — THE QUESTION AN OUTSIDE CALLER ACTUALLY HAS. An agent audited its own site against the hosted MCP
// and concluded none of the 204 tools applied; it was right, and the surface could not have told it so. These
// tests pin the three scopes against the real tools that motivated them, and each carries the mutation that
// breaks it (the falsifiability law in scripts/api.ts).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { scopeOf, scopeCensus, toolsInScope, type ToolScope } from '../tool-scope.js'
import { MCP_CATALOG } from '../mcp.js'

const schema = (...names: string[]) => ({ properties: Object.fromEntries(names.map((n) => [n, { type: 'string' }])) })

test('the three tools that motivated this module classify as they actually behave', () => {
  // uuidna_css: an empty schema. There is no entry point for a caller's brand colour — this is the tool the
  // reporting agent named first, and the metric in mcp.ts rates it 5/5 "maximally reusable".
  assert.equal(scopeOf({ properties: {} }), 'fixed')
  // uuidna_seo: {key, slug, route} — three parameters, every one an identifier inside uuidna's own ledger.
  assert.equal(scopeOf(schema('key', 'slug', 'route')), 'self')
  // uuidna_edit: {draft, before, after} — arbitrary prose, the caller's own material.
  assert.equal(scopeOf(schema('draft', 'before', 'after')), 'generic')
})

test('parameter COUNT is not reach — the conflation the existing rating cannot see', () => {
  // both of these have zero REQUIRED keys and rate 5/5 in mcpBenchmark; they are not the same product
  assert.notEqual(scopeOf({ properties: {} }), scopeOf(schema('draft')))
  // and a tool with many ledger identifiers is still self-scoped, however many it has
  assert.equal(scopeOf(schema('key', 'slug', 'route', 'address', 'handle', 'skill')), 'self')
})

test('a name in BOTH vocabularies resolves to the ledger reading', () => {
  // `key` is a theorem key here, not a caller's secret. Reading it as caller content would classify the entire
  // self-describing half of the catalogue as generic — the exact error this module exists to correct.
  assert.equal(scopeOf(schema('key')), 'self')
  // the mutation: pair it with genuine caller content and the tool becomes reachable
  assert.equal(scopeOf(schema('key', 'draft')), 'generic')
})

test('the census over the REAL served catalogue, and it must not be all one thing', () => {
  const c = scopeCensus(MCP_CATALOG)
  assert.equal(c.total, MCP_CATALOG.length)
  assert.equal(c.generic + c.self + c.fixed, c.total, 'every tool lands in exactly one scope')
  // the finding that motivated the module: a real minority can hear the caller, and a real majority cannot
  assert.ok(c.generic > 0 && c.self > 0 && c.fixed > 0, 'all three scopes are populated on the live surface')
  assert.ok(c.self + c.fixed > c.generic, 'most of this surface describes uuidna — the fact a caller needs up front')
  assert.match(c.honest, /never what it is good at/, 'the census must refuse to be read as a quality judgement')
})

test('the filter returns a usable subset and preserves catalogue order', () => {
  const generic = toolsInScope(MCP_CATALOG, 'generic')
  assert.ok(generic.length > 20, `a caller filtering for reachable tools must get a real product, got ${generic.length}`)
  assert.ok(generic.every((t) => scopeOf(t.inputSchema) === 'generic'))
  // order preserved: a filter is a view, and a reordering view invents a ranking nobody expressed
  const names = generic.map((t) => t.name)
  assert.deepEqual(names, MCP_CATALOG.filter((t) => scopeOf(t.inputSchema) === 'generic').map((t) => t.name))
  // and asking for several scopes at once unions them
  const both: ToolScope[] = ['generic', 'fixed']
  assert.equal(toolsInScope(MCP_CATALOG, both).length, scopeCensus(MCP_CATALOG).generic + scopeCensus(MCP_CATALOG).fixed)
})
