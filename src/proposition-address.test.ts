import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normaliseProposition, propositionAddress, propositionCensus } from './proposition-address.js'
import { THEOREMS } from './theorems/index.js'

// THE MERGE KEY IS WHAT LETS TWO REPOSITORIES HOLDING ONE RESULT PUBLISH ONCE. A DOI is permanent, so this
// normalisation has two ways to be wrong and both are permanent: too loose and it merges two different results
// forever; too tight and the same result mints twice under two names. These tests hold both edges.

test('the address depends on the statement and nothing else', () => {
  // two names, one proposition — the in-repo case: Core.lean and Ring.lean seal the same ℤ/9 facts
  assert.equal(propositionAddress('(1 * 1) % 9 = 1'), propositionAddress('(1*1) % 9 = 1'))
  // and a DIFFERENT statement must not collide
  assert.notEqual(propositionAddress('(1 * 1) % 9 = 1'), propositionAddress('(1 * 2) % 9 = 2'))
})

// FAULT ONE IN THE PROPOSED SPEC: stripping ALL whitespace corrupts function application. Lean applies by
// juxtaposition, so the space in `List.range 7` is an operator. 672 statements in this ledger contain one.
test('whitespace that IS function application survives normalisation', () => {
  assert.equal(normaliseProposition('(List.range 7).length = 7'), '(List.range 7).length=7')
  assert.match(normaliseProposition('(List.range 63).all (fun x => x < 63)'), /List\.range 63/)
  assert.match(normaliseProposition('Nat.succ 4 = 5'), /Nat\.succ 4/)
  // the naive rule would produce list.range7 — a different identifier, and an unparseable statement
  assert.ok(!/range\d/.test(normaliseProposition('(List.range 7).length = 7')), 'application was corrupted')
})

// FAULT TWO: lowercasing conflates case-sensitive identifiers. Lean distinguishes Nat from nat.
test('case is preserved — Lean is case-sensitive', () => {
  assert.match(normaliseProposition('Nat.succ 4 = 5'), /Nat/)
  assert.notEqual(propositionAddress('Nat.succ 4 = 5'), propositionAddress('nat.succ 4 = 5'))
})

test('whitespace around operators and brackets is NOT semantic, and is removed', () => {
  const forms = ['(2 * 5) % 9 = 1', '(2*5) % 9 = 1', '( 2 * 5 ) % 9 = 1', '(2 * 5)%9=1']
  const addrs = new Set(forms.map(propositionAddress))
  assert.equal(addrs.size, 1, `these are one proposition in four hands: ${[...addrs].join(', ')}`)
})

test('decidable equality written both ways is one relation', () => {
  assert.equal(propositionAddress('a == b'), propositionAddress('a = b'))
})

test('this ledger holds 2536 propositions over 2544 raw statements — the merge is real, not theoretical', () => {
  const c = propositionCensus(THEOREMS.map((t) => t.statement))
  assert.equal(c.statements, 2544, 'raw distinct statements')
  assert.equal(c.propositions, 2536, 'distinct propositions after normalisation')
  assert.equal(c.merged.length, 8, 'eight statements are one proposition written two ways')
  for (const g of c.merged) {
    assert.ok(g.forms.length > 1)
    // every merged form must normalise identically — that IS the merge
    const norms = new Set(g.forms.map(normaliseProposition))
    assert.equal(norms.size, 1, `a merge group whose forms do not normalise alike: ${g.forms.join(' | ')}`)
  }
})

test('the census is deterministic and its count is its map', () => {
  const a = propositionCensus(THEOREMS.map((t) => t.statement))
  const b = propositionCensus(THEOREMS.map((t) => t.statement))
  assert.equal(a.receipt, b.receipt)
  assert.equal(a.propositions, new Set(THEOREMS.map((t) => propositionAddress(t.statement))).size)
})

test('no two DIFFERENT propositions in this ledger collide — checked over the whole corpus', () => {
  const byAddress = new Map<string, Set<string>>()
  for (const t of THEOREMS) {
    const a = propositionAddress(t.statement)
    const set = byAddress.get(a) ?? new Set<string>()
    set.add(normaliseProposition(t.statement))
    byAddress.set(a, set)
  }
  const bad = [...byAddress].filter(([, forms]) => forms.size > 1)
  assert.deepEqual(bad.map(([a]) => a), [], 'one address covering two normalised statements is a false merge')
})
