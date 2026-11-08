import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MediaFormulas } from './index.js'
import '../../mcp/families.js'

test('media: aspect, gallery, lazy, caption, sizes, fit, load, ratio — crossing to payload', async (t) => {
  assert.equal(MediaFormulas.aspect(1600, 900).value, 177, 'width over height as a percentage')
  assert.equal(MediaFormulas.gallery(10, 3).value, 4, 'four rows for the items')
  assert.equal(MediaFormulas.lazy(6, 10).value, 60)
  assert.equal(MediaFormulas.caption(80, 120).value, 1, 'caption fits')
  assert.equal(MediaFormulas.caption(200, 120).value, 0)
  assert.equal(MediaFormulas.sizes(5).value, 5)
  assert.equal(MediaFormulas.fit(800, 1000).value, 80)
  assert.equal(MediaFormulas.load(10000, 500).value, 20, 'seconds to load')
  assert.equal(MediaFormulas.ratio(1600, 900).value, 1, 'landscape')
  assert.equal(MediaFormulas.ratio(900, 1600).value, 0)
  assert.equal(MediaFormulas.aspect(1600, 900).dst, 'payload')
  assert.equal(hexFamiliesOf().get('media')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'media', program: ['gallery'], params: [10, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `media.gallery at ${uuid}`)
  uuidReceiptOf('media gallery', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; aspect 177, gallery 4, lazy 60, caption 1, sizes 5, fit 80, load 20, ratio 1; crossing to payload')
})
