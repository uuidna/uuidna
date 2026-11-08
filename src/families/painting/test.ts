import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PaintingFormulas } from './index.js'
import '../../mcp/families.js'

test('painting: primarycolors, mixingcombos, layercount, huewheel, pigmentsubsets, canvasarea, valuescale, opacityratio — crossing to optics', async (t) => {
  assert.equal(PaintingFormulas.primarycolors(3, 0).value, 3)
  assert.equal(PaintingFormulas.mixingcombos(12, 2).value, 66)
  assert.equal(PaintingFormulas.layercount(5, 3).value, 8)
  assert.equal(PaintingFormulas.huewheel(360, 12).value, 30)
  assert.equal(PaintingFormulas.pigmentsubsets(6).value, 64)
  assert.equal(PaintingFormulas.canvasarea(40, 30).value, 1200)
  assert.equal(PaintingFormulas.valuescale(9, 0).value, 9)
  assert.equal(PaintingFormulas.opacityratio(80, 100).value, 80)
  assert.equal(PaintingFormulas.primarycolors(3, 0).dst, 'optics')
  assert.equal(hexFamiliesOf().get('painting')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'painting', program: ['primarycolors'], params: [3, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `painting.primarycolors at ${uuid}`)
  uuidReceiptOf('painting primarycolors', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; primarycolors 3, mixingcombos 66, layercount 8, huewheel 30, pigmentsubsets 64, canvasarea 1200, valuescale 9, opacityratio 80; crossing to optics')
})
