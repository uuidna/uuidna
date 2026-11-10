import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GravityFormulas } from './index.js'
import '../../mcp/families.js'

test('gravity: the physics, and the balance of slow, hot code by time and temperature — crossing to heat', async (t) => {
  // the physics
  assert.equal(GravityFormulas.weight(70, 10).value, 700, 'F = m·g')
  assert.equal(GravityFormulas.force(100, 100, 10).value, 100, 'inverse-square')
  assert.equal(GravityFormulas.potential(1000, 50).value, 20)
  assert.equal(GravityFormulas.freefall(20, 10).value, 4, 't² = 2h/g')

  // the mass of a computation: time (ms) × temperature (mK). a slow, hot one is heavy.
  const slow = Number(GravityFormulas.load(200, 30).value) // 200 ms, 30 mK
  const fast = Number(GravityFormulas.load(20, 5).value) //  20 ms,  5 mK
  assert.equal(slow, 6000, 'the slow, hot computation is heavy')
  assert.equal(fast, 100, 'the fast, cool one is light')

  // the pivot: the slow one pulls the lattice out of balance (past 50%)
  assert.equal(GravityFormulas.balance(slow, fast).value, 98, 'the heavy side pulls the pivot to 98%')
  assert.equal(GravityFormulas.balance(fast, fast).value, 50, 'two equal loads balance at the centre')

  // the barycenter and the lever law: how far the light work moves to counter the heavy, slow code
  assert.equal(GravityFormulas.center(6000, 100, 61).value, 1, 'the barycenter sits next to the heavy mass')
  assert.equal(GravityFormulas.equilibrium(6000, 1, 100).value, 60, 'light work moves 60 to balance the heavy at 1')

  assert.equal(GravityFormulas.load(200, 30).dst, 'heat')
  assert.equal(hexFamiliesOf().get('gravity')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'gravity', program: ['balance'], params: [6000, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 98, `gravity.balance at ${uuid}`)
  uuidReceiptOf('gravity balance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; weight 700, force 100, potential 20, freefall 4; load slow=6000 fast=100, balance 98% (out of balance), equilibrium 60; crossing to heat')
})
