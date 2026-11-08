import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RoastingFormulas } from './index.js'
import '../../mcp/families.js'

test('roasting: weightloss, developmenttime, rampspeed, charge, moisture, density, agtron, batchsize — crossing to cuisine', async (t) => {
  assert.equal(RoastingFormulas.weightloss(1000, 850).value, 15, 'fifteen percent shed')
  assert.equal(RoastingFormulas.developmenttime(600, 480).value, 20, 'DTR twenty percent')
  assert.equal(RoastingFormulas.rampspeed(200, 10).value, 20, 'degrees per minute')
  assert.equal(RoastingFormulas.charge(205).value, 205)
  assert.equal(RoastingFormulas.moisture(120, 108).value, 10)
  assert.equal(RoastingFormulas.density(640, 1).value, 640)
  assert.equal(RoastingFormulas.agtron(55).value, 55)
  assert.equal(RoastingFormulas.batchsize(900, 1200).value, 75, 'three-quarters full')
  assert.equal(RoastingFormulas.weightloss(1000, 850).dst, 'cuisine')
  assert.equal(hexFamiliesOf().get('roasting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'roasting', program: ['weightloss'], params: [1000, 850] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 15, `roasting.weightloss at ${uuid}`)
  uuidReceiptOf('roasting weightloss', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; weightloss 15, developmenttime 20, rampspeed 20, charge 205, moisture 10, density 640, agtron 55, batchsize 75; crossing to cuisine')
})
