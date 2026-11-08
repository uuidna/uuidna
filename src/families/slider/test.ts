import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SliderFormulas } from './index.js'
import '../../mcp/families.js'

test('slider: slides, index, autoplay, loop, visible, gap, transition, pages — crossing to frontend', async (t) => {
  assert.equal(SliderFormulas.slides(5).value, 5, 'the slides it holds')
  assert.equal(SliderFormulas.index(1, 4).value, 25)
  assert.equal(SliderFormulas.autoplay(3000, 5).value, 15000, 'the total cycle in ms')
  assert.equal(SliderFormulas.loop(7, 5).value, 2, 'wrapped position')
  assert.equal(SliderFormulas.visible(3, 12).value, 25)
  assert.equal(SliderFormulas.gap(5, 16).value, 64, 'four gaps between five slides')
  assert.equal(SliderFormulas.transition(300).value, 300)
  assert.equal(SliderFormulas.pages(10, 3).value, 4, 'four pages at three per view')
  assert.equal(SliderFormulas.slides(5).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('slider')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'slider', program: ['index'], params: [1, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 25, `slider.index at ${uuid}`)
  uuidReceiptOf('slider index', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; slides 5, index 25, autoplay 15000, loop 2, visible 25, gap 64, transition 300, pages 4; crossing to frontend')
})
