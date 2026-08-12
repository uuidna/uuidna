// Daemon tests — the pure router, exercised without binding a socket. Read-only, stateless, honest: it verifies,
// tries, and gates; it never removes or stores. The tamper-check is keyless. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { route } from '../daemon.js'
import { toUuid } from '../index.js'

const Q = (s = '') => new URLSearchParams(s)

test('health returns the ledger receipt', () => {
  const r = route('GET', '/health', Q(), {})
  assert.equal(r.status, 200)
  const j = r.json as { ok: boolean; theorems: number; receipt: string }
  assert.equal(j.ok, true)
  assert.ok(j.theorems > 0)
  assert.match(j.receipt, /^[0-9a-f-]{36}$/)
})

test('address content-addresses a value, GET and POST', () => {
  const g = route('GET', '/address', Q('of=hello'), {}).json as { address: string }
  const p = route('POST', '/address', Q(), { text: 'hello' }).json as { address: string }
  assert.equal(g.address, toUuid('hello'))
  assert.equal(p.address, g.address)
})

test('verify is a keyless tamper-check', () => {
  const addr = toUuid('the sealed text')
  const intact = route('POST', '/verify', Q(), { text: 'the sealed text', address: addr }).json as { match: boolean }
  const tampered = route('POST', '/verify', Q(), { text: 'the sealed text.', address: addr }).json as { match: boolean }
  assert.equal(intact.match, true, 'the exact text matches its address')
  assert.equal(tampered.match, false, 'one changed character no longer matches — tamper detected')
})

test('gate drains a fabricated citation and reveals everything else', () => {
  // The gate is folded to the theorems: only a claim citing a proof that does NOT exist is drained; a lexical
  // boast with no citation is revealed (clean), not censored.
  const bad = route('GET', '/gate', Q('text=' + encodeURIComponent('proven in theorem this_is_unbreakable')), {}).json as { clean: boolean }
  const boast = route('GET', '/gate', Q('text=' + encodeURIComponent('this is unbreakable')), {}).json as { clean: boolean }
  const good = route('GET', '/gate', Q('text=' + encodeURIComponent('content-addressed, recomputable')), {}).json as { clean: boolean }
  assert.equal(bad.clean, false)   // fabricated proof → drained
  assert.equal(boast.clean, true)  // no citation → revealed, not drained
  assert.equal(good.clean, true)
})

test('trial returns one answer — VERIFIED or UNVERIFIED, all else void', () => {
  const r = route('POST', '/trial', Q(), { statement: 'quantum supremacy, proven in theorem uuidna_is_a_quantum_computer' }).json as { verdict: string }
  assert.equal(r.verdict, 'UNVERIFIED') // a citation to a proof not in the ledger verifies nothing — never called false
})

test('an unknown route 404s, never crashes', () => {
  assert.equal(route('GET', '/nope', Q(), {}).status, 404)
})
