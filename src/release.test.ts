import { test } from 'node:test'
import assert from 'node:assert/strict'
import { releaseSteps } from './scripts/release.js'
import { depositEvidence } from './scripts/receipt-deposit.js'

test('release evidence goes to qpu storage by the bearer-gated PUT, and without a token it is UNSENT, never sent', async () => {
  let calls = 0
  const fake = (async (url: string, init: { method: string; headers: Record<string, string>; body: string }) => {
    calls++
    assert.equal(url, 'https://qpu.uuidna.com/storage/receipts/uuidna/release-9.9.9')
    assert.equal(init.method, 'PUT')
    assert.equal(init.headers.authorization, 'Bearer t0k')
    assert.deepEqual(JSON.parse(init.body).steps, [{ step: 'land', kind: 'land', ok: true }])
    return { status: 200, json: async () => ({ holds: true }) }
  }) as unknown as typeof fetch
  const body = { kind: 'release', steps: [{ step: 'land', kind: 'land', ok: true }] }
  const unsent = await depositEvidence('receipts/uuidna/release-9.9.9', body, undefined, fake)
  assert.equal(unsent.sent, false)
  assert.match(unsent.why ?? '', /QPU_WRITE_TOKEN/)
  assert.equal(calls, 0, 'no token means nothing leaves the machine')
  const sent = await depositEvidence('receipts/uuidna/release-9.9.9', body, 't0k', fake)
  assert.equal(sent.sent, true)
  assert.equal(calls, 1)
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
