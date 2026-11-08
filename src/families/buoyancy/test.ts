import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BuoyancyFormulas } from './index.js'

/** buoyancy: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('buoyancy: force, displaced, density, volume, weight, margin, floats, combos', async (t) => {
  assert.equal(BuoyancyFormulas.force(1000, 9).value, 9000, 'force(1000, 9)')
  assert.equal(BuoyancyFormulas.displaced(100, 10).value, 1000, 'displaced(100, 10)')
  assert.equal(BuoyancyFormulas.density(1000, 1).value, 1000, 'density(1000, 1)')
  assert.equal(BuoyancyFormulas.volume(10, 5, 2).value, 100, 'volume(10, 5, 2)')
  assert.equal(BuoyancyFormulas.weight(500, 9).value, 4500, 'weight(500, 9)')
  assert.equal(BuoyancyFormulas.margin(1000, 800).value, 200, 'margin(1000, 800)')
  assert.equal(BuoyancyFormulas.floats(1000, 800).value, 1, 'floats(1000, 800)')
  assert.equal(BuoyancyFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('buoyancy')?.length, 8)
  for (const [name, params, expected] of [["force",[1000,9],9000],["displaced",[100,10],1000],["density",[1000,1],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'buoyancy', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `buoyancy.${name} at ${uuid}`)
    uuidReceiptOf(`buoyancy ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "force=9000, displaced=1000, density=1000")
})
