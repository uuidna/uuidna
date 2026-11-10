import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HydrographyFormulas } from './index.js'
import '../../mcp/families.js'

test('hydrography: depth, soundingdensity, tidalrange, currentspeed, chartscale, shoalcount, surveycoverage, isobathinterval — crossing to oceanography', async (t) => {
  assert.equal(HydrographyFormulas.depth(1500, 1).value, 1500)
  assert.equal(HydrographyFormulas.soundingdensity(10000, 100).value, 100)
  assert.equal(HydrographyFormulas.tidalrange(500, 100).value, 400)
  assert.equal(HydrographyFormulas.currentspeed(3000, 60).value, 50)
  assert.equal(HydrographyFormulas.chartscale(50000, 1000).value, 50)
  assert.equal(HydrographyFormulas.shoalcount(12, 8).value, 20)
  assert.equal(HydrographyFormulas.surveycoverage(85, 100).value, 85)
  assert.equal(HydrographyFormulas.isobathinterval(200, 4).value, 50)
  assert.equal(HydrographyFormulas.depth(1500, 1).dst, 'oceanography')
  assert.equal(hexFamiliesOf().get('hydrography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hydrography', program: ['depth'], params: [1500, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1500, `hydrography.depth at ${uuid}`)
  uuidReceiptOf('hydrography depth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 1500, soundingdensity 100, tidalrange 400, currentspeed 50, chartscale 50, shoalcount 20, surveycoverage 85, isobathinterval 50; crossing to oceanography')
})
