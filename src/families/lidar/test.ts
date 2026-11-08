import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LidarFormulas } from './index.js'
import '../../mcp/families.js'

test('lidar: range, pointdensity, accuracy, returns, penetration, swath, resolution, noise — crossing to geophysics', async (t) => {
  assert.equal(LidarFormulas.range(300, 1000).value, 150000, 'round-trip time-of-flight halved')
  assert.equal(LidarFormulas.pointdensity(10000, 50).value, 200)
  assert.equal(LidarFormulas.accuracy(5, 1000).value, 50, 'ppm')
  assert.equal(LidarFormulas.returns(950, 1000).value, 95)
  assert.equal(LidarFormulas.penetration(300, 1000).value, 30)
  assert.equal(LidarFormulas.swath(500, 60).value, 30000)
  assert.equal(LidarFormulas.resolution(25).value, 25)
  assert.equal(LidarFormulas.noise(20, 1000).value, 2)
  assert.equal(LidarFormulas.range(300, 1000).dst, 'geophysics')
  assert.equal(hexFamiliesOf().get('lidar')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'lidar', program: ['pointdensity'], params: [10000, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `lidar.pointdensity at ${uuid}`)
  uuidReceiptOf('lidar pointdensity', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; range 150000, pointdensity 200, accuracy 50, returns 95, penetration 30, swath 30000, resolution 25, noise 2; crossing to geophysics')
})
