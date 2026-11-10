import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AerodynamicsFormulas } from './index.js'
import '../../mcp/families.js'

test('aerodynamics: lift, drag, ratio, reynolds, mach, thrust, pressure, stall — crossing to transport', async (t) => {
  assert.equal(AerodynamicsFormulas.lift(12, 50).value, 600, 'coefficient over area')
  assert.equal(AerodynamicsFormulas.drag(3, 50).value, 150)
  assert.equal(AerodynamicsFormulas.ratio(600, 150).value, 400, 'L/D ×100')
  assert.equal(AerodynamicsFormulas.reynolds(200, 3).value, 600)
  assert.equal(AerodynamicsFormulas.mach(680, 340).value, 200, 'Mach ×100')
  assert.equal(AerodynamicsFormulas.thrust(1000, 9).value, 9000)
  assert.equal(AerodynamicsFormulas.pressure(1000, 50).value, 20)
  assert.equal(AerodynamicsFormulas.stall(3000, 50).value, 60, 'wing loading')
  assert.equal(AerodynamicsFormulas.lift(12, 50).dst, 'transport')
  assert.equal(hexFamiliesOf().get('aerodynamics')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'aerodynamics', program: ['ratio'], params: [600, 150] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `aerodynamics.ratio at ${uuid}`)
  uuidReceiptOf('aerodynamics ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; lift 600, drag 150, ratio 400, reynolds 600, mach 200, thrust 9000, pressure 20, stall 60; crossing to transport')
})
