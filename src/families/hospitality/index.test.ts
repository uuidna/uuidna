import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { HospitalityFormulas } from './index.js'
import '../../mcp/families.js'

test('hospitality: occupancy, adr, revpar, satisfaction, stay, noshow, repeat, upsell — crossing to tourism', async (t) => {
  assert.equal(HospitalityFormulas.occupancy(85, 100).value, 85, 'occupancy percentage')
  assert.equal(HospitalityFormulas.adr(12000, 80).value, 150, 'average daily rate')
  assert.equal(HospitalityFormulas.revpar(12000, 100).value, 120, 'revenue per available room')
  assert.equal(HospitalityFormulas.satisfaction(450, 100).value, 4)
  assert.equal(HospitalityFormulas.stay(300, 100).value, 3, 'nights per stay')
  assert.equal(HospitalityFormulas.noshow(5, 100).value, 5, 'no-show percentage')
  assert.equal(HospitalityFormulas.repeat(40, 100).value, 40, 'repeat-guest percentage')
  assert.equal(HospitalityFormulas.upsell(25, 100).value, 25, 'upsell percentage')
  assert.equal(HospitalityFormulas.adr(12000, 80).dst, 'tourism')
  assert.equal(hexFamiliesOf().get('hospitality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'hospitality', program: ['occupancy'], params: [85, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 85, `hospitality.occupancy at ${uuid}`)
  uuidReceiptOf('hospitality occupancy', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; occupancy 85, adr 150, revpar 120, satisfaction 4, stay 3, noshow 5, repeat 40, upsell 25; crossing to tourism')
})
