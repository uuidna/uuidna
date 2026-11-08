import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SoilscienceFormulas } from './index.js'
import '../../mcp/families.js'

test('soilscience: porosity, bulkdensity, fieldcapacity, cationexchange, organicmatter, infiltration, salinity, texture — crossing to ecology', async (t) => {
  assert.equal(SoilscienceFormulas.porosity(130, 265).value, 50, 'half the volume is pore space')
  assert.equal(SoilscienceFormulas.bulkdensity(2600, 2).value, 1300)
  assert.equal(SoilscienceFormulas.fieldcapacity(30, 12).value, 18, 'plant-available water')
  assert.equal(SoilscienceFormulas.cationexchange(15, 2).value, 30)
  assert.equal(SoilscienceFormulas.organicmatter(20).value, 34, 'Van Bemmelen factor')
  assert.equal(SoilscienceFormulas.infiltration(120, 4).value, 30, 'mm per hour')
  assert.equal(SoilscienceFormulas.salinity(4).value, 2560)
  assert.equal(SoilscienceFormulas.texture(40, 40).value, 20, 'the clay fraction')
  assert.equal(SoilscienceFormulas.texture(60, 60).value, 0)
  assert.equal(SoilscienceFormulas.porosity(130, 265).dst, 'ecology')
  assert.equal(hexFamiliesOf().get('soilscience')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'soilscience', program: ['porosity'], params: [130, 265] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `soilscience.porosity at ${uuid}`)
  uuidReceiptOf('soilscience porosity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; porosity 50, bulkdensity 1300, fieldcapacity 18, cationexchange 30, organicmatter 34, infiltration 30, salinity 2560, texture 20; crossing to ecology')
})
