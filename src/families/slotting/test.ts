import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SlottingFormulas } from './index.js'
import '../../mcp/families.js'

test('slotting: pickdensity, traveltime, velocityrank, utilizationrate, replenishrate, goldenzone, picksperslot, congestionindex — crossing to supplychain', async (t) => {
  assert.equal(SlottingFormulas.pickdensity(500, 50).value, 10)
  assert.equal(SlottingFormulas.traveltime(1000, 20).value, 50)
  assert.equal(SlottingFormulas.velocityrank(900, 100).value, 9)
  assert.equal(SlottingFormulas.utilizationrate(85, 100).value, 85)
  assert.equal(SlottingFormulas.replenishrate(600, 6).value, 100)
  assert.equal(SlottingFormulas.goldenzone(40, 200).value, 20)
  assert.equal(SlottingFormulas.picksperslot(800, 40).value, 20)
  assert.equal(SlottingFormulas.congestionindex(30, 100).value, 30)
  assert.equal(SlottingFormulas.pickdensity(500, 50).dst, 'supplychain')
  assert.equal(hexFamiliesOf().get('slotting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'slotting', program: ['pickdensity'], params: [500, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `slotting.pickdensity at ${uuid}`)
  uuidReceiptOf('slotting pickdensity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pickdensity 10, traveltime 50, velocityrank 9, utilizationrate 85, replenishrate 100, goldenzone 20, picksperslot 20, congestionindex 30; crossing to supplychain')
})
