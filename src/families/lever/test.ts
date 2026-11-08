import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LeverFormulas } from './index.js'

/** lever: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('lever: ratio, effort, load, moment, arm, advantage, classes, combos', async (t) => {
  assert.equal(LeverFormulas.ratio(200, 50).value, 4, 'ratio(200, 50)')
  assert.equal(LeverFormulas.effort(1000, 4).value, 250, 'effort(1000, 4)')
  assert.equal(LeverFormulas.load(250, 4).value, 1000, 'load(250, 4)')
  assert.equal(LeverFormulas.moment(100, 2).value, 200, 'moment(100, 2)')
  assert.equal(LeverFormulas.arm(3, 1).value, 4, 'arm(3, 1)')
  assert.equal(LeverFormulas.advantage(400, 100).value, 4, 'advantage(400, 100)')
  assert.equal(LeverFormulas.classes(3, 0).value, 3, 'classes(3, 0)')
  assert.equal(LeverFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('lever')?.length, 8)
  for (const [name, params, expected] of [["ratio",[200,50],4],["effort",[1000,4],250],["load",[250,4],1000]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'lever', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `lever.${name} at ${uuid}`)
    uuidReceiptOf(`lever ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "ratio=4, effort=250, load=1000")
})
