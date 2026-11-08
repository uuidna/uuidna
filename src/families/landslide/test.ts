import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { LandslideFormulas } from './index.js'
import '../../mcp/families.js'

test('landslide: slopeangle, factorofsafety, runoutdistance, volume, velocity, rainfallthreshold, susceptibility, debrisfraction — crossing to geology', async (t) => {
  assert.equal(LandslideFormulas.slopeangle(450, 10).value, 45)
  assert.equal(LandslideFormulas.factorofsafety(120, 100).value, 120)
  assert.equal(LandslideFormulas.runoutdistance(30, 20).value, 600)
  assert.equal(LandslideFormulas.volume(50, 40, 10).value, 20000)
  assert.equal(LandslideFormulas.velocity(600, 60).value, 10)
  assert.equal(LandslideFormulas.rainfallthreshold(200, 120).value, 80)
  assert.equal(LandslideFormulas.susceptibility(70, 100).value, 70)
  assert.equal(LandslideFormulas.debrisfraction(60, 100).value, 60)
  assert.equal(LandslideFormulas.slopeangle(450, 10).dst, 'geology')
  assert.equal(hexFamiliesOf().get('landslide')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'landslide', program: ['slopeangle'], params: [450, 10] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 45, `landslide.slopeangle at ${uuid}`)
  uuidReceiptOf('landslide slopeangle', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; slopeangle 45, factorofsafety 120, runoutdistance 600, volume 20000, velocity 10, rainfallthreshold 80, susceptibility 70, debrisfraction 60; crossing to geology')
})
