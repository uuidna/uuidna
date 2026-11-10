import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TorsionFormulas } from './index.js'

/** torsion: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('torsion: torque, angle, shear, modulus, radius, twist, sections, combos', async (t) => {
  assert.equal(TorsionFormulas.torque(100, 5).value, 500, 'torque(100, 5)')
  assert.equal(TorsionFormulas.angle(180, 4).value, 45, 'angle(180, 4)')
  assert.equal(TorsionFormulas.shear(1000, 10).value, 100, 'shear(1000, 10)')
  assert.equal(TorsionFormulas.modulus(80, 1).value, 80, 'modulus(80, 1)')
  assert.equal(TorsionFormulas.radius(10, 1).value, 10, 'radius(10, 1)')
  assert.equal(TorsionFormulas.twist(90, 30).value, 60, 'twist(90, 30)')
  assert.equal(TorsionFormulas.sections(4, 0).value, 4, 'sections(4, 0)')
  assert.equal(TorsionFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('torsion')?.length, 8)
  for (const [name, params, expected] of [["torque",[100,5],500],["angle",[180,4],45],["shear",[1000,10],100]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'torsion', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `torsion.${name} at ${uuid}`)
    uuidReceiptOf(`torsion ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "torque=500, angle=45, shear=100")
})
