// gate-backing — THE CITED THEOREM'S OWN SENTENCE MUST REACH THE VERDICT.
//
// THE HOLE THIS PINS, found 2026-08-25 by attempting a claim and watching the gate pass it. slimGate folds the
// ledger to `Map<key, address>` (slimgate.ts) — a theorem reaches the verdict as a TOKEN, its prose discarded — so
// the gate confirms a citation EXISTS and is structurally incapable of noticing that the cited theorem DENIES the
// claim citing it. "uuidna achieves quantum advantage, by theorem n_qubit_dimension" returns VERIFIED, while
// n_qubit_dimension's own sealed text ends "it is NOT a speedup or a quantum advantage". The gate read the key and
// never read the sentence.
//
// THE VERDICT IS STILL VERIFIED AND THAT IS CORRECT. Entailment is not decidable; the trial already ruled this
// class UNVERIFIED when it ruled on "uuidna is honest". uuidna verifies, it never refutes. What is repaired is not
// the verdict but the LEAK: VERIFIED now arrives carrying what it is verified BY, so the refuting sentence cannot
// be separated from the citation that leans on it. That is microdata's discipline — the qualifier travels attached
// to the figure — applied one layer out, at citation rather than at serialisation.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { reveal } from './index.js'
import { THEOREMS, theoremByKey } from './index.js'

/** the exact claim that exposed the hole, kept verbatim so the demonstration cannot quietly stop being one */
const OVERCLAIM = 'uuidna achieves quantum advantage: it computes faster than quantum hardware, by theorem n_qubit_dimension.'

test('THE DEMONSTRATION — the overclaim still VERIFIES, and now carries the sentence that refutes it', () => {
  const r = reveal(OVERCLAIM)
  // unchanged, and deliberately: the citation is sealed, so the gate says so. It does not gain the power to refute.
  assert.equal(r.verdict, 'VERIFIED')
  const says = r.backing.find((b) => b.key === 'n_qubit_dimension')?.says ?? ''
  assert.match(says, /NOT a speedup or a quantum advantage/,
    'the cited theorem denies the claim citing it; if that clause cannot reach the verdict, the leak is back')
  assert.match(r.reveal, /never that the citation SUPPORTS the claim/,
    'VERIFIED must say what it does NOT mean, or a reader takes it for endorsement')
})

test('THE SCOPE IS NOT TRUNCATED — the denial is the LAST clause, so head-clipping drops exactly what matters', () => {
  const t = theoremByKey().get('n_qubit_dimension')
  assert.ok(t, 'n_qubit_dimension must stay sealed for this file to mean anything')
  const says = reveal(OVERCLAIM).backing[0]?.says ?? ''
  assert.equal(says, t!.name,
    'backing carries the theorem prose WHOLE — a .slice() here would clip the qualifier out of the qualifier, ' +
    'which is this tree\'s most-repeated defect and the reason the field is unclipped')
})

test('every sealed citation reaches the verdict with its text — none arrive as bare tokens', () => {
  const sample = THEOREMS.slice(0, 200)
  const silent: string[] = []
  for (const t of sample) {
    const r = reveal(`a claim resting on theorem ${t.key}.`)
    if (r.verdict !== 'VERIFIED') { silent.push(t.key + ' (did not verify)'); continue }
    const b = r.backing.find((x) => x.key === t.key)
    if (!b || b.says.length === 0) silent.push(t.key + ' (no scope reached the verdict)')
  }
  assert.deepEqual(silent, [], 'a citation whose scope is empty is the bare token this file exists to end')
})

test('THE CHECK BITES — an unbacked claim gets no backing, and a fabricated one is still drained', () => {
  // if backing were populated regardless, every assertion above would be decoration
  const hollow = reveal('uuidna is the best system ever built.')
  assert.equal(hollow.verdict, 'UNVERIFIED')
  assert.deepEqual(hollow.backing, [])
  const forged = reveal('backed by theorem quantum_advantage_achieved.')
  assert.equal(forged.verdict, 'DRAINED')
  assert.deepEqual(forged.backing, [], 'a fabricated citation has no text to carry — there is no such theorem')
})
