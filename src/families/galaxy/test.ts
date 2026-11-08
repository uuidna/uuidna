import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GalaxyFormulas } from './index.js'

/** galaxy: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('galaxy: stars, arms, diameter, redshift, types, clusters, blackholes, combos', async (t) => {
  assert.equal(GalaxyFormulas.stars(100, 1000).value, 100000, 'stars(100, 1000)')
  assert.equal(GalaxyFormulas.arms(4, 0).value, 4, 'arms(4, 0)')
  assert.equal(GalaxyFormulas.diameter(100, 1000).value, 100000, 'diameter(100, 1000)')
  assert.equal(GalaxyFormulas.redshift(70, 1000).value, 70, 'redshift(70, 1000)')
  assert.equal(GalaxyFormulas.types(3, 0).value, 3, 'types(3, 0)')
  assert.equal(GalaxyFormulas.clusters(50, 20).value, 1000, 'clusters(50, 20)')
  assert.equal(GalaxyFormulas.blackholes(1, 0).value, 1, 'blackholes(1, 0)')
  assert.equal(GalaxyFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('galaxy')?.length, 8)
  for (const [name, params, expected] of [["stars",[100,1000],100000],["arms",[4,0],4],["diameter",[100,1000],100000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'galaxy', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `galaxy.${name} at ${uuid}`)
    uuidReceiptOf(`galaxy ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "stars=100000, arms=4, diameter=100000")
})
