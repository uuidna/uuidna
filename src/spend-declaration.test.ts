import { test } from 'node:test'
import assert from 'node:assert/strict'
import { declareSpend } from './coin-ledger.js'

test('tokens are DECLARED and production is MEASURED — never summed into one figure', () => {
  // An agent has no instrument for its own token spend inside a turn — the host counts it, not the process —
  // so it can only state it. A number an agent supplies
  // about itself is testimony, and filing it in the same shape as a gate-minted coin would let a claim about
  // my own cost inherit the credibility of an arithmetic the kernel checked.
  const d = declareSpend('claude', 48000, 'built the ratchet finder', { theorems: 3, tests: 9, landed: true })
  assert.equal(d.tokens, 48000)
  assert.deepEqual(d.produced, { theorems: 3, tests: 9, landed: true })
  assert.match(d.honest, /DECLARED by the agent.*MEASURED from the tree/s)
})

test('a turn that produced nothing has NO ratio — not a ratio of zero', () => {
  // Reporting 0 would read as "free" rather than "nothing to divide by": the same absent-versus-empty
  // distinction the catalogue and the monitor keep.
  const barren = declareSpend('claude', 12000, 're-read what was already sealed', { theorems: 0, tests: 0, landed: false })
  assert.equal(barren.tokens, 12000, 'the spend is still recorded — a barren turn is not a free one')
  assert.equal(barren.tokensPerUnitHundredths, 0)
})

test('the record refuses a negative or non-finite declaration rather than storing it', () => {
  assert.equal(declareSpend('a', -5, 'x', { theorems: 0, tests: 0, landed: false }).tokens, 0)
  assert.equal(declareSpend('a', Number.NaN, 'x', { theorems: 0, tests: 0, landed: false }).tokens, 0)
  assert.equal(declareSpend('a', 1.9, 'x', { theorems: 1, tests: 0, landed: false }).tokens, 1, 'whole tokens only')
})

test('the address moves with the facts, so a declaration cannot be edited silently', () => {
  const a = declareSpend('claude', 100, 'x', { theorems: 1, tests: 1, landed: false })
  const b = declareSpend('claude', 100, 'x', { theorems: 1, tests: 1, landed: false })
  const c = declareSpend('claude', 101, 'x', { theorems: 1, tests: 1, landed: false })
  assert.equal(a.address, b.address, 'the same declaration recomputes to the same address')
  assert.notEqual(a.address, c.address, 'one token more must move it')
})

test('the record says what it is NOT — no intent, no breach, no obligation', () => {
  // A low ratio is a fact about cost, not a finding of misconduct, and reading testimony as a verdict is the
  // error this sentence exists to prevent.
  assert.match(declareSpend('a', 1, 'x', { theorems: 0, tests: 0, landed: false }).honest,
    /establishes no intent, no breach and no obligation/)
})
