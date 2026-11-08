import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SeoFormulas } from './index.js'
import '../../mcp/families.js'

/** URL hygiene scored, and the Google test registered. The live google() is not called here (it is a network reading);
 *  the pure formulas are exact. */
test('seo: no useless prefix, shallow depth, clean slug — and the Google test is live', async (t) => {
  assert.equal(SeoFormulas.prefix(1, 1).value, 0, 'content at its slug: no useless prefix')
  assert.equal(SeoFormulas.prefix(3, 1).value, 2, 'two dead prefix segments')
  assert.equal(SeoFormulas.prefix(1, 1).holds, true)
  assert.equal(SeoFormulas.prefix(3, 1).holds, false, 'a useless prefix does not hold')
  assert.equal(SeoFormulas.depth(2).holds, true)
  assert.equal(SeoFormulas.depth(5).holds, false, 'too deep')
  assert.equal(SeoFormulas.slug(5, 2).value, 3)
  assert.equal(SeoFormulas.canonical(1).value, 1)
  assert.equal(SeoFormulas.canonical(3).value, 0)
  assert.equal(SeoFormulas.redirect(1).value, 1)
  assert.equal(SeoFormulas.redirect(4).value, 0, 'a redirect chain')
  assert.equal(SeoFormulas.title(55).value, 1)
  assert.equal(SeoFormulas.title(80).value, 0)
  assert.equal(SeoFormulas.meta(150).value, 1)
  assert.equal(SeoFormulas.crawl(95, 100).value, 95)
  // the live google() is registered as a live reading (async → live)
  const g = hexFamiliesOf().get('seo')?.find((f) => f.name === 'google')
  assert.ok(g?.live === true, 'seo.google is a live reading (Google PageSpeed Insights)')
  assert.equal(SeoFormulas.prefix(1, 1).dst, 'cross')
  assert.equal(hexFamiliesOf().get('seo')?.length, 9)
  const uuid = qpuHexUuidOf({ family: 'seo', program: ['slug'], params: [5, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `seo.slug at ${uuid}`)
  uuidReceiptOf('seo slug', contentUuidOf(run), { uuid })
  t.diagnostic('9 formulas; prefix 0 clean / 2 dead, depth ≤3, slug 3, canonical 1, redirect 1, title/meta within limits, crawl 95; google() live at PageSpeed Insights')
})
