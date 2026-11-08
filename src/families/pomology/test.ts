import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PomologyFormulas } from './index.js'
import '../../mcp/families.js'

test('pomology: yield, brix, fruitset, thinning, caliper, firmness, harvestindex, treedensity — crossing to botany', async (t) => {
  assert.equal(PomologyFormulas.yield(200, 150).value, 30000, 'a block of trees bearing fruit')
  assert.equal(PomologyFormulas.brix(13, 100).value, 13, '13 °Brix')
  assert.equal(PomologyFormulas.fruitset(300, 1000).value, 30, '30% of blossoms set')
  assert.equal(PomologyFormulas.thinning(500, 300).value, 200, 'fruits thinned off')
  assert.equal(PomologyFormulas.thinning(100, 200).value, 0)
  assert.equal(PomologyFormulas.caliper(700, 10).value, 70)
  assert.equal(PomologyFormulas.firmness(1000, 20).value, 50)
  assert.equal(PomologyFormulas.harvestindex(450, 1000).value, 45)
  assert.equal(PomologyFormulas.treedensity(10000, 25).value, 400, 'trees the planting holds')
  assert.equal(PomologyFormulas.yield(200, 150).dst, 'botany')
  assert.equal(hexFamiliesOf().get('pomology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pomology', program: ['treedensity'], params: [10000, 25] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `pomology.treedensity at ${uuid}`)
  uuidReceiptOf('pomology treedensity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; yield 30000, brix 13, fruitset 30, thinning 200, caliper 70, firmness 50, harvestindex 45, treedensity 400; crossing to botany')
})
