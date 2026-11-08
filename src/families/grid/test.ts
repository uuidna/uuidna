import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { GridFormulas } from './index.js'
import '../../mcp/families.js'

test('grid: rows, gap, span, fill, cells, auto, aspect, density — crossing to css', async (t) => {
  assert.equal(GridFormulas.rows(10, 3).value, 4, 'four rows for ten items in three columns')
  assert.equal(GridFormulas.gap(4, 16).value, 48, 'three gutters of sixteen')
  assert.equal(GridFormulas.span(2, 4).value, 50, 'two of four columns')
  assert.equal(GridFormulas.fill(3, 12).value, 25)
  assert.equal(GridFormulas.cells(3, 4).value, 12)
  assert.equal(GridFormulas.auto(1000, 250).value, 4, 'four columns fit')
  assert.equal(GridFormulas.aspect(16, 9).value, 177)
  assert.equal(GridFormulas.density(4, 16).value, 25)
  assert.equal(GridFormulas.rows(10, 3).dst, 'css')
  assert.equal(hexFamiliesOf().get('grid')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'grid', program: ['rows'], params: [10, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `grid.rows at ${uuid}`)
  uuidReceiptOf('grid rows', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; rows 4, gap 48, span 50, fill 25, cells 12, auto 4, aspect 177, density 25; crossing to css')
})
