// mcp-http.test — the HOSTED MCP over HTTP (the /mcp worker route) is a recomputable JSON-RPC contract: initialize
// announces the protocol, tools/list enumerates the Workers-safe tool subset, tools/call runs a tool and wraps the
// result as MCP content, a notification carries no reply, and an unknown method is a JSON-RPC error. This test is also
// the ROOT that reaches src/mcp-http.ts (worker.js is not in the TS import graph), so the module earns its place.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMcpRpc, mcpHttpToolNames, MCP_HTTP_PROTOCOL } from '../mcp-http.js'
import { coinSupply } from '../coin-supply.js'
import { hexbitDoorOf, HANDLE_HEXBITS } from '../hexbit/index.js'
import { messagingEnvelope, ledgerLine, depositCoins, gateVerdict } from '../gate-engine.js'

test('initialize announces the protocol and server', () => {
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'initialize' }) as { result: { protocolVersion: string; serverInfo: { name: string }; capabilities: { tools: unknown } } }
  assert.equal(r.result.protocolVersion, MCP_HTTP_PROTOCOL)
  assert.equal(r.result.serverInfo.name, 'uuidna')
  assert.ok(r.result.capabilities.tools)
})

test('tools/list enumerates the Workers-safe subset (every tool named, described, schema-typed)', () => {
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' }) as { result: { tools: { name: string; description: string; inputSchema: { type: string } }[] } }
  const tools = r.result.tools
  assert.ok(tools.length >= 9, 'at least the 9 pure tools')
  assert.deepEqual([...tools].map((t) => t.name), mcpHttpToolNames())
  for (const t of tools) {
    assert.equal(typeof t.description, 'string')
    assert.ok(t.description.length > 0)
    assert.equal(t.inputSchema.type, 'object')
  }
})

test('tools/call runs a tool and wraps the result as MCP text content', () => {
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'uuidna_coins', arguments: {} } }) as { result: { content: { type: string; text: string }[] } }
  assert.equal(r.result.content[0].type, 'text')
  assert.deepEqual(JSON.parse(r.result.content[0].text), coinSupply())
})

test('tools/call is deterministic — the same call recomputes the same address', () => {
  const call = () => handleMcpRpc({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'uuidna_address', arguments: { value: 'hello' } } }) as { result: { content: { text: string }[] } }
  assert.equal(call().result.content[0].text, call().result.content[0].text)
})

test('an unknown tool is a tools/call error', () => {
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'uuidna_not_a_tool', arguments: {} } }) as { error?: { code: number } }
  assert.equal(r.error?.code, -32602)
})

test('a notification carries no reply (null), an unknown method is -32601', () => {
  assert.equal(handleMcpRpc({ jsonrpc: '2.0', method: 'notifications/initialized' }), null)
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 6, method: 'no_such_method' }) as { error?: { code: number } }
  assert.equal(r.error?.code, -32601)
})

test('messagingEnvelope matches ledgerLine on both surfaces', () => {
  const g = gateVerdict('uuidna_coins', {}, { coins: 2 })
  const dep = depositCoins('uuidna_coins', g.gate.receipt)
  const rec = { receipt: 'abc', seq: 1, referer: 'genesis', tool: 'uuidna_coins' }
  const stdio = messagingEnvelope({ surface: 'stdio', gate: g.gate, deposit: dep, receipt: rec })
  const edge = messagingEnvelope({ surface: 'edge', gate: g.gate, deposit: dep })
  assert.equal(stdio.ledger, ledgerLine(g.gate, dep, { receipt: rec.receipt, seq: rec.seq }))
  assert.equal(edge.ledger, ledgerLine(g.gate, dep))
  assert.equal(stdio.surface, 'stdio')
  assert.equal(edge.surface, 'edge')
  assert.ok(stdio.receipt)
  assert.equal(edge.receipt, undefined)
  const door = hexbitDoorOf(g.gate.receipt)
  assert.equal(edge.door, door.door)
  assert.deepEqual(edge.hexbits, door.hexbits)
  assert.equal(edge.witness.theoremKey, 'crew_verifies_instantly')
  assert.equal(edge.channel.handle, door.handle)
})

test('every judged edge call carries _meta.messaging', () => {
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'uuidna_coins', arguments: {} } }) as { result: { _meta: { messaging: { ledger: string; gate: { clean: boolean }; deposit: { coins: number } } } } }
  const m = r.result._meta.messaging
  assert.ok(m.ledger.startsWith('gate CLEAN'))
  assert.equal(m.deposit.coins, 2)
  assert.equal(m.gate.clean, true)
})

test('gate_status {messaging:true} reports healthy at the edge', () => {
  const r = handleMcpRpc({ jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'uuidna_gate_status', arguments: { messaging: true } } }) as { result: { content: { text: string }[] } }
  const edge = JSON.parse(r.result.content[0].text) as { healthy: boolean; session: { surface: string } }
  assert.equal(edge.healthy, true)
  assert.equal(edge.session.surface, 'edge')
})

test('uuidna_api_mint with no query serves the public-API catalog at the edge', async () => {
  const r = await handleMcpRpc({ jsonrpc: '2.0', id: 8, method: 'tools/call', params: { name: 'uuidna_api_mint', arguments: {} } }) as { result: { content: { text: string }[]; isError?: boolean } }
  assert.notEqual(r.result.isError, true)
  const cat = JSON.parse(r.result.content[0].text) as { count: number; handle: string; door: string; receipt: string }
  assert.ok(cat.count >= 20)
  assert.equal(cat.handle.length, HANDLE_HEXBITS)
  assert.match(cat.door, new RegExp(`^https://uuidna\\.com/[0-9a-f]{${HANDLE_HEXBITS}}$`))
})
