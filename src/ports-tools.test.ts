import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, TOOL_NAMES } from './mcp.js'

// Ten ports were given MCP doors and the tool-exercise audit objected within one run: a tool with no dedicated
// test is aggregate-only, and the under-tested set may not grow. A baseline exemption was available and would
// have been the wrong door — the audit is asking whether the tool WORKS, and answering that is cheaper than
// declaring it unanswered.

test('uuidna_ports — every domain, and the totals over-count rather than partition', () => {
  const c = callTool('uuidna_ports') as { ports: unknown[]; totals: { domains: number; packages: number } }
  assert.ok(c.ports.length > 0)
  assert.ok(c.totals.packages > c.totals.domains, 'packages far exceed domains')
})

test('uuidna_chat — census without text, sealed chain with it', () => {
  const census = callTool('uuidna_chat') as { ported: { packages: number } }
  assert.ok(census.ported.packages > 0)
  const sent = callTool('uuidna_chat', { text: 'wave', passphrase: 'p', room: 'r', step: 0 }) as { chain: string[] }
  assert.ok(sent.chain.length > 0, 'the envelope travels as uuids')
})

test('uuidna_shell — a known applet runs, an unknown one REFUSES by name', () => {
  const ok = callTool('uuidna_shell', { line: 'top' }) as { ok: boolean; output: string[] }
  assert.equal(ok.ok, true)
  const no = callTool('uuidna_shell', { line: 'grep foo' }) as { ok: boolean; output: string[] }
  assert.equal(no.ok, false, 'an empty success would read as "no matches"')
  assert.match(no.output[0] ?? '', /not an applet/)
})

test('uuidna_fs_seal — a manifest whose root moves with order', () => {
  const a = callTool('uuidna_fs_seal', { entries: [{ path: 'a', text: 'x' }, { path: 'b', text: 'y' }] }) as { root: string }
  const b = callTool('uuidna_fs_seal', { entries: [{ path: 'b', text: 'y' }, { path: 'a', text: 'x' }] }) as { root: string }
  assert.notEqual(a.root, b.root, 'a provenance is a sequence, not a set')
})

test('uuidna_db_query — truncation is stated, and absent stays distinct from no-match', () => {
  const some = callTool('uuidna_db_query', { by: 'text', text: 'sqlite', limit: 3 }) as { rows: unknown[]; total: number; truncated: boolean; absent: boolean }
  assert.equal(some.truncated, some.rows.length < some.total)
  const none = callTool('uuidna_db_query', { by: 'key', key: 'no-such-package-xyz' }) as { rows: unknown[]; absent: boolean }
  assert.equal(none.rows.length, 0)
  assert.equal(none.absent, false, 'the catalogue is present; this key simply is not in it')
})

test('uuidna_chain_seal — inclusion proof carries log2(n) siblings', () => {
  const r = callTool('uuidna_chain_seal', { records: ['a', 'b', 'c', 'd'], prove: 2 }) as { proof: { path: unknown[] } }
  assert.equal(r.proof.path.length, 2)
})

test('uuidna_net_read — an unreached URL has a NULL address, never an empty one', async () => {
  const r = await (callTool('uuidna_net_read', { url: 'https://this-host-does-not-exist.invalid/x' }) as Promise<{ reached: boolean; address: string | null }>)
  assert.equal(r.reached, false)
  assert.equal(r.address, null, 'a receipt for bytes that never arrived would be a lie')
})

test('uuidna_driver_state — measured and published stay apart', () => {
  const s = callTool('uuidna_driver_state') as { device: { logical: number }; ported: { packages: number }; receipt: string }
  assert.ok(s.device.logical > 0 && s.ported.packages > 0)
  assert.notEqual(s.receipt, '', 'the port receipt folds the sealed half only')
})

test('uuidna_security_plan — plans without spawning, and refuses an unknown op', () => {
  const census = callTool('uuidna_security_plan') as { ops: { plannable: boolean }[] }
  assert.ok(census.ops.every((o) => o.plannable), 'every named operation is plannable — the refusal that said otherwise was wrong')
  assert.equal(callTool('uuidna_security_plan', { op: 'exfiltrate' }), null)
})

test('uuidna_os_census — three faces, and each is present', () => {
  for (const of of ['monitor', 'compilers', 'arch']) {
    const c = callTool('uuidna_os_census', { of }) as { definition: string }
    assert.match(c.definition, /uuidnaos|alpine/, `${of} must answer`)
  }
})

test('uuidna_interface — both sides counted, and the browser half named', () => {
  const c = callTool('uuidna_interface') as { alpineTotal: number; providedByBrowser: number; own: { applets: number } }
  assert.ok(c.alpineTotal > 1000)
  assert.ok(c.providedByBrowser > 0, 'most of the domain is given to a tab, not implemented here')
  assert.ok(c.own.applets > 0, 'and uuidna already has a terminal')
})

test('uuidna_port_all — identity is complete, classification is not, and both are reported', () => {
  const c = callTool('uuidna_port_all') as { packages: number; identities: number; classified: number; unclassified: number }
  assert.equal(c.identities, c.packages, 'every package carries an address — that half needs no pattern')
  assert.equal(c.classified + c.unclassified, c.packages, 'placed and unplaced partition the catalogue')
  assert.ok(c.classified < c.packages, 'not every package is placed, and averaging the two would hide which is a measurement')
})

test('uuidna_cern — a query that could not be reached DECLINES rather than reporting no physics', async () => {
  // The network is the one source this tree refuses to treat as a witness, so an unreachable CERN is a distinct
  // verdict. An empty result would read as "no such record", which is a claim about physics rather than about
  // a socket. Asserted on the shape so the test does not depend on opendata.cern.ch being up.
  const r = await (callTool('uuidna_cern', { text: 'CMS Higgs', limit: 2 }) as Promise<{ count: number; declined: boolean; note: string; hits: unknown[] }>)
  assert.equal(typeof r.declined, 'boolean')
  assert.equal(r.count, r.hits.length, 'the count must BE the hits, not a number beside them')
  if (r.declined) assert.ok(r.note.length > 0, 'a decline must say why')
})

test('uuidna_refusals — the withdrawn one is visible, not tidied away', () => {
  const c = callTool('uuidna_refusals') as { refused: number; withdrawn: number; rows: { survived: boolean }[] }
  assert.ok(c.withdrawn > 0, 'a registry showing only successful refusals teaches nothing')
  assert.equal(c.rows.length, c.refused + c.withdrawn)
})

test('uuidna_declare_spend — testimony and measurement stay apart', () => {
  const d = callTool('uuidna_declare_spend', { agent: 'claude', tokens: 5000, purpose: 'a wave', theorems: 2, tests: 4, landed: true }) as { tokens: number; produced: { theorems: number }; honest: string }
  assert.equal(d.tokens, 5000)
  assert.equal(d.produced.theorems, 2)
  assert.match(d.honest, /establishes no intent, no breach and no obligation/)
})

test('all ten ports have a door', () => {
  for (const n of ['uuidna_ports', 'uuidna_chat', 'uuidna_shell', 'uuidna_fs_seal', 'uuidna_db_query',
    'uuidna_chain_seal', 'uuidna_net_read', 'uuidna_driver_state', 'uuidna_security_plan', 'uuidna_os_census']) {
    assert.ok(TOOL_NAMES.includes(n), `${n} must be on the wire`)
  }
})
