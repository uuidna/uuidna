import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { PhotogrammetryFormulas } from './index.js'
import '../../mcp/families.js'

test('photogrammetry: scale, overlap, gsd, basedistance, parallax, accuracy, tiepoints, reconstruction — crossing to cartography', async (t) => {
  assert.equal(PhotogrammetryFormulas.scale(50, 10000).value, 5000, 'image scale from focal and altitude')
  assert.equal(PhotogrammetryFormulas.overlap(80, 100).value, 80)
  assert.equal(PhotogrammetryFormulas.gsd(5, 10000).value, 50, 'ground sample distance proxy')
  assert.equal(PhotogrammetryFormulas.basedistance(10000, 80).value, 2000, 'baseline at 80% overlap')
  assert.equal(PhotogrammetryFormulas.parallax(50, 200).value, 25)
  assert.equal(PhotogrammetryFormulas.accuracy(2, 10000).value, 2)
  assert.equal(PhotogrammetryFormulas.tiepoints(900, 1000).value, 90, 'tie points matched')
  assert.equal(PhotogrammetryFormulas.reconstruction(10000, 50).value, 200, 'points per image')
  assert.equal(PhotogrammetryFormulas.scale(50, 10000).dst, 'cartography')
  assert.equal(hexFamiliesOf().get('photogrammetry')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'photogrammetry', program: ['overlap'], params: [80, 100] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 80, `photogrammetry.overlap at ${uuid}`)
  uuidReceiptOf('photogrammetry overlap', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; scale 5000, overlap 80, gsd 50, basedistance 2000, parallax 25, accuracy 2, tiepoints 90, reconstruction 200; crossing to cartography')
})
