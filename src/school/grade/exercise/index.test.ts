// school/grade/exercise — the grader proves exactly the statement the learner's lesson shows, pinned to its seal: a
// served lesson resolves to its template's exercise, and a tampered statement, an unknown lesson or a malformed course
// id resolves to nothing (VOID, never a grade).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { theorems, sealedAddressOf } from '../../../theorems/index.js'
import { composeCourse, proofExerciseOf, type CourseFile } from '../../lesson/index.js'
import { exerciseIn, exerciseOfCourses } from './index.js'

const rows = theorems().filter((t) => t.file === 'Core.lean').slice(0, 2)
const course: CourseFile = composeCourse({ wing: 'Core.lean', title: 'Core', principle: rows[0]!.principle, skills: [], level: 0, band: '', rank: 1 }, rows, () => null)
const sealed = (key: string): string | null => sealedAddressOf(key) ?? null

test('a served lesson resolves to the statement and name its learner template fixes', () => {
  const l = course.lessons[0]!
  const ex = exerciseIn(course, l.key, sealed)
  assert.deepEqual(ex, { course: 'Core', lesson: l.key, theorem: l.key, statement: l.statement })
  assert.ok(proofExerciseOf('Core', l).template.startsWith(`theorem ${ex!.theorem} : ${ex!.statement} := by`), 'the grader proves what the learner saw')
  const of = exerciseOfCourses((c) => (c === 'Core' ? course : null), sealed)
  assert.deepEqual(of('Core', l.key), ex)
})

test('a statement that does not address to its seal, an unknown lesson or course, or a malformed id is VOID', () => {
  const l = course.lessons[0]!
  const tampered: CourseFile = { ...course, lessons: [{ ...l, statement: l.statement + ' ∧ True' }] }
  assert.equal(exerciseIn(tampered, l.key, sealed), null, 'the served statement must address to the sealed one')
  assert.equal(exerciseIn(course, 'no_such_lesson', sealed), null)
  assert.equal(exerciseIn(null, l.key, sealed), null)
  assert.equal(exerciseIn(course, l.key, () => null), null, 'a key the ledger does not seal')
  let read = 0
  const of = exerciseOfCourses(() => { read++; return course }, sealed)
  assert.equal(of('../Core', l.key), null)
  assert.equal(read, 0, 'a malformed course id never reaches the file system')
})
