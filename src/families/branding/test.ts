import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BrandingFormulas } from './index.js'
import '../../mcp/families.js'

test('branding: awareness, recall, consistency, equity, loyalty, sentiment, reach, nps — crossing to content', async (t) => {
  assert.equal(BrandingFormulas.awareness(750, 1000).value, 75)
  assert.equal(BrandingFormulas.recall(300, 500).value, 60)
  assert.equal(BrandingFormulas.consistency(90, 120).value, 75)
  assert.equal(BrandingFormulas.equity(150, 100).value, 150, 'a 50% price premium')
  assert.equal(BrandingFormulas.loyalty(400, 1000).value, 40)
  assert.equal(BrandingFormulas.sentiment(70, 30).value, 40, 'net positive')
  assert.equal(BrandingFormulas.sentiment(30, 70).value, -40, 'net negative')
  assert.equal(BrandingFormulas.reach(8000, 10000).value, 80)
  assert.equal(BrandingFormulas.nps(60, 20).value, 40, 'net promoters')
  assert.equal(BrandingFormulas.nps(20, 60).value, -40, 'net detractors')
  assert.equal(BrandingFormulas.awareness(750, 1000).dst, 'content')
  assert.equal(hexFamiliesOf().get('branding')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'branding', program: ['awareness'], params: [750, 1000] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 75, `branding.awareness at ${uuid}`)
  uuidReceiptOf('branding awareness', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; awareness 75, recall 60, consistency 75, equity 150, loyalty 40, sentiment 40/-40, reach 80, nps 40/-40; crossing to content')
})
