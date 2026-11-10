import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { RasterFormulas } from './index.js'
import '../../mcp/families.js'

test('raster: pixels, dpi, filesize, aspectratio, megapixels, bitdepth, compression, scaling — crossing to optics', async (t) => {
  assert.equal(RasterFormulas.pixels(1920, 1080).value, 2073600, 'a 1080p frame')
  assert.equal(RasterFormulas.dpi(3000, 10).value, 300, 'print resolution')
  assert.equal(RasterFormulas.filesize(1000, 3).value, 3000, 'three bytes per pixel')
  assert.equal(RasterFormulas.aspectratio(1920, 1080).value, 177, '16:9 scaled by 100')
  assert.equal(RasterFormulas.megapixels(4000, 3000).value, 12, 'a twelve-megapixel sensor')
  assert.equal(RasterFormulas.bitdepth(3, 8).value, 24, 'true colour')
  assert.equal(RasterFormulas.compression(1000, 100).value, 10, 'ten to one')
  assert.equal(RasterFormulas.scaling(500, 2).value, 1000)
  assert.equal(RasterFormulas.pixels(1920, 1080).dst, 'optics')
  assert.equal(hexFamiliesOf().get('raster')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'raster', program: ['pixels'], params: [1920, 1080] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2073600, `raster.pixels at ${uuid}`)
  uuidReceiptOf('raster pixels', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pixels 2073600, dpi 300, filesize 3000, aspectratio 177, megapixels 12, bitdepth 24, compression 10, scaling 1000; crossing to optics')
})
