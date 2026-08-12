// Publication tests — a publication is lean human prose AUDITED before it is published. These assert the two
// properties that matter: (1) every domain note actually passes uuidna's honesty gate (nothing overreaching ever
// reaches the site — the automated stream is clean), and (2) the gate genuinely BITES (an overreaching note is
// refused, so the pass is real, not a gate that always says yes). Writing descends from reading; integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { publications, composePublication, auditPublication } from '../index.js'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

test('the whole stream is publishable — every note passes its own audit before publishing', () => {
  const P = publications()
  assert.ok(P.length > 0, 'there are publications')
  const refused = P.filter((p) => !p.publishable)
  assert.deepEqual(refused.map((p) => p.slug), [], 'no note overreaches a proof: ' + JSON.stringify(refused.map((p) => p.findings)))
})

test('each note is content-addressed and its proofs fold to a receipt — recomputable', () => {
  for (const p of publications()) {
    assert.match(p.address, UUID, `${p.slug} address is a uuid`)
    assert.match(p.receipt, UUID, `${p.slug} receipt is a uuid`)
    assert.ok(p.count >= 1 && p.theorems.length === p.count, `${p.slug} reads its own theorems`)
    // recompute the note's address from its own text — the fingerprint returns
    assert.equal(composePublication(p.file).address, p.address, `${p.slug} re-addresses identically`)
  }
})

test('every load-bearing claim links a proof — the note earns what it asserts', () => {
  const tides = composePublication('Tides.lean')
  assert.ok(/\/theorem\/rule_of_twelfths/.test(tides.markdown), 'a claim links its proof')
  assert.ok(tides.markdown.includes('read the proofs, not the prose'), 'the note says what it does not claim')
})

test('the gate BITES — an overreaching note is refused, so the pass is real', () => {
  const honest = 'These 7 facts hold by decision, each linking its [proof](/theorem/rule_of_twelfths).'
  const boast = 'This system is unbreakable and quantum-secure, proven unhackable forever.'
  assert.equal(auditPublication(honest).length, 0, 'honest, backed prose passes')
  const findings = auditPublication(boast)
  assert.ok(findings.length >= 1, 'an unbacked overclaim is flagged, not published')
})

test('a proof-backed sentence keeps its strong words — backing clears the gate, not censorship', () => {
  // ISBN-10 "catches EVERY single-digit error" is a strong claim — and it is PROVEN, so linking it clears the gate.
  const note = composePublication('Identifiers.lean')
  assert.ok(note.publishable, 'the identifiers note publishes')
  assert.ok(/EVERY single-digit error/.test(note.markdown), 'the strong-but-proven claim survives')
})
