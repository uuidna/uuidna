import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ErgometryFormulas } from './index.js'
import '../../mcp/families.js'

test('ergometry: power, workdone, split, strokerate, energyrate, efficiency, distance, caloriesper — crossing to sports', async (t) => {
  assert.equal(ErgometryFormulas.power(200, 5).value, 1000)
  assert.equal(ErgometryFormulas.workdone(500, 60).value, 30000)
  assert.equal(ErgometryFormulas.split(120, 2).value, 60)
  assert.equal(ErgometryFormulas.strokerate(600, 10).value, 60)
  assert.equal(ErgometryFormulas.energyrate(3000, 60).value, 50)
  assert.equal(ErgometryFormulas.efficiency(250, 1000).value, 25)
  assert.equal(ErgometryFormulas.distance(5, 500).value, 2500)
  assert.equal(ErgometryFormulas.caloriesper(3600, 60).value, 60)
  assert.equal(ErgometryFormulas.power(200, 5).dst, 'sports')
  assert.equal(hexFamiliesOf().get('ergometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'ergometry', program: ['power'], params: [200, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1000, `ergometry.power at ${uuid}`)
  uuidReceiptOf('ergometry power', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; power 1000, workdone 30000, split 60, strokerate 60, energyrate 50, efficiency 25, distance 2500, caloriesper 60; crossing to sports')
})
