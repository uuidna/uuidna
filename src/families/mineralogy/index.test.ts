import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { MineralogyFormulas } from './index.js'
import '../../mcp/families.js'

test('mineralogy: hardness, density, cleavage, refraction, grade, crystallinity, purity, specific — crossing to materials', async (t) => {
  assert.equal(MineralogyFormulas.hardness(7).value, 7, 'quartz on the Mohs scale')
  assert.equal(MineralogyFormulas.density(300, 100).value, 3)
  assert.equal(MineralogyFormulas.cleavage(3).value, 3, 'three cleavage planes')
  assert.equal(MineralogyFormulas.refraction(544, 1).value, 544000)
  assert.equal(MineralogyFormulas.grade(25, 75).value, 25, 'ore grade percent')
  assert.equal(MineralogyFormulas.crystallinity(80, 100).value, 80)
  assert.equal(MineralogyFormulas.purity(90, 100).value, 90)
  assert.equal(MineralogyFormulas.specific(2650, 1000).value, 2650, 'specific gravity x1000')
  assert.equal(MineralogyFormulas.hardness(7).dst, 'materials')
  assert.equal(hexFamiliesOf().get('mineralogy')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'mineralogy', program: ['density'], params: [300, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `mineralogy.density at ${uuid}`)
  uuidReceiptOf('mineralogy density', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hardness 7, density 3, cleavage 3, refraction 544000, grade 25, crystallinity 80, purity 90, specific 2650; crossing to materials')
})
