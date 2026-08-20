// grow — a horizon behind you is not a horizon.
//
// TARGET was a fixed 1024, the v1.0.0 milestone. The ledger passed it, nothing recomputed, and growLife() reported
// a NEGATIVE toGo while the honest string still said "growing toward 1024" — shipped through the MCP tool
// uuidna_grow_life to every consumer. The milestone is computed now, so reaching one advances it.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { growLife, nextMilestone } from '../grow.js'

test('crossing a milestone ADVANCES it — the case that went stale', () => {
  assert.equal(nextMilestone(1023), 1024, 'below it, the milestone stands')
  assert.equal(nextMilestone(1024), 2048, 'AT it, the horizon moves — this is what never happened')
  assert.equal(nextMilestone(2048), 4096)
})

test('the milestone is always strictly ahead, at every size', () => {
  for (const n of [0, 1, 2, 7, 1336, 5000, 100000]) {
    assert.ok(nextMilestone(n) > n, `milestone must lead ${n}`)
    assert.ok(nextMilestone(n) <= (n + 1) * 2, 'and must not overshoot the next power of two')
  }
})

test('toGo is never negative against the live ledger', () => {
  const g = growLife()
  assert.ok(g.grow.toGo > 0, `toGo was ${g.grow.toGo} — a negative horizon is what shipped before`)
  assert.equal(g.grow.target, nextMilestone(g.grow.theorems))
})

test('the honest string no longer names a milestone already passed', () => {
  assert.ok(!/toward 1024/.test(growLife().honest), 'a reached milestone must not be published as the goal')
})
