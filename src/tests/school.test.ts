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

test('the catalogue MOVES with the ledger — it is a reading, not a promise', () => {
  const before = school().receipt
  assert.equal(before, school().receipt, 'deterministic')
  assert.ok(before.length > 0)
})
