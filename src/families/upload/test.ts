import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { UploadFormulas } from './index.js'
import '../../mcp/families.js'

test('upload: area, aspect, resize, quality, thumbnail, filesize, within, crop — crossing to payload', async (t) => {
  assert.equal(UploadFormulas.area(1920, 1080).value, 2073600, 'full HD pixels')
  assert.equal(UploadFormulas.aspect(1920, 1080).value, 177, '16:9 times a hundred')
  assert.equal(UploadFormulas.resize(1920, 50).value, 960, 'half width')
  assert.equal(UploadFormulas.quality(1000000, 80).value, 800000)
  assert.equal(UploadFormulas.thumbnail(150, 12).value, 1800)
  assert.equal(UploadFormulas.filesize(2073600, 24).value, 6220800, 'raw 24-bit bitmap bytes')
  assert.equal(UploadFormulas.within(500, 1000).value, 1, 'fits the limit')
  assert.equal(UploadFormulas.within(1500, 1000).value, 0)
  assert.equal(UploadFormulas.crop(750, 1000).value, 75)
  assert.equal(UploadFormulas.area(1920, 1080).dst, 'payload')
  assert.equal(hexFamiliesOf().get('upload')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'upload', program: ['resize'], params: [1920, 50] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 960, `upload.resize at ${uuid}`)
  uuidReceiptOf('upload resize', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; area 2073600, aspect 177, resize 960, quality 800000, thumbnail 1800, filesize 6220800, within 1, crop 75; crossing to payload')
})
