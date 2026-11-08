import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PaginationFormulas } from './index.js'
import '../../mcp/families.js'

test('pagination: pages, pageoffset, totalpages, itemsonpage, signatures, columns, charsperpage, pagerange — crossing to typography', async (t) => {
  assert.equal(PaginationFormulas.pages(95, 10).value, 10, 'ten pages for ninety-five items')
  assert.equal(PaginationFormulas.pageoffset(5, 20).value, 80)
  assert.equal(PaginationFormulas.totalpages(85, 10, 10).value, 10, 'pinned front-matter counted in')
  assert.equal(PaginationFormulas.itemsonpage(95, 10).value, 5, 'five on the last page')
  assert.equal(PaginationFormulas.signatures(100, 16).value, 7, 'seven folded sheets')
  assert.equal(PaginationFormulas.columns(960, 220, 20).value, 4, 'four columns to the measure')
  assert.equal(PaginationFormulas.charsperpage(66, 45).value, 2970)
  assert.equal(PaginationFormulas.pagerange(5, 20).value, 100, 'last item shown on the page')
  assert.equal(PaginationFormulas.pages(95, 10).dst, 'typography')
  assert.equal(hexFamiliesOf().get('pagination')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'pagination', program: ['pages'], params: [95, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 10, `pagination.pages at ${uuid}`)
  uuidReceiptOf('pagination pages', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pages 10, pageoffset 80, totalpages 10, itemsonpage 5, signatures 7, columns 4, charsperpage 2970, pagerange 100; crossing to typography')
})
