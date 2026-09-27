// THE FINDER IS WORTH WHAT ITS CALIBRATION IS WORTH, and this one was wrong twice before it was right. Both errors are
// pinned here, because a detector that over-reports gets switched off and one that under-reports gets believed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shapeTrue, conjunctsOf, dataNumerals, paddingCensus, paddingGaps } from './padding-conjunct.js'

// ─── what padding IS: true because of its form, whatever the numbers ────────────────────────────────────────
test('a conjunct true by its shape is padding', () => {
  for (const c of ['(5 = 5)', '(118 = 118)', '(32 - 0 = 32)', '(0 + 273 = 273)', '(2 * 1 = 2)', '(5 * 0 = 0)']) {
    assert.equal(shapeTrue(c), true, `${c} holds whatever its numerals are, so it constrains nothing`)
  }
})

test('a conjunct that constrains its numbers is NOT padding', () => {
  for (const c of ['(3 + 1 = 4)', '((2 * 5) % 9 = 1)', '(100 + 273 = 373)', '(373 - 273 = 100)', '(10 - 5 = 5)']) {
    assert.equal(shapeTrue(c), false, `${c} stops holding when its numbers change, which is what a claim does`)
  }
})

// ─── THE FIRST CALIBRATION ERROR: primes are pairwise coprime ────────────────────────────────────────────────
// Substituting only primes made `Nat.gcd 19 235 = 1` — a real claim about two gear counts — become `Nat.gcd 7 11 = 1`,
// which holds. The finder accused a genuine claim. A second family that SHARES a factor is the cure, and the same trap
// hides behind every relation of the form "shares no factor", "is not a multiple", "is odd".
test('coprimality is a real claim and must survive the substitution test', () => {
  assert.equal(shapeTrue('(Nat.gcd 19 235 = 1)'), false, 'the hunting-tooth claim says these two counts are coprime')
  assert.equal(shapeTrue('(Nat.gcd 3 8 = 1)'), false)
  // and the control: a gcd that is shape-true must still be caught, or the fix has merely disabled the test here
  assert.equal(shapeTrue('(Nat.gcd 5 5 = 5)'), true, 'gcd of a number with itself is that number, whatever it is')
})

// ─── THE SECOND: MY OWN EARLIER FIX WAS PADDING ──────────────────────────────────────────────────────────────
// I replaced Antikythera's `(50 = 50)` with `(50 / 50 = 1) ∧ (50 % 50 = 0)` and called it "ratio one, computed". Both
// hold for any number divided by itself, so the replacement was the same species as the thing it replaced. The finder
// caught it, which is the only reason I know.
test('dividing a number by itself is shape-true — my own replacement was padding', () => {
  assert.equal(shapeTrue('(50 / 50 = 1)'), true, 'any n / n is 1, so this says nothing about fifty teeth')
  assert.equal(shapeTrue('(50 % 50 = 0)'), true)
})

test('a bare non-degeneracy assertion is shape-true, and that is worth knowing', () => {
  // `x ≠ 0` and `0 < x` are honest but weak: they hold of every non-zero numeral, so they are furniture in a
  // conjunction that claims to be about particular quantities.
  assert.equal(shapeTrue('(2376 ≠ 0)'), true)
  assert.equal(shapeTrue('(0 < 257)'), true)
})

// ─── the parts, and the pre-filter ───────────────────────────────────────────────────────────────────────────
test('conjuncts split at TOP-LEVEL ∧ only, so a nested one is not torn apart', () => {
  assert.deepEqual(conjunctsOf('(a = b) ∧ (c = d)'), ['(a = b)', '(c = d)'])
  assert.equal(conjunctsOf('((x ∧ y)) ∧ (z)').length, 2, 'a ∧ inside brackets belongs to its own term')
  assert.equal(conjunctsOf('(only one term)').length, 1)
})

test('0 and 1 are shape, not data — substituting them would hide the padding', () => {
  assert.deepEqual(dataNumerals('(5 * 0 = 0)'), ['5'], 'the zero is what makes this say nothing; it must stay a zero')
  assert.deepEqual(dataNumerals('(2 * 1 = 2)'), ['2'])
  assert.deepEqual(dataNumerals('(1 + 1 = 2)'), ['2'])
})

test('a lone conjunct is never reported — padding is a term carried BESIDE others', () => {
  const c = paddingCensus([{ key: 'k', statement: '(5 = 5)', file: 'W.lean' }])
  assert.equal(c.findings.length, 0, 'a one-term statement is simply that claim, however weak')
  assert.equal(c.examined, 0)
})

test('the census names the row and the term, and the receipt moves with the findings', () => {
  const dirty = paddingCensus([{ key: 'k', statement: '(5 = 5) ∧ (3 + 1 = 4)', file: 'W.lean' }])
  assert.equal(dirty.findings.length, 1)
  assert.equal(dirty.findings[0]!.conjunct, '(5 = 5)')
  assert.equal(dirty.findings[0]!.of, 2, 'a reader needs to know how much of the statement the padding is')
  const clean = paddingCensus([{ key: 'k', statement: '(3 + 1 = 4) ∧ (10 - 5 = 5)', file: 'W.lean' }])
  assert.equal(clean.findings.length, 0)
  assert.notEqual(dirty.receipt, clean.receipt)
})

test('the gap names the cure, including the case a rewrite cannot reach', () => {
  const gaps = paddingGaps([{ key: 'k', statement: '(5 = 5) ∧ (3 + 1 = 4)', file: 'W.lean' }])
  assert.equal(gaps.length, 1)
  assert.match(gaps[0]!.fix, /second route|walk over the domain|characterisation/)
  assert.match(gaps[0]!.fix, /ratchet/, 'two coinciding counts are a measurement wearing a theorem name, not a rewrite')
})
