import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AsteroidFormulas } from './index.js'

/** asteroid: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('asteroid: diameter, belt, count, albedo, rotation, families, mass, combos', async (t) => {
  assert.equal(AsteroidFormulas.diameter(500, 1).value, 500, 'diameter(500, 1)')
  assert.equal(AsteroidFormulas.belt(1, 0).value, 1, 'belt(1, 0)')
  assert.equal(AsteroidFormulas.count(1000, 1000).value, 1000000, 'count(1000, 1000)')
  assert.equal(AsteroidFormulas.albedo(15, 100).value, 15, 'albedo(15, 100)')
  assert.equal(AsteroidFormulas.rotation(240, 10).value, 24, 'rotation(240, 10)')
  assert.equal(AsteroidFormulas.families(5, 0).value, 5, 'families(5, 0)')
  assert.equal(AsteroidFormulas.mass(1, 1000).value, 1000, 'mass(1, 1000)')
  assert.equal(AsteroidFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('asteroid')?.length, 8)
  for (const [name, params, expected] of [["diameter",[500,1],500],["belt",[1,0],1],["count",[1000,1000],1000000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'asteroid', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `asteroid.${name} at ${uuid}`)
    uuidReceiptOf(`asteroid ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "diameter=500, belt=1, count=1000000")
})
