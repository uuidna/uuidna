// mcp — CI drives the SERVED surface. Every assertion goes through callTool (the server's own dispatch, exported
// from ./mcp.js), so CI exercises the exact tools an agent calls and proves the MCP can't drift from the sealed
// package it wraps: the catalog lists only tools the handlers answer, and each tool returns what the underlying
// function computes. "CI uses MCP, and vice versa" — one path, verified both ways.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { callTool, TOOL_NAMES, MCP_CATALOG, mcpBenchmark } from './mcp.js'
import { toUuid, adjudicate, theorems, runTrial, reviewDomains, SKILLS, HEXBIT_BITS } from './index.js'

test('catalog ↔ handlers: the catalog lists exactly the dispatchable tools, unknown tools throw', () => {
  assert.deepEqual([...TOOL_NAMES].sort(), [...MCP_CATALOG.map((t) => t.name)].sort())
  assert.throws(() => callTool('uuidna_not_a_tool'), /unknown tool/)
})

test('CI through the MCP: the served tools return what the sealed package computes', () => {
  // identity — the served address IS the package's content-address
  assert.equal(callTool('uuidna_address', { text: 'hello' }), toUuid('hello'))
  // the trial — the served verdict IS the package's verdict
  assert.equal((callTool('uuidna_adjudicate', { statement: 'FNV-1a is cryptographic' }) as { verdict: string }).verdict,
    adjudicate('FNV-1a is cryptographic').verdict)
  // the ledger — the served theorem list (and a skill filter) match the package
  assert.equal((callTool('uuidna_theorems', {}) as unknown[]).length, theorems().length)
  assert.equal((callTool('uuidna_theorems', { skill: 'navigation' }) as unknown[]).length, theorems({ skill: 'navigation' }).length)
  // the fold — the served trial receipt IS the package's receipt
  assert.equal((callTool('uuidna_trial', {}) as { receipt: string }).receipt, runTrial().receipt)
  // local reviews — one recomputable review per domain the sequence touches, all VERIFIED
  const reviews = callTool('uuidna_review_domains', {}) as { domain: string; verdict: string }[]
  assert.equal(reviews.length, SKILLS.length)
  assert.ok(reviews.every((r) => r.verdict === 'VERIFIED'))
  assert.deepEqual(reviews, reviewDomains())
})

test('uuidna_quantum runs GHZ at the encoder width — no refuse', () => {
  const r = callTool('uuidna_quantum', { circuit: 'ghz', qubits: HEXBIT_BITS * HEXBIT_BITS }) as { qubits: number; outcomes: Record<string, string> }
  assert.equal(r.qubits, HEXBIT_BITS * HEXBIT_BITS)
  assert.equal(Object.keys(r.outcomes).length, 2)
})

test('unify: one receipt folds theorems + domains + tools, recomputable', () => {
  const u = callTool('uuidna_unify', {}) as { theorems: { receipt: string }; receipt: string }
  assert.match(u.receipt, /^[0-9a-f-]{36}$/)
  assert.equal(u.theorems.receipt, runTrial().receipt)  // the theorems face IS the trial
  assert.deepEqual(u, callTool('uuidna_unify', {}))      // recomputes identically
})

test('uuidna_uuid_channel and uuidna_seal_channel — automation slices without payload store', () => {
  const addr = toUuid('automation-channel')
  const ch = callTool('uuidna_uuid_channel', { address: addr }) as {
    handle: string; torusHome: boolean; trinities: string[]; payloadStoreOptional: boolean
  }
  assert.equal(ch.handle.length, 8)
  assert.equal(ch.trinities.length, 3)
  assert.equal(ch.torusHome, true)
  assert.equal(ch.payloadStoreOptional, true)
  const sealed = callTool('uuidna_seal_channel', { message: 'ping', passphrases: ['k'], step: 1 }) as {
    uuids: string[]; channels: { handle: string }[]
  }
  assert.ok(sealed.uuids.length >= 1)
  assert.equal(sealed.channels.length, sealed.uuids.length)
  assert.equal(sealed.channels[0]!.handle.length, 8)
  const opened = callTool('uuidna_open_channel', { uuids: sealed.uuids, passphrases: ['k'] }) as {
    message: string; channels: { handle: string; middle: string }[]; tamper: { theorem: { forgeExponent: number } }
  }
  assert.equal(opened.message, 'ping')
  assert.equal(opened.channels.length, sealed.uuids.length)
  assert.equal(opened.channels[0]!.handle, sealed.channels[0]!.handle)
  assert.ok(opened.channels[0]!.middle.length === 24)
  assert.equal(opened.tamper.theorem.forgeExponent, 128)
})

test('uuidna_handle and uuidna_send_trial — store witness and enriched detail trial', () => {
  const addr = toUuid('handle-mcp-door')
  const hw = callTool('uuidna_handle', { address: addr }) as { handle: string; roundTrip: boolean; path: string }
  assert.equal(hw.handle.length, 8)
  assert.equal(hw.roundTrip, true)
  assert.match(hw.path, /^src\/handles\//)
  const trial = callTool('uuidna_send_trial', {
    text: 'The full uuid carries 128 payload bits; RFC 4122 reserves six bits for version and variant, leaving 122 free.',
  }) as { outcome: string; counts: { verified: number } }
  assert.equal(trial.outcome, 'audited')
  assert.ok(trial.counts.verified >= 1)
})

test('mcp tests itself: catalog↔handlers hold, zero-arg tools recompute (only live resources may vary)', () => {
  const s = callTool('uuidna_selftest', {}) as { checks: number; passed: number; deterministic: number; failed: { name: string }[] }
  assert.ok(s.checks > 80 && s.deterministic > 0)
  for (const f of s.failed) assert.equal(f.name, 'uuidna_resources', `unexpected self-test failure: ${JSON.stringify(f)}`)
})

test('the MCP measures itself: uuidna_mcp_benchmark scores the whole served surface', () => {
  const b = callTool('uuidna_mcp_benchmark', {}) as ReturnType<typeof mcpBenchmark>
  assert.equal(b.tools, TOOL_NAMES.length)                 // it benchmarks every served tool, including itself
  assert.ok(b.zeroArgReusable > 0 && b.zeroArgReusable <= b.tools)
  // WAS `reusablePerKey > 0 && avgRequiredKeys >= 0`, which could not fail: a count over a count is never
  // negative and the catalog is never empty, so the assertion passed however bad the surface got — verified with
  // falsify(), which found it survived every mutation including "every tool needs 999 args" and "no tool is
  // reusable". These bounds CAN fail, and each states a usability claim the surface would actually be breaking:
  assert.ok(b.avgRequiredKeys < 2, `the served surface averages ${b.avgRequiredKeys} required keys per tool — over two, and it is an API to be studied rather than used`)
  assert.ok(b.avgRating >= 3, `average usability rating ${b.avgRating} — the scale is 1..5 (5 = zero required keys), so below 3 most tools demand three or more arguments`)
  assert.ok(b.zeroArgReusable / b.tools > 0.25, `only ${b.zeroArgReusable} of ${b.tools} tools are callable with no arguments — under a quarter, and the surface cannot be explored without reading schemas first`)
  // and the rating scale is respected: rate() maps required keys to 1..5, so nothing may sit outside it
  for (const t of b.ratings) assert.ok(t.rating >= 1 && t.rating <= 5, `${t.name} rates ${t.rating}, outside the 1..5 scale`)
  assert.ok(b.hardest.length > 0 && b.hardest[0].required >= b.hardest[b.hardest.length - 1].required)
  assert.deepEqual(b, mcpBenchmark())                       // served result IS the function's — no drift
})
