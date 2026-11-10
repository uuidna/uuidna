import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { BathymetryFormulas } from './index.js'
import '../../mcp/families.js'

test('bathymetry: depth, soundingtime, slope, echodelay, gridresolution, swathwidth, profilearea, contourinterval — crossing to oceanography', async (t) => {
  assert.equal(BathymetryFormulas.depth(1500, 4).value, 3000, 'two-way echo at 1500 m/s over 4 s')
  assert.equal(BathymetryFormulas.soundingtime(3000, 1500).value, 4, 'round trip to 3000 m')
  assert.equal(BathymetryFormulas.slope(30, 100).value, 30, 'a 30% grade')
  assert.equal(BathymetryFormulas.echodelay(1500, 1500).value, 1000, 'one-way delay in ms')
  assert.equal(BathymetryFormulas.gridresolution(10000, 100).value, 100)
  assert.equal(BathymetryFormulas.swathwidth(3000, 7).value, 21000, 'a seven-fold multibeam swath')
  assert.equal(BathymetryFormulas.profilearea(500, 40).value, 20000)
  assert.equal(BathymetryFormulas.contourinterval(1000, 10).value, 100, 'ten contours over 1000 m')
  assert.equal(BathymetryFormulas.depth(1500, 4).dst, 'oceanography')
  assert.equal(hexFamiliesOf().get('bathymetry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'bathymetry', program: ['depth'], params: [1500, 4] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 3000, `bathymetry.depth at ${uuid}`)
  uuidReceiptOf('bathymetry depth', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; depth 3000, soundingtime 4, slope 30, echodelay 1000, gridresolution 100, swathwidth 21000, profilearea 20000, contourinterval 100; crossing to oceanography')
})
