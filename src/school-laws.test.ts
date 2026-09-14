// school-laws — every standing law enrolls at school, so an agent that studies the school meets every law it is held to.
// The page is held to laws() EXACTLY: a law missing from /school, a stale holds state, or a hand edit is red.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './boundary.js'
import { laws } from './laws.js'
import { renderSchoolLaws, LAWS_START, LAWS_END } from './school/laws/index.js'
import { pageSafe } from './quantum/advantage/page/safe/index.js'

test('every law renders with its words, its gate and its computed state', () => {
  const L = laws()
  const md = renderSchoolLaws(L)
  assert.ok(L.laws.length > 0)
  for (const l of L.laws) {
    assert.ok(md.includes(pageSafe(l.law)), `law enrolls: ${l.law.slice(0, 60)}`)
    assert.ok(md.includes(pageSafe(l.enforcedBy)), `its gate is named: ${l.enforcedBy}`)
    if (l.said) assert.ok(md.includes(pageSafe(l.said)), 'the captain\'s words travel with the law')
  }
  assert.match(md, new RegExp(`\\*\\*${L.laws.length} laws\\*\\*`))
  // CONTROL: a law dropped from the set is absent from the render — the check can fail
  const dropped = L.laws[0]!
  assert.ok(!renderSchoolLaws({ ...L, laws: L.laws.slice(1) }).includes(pageSafe(dropped.law)))
})

test('a law that does not hold is shown as not holding, never left out', () => {
  const L = laws()
  const md = renderSchoolLaws({ ...L, laws: L.laws.map((l, i) => (i === 0 ? { ...l, holds: false } : l)) })
  assert.match(md, /\*\*does not hold\*\* · /)
  assert.ok(md.includes(pageSafe(L.laws[0]!.law)))
})

test('THE LIVE PAGE carries exactly the laws block laws() computes now', () => {
  const page = readFileSync(join(ROOT, 'docs', 'school.md'), 'utf8')
  const i = page.indexOf(LAWS_START), j = page.indexOf(LAWS_END)
  assert.ok(i >= 0 && j > i, '/school carries the laws block — run gen-school')
  assert.equal(page.slice(i, j + LAWS_END.length), renderSchoolLaws(laws()), '/school laws block is current — run gen-school')
})
