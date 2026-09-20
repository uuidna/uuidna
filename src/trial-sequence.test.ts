import { test } from 'node:test'
import assert from 'node:assert/strict'
import { A432_STEP, MIRROR_BASE } from './address.js'
import { runTrial } from './index.js'
import { THEOREMS, trialSequenceOf, TRIAL_DIGIT_ANGLE } from './index.js'
import { runSequence } from './index.js'

test('trialSequenceOf — polarity and spin match runSequence on the address', () => {
  const t = THEOREMS[0]!
  const seq = runSequence(t.address)
  const trial = trialSequenceOf(t.address)
  assert.equal(trial.polarity, seq.polarity)
  assert.equal(trial.spin, seq.period)
  assert.equal(trial.angle, (seq.seed * TRIAL_DIGIT_ANGLE) % 360)
  assert.equal(trial.seed, seq.seed)
})

test('runTrial — living sequence census matches every verdict', () => {
  const trial = runTrial()
  assert.equal(trial.count, THEOREMS.length)
  assert.equal(trial.sequence.polarities.minus + trial.sequence.polarities.neutral + trial.sequence.polarities.plus, trial.count)
  assert.equal(trial.sequence.dash.stepDegrees, 60)
  assert.equal(trial.sequence.dash.closes, true)
  // THE STEP IS ASSERTED AGAINST ITS DEFINITION AND ITS PROPERTY, NOT AGAINST A NUMBER. This read `40`, which is a
  // fifth hand-written copy of a rule the ledger already states, and it was the only thing that caught the step
  // moving — by failing, which is right, but a literal here would have to be edited on every move and so only ever
  // schedules the next drift. The first line ties the census to the one definition; the second is the real check,
  // and it is the property 40 did NOT have: the step is A432's own quantum and MIRROR_BASE of them close the circle.
  assert.equal(trial.sequence.angles.digitStep, A432_STEP)
  assert.equal(A432_STEP * MIRROR_BASE, 360)
  assert.equal(432 % A432_STEP, 0)
  for (const v of trial.verdicts) {
    assert.equal(v.sequence.polarity, runSequence(v.address).polarity)
  }
})

test('runTrial — sequence receipt is deterministic', () => {
  const [a, b] = [runTrial(), runTrial()]
  assert.equal(a.sequence.receipt, b.sequence.receipt)
  assert.equal(a.receipt, b.receipt)
})
