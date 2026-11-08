import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ColorFormulas } from './index.js'

/** color: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('color: channels, depth, palette, levels, hexdigits, gradient, contrast, pairs', async (t) => {
  assert.equal(ColorFormulas.channels(3, 1).value, 4, 'channels(3, 1)')
  assert.equal(ColorFormulas.depth(8, 3).value, 24, 'depth(8, 3)')
  assert.equal(ColorFormulas.palette(8).value, 256, 'palette(8)')
  assert.equal(ColorFormulas.levels(8).value, 256, 'levels(8)')
  assert.equal(ColorFormulas.hexdigits(2, 3).value, 6, 'hexdigits(2, 3)')
  assert.equal(ColorFormulas.gradient(16, 0).value, 16, 'gradient(16, 0)')
  assert.equal(ColorFormulas.contrast(255, 16).value, 239, 'contrast(255, 16)')
  assert.equal(ColorFormulas.pairs(8, 2).value, 28, 'pairs(8, 2)')
  assert.equal(hexFamiliesOf().get('color')?.length, 8)
  for (const [name, params, expected] of [["channels",[3,1],4],["depth",[8,3],24],["palette",[8],256]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'color', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `color.${name} at ${uuid}`)
    uuidReceiptOf(`color ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "channels=4, depth=24, palette=256")
})
