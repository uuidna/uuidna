import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ClimatologyFormulas } from './index.js'
import '../../mcp/families.js'

test('climatology: anomaly, forcing, albedo, aridity, seasonality, trend, degreeday, carbon — crossing to climate', async (t) => {
  assert.equal(ClimatologyFormulas.anomaly(18, 15).value, 3, 'three above the baseline')
  assert.equal(ClimatologyFormulas.anomaly(12, 15).value, 0, 'never below zero')
  assert.equal(ClimatologyFormulas.forcing(400, 3).value, 1200)
  assert.equal(ClimatologyFormulas.albedo(30, 100).value, 30, 'thirty percent reflected')
  assert.equal(ClimatologyFormulas.aridity(600, 1200).value, 50)
  assert.equal(ClimatologyFormulas.seasonality(30, 5).value, 25, 'the yearly range')
  assert.equal(ClimatologyFormulas.trend(20, 4).value, 5, 'five per decade')
  assert.equal(ClimatologyFormulas.degreeday(25, 18).value, 7)
  assert.equal(ClimatologyFormulas.carbon(50, 40).value, 125, 'emitting past the sink')
  assert.equal(ClimatologyFormulas.anomaly(18, 15).dst, 'climate')
  assert.equal(hexFamiliesOf().get('climatology')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'climatology', program: ['trend'], params: [20, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `climatology.trend at ${uuid}`)
  uuidReceiptOf('climatology trend', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; anomaly 3, forcing 1200, albedo 30, aridity 50, seasonality 25, trend 5, degreeday 7, carbon 125; crossing to climate')
})
