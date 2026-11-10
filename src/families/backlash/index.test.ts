import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BacklashFormulas } from './index.js'
import '../../mcp/families.js'

test('backlash: deadband, compensation, hysteresis, lostmotion, positioningerror, gearplay, reversaldelay, stiffnessloss — crossing to control', async (t) => {
  assert.equal(BacklashFormulas.deadband(100, 97).value, 3)
  assert.equal(BacklashFormulas.compensation(95, 100).value, 95)
  assert.equal(BacklashFormulas.hysteresis(50, 45).value, 5)
  assert.equal(BacklashFormulas.lostmotion(20, 4).value, 5)
  assert.equal(BacklashFormulas.positioningerror(2, 100).value, 2)
  assert.equal(BacklashFormulas.gearplay(1, 3).value, 3)
  assert.equal(BacklashFormulas.reversaldelay(100, 20).value, 5)
  assert.equal(BacklashFormulas.stiffnessloss(10, 100).value, 10)
  assert.equal(BacklashFormulas.deadband(100, 97).dst, 'control')
  assert.equal(hexFamiliesOf().get('backlash')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'backlash', program: ['deadband'], params: [100, 97] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `backlash.deadband at ${uuid}`)
  uuidReceiptOf('backlash deadband', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; deadband 3, compensation 95, hysteresis 5, lostmotion 5, positioningerror 2, gearplay 3, reversaldelay 5, stiffnessloss 10; crossing to control')
})
