import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ViticultureFormulas } from './index.js'
import '../../mcp/families.js'

test('viticulture: acidity, brix, cropload, density, fermentation, gdd, ripeness, tannin — crossing to agriculture', async (t) => {
  assert.equal(ViticultureFormulas.acidity(6, 1000).value, 6)
  assert.equal(ViticultureFormulas.brix(240, 1000).value, 24, 'sugar as brix')
  assert.equal(ViticultureFormulas.cropload(1200, 400).value, 3, 'clusters per vine')
  assert.equal(ViticultureFormulas.density(4000, 1000).value, 4)
  assert.equal(ViticultureFormulas.fermentation(180, 240).value, 75, 'three quarters converted')
  assert.equal(ViticultureFormulas.gdd(30, 10).value, 20, 'growing degree days')
  assert.equal(ViticultureFormulas.gdd(5, 10).value, 0)
  assert.equal(ViticultureFormulas.ripeness(220, 240).value, 91)
  assert.equal(ViticultureFormulas.tannin(900, 300).value, 3)
  assert.equal(ViticultureFormulas.brix(240, 1000).dst, 'agriculture')
  assert.equal(hexFamiliesOf().get('viticulture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'viticulture', program: ['gdd'], params: [30, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `viticulture.gdd at ${uuid}`)
  uuidReceiptOf('viticulture gdd', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; acidity 6, brix 24, cropload 3, density 4, fermentation 75, gdd 20, ripeness 91, tannin 3; crossing to agriculture')
})
