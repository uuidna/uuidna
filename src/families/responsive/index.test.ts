import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ResponsiveFormulas } from './index.js'
import '../../mcp/families.js'

test('responsive: breakpoint, fluidsize, columns, gutter, scalefactor, viewportunits, aspectfit, density — crossing to frontend', async (t) => {
  assert.equal(ResponsiveFormulas.breakpoint(1280, 320).value, 4, 'the fourth breakpoint tier')
  assert.equal(ResponsiveFormulas.fluidsize(16, 48).value, 32)
  assert.equal(ResponsiveFormulas.columns(1200, 300).value, 4, 'four columns fit')
  assert.equal(ResponsiveFormulas.gutter(96, 12).value, 8)
  assert.equal(ResponsiveFormulas.scalefactor(16, 2).value, 32)
  assert.equal(ResponsiveFormulas.viewportunits(50, 1440).value, 720, 'half the viewport in pixels')
  assert.equal(ResponsiveFormulas.aspectfit(1600, 16, 9).value, 900, '16:9 height for a 1600px width')
  assert.equal(ResponsiveFormulas.density(320, 3).value, 960)
  assert.equal(ResponsiveFormulas.breakpoint(1280, 0).value, 0)
  assert.equal(ResponsiveFormulas.columns(1200, 300).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('responsive')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'responsive', program: ['columns'], params: [1200, 300] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 4, `responsive.columns at ${uuid}`)
  uuidReceiptOf('responsive columns', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; breakpoint 4, fluidsize 32, columns 4, gutter 8, scalefactor 32, viewportunits 720, aspectfit 900, density 960; crossing to frontend')
})
