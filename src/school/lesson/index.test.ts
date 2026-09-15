// school/lesson — the composer and the checker, both directions: a right value passes, a wrong one fails, and a
// statement outside the evaluator's grammar is never offered as an exercise.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../../boundary.js'
import { theorems } from '../../theorems/index.js'
import { holds, evaluable } from '../../involution/index.js'
import {
  numeralsOf, exerciseOf, checkAnswer, lessonOf, composeCourse, composeIndex, summaryOf, whyOfLean, fill, splitAt,
  isAnswer, proofExerciseOf, courseSlugOf, CHECK_LABEL, type CourseFile, type SchoolIndex,
} from './index.js'

const core = theorems().filter((t) => t.file === 'Core.lean')

test('numeralsOf skips digits that belong to a name, a projection or a prime', () => {
  const s = '(mul9 2 p.1 x1) % 9 = 10'
  const got = numeralsOf(s).map((n) => s.slice(n.at, n.at + n.length))
  assert.deepEqual(got, ['2', '9', '10'])
})

test('a right value passes and a wrong value fails — the sealed theorem is the answer key', () => {
  const s = '(2 * 5) % 9 = 1'
  const ex = exerciseOf(s)
  assert.ok(ex, 'a decidable arithmetic statement carries an exercise')
  assert.equal(splitAt(s, ex).blank, '1', 'the blank is the value the statement computes')
  assert.equal(checkAnswer(s, ex, '1').verdict, 'correct')
  assert.equal(checkAnswer(s, ex, '2').verdict, 'incorrect')
  assert.equal(checkAnswer(s, ex, '0').verdict, 'incorrect')
  assert.equal(checkAnswer(s, ex, '1').label, CHECK_LABEL)
  assert.match(CHECK_LABEL, /not a proof by the Lean kernel/)
})

test('an unreadable answer is invalid and never passes', () => {
  const ex = exerciseOf('(2 * 5) % 9 = 1')!
  for (const bad of ['', '01', '-1', '1.0', 'one', '1 ', '9'.repeat(41)]) {
    assert.equal(isAnswer(bad), false, bad)
    assert.equal(checkAnswer('(2 * 5) % 9 = 1', ex, bad).verdict, 'invalid', bad)
  }
})

test('a blank any neighbour also satisfies is never offered', () => {
  assert.equal(exerciseOf('16 < 20'), null, 'both 16 and 20 have neighbours that keep the statement true')
})

test('a statement outside the evaluator, or one it reads false, is never offered', () => {
  assert.equal(exerciseOf('2 + 2 = 5'), null, 'a false statement is not a sealed answer key')
  assert.equal(exerciseOf('∀ n : Nat, n + 0 = n'), null, 'an unbounded quantifier is outside the evaluator')
  assert.equal(exerciseOf('"7".length = 1'), null, 'digits inside a string literal are text')
  // over the live ledger: a sample of statements the evaluator does not reach carries no exercise
  const unreached = theorems().filter((t) => !evaluable(t.statement)).slice(0, 60)
  assert.ok(unreached.length > 0, 'the control needs statements outside the evaluator')
  for (const t of unreached) assert.equal(exerciseOf(t.statement), null, t.key)
})

test('every exercise of a live course discriminates in both directions', () => {
  const course = composeCourse({ wing: 'Core.lean', title: 'Core', principle: core[0]!.principle, skills: [], level: 0, band: 'unmeasured', rank: 1 }, core, () => null)
  assert.ok(course.exercises > 0, 'the 8×8 core is decidable arithmetic')
  for (const l of course.lessons) {
    if (!l.exercise) continue
    assert.equal(holds(l.statement), true, `${l.key}: an exercise is offered only on a statement the evaluator reads true`)
    const sealed = splitAt(l.statement, l.exercise).blank
    assert.equal(checkAnswer(l.statement, l.exercise, sealed).verdict, 'correct', l.key)
    assert.equal(checkAnswer(l.statement, l.exercise, String(BigInt(sealed) + 1n)).verdict, 'incorrect', l.key)
    assert.equal(fill(l.statement, l.exercise, sealed), l.statement)
  }
})

