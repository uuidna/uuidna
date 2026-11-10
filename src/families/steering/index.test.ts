import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SteeringFormulas } from './index.js'
import '../../mcp/families.js'

test('steering: turnradius, ackermannangle, slipangle, steeringratio, yawrate, understeer, wheelbaseratio, correctiongain — crossing to control', async (t) => {
  assert.equal(SteeringFormulas.turnradius(1000, 20).value, 50)
  assert.equal(SteeringFormulas.ackermannangle(40, 10).value, 30)
  assert.equal(SteeringFormulas.slipangle(15, 3).value, 12)
  assert.equal(SteeringFormulas.steeringratio(360, 24).value, 15)
  assert.equal(SteeringFormulas.yawrate(600, 10).value, 60)
  assert.equal(SteeringFormulas.understeer(8, 100).value, 8)
  assert.equal(SteeringFormulas.wheelbaseratio(250, 300).value, 83)
  assert.equal(SteeringFormulas.correctiongain(100, 4).value, 25)
  assert.equal(SteeringFormulas.turnradius(1000, 20).dst, 'control')
  assert.equal(hexFamiliesOf().get('steering')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'steering', program: ['turnradius'], params: [1000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `steering.turnradius at ${uuid}`)
  uuidReceiptOf('steering turnradius', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; turnradius 50, ackermannangle 30, slipangle 12, steeringratio 15, yawrate 60, understeer 8, wheelbaseratio 83, correctiongain 25; crossing to control')
})
