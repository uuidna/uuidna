import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GeochemistryFormulas } from './index.js'
import '../../mcp/families.js'

test('geochemistry: isotope, weathering, enrichment, ph, salinity, partition, age, saturation — crossing to chemistry', async (t) => {
  assert.equal(GeochemistryFormulas.isotope(200, 50).value, 25, 'daughter a quarter of parent')
  assert.equal(GeochemistryFormulas.weathering(30, 100).value, 30)
  assert.equal(GeochemistryFormulas.enrichment(500, 100).value, 500, 'five times crustal abundance')
  assert.equal(GeochemistryFormulas.ph(10, 100).value, 10)
  assert.equal(GeochemistryFormulas.salinity(35, 1000).value, 35, 'seawater per thousand')
  assert.equal(GeochemistryFormulas.partition(80, 20).value, 400)
  assert.equal(GeochemistryFormulas.age(100, 25).value, 250)
  assert.equal(GeochemistryFormulas.saturation(120, 100).value, 120, 'supersaturated')
  assert.equal(GeochemistryFormulas.isotope(200, 50).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('geochemistry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'geochemistry', program: ['isotope'], params: [200, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `geochemistry.isotope at ${uuid}`)
  uuidReceiptOf('geochemistry isotope', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; isotope 25, weathering 30, enrichment 500, ph 10, salinity 35, partition 400, age 250, saturation 120; crossing to chemistry')
})
