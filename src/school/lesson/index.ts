// school/lesson — LESSONS COMPOSED FROM THE LEDGER ROWS, AND THE ONE CHECK THAT GRADES THEM.
//
// A lesson is a sealed theorem as a person meets it: the name and doc comment the wing already wrote for people, the
// statement typeset as mathematics where formula.ts can, and — where the evaluator decides the statement — one
// "predict the value" exercise: one numeral blanked, the learner fills it, and the statement is re-evaluated with
// their value. The sealed theorem is the answer key. Nothing here is authored; every field is read off a row.
//
// Pure: the ledger rows and the wing sources are arguments, so the generator, the Worker and the tests share one
// composer. The evaluator is involution/index.ts — the same second implementation the falsifier leg uses.
import { holds, reDecide } from '../../involution/index.js'
import { typeset } from '../../formula.js'
import { toUuid } from '../../address.js'
import {
  CHECK_LABEL, fill, isAnswer, courseSlugOf,
  type Exercise, type Lesson, type CourseFile, type CourseSummary, type SchoolIndex,
} from './shape/index.js'

export * from './shape/index.js'

/** how many numerals, from the last backwards, are tried as the blank — a bound on generation cost (three evaluations
 *  each); the last numeral is usually the value a statement computes, so the first try is the one that teaches */
export const EXERCISE_CANDIDATES = 3

/** the evaluator's reading of a statement it has not seen before: uncached, so a learner's answers never grow the memo,
 *  and a throw is an undecided reading (the evaluator's diagnostic path reads a host global the edge lacks) */
const decided = (statement: string): boolean | null => {
  try { return reDecide(statement) } catch { return null }
}
/** the sealed statement itself, through the memo the falsifier cache seeds */
const decidedSealed = (statement: string): boolean | null => {
  try { return holds(statement) } catch { return null }
}

const isDigit = (c: string): boolean => c >= '0' && c <= '9'

/** numeralsOf(statement) → every standalone numeral, left to right. A digit run touching a letter, underscore, dot or
 *  prime is part of a name (`mul9`, `p.1`, `x'`), never a value, so it is skipped. */
