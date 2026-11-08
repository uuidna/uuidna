import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HoverFormulas } from './index.js'
import '../../mcp/families.js'

test('hover: delay, scale, reveal, transition, stagger, depth, cards, trigger — crossing to frontend', async (t) => {
  assert.equal(HoverFormulas.delay(300).value, 300)
  assert.equal(HoverFormulas.scale(200, 150).value, 300, 'a card grown half again')
  assert.equal(HoverFormulas.reveal(40, 100).value, 40)
  assert.equal(HoverFormulas.transition(250).value, 250)
  assert.equal(HoverFormulas.stagger(5, 30).value, 150, 'five items offset by a gap')
  assert.equal(HoverFormulas.depth(3).value, 3)
  assert.equal(HoverFormulas.cards(8).value, 8)
  assert.equal(HoverFormulas.trigger(25, 100).value, 25)
  assert.equal(HoverFormulas.delay(300).dst, 'frontend')
  assert.equal(hexFamiliesOf().get('hover')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hover', program: ['scale'], params: [200, 150] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 300, `hover.scale at ${uuid}`)
  uuidReceiptOf('hover scale', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; delay 300, scale 300, reveal 40, transition 250, stagger 150, depth 3, cards 8, trigger 25; crossing to frontend')
})
