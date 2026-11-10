import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CarbonFormulas } from './index.js'
import '../../mcp/families.js'

test('carbon: footprint, offset, sequestration, intensity, credits, capture, equivalent, budget — crossing to climate', async (t) => {
  assert.equal(CarbonFormulas.footprint(100, 5).value, 500, 'activity at an emission factor')
  assert.equal(CarbonFormulas.offset(1000, 300).value, 700)
  assert.equal(CarbonFormulas.offset(300, 1000).value, 0, 'offset cannot go negative')
  assert.equal(CarbonFormulas.sequestration(50, 20).value, 1000, 'what the trees take up')
  assert.equal(CarbonFormulas.intensity(5000, 100).value, 50)
  assert.equal(CarbonFormulas.credits(10, 25).value, 250)
  assert.equal(CarbonFormulas.capture(1000, 90).value, 900, 'ninety percent held back')
  assert.equal(CarbonFormulas.equivalent(8, 28).value, 224, 'methane as CO₂-equivalent')
  assert.equal(CarbonFormulas.budget(1000, 600).value, 400)
  assert.equal(CarbonFormulas.footprint(100, 5).dst, 'climate')
  assert.equal(hexFamiliesOf().get('carbon')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'carbon', program: ['capture'], params: [1000, 90] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 900, `carbon.capture at ${uuid}`)
  uuidReceiptOf('carbon capture', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; footprint 500, offset 700, sequestration 1000, intensity 50, credits 250, capture 900, equivalent 224, budget 400; crossing to climate')
})
