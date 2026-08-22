// api-handles — THE API IS SEALED IN HEXBIT HANDLES, AND THE SEAL CAN CATCH A DRIFT
//
// A tool's name is a promise and its description is the contract a caller decides by; before this seal, the
// contract could be reworded and the name would go on vouching for it. Now every listed tool carries the handle
// of its own contract and each listing carries the fold of everything it serves — so two parties comparing one
// eight-character string have compared every contract at once. The tests hold both directions: the seal
// recomputes for what stands, and MOVES for one changed word (the control that can fail).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MCP_CATALOG, TOOL_NAMES, toolHandleOf, apiHandleOf } from '../mcp.js'
import { handleMcpRpc } from '../mcp-http.js'

test('every tool contract folds to its own eight-tile handle, all distinct', () => {
  const handles = MCP_CATALOG.map((t) => toolHandleOf(t))
  for (const h of handles) assert.match(h, /^[0-9a-f]{8}$/)
  assert.equal(new Set(handles).size, MCP_CATALOG.length, 'no two contracts share an address')
})

test('the api seal recomputes and counts exactly the served surface', () => {
  const seal = apiHandleOf(MCP_CATALOG)
  assert.equal(seal.count, TOOL_NAMES.length)
  assert.match(seal.root, /^[0-9a-f-]{36}$/)
  assert.equal(seal.handle, apiHandleOf(MCP_CATALOG).handle, 'the fold is deterministic')
})

test('CONTROL — one reworded description moves the tool handle AND the api handle', () => {
  const tampered = MCP_CATALOG.map((t, i) => (i === 0 ? { ...t, description: t.description + ' (improved)' } : t))
  assert.notEqual(toolHandleOf(tampered[0]!), toolHandleOf(MCP_CATALOG[0]!), 'the contract changed, so its address changed')
  assert.notEqual(apiHandleOf(tampered).handle, apiHandleOf(MCP_CATALOG).handle, 'and the whole surface confesses it')
})

test('the edge listing serves each tool with its handle and the listing with its fold', () => {
  const res = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/list' }) as { result: { tools: { name: string; description: string; handle: string }[]; _meta: { api: { count: number; handle: string } } } }
  const { tools, _meta } = res.result
  assert.ok(tools.length > 0)
  for (const t of tools) assert.equal(t.handle, toolHandleOf(t), `${t.name}: the listed handle recomputes from the listed contract`)
  assert.equal(_meta.api.count, tools.length)
  assert.equal(_meta.api.handle, apiHandleOf(tools).handle, 'the listing fold recomputes from the listing alone')
})

test('the two surfaces seal with ONE computation — same contract, same handle on either side', () => {
  // the edge inherits from the catalogue, so any tool served by both must carry the identical handle
  const res = handleMcpRpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' }) as { result: { tools: { name: string; description: string; handle: string }[] } }
  for (const t of res.result.tools) {
    const own = MCP_CATALOG.find((c) => c.name === t.name)
    if (own && own.description === t.description) assert.equal(t.handle, toolHandleOf(own))
  }
})
