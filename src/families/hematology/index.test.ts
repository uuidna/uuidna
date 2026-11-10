import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HematologyFormulas } from './index.js'
import '../../mcp/families.js'

test('hematology: hematocrit, hemoglobin, mcv, inr, platelets, oxygen, clotting, differential — crossing to med', async (t) => {
  assert.equal(HematologyFormulas.hematocrit(45, 100).value, 45, 'packed cells as a percentage')
  assert.equal(HematologyFormulas.hemoglobin(150, 10).value, 15)
  assert.equal(HematologyFormulas.mcv(45, 5).value, 90, 'mean cell volume')
  assert.equal(HematologyFormulas.inr(13, 12).value, 108)
  assert.equal(HematologyFormulas.platelets(250000, 1000).value, 250)
  assert.equal(HematologyFormulas.oxygen(97, 100).value, 97, 'oxygen saturation')
  assert.equal(HematologyFormulas.clotting(12).value, 12)
  assert.equal(HematologyFormulas.differential(60, 100).value, 60)
  assert.equal(HematologyFormulas.hematocrit(45, 100).dst, 'med')
  assert.equal(hexFamiliesOf().get('hematology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hematology', program: ['mcv'], params: [45, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 90, `hematology.mcv at ${uuid}`)
  uuidReceiptOf('hematology mcv', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; hematocrit 45, hemoglobin 15, mcv 90, inr 108, platelets 250, oxygen 97, clotting 12, differential 60; crossing to med')
})
