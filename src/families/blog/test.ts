import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BlogFormulas } from './index.js'
import '../../mcp/families.js'

test('blog: readtime, excerpt, categories, pagination, slug, related, freshness, series — crossing to frontend', async (t) => {
  assert.equal(BlogFormulas.readtime(1000, 200).value, 5, 'five minutes at 200 wpm')
  assert.equal(BlogFormulas.excerpt(140, 160).value, 1, 'fits the excerpt')
  assert.equal(BlogFormulas.excerpt(200, 160).value, 0)
  assert.equal(BlogFormulas.categories(100, 8).value, 12, 'posts per category')
  assert.equal(BlogFormulas.pagination(95, 10).value, 10, 'ten pages')
  assert.equal(BlogFormulas.slug(12, 4).value, 8)
  assert.equal(BlogFormulas.related(3, 10).value, 30)
  assert.equal(BlogFormulas.freshness(1000, 850).value, 150)
  assert.equal(BlogFormulas.series(7).value, 7, 'seven parts')
  assert.equal(BlogFormulas.readtime(1000, 200).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('blog')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'blog', program: ['pagination'], params: [95, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `blog.pagination at ${uuid}`)
  uuidReceiptOf('blog pagination', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; readtime 5, excerpt 1, categories 12, pagination 10, slug 8, related 30, freshness 150, series 7; crossing to frontend')
})
