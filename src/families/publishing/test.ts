import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PublishingFormulas } from './index.js'
import '../../mcp/families.js'

test('publishing: royalty, pages, margin, print, returns, readership, backlist, impact — crossing to content', async (t) => {
  assert.equal(PublishingFormulas.royalty(10000, 12).value, 1200, 'twelve percent of sales')
  assert.equal(PublishingFormulas.pages(90000, 300).value, 300)
  assert.equal(PublishingFormulas.margin(1000, 400).value, 60, 'sixty percent margin')
  assert.equal(PublishingFormulas.print(5000, 16).value, 80000)
  assert.equal(PublishingFormulas.returns(150, 1000).value, 15, 'fifteen percent returned')
  assert.equal(PublishingFormulas.readership(30000, 10000).value, 3, 'three readers per copy')
  assert.equal(PublishingFormulas.backlist(80, 200).value, 40, 'forty percent still live')
  assert.equal(PublishingFormulas.impact(1200, 100).value, 12, 'twelve citations per paper')
  assert.equal(PublishingFormulas.royalty(10000, 12).dst, 'content')
  assert.equal(hexFamiliesOf().get('publishing')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'publishing', program: ['margin'], params: [1000, 400] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `publishing.margin at ${uuid}`)
  uuidReceiptOf('publishing margin', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; royalty 1200, pages 300, margin 60, print 80000, returns 15, readership 3, backlist 40, impact 12; crossing to content')
})
