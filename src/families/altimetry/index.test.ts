import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { AltimetryFormulas } from './index.js'
import '../../mcp/families.js'

test('altimetry: pressurealtitude, densityaltitude, elevationgain, slope, contourinterval, verticalspeed, hypsometric, grade — crossing to cartography', async (t) => {
  assert.equal(AltimetryFormulas.pressurealtitude(500, 1003).value, 770, 'field elevation off standard pressure')
  assert.equal(AltimetryFormulas.densityaltitude(5000, 25).value, 6200, 'ten degrees above standard')
  assert.equal(AltimetryFormulas.elevationgain(1200, 1850).value, 650)
  assert.equal(AltimetryFormulas.slope(150, 2000).value, 7, 'percent grade')
  assert.equal(AltimetryFormulas.contourinterval(1000, 400, 6).value, 100, 'six contour lines')
  assert.equal(AltimetryFormulas.verticalspeed(3600, 3).value, 1200, 'feet per minute')
  assert.equal(AltimetryFormulas.hypsometric(250, 2).value, 14500)
  assert.equal(AltimetryFormulas.grade(30, 400).value, 75, 'per-mille slope')
  assert.equal(AltimetryFormulas.pressurealtitude(500, 1003).dst, 'cartography')
  assert.equal(hexFamiliesOf().get('altimetry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'altimetry', program: ['verticalspeed'], params: [3600, 3] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 1200, `altimetry.verticalspeed at ${uuid}`)
  uuidReceiptOf('altimetry verticalspeed', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; pressurealtitude 770, densityaltitude 6200, elevationgain 650, slope 7, contourinterval 100, verticalspeed 1200, hypsometric 14500, grade 75; crossing to cartography')
})
