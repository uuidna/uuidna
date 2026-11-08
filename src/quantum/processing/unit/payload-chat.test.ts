import { test } from './receipted.js'
import assert from 'node:assert/strict'
import worker, { foldOf, mcpToolsListOf } from './index.js'
import '../../../mcp/families.js'
import { dataOf } from '../../../mcp/qpu-fused.js'

const NIBBLE = [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]
const hueOf = (distance: number) => Math.floor((distance * 360) / 64)

/** Chat calls the plugin already mounted at /api/mcp. The public reading is the formula, the integer, the fold and the hue. */
test('chat: ask calls Payload MCP findDocuments and exposes formula, integer, fold, hue', async () => {
  let called = ''
  let tool = ''
  let sawAuth = false
  const env = {
    PAYLOAD: {
      fetch: async (request: Request) => {
        called = new URL(request.url).pathname
        sawAuth = request.headers.has('authorization')
        assert.equal(request.headers.has('referer'), false)
        const body = (await request.json()) as { method?: string; params?: { name?: string; arguments?: { slug?: string } } }
        tool = body.params?.name ?? ''
        assert.equal(body.method, 'tools/call')
        assert.equal(body.params?.arguments?.slug, 'docs')
        return new Response(JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          result: {
            isError: false,
            content: [{ type: 'text', text: `Document from collection "docs":\n${JSON.stringify({ title: 'Ada Lovelace', email: 'ada@example.com', value: 16, referer: 'https://secret.example/path' })}` }],
          },
        }), { status: 200, headers: { 'content-type': 'application/json' } })
      },
    },
  }
  const reply = (await dataOf('ask', { about: 'plasma hue docs 3 64' }, env as never)) as { reading?: Record<string, unknown> }
  const reading = reply.reading ?? {}
  const fold = foldOf('plasma.hue=16')
  const content = foldOf('16')
  let distance = 0
  for (let i = 0; i < fold.length; i++) distance += NIBBLE[(parseInt(fold[i]!, 16) ^ parseInt(content[i]!, 16)) & 15] ?? 0
  assert.equal(called, '/api/mcp')
  assert.equal(tool, 'findDocuments')
  assert.equal(sawAuth, false)
  assert.equal(reading.formula, 'plasma.hue')
  assert.equal(reading.value, '16')
  assert.equal(reading.fold, fold)
  assert.equal(reading.hue, hueOf(Math.min(distance, 64)))
  assert.equal(typeof reading.hue, 'number')
  const shown = JSON.stringify(reply)
  assert.equal(shown.includes('ada@example.com'), false)
  assert.equal(shown.includes('Ada Lovelace'), false)
  assert.equal(shown.includes('secret.example'), false)
  assert.equal(shown.includes('referer'), false)
  assert.equal('question' in reading, false)
  assert.equal('email' in reading, false)
  assert.equal(JSON.stringify(mcpToolsListOf()).length < 16384, true)
})

/** qpu.uuidna.com /mcp is served DIRECTLY by the unit (eda8c77: the public doors answer at unit speed, no Payload cold
 *  start), so a public ping never enters the Payload app and user auth is not consulted. */
test('chat: an unauthenticated qpu.uuidna.com /mcp call is a public read, served by the unit not Payload', async () => {
  let payloadHit = ''
  const env = {
    PAYLOAD: {
      // the unit must NOT reach Payload for /mcp; if it did, this records the path and the assertion below fails
      fetch: async (request: Request) => {
        payloadHit = new URL(request.url).pathname
        return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } })
      },
    },
  }
  const res = await worker.fetch(new Request('https://qpu.uuidna.com/api', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping' }),
  }), env as never)
  const body = (await res.json()) as { result?: unknown; holds?: boolean; denied?: string; email?: string }
  assert.equal(res.status, 200)
  assert.deepEqual(body.result, {})
  assert.equal(payloadHit, '', 'the unit serves /mcp directly — the Payload app is not consulted')
  assert.equal(JSON.stringify(body).includes('ada@example.com'), false)
})
