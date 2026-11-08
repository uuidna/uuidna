import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SinteringFormulas } from './index.js'
import '../../mcp/families.js'

test('sintering: densification, density, greendensity, holdtime, neckgrowth, porosity, shrinkage, temperature — crossing to metallurgy', async (t) => {
  assert.equal(SinteringFormulas.densification(95, 60, 100).value, 87, 'firing closed most of the gap')
  assert.equal(SinteringFormulas.density(950, 1000).value, 95)
  assert.equal(SinteringFormulas.greendensity(500, 100).value, 500)
  assert.equal(SinteringFormulas.holdtime(1200, 10).value, 120, 'minutes to temperature')
  assert.equal(SinteringFormulas.neckgrowth(30, 100).value, 30)
  assert.equal(SinteringFormulas.porosity(95).value, 5, 'the voids left')
  assert.equal(SinteringFormulas.shrinkage(100, 85).value, 15)
  assert.equal(SinteringFormulas.temperature(1500, 75).value, 1125, 'held below melting')
  assert.equal(SinteringFormulas.density(950, 1000).dst, 'metallurgy')
  assert.equal(hexFamiliesOf().get('sintering')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sintering', program: ['density'], params: [950, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 95, `sintering.density at ${uuid}`)
  uuidReceiptOf('sintering density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; densification 87, density 95, greendensity 500, holdtime 120, neckgrowth 30, porosity 5, shrinkage 15, temperature 1125; crossing to metallurgy')
})
