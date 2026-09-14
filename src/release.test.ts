import { test } from 'node:test'
import assert from 'node:assert/strict'
import { releaseSteps } from './scripts/release.js'
import { depositEvidence, MCP_DOOR } from './scripts/receipt-deposit.js'

// NO TOKEN ON ANY HOST (the captain, 2026-09-14: "mcp door, no token on host"): release evidence reaches qpu storage as
// one uuidna_evidence {run, deposit} call on the MCP door; the Worker writes over its service binding and chooses the key.
test('release evidence is deposited through the MCP door — a run name and a body, never a token or a storage key', async () => {
  const seen: { url: string; headers: Record<string, string>; body: { method: string; params: { name: string; arguments: { run: string; deposit: unknown } } } }[] = []
  const fake = (async (url: string, init: { method: string; headers: Record<string, string>; body: string }) => {
    seen.push({ url, headers: init.headers, body: JSON.parse(init.body) })
    const text = JSON.stringify({ run: 'release', deposited: true, href: 'https://qpu.uuidna.com/storage/receipts/uuidna/release/x' })
    return { status: 200, json: async () => ({ jsonrpc: '2.0', id: 1, result: { content: [{ type: 'text', text }] } }) }
  }) as unknown as typeof fetch
  const body = { kind: 'release', steps: [{ step: 'land', kind: 'land', ok: true }] }
  const sent = await depositEvidence('release', body, fake)
  assert.equal(sent.sent, true)
  assert.equal(seen.length, 1)
  assert.equal(seen[0]!.url, MCP_DOOR)
  assert.equal(seen[0]!.body.method, 'tools/call')
  assert.equal(seen[0]!.body.params.name, 'uuidna_evidence')
  assert.deepEqual(seen[0]!.body.params.arguments, { run: 'release', deposit: body })
  assert.equal(seen[0]!.headers.authorization, undefined, 'no bearer leaves the host')
})

test('CONTROL: a door that declines or cannot be reached is reported, never counted as sent', async () => {
  const declined = (async () => ({ status: 200, json: async () => ({ result: { content: [{ type: 'text', text: JSON.stringify({ deposited: false, why: 'this surface has no binding to qpu storage' }) }] } }) })) as unknown as typeof fetch
  const r = await depositEvidence('release', { n: 1 }, declined)
  assert.equal(r.sent, false)
  assert.match(r.why ?? '', /no binding/)
  const down = (async () => { throw new Error('connect ECONNREFUSED') }) as unknown as typeof fetch
  const d = await depositEvidence('release', { n: 1 }, down)
  assert.equal(d.sent, false)
  assert.match(d.why ?? '', /ECONNREFUSED/)
})

const kinds = (s: Parameters<typeof releaseSteps>[0]): string[] => releaseSteps(s).map((x) => x.kind)

test('a tree ahead of origin lands first, and nothing outward runs before its proof', () => {
  const k = kinds({ ahead: 3, behind: 0, version: '9.9.9', tagged: false })
  assert.deepEqual(k, ['land', 'forge', 'cut', 'forge', 'registry', 'ship', 'live'])
  assert.ok(k.indexOf('forge') < k.indexOf('cut'), 'no tag before the forge is green on HEAD')
  assert.ok(k.indexOf('registry') < k.indexOf('ship'), 'no ship before the registry serves the version')
})

test('a landed, already-tagged tree skips land and the cut', () => {
  assert.deepEqual(kinds({ ahead: 0, behind: 0, version: '9.9.9', tagged: true }), ['forge', 'registry', 'ship', 'live'])
})

test('a tree behind origin is refused, never released over', () => {
  assert.throws(() => releaseSteps({ ahead: 0, behind: 2, version: '9.9.9', tagged: false }), /behind origin/)
})
