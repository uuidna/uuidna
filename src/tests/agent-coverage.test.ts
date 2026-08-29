// agent-coverage — Alpine APIs for external agents: ONE hosted MCP door (uuidna_exec), not one tool per apk.
// Node CONTROL injects rpc (handleMcpRpc — the code the host serves). Live fetch of uuidna.com is the Vue walk.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { handleMcpRpc } from '../mcp-http.js'
import { MCP_ALPINE_DOOR } from '../quantum/os/mcp-man.js'
import {
  foldAlpineAgentCoverage, walkHostedAlpineApis, hostedMcpUrl, AGENT_ORIGIN,
} from '../quantum/os/agent-coverage.js'
import { manPagePackages } from '../quantum/os/catalogue.js'

const rpc: (message: object) => Promise<unknown> = async (message) => {
  const r = handleMcpRpc(message as { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> })
  return r instanceof Promise ? r : r
}

test('hosted MCP url is uuidna.com — the world door, not a local stdio socket', () => {
  const url = hostedMcpUrl()
  assert.equal(url, AGENT_ORIGIN + '/mcp')
  assert.equal(MCP_ALPINE_DOOR, 'uuidna_exec')
})

test('fold: zero listed is not 100%, and a missing door is not coverage', () => {
  const empty = foldAlpineAgentCoverage('https://uuidna.com/mcp', true, [])
  assert.equal(empty.ok, false)
  assert.equal(empty.percent, 0)
  assert.equal(empty.wireDoors, 1)
  const noDoor = foldAlpineAgentCoverage('https://uuidna.com/mcp', false, [
    { man: 'busybox-doc', app: 'busybox', covered: true, detail: 'would have' },
  ])
  assert.equal(noDoor.ok, false)
  assert.equal(noDoor.doorPresent, false)
})

test('fold: every man-corpus hit through the one door is 100%', () => {
  const cov = foldAlpineAgentCoverage('https://uuidna.com/mcp', true, [
    { man: 'busybox-doc', app: 'busybox', covered: true, detail: 'ok' },
    { man: 'openssl-doc', app: 'openssl', covered: true, detail: 'ok' },
  ])
  assert.equal(cov.ok, true)
  assert.equal(cov.percent, 100)
  assert.equal(cov.covered, 2)
  assert.equal(cov.listed, 2)
  assert.equal(cov.door, MCP_ALPINE_DOOR)
})

test('walkHostedAlpineApis through handleMcpRpc covers a man-page sample — same code the host serves', async () => {
  const mans = manPagePackages().filter((p) => p.name === 'busybox-doc' || p.name === 'openssl-doc')
  assert.ok(mans.length >= 1, 'catalogue must include a man page to CONTROL the walk')
  const cov = await walkHostedAlpineApis(rpc, mans, { endpoint: AGENT_ORIGIN + '/mcp' })
  assert.equal(cov.doorPresent, true)
  assert.equal(cov.wireDoors, 1)
  assert.equal(cov.listed, mans.length)
  assert.equal(cov.covered, mans.length, cov.missed.join(', ') || 'sample must answer through uuidna_exec')
  assert.equal(cov.ok, true)
})
