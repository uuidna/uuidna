import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ClimateFormulas } from './index.js'
import '../../mcp/families.js'

test('climate: emissions, budget, anomaly, offset, warming, sealevel, renewable, intensity — crossing to environment', async (t) => {
  assert.equal(ClimateFormulas.emissions(100, 5).value, 500, 'activity at an emission factor')
  assert.equal(ClimateFormulas.budget(300, 1000).value, 700, 'budget left')
  assert.equal(ClimateFormulas.anomaly(15, 14).value, 1)
  assert.equal(ClimateFormulas.anomaly(13, 14).value, -1, 'a cooler year, below baseline')
  assert.equal(ClimateFormulas.offset(500, 200).value, 300, 'net after capture')
  assert.equal(ClimateFormulas.warming(400, 50).value, 200)
  assert.equal(ClimateFormulas.sealevel(3, 100).value, 300, 'a century of rise')
  assert.equal(ClimateFormulas.renewable(40, 100).value, 40)
  assert.equal(ClimateFormulas.intensity(1000, 50).value, 20)
  assert.equal(ClimateFormulas.emissions(100, 5).dst, 'environment')
  assert.equal(hexFamiliesOf().get('climate')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'climate', program: ['emissions'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `climate.emissions at ${uuid}`)
  uuidReceiptOf('climate emissions', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; emissions 500, budget 700, anomaly 1/-1, offset 300, warming 200, sealevel 300, renewable 40, intensity 20; crossing to environment')
})
