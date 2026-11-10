import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PrecipitationFormulas } from './index.js'
import '../../mcp/families.js'

test('precipitation: intensity, runoff, accumulation, returnperiod, snowratio, catchmentyield, raindepth, infiltration — crossing to hydrology', async (t) => {
  assert.equal(PrecipitationFormulas.intensity(50, 5).value, 10, 'millimetres per hour')
  assert.equal(PrecipitationFormulas.runoff(200, 75).value, 150, 'the rational method')
  assert.equal(PrecipitationFormulas.accumulation(12, 6).value, 72)
  assert.equal(PrecipitationFormulas.returnperiod(100, 4).value, 25)
  assert.equal(PrecipitationFormulas.snowratio(130, 10).value, 13, 'thirteen to one')
  assert.equal(PrecipitationFormulas.catchmentyield(500, 20).value, 10000)
  assert.equal(PrecipitationFormulas.raindepth(10000, 500).value, 20)
  assert.equal(PrecipitationFormulas.infiltration(200, 150).value, 50, 'what soaks in')
  assert.equal(PrecipitationFormulas.infiltration(50, 100).value, 0)
  assert.equal(PrecipitationFormulas.intensity(50, 5).dst, 'hydrology')
  assert.equal(hexFamiliesOf().get('precipitation')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'precipitation', program: ['runoff'], params: [200, 75] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 150, `precipitation.runoff at ${uuid}`)
  uuidReceiptOf('precipitation runoff', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; intensity 10, runoff 150, accumulation 72, returnperiod 25, snowratio 13, catchmentyield 10000, raindepth 20, infiltration 50; crossing to hydrology')
})
