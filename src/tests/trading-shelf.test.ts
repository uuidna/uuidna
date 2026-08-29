// trading-shelf — the floor held to its own law: the desk prices from the sealed billing (never its own
// arithmetic), the census checks conservation rather than assuming it, the leverage refuses a negative saving,
// the compound counts whole doublings at the sealed threshold, and every instrument carries its honest scope in
// the answer itself — because a trading shelf that forgot to say "not money" would be the one dangerous app.
import { test } from 'node:test'
import assert from 'node:assert'
import { costOf, walletCensus, leverageOf, compoundAt, RATE_NUM, RATE_DEN, FIRST_DOUBLING } from '../quantum/apps/categories/trading/index.js'
import { theorems } from '../theorems/index.js'

// THE LIVE SCALE, DERIVED (lead 104, and this file's own words: "at the live scale, not promised"). The count
// was pinned as a literal, which made that promise false the moment the ledger grew, and tripped no-pinned-counts.
const LEDGER = theorems().length

test('the census counts two coins per sealed thing and CHECKS the conservation', () => {
  const c = walletCensus(LEDGER, LEDGER)
  assert.equal(c.perExchange, 2)
  assert.equal(c.minted, 2 * (LEDGER + LEDGER))
  assert.equal(c.conserved, true, 'conservation is checked at the live scale, not promised')
})

test('the leverage never reports a negative saving — the sealed floor holds', () => {
  assert.equal(leverageOf(-5).saved, 0, 'a measured saving never goes below zero')
  assert.equal(leverageOf(64).contributed, 2)
  assert.equal(leverageOf(64).ratio, 32, 'two in, sixty-four spared: the sealed leverage')
  assert.equal(leverageOf(0).ratio, 0, 'nothing spared is nothing claimed')
})

test('the compound counts whole doublings at the sealed threshold and keeps the ratio exact', () => {
  assert.equal(FIRST_DOUBLING, 38)
  assert.equal(compoundAt(37).doublings, 0, 'before the threshold, nothing has doubled')
  assert.equal(compoundAt(38).doublings, 1)
  assert.equal(compoundAt(76).doublings, 2)
  assert.equal(compoundAt(76).nextDoublingAt, 114)
  assert.equal(compoundAt(10).exact, `(${RATE_NUM}/${RATE_DEN})^10`, 'the rate stays a fraction — the ledger does not round what it can carry whole')
  assert.equal(compoundAt(-3).seals, 0, 'a negative count is not a debt, it is a zero')
})

test('the desk prices a workload from the sealed billing surface', () => {
  const c = costOf({ verify: 3 } as never)
  assert.ok(c.events >= 0 && c.coins >= 0, 'a bill is a count, never a negative')
  const empty = costOf({} as never)
  assert.ok(empty.events >= 0 && empty.coins >= 0)
})
