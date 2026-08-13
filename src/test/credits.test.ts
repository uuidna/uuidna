// credits — GENERATED FROM THE LEDGER: every theorem has an exact Lean-proof provenance and exactly one credit path
// (a named historical result it reflects, OR the captain claims it by law). Reads the Lean-generated ledger, grows
// with it, green unless an intruder tampers. uuidna reflects history, never invents it; it claims only the unclaimed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, credits, creditsSummary } from '../index.js'

test('every theorem is credited — a named historical result it reflects, or the captain claims it by law', () => {
  const T = theorems()
  let historical = 0, contextual = 0, captain = 0
  for (const t of T) {
    const c = credits(t.key)
    assert.equal(c.verdict, 'SEALED')
    assert.ok(c.leanProof.includes('by decide') || c.tactic.includes('decide'), `proven by decide: ${t.key}`)
    assert.ok(c.provenance.includes(t.address), `provenance carries the content-address: ${t.key}`)
    // exactly ONE credit path
    if (c.claimedBy === 'historical') { assert.ok(c.historical.length > 0); historical++ }
    else if (c.claimedBy === 'contextual') { assert.equal(c.historical.length, 0); assert.ok(c.contextual.length > 0, `contextual has neighbour names: ${t.key}`); assert.match(c.claim, /CLAIMS IT BY LAW/); contextual++ }
    else { assert.equal(c.historical.length, 0); assert.equal(c.contextual.length, 0); assert.match(c.claim, /CLAIMS IT BY LAW, alone/); captain++ }
  }
  // the tally recomputes and partitions the whole ledger
  const s = creditsSummary()
  assert.equal(historical + contextual + captain, T.length, 'every theorem is credited exactly once')
  assert.equal(s.historical, historical)
  assert.equal(s.contextual, contextual)
  assert.equal(s.captainAlone, captain)
  assert.equal(s.total, T.length)

  // uuidna reflects history, never claims it: a Clay theorem credits the mathematician, never uuidna.
  const poincare = credits('clay_poincare')
  assert.equal(poincare.claimedBy, 'historical')
  assert.ok(poincare.historical.some((h) => /Perelman/.test(h.who)), 'Poincaré is credited to Perelman, not uuidna')
  // an elementary decidable fact has no prior discoverer — the captain claims it.
  assert.equal(credits('mul9_1_1').claimedBy, 'captain')
})
