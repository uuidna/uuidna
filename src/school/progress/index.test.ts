// school/progress — identity, mastery, the rate limit, the certificate seal and the submission seam, both directions.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'
import { SEALED_BY } from '../../refusal-trials.js'
import { theorems } from '../../theorems/index.js'
import { composeCourse, checkAnswer, lessonIn } from '../lesson/index.js'
import {
  learnerHandleOf, learnerKeyOf, lockOf, attemptOf, attemptHolds, emptyProgress, recordAttempt, masteryOf, progressView,
  rateStep, RATE_LIMIT, RATE_WINDOW_MS, certificateBodyOf, sealCertificate, verifyCertificate, CERTIFICATE_TEXT,
  type Progress, type AttemptVerdict,
} from './index.js'
import { submissionOf, QUEUED, LEAN_BYTES_MAX } from '../submission/index.js'

const rows = theorems().filter((t) => t.file === 'Core.lean').slice(0, 3)
const course = composeCourse({ wing: 'Core.lean', title: 'Core', principle: rows[0]!.principle, skills: [], level: 0, band: '', rank: 1 }, rows, () => null)
const recheck = (key: string, answer: string): AttemptVerdict => {
  const l = lessonIn(course, key)
  return l?.exercise ? checkAnswer(l.statement, l.exercise, answer).verdict : 'undecided'
}
const sealedOf = (l: (typeof course.lessons)[number]): string => l.statement.slice(l.exercise!.at, l.exercise!.at + l.exercise!.length)

test('a learner handle is the owner\'s derivation: handleOf(toUuid("learner:" + passphrase))', () => {
  const p = 'correct horse battery staple'
  assert.equal(learnerHandleOf(p), handleOf(toUuid('learner:' + p)))
  assert.match(learnerHandleOf(p), /^[0-9a-f]{8}$/)
  assert.notEqual(learnerHandleOf(p), learnerHandleOf(p + '!'))
  assert.notEqual(lockOf(learnerKeyOf(p)), learnerKeyOf(p), 'the Worker stores a digest of the key, never the key')
})

test('mastery is lessons passed over lessons with exercises, and a pass stays a pass', () => {
  assert.equal(course.exercises, 3, 'the three core facts each carry an exercise')
  const [a, b, c] = course.lessons
  let p: Progress = emptyProgress('0badc0de', 'lock')
  p = recordAttempt(p, attemptOf('Core', a!.key, a!.address, sealedOf(a!), 'correct'), 3)
  p = recordAttempt(p, attemptOf('Core', b!.key, b!.address, '5', 'incorrect'), 3)
  assert.deepEqual(masteryOf(p, 'Core'), { course: 'Core', passed: 1, of: 3, mastered: false, certificate: null })
  p = recordAttempt(p, attemptOf('Core', b!.key, b!.address, sealedOf(b!), 'correct'), 3)
  p = recordAttempt(p, attemptOf('Core', c!.key, c!.address, sealedOf(c!), 'correct'), 3)
  p = recordAttempt(p, attemptOf('Core', a!.key, a!.address, '8', 'incorrect'), 3)
  assert.equal(masteryOf(p, 'Core').mastered, true, 'a later wrong answer does not un-pass a lesson')
  assert.equal(p.courses.Core!.lessons[a!.key]!.attempts, 2)
  assert.equal(masteryOf(p, 'Core', [...course.lessons.map((l) => l.key), 'a_new_exercise']).mastered, false, 'a new exercise in the current file reopens mastery')
  assert.equal(progressView(p).courses[0]!.passed, 3)
  assert.equal('lock' in progressView(p), false, 'the lock is never served')
})

test('the attempt receipt recomputes, and a changed field breaks it', () => {
  const a = attemptOf('Core', 'k', 'addr', '1', 'correct')
  assert.equal(attemptHolds(a), true)
  assert.equal(attemptHolds({ ...a, answer: '2' }), false)
  assert.equal(attemptHolds({ ...a, verdict: 'incorrect' }), false)
})

