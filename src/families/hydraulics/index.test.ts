import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HydraulicsFormulas } from './index.js'
import '../../mcp/families.js'

test('hydraulics: pressure, flow, force, velocity, head, power, reynolds, lift — crossing to hydrology', async (t) => {
  assert.equal(HydraulicsFormulas.pressure(1000, 20).value, 50, 'force over area')
  assert.equal(HydraulicsFormulas.flow(20, 3).value, 60, 'continuity Q = A · v')
  assert.equal(HydraulicsFormulas.force(50, 20).value, 1000, "Pascal's law")
  assert.equal(HydraulicsFormulas.velocity(60, 20).value, 3)
  assert.equal(HydraulicsFormulas.head(1000, 10).value, 100)
  assert.equal(HydraulicsFormulas.power(60, 100).value, 6000)
  assert.equal(HydraulicsFormulas.reynolds(3, 50).value, 150, 'Reynolds proxy')
  assert.equal(HydraulicsFormulas.lift(100, 8).value, 800, 'press multiplier')
  assert.equal(HydraulicsFormulas.pressure(1000, 20).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('hydraulics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hydraulics', program: ['flow'], params: [20, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `hydraulics.flow at ${uuid}`)
  uuidReceiptOf('hydraulics flow', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pressure 50, flow 60, force 1000, velocity 3, head 100, power 6000, reynolds 150, lift 800; crossing to hydrology')
})
