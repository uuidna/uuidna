import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ContentFormulas } from './index.js'
import '../../mcp/families.js'

test('content: blocks, reuse, media, sections, depth, words, toc, richtext — crossing to payload', async (t) => {
  assert.equal(ContentFormulas.blocks(5).value, 5, 'five blocks compose the page')
  assert.equal(ContentFormulas.reuse(3, 10).value, 30)
  assert.equal(ContentFormulas.media(4, 10).value, 40)
  assert.equal(ContentFormulas.sections(6).value, 6)
  assert.equal(ContentFormulas.depth(3).value, 3)
  assert.equal(ContentFormulas.words(600, 6).value, 100, 'words at six chars each')
  assert.equal(ContentFormulas.toc(8).value, 8)
  assert.equal(ContentFormulas.richtext(1000, 20).value, 50, 'words per block')
  assert.equal(ContentFormulas.blocks(5).dst, 'payload')
  assert.equal(hexFamiliesOf().get('content')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'content', program: ['richtext'], params: [1000, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `content.richtext at ${uuid}`)
  uuidReceiptOf('content richtext', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; blocks 5, reuse 30, media 40, sections 6, depth 3, words 100, toc 8, richtext 50; crossing to payload')
})
