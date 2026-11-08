import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UrbanismFormulas } from './index.js'
import '../../mcp/families.js'

test('urbanism: density, jobshousing, mixeduse, blocksize, intersectiondensity, floorarearatio, populationdensity, servicecoverage — crossing to governance', async (t) => {
  assert.equal(UrbanismFormulas.density(1000, 50).value, 20, 'dwelling units per acre')
  assert.equal(UrbanismFormulas.jobshousing(1200, 1000).value, 120, 'jobs per hundred homes')
  assert.equal(UrbanismFormulas.mixeduse(3, 10).value, 30)
  assert.equal(UrbanismFormulas.blocksize(100, 80).value, 8000, 'block area')
  assert.equal(UrbanismFormulas.intersectiondensity(200, 10).value, 20)
  assert.equal(UrbanismFormulas.floorarearatio(250, 100).value, 250, 'FAR as a percentage')
  assert.equal(UrbanismFormulas.populationdensity(50000, 25).value, 2000, 'people per square unit')
  assert.equal(UrbanismFormulas.servicecoverage(950, 1000).value, 95, 'coverage met')
  assert.equal(UrbanismFormulas.density(1000, 50).dst, 'governance')
  assert.equal(hexFamiliesOf().get('urbanism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'urbanism', program: ['density'], params: [1000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 20, `urbanism.density at ${uuid}`)
  uuidReceiptOf('urbanism density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; density 20, jobshousing 120, mixeduse 30, blocksize 8000, intersectiondensity 20, floorarearatio 250, populationdensity 2000, servicecoverage 95; crossing to governance')
})
