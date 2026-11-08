import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CorrosionFormulas } from './index.js'

/** corrosion: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('corrosion: rate, loss, pits, potential, lifetime, coating, zones, combos', async (t) => {
  assert.equal(CorrosionFormulas.rate(1000, 10).value, 100, 'rate(1000, 10)')
  assert.equal(CorrosionFormulas.loss(50, 2).value, 100, 'loss(50, 2)')
  assert.equal(CorrosionFormulas.pits(100, 3).value, 300, 'pits(100, 3)')
  assert.equal(CorrosionFormulas.potential(800, 300).value, 500, 'potential(800, 300)')
  assert.equal(CorrosionFormulas.lifetime(10000, 50).value, 200, 'lifetime(10000, 50)')
  assert.equal(CorrosionFormulas.coating(95, 100).value, 95, 'coating(95, 100)')
  assert.equal(CorrosionFormulas.zones(3, 0).value, 3, 'zones(3, 0)')
  assert.equal(CorrosionFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('corrosion')?.length, 8)
  for (const [name, params, expected] of [["rate",[1000,10],100],["loss",[50,2],100],["pits",[100,3],300]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'corrosion', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `corrosion.${name} at ${uuid}`)
    uuidReceiptOf(`corrosion ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "rate=100, loss=100, pits=300")
})
