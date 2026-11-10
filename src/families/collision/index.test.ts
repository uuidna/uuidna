import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CollisionFormulas } from './index.js'

/** collision: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('collision: momentum, impulse, energy, restitution, force, bodies, deltav, pairs', async (t) => {
  assert.equal(CollisionFormulas.momentum(1000, 5).value, 5000, 'momentum(1000, 5)')
  assert.equal(CollisionFormulas.impulse(500, 2).value, 1000, 'impulse(500, 2)')
  assert.equal(CollisionFormulas.energy(100, 50).value, 5000, 'energy(100, 50)')
  assert.equal(CollisionFormulas.restitution(80, 100).value, 80, 'restitution(80, 100)')
  assert.equal(CollisionFormulas.force(1000, 2).value, 500, 'force(1000, 2)')
  assert.equal(CollisionFormulas.bodies(2, 1).value, 3, 'bodies(2, 1)')
  assert.equal(CollisionFormulas.deltav(30, 10).value, 20, 'deltav(30, 10)')
  assert.equal(CollisionFormulas.pairs(8, 2).value, 28, 'pairs(8, 2)')
  assert.equal(hexFamiliesOf().get('collision')?.length, 8)
  for (const [name, params, expected] of [["momentum",[1000,5],5000],["impulse",[500,2],1000],["energy",[100,50],5000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'collision', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `collision.${name} at ${uuid}`)
    uuidReceiptOf(`collision ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "momentum=5000, impulse=1000, energy=5000")
})
