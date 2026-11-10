import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HydrologyFormulas } from './index.js'
import '../../mcp/families.js'

test('hydrology: flow, runoff, volume, infiltration, watershed, retention, recharge, drought — crossing to environment', async (t) => {
  assert.equal(HydrologyFormulas.flow(50, 2).value, 100, 'discharge of a channel')
  assert.equal(HydrologyFormulas.runoff(200, 60).value, 120)
  assert.equal(HydrologyFormulas.volume(1000, 5).value, 5000)
  assert.equal(HydrologyFormulas.infiltration(30, 100).value, 30)
  assert.equal(HydrologyFormulas.watershed(12, 50).value, 600, 'sub-basins drained')
  assert.equal(HydrologyFormulas.retention(750, 1000).value, 75)
  assert.equal(HydrologyFormulas.recharge(20, 100).value, 2000)
  assert.equal(HydrologyFormulas.drought(40, 200).value, 20)
  assert.equal(HydrologyFormulas.flow(50, 2).dst, 'environment')
  assert.equal(hexFamiliesOf().get('hydrology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hydrology', program: ['flow'], params: [50, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `hydrology.flow at ${uuid}`)
  uuidReceiptOf('hydrology flow', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; flow 100, runoff 120, volume 5000, infiltration 30, watershed 600, retention 75, recharge 2000, drought 20; crossing to environment')
})
