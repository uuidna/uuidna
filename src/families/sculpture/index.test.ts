import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { SculptureFormulas } from './index.js'
import '../../mcp/families.js'

test('sculpture: volume, masskg, removalratio, facetcount, supportpoints, scaleratio, toolpasses, balancemargin — crossing to materials', async (t) => {
  assert.equal(SculptureFormulas.volume(20, 20, 40).value, 16000)
  assert.equal(SculptureFormulas.masskg(16000, 1000).value, 16)
  assert.equal(SculptureFormulas.removalratio(40, 100).value, 40)
  assert.equal(SculptureFormulas.facetcount(12, 4).value, 48)
  assert.equal(SculptureFormulas.supportpoints(3, 1).value, 4)
  assert.equal(SculptureFormulas.scaleratio(150, 100).value, 150)
  assert.equal(SculptureFormulas.toolpasses(50, 3).value, 150)
  assert.equal(SculptureFormulas.balancemargin(100, 30).value, 70)
  assert.equal(SculptureFormulas.volume(20, 20, 40).dst, 'materials')
  assert.equal(hexFamiliesOf().get('sculpture')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'sculpture', program: ['volume'], params: [20, 20, 40] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 16000, `sculpture.volume at ${uuid}`)
  uuidReceiptOf('sculpture volume', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; volume 16000, masskg 16, removalratio 40, facetcount 48, supportpoints 4, scaleratio 150, toolpasses 150, balancemargin 70; crossing to materials')
})
