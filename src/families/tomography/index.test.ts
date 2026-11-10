import { test } from '../../quantum/processing/unit/receipted.js'
import assert from 'node:assert/strict'
import { hexFamiliesOf, hexRunOf, qpuHexUuidOf, contentUuidOf, uuidReceiptOf } from '../../quantum/processing/unit/index.js'
import { TomographyFormulas } from './index.js'
import '../../mcp/families.js'

test('tomography: slices, projections, voxels, reconstruction, hounsfield, pitch, exposure, coverage — crossing to radiology', async (t) => {
  assert.equal(TomographyFormulas.slices(300, 5).value, 60, 'sixty slices over the length')
  assert.equal(TomographyFormulas.projections(180, 2).value, 360)
  assert.equal(TomographyFormulas.voxels(512, 512, 100).value, 26214400, 'the reconstructed volume')
  assert.equal(TomographyFormulas.reconstruction(360, 512).value, 184320)
  assert.equal(TomographyFormulas.hounsfield(2000, 1000).value, 1000)
  assert.equal(TomographyFormulas.pitch(15, 10).value, 150, 'a pitch of 1.5')
  assert.equal(TomographyFormulas.exposure(200, 3).value, 600, 'mAs')
  assert.equal(TomographyFormulas.coverage(64, 1).value, 64)
  assert.equal(TomographyFormulas.hounsfield(1000, 1000).value, 0)
  assert.equal(TomographyFormulas.slices(300, 5).dst, 'radiology')
  assert.equal(hexFamiliesOf().get('tomography')?.length, 8)
  const uuid = qpuHexUuidOf({ family: 'tomography', program: ['slices'], params: [300, 5] })
  const run = (await hexRunOf(uuid)) as { value?: unknown }
  assert.equal(Number(run.value), 60, `tomography.slices at ${uuid}`)
  uuidReceiptOf('tomography slices', contentUuidOf(run), { uuid })
  t.diagnostic('8 formulas; slices 60, projections 360, voxels 26214400, reconstruction 184320, hounsfield 1000, pitch 150, exposure 600, coverage 64; crossing to radiology')
})
