import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GlaciologyFormulas } from './index.js'
import '../../mcp/families.js'

test('glaciology: massbalance, flow, retreat, albedo, melt, calving, equilibrium, age — crossing to climate', async (t) => {
  assert.equal(GlaciologyFormulas.massbalance(80, 50).value, 30, 'a gaining year')
  assert.equal(GlaciologyFormulas.massbalance(30, 50).value, -20, 'a losing year runs negative')
  assert.equal(GlaciologyFormulas.flow(12, 100).value, 1200)
  assert.equal(GlaciologyFormulas.retreat(500, 450).value, 50, 'the terminus pulled back')
  assert.equal(GlaciologyFormulas.retreat(450, 500).value, 0, 'an advance never goes negative')
  assert.equal(GlaciologyFormulas.albedo(80, 100).value, 80)
  assert.equal(GlaciologyFormulas.melt(10000, 334).value, 29)
  assert.equal(GlaciologyFormulas.calving(6000, 50).value, 120)
  assert.equal(GlaciologyFormulas.equilibrium(60, 100).value, 60)
  assert.equal(GlaciologyFormulas.age(1000, 25).value, 40)
  assert.equal(GlaciologyFormulas.flow(12, 100).dst, 'climate')
  assert.equal(hexFamiliesOf().get('glaciology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'glaciology', program: ['flow'], params: [12, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `glaciology.flow at ${uuid}`)
  uuidReceiptOf('glaciology flow', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; massbalance 30/−20, flow 1200, retreat 50, albedo 80, melt 29, calving 120, equilibrium 60, age 40; crossing to climate')
})
