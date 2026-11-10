import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SustainabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('sustainability: footprint, renewable, circularity, efficiency, offset, lifecycle, intensity, regeneration — crossing to ecology', async (t) => {
  assert.equal(SustainabilityFormulas.footprint(120, 100).value, 120, 'overshoot past capacity')
  assert.equal(SustainabilityFormulas.renewable(45, 100).value, 45, 'clean share of total')
  assert.equal(SustainabilityFormulas.circularity(30, 120).value, 25)
  assert.equal(SustainabilityFormulas.efficiency(1000, 50).value, 20, 'output per resource')
  assert.equal(SustainabilityFormulas.offset(80, 100).value, 80)
  assert.equal(SustainabilityFormulas.lifecycle(10, 5).value, 50, 'reused over cycles')
  assert.equal(SustainabilityFormulas.intensity(900, 30).value, 30)
  assert.equal(SustainabilityFormulas.regeneration(60, 120).value, 50)
  assert.equal(SustainabilityFormulas.footprint(10, 0).value, 0, 'guarded division')
  assert.equal(SustainabilityFormulas.footprint(120, 100).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('sustainability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sustainability', program: ['efficiency'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `sustainability.efficiency at ${uuid}`)
  uuidReceiptOf('sustainability efficiency', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; footprint 120, renewable 45, circularity 25, efficiency 20, offset 80, lifecycle 50, intensity 30, regeneration 50; crossing to ecology')
})
