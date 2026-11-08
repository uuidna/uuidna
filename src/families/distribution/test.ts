import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { DistributionFormulas } from './index.js'
import '../../mcp/families.js'

test('distribution: hubs, spokes, coverage, density, dropsize, routes, echelon, reach — crossing to logistics', async (t) => {
  assert.equal(DistributionFormulas.hubs(100, 30).value, 4, 'four hubs for the regions')
  assert.equal(DistributionFormulas.spokes(12, 8).value, 96)
  assert.equal(DistributionFormulas.coverage(999, 1000).value, 99)
  assert.equal(DistributionFormulas.density(5000, 100).value, 50)
  assert.equal(DistributionFormulas.dropsize(6000, 60).value, 100, 'units per stop')
  assert.equal(DistributionFormulas.routes(1000, 5).value, 5000)
  assert.equal(DistributionFormulas.echelon(10000, 90).value, 900)
  assert.equal(DistributionFormulas.reach(99, 95).value, 1, 'reach met')
  assert.equal(DistributionFormulas.reach(90, 95).value, 0)
  assert.equal(DistributionFormulas.hubs(100, 30).dst, 'logistics')
  assert.equal(hexFamiliesOf().get('distribution')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'distribution', program: ['hubs'], params: [100, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `distribution.hubs at ${uuid}`)
  uuidReceiptOf('distribution hubs', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hubs 4, spokes 96, coverage 99, density 50, dropsize 100, routes 5000, echelon 900, reach 1; crossing to logistics')
})
