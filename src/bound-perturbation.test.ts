import { test } from 'node:test'
import assert from 'node:assert/strict'
import { widenBounds, boundVerdict, boundCensus } from './bound-perturbation.js'
import { THEOREMS } from './theorems/index.js'

// CONTROLS BEFORE BELIEF, which is the rule this instrument was handed with. Both answers below are known by
// hand: the first statement is true for every natural, so widening MUST keep it; the second fails the instant
// the new element enters, so widening MUST break it. If either flips, the probe is measuring something else.
test('CONTROL — a bound that carries nothing survives widening (one step, a lower bound)', () => {
  assert.equal(boundVerdict('((List.range 63).all (fun x => ((x - x % 9) % 9 == 0) && (x % 9 < 9)))'), 'survived-widening')
})

test('CONTROL — a bound that carries the theorem breaks under widening', () => {
  assert.equal(boundVerdict('((List.range 9).all (fun x => x < 9))'), 'load-bearing')
})

test('widenBounds moves the LENGTH of range\' and the count of range, and nothing else', () => {
  assert.equal(widenBounds('(List.range 9).length = 9'), '(List.range 10).length = 9')
  assert.equal(widenBounds("(List.range' 1 9).length = 9"), "(List.range' 1 10).length = 9")
  assert.equal(widenBounds('1 + 2 = 3'), '1 + 2 = 3', 'an unbounded statement is untouched')
  assert.equal(boundVerdict('1 + 2 = 3'), 'not-bounded')
})

// SAMPLED, because the full census costs 79 seconds — two evaluations of 793 statements — and this suite runs on
// every landing. `verify ≪ recompute` is this tree's own law and a finder that ignores it taxes every future
// commit for a number nobody reads on the way past. The full census stays available as boundCensus(); what is
// held here is that the probe still SEPARATES, which a sample answers as well as the whole.
test('the census separates on a sample, and its parts sum to the whole', () => {
  const bounded = THEOREMS.map((t) => t.statement).filter((s) => /List\.range/.test(s)).slice(0, 140)
  const c = boundCensus(bounded)
  assert.ok(c.bounded > 100, `the sample must be bounded statements — read ${c.bounded}`)
  assert.equal(c.survivedOneStep + c.loadBearing + c.baseUndecidable + c.undecidableWidened, c.bounded)
  // both classes must be NON-EMPTY, or the probe has collapsed to one answer and measures nothing
  assert.ok(c.survivedOneStep > 0, 'if nothing survives widening the probe is broken, not the ledger')
  assert.ok(c.loadBearing > 0, 'if nothing breaks under widening the probe is not perturbing anything')
})
