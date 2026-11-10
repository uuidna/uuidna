import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GliderFormulas } from './index.js'
import '../../mcp/families.js'

test('glider: glideratio, sinkrate, wingspan, aspectratio, stallspeed, liftdragpairs, thermalgain, range — crossing to aerospace', async (t) => {
  assert.equal(GliderFormulas.glideratio(400, 10).value, 40)
  assert.equal(GliderFormulas.sinkrate(100, 100).value, 1)
  assert.equal(GliderFormulas.wingspan(15, 1).value, 15)
  assert.equal(GliderFormulas.aspectratio(225, 15).value, 15)
  assert.equal(GliderFormulas.stallspeed(60, 1).value, 60)
  assert.equal(GliderFormulas.liftdragpairs(8, 2).value, 28)
  assert.equal(GliderFormulas.thermalgain(2000, 1500).value, 500)
  assert.equal(GliderFormulas.range(40, 1000).value, 40000)
  assert.equal(GliderFormulas.glideratio(400, 10).dst, 'aerospace')
  assert.equal(hexFamiliesOf().get('glider')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'glider', program: ['glideratio'], params: [400, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `glider.glideratio at ${uuid}`)
  uuidReceiptOf('glider glideratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; glideratio 40, sinkrate 1, wingspan 15, aspectratio 15, stallspeed 60, liftdragpairs 28, thermalgain 500, range 40000; crossing to aerospace')
})
