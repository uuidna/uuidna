import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CyclingFormulas } from './index.js'
import '../../mcp/families.js'

test('cycling: cadence, power, gearratio, speed, ftp, gradient, efficiency, distance — crossing to fitness', async (t) => {
  assert.equal(CyclingFormulas.cadence(900, 10).value, 90, 'revolutions per minute')
  assert.equal(CyclingFormulas.power(200, 5).value, 1000)
  assert.equal(CyclingFormulas.gearratio(53, 12).value, 441, 'big ring over small cog, scaled')
  assert.equal(CyclingFormulas.speed(4000, 100).value, 40)
  assert.equal(CyclingFormulas.ftp(280, 70).value, 400, 'watts per kg, scaled')
  assert.equal(CyclingFormulas.gradient(8, 100).value, 8, 'an eight percent climb')
  assert.equal(CyclingFormulas.efficiency(97, 100).value, 97)
  assert.equal(CyclingFormulas.distance(90, 7).value, 630)
  assert.equal(CyclingFormulas.cadence(900, 10).dst, 'fitness')
  assert.equal(hexFamiliesOf().get('cycling')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cycling', program: ['cadence'], params: [900, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `cycling.cadence at ${uuid}`)
  uuidReceiptOf('cycling cadence', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; cadence 90, power 1000, gearratio 441, speed 40, ftp 400, gradient 8, efficiency 97, distance 630; crossing to fitness')
})
