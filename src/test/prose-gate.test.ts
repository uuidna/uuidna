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
