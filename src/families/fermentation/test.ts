import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FermentationFormulas } from './index.js'
import '../../mcp/families.js'

test('fermentation: biomass, conversion, ethanol, inoculation, output, ph, rate, temperature — crossing to biochemistry', async (t) => {
  assert.equal(FermentationFormulas.biomass(10000, 100).value, 100, 'cells per unit volume')
  assert.equal(FermentationFormulas.conversion(80, 100).value, 80)
  assert.equal(FermentationFormulas.ethanol(45, 50).value, 90, 'against theoretical maximum')
  assert.equal(FermentationFormulas.inoculation(5, 100).value, 5)
  assert.equal(FermentationFormulas.output(60, 100).value, 60, 'product from sugar')
  assert.equal(FermentationFormulas.ph(30, 100).value, 30)
  assert.equal(FermentationFormulas.rate(1200, 48).value, 25, 'per hour')
  assert.equal(FermentationFormulas.temperature(37).value, 37)
  assert.equal(FermentationFormulas.biomass(10000, 100).dst, 'biochemistry')
  assert.equal(hexFamiliesOf().get('fermentation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'fermentation', program: ['conversion'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `fermentation.conversion at ${uuid}`)
  uuidReceiptOf('fermentation conversion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; biomass 100, conversion 80, ethanol 90, inoculation 5, output 60, ph 30, rate 25, temperature 37; crossing to biochemistry')
})
