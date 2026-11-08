import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AnatomyFormulas } from './index.js'
import '../../mcp/families.js'

test('anatomy: surface, ratio, symmetry, proportion, span, volume, mass, girth — crossing to med', async (t) => {
  assert.equal(AnatomyFormulas.surface(170, 70).value, 11900, 'height by weight')
  assert.equal(AnatomyFormulas.ratio(80, 100).value, 80, 'waist-to-hip percentage')
  assert.equal(AnatomyFormulas.symmetry(90, 100).value, 90)
  assert.equal(AnatomyFormulas.proportion(25, 100).value, 25)
  assert.equal(AnatomyFormulas.span(100, 5).value, 20, 'a segment length')
  assert.equal(AnatomyFormulas.volume(50, 12).value, 600)
  assert.equal(AnatomyFormulas.mass(600, 2).value, 1200)
  assert.equal(AnatomyFormulas.girth(10).value, 60, 'circumference proxy')
  assert.equal(AnatomyFormulas.surface(170, 70).dst, 'med')
  assert.equal(hexFamiliesOf().get('anatomy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'anatomy', program: ['ratio'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `anatomy.ratio at ${uuid}`)
  uuidReceiptOf('anatomy ratio', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; surface 11900, ratio 80, symmetry 90, proportion 25, span 20, volume 600, mass 1200, girth 60; crossing to med')
})
