// school/grade/exercise — the one seam where the grader reads a lesson's fixed statement. The statement comes from
// the served course file in the checked-out tree the workflow runs on (docs/public/school/<course>.json, written by
// gen-school-lessons from the ledger rows), never from the queue listing, so neither the store nor the learner can
// change what is being proved. The lesson's statement is pinned to its seal before it is used, and the exercise is the
// learner's own template (lesson/shape proofExerciseOf) read back, so the grader proves exactly what the learner saw.
// An exercise this resolves to null is VOID for the run — the submission stays queued and no verdict is written,
// because a grade without a statement carries no information about the proof.
import { COURSE, LESSON, proofExerciseOf, type CourseFile } from '../../lesson/shape/index.js'
import { toUuid } from '../../../address.js'
import { exerciseFromTemplate, type Exercise } from '../proof/index.js'

export type ExerciseOf = (course: string, lesson: string) => Exercise | null

/** exerciseIn(file, key, sealedOf) → the proof exercise the served course fixes for one lesson, or null when the
 *  course serves no such lesson or its statement does not address to the sealed address (toUuid(key + ':' + statement)) */
export function exerciseIn(file: CourseFile | null, key: string, sealedOf: (key: string) => string | null): Exercise | null {
  if (!file || file.kind !== 'school-course' || !LESSON.test(key)) return null
  const lesson = file.lessons.find((l) => l.key === key)
  if (!lesson) return null
  const sealed = sealedOf(key)
  if (!sealed || toUuid(key + ':' + lesson.statement) !== sealed) return null
  const ex = exerciseFromTemplate(file.course, key, proofExerciseOf(file.course, lesson).template)
  return ex && ex.theorem === key && ex.statement === lesson.statement.trim() ? ex : null
}

/** exerciseOfCourses(read, sealedOf) → the grader's ExerciseOf over the served courses: read(course) returns the
 *  course file for a well-formed course id, or null */
export const exerciseOfCourses = (read: (course: string) => CourseFile | null, sealedOf: (key: string) => string | null): ExerciseOf =>
  (course, lesson) => (COURSE.test(course) ? exerciseIn(read(course), lesson, sealedOf) : null)
