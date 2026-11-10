import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PulleyFormulas } from './index.js'

/** pulley: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('pulley: ratio, effort, wheels, load, segments, advantage, tension, combos', async (t) => {
  assert.equal(PulleyFormulas.ratio(400, 100).value, 4, 'ratio(400, 100)')
  assert.equal(PulleyFormulas.effort(1000, 4).value, 250, 'effort(1000, 4)')
  assert.equal(PulleyFormulas.wheels(4, 0).value, 4, 'wheels(4, 0)')
  assert.equal(PulleyFormulas.load(250, 4).value, 1000, 'load(250, 4)')
  assert.equal(PulleyFormulas.segments(4, 1).value, 4, 'segments(4, 1)')
  assert.equal(PulleyFormulas.advantage(400, 100).value, 4, 'advantage(400, 100)')
  assert.equal(PulleyFormulas.tension(1000, 4).value, 250, 'tension(1000, 4)')
  assert.equal(PulleyFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('pulley')?.length, 8)
  for (const [name, params, expected] of [["ratio",[400,100],4],["effort",[1000,4],250],["wheels",[4,0],4]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'pulley', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `pulley.${name} at ${uuid}`)
    uuidReceiptOf(`pulley ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "ratio=4, effort=250, wheels=4")
})
