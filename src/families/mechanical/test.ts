import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MechanicalFormulas } from './index.js'
import '../../mcp/families.js'

test('mechanical: torque, power, stress, strain, gear, efficiency, thermal, spring — crossing to materials', async (t) => {
  assert.equal(MechanicalFormulas.torque(100, 5).value, 500, 'a force at a radius')
  assert.equal(MechanicalFormulas.power(9549, 1000).value, 1000, 'kW proxy')
  assert.equal(MechanicalFormulas.stress(1000, 20).value, 50)
  assert.equal(MechanicalFormulas.strain(5, 1000).value, 5, 'per mille')
  assert.equal(MechanicalFormulas.gear(60, 20).value, 300, 'a 3:1 reduction')
  assert.equal(MechanicalFormulas.efficiency(80, 100).value, 80)
  assert.equal(MechanicalFormulas.thermal(1000, 25).value, 40)
  assert.equal(MechanicalFormulas.spring(500, 10).value, 50, 'spring rate')
  assert.equal(MechanicalFormulas.torque(100, 5).dst, 'materials')
  assert.equal(hexFamiliesOf().get('mechanical')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mechanical', program: ['torque'], params: [100, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 500, `mechanical.torque at ${uuid}`)
  uuidReceiptOf('mechanical torque', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; torque 500, power 1000, stress 50, strain 5, gear 300, efficiency 80, thermal 40, spring 50; crossing to materials')
})
