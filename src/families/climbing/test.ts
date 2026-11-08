import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ClimbingFormulas } from './index.js'
import '../../mcp/families.js'

test('climbing: grade, gain, pitch, effort, sendrate, steepness, grip, rope — crossing to fitness', async (t) => {
  assert.equal(ClimbingFormulas.grade(12).value, 12)
  assert.equal(ClimbingFormulas.gain(1000, 200).value, 800, 'height climbed')
  assert.equal(ClimbingFormulas.gain(200, 1000).value, 0, 'no negative gain')
  assert.equal(ClimbingFormulas.pitch(240, 4).value, 60)
  assert.equal(ClimbingFormulas.effort(70, 100).value, 7000, 'work against gravity')
  assert.equal(ClimbingFormulas.sendrate(3, 10).value, 30, 'percent of attempts sent')
  assert.equal(ClimbingFormulas.steepness(100, 50).value, 200, 'overhanging wall')
  assert.equal(ClimbingFormulas.grip(140, 70).value, 200, 'twice bodyweight')
  assert.equal(ClimbingFormulas.rope(60, 3).value, 20)
  assert.equal(ClimbingFormulas.gain(1000, 200).dst, 'fitness')
  assert.equal(hexFamiliesOf().get('climbing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'climbing', program: ['gain'], params: [1000, 200] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 800, `climbing.gain at ${uuid}`)
  uuidReceiptOf('climbing gain', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; grade 12, gain 800, pitch 60, effort 7000, sendrate 30, steepness 200, grip 200, rope 20; crossing to fitness')
})
