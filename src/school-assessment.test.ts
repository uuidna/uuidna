import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ASSESSMENT,
  UNDECIDABLE_AREAS,
  cohortVacuity,
  multiAnswerCriteria,
  type Criterion,
} from './school-assessment.js'
import { LEARNING_AREAS } from './school-areas.js'

test('the four dimensions each name a leg, and none is self-certifiable', () => {
  assert.deepEqual(ASSESSMENT.map((d) => d.name), ['Making', 'Understanding', 'Reflecting', 'Encountering'])
  assert.deepEqual(ASSESSMENT.map((d) => d.leg), ['address', 'proof', 'falsifier', 'witness'])
  for (const d of ASSESSMENT) {
    assert.equal(d.selfCertifiable, false, `${d.name} must not be certifiable by one party`)
    assert.ok(d.fails.length > 10, `${d.name} must say what a failure looks like`)
  }
})

// A DIMENSION THAT CANNOT FAIL IS THE DEFECT THIS WHOLE FILE IS ABOUT, so each one states its own failure shape.
test('every dimension states a failure shape distinct from its evidence', () => {
  for (const d of ASSESSMENT) assert.notEqual(d.fails, d.evidence)
})

test('the undecidable areas are real areas of the captain\'s architecture', () => {
  const ns = new Set(LEARNING_AREAS.map((a) => a.n))
  for (const n of UNDECIDABLE_AREAS) assert.ok(ns.has(n), `area ${n} exists`)
  assert.equal(UNDECIDABLE_AREAS.length, 4)
})

// x % 9 = 4 passes the school's own ±1 discrimination guard and is satisfied by 4, 13, 22, 31 … — offered as a
// one-answer question and having many.
test('multiAnswerCriteria finds the congruence the neighbour test lets through', () => {
  const criteria: Criterion[] = [
    { course: 'c', lesson: 'l', theorem: 'congruence', statement: 'x % 9 = 4' },
    { course: 'c', lesson: 'm', theorem: 'product', statement: 'x * 6 = 42' },
  ]
  const sealedOf = (c: Criterion) => (c.theorem === 'congruence' ? '4' : '7')
  const satisfies = (c: Criterion, v: string) =>
    c.theorem === 'congruence' ? Number(v) % 9 === 4 : Number(v) * 6 === 42
  const found = multiAnswerCriteria(criteria, sealedOf, satisfies)
  assert.equal(found.length, 1, 'the product has one answer; the congruence has many')
  assert.equal(found[0]!.theorem, 'congruence')
  assert.ok(found[0]!.also.includes('13'))
  assert.equal(found[0]!.sealed, '4')
})

// "NONE FOUND" IS NOT "NONE EXISTS", so the bound swept is carried in the result.
test('multiAnswerCriteria reports the window it swept', () => {
  const found = multiAnswerCriteria(
    [{ course: 'c', lesson: 'l', theorem: 'wide', statement: 'x > 2' }],
    () => '5',
    (_c, v) => Number(v) > 2,
  )
  assert.equal(found[0]!.below, '42', 'twice the answer plus a margin, derived from the answer itself')
})

test('multiAnswerCriteria skips a criterion whose answer it cannot read', () => {
  const found = multiAnswerCriteria(
    [{ course: 'c', lesson: 'l', theorem: 'no-key', statement: 'x = 1' }],
    () => null,
    () => true,
  )
  assert.deepEqual(found, [])
})

// THE POINT OF THE WHOLE AUDIT: an empty cohort must report that it did not run.
test('cohortVacuity over no verdicts reports NOT READ, never health', () => {
  const v = cohortVacuity([])
  assert.equal(v.criteria, null, 'null is "not read" — a count of 0 would read as a clean audit')
  assert.equal(v.verdicts, 0)
  assert.deepEqual(v.neverFailed, [])
  assert.deepEqual(v.neverHeld, [])
})

test('cohortVacuity names a criterion nobody fails and one nobody meets', () => {
  const v = cohortVacuity([
    { theorem: 'everyone-passes', held: true },
    { theorem: 'everyone-passes', held: true },
    { theorem: 'nobody-passes', held: false },
    { theorem: 'nobody-passes', held: false },
    { theorem: 'discriminates', held: true },
    { theorem: 'discriminates', held: false },
  ])
  assert.equal(v.criteria, 3)
  assert.equal(v.verdicts, 6)
  assert.deepEqual(v.neverFailed, ['everyone-passes'])
  assert.deepEqual(v.neverHeld, ['nobody-passes'])
})

// BOTH ENDS, because they are defects with different causes and an audit reporting only one would hide the other.
test('a criterion that discriminates appears in neither list', () => {
  const v = cohortVacuity([
    { theorem: 'fair', held: true },
    { theorem: 'fair', held: false },
  ])
  assert.deepEqual(v.neverFailed, [])
  assert.deepEqual(v.neverHeld, [])
})

test('multiAnswerCriteria stops after a handful of extra answers rather than sweeping on', () => {
  const found = multiAnswerCriteria(
    [{ course: 'c', lesson: 'l', theorem: 'always', statement: 'anything' }],
    () => '9',
    () => true,
  )
  assert.equal(found.length, 1)
  assert.equal(found[0]!.also.length, 8, 'a bounded report: eight witnesses are enough to condemn the question')
})
