import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AgricultureFormulas } from './index.js'
import '../../mcp/families.js'

test('agriculture: yield, seed, water, fertilizer, germination, rotation, moisture, harvest — crossing to econ', async (t) => {
  assert.equal(AgricultureFormulas.yield(9000, 3).value, 3000, 'yield per hectare')
  assert.equal(AgricultureFormulas.seed(40, 120).value, 4800)
  assert.equal(AgricultureFormulas.water(40, 25).value, 1000)
  assert.equal(AgricultureFormulas.fertilizer(40, 150).value, 6000)
  assert.equal(AgricultureFormulas.germination(950, 1000).value, 95)
  assert.equal(AgricultureFormulas.rotation(12, 4).value, 3, 'three fields per rotation year')
  assert.equal(AgricultureFormulas.moisture(130, 100).value, 130)
  assert.equal(AgricultureFormulas.harvest(3000, 3).value, 9000)
  assert.equal(AgricultureFormulas.yield(9000, 3).dst, 'econ')
  assert.equal(hexFamiliesOf().get('agriculture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'agriculture', program: ['rotation'], params: [12, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `agriculture.rotation at ${uuid}`)
  uuidReceiptOf('agriculture rotation', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; yield 3000, seed 4800, water 1000, fertilizer 6000, germination 95, rotation 3, moisture 130, harvest 9000; crossing to econ')
})
