import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HelicopterFormulas } from './index.js'
import '../../mcp/families.js'

test('helicopter: rotordiameter, lift, maxspeed, bladecount, bladeorderings, ceiling, autorotationrate, powerkw — crossing to aerospace', async (t) => {
  assert.equal(HelicopterFormulas.rotordiameter(16, 1).value, 16)
  assert.equal(HelicopterFormulas.lift(4000, 2).value, 8000)
  assert.equal(HelicopterFormulas.maxspeed(250, 1).value, 250)
  assert.equal(HelicopterFormulas.bladecount(4, 0).value, 4)
  assert.equal(HelicopterFormulas.bladeorderings(4).value, 24)
  assert.equal(HelicopterFormulas.ceiling(5000, 1).value, 5000)
  assert.equal(HelicopterFormulas.autorotationrate(600, 10).value, 60)
  assert.equal(HelicopterFormulas.powerkw(1000, 1).value, 1000)
  assert.equal(HelicopterFormulas.rotordiameter(16, 1).dst, 'aerospace')
  assert.equal(hexFamiliesOf().get('helicopter')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'helicopter', program: ['rotordiameter'], params: [16, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16, `helicopter.rotordiameter at ${uuid}`)
  uuidReceiptOf('helicopter rotordiameter', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rotordiameter 16, lift 8000, maxspeed 250, bladecount 4, bladeorderings 24, ceiling 5000, autorotationrate 60, powerkw 1000; crossing to aerospace')
})
