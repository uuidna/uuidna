import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { CssFormulas } from './index.js'
import '../../mcp/families.js'

test('css: the Tailwind/shadcn design tokens as arithmetic — spacing, rem, type, screens, radius, contrast', async (t) => {
  assert.equal(CssFormulas.spacing(4).value, 16, 'p-4 is 16px (4 × 0.25rem)')
  assert.equal(CssFormulas.rem(24).value, 150, '24px is 1.50rem (centi-rem)')
  assert.equal(CssFormulas.type(0).value, 16, 'the base type size')
  assert.equal(CssFormulas.type(1).value, 20, 'one step up the 1.25 scale')
  assert.equal(CssFormulas.type(2).value, 25)
  assert.equal(CssFormulas.screen(0).value, 640, 'sm')
  assert.equal(CssFormulas.screen(2).value, 1024, 'lg')
  assert.equal(CssFormulas.screen(4).value, 1536, '2xl')
  assert.equal(CssFormulas.radius(4).value, 8, 'rounded-lg is 8px')
  assert.equal(CssFormulas.leading(16).value, 24, 'line-height 1.5 on 16px')
  assert.equal(CssFormulas.contrast(90, 10).value, 633, 'high contrast passes AA (>= 450)')
  assert.equal(CssFormulas.contrast(55, 45).value, 120, 'low contrast fails AA')
  assert.equal(CssFormulas.grid(12, 16).value, 176, 'eleven gutters of 16px across 12 columns')
  assert.equal(CssFormulas.spacing(4).dst, 'cross')
  assert.equal(hexFamiliesOf().get('css')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'css', program: ['grid'], params: [12, 16] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 176, `css.grid at ${uuid}`)
  uuidReceiptOf('css grid', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; spacing 16, rem 150, type 16/20/25, screens 640/1024/1536, radius 8, leading 24, contrast 633/120, grid 176')
})
