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

// THE MERGE IS CHECKED AS A RELATION, not against three literals. This asserted 2544/2536/8 and all three
// moved when a wing was sealed — the frozen-count fault, in a test whose whole subject is that the merge is
// real. What makes it real is the RELATION: normalisation can only reduce, the reduction is exactly the merged
// forms, and every merged group normalises to one proposition. That holds at any ledger size.
test('the merge is real, not theoretical: normalisation reduces, and the reduction IS the merged groups', () => {
  const c = propositionCensus(THEOREMS.map((t) => t.statement))
  assert.ok(c.statements > 0)
  assert.ok(c.propositions <= c.statements, 'normalisation may only merge, never split')
  const collapsed = c.merged.reduce((n, g) => n + g.forms.length - 1, 0)
  assert.equal(c.statements - c.propositions, collapsed,
    'the drop from statements to propositions must BE the forms the merge groups collapsed, not a number beside it')
  assert.ok(c.merged.length > 0, 'a ledger with no merged forms would make this whole surface theoretical')
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

// ── THE IDENTIFIER CLASS. A peer repository joining statement addresses across four corpora measured an ASCII
// character class corrupting 211 of 832 statements on one of them, and asked whether uuidna's rule had the same
// defect. It did. These hold the fix, and the FIRST of them is the corruption itself: a space between two
// non-Latin identifiers must survive, because deleting it merges two identifiers into a third that appears in
// neither statement — silently, on the very key used to join repositories.

test('a space BETWEEN two non-Latin identifiers survives — merging them would invent a third', () => {
  assert.equal(normaliseProposition('α β = γ'), 'α β=γ', 'αβ is not α β; the ASCII class glued them')
  assert.equal(normaliseProposition('∀ ℤ x, x = x'), '∀ℤ x,x=x', 'ℤ and x are two identifiers, not one')
  assert.notEqual(normaliseProposition('α β = γ'), normaliseProposition('αβ = γ'),
    'two identifiers and one identifier are DIFFERENT propositions and must not share an address')
})

test('a space adjacent to an operator is still dropped, whatever alphabet the operand is in', () => {
  assert.equal(normaliseProposition('σ = 1'), 'σ=1')
  assert.equal(normaliseProposition('(σ + τ) = 2'), '(σ+τ)=2')
  assert.equal(normaliseProposition('H₁ = Σ₂ + χ'), 'H₁=Σ₂+χ', 'subscripted Greek is identifiers around operators')
  assert.equal(normaliseProposition('十 = 10'), '十=10', 'CJK too — the corpus carries 十 and the digits 一..九')
})

// AND THE WIDENING PUBLISHED NOTHING NEW. Every address this repository has emitted is unchanged: on this
// corpus the two classes never disagree, because the non-Latin characters here sit inside string literals where
// both rules see a quote. Measured, not assumed — if this ever fails, a published address has moved.
test('widening the class moved NO address in the live ledger', () => {
  const ascii = (s: string): string => String(s).normalize('NFC').replace(/\s+/g, ' ').trim()
    .replace(/\s(?![A-Za-z0-9_])|(?<![A-Za-z0-9_.])\s/g, '').replace(/==/g, '=').replace(/!=/g, '≠')
  const moved = THEOREMS.filter((t) => normaliseProposition(t.statement) !== ascii(t.statement))
  assert.deepEqual(moved.map((t) => t.key), [],
    'a published statement address moving is a break for every downstream that stored one')
  const nonAscii = THEOREMS.filter((t) => /[^\x00-\x7F]/.test(t.statement))
  assert.ok(nonAscii.length > 500, `the corpus must actually exercise this: ${nonAscii.length} non-ASCII statements`)
})
