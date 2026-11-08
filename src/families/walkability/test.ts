import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WalkabilityFormulas } from './index.js'
import '../../mcp/families.js'

test('walkability: walkscore, amenityaccess, sidewalkratio, crossingdensity, walkshed, pedestriansafety, transitproximity, slopepenalty — crossing to sociology', async (t) => {
  assert.equal(WalkabilityFormulas.walkscore(45, 50).value, 90, 'amenities reached against the most on offer')
  assert.equal(WalkabilityFormulas.amenityaccess(18, 24).value, 75)
  assert.equal(WalkabilityFormulas.sidewalkratio(360, 400).value, 90, 'most streets have sidewalks')
  assert.equal(WalkabilityFormulas.crossingdensity(12, 2000).value, 6, 'crossings per 1000 metres')
  assert.equal(WalkabilityFormulas.walkshed(80, 15).value, 1200, 'metres covered in fifteen minutes')
  assert.equal(WalkabilityFormulas.pedestriansafety(5, 100).value, 95)
  assert.equal(WalkabilityFormulas.transitproximity(200, 800).value, 75)
  assert.equal(WalkabilityFormulas.slopepenalty(8, 100).value, 8, 'an eight percent grade')
  assert.equal(WalkabilityFormulas.walkscore(45, 50).dst, 'sociology')
  assert.equal(hexFamiliesOf().get('walkability')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'walkability', program: ['walkscore'], params: [45, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `walkability.walkscore at ${uuid}`)
  uuidReceiptOf('walkability walkscore', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; walkscore 90, amenityaccess 75, sidewalkratio 90, crossingdensity 6, walkshed 1200, pedestriansafety 95, transitproximity 75, slopepenalty 8; crossing to sociology')
})
