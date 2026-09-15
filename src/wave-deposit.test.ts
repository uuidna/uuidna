// wave-deposit — the wire's door into the conveyor on trial. The door laws live in ONE declaration
// (validateCandidate, shared with queue-wave.ts), so this file tries the DOOR: every refusal class gets a
// candidate that must land on it, a lawful candidate must pass and be written, and the refused are never
// written (the queue file's refused[] belongs to the KERNEL, not the doorman). The deposit runs against a
// scratch queue file — the real lean/wave-queue.json is the janitor's, and a test that touches it is a test
// that can race a live wave.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { writeFileSync, readFileSync, mkdtempSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { validateCandidate, depositCandidates, waveQueueInFlightKeys, waveQueueRefusedKeys, splitTheorem, assertReason } from './wave-deposit.js'
import { theoremByKey } from './index.js'

const scratch = (): string => {
  const p = join(mkdtempSync(join(tmpdir(), 'wave-deposit-')), 'wave-queue.json')
  writeFileSync(p, JSON.stringify({ pending: [], accepted: [], refused: [] }, null, 2))
  return p
}
const lawful = { key: 'wave_deposit_probe_seven_elevens', why: 'THE DOOR\'S OWN PROBE — a lawful candidate that must pass validation: 7 · 11 = 77, two primes and their product, stated by decide.', lean: 'theorem wave_deposit_probe_seven_elevens : 7 * 11 = 77 := by decide' }

test('every refusal class refuses, and the lawful candidate passes — the door can fail', () => {
  const sealed = theoremByKey()
  assert.equal(validateCandidate(lawful, sealed), null, 'the lawful candidate passes')
  assert.match(String(validateCandidate({ ...lawful, key: 'BadKey' }, sealed)), /lawful theorem key/)
  assert.match(String(validateCandidate({ ...lawful, why: 'too short' }, sealed)), /why is missing/)
  assert.match(String(validateCandidate({ ...lawful, lean: 'theorem other_key : 1 = 1 := by decide' }, sealed)), /exactly/)
  assert.match(String(validateCandidate({ ...lawful, lean: `theorem ${lawful.key} : 7 * 11 = 77 := by decide -- axiom` }, sealed)), /sorry\/admit\/axiom/)
  assert.match(String(validateCandidate({ ...lawful, key: 'two_coins', lean: 'theorem two_coins : 110 - 108 = 2 := by decide' }, sealed)), /already sealed/)
  assert.match(String(validateCandidate({ key: 'api_c9dabf27', why: 'FREE MINT from quantum-advantage: the public API attested "70 < 128"; decide() confirmed it TRUE.', lean: 'theorem api_c9dabf27 : (70 < 128) := by decide' }, sealed)), /bare literals/)
})

test('a deposit lands only the lawful, returns refusals with reasons, and never writes a refusal', () => {
  const p = scratch()
  const r = depositCandidates([lawful, { key: 'two_coins', why: 'a dupe of a sealed theorem, long enough to pass the why floor.', lean: 'theorem two_coins : 110 - 108 = 2 := by decide' }], p)
  assert.deepEqual(r.deposited, [lawful.key])
  assert.equal(r.refused.length, 1)
  assert.match(r.refused[0]!.reason, /already sealed/)
  const q = JSON.parse(readFileSync(p, 'utf8')) as { pending: { key: string }[]; refused: unknown[] }
  assert.deepEqual(q.pending.map((c) => c.key), [lawful.key], 'only the lawful candidate is written')
  assert.equal(q.refused.length, 0, 'the file\'s refused[] belongs to the kernel — the doorman never writes it')
  // a re-deposit of the same key refuses as already queued — the wire cannot double-park a candidate
  const again = depositCandidates([lawful], p)
  assert.equal(again.deposited.length, 0)
  assert.match(again.refused[0]!.reason, /already pending/)
})

