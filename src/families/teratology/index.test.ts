import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TeratologyFormulas } from './index.js'
import '../../mcp/families.js'

test('teratology: malformationrate, criticalwindows, doseresponse, exposurepairs, riskindex, stageorderings, thresholddose, incidence — crossing to physiology', async (t) => {
  assert.equal(TeratologyFormulas.malformationrate(3, 100).value, 3)
  assert.equal(TeratologyFormulas.criticalwindows(3, 5).value, 8)
  assert.equal(TeratologyFormulas.doseresponse(1000, 10).value, 100)
  assert.equal(TeratologyFormulas.exposurepairs(8, 2).value, 28)
  assert.equal(TeratologyFormulas.riskindex(5, 4).value, 20)
  assert.equal(TeratologyFormulas.stageorderings(5).value, 120)
  assert.equal(TeratologyFormulas.thresholddose(500, 350).value, 150)
  assert.equal(TeratologyFormulas.incidence(2, 100).value, 2)
  assert.equal(TeratologyFormulas.malformationrate(3, 100).dst, 'physiology')
  assert.equal(hexFamiliesOf().get('teratology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'teratology', program: ['malformationrate'], params: [3, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3, `teratology.malformationrate at ${uuid}`)
  uuidReceiptOf('teratology malformationrate', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; malformationrate 3, criticalwindows 8, doseresponse 100, exposurepairs 28, riskindex 20, stageorderings 120, thresholddose 150, incidence 2; crossing to physiology')
})
