import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { KinesiologyFormulas } from './index.js'
import '../../mcp/families.js'

test('kinesiology: rangeofmotion, flexion, extension, muscleactivation, jointangle, momentarm, contraction, balance — crossing to anatomy', async (t) => {
  assert.equal(KinesiologyFormulas.rangeofmotion(150, 20).value, 130, 'knee travel in degrees')
  assert.equal(KinesiologyFormulas.flexion(30, 60).value, 90)
  assert.equal(KinesiologyFormulas.extension(90, 30).value, 60)
  assert.equal(KinesiologyFormulas.muscleactivation(300, 400).value, 75, 'percent of fibres recruited')
  assert.equal(KinesiologyFormulas.jointangle(360, 4).value, 90)
  assert.equal(KinesiologyFormulas.momentarm(50, 12).value, 600, 'torque at the lever')
  assert.equal(KinesiologyFormulas.contraction(100, 70).value, 30)
  assert.equal(KinesiologyFormulas.balance(5, 10).value, 1, 'balance held')
  assert.equal(KinesiologyFormulas.balance(15, 10).value, 0)
  assert.equal(KinesiologyFormulas.rangeofmotion(150, 20).dst, 'anatomy')
  assert.equal(hexFamiliesOf().get('kinesiology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'kinesiology', program: ['rangeofmotion'], params: [150, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 130, `kinesiology.rangeofmotion at ${uuid}`)
  uuidReceiptOf('kinesiology rangeofmotion', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rangeofmotion 130, flexion 90, extension 60, muscleactivation 75, jointangle 90, momentarm 600, contraction 30, balance 1; crossing to anatomy')
})
