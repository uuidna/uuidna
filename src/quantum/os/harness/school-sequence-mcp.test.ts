// school sequence MCP — living field stroke, reflection group, zeropoint throat.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMcpRpc } from '../../../mcp-http.js'
import { resultText, rpcCall } from '../../apps/terminal.js'
import { computes } from '../../../gate.js'
import {
  schoolSequenceMcpExamples, expectHolds, SEQUENCE_OVERCLAIM, SEQUENCE_MCP_ORIGIN, renderSequenceMcpMarkdown,
} from '../../../index.js'

const rpc = async (message: object): Promise<unknown> => {
  const r = handleMcpRpc(message as { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> })
  return r instanceof Promise ? r : r
}

const payloadOf = (raw: unknown): unknown => {
  const text = resultText(raw)
  const first = text.split('\n')[0] ?? ''
  if (first.startsWith('{') || first.startsWith('[')) {
    try { return JSON.parse(first) } catch { return raw }
  }
  return raw
}

test('school sequence examples target uuidna.com/mcp with living-field tools', () => {
  const c = schoolSequenceMcpExamples()
  assert.equal(c.endpoint, SEQUENCE_MCP_ORIGIN)
  assert.ok(c.examples.length >= 8)
  assert.ok(c.examples.some((e) => e.tool === 'uuidna_living_field'))
  assert.ok(c.examples.some((e) => e.tool === 'uuidna_development_vortex'))
})

test('sequence markdown cites seal_ten and agl_order_54', () => {
  const md = renderSequenceMcpMarkdown()
  assert.match(md, /seal_ten/)
  assert.match(md, /agl_order_54/)
  assert.match(md, /zeropoint-node/)
})

test('hosted handleMcpRpc answers living-field examples', async () => {
  const c = schoolSequenceMcpExamples()
  const sample = c.examples.filter((e) =>
    e.tool !== 'uuidna_gate' && e.tool !== 'uuidna_theorem')
  for (const ex of sample) {
    const raw = await rpc(rpcCall({ kind: 'call', name: ex.tool, args: ex.arguments }, 1))
    const misses = expectHolds(payloadOf(raw), ex.expect)
    assert.equal(misses.length, 0, `${ex.id}: ${misses.map((m: { path: string; got: unknown }) => `${m.path} got ${JSON.stringify(m.got)}`).join('; ')}`)
  }
})

test('gate drains sequence consciousness overclaim', () => {
  const drained = computes(SEQUENCE_OVERCLAIM)
  assert.equal(drained.binary, 0, 'consciousness / zero-entropy prose drains')
})
