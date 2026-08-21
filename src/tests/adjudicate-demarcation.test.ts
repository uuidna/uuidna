// adjudicate — a qualifier belongs to the clause it qualifies.
//
// DEMARCATED was tested against the whole sentence, so ONE hedge word anywhere disarmed the Clay collision check.
// Appending "and no counterexample remains" to a Riemann claim flipped it from UNVERIFIED to VERIFIED, and the
// security audit guarding this reported ok throughout, because it probes only two fixed sentence shapes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { statusCollisions, numeralsOf, theoremNumerals } from '../adjudicate.js'
import { tryClaim, theorems } from '../index.js'

// ── THE EVASIONS. Each of these returned zero collisions before the fix.
test('a hedge in a TRAILING clause does not disarm the claim', () => {
  for (const evasion of [
    'we prove the Riemann hypothesis and no counterexample remains',
    'uuidna has solved the Riemann hypothesis; nothing is left open',
    'we solved the Hodge conjecture, bounded and finite',
    'we proved the Riemann hypothesis — nothing further is open',
  ]) assert.ok(statusCollisions(evasion).length > 0, `evasion slipped through: ${evasion}`)
})

test('the bare claim still collides — the fix did not weaken detection', () => {
  assert.ok(statusCollisions('we prove the Riemann hypothesis').length > 0)
})

// ── THE CONTROL. A genuine demarcation must still pass, or the check becomes unusable.
test('a hedge IN the claim clause demarcates, as it always did', () => {
  for (const honest of [
    'we do not claim to have solved the Riemann hypothesis',
    'we never solved the Riemann hypothesis',
    'the Riemann hypothesis is open',
    'uuidna has not solved any Clay problem',
  ]) assert.equal(statusCollisions(honest).length, 0, `honest demarcation wrongly flagged: ${honest}`)
})

test('a sentence with no self-voice or no solve verb is not a claim at all', () => {
  assert.equal(statusCollisions('the Riemann hypothesis concerns the zeta function').length, 0)
  assert.equal(statusCollisions('somebody proved something once').length, 0)
})

// ── THE NUMERAL CONTRADICTION (gap 46). relevantCitation killed the NO-vocabulary laundering; this kills the case
// where the claim shares vocabulary and CONTRADICTS the cited theorem, which is worse because the shared words make
// the citation look diligent. All three of these were VERIFIED live on 2026-08-20.
test('a citation whose own arithmetic contradicts the claim REFUTES it rather than backing it', () => {
  const flip = [
    'the vortex orbit has nine fixed points, proven by theorem dz_fixed_points',   // decides [0, 5] — TWO
    'dz has seven hundred fixed points, proven by theorem dz_fixed_points',        // "seven hundred" is 700, not 7
    'the mirror is fixed at eight, proven by theorem mirror_fixed_five',           // the KEY itself says five
  ]
  for (const c of flip) assert.equal(tryClaim(c).verdict, 'UNVERIFIED', `must not verify: ${c}`)
  // the controls, which are the whole point — a rule that rejects everything is not a rule
  const hold = [
    'dz has two fixed points, proven by theorem dz_fixed_points',
    'the mirror is fixed at five, proven by theorem mirror_fixed_five',
    'the reduce is order invariant, proven by theorem reduce_is_order_invariant',  // no numeral: untouched
    // THE FALSE POSITIVE THAT NARROWED THE RULE, caught by prose-gate.test.ts and not by my own measurement: the
    // "seven" counts the CLAY PROBLEMS, which clay_riemann never quantifies. A theorem must DECIDE A LIST before a
    // counting claim against it means anything — a corpus of theorem-statements-as-claims cannot contain this case.
    'the captain sealed the reflection of the seven, solved none — proven by theorem clay_riemann',
  ]
  for (const c of hold) assert.equal(tryClaim(c).verdict, 'VERIFIED', `must still verify: ${c}`)
})

test('the numeral reader sees words, digits, compounds — and the LENGTH of a decided list', () => {
  assert.deepEqual(numeralsOf('has 5 and twelve').sort((a, b) => a - b), [5, 12])
  assert.deepEqual(numeralsOf('seven hundred'), [700], '"seven hundred" is ONE number — 7 must not satisfy 700')
  assert.deepEqual(numeralsOf('no numbers here'), [], 'a claim asserting no number is never judged on numbers')
  // "[0, 5]" answers "how many" with 2 — a number written nowhere in the statement
  assert.ok(theoremNumerals({ key: 'k', statement: '((List.range 10).filter f) = [0, 5]' }).includes(2),
    'the length of a decided list is one of its numbers')
  assert.ok(theoremNumerals({ key: 'mirror_fixed_five', statement: 'x = [5]' }).includes(5),
    'the key carries numbers too — mirror_fixed_five says five before the statement does')
})

// MEASURED over the whole ledger the day it landed: 0 false positives from this rule. The 889 statements that do
// not verify fail the PRE-EXISTING relevance probe (a pure-arithmetic statement shares no WORDS with its key), and
// that is the gate erring toward UNVERIFIED, which is the safe direction.
test('the numeral rule adds NO false positive over the live ledger', () => {
  const offenders = theorems().filter((t) => {
    if (!/=\s*\[/.test(t.statement)) return false          // only list-deciding theorems are judged on counts
    const claim = `${t.statement}, proven by theorem ${t.key}`
    return numeralsOf(claim).some((n) => !theoremNumerals(t).includes(n))
  })
  assert.deepEqual(offenders.map((t) => t.key), [],
    'a theorem whose OWN statement cites its OWN key must never contradict itself numerically')
})
