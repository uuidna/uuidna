import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BufferFormulas } from './index.js'

/** buffer: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('buffer: size, slots, watermark, overflow, ring, pages, refills, combos', async (t) => {
  assert.equal(BufferFormulas.size(12).value, 4096, 'size(12)')
  assert.equal(BufferFormulas.slots(4096, 64).value, 64, 'slots(4096, 64)')
  assert.equal(BufferFormulas.watermark(75, 100).value, 75, 'watermark(75, 100)')
  assert.equal(BufferFormulas.overflow(5000, 4096).value, 904, 'overflow(5000, 4096)')
  assert.equal(BufferFormulas.ring(4096, 16).value, 256, 'ring(4096, 16)')
  assert.equal(BufferFormulas.pages(10000, 4096).value, 3, 'pages(10000, 4096)')
  assert.equal(BufferFormulas.refills(100000, 4096).value, 24, 'refills(100000, 4096)')
  assert.equal(BufferFormulas.combos(6, 2).value, 15, 'combos(6, 2)')
  assert.equal(hexFamiliesOf().get('buffer')?.length, 8)
  for (const [name, params, expected] of [["size",[12],4096],["slots",[4096,64],64],["watermark",[75,100],75]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'buffer', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `buffer.${name} at ${uuid}`)
    uuidReceiptOf(`buffer ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "size=4096, slots=64, watermark=75")
})
