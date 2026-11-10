import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ManipulatorFormulas } from './index.js'
import '../../mcp/families.js'

test('manipulator: dof, reach, payload, workspace, jointrange, repeatability, linkspeed, singularities — crossing to kinematics', async (t) => {
  assert.equal(ManipulatorFormulas.dof(6, 0).value, 6, 'a free six-axis arm')
  assert.equal(ManipulatorFormulas.reach(3, 400).value, 1200, 'three links extended')
  assert.equal(ManipulatorFormulas.payload(600, 3).value, 200)
  assert.equal(ManipulatorFormulas.workspace(10, 5).value, 500, 'swept volume')
  assert.equal(ManipulatorFormulas.jointrange(270, 90).value, 180)
  assert.equal(ManipulatorFormulas.repeatability(100, 8).value, 12)
  assert.equal(ManipulatorFormulas.linkspeed(1000, 4).value, 250, 'end-effector speed')
  assert.equal(ManipulatorFormulas.singularities(2, 1, 2).value, 5, 'wrist, elbow, shoulder')
  assert.equal(ManipulatorFormulas.payload(100, 0).value, 0)
  assert.equal(ManipulatorFormulas.dof(6, 0).dst, 'kinematics')
  assert.equal(hexFamiliesOf().get('manipulator')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'manipulator', program: ['payload'], params: [600, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 200, `manipulator.payload at ${uuid}`)
  uuidReceiptOf('manipulator payload', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; dof 6, reach 1200, payload 200, workspace 500, jointrange 180, repeatability 12, linkspeed 250, singularities 5; crossing to kinematics')
})
