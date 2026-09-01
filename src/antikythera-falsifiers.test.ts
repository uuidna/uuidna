// Antikythera — FALSIFIERS, which is the leg that says somebody checked the mutation actually breaks it.
//
// A theorem stands on five legs: symbol, proof, witness, falsifier, address. Three are MINTED — the key names it,
// the kernel proves it, the fold addresses it — and two are AUTHORED. This file pays falsifiers for the
// Antikythera theorems in lane 4 of the upgrade wave.
//
// WHY THIS FILE IS NOT JUST A LIST OF KEYS. rosetta.ts awards the falsifier leg when a test NAMES the theorem's
// key in executable text. Prose no longer counts — that was hardened after two keys earned the leg by appearing
// as examples in a test about key length — but a key in a string literal, a fixture or an array still earns it.
// So sprinkling a lane's worth of keys into one file would clear it in an afternoon and leave the ledger worth
// less than before, because the leg would then certify nothing. Nine separate finders in this tree have been
// fooled by that predicate this week; the count of what this lane holds is renderLane's to state, not a
// comment's — a number in prose is one no generator can keep current, which the guard rightly refuses.
//
// So every test below does the thing the leg is supposed to attest: it states the MUTATION, applies it, and
// asserts the theorem's own claim fails under it. A falsifier nobody ran is a mutation nobody checked breaks
// anything, and the module distributing this work says so in its own header.
//
// a falsifier shows the statement is SENSITIVE to its own content — that it is not vacuously true,
// and that the particular numbers carry the claim. It says nothing about whether the astronomy is right; that is
// the witness leg's question, and these theorems still owe it. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'

/** the sealed predicate of `metonic_spiral_five_turns`, restated here so a mutation can be pushed through it:
 *  235 synodic months across five turns of the spiral, 5 and 47 both prime. */
const metonic = (months: number, turns: number, perTurn: number): boolean =>
  months === turns * perTurn
  && [2, 3, 4].every((k) => turns % k !== 0 || turns === k)
  && [2, 3, 5, 6].every((k) => perTurn % k !== 0)

test('metonic_spiral_five_turns — the factorisation is load-bearing, not decorative', () => {
  assert.equal(metonic(235, 5, 47), true, 'the sealed values must hold, or the falsifier tests nothing')
  // THE MUTATION: move a single month. 234 = 2·117 factors differently and the spiral no longer closes on five
  // turns of forty-seven, so the statement is sensitive to the very number the Metonic cycle is about.
  assert.equal(metonic(234, 5, 47), false, 'one month fewer must break the closure')
  // AND THE TURNS: four turns of 47 is 188, not 235 — the five is not free either
  assert.equal(metonic(235, 4, 47), false, 'the turn count carries the claim')
  // AND THE PRIMALITY: 6 turns of 39 also reaches 234, and 6 is composite — the primality clause must reject it
  assert.equal(metonic(234, 6, 39), false, 'a composite turn count must fail the primality clause')
})

/** `callippic_corrects_by_four`: the Callippic cycle is four Metonic cycles — 4 × 235 months and 4 × 19 years. */
const callippic = (k: number): boolean => k * 235 === 940 && k * 19 === 76

test('callippic_corrects_by_four — four is the claim, and only four satisfies both halves', () => {
  assert.equal(callippic(4), true)
  // THE MUTATION: any other multiplier. Both conjuncts must fail together, which is what makes this a single
  // claim about the cycle rather than two arithmetic coincidences that happen to share a page.
  for (const k of [1, 2, 3, 5, 8]) assert.equal(callippic(k), false, `${k} Metonic cycles must not satisfy the Callippic relation`)
})

/** `saros_counts_on_a_prime`: 223 synodic months, and 223 has no divisor in 2..222. */
const noDivisorBelow = (n: number): boolean => {
  for (let k = 2; k < n; k++) if (n % k === 0) return false
  return true
}

test('saros_counts_on_a_prime — the primality is the claim, and a near miss must fail it', () => {
  assert.equal(noDivisorBelow(223), true, 'the sealed value must be prime')
  // THE MUTATION: the neighbours. 222 = 2·3·37 and 224 = 2^5·7 are both composite, so the statement is not true
  // of "roughly 223" — it is true of 223. A falsifier that only tested a wildly different number would leave the
  // interesting failure — an off-by-one in the month count — undetected.
  assert.equal(noDivisorBelow(222), false, 'one month fewer is composite')
  assert.equal(noDivisorBelow(224), false, 'one month more is composite')
  // and the control on the control: the helper must be capable of saying false at all
  assert.equal(noDivisorBelow(9), false, 'the divisor search itself must be able to find one')
})
