// quantum/dispatch — THE CONDITION THAT MATTERS IS THE ONE AN EXISTENCE CHECK CANNOT SEE.
//
// slimGate asks whether a claim's citations are SEALED. That catches a fabricated proof and nothing else. It
// does not catch the move where a real, sealed theorem is attached to a sentence it has nothing to do with —
// "backed by theorem bell_born_weights" on a claim about billing passes an existence check perfectly. Dispatch
// adds the condition that closes it: the witness must be one the claim ITSELF cites. That is the test below
// that can fail on honest-looking code, and it is the reason this module exists rather than a call to reveal().
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { dispatch, dispatchAll, refusalReport } from '../quantum/dispatch/index.js'

const REAL = 'n_qubit_dimension'
const ALSO_REAL = 'bell_born_weights'

test('a claim that cites its own sealed witness is dispatched as a quantum message', () => {
  const d = dispatch({
    claim: `The simulation cost is exponential in the qubit count, by theorem ${REAL}.`,
    witness: REAL,
  })
  assert.equal(d.passed, true)
  assert.equal(d.verdict, 'VERIFIED')
  assert.ok(d.cites.includes(REAL))
  assert.ok(d.message, 'a dispatched claim must carry the message it was encoded as')
  assert.match(d.message.id, /^[0-9a-f-]{36}$/)
  assert.ok(d.message.qubits > 0)
  assert.ok(d.message.hexbits >= 0)
})

test('THE LAUNDERING CASE — a real sealed witness the claim does not cite is REFUSED', () => {
  const d = dispatch({
    claim: `The simulation cost is exponential in the qubit count, by theorem ${REAL}.`,
    witness: ALSO_REAL,                                   // sealed, real, and irrelevant to this sentence
  })
  assert.equal(d.passed, false, 'an existence check passes this; that is precisely why it is not enough')
  assert.equal(d.verdict, 'VERIFIED', 'the claim itself is fine — it is the ATTACHED witness that is not')
  assert.match(d.reason, /WITNESS NOT CITED/)
  assert.equal(d.message, null)
})

test('a claim citing a proof that is NOT in the ledger is drained', () => {
  const d = dispatch({
    claim: 'This advantage is guaranteed by theorem quantum_supremacy_achieved_here.',
    witness: 'quantum_supremacy_achieved_here',
  })
  assert.equal(d.passed, false)
  assert.equal(d.verdict, 'DRAINED')
  assert.deepEqual(d.fabricated, ['quantum_supremacy_achieved_here'])
  assert.match(d.reason, /not sealed in the ledger/)
})

test('a claim citing NOTHING is refused — an uncited boast is not publishable as witnessed', () => {
  const d = dispatch({ claim: 'uuidna is faster than every quantum computer.', witness: REAL })
  assert.equal(d.passed, false)
  assert.match(d.reason, /no sealed theorem at all/)
})

test('dispatch NEVER throws — a generator holding a half-built derived layer gets data, not a crash', () => {
  for (const witness of ['', 'not_a_key', REAL]) {
    assert.doesNotThrow(() => dispatch({ claim: 'nothing cited here', witness }))
  }
})

test('ONE REFUSAL SHUTS THE WHOLE WRITE — a report may not silently drop the line it could not back', () => {
  const run = dispatchAll([
    { claim: `Exponential by theorem ${REAL}.`, witness: REAL },
    { claim: `Weights by theorem ${ALSO_REAL}.`, witness: ALSO_REAL },
    { claim: 'An unbacked flourish.', witness: REAL },
  ])
  assert.equal(run.clear, false)
  assert.equal(run.passed, 2)
  assert.equal(run.refused.length, 1)
  assert.match(refusalReport(run), /did not pass the gate; nothing was written/)
  assert.match(refusalReport(run), /An unbacked flourish/)
})

test('a clear run reports clear, and its refusal report is empty rather than noisy', () => {
  const run = dispatchAll([
    { claim: `Exponential by theorem ${REAL}.`, witness: REAL },
    { claim: `Weights by theorem ${ALSO_REAL}.`, witness: ALSO_REAL },
  ])
  assert.equal(run.clear, true)
  assert.equal(run.passed, 2)
  assert.equal(refusalReport(run), '')
})

test('the run receipt is deterministic and moves with the claims', () => {
  const one = dispatchAll([{ claim: `Exponential by theorem ${REAL}.`, witness: REAL }])
  const same = dispatchAll([{ claim: `Exponential by theorem ${REAL}.`, witness: REAL }])
  const other = dispatchAll([{ claim: `Weights by theorem ${ALSO_REAL}.`, witness: ALSO_REAL }])
  assert.equal(one.receipt, same.receipt)
  assert.notEqual(one.receipt, other.receipt)
})

test('"verified" is stated as backing, never as endorsement', () => {
  const d = dispatch({ claim: `Exponential by theorem ${REAL}.`, witness: REAL })
  assert.match(d.reason, /never endorsement/)
})
