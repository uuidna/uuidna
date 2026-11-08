import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CropyieldFormulas } from './index.js'
import '../../mcp/families.js'

test('cropyield: perhectare, totalproduction, harvestindex, yieldgap, plantdensity, biomassratio, moisturecorrected, lossadjusted — crossing to agronomy', async (t) => {
  assert.equal(CropyieldFormulas.perhectare(10000, 4).value, 2500, 'yield per hectare')
  assert.equal(CropyieldFormulas.totalproduction(2500, 4).value, 10000, 'the whole field')
  assert.equal(CropyieldFormulas.harvestindex(45, 100).value, 45)
  assert.equal(CropyieldFormulas.yieldgap(5000, 3500).value, 1500, 'shortfall from potential')
  assert.equal(CropyieldFormulas.yieldgap(3000, 5000).value, 0)
  assert.equal(CropyieldFormulas.plantdensity(60000, 3).value, 20000, 'plants per hectare')
  assert.equal(CropyieldFormulas.biomassratio(30, 120).value, 25)
  assert.equal(CropyieldFormulas.moisturecorrected(10000, 20).value, 8000, 'dry mass')
  assert.equal(CropyieldFormulas.lossadjusted(5000, 300).value, 4700, 'harvest after loss')
  assert.equal(CropyieldFormulas.perhectare(10000, 4).dst, 'agronomy')
  assert.equal(hexFamiliesOf().get('cropyield')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cropyield', program: ['perhectare'], params: [10000, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2500, `cropyield.perhectare at ${uuid}`)
  uuidReceiptOf('cropyield perhectare', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; perhectare 2500, totalproduction 10000, harvestindex 45, yieldgap 1500, plantdensity 20000, biomassratio 25, moisturecorrected 8000, lossadjusted 4700; crossing to agronomy')
})
