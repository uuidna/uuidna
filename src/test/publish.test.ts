// Publication tests — a publication is lean human prose AUDITED before it is published. These assert the two
// properties that matter: (1) every domain note actually passes uuidna's honesty gate (nothing overreaching ever
// reaches the site — the automated stream is clean), and (2) the gate genuinely BITES (an overreaching note is
// refused, so the pass is real, not a gate that always says yes). Writing descends from reading; integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { publications, composePublication, auditPublication, revisePublication, comparePublications } from '../index.js'

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

test('the gate BITES a fabricated citation — a note that invents a proof is refused', () => {
  const honest = 'These 7 facts hold by decision, each linking its [proof](/theorem/rule_of_twelfths).'
  // Folded to the theorems: a boast with no citation is REVEALED (published as unbacked prose), not censored; only a
  // note that CITES A PROOF THAT DOES NOT EXIST is the decidably-false case the gate refuses.
  const fabricated = 'This holds forever, proven in theorem the_tide_is_unbreakable.'
  assert.equal(auditPublication(honest).length, 0, 'honest, backed prose passes')
  const findings = auditPublication(fabricated)
  assert.ok(findings.length >= 1, 'a fabricated citation is flagged, not published')
})

test('editing is re-addressing — a revision re-fingerprints, and an edit that overreaches is refused', () => {
  const before = 'The tide rises and falls, each claim linking its [proof](/theorem/rule_of_twelfths).'
  const same = revisePublication(before, before)
  assert.equal(same.changed, false, 'an identical edit does not change the address')
  const clean = revisePublication(before, before + ' The rule is a palindrome.')
  assert.equal(clean.changed, true, 'a real edit moves the address')
  assert.ok(clean.after !== clean.before && clean.publishable, 'an honest edit re-addresses and stays publishable')
  // folded to the theorems: an unbacked boast now publishes (revealed); only a FABRICATED citation is refused
  const bad = revisePublication(before, before + ' This holds forever, proven in theorem tide_is_unbreakable.')
  assert.equal(bad.publishable, false, 'an edit that invents a proof is refused before publishing')
  assert.match(bad.edit, UUID, 'the before→after receipt binds the revision')
})

test('similarity is derived from difference — pattern recognition, inclusion–exclusion exact', () => {
  const c = comparePublications('the tide rises and falls', 'the tide rises then rises again')
  assert.equal(c.inclusionExclusion, true, '|A| + |B| − shared = union, exactly — the count is a proof')
  assert.equal(c.shared + c.onlyA + c.onlyB, c.union, 'the partition covers the union')
  assert.ok(c.shared >= 1 && c.similarity.den > 0, 'a shared pattern is recognised against the difference')
  const disjoint = comparePublications('alpha beta', 'gamma delta')
  assert.equal(disjoint.shared, 0, 'no shared tokens → no pattern')
  assert.equal(disjoint.similarity.num, 0, 'similarity is zero when nothing is shared')
  const identical = comparePublications('same words here', 'same words here')
  assert.equal(identical.similarity.num, identical.similarity.den, 'a text is wholly similar to itself (1/1)')
})

test('a proof-backed sentence keeps its strong words — backing clears the gate, not censorship', () => {
  // ISBN-10 "catches EVERY single-digit error" is a strong claim — and it is PROVEN, so linking it clears the gate.
  const note = composePublication('Identifiers.lean')
  assert.ok(note.publishable, 'the identifiers note publishes')
  assert.ok(/EVERY single-digit error/.test(note.markdown), 'the strong-but-proven claim survives')
})
