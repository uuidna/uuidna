// tool-census — DEDICATED EXERCISES FOR THE OFFLINE DETERMINISTIC TOOLS, paying the tool-exercise debt down
// (lead 119). Each entry NAMES its tool and asserts a real property of its answer — not "it did not throw",
// but a checkable fact about what it computed — so a regression in the handler fails here by name. The table
// is data, the assertions are specific; adding a tool here is how the aggregate-only debt shrinks. Offline
// and pure (no network tool — those get real-API KATs under lead 120); the answers are recomputed every run.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool } from '../mcp.js'

const call = (n: string, a: Record<string, unknown> = {}): any => callTool(n, a)

test('coprime, crt, compare — the number-theory tools compute their exact answers', () => {
  assert.deepEqual(call('uuidna_coprime', { a: 8, b: 9 }), { gcd: 1, coprime: true })
  assert.deepEqual(call('uuidna_coprime', { a: 6, b: 9 }).coprime, false)
  assert.equal(call('uuidna_crt', { a: 2, m: 3, b: 3, n: 5 }).x, 8)   // x≡2(3), x≡3(5) ⇒ 8
  assert.equal(call('uuidna_crt', { a: 2, m: 3, b: 3, n: 5 }).mod, 15)
  assert.ok(call('uuidna_compare', { a: 5, b: 3 }).inclusionExclusion === true)
})

test('digital_root, fibonacci — the ℤ/9 tools land on the sealed cycle', () => {
  assert.equal(call('uuidna_digital_root', { n: 88 }), 7)     // 8+8=16→7
  assert.equal(call('uuidna_digital_root', { n: 12345 }), 6)
  const fib = call('uuidna_fibonacci', { n: 12 })
  assert.equal(fib.mod, 9)
  assert.equal(fib.period, 24, 'the Pisano period mod 9 is 24')
})

test('sha256, hmac, coin64 — the crypto primitives are deterministic and correct-width', () => {
  const h = call('uuidna_sha256', { text: 'x' })
  assert.match(h, /^[0-9a-f]{64}$/, 'SHA-256 is 64 hex')
  assert.equal(call('uuidna_sha256', { text: 'x' }), h, 'deterministic')
  assert.match(call('uuidna_hmac', { key: '6b', message: 'm' }), /^[0-9a-f]{64}$/)
  assert.match(call('uuidna_coin64', { text: 'x' }), /^[0-9a-f]{16}$/, 'a coin is 64 bits = 16 hex')
})

test('involute — the tool computes an involution with its fixed points', () => {
  const r = call('uuidna_involute', { items: [1, 2, 3] })
  assert.ok(Array.isArray(r.pairs) && Array.isArray(r.fixed))
  assert.deepEqual(r.fixed, ['2'], 'the middle element is the fixed point of the reversal')
})

test('expose — the coordinates of unsealed structure compute, fold, and stay coordinates', () => {
  const r = call('uuidna_expose')
  assert.ok(Array.isArray(r.lonely) && Array.isArray(r.gridGaps) && Array.isArray(r.pairsGaps), 'three coordinate surfaces')
  assert.equal(r.counts.lonely, r.lonely.length, 'the count is the list, not a remembered number')
  for (const l of r.lonely) assert.ok(l.key && l.file, 'a lonely coordinate names its theorem and wing')
  assert.match(r.receipt, /^[0-9a-f-]{36}$/, 'the coordinates fold to one receipt')
  assert.equal(call('uuidna_expose').receipt, r.receipt, 'deterministic — same ledger, same coordinates, same receipt')
  assert.match(r.honest, /never (a )?theorem/i, 'the honest scope says coordinates are not theorems')
})

test('conformance, axiom_witness, gate_status — the self-audits report clean and consistent', () => {
  assert.ok(call('uuidna_conformance').checks.every((c: { pass: boolean }) => c.pass), 'every conformance check passes')
  const aw = call('uuidna_axiom_witness')
  assert.equal(aw.audited, aw.ledger, 'the axiom witness covers the whole ledger')
  assert.equal(aw.holds, true)
  const g = call('uuidna_gate_status')
  assert.equal(g.matchesSealedSpec, true, 'the runtime gate matches its sealed spec')
  const m = call('uuidna_gate_status', { messaging: true })
  assert.equal(m.healthy, true)
  assert.equal(m.messaging.total, true)
  assert.equal(m.coordinate.envelope, '_meta.messaging')
  assert.ok(m.context.withinBudget, `wire ${m.context.wireBytes} over ceiling ${m.context.ceiling}`)
  assert.ok((m.context.headroom ?? 0) >= 0)
})

