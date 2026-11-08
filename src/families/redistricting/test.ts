import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RedistrictingFormulas } from './index.js'
import '../../mcp/families.js'

test('redistricting: compactness, competitiveness, deviation, districts, efficiencygap, malapportionment, population, quota — crossing to governance', async (t) => {
  assert.equal(RedistrictingFormulas.compactness(75, 100).value, 75, 'three-quarters of the bounding box filled')
  assert.equal(RedistrictingFormulas.competitiveness(5500, 4500).value, 90, 'a close seat')
  assert.equal(RedistrictingFormulas.deviation(1100, 1000).value, 10, 'ten percent over the ideal')
  assert.equal(RedistrictingFormulas.districts(10000, 1000).value, 10, 'ten districts for the population')
  assert.equal(RedistrictingFormulas.efficiencygap(3000, 1000, 10000).value, 20)
  assert.equal(RedistrictingFormulas.malapportionment(1200, 1000).value, 120)
  assert.equal(RedistrictingFormulas.population(10, 1000).value, 10000)
  assert.equal(RedistrictingFormulas.quota(50000, 10).value, 5000, 'people per seat')
  assert.equal(RedistrictingFormulas.compactness(75, 100).dst, 'governance')
  assert.equal(hexFamiliesOf().get('redistricting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'redistricting', program: ['districts'], params: [10000, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `redistricting.districts at ${uuid}`)
  uuidReceiptOf('redistricting districts', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; compactness 75, competitiveness 90, deviation 10, districts 10, efficiencygap 20, malapportionment 120, population 10000, quota 5000; crossing to governance')
})