export function numeralsOf(statement: string): { at: number; length: number }[] {
  const out: { at: number; length: number }[] = []
  let i = 0
  while (i < statement.length) {
    if (!isDigit(statement[i]!)) { i++; continue }
    let j = i
    while (j < statement.length && isDigit(statement[j]!)) j++
    const prev = i > 0 ? statement[i - 1]! : ''
    const next = j < statement.length ? statement[j]! : ''
    if (!/[A-Za-z0-9_.']/.test(prev) && !/[A-Za-z0-9_.]/.test(next)) out.push({ at: i, length: j - i })
    i = j
  }
  return out
}

/** exerciseOf(statement) → the one numeral to blank, or null when no exercise is offered.
 *
 *  OFFERED ONLY WHERE THE EVALUATOR DECIDES: the sealed statement must evaluate true, and the blank must DISCRIMINATE
 *  — the sealed value plus one, and minus one where it has one, must both evaluate false — so a blank any neighbour
 *  would also satisfy (`16 < 20`) is never offered as a question with one answer. String literals and comments are
 *  refused whole: their digits are text, and the evaluator strips them before reading. */
export function exerciseOf(statement: string): Exercise | null {
  if (statement.includes('"') || statement.includes('--')) return null
  if (decidedSealed(statement) !== true) return null
  const nums = numeralsOf(statement)
  for (let k = nums.length - 1, tried = 0; k >= 0 && tried < EXERCISE_CANDIDATES; k--, tried++) {
    const ex: Exercise = { kind: 'predict-the-value', at: nums[k]!.at, length: nums[k]!.length }
    const sealed = statement.slice(ex.at, ex.at + ex.length)
    if (!isAnswer(sealed)) continue
    const v = BigInt(sealed)
    if (decided(fill(statement, ex, String(v + 1n))) !== false) continue
    if (v > 0n && decided(fill(statement, ex, String(v - 1n))) !== false) continue
    return ex
  }
  return null
}

export type Verdict = 'correct' | 'incorrect' | 'undecided' | 'invalid'
export interface Check { verdict: Verdict; label: string; filled: string | null; why?: string }

/** checkAnswer(statement, exercise, answer) → the statement re-evaluated with the learner's numeral in the blank.
 *  Correct exactly when the evaluator reads the filled statement as true; an unreadable answer is `invalid` and an
 *  evaluation that returns no verdict is `undecided` — neither ever passes. */
export function checkAnswer(statement: string, ex: Exercise, answer: string): Check {
  if (!isAnswer(answer)) return { verdict: 'invalid', label: CHECK_LABEL, filled: null, why: 'an answer is a whole number written in digits, with no sign and no leading zero' }
  const filled = fill(statement, ex, answer)
  const v = decided(filled)
  return { verdict: v === true ? 'correct' : v === false ? 'incorrect' : 'undecided', label: CHECK_LABEL, filled }
}

/** sealedAddressOfRow(key, statement) → the address the ledger seals a theorem at (theorems/index.ts withDerived) */
export const sealedAddressOfRow = (key: string, statement: string): string => toUuid(key + ':' + statement)

/** whyOfLean(source) → each theorem's doc comment in a wing's Lean source, whitespace folded, keyed by theorem */
export function whyOfLean(source: string): Map<string, string> {
  const out = new Map<string, string>()
  for (const m of source.matchAll(/\/--([\s\S]*?)-\/\s*\n\s*theorem\s+([A-Za-z0-9_']+)/g)) {
    const text = (m[1] ?? '').replace(/\s+/g, ' ').trim()
    if (text) out.set(m[2]!, text)
  }
  return out
}

export interface LessonRow { key: string; name: string; statement: string; skill?: string; address?: string }

/** lessonOf(row, why) → one lesson, every field read from the row */
export function lessonOf(row: LessonRow, why: string | null): Lesson {
  const ts = typeset(row.statement)
  return {
    key: row.key, name: row.name, why, statement: row.statement,
    address: row.address ?? sealedAddressOfRow(row.key, row.statement),
    skill: row.skill ?? '',
    tex: ts.tex, mathml: ts.mathml,
    exercise: exerciseOf(row.statement),
  }
}

export interface CourseMeta { wing: string; title: string; principle: string; skills: string[]; level: number; band: string; rank: number }

/** composeCourse(meta, rows, whyOf) → a course file, lessons in the order the course gives them */
export function composeCourse(meta: CourseMeta, rows: readonly LessonRow[], whyOf: (key: string) => string | null): CourseFile {
  const lessons = rows.map((r) => lessonOf(r, whyOf(r.key)))
  return {
    kind: 'school-course', course: courseSlugOf(meta.wing), wing: meta.wing, title: meta.title, principle: meta.principle,
    skills: meta.skills, level: meta.level, band: meta.band, rank: meta.rank,
    lessons, exercises: lessons.filter((l) => l.exercise !== null).length,
  }
}

export const summaryOf = (c: CourseFile): CourseSummary => ({
  course: c.course, wing: c.wing, title: c.title, lessons: c.lessons.length, exercises: c.exercises, level: c.level, band: c.band, rank: c.rank,
})

/** composeIndex(summaries) → the catalogue, courses in reading order, both totals counted from the same array */
export const composeIndex = (summaries: readonly CourseSummary[]): SchoolIndex => {
  const courses = [...summaries].sort((a, b) => a.rank - b.rank)
  return {
    kind: 'school-index', courses,
    lessons: courses.reduce((n, c) => n + c.lessons, 0),
    exercises: courses.reduce((n, c) => n + c.exercises, 0),
    label: CHECK_LABEL,
  }
}

/** lessonIn(course, key) → the lesson a course serves under a key, or null */
export const lessonIn = (course: CourseFile, key: string): Lesson | null => course.lessons.find((l) => l.key === key) ?? null
