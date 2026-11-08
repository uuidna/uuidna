import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BiomassFormulas } from './index.js'
import '../../mcp/families.js'

test('biomass: calorific, carbonneutral, combustion, conversion, density, digestion, moisture, output — crossing to energy', async (t) => {
  assert.equal(BiomassFormulas.calorific(18000, 1000).value, 18, 'megajoules per kilogram')
  assert.equal(BiomassFormulas.carbonneutral(120, 100).value, 120, 'a net carbon sink')
  assert.equal(BiomassFormulas.combustion(850, 1000).value, 85)
  assert.equal(BiomassFormulas.conversion(40, 100).value, 40, 'biofuel yield percent')
  assert.equal(BiomassFormulas.density(500, 2).value, 250)
  assert.equal(BiomassFormulas.digestion(600, 1000).value, 60)
  assert.equal(BiomassFormulas.moisture(1000, 400).value, 60, 'water fraction percent')
  assert.equal(BiomassFormulas.output(5000, 10).value, 500, 'yield per hectare')
  assert.equal(BiomassFormulas.calorific(18000, 1000).dst, 'energy')
  assert.equal(hexFamiliesOf().get('biomass')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'biomass', program: ['output'], params: [5000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `biomass.output at ${uuid}`)
  uuidReceiptOf('biomass output', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; calorific 18, carbonneutral 120, combustion 85, conversion 40, density 250, digestion 60, moisture 60, output 500; crossing to energy')
})
