import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { WebsiteFormulas } from './index.js'
import '../../mcp/families.js'

/** Coverage of payloadcms/website is exact; survey() is a live reading (reads the website), registered-live, not called here. */
test('website: use-all-of-payloadcms/website coverage — coverage, gap, parity, per-aspect', async (t) => {
  assert.equal(WebsiteFormulas.coverage(30, 30).value, 100, 'every block used')
  assert.equal(WebsiteFormulas.coverage(24, 30).value, 80)
  assert.equal(WebsiteFormulas.gap(26, 30).value, 4, 'four of the website surface left to use')
  assert.equal(WebsiteFormulas.gap(30, 30).value, 0)
  assert.equal(WebsiteFormulas.parity(31, 30).value, 1, 'the unit covers all the website and more')
  assert.equal(WebsiteFormulas.parity(28, 30).value, 0)
  assert.equal(WebsiteFormulas.blocks(30, 30).value, 100)
  assert.equal(WebsiteFormulas.collections(12, 12).value, 100)
  assert.equal(WebsiteFormulas.plugins(16, 12).value, 133, 'the unit fuses more than the website names')
  assert.equal(WebsiteFormulas.dirs(21, 21).value, 100)
  // survey() is live (async → live reading)
  const s = hexFamiliesOf().get('website')?.find((x) => x.name === 'survey')
  assert.ok(s?.live === true, 'survey() reads payloadcms/website live')
  assert.equal(WebsiteFormulas.coverage(30, 30).dst, 'payload')
  assert.equal(hexFamiliesOf().get('website')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'website', program: ['gap'], params: [26, 30] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `website.gap at ${uuid}`)
  uuidReceiptOf('website gap', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; coverage 100/80, gap 4, parity 1, blocks 100, collections 100, plugins 133, dirs 100; survey() live over payloadcms/website')
})
