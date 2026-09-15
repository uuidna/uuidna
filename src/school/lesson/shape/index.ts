// school/lesson/shape — the served lesson's shape and the pieces a browser may compute, with NO imports.
//
// The browser imports this file and nothing that reaches the ledger: the evaluator imports theorems/index.js, whose
// '#ledger' condition resolves to the 23 MB row module on every surface but the Worker, so a client chunk that
// imported it would carry the whole ledger. Grading therefore happens on the Worker (routes/index.ts) with the
// evaluator; this file only splits a statement around its blank and names what a check is.

/** what an instant check is, said wherever a verdict is shown — an evaluator's reading, never a kernel proof */
export const CHECK_LABEL = "checked against the sealed theorem by the repository's evaluator — a recomputation, not a proof by the Lean kernel"

/** a "predict the value" exercise: the numeral at [at, at + length) of the sealed statement is blanked */
export interface Exercise { kind: 'predict-the-value'; at: number; length: number }

/** one lesson: the theorem's own words for people, its statement (typeset where formula.ts can), and its exercise */
export interface Lesson {
  key: string
  name: string
  /** the doc comment the wing wrote above this theorem, or null where the wing wrote none */
  why: string | null
  statement: string
  /** the sealed address, toUuid(key + ':' + statement) — what the Worker pins a served statement against */
  address: string
  skill: string
  tex: string | null
  mathml: string | null
  exercise: Exercise | null
}

/** one course = one proof wing, as served at /school/<course>.json */
export interface CourseFile {
  kind: 'school-course'
  course: string
  wing: string
  title: string
  principle: string
  skills: string[]
  level: number
  band: string
  rank: number
  lessons: Lesson[]
  /** how many lessons carry an instantly checked exercise — the mastery denominator */
  exercises: number
}

export interface CourseSummary { course: string; wing: string; title: string; lessons: number; exercises: number; level: number; band: string; rank: number }

/** the catalogue, as served at /school/index.json */
export interface SchoolIndex {
  kind: 'school-index'
  courses: CourseSummary[]
  lessons: number
  exercises: number
  label: string
}

/** courseSlugOf(wing) → the course id: the wing's file name without `.lean` — unique because file names are */
export const courseSlugOf = (wing: string): string => wing.replace(/\.lean$/, '')

/** a course id is a wing file name: letters, digits and underscores, starting with a letter */
export const COURSE = /^[A-Za-z][A-Za-z0-9_]*$/
/** a lesson id is a theorem key */
export const LESSON = /^[A-Za-z0-9_']+$/

/** the widest answer accepted: a request-size bound, wider than any numeral the ledger's exercises blank */
export const ANSWER_DIGITS_MAX = 40
/** a numeral in canonical form — no sign, no leading zero — so one value has one spelling and one digest */
export const isAnswer = (answer: string): boolean =>
  answer.length <= ANSWER_DIGITS_MAX && /^(0|[1-9][0-9]*)$/.test(answer)

/** splitAt(statement, exercise) → the text before the blank, the sealed numeral, and the text after */
export const splitAt = (statement: string, ex: Exercise): { before: string; blank: string; after: string } => ({
  before: statement.slice(0, ex.at),
  blank: statement.slice(ex.at, ex.at + ex.length),
  after: statement.slice(ex.at + ex.length),
})

/** fill(statement, exercise, answer) → the statement with the learner's numeral in the blank */
export const fill = (statement: string, ex: Exercise, answer: string): string => {
  const s = splitAt(statement, ex)
  return s.before + answer + s.after
}

/** THE SEAM FOR THE KERNEL GRADER: a proof exercise is the lesson's own Lean line with `sorry` where the proof goes.
 *  The learner replaces `sorry`; the grader (a separate GitHub Actions job) compiles the submission and posts a verdict. */
export interface ProofExercise { kind: 'prove-it'; course: string; lesson: string; statement: string; template: string; hole: 'sorry' }
export const proofExerciseOf = (course: string, lesson: { key: string; statement: string }): ProofExercise => ({
  kind: 'prove-it', course, lesson: lesson.key, statement: lesson.statement,
  template: `theorem ${lesson.key} : ${lesson.statement} := by\n  sorry`, hole: 'sorry',
})
