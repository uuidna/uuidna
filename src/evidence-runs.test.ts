// evidence-runs — the host's state served as doors of uuidna_evidence {run}; each rule has a control that must fire.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from './mcp.js'
import { receiptSealed } from './refusal-trials.js'
import { VE_FACES } from './hexbit/index.js'

const machine = { measured: true, surface: 'test host', model: 'probe' }

test('device reports the measured hardware of the machine serving the call', async () => {
  const r = await callTool('uuidna_evidence', { run: 'device' }, { hardware: () => machine }) as { run: string; measured: boolean; surface: string }
  assert.equal(r.run, 'device')
  assert.equal(r.measured, true)
  assert.equal(r.surface, 'test host')
})

test('CONTROL: device with no surface measurement refuses — never an absence reported as a state', async () => {
  await assert.rejects(Promise.resolve(callTool('uuidna_evidence', { run: 'device' })), /measured is always true/)
})

test('court-orders reads the court on the host that holds the tree', async () => {
  const r = await callTool('uuidna_evidence', { run: 'court-orders' }) as { measured: boolean; recorded: number; pending: number; byKind: Record<string, number> }
  assert.equal(r.measured, true)
  assert.ok(r.recorded >= r.pending, 'pending is a subset of what the court records')
  assert.equal(Object.values(r.byKind).reduce((s, n) => s + n, 0), r.pending, 'the kinds partition the pending orders')
})

test('land-state names the writer lock and the last certified landing', async () => {
  const r = await callTool('uuidna_evidence', { run: 'land-state' }) as { measured: boolean; writer: unknown; gate: { covers: unknown } }
  assert.equal(r.measured, true)
  assert.ok('writer' in r, 'the lock holder is reported, null when the tree is free')
  assert.notEqual(r.gate.covers, null, 'the gate receipt covers are read')
})

test('a deposit lands at the content address of its body, through the surface binding', async () => {
  const writes: { key: string; value: unknown }[] = []
  const ctx = { deposit: async (key: string, value: unknown) => { writes.push({ key, value }); return { holds: true } } }
  const body = { kind: 'probe', n: 1 }
  const r = await callTool('uuidna_evidence', { run: 'probe', deposit: body }, ctx) as { deposited: boolean; key: string; address: string; href: string }
  assert.equal(r.deposited, true)
  assert.equal(writes.length, 1)
  assert.equal(writes[0]!.key, r.key)
  assert.match(r.key, /^receipts\/uuidna\/probe\/[0-9a-f-]{36}$/)
  assert.equal(r.href, `https://qpu.uuidna.com/storage/${r.key}`)
  // the stored receipt carries its 2×7 theorem signatures and verifies from its own bytes
  const stored = writes[0]!.value as Record<string, unknown> & { sealedBy: { signed: number; of: number; witnesses: { by: string }[] } }
  assert.equal(stored.sealedBy.signed, VE_FACES)
  assert.equal(new Set(stored.sealedBy.witnesses.map((w) => w.by)).size, VE_FACES, 'fourteen distinct theorems sign')
  assert.ok(receiptSealed(stored))
  assert.ok(!receiptSealed({ ...stored, n: 9 }), 'CONTROL: a changed receipt no longer verifies')
  // the same body lands at the same key whatever its key order — the address is the content
  const again = await callTool('uuidna_evidence', { run: 'probe', deposit: { n: 1, kind: 'probe' } }, ctx) as { key: string }
  assert.equal(again.key, r.key)
})

test('CONTROL: a deposit cannot choose its key, and a surface with no binding says so', async () => {
  const writes: string[] = []
  const ctx = { deposit: async (key: string) => { writes.push(key); return { holds: true } } }
  const r = await callTool('uuidna_evidence', { run: 'probe', deposit: { key: 'receipts/uuidna/someone-else', n: 2 } }, ctx) as { key: string }
  assert.doesNotMatch(r.key, /someone-else/, 'a key inside the body is content, never the storage key')
  const unbound = await callTool('uuidna_evidence', { run: 'probe', deposit: { n: 3 } }) as { deposited: boolean; why: string }
  assert.equal(unbound.deposited, false)
  assert.match(unbound.why, /no binding to qpu storage/)
  await assert.rejects(Promise.resolve(callTool('uuidna_evidence', { run: '../escape', deposit: { n: 4 } }, ctx)), /run must be a short lowercase name/)
  await assert.rejects(Promise.resolve(callTool('uuidna_evidence', { run: 'probe', deposit: { n: 5, sealedBy: { seal: 'mine' } } }, ctx)), /written by the 2×7 witness fold/)
})

test('at the edge, a run with no host log reads its deposits from qpu storage, newest first', async () => {
  let asked = ''
  const qpu = (async (url: string) => {
    asked = url
    const rows = [
      { key: 'live/probe-live/0001-aaaaaaaa-aaaa-8aaa-aaaa-aaaaaaaaaaaa', doc: { value: { n: 2 } } },
      { key: 'live/probe-live/0002-bbbbbbbb-bbbb-8bbb-bbbb-bbbbbbbbbbbb', doc: { value: { n: 1 } } },
    ]
    return new Response(JSON.stringify({ keys: rows }), { status: 200 })
  }) as unknown as typeof fetch
  const r = await callTool('uuidna_evidence', { run: 'probe-live', latest: 5 }, { fetch: qpu }) as { measured: boolean; source: string; latest: { address: string; value: { n: number } }[] }
  assert.equal(r.measured, true)
  assert.match(asked, /\?prefix=live%2Fprobe-live%2F&limit=5$/)
  assert.deepEqual(r.latest.map((x) => x.value.n), [2, 1], 'the order qpu lists — newest first — is kept')
  assert.equal(r.latest[0]!.address, 'aaaaaaaa-aaaa-8aaa-aaaa-aaaaaaaaaaaa')
  // CONTROL: with no binding to read through, the door answers from the host log's own refusal — never an invented record
  const none = await callTool('uuidna_evidence', { run: 'probe-live' }) as { measured: boolean }
  assert.equal(none.measured, false)
})

test('CONTROL: an unknown run is refused by name, not answered as empty', async () => {
  const r = await callTool('uuidna_evidence', { run: 'no-such-run' }) as { measured: boolean; why: string }
  assert.equal(r.measured, false)
  assert.match(r.why, /run must be one of/)
})
