import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { StarFormulas } from './index.js'

/** star: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('star: luminosity, magnitude, parsecs, mass, classes, lifetime, radius, combos', async (t) => {
  assert.equal(StarFormulas.luminosity(4, 100).value, 400, 'luminosity(4, 100)')
  assert.equal(StarFormulas.magnitude(15, 5).value, 10, 'magnitude(15, 5)')
  assert.equal(StarFormulas.parsecs(3260, 1000).value, 3, 'parsecs(3260, 1000)')
  assert.equal(StarFormulas.mass(2, 1).value, 2, 'mass(2, 1)')
  assert.equal(StarFormulas.classes(7, 0).value, 7, 'classes(7, 0)')
  assert.equal(StarFormulas.lifetime(10, 1000).value, 10000, 'lifetime(10, 1000)')
  assert.equal(StarFormulas.radius(7, 100).value, 700, 'radius(7, 100)')
  assert.equal(StarFormulas.combos(7, 2).value, 21, 'combos(7, 2)')
  assert.equal(hexFamiliesOf().get('star')?.length, 8)
  for (const [name, params, expected] of [["luminosity",[4,100],400],["magnitude",[15,5],10],["parsecs",[3260,1000],3]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'star', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `star.${name} at ${uuid}`)
    uuidReceiptOf(`star ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "luminosity=400, magnitude=10, parsecs=3")
})
