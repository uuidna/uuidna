import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AthleticsFormulas } from './index.js'
import '../../mcp/families.js'

test('athletics: pace, speed, stride, split, vo2max, power, jump, points — crossing to sports', async (t) => {
  assert.equal(AthleticsFormulas.pace(300, 5).value, 60, 'seconds per km')
  assert.equal(AthleticsFormulas.speed(1000, 125).value, 8)
  assert.equal(AthleticsFormulas.stride(1000, 500).value, 2, 'metres per step')
  assert.equal(AthleticsFormulas.split(400, 4).value, 100, 'even lap split')
  assert.equal(AthleticsFormulas.vo2max(12, 30).value, 400)
  assert.equal(AthleticsFormulas.power(1000, 10).value, 100, 'watts')
  assert.equal(AthleticsFormulas.jump(10, 10).value, 5)
  assert.equal(AthleticsFormulas.points(950, 1000).value, 950)
  assert.equal(AthleticsFormulas.pace(300, 5).dst, 'sports')
  assert.equal(hexFamiliesOf().get('athletics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'athletics', program: ['split'], params: [400, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `athletics.split at ${uuid}`)
  uuidReceiptOf('athletics split', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pace 60, speed 8, stride 2, split 100, vo2max 400, power 100, jump 5, points 950; crossing to sports')
})
