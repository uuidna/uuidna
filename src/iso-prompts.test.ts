// iso-prompts — every sealed theorem is served by MCP's own prompts methods, its text the theorem's Lean doc and
// declaration, on both dispatchers.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMcpRpc } from './mcp-http.js'
import { sealedCount } from './theorems/index.js'

type Reply = { result?: Record<string, unknown>; error?: { message: string } }
const rpc = (method: string, params: Record<string, unknown> = {}): Reply => handleMcpRpc({ jsonrpc: '2.0', id: 1, method, params }) as Reply

test('initialize declares prompts, and prompts/list pages through every sealed theorem', () => {
  assert.ok((rpc('initialize').result!.capabilities as Record<string, unknown>).prompts)
  const first = rpc('prompts/list').result as { prompts: { name: string }[]; nextCursor?: string }
  assert.equal(first.prompts.length, 100)
  assert.ok(first.prompts.every((p) => p.name.startsWith('iso-test-')))
  const second = rpc('prompts/list', { cursor: first.nextCursor }).result as { prompts: { name: string }[] }
  assert.notEqual(second.prompts[0]!.name, first.prompts[0]!.name)
  assert.ok(sealedCount() > 100)
})

test('prompts/get returns the theorem as Lean holds it: its doc, then the declaration that is its test', () => {
  const r = rpc('prompts/get', { name: 'iso-test-two_coins' }).result as { description: string; messages: { content: { text: string } }[] }
  assert.match(r.description, /two coins/i)
  assert.match(r.messages[0]!.content.text, /^\/-- .+ -\/\ntheorem two_coins : 110 - 108 = 2 := by decide$/s)
})

test('CONTROL: a prompt that names no sealed theorem is refused, not invented', () => {
  assert.match(rpc('prompts/get', { name: 'iso-test-not_a_theorem_xyz' }).error!.message, /names no sealed theorem/)
})
