// audit-door-demand.test — THE RATCHET MUST BE ABLE TO REFUSE.
//
// The captain, 2026-09-28: "automate so nothing is missed". This file's subject spent weeks ranking the demand for
// missing doors and could not fail: no exit code, no comparison against anything held. One session recorded 1,446
// bypasses of "only mcp use is allowed" in 1,223 distinct sentences, every one of them in the log this finder reads,
// and the board stayed green. A report nobody is obliged to act on is how that happens.
//
// So the ratchet is asserted in BOTH directions here, because "it passed" is worth nothing until the same comparison
// has been watched refusing.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ratchetOf } from './audit-door-demand.js'

test('a demand that stays level or falls is allowed', () => {
  assert.equal(ratchetOf({ open: 10, served: 250 }, { open: 10, served: 250 }).refused, false, 'level is allowed')
  assert.equal(ratchetOf({ open: 10, served: 250 }, { open: 9, served: 252 }).refused, false, 'a door built lowers open and raises served')
})

// ── THE CONTROLS. Without these the ratchet is a decoration.
test('A RISING OPEN DEMAND IS REFUSED — a new family asked for and unanswered', () => {
  const v = ratchetOf({ open: 9, served: 250 }, { open: 10, served: 250 })
  assert.equal(v.refused, true, 'one more unanswered family must refuse')
  assert.match(v.why[0] ?? '', /ROSE from 9 to 10/, 'and it must name both numbers, so the finding is actionable')
})

test('A FALLING SERVED SURFACE IS REFUSED — doors are not removed to make a gate pass', () => {
  const v = ratchetOf({ open: 10, served: 252 }, { open: 10, served: 250 })
  assert.equal(v.refused, true)
  assert.match(v.why[0] ?? '', /FELL from 252 to 250/)
})

test('both faults at once are both named, not just the first', () => {
  const v = ratchetOf({ open: 9, served: 252 }, { open: 11, served: 250 })
  assert.equal(v.why.length, 2, 'a caller fixing one must be able to see the other')
})

test('no held artifact obliges nothing — a first run is not a regression', () => {
  assert.equal(ratchetOf(null, { open: 99, served: 1 }).refused, false,
    'the first run has nothing to compare against, and inventing a ceiling would refuse a tree that never promised one')
  assert.equal(ratchetOf({}, { open: 99, served: 1 }).refused, false, 'and neither does an artifact missing the fields')
})
