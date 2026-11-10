import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { EvapotranspirationFormulas } from './index.js'
import '../../mcp/families.js'

test('evapotranspiration: reference, cropcoefficient, actual, waterdeficit, irrigationneed, potential, cropwateruse, netirrigation — crossing to hydrology', async (t) => {
  assert.equal(EvapotranspirationFormulas.reference(25, 200).value, 50, 'baseline demand from heat and radiation')
  assert.equal(EvapotranspirationFormulas.cropcoefficient(80, 100).value, 80, 'Kc as a percentage')
  assert.equal(EvapotranspirationFormulas.actual(50, 80).value, 40, 'reference scaled by the crop coefficient')
  assert.equal(EvapotranspirationFormulas.waterdeficit(40, 25).value, 15)
  assert.equal(EvapotranspirationFormulas.irrigationneed(15, 75).value, 20, 'gross irrigation at 75% efficiency')
  assert.equal(EvapotranspirationFormulas.potential(20, 12).value, 240)
  assert.equal(EvapotranspirationFormulas.cropwateruse(40, 30).value, 1200, 'a month of crop water use')
  assert.equal(EvapotranspirationFormulas.netirrigation(100, 60).value, 40)
  assert.equal(EvapotranspirationFormulas.waterdeficit(10, 25).value, 0, 'no deficit when supply meets demand')
  assert.equal(EvapotranspirationFormulas.reference(25, 200).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('evapotranspiration')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'evapotranspiration', program: ['actual'], params: [50, 80] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 40, `evapotranspiration.actual at ${uuid}`)
  uuidReceiptOf('evapotranspiration actual', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; reference 50, cropcoefficient 80, actual 40, waterdeficit 15, irrigationneed 20, potential 240, cropwateruse 1200, netirrigation 40; crossing to hydrology')
})
