// school — the eleven sections, computed rather than authored.
//
// The accreditation test is the one that matters. A school page implying credentials it does not hold would be the
// one overclaim this ledger could not survive, because everything else it publishes rests on its claims being
// checkable. So the position is asserted here, not left to a comment somebody may later soften.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { school, courses } from '../school.js'
import { theorems } from '../index.js'

test('all eleven sections are present, each with a body', () => {
  const s = school()
  assert.equal(s.sections.length, 11)
  for (const sec of s.sections) assert.ok(sec.body.length > 0, `${sec.id} is empty`)
  assert.equal(new Set(s.sections.map((x) => x.id)).size, 11, 'no duplicate section ids')
})

// ── THE BINDING CONSTRAINT.
test('accreditation states plainly that uuidna is NOT accredited', () => {
  const body = school().sections.find((s) => s.id === 'accreditation')!.body.join(' ')
  assert.match(body, /NOT an accredited institution/)
  assert.match(body, /no diploma, degree, credit or recognised qualification/)
  assert.ok(!/\baccredited by\b|\bcertified by\b|\bapproved by\b/i.test(body),
    'no phrasing may imply an accrediting body')
})

test('enrolment collects nothing and costs nothing', () => {
  const all = school().sections
  assert.match(all.find((s) => s.id === 'enrollment')!.body.join(' '), /No personal data is collected/)
  assert.match(all.find((s) => s.id === 'tuition')!.body.join(' '), /Free/)
})

// ── COMPUTED, NOT AUTHORED. A course is a wing; the lesson count is the theorems in it.
test('every wing is a course, and lessons sum to the ledger', () => {
  const cs = courses()
  const T = theorems()
  assert.equal(cs.length, new Set(T.map((t) => t.file)).size, 'one course per proof wing')
  assert.equal(cs.reduce((n, c) => n + c.lessons, 0), T.length, 'no lesson counted twice or lost')
  assert.equal(new Set(cs.map((c) => c.code)).size, cs.length, 'course codes must not collide')
})

// ── PROSE REPLACED BY READS. Eight of eleven sections were authored strings restating fields that already exist
// in package.json and CHANGELOG.md — a retyped field is a claim that cannot stay true, the same defect as a ledger
// count frozen into a comment. Only positions that are NOT measurements may stay authored.
test('most sections are computed, and the authored ones are positions rather than facts', () => {
  const s = school()
  const authored = s.sections.filter((x) => !x.computed).map((x) => x.id).sort()
  assert.deepEqual(authored, ['accreditation', 'enrollment', 'faq'],
    'a section may stay authored only if it states a position; anything readable from a source must be read')
  assert.ok(s.sections.filter((x) => x.computed).length >= 8)
})

test('the computed sections carry real values, not placeholders', () => {
  const body = (id: string): string => school().sections.find((x) => x.id === id)!.body.join(' ')
  assert.match(body('tuition'), /CC-BY-NC-ND/, 'the licence is read from the manifest')
  assert.match(body('technology'), /Node: >=/, 'the engine requirement is read, not remembered')
  assert.match(body('contact'), /github\.com/, 'contact points are read from the manifest')
  assert.match(body('calendar'), /Releases to date: \d+/, 'releases ARE the calendar')
  for (const id of ['tuition', 'technology', 'contact', 'calendar'])
    assert.ok(!/undefined|: $|NaN/.test(body(id)), `${id} has an unresolved field`)
})

test('the catalogue MOVES with the ledger — it is a reading, not a promise', () => {
  const before = school().receipt
  assert.equal(before, school().receipt, 'deterministic')
  assert.ok(before.length > 0)
})
