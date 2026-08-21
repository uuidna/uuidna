// sequence-run — the executor, checked against the ring it walks rather than against remembered answers.
//
// Every assertion here carries a control that must FAIL, because a walk that only demonstrates success is not
// evidence: the ledger already carried four theorems satisfied by a dead neuron, and they passed for months.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runSequence } from '../sequence-run.js'
import { DIGITS, dz } from '../separation.js'

test('every residue is reached, and the seed is always in the ring', () => {
  for (const d of DIGITS) {
    const r = runSequence(d)
    // mod TEN, not nine: dz is defined over the ten DIGITS and dz(9)=1 differs from dz(0)=0, so a mod-9 fold
    // would make digit 9 unreachable as a seed. This assertion is what caught that in the executor.
    assert.equal(r.seed, d % 10, `${d} must enter at its own digit`)
    assert.ok(r.seed >= 0 && r.seed <= 9, 'a seed outside the ring is not a seed')
    assert.equal(r.reflection, dz(r.seed), 'the reflection must be dz of the seed, not a parallel derivation')
  }
})

test('the fixed points are EXACTLY 0 and 5 — measured, not asserted', () => {
  const fixed = DIGITS.filter((d) => runSequence(d).fixed)
  assert.deepEqual(fixed, [0, 5], 'dz fixes only the ends and the centre')
  // the control: every other residue must MOVE under the reflection
  for (const d of DIGITS.filter((x) => x !== 0 && x !== 5))
    assert.notEqual(runSequence(d).reflection, d, `${d} must not be its own mirror`)
})

test('the executor DISCOVERS that dz reverses and doubling does not', () => {
  const r = runSequence('any input at all')
  assert.equal(r.reversible.dz, true, 'the reflection is an involution over the whole ring')
  assert.equal(r.reversible.doubling, false, 'doubling loses information — the irreversible step is the productive one')
  assert.notEqual(r.reversible.dz, r.reversible.doubling, 'if these ever agree the test has stopped measuring')
})

test('text enters through its content-address, and the same text always lands the same way', () => {
  const a = runSequence('uuidna')
  const b = runSequence('uuidna')
  assert.equal(a.address, b.address, 'the fold is deterministic — no clock, no RNG')
  assert.equal(a.seed, b.seed)
  assert.equal(a.kind, 'text')
  assert.equal(runSequence(7).kind, 'number')
  assert.equal(runSequence(7).address, null, 'a number needs no address to have a residue')
  // the control: DIFFERENT text must generally land elsewhere — 1-in-9 agreement is the floor, not the rule
  const seeds = new Set(['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota']
    .map((s) => runSequence(s).seed))
  assert.ok(seeds.size > 1, 'nine different strings folding to one residue would mean the fold is constant')
})

test('order matters almost everywhere — the two steps do not commute', () => {
  const r = runSequence(1)
  assert.ok(r.orderMatters.length >= 8, `dz∘double and double∘dz must differ widely, saw ${r.orderMatters.length}`)
  assert.ok(r.orderMatters.length <= DIGITS.length, 'it cannot differ on more residues than the ring holds')
})

test('the walk is bounded and the report is total — no field is left undefined', () => {
  for (const input of [0, 5, 'the captain', -3, 999999]) {
    const r = runSequence(input)
    for (const [k, v] of Object.entries(r)) assert.notEqual(v, undefined, `${k} must be computed for ${input}`)
    assert.ok(r.visited.length > 0 && r.visited.length <= 10, 'the walk visits at least one residue and never leaves the ring')
    assert.ok(r.orbit.every((x) => x >= 0 && x <= 9), 'no step may leave the ring')
  }
})
