import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HighlightsFormulas } from './index.js'
import '../../mcp/families.js'

test('highlights: items, active, scroll, reveal, sticky, parallax, duration, threshold — crossing to frontend', async (t) => {
  assert.equal(HighlightsFormulas.items(5).value, 5, 'five highlights on the page')
  assert.equal(HighlightsFormulas.active(3, 10).value, 30)
  assert.equal(HighlightsFormulas.scroll(250, 1000).value, 25)
  assert.equal(HighlightsFormulas.reveal(2, 8).value, 25)
  assert.equal(HighlightsFormulas.sticky(80).value, 80)
  assert.equal(HighlightsFormulas.parallax(50, 200).value, 100, 'parallax shift')
  assert.equal(HighlightsFormulas.duration(400).value, 400)
  assert.equal(HighlightsFormulas.threshold(50).value, 50)
  assert.equal(HighlightsFormulas.items(5).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('highlights')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'highlights', program: ['active'], params: [3, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 30, `highlights.active at ${uuid}`)
  uuidReceiptOf('highlights active', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; items 5, active 30, scroll 25, reveal 25, sticky 80, parallax 100, duration 400, threshold 50; crossing to frontend')
})
