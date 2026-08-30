import { test } from 'node:test'
import assert from 'node:assert/strict'
import { runTrial } from '../trial-run.js'
import { THEOREMS, trialSequenceOf, TRIAL_DIGIT_ANGLE } from '../theorems/index.js'
import { runSequence } from '../sequence-run.js'

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
  assert.equal(trial.sequence.angles.digitStep, 40)
  for (const v of trial.verdicts) {
    assert.equal(v.sequence.polarity, runSequence(v.address).polarity)
  }
})

test('runTrial — sequence receipt is deterministic', () => {
  const [a, b] = [runTrial(), runTrial()]
  assert.equal(a.sequence.receipt, b.sequence.receipt)
  assert.equal(a.receipt, b.receipt)
})
