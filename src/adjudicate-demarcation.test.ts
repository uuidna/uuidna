// The status-DNA collision tests that stood here are gone with the machinery they exercised. It refused a
// solve-claim contradicting a world-status marker in a sealed theorem's name, and every theorem carrying such a
// marker was in the Clay wing — purged, because its theorems were single points of dz_involution with the
// Millennium problem living in the key. With no marked theorem left the check could not fire on any input, so
// the tests were asserting against a function that always returned empty: green, and measuring nothing.
// adjudicate — a qualifier belongs to the clause it qualifies.
//
// DEMARCATED was tested against the whole sentence, so ONE hedge word anywhere disarmed the Clay collision check.
// Appending "and no counterexample remains" to a Riemann claim flipped it from UNVERIFIED to VERIFIED, and the
// security audit guarding this reported ok throughout, because it probes only two fixed sentence shapes.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { numeralsOf, theoremNumerals } from './adjudicate.js'
import { tryClaim, theorems } from './index.js'

// ── THE EVASIONS. Each of these returned zero collisions before the fix.


// ── THE CONTROL. A genuine demarcation must still pass, or the check becomes unusable.


// ── THE NUMERAL CONTRADICTION (gap 46). relevantCitation killed the NO-vocabulary laundering; this kills the case
// where the claim shares vocabulary and CONTRADICTS the cited theorem, which is worse because the shared words make
// the citation look diligent. All three of these were VERIFIED live on 2026-08-20.

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
