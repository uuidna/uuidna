// unlocks — EACH THEOREM UNLOCKS what it seals `by decide`. The ledger IS the unlock board.
// Automation refuses a hollow illustration list; illustrations are presence checks, not a closed set.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  unlockBoard, unlockReadmeBlock, unlockHomeFragment,
  UNLOCK_ILLUSTRATIONS, UNLOCK_LAW,
} from '../unlocks.js'
import { theorems, statementCensus } from '../index.js'

test('unlockBoard recomputes from theorems() — every sealed key is an unlock', () => {
  const b = unlockBoard()
  const T = theorems()
  const census = statementCensus()
  assert.equal(b.keys, T.length)
  assert.equal(b.distinct, census.distinct)
  assert.ok(b.keys >= b.distinct, 'keys cover distinct statements')
  assert.ok(b.skills > 0)
  assert.ok(b.files > 0)
  const skillSum = b.bySkill.reduce((s: number, x: { n: number }) => s + x.n, 0)
  assert.equal(skillSum, T.filter((t) => t.skill).length)
  assert.match(b.receipt, /^[0-9a-f-]{36}$/)
  assert.equal(b.law, UNLOCK_LAW)
})

test('UNLOCK_ILLUSTRATIONS are presence-checked examples, not a closed unlock set', () => {
  const b = unlockBoard()
  assert.equal(b.illustrations.length, UNLOCK_ILLUSTRATIONS.length)
  assert.equal(b.illustrationsAllPresent, true, `missing: ${b.missingIllustrations.join(', ')}`)
  assert.deepEqual(b.missingIllustrations, [])
  for (const i of b.illustrations) {
    assert.ok(i.present, `${i.key} must still seal — automation refuses a hollow board`)
    assert.ok(i.name, `${i.key} carries its sealed name`)
  }
  assert.ok(b.keys > b.illustrations.length, 'illustrations ≪ board — not a curated exception list')
})

test('readme and home fragments are derived and deterministic', () => {
  assert.equal(unlockReadmeBlock(), unlockReadmeBlock())
  assert.equal(unlockHomeFragment(), unlockHomeFragment())
  assert.match(unlockReadmeBlock(), /Each theorem unlocks/)
  assert.match(unlockReadmeBlock(), /unlocks\.json/)
  assert.match(unlockHomeFragment(), /\/unlocks/)
  assert.match(unlockHomeFragment(), /Unsealed/)
})
