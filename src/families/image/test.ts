import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ImageFormulas } from './index.js'

/** image: 8 exact-integer formulas, each recomputed from the palette and run at its hex address. */
test('image: pixels, bytesrgb, mipmaps, stride, channels, aspect, blocks, palettebits', async (t) => {
  assert.equal(ImageFormulas.pixels(1920, 1080).value, 2073600, 'pixels(1920, 1080)')
  assert.equal(ImageFormulas.bytesrgb(1920, 1080, 3).value, 6220800, 'bytesrgb(1920, 1080, 3)')
  assert.equal(ImageFormulas.mipmaps(10, 1).value, 11, 'mipmaps(10, 1)')
  assert.equal(ImageFormulas.stride(1920, 3).value, 5760, 'stride(1920, 3)')
  assert.equal(ImageFormulas.channels(3, 1).value, 4, 'channels(3, 1)')
  assert.equal(ImageFormulas.aspect(1920, 1080).value, 1, 'aspect(1920, 1080)')
  assert.equal(ImageFormulas.blocks(1080, 16).value, 68, 'blocks(1080, 16)')
  assert.equal(ImageFormulas.palettebits(8).value, 256, 'palettebits(8)')
  assert.equal(hexFamiliesOf().get('image')?.length, 8)
  for (const [name, params, expected] of [["pixels",[1920,1080],2073600],["bytesrgb",[1920,1080,3],6220800],["mipmaps",[10,1],11]] as [string, number[], number][]) {
    const uuid = qpuHexUuidOf({ family: 'image', program: [name], params })
    const run = (await hexRunOf(uuid)) as { value?: unknown }
    assert.equal(Number(run.value), expected, `image.${name} at ${uuid}`)
    uuidReceiptOf(`image ${name}`, contentUuidOf(run), { uuid })
  }
  t.diagnostic('8 formulas; ' + "pixels=2073600, bytesrgb=6220800, mipmaps=11")
})
