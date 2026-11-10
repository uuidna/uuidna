import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PlanetFormulas } from './index.js'

/** planet: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('planet: orbit, moons, radius, gravity, axialtilt, day, rings, combos', async (t) => {
  assert.equal(PlanetFormulas.orbit(365, 1).value, 365, 'orbit(365, 1)')
  assert.equal(PlanetFormulas.moons(2, 0).value, 2, 'moons(2, 0)')
  assert.equal(PlanetFormulas.radius(6371, 1).value, 6371, 'radius(6371, 1)')
  assert.equal(PlanetFormulas.gravity(98, 10).value, 9, 'gravity(98, 10)')
  assert.equal(PlanetFormulas.axialtilt(90, 23).value, 67, 'axialtilt(90, 23)')
  assert.equal(PlanetFormulas.day(24, 1).value, 24, 'day(24, 1)')
  assert.equal(PlanetFormulas.rings(0, 1).value, 1, 'rings(0, 1)')
  assert.equal(PlanetFormulas.combos(8, 2).value, 28, 'combos(8, 2)')
  assert.equal(hexFamiliesOf().get('planet')?.length, 8)
  for (const [name, params, expected] of [["orbit",[365,1],365],["moons",[2,0],2],["radius",[6371,1],6371]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'planet', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `planet.${name} at ${uuid}`)
    uuidReceiptOf(`planet ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "orbit=365, moons=2, radius=6371")
})
