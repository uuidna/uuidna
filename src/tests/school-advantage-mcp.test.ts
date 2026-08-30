// school advantage MCP examples — quantum advantage as hosted tools/call (decide for 2^n, uuidna_quantum for state vectors; n_qubit_dimension).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMcpRpc } from '../mcp-http.js'
import { resultText } from '../quantum/apps/terminal.js'
import { rpcCall } from '../quantum/apps/terminal.js'
import { QA_REQUIRED_THEOREMS } from '../quantum/advantage/audit/index.js'
import {
  schoolAdvantageMcpExamples, expectHolds, ADVANTAGE_MCP_ORIGIN, ADVANTAGE_OVERCLAIM,
  hookAdvantageMcp, renderAdvantageMcpMarkdown,
} from '../school/advantage/index.js'

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

test('school advantage examples target uuidna.com/mcp with decide and uuidna_quantum fused', () => {
  const c = schoolAdvantageMcpExamples()
  assert.equal(c.endpoint, ADVANTAGE_MCP_ORIGIN)
  assert.equal(c.definition, 'school·mcp·uuidna.com/mcp·quantum-advantage')
  assert.ok(c.examples.length >= 8)
  assert.ok(c.examples.some((e) => e.tool === 'uuidna_quantum'), 'uuidna_quantum serves at the edge — state vectors, not named-absent')
  assert.ok(c.examples.some((e) => e.tool === 'uuidna_decide'), '2^n cost stays uuidna_decide')
  for (const k of QA_REQUIRED_THEOREMS)
    assert.ok(c.examples.some((e) => e.theorem === k), `curriculum must include ${k}`)
})

test('each example carries constructor expect and a curl against the world door', () => {
  const c = schoolAdvantageMcpExamples()
  for (const e of c.examples) {
    assert.ok(e.expect.length > 0, e.id)
    assert.match(e.curl, /https:\/\/uuidna\.com\/mcp/)
    assert.match(e.curl, new RegExp(e.tool))
  }
})

test('overclaim example cites n_qubit_dimension — VERIFIED is not endorsement', () => {
  const c = schoolAdvantageMcpExamples()
  const g = c.examples.find((e) => e.id === 'gate-overclaim')
  assert.ok(g)
  assert.equal(g.tool, 'uuidna_gate')
  assert.equal((g.arguments as { claim?: string }).claim, ADVANTAGE_OVERCLAIM)
  assert.equal(g.expect.find((x) => x.path === 'verdict')?.equals, 'VERIFIED')
})

test('school advantage markdown cites the sealed classical bound on the same line as the claim', () => {
  const md = renderAdvantageMcpMarkdown()
  const first = md.split(/\n{2,}/)[0] ?? ''
  assert.match(first, /quantum advantage/i)
  assert.match(first, /\/theorem\/n_qubit_dimension/)
})

test('hosted handleMcpRpc answers the decide and os examples — same code uuidna.com serves', async () => {
  const c = schoolAdvantageMcpExamples()
  const sample = c.examples.filter((e) => e.tool === 'uuidna_decide' || e.tool === 'uuidna_quantum' || e.tool === 'uuidna_os' || e.tool === 'uuidna_gate' || e.id === 'read-cost')
  assert.ok(sample.length >= 4)
  for (const ex of sample) {
    const raw = await rpc(rpcCall({ kind: 'call', name: ex.tool, args: ex.arguments }, 1))
    const misses = expectHolds(payloadOf(raw), ex.expect)
    assert.equal(misses.length, 0, `${ex.id}: ${misses.map((m) => `${m.path} got ${JSON.stringify(m.got)} want ${JSON.stringify(m.want)}`).join('; ')}`)
  }
})

test('hookAdvantageMcp reads nest below encoder from uuidna_os', async () => {
  const h = await hookAdvantageMcp(async (name, args) => payloadOf(await rpc(rpcCall({ kind: 'call', name, args }, 1))))
  assert.equal(h.hooked.nestBelowEncoder, true)
  assert.equal(h.typeRungs, 6)
})
