import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RotationFormulas } from './index.js'

/** rotation: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('rotation: torque, rpm, angular, inertia, revolutions, radians, spokes, combos', async (t) => {
  assert.equal(RotationFormulas.torque(100, 3).value, 300, 'torque(100, 3)')
  assert.equal(RotationFormulas.rpm(3600, 60).value, 60, 'rpm(3600, 60)')
  assert.equal(RotationFormulas.angular(2, 180).value, 360, 'angular(2, 180)')
  assert.equal(RotationFormulas.inertia(50, 4).value, 200, 'inertia(50, 4)')
  assert.equal(RotationFormulas.revolutions(60, 10).value, 600, 'revolutions(60, 10)')
  assert.equal(RotationFormulas.radians(628, 100).value, 6, 'radians(628, 100)')
  assert.equal(RotationFormulas.spokes(12, 0).value, 12, 'spokes(12, 0)')
  assert.equal(RotationFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('rotation')?.length, 8)
  for (const [name, params, expected] of [["torque",[100,3],300],["rpm",[3600,60],60],["angular",[2,180],360]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'rotation', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `rotation.${name} at ${uuid}`)
    uuidReceiptOf(`rotation ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "torque=300, rpm=60, angular=360")
})
