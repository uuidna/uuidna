// trial-protocol — a trial that cannot return a negative is not a trial.
//
// The last test here is the one that matters: it takes the repo's OWN dna-recomputes check, runs it as a
// pre-registered trial with a forged theorem as the control, and requires the verdict to be VOID. That check has
// reported green since it was written, because nothing ever fed it a forgery.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { trial, trialWithControls } from '../trial-protocol.js'
import { theorems, toUuid } from '../index.js'

test('a test that always passes is VOID, not supported', () => {
  const r = trial({ hypothesis: 'all is well', refutedIf: 'never', test: () => true, control: 'x', subject: 'x' })
  assert.equal(r.outcome, 'void')
  assert.equal(r.controlRejected, false)
  assert.match(r.why, /CONTROL passed/)
})

test('a protocol with no registered refutation criterion cannot run', () => {
  const r = trial({ hypothesis: 'h', refutedIf: '   ', test: (s: string) => s === 'a', control: 'b', subject: 'a' })
  assert.equal(r.outcome, 'void')
  assert.match(r.why, /no refutation criterion/)
})

test('control rejected and subject holds is SUPPORTED — and says that is not proven', () => {
  const r = trial({ hypothesis: 'evens', refutedIf: 'an odd passes', test: (n: number) => n % 2 === 0, control: 3, subject: 4 })
  assert.equal(r.outcome, 'supported')
  assert.equal(r.controlRejected, true)
  assert.match(r.why, /not proven/)
})

test('control rejected and subject fails is REFUTED — a result, not an error', () => {
  const r = trial({ hypothesis: 'evens', refutedIf: 'an odd passes', test: (n: number) => n % 2 === 0, control: 3, subject: 7 })
  assert.equal(r.outcome, 'refuted')
  assert.match(r.why, /is a result/)
})

test('one leaked control voids the whole trial, however many hold', () => {
  const r = trialWithControls({ hypothesis: 'evens', refutedIf: 'an odd passes', test: (n: number) => n % 2 === 0, controls: [3, 5, 4], subject: 8 })
  assert.equal(r.outcome, 'void')
  assert.match(r.why, /1 of 3 controls PASSED/)
})

test('no controls at all is INCONCLUSIVE — nothing established that the test can fail', () => {
  const r = trialWithControls({ hypothesis: 'h', refutedIf: 'r', test: () => true, controls: [], subject: 1 })
  assert.equal(r.outcome, 'inconclusive')
})

// ── THE LIVE CASE. This is the repo's own integrity check, tried properly.
test("the ledger's dna-recomputes check is VOID: a forged theorem passes its control", () => {
  const dnaRecomputes = (t: { key: string; statement: string; address: string }): boolean =>
    toUuid(t.key + ':' + t.statement) === t.address
  const forged = { key: 'totally_made_up_theorem', statement: '2 + 2 = 5' }
  const r = trial({
    hypothesis: 'dna-recomputes detects a forged or tampered theorem',
    refutedIf: 'an invented theorem recomputes its own address and is admitted',
    // the forged entry is given the address the check will derive for it — exactly what withDerived does at load
    test: dnaRecomputes,
    control: { ...forged, address: toUuid(forged.key + ':' + forged.statement) },
    subject: theorems()[0] as unknown as { key: string; statement: string; address: string },
  })
  assert.equal(r.outcome, 'void', 'the check compares a pure function to itself, so its control cannot fail')
  assert.equal(r.controlRejected, false)
})