// THE DOOR JUDGES SHAPE, THE KERNEL JUDGES PROOF. Any tactic reaches the probe; the door refuses only what can never
// earn the axiom-free receipt (sorry, admit, a declared axiom, native_decide), a theorem not named by its key, and a
// shape lean-ledger could not read back.
const zeroAdd = 'wave_deposit_probe_zero_add_left'
const induct = { key: zeroAdd, why: 'THE DOOR ADMITS ANY TACTIC: zero is a left identity for Nat addition, proved by induction — the kernel, not the door, decides it.', lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := by intro n; induction n with | zero => rfl | succ k ih => exact congrArg Nat.succ ih` }

test('an induction proof passes the door, and every proof the receipt can never accept is refused', () => {
  const sealed = theoremByKey()
  assert.equal(validateCandidate(induct, sealed), null, 'a non-decide candidate reaches the kernel')
  assert.equal(validateCandidate({ ...induct, lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := by\n  intro n\n  induction n with\n  | zero => rfl\n  | succ k ih => exact congrArg Nat.succ ih` }, sealed), null, 'an indented multi-line tactic block passes')
  assert.equal(validateCandidate({ ...lawful, lean: `theorem ${lawful.key} : 7 * 11 = 77 := by simp` }, sealed), null, 'the tactic is the kernel\'s to judge')
  assert.match(String(validateCandidate({ ...induct, lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := by sorry` }, sealed)), /`sorry`/)
  assert.match(String(validateCandidate({ ...induct, lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := by intro n; admit` }, sealed)), /`admit`/)
  assert.match(String(validateCandidate({ ...induct, lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := by\n  intro n\n  exact zero_add_ax n\naxiom zero_add_ax : ∀ n : Nat, 0 + n = n` }, sealed)), /`axiom`/)
  assert.match(String(validateCandidate({ ...lawful, lean: `theorem ${lawful.key} : 7 * 11 = 77 := by native_decide` }, sealed)), /`native_decide`/)
  assert.match(String(validateCandidate({ ...induct, lean: `theorem zero_add_left_other : ∀ n : Nat, 0 + n = n := by intro n; induction n with | zero => rfl | succ k ih => exact congrArg Nat.succ ih` }, sealed)), /exactly `theorem <key>/)
  assert.match(String(validateCandidate({ ...induct, lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := fun n => Nat.zero_add n` }, sealed)), /tactic block/)
  assert.match(String(validateCandidate({ ...induct, lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n` }, sealed)), /top-level `:=`/)
  assert.match(String(validateCandidate({ ...induct, lean: `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := by\n  intro n\n  simp\ninstance : Inhabited Nat := ⟨7⟩` }, sealed)), /column 0/)
})

test('the statement ends at the first := outside every bracket', () => {
  assert.deepEqual(splitTheorem('theorem k_key : (fun x => x) 3 = 3 := by decide'), { name: 'k_key', statement: '(fun x => x) 3 = 3', proof: 'by decide' })
  assert.deepEqual(splitTheorem('theorem k_key : ({ fst := 1, snd := 2 } : Nat × Nat).1 = 1 := by\n  have h : 1 = 1 := rfl\n  exact h'),
    { name: 'k_key', statement: '({ fst := 1, snd := 2 } : Nat × Nat).1 = 1', proof: 'by\n  have h : 1 = 1 := rfl\n  exact h' })
  assert.equal(splitTheorem('theorem k_key : 1 = 1'), null)
  assert.equal(splitTheorem('theorem k_key : := by decide'), null)
})

test('a kernel refusal blocks its exact (key, text); the same key with a changed proof returns to the probe', () => {
  const p = scratch()
  const refusedText = `theorem ${zeroAdd} : ∀ n : Nat, 0 + n = n := by intro n; rfl`
  writeFileSync(p, JSON.stringify({
    pending: [],
    accepted: [],
    refused: [{ key: zeroAdd, why: 'y'.repeat(20), lean: refusedText, reason: 'the kernel could not close 0 + n = n by rfl for a variable n' }],
  }, null, 2))
  assert.ok(waveQueueRefusedKeys(p).has(zeroAdd), 'the key still reads as refused for harvest-waiting')
  const again = depositCandidates([{ ...induct, lean: refusedText }], p)
  assert.equal(again.deposited.length, 0, 'the identical refused text stays refused')
  assert.match(again.refused[0]!.reason, /already refused this exact text/)
  const corrected = depositCandidates([induct], p)
  assert.deepEqual(corrected.deposited, [zeroAdd], 'a corrected proof under the same key is admitted to the probe')
  const q = JSON.parse(readFileSync(p, 'utf8')) as { pending: { lean: string }[]; refused: unknown[] }
  assert.deepEqual(q.pending.map((c) => c.lean), [induct.lean])
  assert.equal(q.refused.length, 1, 'the kernel\'s refusal row stays as it was')
  // once pending, the key is in flight — a second text under it waits for the verdict on the first
  assert.match(depositCandidates([{ ...induct, lean: induct.lean + ' ' }], p).refused[0]!.reason, /already pending or accepted/)
})

test('a refusal row is written only with its reason', () => {
  assert.equal(assertReason('k_key', ' the kernel said no '), 'the kernel said no')
  assert.throws(() => assertReason('k_key', ''), /must name its reason/)
  assert.throws(() => assertReason('k_key', undefined), /must name its reason/)
})

test('waveQueueInFlightKeys — pending and accepted keys, not refused', () => {
  const p = scratch()
  writeFileSync(p, JSON.stringify({
    pending: [{ key: 'pending_key', why: 'x'.repeat(20), lean: 'theorem pending_key : 1 = 1 := by decide' }],
    accepted: [{ key: 'accepted_key', why: 'y'.repeat(20), lean: 'theorem accepted_key : 1 = 1 := by decide', receipt: 'r' }],
    refused: [{ key: 'refused_key', why: 'z'.repeat(20), lean: 'theorem refused_key : 1 = 1 := by decide', reason: 'no' }],
  }, null, 2))
  const keys = waveQueueInFlightKeys(p)
  assert.ok(keys.has('pending_key'))
  assert.ok(keys.has('accepted_key'))
  assert.equal(keys.has('refused_key'), false)
})