test('a lesson is read off its row: the address is the sealed one, the name is the wing\'s own words', () => {
  const t = core[0]!
  const l = lessonOf(t, 'the doc comment')
  assert.equal(l.address, t.address, 'toUuid(key + ":" + statement) is the address the ledger seals')
  assert.equal(l.name, t.name)
  assert.equal(l.why, 'the doc comment')
  assert.ok(l.mathml && l.tex, 'arithmetic typesets through formula.ts')
  assert.equal(lessonOf({ key: t.key, name: t.name, statement: t.statement }, null).address, t.address, 'recomputed from key and statement alone')
  assert.notEqual(lessonOf({ key: t.key, name: t.name, statement: t.statement.replace(/1$/, '2') }, null).address, t.address, 'a changed statement changes the address')
})

test('whyOfLean reads each theorem\'s doc comment from a wing source', () => {
  const src = '/-- The first\n   fact. -/\ntheorem a_b : 1 = 1 := by decide\n\ntheorem bare : 2 = 2 := by decide\n/-- Second. -/\ntheorem c : 3 = 3 := by decide'
  const why = whyOfLean(src)
  assert.equal(why.get('a_b'), 'The first fact.')
  assert.equal(why.get('c'), 'Second.')
  assert.equal(why.has('bare'), false)
})

test('the catalogue counts from the same array it lists, in reading order', () => {
  const mk = (rank: number, lessons: number, exercises: number) => ({ course: `C${rank}`, wing: `C${rank}.lean`, title: '', lessons, exercises, level: 0, band: '', rank })
  const idx = composeIndex([mk(2, 5, 1), mk(1, 3, 3)])
  assert.deepEqual(idx.courses.map((c) => c.rank), [1, 2])
  assert.equal(idx.lessons, 8)
  assert.equal(idx.exercises, 4)
})

test('the proof exercise is the lesson\'s own Lean line with a sorry hole', () => {
  const p = proofExerciseOf('Core', core[0]!)
  assert.equal(p.template, `theorem ${core[0]!.key} : ${core[0]!.statement} := by\n  sorry`)
  assert.equal(courseSlugOf('HexSpan11.lean'), 'HexSpan11')
})

// THE SERVED FILES AGREE WITH THE COMPOSER — read back from disk, a second surface: the catalogue's totals are
// recounted from the per-course files, and a sampled course is recomposed from the live ledger and compared whole.
test('the served catalogue agrees with its course files and with the composer', { skip: !existsSync(join(ROOT, 'docs', 'public', 'school', 'index.json')) }, () => {
  const dir = join(ROOT, 'docs', 'public', 'school')
  const index = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8')) as SchoolIndex
  const files = readdirSync(dir).filter((f) => f !== 'index.json' && f.endsWith('.json'))
  assert.equal(files.length, index.courses.length, 'one file per listed course')
  let lessons = 0, exercises = 0
  for (const f of files) {
    const c = JSON.parse(readFileSync(join(dir, f), 'utf8')) as CourseFile
    lessons += c.lessons.length
    exercises += c.lessons.filter((l) => l.exercise).length
    assert.deepEqual(summaryOf(c), index.courses.find((s) => s.course === c.course), c.course)
  }
  assert.equal(lessons, index.lessons)
  assert.equal(exercises, index.exercises)
  assert.equal(lessons, theorems().length, 'every sealed theorem is a lesson')
  const served = JSON.parse(readFileSync(join(dir, 'Core.json'), 'utf8')) as CourseFile
  const rows = served.lessons.map((l) => core.find((t) => t.key === l.key)!)
  const again = composeCourse(served, rows, (k) => served.lessons.find((l) => l.key === k)!.why)
  assert.deepEqual(again.lessons, served.lessons, 'the Core course recomposes byte for byte from the ledger')
})
