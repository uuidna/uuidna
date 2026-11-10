import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EquineFormulas } from './index.js'
import '../../mcp/families.js'

test('equine: speed, stride, heartrate, bodycondition, gestation, feedratio, height, recovery — crossing to vet', async (t) => {
  assert.equal(EquineFormulas.speed(100, 10).value, 10, 'ground covered per second')
  assert.equal(EquineFormulas.stride(600, 4).value, 150)
  assert.equal(EquineFormulas.heartrate(240, 5).value, 48, 'beats per minute')
  assert.equal(EquineFormulas.bodycondition(5).value, 5)
  assert.equal(EquineFormulas.gestation(340).value, 340)
  assert.equal(EquineFormulas.feedratio(15, 20).value, 75, 'forage share of the ration')
  assert.equal(EquineFormulas.height(16).value, 16)
  assert.equal(EquineFormulas.recovery(40, 120).value, 80)
  assert.equal(EquineFormulas.recovery(120, 40).value, 0, 'never below zero')
  assert.equal(EquineFormulas.speed(100, 10).dst, 'vet')
  assert.equal(hexFamiliesOf().get('equine')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'equine', program: ['speed'], params: [100, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `equine.speed at ${uuid}`)
  uuidReceiptOf('equine speed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; speed 10, stride 150, heartrate 48, bodycondition 5, gestation 340, feedratio 75, height 16, recovery 80; crossing to vet')
})