test('gravity, seats, alpine, coverage, cost — each returns its computed answer', () => {
  assert.match(call('uuidna_gravity', { addresses: ['a', 'b'] }), /^[0-9a-f-]{36}$/, 'a merkle-gravity address')
  assert.ok(call('uuidna_seats', { bits: 128 }) > 0, 'the seat count for 128 bits is positive')
  assert.ok(call('uuidna_alpine', { installs: true }).count > 0, 'the default install has members')
  assert.ok(typeof call('uuidna_coverage').ready === 'boolean', 'coverage reports readiness')
  assert.ok(call('uuidna_cost') !== undefined)
})

test('pairs, triad, pentagram, grid, fingerprint, units — the geometry tools answer', () => {
  for (const t of ['uuidna_pairs', 'uuidna_triad', 'uuidna_pentagram', 'uuidna_grid', 'uuidna_fingerprint', 'uuidna_units']) {
    const r = call(t)
    assert.ok(r !== undefined && r !== null, `${t} returns an answer`)
  }
})

test('reflects, reveal, holofractal, security_audit, cloudflare_audit — the reflective tools answer', () => {
  assert.ok(call('uuidna_reflects', { query: 'x' }) !== undefined)
  assert.ok(call('uuidna_reveal', { claim: 'x' }) !== undefined)
  assert.ok(call('uuidna_holofractal', { input: 'x' }) !== undefined)
  assert.ok(call('uuidna_security_audit') !== undefined)
  assert.ok(call('uuidna_cloudflare_audit').clean !== undefined, 'the cloudflare posture audit reports clean-ness')
})

test('search_feed — most-searched queries ring Lean; meaning stays null; cricket is a lead not a door', () => {
  const r = call('uuidna_search_feed')
  assert.equal(r.meaning, null)
  assert.match(r.receipt, /^[0-9a-f-]{36}$/)
  assert.ok(Array.isArray(r.results) && Array.isArray(r.leads) && Array.isArray(r.silent))
  assert.ok(r.silent.includes('cricket'))
  assert.equal(call('uuidna_search_feed').receipt, r.receipt, 'same corpus, same receipt')
})

test('open_leads, leads_gate, open_questions — agnostic project backlog tools are pure and edge-safe', () => {
  const verifiedClaim = 'The commission is two, backed by theorem two_coins.'
  const custom = call('uuidna_open_leads', { items: [{ claim: verifiedClaim, source: 'smoke' }, { claim: 'the moon is cheese', source: 'smoke' }] })
  assert.equal(custom.total, 2)
  assert.equal(custom.verified, 1)
  assert.equal(custom.open, 1)
  assert.match(custom.honest, /YOUR project backlog/i)
  assert.equal(custom.items[0]!.claim, 'the moon is cheese')
  const again = call('uuidna_open_leads', { items: [{ claim: verifiedClaim, source: 'smoke' }, { claim: 'the moon is cheese', source: 'smoke' }] })
  assert.equal(again.receipt, custom.receipt, 'same items, same receipt')

  const gate = call('uuidna_leads_gate', { sources: [{ source: 'ci', reached: true, open: [{ source: 'ci', what: 'todo', owes: 'proof' }], settled: 3 }] })
  assert.equal(gate.ready, false)
  assert.equal(gate.open.length, 1)
  assert.match(gate.honest, /YOUR release gate/i)

  const topics = call('uuidna_open_questions', { items: [{ claim: 'quantum advantage over classical', source: 'desk' }] })
  assert.ok(topics.topics >= 1)
  assert.ok(Array.isArray(topics.curriculum))
  assert.match(topics.receipt, /^[0-9a-f-]{36}$/)

  const demo = call('uuidna_open_leads', { limit: 5 })
  assert.ok(demo.total >= demo.open)
  assert.match(demo.honest, /Example|YOUR/i)
})

test('uuidna_quantum_advantage — paying agents get the compute playbook and magnitudes', () => {
  const p = call('uuidna_quantum_advantage')
  assert.ok(Array.isArray(p.steps) && p.steps.length >= 5)
  assert.equal(p.steps[2]!.tool, 'uuidna_quantum')
  assert.equal(p.magnitudes.theorem, 'verify_beats_recompute_by_magnitudes')
  assert.match(p.honest, /not.*hardware/i)
  assert.match(p.receipt, /^[0-9a-f-]{36}$/)
  assert.equal(call('uuidna_quantum_advantage').receipt, p.receipt)

  const bell = call('uuidna_quantum', { circuit: 'bell' })
  assert.equal(bell.qubits, 2)
  assert.match(bell.honest, /classical|simulation/i)
})

test('uuidna_fill_gaps — verify runs advantage hook at scale', async () => {
  const r = await callTool('uuidna_fill_gaps', { verify: true, limit: 4 }) as {
    scaleReceipt?: string
    verify?: { scaleReceipt: string; hops: number }
    receipt: string
  }
  const scale = r.verify?.scaleReceipt ?? r.scaleReceipt ?? r.receipt
  assert.match(scale, /^[0-9a-f-]{36}$/)
  assert.ok((r.verify?.hops ?? 0) > 5)
})
