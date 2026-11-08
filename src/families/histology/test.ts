import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HistologyFormulas } from './index.js'
import '../../mcp/families.js'

test('histology: staining, thickness, magnification, density, fibrosis, necrosis, grade, infiltration — crossing to med', async (t) => {
  assert.equal(HistologyFormulas.staining(750, 1000).value, 75, 'three quarters stained')
  assert.equal(HistologyFormulas.thickness(5).value, 5)
  assert.equal(HistologyFormulas.magnification(4000, 10).value, 400, 'four hundred times')
  assert.equal(HistologyFormulas.density(1200, 10).value, 120)
  assert.equal(HistologyFormulas.fibrosis(30, 100).value, 30)
  assert.equal(HistologyFormulas.necrosis(20, 200).value, 10)
  assert.equal(HistologyFormulas.grade(3).value, 3)
  assert.equal(HistologyFormulas.infiltration(900, 3).value, 300)
  assert.equal(HistologyFormulas.staining(750, 1000).dst, 'med')
  assert.equal(hexFamiliesOf().get('histology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'histology', program: ['magnification'], params: [4000, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 400, `histology.magnification at ${uuid}`)
  uuidReceiptOf('histology magnification', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; staining 75, thickness 5, magnification 400, density 120, fibrosis 30, necrosis 10, grade 3, infiltration 300; crossing to med')
})
