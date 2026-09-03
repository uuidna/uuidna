import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mcpCitations, mcpCitationGaps } from './mcp-citations.js'
import { THEOREMS } from './theorems/index.js'
import { MCP_CATALOG } from './mcp.js'

test('no served tool cites a proof the ledger does not hold', () => {
  assert.deepEqual(mcpCitationGaps(), [], 'a fabricated citation in a served description is the load-bearing case')
})

test('the finder actually reads the catalogue — a detector finding nothing in nothing is not a result', () => {
  const cites = mcpCitations()
  assert.ok(cites.length > 0, 'the catalogue does cite theorems; zero citations would mean the regex stopped matching')
  const sealed = new Set(THEOREMS.map((t) => t.key))
  for (const c of cites) assert.ok(sealed.has(c.key), `${c.tool} cites ${c.key}`)
  // and it must not mistake a TOOL name for a theorem: every name in the catalogue is snake_case with
  // underscores, so an unguarded pattern would report all 254 of them as fabricated proofs
  const names = new Set(MCP_CATALOG.map((t) => t.name))
  for (const c of cites) assert.ok(!names.has(c.key), `${c.key} is a tool name, not a citation`)
})

test('CONTROL — an unsealed key IS caught, or the clean report means nothing', () => {
  // the finder reads MCP_CATALOG, so the control exercises its rule directly against a key no wing emits,
  // because a test that mutated the served catalogue would prove a rule about a fixture instead of the tree
  const sealed = new Set(THEOREMS.map((t) => t.key))
  const invented = 'this_key_is_not_sealed_anywhere'
  assert.ok(!sealed.has(invented))
  const CITATION = /\b(?!uuidna_)[a-z][a-z0-9]*(?:_[a-z0-9]+){2,}\b/g
  assert.deepEqual([...invented.matchAll(CITATION)].map((m) => m[0]), [invented], 'the pattern must match a theorem-shaped key')
  assert.deepEqual([...'uuidna_through_void'.matchAll(CITATION)].map((m) => m[0]), [], 'and must NOT match a tool name')
  assert.deepEqual([...'a plain english sentence'.matchAll(CITATION)].map((m) => m[0]), [], 'nor ordinary prose')
})
