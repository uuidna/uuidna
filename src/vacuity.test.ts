import { test } from 'node:test'
import assert from 'node:assert/strict'
import { vacuityReason } from './vacuity.js'
import { validateCandidate } from './wave-deposit.js'
import { vacuousGaps } from './scripts/one-receipt.js'
import { theorems } from './theorems/index.js'

// THE RULE HAS TWO CONSUMERS AND MUST BE ONE RULE. It was a closure inside vacuousGaps, so it could only run
// as a guard — after a candidate had been deposited, kernel-probed, accepted and sealed. The conveyor sealed
// `alpine_security_ops_plannable_4 : (4 + 0 = 4) ∧ (0 = 0)` and only the post-seal guard had a word for it.
// These tests hold the extraction faithful AND hold the door to the same rule.

const cand = (lean: string) => ({
  key: 'vacuity_probe_1',
  why: 'a candidate whose prose is long enough to clear the door law',
  lean,
})

test('vacuityReason names the fault the conveyor actually sealed', () => {
  const r = vacuityReason('(4 + 0 = 4) ∧ (0 = 0)')
  assert.ok(r, 'the exact statement the wave sealed must be recognised')
  assert.match(r, /every conjunct is vacuous/)
})

test('vacuityReason descends into a conjunction — the bug that let it through', () => {
  // The earlier rule split on the top-level operator and compared the two HALVES to each other. The halves of
  // `(4 + 0 = 4) ∧ (0 = 0)` are unequal, so it returned null and never looked inside either one.
  assert.ok(vacuityReason('(2604 + 0 = 2604) ∧ (0 = 0)'))
  assert.ok(vacuityReason('(7 * 1 = 7) ∧ (5 = 5) ∧ (0 + 3 = 3)'))
})

test('vacuityReason names each identity for its own reason', () => {
  assert.match(vacuityReason('True')!, /proves nothing at all/)
  assert.match(vacuityReason('(9 = 9)')!, /reflexivity/)
  assert.match(vacuityReason('(7 * 1 = 7)')!, /multiplicative identity/)
  assert.match(vacuityReason('(12 + 0 = 12)')!, /additive identity/)
  assert.match(vacuityReason('(12 - 0 = 12)')!, /subtracting nothing/)
})

// THE CONTROL. A rule that answers "vacuous" to everything would pass every test above and refuse the whole
// conveyor. These say something, and the rule must let them through.
test('a substantive statement is NOT vacuous — the rule can fail', () => {
  for (const s of [
    '(85179 / 36 = 2366) ∧ (2603 * 36 = 93708)',
    '(144 + 100 = 244) ∧ (100 < 119)',
    '(6 + 4 + 10 = 20)',
    '(77885 > 75224) ∧ (32183 < 32424)',
  ]) assert.equal(vacuityReason(s), null, s)
})

test('the deposit door refuses what the guard would have caught after the seal', () => {
  const sealed = new Map<string, unknown>()
  const bad = validateCandidate(cand('theorem vacuity_probe_1 : (4 + 0 = 4) ∧ (0 = 0) := by decide'), sealed)
  assert.ok(bad, 'the door must refuse the statement the conveyor once accepted')
  assert.match(bad, /vacuity law/)
  const ok = validateCandidate(cand('theorem vacuity_probe_1 : (144 + 100 = 244) ∧ (100 < 119) := by decide'), sealed)
  assert.equal(ok, null, 'a substantive candidate must still reach the kernel')
})

test('the door and the guard cite the same rule — one declaration, two consumers', () => {
  // Whatever the guard reports vacuous, the door must refuse; a fold that drifts is two rules wearing one name.
  for (const g of vacuousGaps()) {
    const m = /`([^`]+)`/.exec(g.what)
    if (!m) continue
    assert.ok(vacuityReason(m[1]!), `the door's rule must see what the guard reported: ${m[1]}`)
  }
})

// ── A CONNECTION THAT CONNECTS NOTHING (found 2026-09-05, chasing an edit three sessions disclaimed).
//
// `connect-lonely --write` gives an isolated theorem a neighbour by appending its digital root. It emitted the
// ROOT's residue instead of the VALUE's — so a theorem about 85179 was connected by `(3 % 9 = 3)`: true, and a
// fact about the number 3, which appears nowhere in the theorem. Every theorem of the same root received the
// identical conjunct, so the lonely count fell 23 -> 10 on seven shared constants.
//
// Both shapes it produced are IDENTITIES, which is why they could never fail and never informed: `a % b = a`
// holds for every a below b, and `a % a = 0` holds for every a. The tool is fixed to name the value; these hold
// the rule that can SEE the old shape, so it cannot come back unnamed.
test('a residue that cannot wrap is vacuous — the shape connect-lonely emitted', () => {
  assert.match(vacuityReason('(3 % 9 = 3)')!, /cannot wrap/)
  assert.match(vacuityReason('(4 % 9 = 4)')!, /cannot wrap/)
  assert.match(vacuityReason('(9 % 9 = 0)')!, /modulo itself/)
})

test('a residue that CAN wrap says something — the control', () => {
  // 85179 % 9 = 3 is what the tool should have emitted: true, and true of this theorem's own number.
  assert.equal(vacuityReason('(85179 % 9 = 3)'), null)
  assert.equal(vacuityReason('(12 % 5 = 2)'), null)
  assert.equal(vacuityReason('(221720937 % 9 = 0)'), null)
})

// SHRINK-ONLY, while the captain rules on the 24 already sealed. The fake conjuncts are in the ledger and
// re-sealing them changes it, which is not a decision a test makes. What a test CAN do is stop them multiplying.
test('the sealed wrap-free residues are a known set that may only shrink', () => {
  // MEASURED, not chosen: 26 theorems carry one. My first guess was 24 — a grep over generated.ts that only
  // matched single-digit moduli — and the honest number is larger. Ten distinct conjuncts, and NOT all are
  // connect-lonely's: (8 % 8 = 0), (10 % 10 = 0) and (360 % 360 = 0) were hand-written, where a % a = 0 reads
  // as a cycle closing. Formally they are identities all the same, which is why the rule names them and the
  // captain rules on whether they are re-stated.
  const SEALED_WRAP_FREE = 26
  const found = theorems().filter((t) => {
    for (const m of t.statement.matchAll(/\((\d+)\s*%\s*(\d+)\s*=\s*(\d+)\)/g)) {
      const [a, b, r] = [Number(m[1]), Number(m[2]), Number(m[3])]
      if ((a < b && a === r) || (a === b && r === 0)) return true
    }
    return false
  })
  assert.ok(found.length <= SEALED_WRAP_FREE,
    `wrap-free residue conjuncts grew ${SEALED_WRAP_FREE} -> ${found.length}: ${found.slice(0, 5).map((t) => t.key).join(', ')}. connect-lonely now names the VALUE, so a new one means something else is appending constants.`)
})
