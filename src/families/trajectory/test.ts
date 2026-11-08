import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TrajectoryFormulas } from './index.js'
import '../../mcp/families.js'

test('trajectory: displacement, peakvelocity, acceleration, jerklimit, pathlength, segmenttime, blendradius, traversaltime — crossing to kinematics', async (t) => {
  assert.equal(TrajectoryFormulas.displacement(20, 5).value, 100)
  assert.equal(TrajectoryFormulas.peakvelocity(1000, 10).value, 100)
  assert.equal(TrajectoryFormulas.acceleration(100, 5).value, 20)
  assert.equal(TrajectoryFormulas.jerklimit(200, 4).value, 50)
  assert.equal(TrajectoryFormulas.pathlength(300, 200).value, 500)
  assert.equal(TrajectoryFormulas.segmenttime(600, 6).value, 100)
  assert.equal(TrajectoryFormulas.blendradius(100, 4).value, 25)
  assert.equal(TrajectoryFormulas.traversaltime(1000, 100).value, 10)
  assert.equal(TrajectoryFormulas.displacement(20, 5).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('trajectory')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'trajectory', program: ['displacement'], params: [20, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `trajectory.displacement at ${uuid}`)
  uuidReceiptOf('trajectory displacement', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; displacement 100, peakvelocity 100, acceleration 20, jerklimit 50, pathlength 500, segmenttime 100, blendradius 25, traversaltime 10; crossing to kinematics')
})
