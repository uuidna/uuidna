// school PQC MCP — symmetric widths sealed; hybrid profile registered; KEM slots absent on the wire.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMcpRpc } from '../mcp-http.js'
import { resultText, rpcCall } from '../quantum/apps/terminal.js'
import { testClaim } from '../quantum/apps/categories/coding/claim-tester.js'
import { computes } from '../gate.js'
import {
  schoolPqcMcpExamples, expectHolds, PQC_OVERCLAIM, PQC_MCP_ORIGIN, renderPqcMcpMarkdown,
} from '../school/pqc/index.js'

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

test('school PQC examples target uuidna.com/mcp with crypto and profile fused', () => {
  const c = schoolPqcMcpExamples()
  assert.equal(c.endpoint, PQC_MCP_ORIGIN)
  assert.ok(c.examples.length >= 8)
  assert.ok(c.examples.some((e) => e.tool === 'uuidna_crypto'))
  assert.ok(c.examples.some((e) => e.tool === 'uuidna_quantum_profile'))
})

test('PQC markdown cites grover floor theorems', () => {
  const md = renderPqcMcpMarkdown()
  assert.match(md, /PQC-adjacent/)
  assert.match(md, /grover_quadratic_bound/)
})

test('hosted handleMcpRpc answers crypto pqc posture examples', async () => {
  const c = schoolPqcMcpExamples()
  const sample = c.examples.filter((e) => e.tool === 'uuidna_crypto' || e.tool === 'uuidna_quantum_profile' || e.tool === 'uuidna_theorem')
  for (const ex of sample) {
    const raw = await rpc(rpcCall({ kind: 'call', name: ex.tool, args: ex.arguments }, 1))
    const misses = expectHolds(payloadOf(raw), ex.expect)
    assert.equal(misses.length, 0, `${ex.id}: ${misses.map((m: { path: string; got: unknown }) => `${m.path} got ${JSON.stringify(m.got)}`).join('; ')}`)
  }
})

test('claim and test — symmetric floor verifies; fabricated KEM drains at gate', () => {
  const floor = testClaim('After Grover halving the SHA-256 margin is 128 bits, proven by theorem sha256_grover_margin_is_the_address.')
  assert.equal(floor.instrumentValid, true)
  assert.equal(floor.subject!.verdict, 'VERIFIED')

  const fabricated = computes('uuidna deploys ML-KEM-768, proven by theorem ml_kem_768_present')
  assert.equal(fabricated.binary, 0, 'fabricated KEM theorem drains — ML-KEM is not sealed')
})
