import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AirqualityFormulas } from './index.js'
import '../../mcp/families.js'

test('airquality: aqi, pm25index, ozone, exceedance, concentration, exposureindex, ventilation, dispersion — crossing to environment', async (t) => {
  assert.equal(AirqualityFormulas.aqi(50, 2).value, 100, 'index points for the concentration')
  assert.equal(AirqualityFormulas.pm25index(70, 35).value, 200, 'twice the threshold')
  assert.equal(AirqualityFormulas.ozone(80, 8).value, 80)
  assert.equal(AirqualityFormulas.exceedance(120, 100).value, 20, 'over the limit')
  assert.equal(AirqualityFormulas.exceedance(90, 100).value, 0)
  assert.equal(AirqualityFormulas.concentration(5000, 100).value, 50)
  assert.equal(AirqualityFormulas.exposureindex(50, 24).value, 1200, 'a day of breathing')
  assert.equal(AirqualityFormulas.ventilation(100, 60).value, 100, 'air changes an hour')
  assert.equal(AirqualityFormulas.dispersion(900, 9).value, 100)
  assert.equal(AirqualityFormulas.aqi(50, 2).dst, 'environment')
  assert.equal(hexFamiliesOf().get('airquality')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'airquality', program: ['aqi'], params: [50, 2] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 100, `airquality.aqi at ${uuid}`)
  uuidReceiptOf('airquality aqi', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; aqi 100, pm25index 200, ozone 80, exceedance 20, concentration 50, exposureindex 1200, ventilation 100, dispersion 100; crossing to environment')
})
