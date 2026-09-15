import { test } from 'node:test'
import assert from 'node:assert/strict'
import { trialAdmit } from './trial-gate.js'
import { toUuid } from './address.js'

// THE GATE READS THE PROOF FROM THE SEALED ROW. A row the kernel proved `by exact …` is admitted with that proof, and
// a candidate that claims a different proof than the sealed one is refused — the check that replaced a typed `decide`.
const row = (key: string, statement: string, tactic: string) =>
  ({ key, statement, file: 'Probe.lean', tactic, address: toUuid(key + ':' + statement), lean: `theorem ${key} : ${statement} := by ${tactic}` })

test('a sealed row is admitted with its own non-decide proof', () => {
  const r = row('probe_exact_x', '¬ lead_probe', 'exact fun h => h.1 rfl')
  const a = trialAdmit({ key: r.key, statement: r.statement, lean: r.lean, file: r.file }, [r] as never)
  assert.equal(a.admitted, true, a.detail)
})

test('CONTROL: a candidate claiming a proof the kernel did not seal is refused', () => {
  const r = row('probe_exact_y', '¬ lead_probe', 'exact fun h => h.1 rfl')
  const forged = `theorem ${r.key} : ${r.statement} := by decide`
  const a = trialAdmit({ key: r.key, statement: r.statement, lean: forged, file: r.file }, [r] as never)
  assert.equal(a.admitted, false)
  assert.equal(a.kind, 'seal-integrity')
})

// A NEW CANDIDATE (no sealed row) IS READ BY ITS OWN RECORDED TACTIC. Passing the proof-shape check lands it on
// `unverified` (no row admits it yet); failing it lands on `seal-integrity`.
const induction = 'intro n; induction n with | zero => rfl | succ k ih => exact congrArg Nat.succ ih'
const fresh = (tactic: string | undefined, proof: string) =>
  ({ key: 'probe_zero_add_left', statement: '∀ n : Nat, 0 + n = n', lean: `theorem probe_zero_add_left : ∀ n : Nat, 0 + n = n := by ${proof}`, file: 'Probe.lean', ...(tactic === undefined ? {} : { tactic }) })

test('a new candidate carrying its recorded non-decide tactic passes the proof-shape check', () => {
  const a = trialAdmit(fresh(induction, induction), [] as never)
  assert.equal(a.kind, 'unverified', a.detail)
})

test('CONTROL: a new candidate whose lean does not carry its recorded tactic is refused', () => {
  const a = trialAdmit(fresh(induction, 'decide'), [] as never)
  assert.equal(a.kind, 'seal-integrity')
  assert.match(a.detail, /not a `by intro n;/)
  // with no recorded tactic the candidate reads as decide, as a sealed row does
  assert.equal(trialAdmit(fresh(undefined, 'decide'), [] as never).kind, 'unverified')
  assert.equal(trialAdmit(fresh(undefined, induction), [] as never).kind, 'seal-integrity')
})

test('CONTROL: a decide row still needs its decide', () => {
  const r = row('probe_decide_z', '1 + 1 = 2', 'decide')
  assert.equal(trialAdmit({ key: r.key, statement: r.statement, lean: r.lean, file: r.file }, [r] as never).admitted, true)
  assert.equal(trialAdmit({ key: r.key, statement: r.statement, lean: `theorem ${r.key} : ${r.statement} := by rfl`, file: r.file }, [r] as never).admitted, false)
})
