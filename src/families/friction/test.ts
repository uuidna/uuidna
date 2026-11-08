import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { FrictionFormulas } from './index.js'

/** friction: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('friction: force, coefficient, heat, distance, normal, work, surfaces, combos', async (t) => {
  assert.equal(FrictionFormulas.force(100, 1).value, 100, 'force(100, 1)')
  assert.equal(FrictionFormulas.coefficient(40, 100).value, 40, 'coefficient(40, 100)')
  assert.equal(FrictionFormulas.heat(50, 3).value, 150, 'heat(50, 3)')
  assert.equal(FrictionFormulas.distance(1000, 10).value, 100, 'distance(1000, 10)')
  assert.equal(FrictionFormulas.normal(100, 9).value, 900, 'normal(100, 9)')
  assert.equal(FrictionFormulas.work(40, 10).value, 400, 'work(40, 10)')
  assert.equal(FrictionFormulas.surfaces(2, 0).value, 2, 'surfaces(2, 0)')
  assert.equal(FrictionFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('friction')?.length, 8)
  for (const [name, params, expected] of [["force",[100,1],100],["coefficient",[40,100],40],["heat",[50,3],150]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'friction', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `friction.${name} at ${uuid}`)
    uuidReceiptOf(`friction ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "force=100, coefficient=40, heat=150")
})
