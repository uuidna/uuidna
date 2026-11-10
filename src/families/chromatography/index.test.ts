import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { ChromatographyFormulas } from './index.js'
import '../../mcp/families.js'

test('chromatography: capacity, efficiency, peakarea, plates, resolution, retention, rf, selectivity — crossing to chemistry', async (t) => {
  assert.equal(ChromatographyFormulas.capacity(300, 60).value, 400, 'retention factor ·100')
  assert.equal(ChromatographyFormulas.efficiency(51200, 25600).value, 2, 'plate height')
  assert.equal(ChromatographyFormulas.peakarea(500, 40).value, 10000)
  assert.equal(ChromatographyFormulas.plates(400, 10).value, 25600, 'theoretical plates')
  assert.equal(ChromatographyFormulas.resolution(100, 20, 20).value, 5, 'baseline resolution')
  assert.equal(ChromatographyFormulas.retention(300, 60).value, 240, 'adjusted retention time')
  assert.equal(ChromatographyFormulas.rf(30, 60).value, 50)
  assert.equal(ChromatographyFormulas.selectivity(150, 100).value, 150, 'separation factor ·100')
  assert.equal(ChromatographyFormulas.retention(300, 60).dst, 'chemistry')
  assert.equal(hexFamiliesOf().get('chromatography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'chromatography', program: ['resolution'], params: [100, 20, 20] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 5, `chromatography.resolution at ${uuid}`)
  uuidReceiptOf('chromatography resolution', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; capacity 400, efficiency 2, peakarea 10000, plates 25600, resolution 5, retention 240, rf 50, selectivity 150; crossing to chemistry')
})
