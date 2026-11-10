import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PetroleumFormulas } from './index.js'
import '../../mcp/families.js'

test('petroleum: api, recovery, porosity, permeability, refined, depth, flow, saturation — crossing to energy', async (t) => {
  assert.equal(PetroleumFormulas.api(1000).value, 10, 'API gravity proxy at specific 1000')
  assert.equal(PetroleumFormulas.recovery(30, 100).value, 30, 'recovery factor as a percentage')
  assert.equal(PetroleumFormulas.porosity(20, 100).value, 20)
  assert.equal(PetroleumFormulas.permeability(1000, 50).value, 20)
  assert.equal(PetroleumFormulas.refined(45, 100).value, 45, 'refinery yield as a percentage')
  assert.equal(PetroleumFormulas.depth(3500).value, 3500, 'reservoir depth holds nat')
  assert.equal(PetroleumFormulas.flow(500, 24).value, 12000, 'rate over hours')
  assert.equal(PetroleumFormulas.saturation(70, 100).value, 70)
  assert.equal(PetroleumFormulas.api(1000).dst, 'energy')
  assert.equal(hexFamiliesOf().get('petroleum')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'petroleum', program: ['flow'], params: [500, 24] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 12000, `petroleum.flow at ${uuid}`)
  uuidReceiptOf('petroleum flow', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; api 10, recovery 30, porosity 20, permeability 20, refined 45, depth 3500, flow 12000, saturation 70; crossing to energy')
})
