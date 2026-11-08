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

// AND THE WIDENING MOVED NOTHING IT SHOULD NOT. HISTORY: measured when the class was widened (69066484c7,
// 2026-09-05), the two classes disagreed on no statement of the ledger, because its non-Latin characters sat inside
// string literals where both rules see a quote — so no address published before the widening moved.
//
// THAT FIGURE WAS A SNAPSHOT, AND THE TEST HELD IT AS A LAW. On 2026-11-08 a wing sealed that day (45bcb8b0) wrote
// `(f₁ x : Nat)`, a subscripted binder beside another, and the ASCII class glued them into `f₁x` — two identifiers
// merged into a third, the exact corruption the widening exists to stop. Those statements were born under the widened
// rule, so the widened address is the only one they have ever had; the frozen "no disagreement anywhere" read their
// arrival as a moved address. What must hold at any ledger size is the RELATION: every statement on which the two
// classes disagree is one the ASCII class corrupts — removing exactly the spaces the widened rule keeps between two
// identifier characters, at least one of them non-ASCII, gives the ASCII form back, and nothing else differs.
test('every statement the two classes disagree on is one the ASCII class corrupts, and nothing else differs', () => {
  const ascii = (s: string): string => String(s).normalize('NFC').replace(/\s+/g, ' ').trim()
    .replace(/\s(?![A-Za-z0-9_])|(?<![A-Za-z0-9_.])\s/g, '').replace(/==/g, '=').replace(/!=/g, '≠')
  // the spaces the widened class keeps and the ASCII class drops: a space between two identifier characters of which
  // at least one is outside ASCII — the glue that would invent a third identifier
  const unglue = (s: string): string => s.replace(/([\p{L}\p{N}_])\s(?=[\p{L}\p{N}_])/gu, (m, a: string, off: number) => {
    const b = s[off + 2] ?? ''
    return /[^\x00-\x7F]/.test(a) || /[^\x00-\x7F]/.test(b) ? a : m
  })
  const disagree = THEOREMS.filter((t) => normaliseProposition(t.statement) !== ascii(t.statement))
  const notCorruption = disagree.filter((t) => unglue(normaliseProposition(t.statement)) !== ascii(t.statement))
  assert.deepEqual(notCorruption.map((t) => t.key), [],
    'the classes differ on a statement for a reason other than the identifier glue — that would be a moved address')
  for (const t of disagree) assert.ok(/[^\x00-\x7F][ ][\p{L}\p{N}_]|[\p{L}\p{N}_][ ][^\x00-\x7F]/u.test(normaliseProposition(t.statement)),
    `${t.key}: the widened form keeps no space beside a non-ASCII identifier, so it cannot be the glue case`)
  const nonAscii = THEOREMS.filter((t) => /[^\x00-\x7F]/.test(t.statement))
  assert.ok(nonAscii.length > 500, `the corpus must actually exercise this: ${nonAscii.length} non-ASCII statements`)
})

// CONTROL — the relation can fail: a difference that is not the glue (a dropped operator space the widened rule would
// also drop, rewritten so the two forms differ in a character) is caught, and the glue case itself is recognised.
test('CONTROL — the glue case is recognised, and a difference of another kind is not mistaken for it', () => {
  assert.equal(normaliseProposition('f₁ x = 1'), 'f₁ x=1', 'the widened class keeps the space between f₁ and x')
  const ascii = (s: string): string => String(s).normalize('NFC').replace(/\s+/g, ' ').trim()
    .replace(/\s(?![A-Za-z0-9_])|(?<![A-Za-z0-9_.])\s/g, '').replace(/==/g, '=').replace(/!=/g, '≠')
  assert.equal(ascii('f₁ x = 1'), 'f₁x=1', 'the ASCII class glues them — the corruption')
  assert.notEqual(normaliseProposition('f₁ x = 1').replace('=', '≤'), ascii('f₁ x = 1'), 'a changed operator is not glue')
})
