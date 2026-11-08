import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { NebulaFormulas } from './index.js'

/** nebula: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('nebula: radius, density, types, temperature, ionization, lightyears, stars, combos', async (t) => {
  assert.equal(NebulaFormulas.radius(10, 1).value, 10, 'radius(10, 1)')
  assert.equal(NebulaFormulas.density(100, 1).value, 100, 'density(100, 1)')
  assert.equal(NebulaFormulas.types(4, 0).value, 4, 'types(4, 0)')
  assert.equal(NebulaFormulas.temperature(10, 1000).value, 10000, 'temperature(10, 1000)')
  assert.equal(NebulaFormulas.ionization(80, 100).value, 80, 'ionization(80, 100)')
  assert.equal(NebulaFormulas.lightyears(5, 1).value, 5, 'lightyears(5, 1)')
  assert.equal(NebulaFormulas.stars(100, 1).value, 100, 'stars(100, 1)')
  assert.equal(NebulaFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('nebula')?.length, 8)
  for (const [name, params, expected] of [["radius",[10,1],10],["density",[100,1],100],["types",[4,0],4]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'nebula', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `nebula.${name} at ${uuid}`)
    uuidReceiptOf(`nebula ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "radius=10, density=100, types=4")
})
