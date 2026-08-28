// mcp-edge-coverage — every catalogue tool not declared EDGE_ABSENT dispatches through handleMcpRpc.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MCP_CATALOG, callTool } from '../mcp.js'
import { handleMcpRpc, mcpHttpToolNames, edgeAbsentNames } from '../mcp-http.js'
import { hexbitDoorOf } from '../hexbit/index.js'
import { coverage } from '../publish.js'
import { theorems } from '../theorems/index.js'

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
