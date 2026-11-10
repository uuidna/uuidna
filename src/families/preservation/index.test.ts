import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PreservationFormulas } from './index.js'
import '../../mcp/families.js'

test('preservation: shelflifedays, wateractivity, phlevel, saltpct, methodsubsets, microbialreduction, temperaturec, spoilagerate — crossing to microbiology', async (t) => {
  assert.equal(PreservationFormulas.shelflifedays(30, 12).value, 360)
  assert.equal(PreservationFormulas.wateractivity(85, 100).value, 85)
  assert.equal(PreservationFormulas.phlevel(42, 10).value, 4)
  assert.equal(PreservationFormulas.saltpct(5, 100).value, 5)
  assert.equal(PreservationFormulas.methodsubsets(5).value, 32)
  assert.equal(PreservationFormulas.microbialreduction(99, 100).value, 99)
  assert.equal(PreservationFormulas.temperaturec(25, 4).value, 21)
  assert.equal(PreservationFormulas.spoilagerate(2, 100).value, 2)
  assert.equal(PreservationFormulas.shelflifedays(30, 12).dst, 'microbiology')
  assert.equal(hexFamiliesOf().get('preservation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'preservation', program: ['shelflifedays'], params: [30, 12] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 360, `preservation.shelflifedays at ${uuid}`)
  uuidReceiptOf('preservation shelflifedays', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; shelflifedays 360, wateractivity 85, phlevel 4, saltpct 5, methodsubsets 32, microbialreduction 99, temperaturec 21, spoilagerate 2; crossing to microbiology')
})
