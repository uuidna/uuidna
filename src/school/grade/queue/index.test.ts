// school/grade/queue — the statement and name come from the lesson, the learner supplies only the proof block, and
// the kernel grades a right and a wrong proof end to end when `lean` is on this host.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { exerciseFromTemplate, lessonFile, proofBlock, type Exercise, type Probe } from '../proof/index.js'
import { gradeQueue, gradeSubmission } from './index.js'
import { kernelPresent, kernelProbe, leanEnv } from '../kernel/index.js'
import type { QueuedSubmission } from '../../submission/index.js'

const PLUS_ZERO: Exercise = { course: 'nat', lesson: 'plus-zero', theorem: 'plus_zero', statement: '∀ n : Nat, n + 0 = n' }
const q = (lean: string, at = 'a1'): QueuedSubmission => ({ submittedAddress: at, course: 'nat', lesson: 'plus-zero', lean })

test('the statement and name come from the lesson; the learner supplies only the proof block', () => {
  assert.deepEqual(exerciseFromTemplate('nat', 'plus-zero', 'theorem plus_zero : ∀ n : Nat, n + 0 = n := by\n  sorry'), PLUS_ZERO)
  assert.equal(exerciseFromTemplate('nat', 'x', 'def x := 1'), null)
  assert.equal(lessonFile(PLUS_ZERO, '\n    intro n\n    rfl\n'), 'theorem plus_zero : ∀ n : Nat, n + 0 = n := by (\n  intro n\n  rfl\n)')
  assert.deepEqual(proofBlock('theorem plus_zero : ∀ n : Nat, n + 0 = n := by\r\n  rfl'), { header: { theorem: 'plus_zero', statement: '∀ n : Nat, n + 0 = n' }, proof: '\n  rfl' })
  let asked = 0
  const stub: Probe = () => { asked++; return { reason: null, axioms: [] } }
  assert.equal(gradeSubmission(q('sorry'), PLUS_ZERO, stub).verdict, 'door-refused')
  assert.equal(gradeSubmission(q('theorem plus_zero : ∀ n : Nat, n + 0 = n + 0 := by rfl'), PLUS_ZERO, stub).verdict, 'door-refused', 'a changed statement')
  assert.equal(gradeSubmission(q('theorem other : ∀ n : Nat, n + 0 = n := by rfl'), PLUS_ZERO, stub).verdict, 'door-refused', 'a changed name')
  assert.equal(asked, 0, 'a door refusal never reaches the kernel')
  assert.equal(gradeSubmission(q('theorem plus_zero :  ∀ n : Nat,\n n + 0 = n := by\n  intro n\n  rfl'), PLUS_ZERO, stub).verdict, 'kernel-accepted', 'the whole exercise with the hole filled')
  assert.deepEqual(gradeSubmission(q('rfl'), PLUS_ZERO, () => ({ reason: 'type mismatch', axioms: null })),
    { submittedAddress: 'a1', verdict: 'kernel-refused', reason: 'type mismatch', axioms: null })
})

test('the kernel runs with only the variables lean needs', () => {
  assert.deepEqual(leanEnv({ PATH: '/bin', HOME: '/h', GITHUB_TOKEN: 't', ACTIONS_ID_TOKEN_REQUEST_TOKEN: 'x', ACTIONS_RUNTIME_TOKEN: 'y' }), { PATH: '/bin', HOME: '/h' })
})

test('END TO END through the kernel probe: a right proof is kernel-accepted with no axioms, a wrong one kernel-refused', { skip: !kernelPresent() && 'lean is not on PATH on this host' }, () => {
  const TRUE_ONE: Exercise = { course: 'logic', lesson: 'true', theorem: 'true_holds', statement: 'True' }
  const exercises: Record<string, Exercise> = { 'nat/plus-zero': PLUS_ZERO, 'logic/true': TRUE_ONE }
  const dir = mkdtempSync(join(tmpdir(), 'uuidna-grade-test-'))
  try {
    const run = gradeQueue([
      q('intro n\nrfl', 'right'),
      q('exact Nat.le_refl 3', 'wrong'),
      q('theorem plus_zero : ∀ n : Nat, n + 0 = n := by\n  intro n\n  rfl', 'whole'),
      { submittedAddress: 'axiom', course: 'logic', lesson: 'true', lean: 'exact (propext (Iff.refl True)) ▸ trivial' },
      q('rfl\n#eval 1', 'door'),
      { submittedAddress: 'void', course: 'nat', lesson: 'missing', lean: 'rfl' },
      { nonsense: true },
    ], (c, l) => exercises[`${c}/${l}`] ?? null, kernelProbe(dir))
    const by = (a: string) => run.verdicts.find((v) => v.submittedAddress === a)!
    assert.deepEqual(by('right'), { submittedAddress: 'right', verdict: 'kernel-accepted', reason: 'the kernel accepted plus_zero and it depends on no axioms', axioms: [] })
    assert.equal(by('whole').verdict, 'kernel-accepted')
    assert.equal(by('wrong').verdict, 'kernel-refused')
    assert.match(by('wrong').reason, /mismatch|error/i)
    assert.ok(!by('wrong').reason.includes(dir), 'the refusal names no host path')
    assert.equal(by('axiom').verdict, 'kernel-refused')
    assert.deepEqual(by('axiom').axioms, ['propext'])
    assert.equal(by('door').verdict, 'door-refused')
    assert.deepEqual(run.void.map((v) => v.submittedAddress), ['void', null])
  } finally { rmSync(dir, { recursive: true, force: true }) }
})
