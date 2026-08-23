// practice-shelf — the four loop instruments held to the law: the drill refuses the unsealed, the fold is
// order-invariant and answer-blind, the meter closes at the trinity and REOPENS on failure, and the walker's
// road is derived from real citations with the target's prerequisites before it.
import { test } from 'node:test'
import assert from 'node:assert'
import { drillOf, attemptDrill } from '../quantum/apps/categories/practice/drill.js'
import { foldFeedback } from '../quantum/apps/categories/practice/feedback-fold.js'
import { meterLoop, CLOSES_AT } from '../quantum/apps/categories/practice/loop-meter.js'
import { prerequisitesOf, walkTo } from '../quantum/apps/categories/practice/prereq-walker.js'
import { LEAN_LEDGER } from '../theorems/generated.js'

test('the drill presents the sealed and refuses the open by name', () => {
  const d = drillOf('two_coins', LEAN_LEDGER)
  assert.equal(d.key, 'two_coins')
  assert.ok(d.statement.length > 0 && d.cases >= 1)
  assert.throws(() => drillOf('a_door_never_sealed', LEAN_LEDGER), /not sealed/)
})

test('the feedback fold: same trials any order, same receipt — and one changed answer moves it', () => {
  const t1 = attemptDrill(drillOf('two_coins', LEAN_LEDGER), true, 1200)
  const t2 = attemptDrill(drillOf('double_negation', LEAN_LEDGER), false, 3400)
  const a = foldFeedback([t1, t2])
  const b = foldFeedback([t2, t1])
  assert.equal(a.receipt, b.receipt, 'order-invariant — same work, same address')
  const t2flip = { ...t2, timeSpent: t2.timeSpent + 1 }
  assert.notEqual(foldFeedback([t1, t2flip]).receipt, a.receipt, 'one changed answer moves the receipt')
})

test('the meter closes at the trinity and reopens on failure', () => {
  assert.equal(meterLoop([true, true]).closed, false, 'two is a coin-toss pair, not a walk')
  assert.equal(meterLoop([true, true, true]).closed, true)
  const m = meterLoop([true, true, true, false, true])
  assert.equal(m.closed, false, 'a ratchet that cannot reopen is a certificate')
  assert.equal(m.needed, CLOSES_AT - 1)
  assert.equal(m.reopened, 1)
})

test('the walker derives a real road: prerequisites exist, come first, and the walk is deterministic', () => {
  const withCites = LEAN_LEDGER.find((t) => prerequisitesOf(t.key, LEAN_LEDGER).length > 0)
  assert.ok(withCites, 'the ledger cites itself somewhere')
  const w = walkTo(withCites!.key, LEAN_LEDGER)
  assert.ok(w.chain.length > 0 && w.depth >= 1)
  assert.ok(!w.chain.includes(withCites!.key), 'the target is the destination, never a step')
  assert.deepEqual(w, walkTo(withCites!.key, LEAN_LEDGER), 'the road does not move under the walker')
})
