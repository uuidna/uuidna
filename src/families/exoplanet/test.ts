import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ExoplanetFormulas } from './index.js'
import '../../mcp/families.js'

test('exoplanet: transitdepth, orbitalperiod, habitablezone, radiusratio, transitduration, equilibriumtemp, massratio, semiamplitude — crossing to astronomy', async (t) => {
  assert.equal(ExoplanetFormulas.transitdepth(10, 100).value, 10000, 'a 1% dip, in ppm')
  assert.equal(ExoplanetFormulas.orbitalperiod(36500, 100).value, 365, 'a year')
  assert.equal(ExoplanetFormulas.habitablezone(1000, 4).value, 250)
  assert.equal(ExoplanetFormulas.radiusratio(10, 100).value, 100, 'a tenth, in permille')
  assert.equal(ExoplanetFormulas.transitduration(2400, 5).value, 12)
  assert.equal(ExoplanetFormulas.equilibriumtemp(5800, 20).value, 290, 'roughly temperate')
  assert.equal(ExoplanetFormulas.massratio(1, 333000).value, 3, 'an Earth in a Sun, in ppm')
  assert.equal(ExoplanetFormulas.semiamplitude(5, 2, 2).value, 1250)
  assert.equal(ExoplanetFormulas.habitablezone(1000, 0).value, 0)
  assert.equal(ExoplanetFormulas.transitdepth(10, 100).dst, 'astronomy')
  assert.equal(hexFamiliesOf().get('exoplanet')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'exoplanet', program: ['transitdepth'], params: [10, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10000, `exoplanet.transitdepth at ${uuid}`)
  uuidReceiptOf('exoplanet transitdepth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; transitdepth 10000, orbitalperiod 365, habitablezone 250, radiusratio 100, transitduration 12, equilibriumtemp 290, massratio 3, semiamplitude 1250; crossing to astronomy')
})
