// census — MEASUREMENT HAS ONE LEAN-DERIVED SOURCE (lead 7cc6cbb6).
//
// statementCensus() is the census; countsGaps holds prose; expectedGaps refuses frozen expected* = N.
// censusGaps refuses a generator that freezes total_theorems: N into a drain artifact — the captain-complete
// freeze at 1307 while the ledger moved past 2000 was exactly that class.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { statementCensus, theorems, PRINCIPLES } from './index.js'
import { censusGaps, quantifiesStatement } from './scripts/one-receipt.js'

test('a ∀ binder quantifies in every form Lean writes it, and a point fact does not — the universal-name finder, both ways', () => {
  for (const s of ['∀ l : Fin 128, l.val < 128', '∀ a b c m : Nat, a ≤ m → a ≤ m + m',
    '∀ (f : Nat → Nat) (n : Nat), f n = f n', "∀ p q dx' dy' : Nat, q = p + dx' → dx' = dx'"])
    assert.ok(quantifiesStatement(s), `quantifies: ${s}`)
  for (const s of ['(2 * 64 = 128) ∧ (2 ^ 7 = 128)', '¬ lead_2d552f1f', 'a + b + b + c ≤ 4 * m'])
    assert.ok(!quantifiesStatement(s), `a point fact quantifies over nothing: ${s}`)
})

test('statementCensus is the Lean-derived census — entries match theorems().length', () => {
  const c = statementCensus()
  assert.equal(c.entries, theorems().length, 'entries are the key count from the same compiled ledger')
  assert.equal(c.entries, c.distinct + c.renamings, 'renamings = entries − distinct by construction')
  assert.ok(PRINCIPLES.length > 0, 'principles are a live axis of the same source')
})

test('censusGaps is clean on the live generators', () => {
  assert.deepEqual(censusGaps(), [], 'no generator may freeze a second theorem census into a drain artifact')
})
