import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PedologyFormulas } from './index.js'
import '../../mcp/families.js'

test('pedology: porosity, moisture, ph, organic, infiltration, texture, erosion, fertility — crossing to agriculture', async (t) => {
  assert.equal(PedologyFormulas.porosity(40, 100).value, 40, 'two fifths pore space')
  assert.equal(PedologyFormulas.moisture(25, 100).value, 25)
  assert.equal(PedologyFormulas.ph(65, 100).value, 65)
  assert.equal(PedologyFormulas.organic(3, 100).value, 3, 'three percent organic carbon')
  assert.equal(PedologyFormulas.infiltration(120, 60).value, 2, 'units per minute')
  assert.equal(PedologyFormulas.texture(70, 10).value, 700)
  assert.equal(PedologyFormulas.erosion(5000, 100).value, 50)
  assert.equal(PedologyFormulas.fertility(900, 30).value, 30)
  assert.equal(PedologyFormulas.porosity(40, 100).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('pedology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pedology', program: ['infiltration'], params: [120, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `pedology.infiltration at ${uuid}`)
  uuidReceiptOf('pedology infiltration', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; porosity 40, moisture 25, ph 65, organic 3, infiltration 2, texture 700, erosion 50, fertility 30; crossing to agriculture')
})