test('the rate limit admits RATE_LIMIT attempts per window and resets with the next window', () => {
  let p = emptyProgress('0badc0de', 'lock')
  const now = 7 * RATE_WINDOW_MS + 5
  for (let i = 0; i < RATE_LIMIT; i++) { const r = rateStep(p, now + i); assert.equal(r.allowed, true); p = { ...p, rate: r.rate } }
  assert.equal(rateStep(p, now + RATE_LIMIT).allowed, false)
  assert.equal(rateStep(p, now + RATE_WINDOW_MS).allowed, true)
})

const mastered = (): Progress => {
  let p = emptyProgress(learnerHandleOf('a learner passphrase'), lockOf(learnerKeyOf('a learner passphrase')))
  for (const l of course.lessons) p = recordAttempt(p, attemptOf('Core', l.key, l.address, sealedOf(l), 'correct'), course.exercises)
  return p
}
const stored = (): Record<string, unknown> => {
  const cb = certificateBodyOf(mastered(), course)
  assert.ok(cb.ok)
  const s = sealCertificate(cb.body)
  return { ...cb.body, [SEALED_BY]: { signed: s.signed, of: s.of, seal: s.seal, witnesses: s.witnesses } }
}

test('a certificate is issued only when every exercise is passed', () => {
  const p = recordAttempt(emptyProgress('0badc0de', 'lock'), attemptOf('Core', course.lessons[0]!.key, course.lessons[0]!.address, sealedOf(course.lessons[0]!), 'correct'), 3)
  const cb = certificateBodyOf(p, course)
  assert.equal(cb.ok, false)
  assert.equal(cb.ok ? 0 : cb.missing.length, 2)
})

test('the certificate seal recomputes, and every changed field fails it', () => {
  const cb = certificateBodyOf(mastered(), course)
  assert.ok(cb.ok)
  const seal = sealCertificate(cb.body)
  assert.equal(seal.legal, true, 'signed by all 2×7 faces')
  assert.equal(cb.body.text, CERTIFICATE_TEXT)
  assert.match(CERTIFICATE_TEXT, /not an accredited qualification/)
  const good = stored()
  const v = verifyCertificate(seal.address, good, course, recheck)
  assert.equal(v.holds, true, v.checks.filter((c) => !c.holds).map((c) => c.name).join(', '))

  const attempts = (good.attempts as { answer: string }[])
  const forged: Record<string, Record<string, unknown>> = {
    'the handle': { ...good, handle: 'deadbeef' },
    'an answer': { ...good, attempts: [{ ...attempts[0], answer: '2' }, ...attempts.slice(1)] },
    'the text': { ...good, text: 'An accredited degree.' },
    'the seal': { ...good, [SEALED_BY]: { ...(good[SEALED_BY] as object), seal: '00000000-0000-8000-8000-000000000000' } },
  }
  for (const [what, doc] of Object.entries(forged)) assert.equal(verifyCertificate(seal.address, doc, course, recheck).holds, false, `a changed ${what} must fail`)
  assert.equal(verifyCertificate(seal.address, good, null, recheck).holds, false, 'a course no longer served leaves the answers unchecked, so the certificate fails')
})

test('a submission must prove the sealed statement verbatim, with the sorry hole filled', () => {
  const t = rows[0]!
  const proof = `theorem ${t.key} : ${t.statement} := by decide`
  const ok = submissionOf('0badc0de', 'Core', t, proof)
  assert.ok(ok.ok)
  assert.equal(ok.ok && ok.submission.status, QUEUED)
  assert.equal(ok.ok && ok.submission.submittedAddress, submissionOf('0badc0de', 'Core', t, proof).ok && (submissionOf('0badc0de', 'Core', t, proof) as { submission: { submittedAddress: string } }).submission.submittedAddress)
  assert.equal(submissionOf('0badc0de', 'Core', t, `theorem ${t.key} : ${t.statement} := by\n  sorry`).ok, false, 'sorry left in place')
  assert.equal(submissionOf('0badc0de', 'Core', t, `theorem ${t.key} : True := by trivial`).ok, false, 'a weaker statement under the same name')
  assert.equal(submissionOf('0badc0de', 'Core', t, proof + ' '.repeat(LEAN_BYTES_MAX)).ok, false, 'over the size bound')
})
