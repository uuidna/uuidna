import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TaoismFormulas } from './index.js'
import '../../mcp/families.js'

test('taoism: principles, trigrampairs, hexagrams, virtuecount, elementcombos, chaptercount, stageorderings, balanceratio — crossing to philosophy', async (t) => {
  assert.equal(TaoismFormulas.principles(2, 0).value, 2)
  assert.equal(TaoismFormulas.trigrampairs(8, 2).value, 28)
  assert.equal(TaoismFormulas.hexagrams(8, 8).value, 64)
  assert.equal(TaoismFormulas.virtuecount(3, 0).value, 3)
  assert.equal(TaoismFormulas.elementcombos(5, 2).value, 10)
  assert.equal(TaoismFormulas.chaptercount(81, 1).value, 81)
  assert.equal(TaoismFormulas.stageorderings(5).value, 120)
  assert.equal(TaoismFormulas.balanceratio(50, 100).value, 50)
  assert.equal(TaoismFormulas.principles(2, 0).dst, 'philosophy')
  assert.equal(hexFamiliesOf().get('taoism')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'taoism', program: ['principles'], params: [2, 0] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 2, `taoism.principles at ${uuid}`)
  uuidReceiptOf('taoism principles', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; principles 2, trigrampairs 28, hexagrams 64, virtuecount 3, elementcombos 10, chaptercount 81, stageorderings 120, balanceratio 50; crossing to philosophy')
})
