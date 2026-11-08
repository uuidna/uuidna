import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ProjectileFormulas } from './index.js'

/** projectile: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('projectile: range, height, time, velocity, angle, impact, arc, combos', async (t) => {
  assert.equal(ProjectileFormulas.range(50, 4).value, 200, 'range(50, 4)')
  assert.equal(ProjectileFormulas.height(500, 10).value, 50, 'height(500, 10)')
  assert.equal(ProjectileFormulas.time(100, 10).value, 10, 'time(100, 10)')
  assert.equal(ProjectileFormulas.velocity(20, 3).value, 60, 'velocity(20, 3)')
  assert.equal(ProjectileFormulas.angle(90, 45).value, 45, 'angle(90, 45)')
  assert.equal(ProjectileFormulas.impact(30, 2).value, 60, 'impact(30, 2)')
  assert.equal(ProjectileFormulas.arc(45, 45).value, 90, 'arc(45, 45)')
  assert.equal(ProjectileFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('projectile')?.length, 8)
  for (const [name, params, expected] of [["range",[50,4],200],["height",[500,10],50],["time",[100,10],10]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'projectile', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `projectile.${name} at ${uuid}`)
    uuidReceiptOf(`projectile ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "range=200, height=50, time=10")
})
