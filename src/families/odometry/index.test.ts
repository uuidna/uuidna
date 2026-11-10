import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { OdometryFormulas } from './index.js'
import '../../mcp/families.js'

test('odometry: distance, wheelrevolutions, headingchange, positionerror, ticksperrev, driftrate, slipcompensation, pathdistance — crossing to kinematics', async (t) => {
  assert.equal(OdometryFormulas.distance(360, 2).value, 720)
  assert.equal(OdometryFormulas.wheelrevolutions(1000, 314).value, 3)
  assert.equal(OdometryFormulas.headingchange(90, 30).value, 60)
  assert.equal(OdometryFormulas.positionerror(2, 100).value, 2)
  assert.equal(OdometryFormulas.ticksperrev(360, 4).value, 1440)
  assert.equal(OdometryFormulas.driftrate(50, 10).value, 5)
  assert.equal(OdometryFormulas.slipcompensation(100, 95).value, 5)
  assert.equal(OdometryFormulas.pathdistance(500, 220).value, 720)
  assert.equal(OdometryFormulas.distance(360, 2).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('odometry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'odometry', program: ['distance'], params: [360, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 720, `odometry.distance at ${uuid}`)
  uuidReceiptOf('odometry distance', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; distance 720, wheelrevolutions 3, headingchange 60, positionerror 2, ticksperrev 1440, driftrate 5, slipcompensation 5, pathdistance 720; crossing to kinematics')
})
