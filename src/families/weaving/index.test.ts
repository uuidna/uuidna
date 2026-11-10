import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WeavingFormulas } from './index.js'
import '../../mcp/families.js'

test('weaving: threadcount, warp, weft, density, cover, pickrate, width, gsm — crossing to materials', async (t) => {
  assert.equal(WeavingFormulas.threadcount(80, 60).value, 140, 'warp ends plus weft picks')
  assert.equal(WeavingFormulas.warp(800, 10).value, 80)
  assert.equal(WeavingFormulas.weft(600, 10).value, 60)
  assert.equal(WeavingFormulas.density(80, 60).value, 4800, 'the crossings of warp and weft')
  assert.equal(WeavingFormulas.cover(28, 56).value, 50)
  assert.equal(WeavingFormulas.pickrate(6000, 60).value, 100, 'picks per minute')
  assert.equal(WeavingFormulas.width(800, 80).value, 10)
  assert.equal(WeavingFormulas.gsm(50, 2500).value, 200)
  assert.equal(WeavingFormulas.threadcount(80, 60).dst, 'materials')
  assert.equal(hexFamiliesOf().get('weaving')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'weaving', program: ['density'], params: [80, 60] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4800, `weaving.density at ${uuid}`)
  uuidReceiptOf('weaving density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; threadcount 140, warp 80, weft 60, density 4800, cover 50, pickrate 100, width 10, gsm 200; crossing to materials')
})
