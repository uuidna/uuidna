import { test } from 'node:test'
import assert from 'node:assert/strict'
import { familyOf, census, FAMILIES } from './axiom-families.js'
import { theorems } from './theorems/index.js'

// EVERY FAMILY GETS A MEMBER IT MUST CATCH AND A NEAR-MISS IT MUST NOT. A classifier tested only on things it
// places correctly is a classifier proven to answer, not to discriminate — the shape this tree met four times
// in one night, so the near-misses are the point of this file.

test('each family catches its own member', () => {
  assert.equal(familyOf('(∀ i : Fin 5, i.val < 5)'), 'quantified')
  assert.equal(familyOf('(Fintype.card (Fin 5) = 5)'), 'finite-type')
  assert.equal(familyOf('([1, 2, 2].eraseDups.length = 2)'), 'list-structure')
  assert.equal(familyOf('((List.range 4).all (fun i => i < 4))'), 'enumeration')
  assert.equal(familyOf('(2 = 2) ∧ (3 = 3)'), 'propositional')
  assert.equal(familyOf('(2 + 2 = 4)'), 'arithmetic')
  assert.equal(familyOf('(5 = 5)'), 'literal')
})

// THE HIERARCHY IS THE WHOLE DESIGN: a statement that does two things belongs to the DEEPER one, because the
// shallower capability came free with it. Reported as tags, the shares would sum past the ledger.
test('the deeper capability wins — these are the cases that make it a partition', () => {
  assert.equal(familyOf('(∀ i : Fin 9, (i.val % 9) < 9)'), 'quantified', 'a quantifier over Fin is quantified, not finite-type')
  assert.equal(familyOf('([7, 8].eraseDups.length = 2) ∧ (2 = 2)'), 'list-structure', 'structure beats the ∧ beside it')
  assert.equal(familyOf('((List.range 4).all (fun i => i + 1 > i)) ∧ (4 = 4)'), 'enumeration', 'a walk beats both the ∧ and the +')
  assert.equal(familyOf('(2 + 2 = 4) ∧ (3 * 3 = 9)'), 'propositional', 'arithmetic under a ∧ is propositional')
})

// THE NEAR-MISS THAT ACTUALLY BIT: the first classifier read the hyphen in a NAME as a minus and called a
// literal comparison arithmetic. A regex over prose is exactly where this goes wrong.
test('a hyphen inside a name is not a minus sign', () => {
  assert.equal(familyOf('(two-coins = two-coins)'), 'literal')
  assert.equal(familyOf('(a_b-c_d = 1)'), 'literal')
  assert.equal(familyOf('(7 - 3 = 4)'), 'arithmetic', 'but a real subtraction still is one')
  assert.equal(familyOf('(7-3 = 4)'), 'arithmetic', 'spaced or not')
})

test('the classifier covers the live ledger and the counts PARTITION it', () => {
  const c = census(theorems())
  assert.equal(c.partitions, true, 'a classifier that stopped covering the ledger must report false, not drop rows')
  assert.equal(c.byFamily.reduce((a, b) => a + b.count, 0), c.total)
  assert.equal(c.byFamily.length, FAMILIES.length, 'every declared family is reported, including an empty one')
})

// AN EMPTY FAMILY IS A FINDING, NOT PAPERWORK — and this one has a cause worth stating: the ledger's only Fin
// statements all sit under a quantifier, so the hierarchy sends them one level deeper. The family stays declared
// because it is REACHABLE (the member test above proves it), which is the difference between a column that is
// empty and a column that is dead.
test('finite-type is empty on this ledger, and reachable in principle', () => {
  const c = census(theorems())
  assert.deepEqual(c.empty, ['finite-type'])
  assert.equal(familyOf('(Fintype.card (Fin 5) = 5)'), 'finite-type', 'reachable — so its emptiness is a measurement')
  const fins = theorems().filter((t) => /\bFin\b/.test(t.statement))
  assert.ok(fins.length > 0, 'the ledger does use Fin')
  assert.ok(fins.every((t) => /∀|∃/.test(t.statement)), 'and every one of them is under a quantifier — that is WHY the family is empty')
})

test('shares are integers in tenths of a percent — no float drifts between hosts', () => {
  for (const r of census(theorems()).byFamily) assert.equal(Number.isInteger(r.share), true)
})

// THE CONTROL FOR THE CENSUS ITSELF: hand it rows whose families are known and require the exact counts.
test('census counts what it is given, not what the ledger happens to hold', () => {
  const c = census([{ statement: '(5 = 5)' }, { statement: '(2 + 2 = 4)' }, { statement: '(2 = 2) ∧ (3 = 3)' }])
  assert.equal(c.total, 3)
  assert.equal(c.partitions, true)
  const n = (f: string) => c.byFamily.find((r) => r.family === f)!.count
  assert.equal(n('literal'), 1); assert.equal(n('arithmetic'), 1); assert.equal(n('propositional'), 1)
  assert.equal(n('enumeration'), 0)
  assert.equal(c.byFamily.find((r) => r.family === 'literal')!.share, 333, 'one third, in tenths of a percent, floored')
})
