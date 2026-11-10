import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CernFormulas } from './index.js'
import '../../mcp/families.js'

test('cern: energygev, collisions, luminosity, detectorlayers, particlepairs, bunchspacing, tracksperevent, triggerrate — crossing to physics', async (t) => {
  assert.equal(CernFormulas.energygev(7000, 2).value, 14000)
  assert.equal(CernFormulas.collisions(40, 1000).value, 40000)
  assert.equal(CernFormulas.luminosity(60000, 100).value, 600)
  assert.equal(CernFormulas.detectorlayers(4, 3).value, 7)
  assert.equal(CernFormulas.particlepairs(12, 2).value, 66)
  assert.equal(CernFormulas.bunchspacing(25, 1).value, 25)
  assert.equal(CernFormulas.tracksperevent(100, 10).value, 1000)
  assert.equal(CernFormulas.triggerrate(40000, 40).value, 1000)
  assert.equal(CernFormulas.energygev(7000, 2).dst, 'physics')
  assert.equal(hexFamiliesOf().get('cern')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'cern', program: ['energygev'], params: [7000, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 14000, `cern.energygev at ${uuid}`)
  uuidReceiptOf('cern energygev', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; energygev 14000, collisions 40000, luminosity 600, detectorlayers 7, particlepairs 66, bunchspacing 25, tracksperevent 1000, triggerrate 1000; crossing to physics')
})
