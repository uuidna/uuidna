import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SubmarineFormulas } from './index.js'
import '../../mcp/families.js'

test('submarine: depth, pressure, buoyancy, displacement, ballasttanks, sonarrange, crushdepth, trimangle — crossing to physics', async (t) => {
  assert.equal(SubmarineFormulas.depth(300, 1).value, 300)
  assert.equal(SubmarineFormulas.pressure(30, 1).value, 30)
  assert.equal(SubmarineFormulas.buoyancy(1000, 980).value, 20)
  assert.equal(SubmarineFormulas.displacement(8000, 1).value, 8000)
  assert.equal(SubmarineFormulas.ballasttanks(10, 0).value, 10)
  assert.equal(SubmarineFormulas.sonarrange(20, 1000).value, 20000)
  assert.equal(SubmarineFormulas.crushdepth(700, 1).value, 700)
  assert.equal(SubmarineFormulas.trimangle(300, 10).value, 30)
  assert.equal(SubmarineFormulas.depth(300, 1).dst, 'physics')
  assert.equal(hexFamiliesOf().get('submarine')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'submarine', program: ['depth'], params: [300, 1] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `submarine.depth at ${uuid}`)
  uuidReceiptOf('submarine depth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 300, pressure 30, buoyancy 20, displacement 8000, ballasttanks 10, sonarrange 20000, crushdepth 700, trimangle 30; crossing to physics')
})
