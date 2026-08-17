// prose-gate tests — the gate FOLDED TO THE THEOREMS. The lexical honesty floor was put on trial (see gate.ts),
// found leaky and hardcoded, and removed by folding to 0. So overreachOf no longer drains a word: it drains ONLY a
// FABRICATED theorem citation — a claim that a proof exists which does not — and REVEALS everything else, held open
// (UNVERIFIED) rather than word-censored. These tests pin exactly that: the one decidably-false case drains; the old
// lexical superlatives now pass, by design, because no word decides truth — the ledger does. Integrity, not truth.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { overreachOf } from '../index.js'

test('a claim that cites no theorem is REVEALED, not drained', () => {
  for (const revealed of [
    'Build the next domain of skilled theorems.',
    'The heart is 5, the fixed point of the reflection.',
    'Content-addressed, recomputable by anyone.',
    // The former lexical overclaims: no word-list drains them now. They are revealed as UNVERIFIED, not censored.
    'uuidna computes at once.',
    'this tool is unbreakable and 100% secure',
    'professional-grade, enterprise-grade, unstoppable',
    'rotate in combinations resulting in infinite results all in no time',
  ]) assert.equal(overreachOf(revealed), null, `revealed (cites no theorem): ${revealed}`)
})

test('citing a FABRICATED theorem is the one decidably-false case — it drains', () => {
  assert.equal(overreachOf('honesty is total, proven in theorem honesty_is_guaranteed'), 'honesty_is_guaranteed')
  assert.equal(overreachOf('see /theorem/unbreakable_forever for the proof'), 'unbreakable_forever')
})

test('citing a REAL sealed theorem passes — a backed claim is not drained', () => {
  for (const backed of [
    'the fixed point is 5, proven in theorem diamond_involution',
    'the week is the rosette, see /theorem/week_is_z7',
  ]) assert.equal(overreachOf(backed), null, `backed by a real proof: ${backed}`)
})

// ── the STATUS-DNA COLLISION — a REAL citation must not launder a solve-claim the sealed names refuse. Demonstrated
// live (trial 047ba524): "the seven are solved and claimed by the captain — theorem clay_vote_theorems_only" came
// back VERIFIED because the key exists. The collision check retires that: a claim in uuidna's own voice asserting a
// solve about a subject whose sealed name carries "— OPEN" (or a SOLVED credited to someone else) adjudicates
// UNVERIFIED on every path, while demarcated claims (the reflection, none, not) and off-subject deposits still pass.
import { adjudicate, statusCollisions } from '../adjudicate.js'

test('a real citation does not launder a solve-claim against sealed status DNA', () => {
  const laundered = 'the seven Clay problems are solved and claimed by the captain; only the prize is an external matter — proven by theorem clay_vote_theorems_only'
  assert.equal(adjudicate(laundered).verdict, 'UNVERIFIED')
  assert.ok(statusCollisions(laundered).length >= 7, 'collides with the whole status-marked cluster')
  for (const [p, k] of [
    ['the Riemann hypothesis', 'clay_riemann'],
    ['P versus NP', 'clay_p_vs_np'],
    ['the Poincaré conjecture', 'clay_poincare'],
  ] as const) assert.equal(adjudicate(`we prove ${p} — proven by theorem ${k}`).verdict, 'UNVERIFIED', `dressed solve-claim of ${p} must not verify`)
})

test('the distinction, demarcated claims, and third-party credit still verify or stay uncollided', () => {
  assert.equal(adjudicate('verified is the kernel judgment on the stated proposition; the seal confers no solved status on the named problem — proven by theorem clay_verified_ne_solved').verdict, 'VERIFIED')
  assert.equal(adjudicate('the captain sealed the reflection of the seven, solved none — proven by theorem clay_riemann').verdict, 'VERIFIED')
  assert.equal(statusCollisions('the Poincaré conjecture was solved by Perelman in 2003').length, 0, 'crediting the historical solver is no collision')
})
