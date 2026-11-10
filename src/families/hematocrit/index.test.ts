import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HematocritFormulas } from './index.js'
import '../../mcp/families.js'

test('hematocrit: packedcellvolume, mcv, mch, mchc, redcellcount, hemoglobinratio, plasmafraction, bloodviscosity — crossing to hematology', async (t) => {
  assert.equal(HematocritFormulas.packedcellvolume(45, 100).value, 45, 'packed cells are 45% of whole blood')
  assert.equal(HematocritFormulas.mcv(450, 5).value, 90)
  assert.equal(HematocritFormulas.mch(150, 5).value, 30)
  assert.equal(HematocritFormulas.mchc(150, 450).value, 33, 'hemoglobin concentration in the packed cells')
  assert.equal(HematocritFormulas.redcellcount(5, 5000).value, 25000)
  assert.equal(HematocritFormulas.hemoglobinratio(150, 1000).value, 15)
  assert.equal(HematocritFormulas.plasmafraction(100, 45).value, 55, 'the plasma left once cells are packed out')
  assert.equal(HematocritFormulas.bloodviscosity(45, 10).value, 4)
  assert.equal(HematocritFormulas.plasmafraction(45, 100).value, 0)
  assert.equal(HematocritFormulas.packedcellvolume(45, 100).dst, 'hematology')
  assert.equal(hexFamiliesOf().get('hematocrit')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hematocrit', program: ['mcv'], params: [450, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `hematocrit.mcv at ${uuid}`)
  uuidReceiptOf('hematocrit mcv', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; packedcellvolume 45, mcv 90, mch 30, mchc 33, redcellcount 25000, hemoglobinratio 15, plasmafraction 55, bloodviscosity 4; crossing to hematology')
})
