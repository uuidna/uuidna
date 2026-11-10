import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LayoutFormulas } from './index.js'
import '../../mcp/families.js'

test('layout: span, columns, aspect, basis, grow, gap, order, track — crossing to css', async (t) => {
  assert.equal(LayoutFormulas.span(6, 12).value, 50, 'half the grid')
  assert.equal(LayoutFormulas.columns(12).value, 12)
  assert.equal(LayoutFormulas.aspect(16, 9).value, 177)
  assert.equal(LayoutFormulas.basis(50).value, 50)
  assert.equal(LayoutFormulas.grow(1, 4).value, 25, 'a quarter of free space')
  assert.equal(LayoutFormulas.gap(4, 8).value, 24, 'three gaps of eight')
  assert.equal(LayoutFormulas.order(3, 12).value, 1, 'position fits')
  assert.equal(LayoutFormulas.order(13, 12).value, 0)
  assert.equal(LayoutFormulas.track(1200, 12).value, 100)
  assert.equal(LayoutFormulas.span(6, 12).dst, 'css')
  assert.equal(hexFamiliesOf().get('layout')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'layout', program: ['span'], params: [6, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 50, `layout.span at ${uuid}`)
  uuidReceiptOf('layout span', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; span 50, columns 12, aspect 177, basis 50, grow 25, gap 24, order 1, track 100; crossing to css')
})
